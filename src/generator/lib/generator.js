const random = require("random");
const OPERATIONS = [
  {
    symbol: value => {
      return `${value}`;
    },
    fn: value => {
      return value;
    },
    allowedValues: "all",
    isAllowedToHaveSameOperationAsNeighbour: true
  },
  {
    symbol: value => {
      return `√${Math.pow(value, 2)}`;
    },
    fn: value => {
      return Math.sqrt(value);
    },
    allowedValues: [1, 2, 3]
  },
  {
    symbol: value => {
      return `${Math.sqrt(value)}²`;
    },
    fn: value => {
      return Math.pow(value, 2);
    },
    allowedValues: [1, 4, 9]
  }
];

async function _createBoard(rows, columns) {
  const board = [];
  for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = [];
    for (var columnIndex = 0; columnIndex < columns; columnIndex++) {
      row.push({ filled: true });
    }
    board.push(row);
  }
  return board;
}

function _getRandomFreeTriangle(level) {
  const freeTrianglesExist = level.board.some(row => {
    return row.some(triangle => {
      return !triangle.placeholder;
    });
  });
  if (!freeTrianglesExist) {
    throw new Error("No free triangle left");
  }
  const rowIndex = random.int(0, level.board.length - 1);
  const columnIndex = random.int(0, level.board[rowIndex].length - 1);
  if (level.board[rowIndex][columnIndex].placeholder) {
    return exportFunctions._getRandomFreeTriangle(level);
  }
  return { rowIndex, columnIndex };
}

function _getDirectionOfElement(rowIndex, columnIndex) {
  return ((rowIndex % 2) + (columnIndex % 2)) % 2 === 0 ? "up" : "down";
}

function _getOperation(value, neighbourOperation) {
  const possibleOperations = OPERATIONS.filter(operation => {
    return (
      (operation.allowedValues === "all" ||
        operation.allowedValues.includes(value)) &&
      (operation !== neighbourOperation ||
        operation.isAllowedToHaveSameOperationAsNeighbour)
    );
  });
  if (!possibleOperations || possibleOperations.length === 0) {
    throw new Error(`Value '${value}' not supported`);
  }
  return possibleOperations[random.int(0, possibleOperations.length - 1)];
}

function _createValueOnSide(
  board,
  missingElement,
  rowIndex,
  columnIndex,
  side
) {
  let value = null;
  let text = null;
  if (board[rowIndex][columnIndex][`value${side}`]) {
    value = board[rowIndex][columnIndex][`value${side}`];
    text = board[rowIndex][columnIndex][`text${side}`];
    delete board[rowIndex][columnIndex][`value${side}`];
    delete board[rowIndex][columnIndex][`text${side}`];
  } else {
    value = random.int(0, 9);
  }
  missingElement[`value${side}`] = value;
  missingElement[`text${side}`] =
    text || exportFunctions._getOperation(value).symbol(value);

  if (!text) {
    let rowIndexNeighbour = rowIndex;
    let columnIndexNeighbour = columnIndex;
    if (missingElement.direction === "up") {
      if (side === "Left") {
        columnIndexNeighbour = columnIndex - 1;
      } else if (side === "Right") {
        columnIndexNeighbour = columnIndex + 1;
      } else if (side === "Hypotenuse") {
        rowIndexNeighbour = rowIndex + 1;
      }
    } else {
      if (side === "Left") {
        columnIndexNeighbour = columnIndex + 1;
      } else if (side === "Right") {
        columnIndexNeighbour = columnIndex - 1;
      } else if (side === "Hypotenuse") {
        rowIndexNeighbour = rowIndex - 1;
      }
    }
    if (
      rowIndexNeighbour >= 0 &&
      rowIndexNeighbour < board.length &&
      columnIndexNeighbour >= 0 &&
      columnIndexNeighbour < board[rowIndexNeighbour].length
    ) {
      board[rowIndexNeighbour][columnIndexNeighbour][
        `text${side}`
      ] = exportFunctions._getOperation(value).symbol(value);
      board[rowIndexNeighbour][columnIndexNeighbour][`value${side}`] = value;
    }
  }
}

function _rotateElement(element) {
  if (element.direction === "down") {
    element.direction = "up";
  } else {
    element.direction = "down";
  }
  const oldTextHypotenuse = element.textHypotenuse;
  const oldValueHypotenuse = element.valueHypotenuse;
  element.textHypotenuse = element.textLeft;
  element.valueHypotenuse = element.valueLeft;
  element.textLeft = element.textRight;
  element.valueLeft = element.valueRight;
  element.textRight = oldTextHypotenuse;
  element.valueRight = oldValueHypotenuse;
}

function _splitUpElement(element) {
  const newElement = { direction: element.direction };
  ["Left", "Right", "Hypotenuse"].forEach(side => {
    const oldValue = element[`value${side}`];
    const newValue = random.int(0, oldValue);
    element[`value${side}`] = newValue;
    element[`text${side}`] = exportFunctions
      ._getOperation(newValue)
      .symbol(newValue);
    newElement[`value${side}`] = oldValue - newValue;
    newElement[`text${side}`] = exportFunctions
      ._getOperation(oldValue - newValue)
      .symbol(oldValue - newValue);
  });
  return [element, newElement];
}

function _scrambleElements(elements, density = 1) {
  let newElements = [];
  elements.forEach(element => {
    newElements = newElements.concat(_scrambleElement(element, density));
  });
  return newElements;
}

function _scrambleElement(element, density) {
  const randomNumber = random.float(0, 1);
  if (density < 10 && randomNumber > 1 - Math.pow(0.5, density)) {
    let elements = [];
    if (random.boolean()) {
      exportFunctions._rotateElement(element);
      elements.push(element);
    } else {
      elements = exportFunctions._splitUpElement(element);
    }
    return exportFunctions._scrambleElements(elements, density + 1);
  }
  return [element];
}

async function _createMissingElements(level, numberOfPlaceholder) {
  for (var i = 0; i < numberOfPlaceholder; i++) {
    const { rowIndex, columnIndex } = exportFunctions._getRandomFreeTriangle(
      level
    );
    const missingElement = {
      direction: exportFunctions._getDirectionOfElement(rowIndex, columnIndex)
    };
    ["Left", "Right", "Hypotenuse"].forEach(side => {
      exportFunctions._createValueOnSide(
        level.board,
        missingElement,
        rowIndex,
        columnIndex,
        side
      );
    });
    level.board[rowIndex][columnIndex] = { placeholder: true };
    level.missingElements.push(missingElement);
  }
  level.missingElements = exportFunctions._scrambleElements(
    level.missingElements
  );
}

async function generateLevel(numberOfPlaceholder) {
  const level = { board: [], missingElements: [] };
  level.board = await exportFunctions._createBoard(2, 3);
  await exportFunctions._createMissingElements(level, numberOfPlaceholder);
  return level;
}

const exportFunctions = {
  generateLevel,
  _createBoard,
  _getRandomFreeTriangle,
  _createMissingElements,
  _getDirectionOfElement,
  _getOperation,
  _createValueOnSide,
  _scrambleElements,
  _rotateElement,
  _splitUpElement,
  OPERATIONS
};

module.exports = exportFunctions;
