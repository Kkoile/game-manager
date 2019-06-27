const random = require("random");
const OPERATIONS = [
  {
    symbol: value => {
      return `${value}`;
    },
    fn: value => {
      return value;
    },
    allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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
    return _getRandomFreeTriangle(level);
  }
  return { rowIndex, columnIndex };
}

function _getDirectionOfElement(rowIndex, columnIndex) {
  return ((rowIndex % 2) + (columnIndex % 2)) % 2 === 0 ? "up" : "down";
}

function _getOperation(value) {
  const possibleOperations = OPERATIONS.filter(operation => {
    return operation.allowedValues.includes(value);
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
  } else {
    value = random.int(0, 9);
  }
  missingElement[`value${side}`] = value;
  missingElement[`text${side}`] = text || _getOperation(value).symbol(value);

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
      ] = _getOperation(value).symbol(value);
      board[rowIndexNeighbour][columnIndexNeighbour][`value${side}`] = value;
    }
  }
}

async function _createMissingElements(level, numberOfPlaceholder) {
  for (var i = 0; i < numberOfPlaceholder; i++) {
    const { rowIndex, columnIndex } = _getRandomFreeTriangle(level);
    const missingElement = {
      direction: _getDirectionOfElement(rowIndex, columnIndex)
    };
    ["Left", "Right", "Hypotenuse"].forEach(side => {
      _createValueOnSide(
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
}

async function generateLevel(numberOfPlaceholder) {
  const level = { board: [], missingElements: [] };
  level.board = await _createBoard(2, 3);
  await _createMissingElements(level, numberOfPlaceholder);
  return level;
}

module.exports = {
  generateLevel,
  _createBoard,
  _getRandomFreeTriangle,
  _createMissingElements,
  _getDirectionOfElement,
  _getOperation,
  _createValueOnSide,
  OPERATIONS
};
