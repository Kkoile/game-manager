jest.mock("random");
const random = require("random");

const generatorSpec = require("../lib/generator");

beforeEach(() => {
  random.int.mockReset();
  random.float.mockReset();
  random.boolean.mockReset();
});

test("resulting level should have board attribute", async () => {
  random.int.mockReturnValue(1);
  random.boolean.mockReturnValue(false);
  random.float.mockReturnValue(0.1);
  const level = await generatorSpec.generateLevel(1);
  expect(level.board).toBeDefined();
  expect(Array.isArray(level.board)).toBeTruthy();
});

test("board should have at least one element", async () => {
  random.int.mockReturnValue(1);
  random.boolean.mockReturnValue(false);
  random.float.mockReturnValue(0.1);
  const level = await generatorSpec.generateLevel(1);
  expect(level.board.length).toBeGreaterThan(0);
  expect(level.board[0].length).toBeGreaterThan(0);
});

test("resulting level should have missingElements attribute", async () => {
  random.int.mockReturnValue(1);
  random.boolean.mockReturnValue(false);
  random.float.mockReturnValue(0.1);
  const level = await generatorSpec.generateLevel(1);
  expect(level.missingElements).toBeDefined();
  expect(Array.isArray(level.missingElements)).toBeTruthy();
});

test("missingElements should contain at least one element", async () => {
  random.int.mockReturnValue(1);
  random.boolean.mockReturnValue(false);
  random.float.mockReturnValue(0.1);
  const level = await generatorSpec.generateLevel(1);
  expect(level.missingElements.length).toBeGreaterThan(0);
});

test("missingElement should have required attributes", async () => {
  random.int.mockReturnValue(1);
  random.boolean.mockReturnValue(false);
  random.float.mockReturnValue(0.1);
  const level = await generatorSpec.generateLevel(1);
  const missingElement = level.missingElements[0];
  expect(missingElement).toHaveProperty("direction");
  expect(missingElement).toHaveProperty("textHypotenuse");
  expect(typeof missingElement.textHypotenuse).toBe("string");
  expect(missingElement).toHaveProperty("valueHypotenuse");
  expect(typeof missingElement.valueHypotenuse).toBe("number");
  expect(missingElement).toHaveProperty("textRight");
  expect(typeof missingElement.textRight).toBe("string");
  expect(missingElement).toHaveProperty("valueRight");
  expect(typeof missingElement.valueRight).toBe("number");
  expect(missingElement).toHaveProperty("textLeft");
  expect(typeof missingElement.textLeft).toBe("string");
  expect(missingElement).toHaveProperty("valueLeft");
  expect(typeof missingElement.valueLeft).toBe("number");
});

test("_createBoard should create a board with filled elements", async () => {
  const board = await generatorSpec._createBoard(2, 3);
  expect(board).toStrictEqual([
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ]);
});

test("_createBoard should create a board with three rows and one column", async () => {
  const board = await generatorSpec._createBoard(3, 1);
  expect(board).toStrictEqual([
    [{ filled: true }],
    [{ filled: true }],
    [{ filled: true }]
  ]);
});

test("_getRandomFreeTriangle return random free index", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { filled: true }, { filled: true }]
    ]
  };
  random.int.mockReturnValue(1);
  const { rowIndex, columnIndex } = generatorSpec._getRandomFreeTriangle(level);
  expect(rowIndex).toBe(1);
  expect(columnIndex).toBe(1);
});

test("_getRandomFreeTriangle should call itself again, because one is already taken", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { placeholder: true }, { filled: true }]
    ]
  };
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  const { rowIndex, columnIndex } = generatorSpec._getRandomFreeTriangle(level);
  expect(rowIndex).toBe(0);
  expect(columnIndex).toBe(1);
});

test("_getRandomFreeTriangle should throw an error, if there is no free tile", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { placeholder: true }, { filled: true }]
    ]
  };
  expect(() => generatorSpec._getRandomFreeTriangle(level)).toThrow();
});

test("_createMissingElements should create one missing element", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { filled: true }, { filled: true }]
    ],
    missingElements: []
  };
  random.int.mockReturnValue(1);

  random.int.mockReturnValue(0);

  random.float.mockReturnValue(0.1);

  await generatorSpec._createMissingElements(level, 1);
  expect(level.missingElements.length).toBe(1);
});

test("_createMissingElements should create two missing element", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { filled: true }, { filled: true }]
    ],
    missingElements: []
  };
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);

  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);

  random.float.mockReturnValueOnce(0.1);

  await generatorSpec._createMissingElements(level, 2);
  expect(level.missingElements.length).toBe(2);
});

test("_createMissingElements should rotate an element", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { filled: true }, { filled: true }]
    ],
    missingElements: []
  };
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(2);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(3);
  random.int.mockReturnValueOnce(0);

  random.float.mockReturnValueOnce(0.7);
  random.boolean.mockReturnValueOnce(true);
  random.int.mockReturnValueOnce(1);
  random.float.mockReturnValueOnce(0.7);

  await generatorSpec._createMissingElements(level, 1);
  expect(level.missingElements.length).toBe(1);
  expect(level.missingElements[0].direction).toBe("up");
  expect(level.missingElements[0].valueLeft).toBe(2);
  expect(level.missingElements[0].valueRight).toBe(3);
  expect(level.missingElements[0].valueHypotenuse).toBe(1);
});

test("_createMissingElements should split up an element", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { filled: true }, { filled: true }]
    ],
    missingElements: []
  };
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(2);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(3);
  random.int.mockReturnValueOnce(0);

  random.float.mockReturnValueOnce(0.7);
  random.boolean.mockReturnValueOnce(false);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);

  await generatorSpec._createMissingElements(level, 1);
  expect(level.missingElements.length).toBe(2);
  expect(level.missingElements[0].direction).toBe("down");
  expect(level.missingElements[0].valueLeft).toBe(0);
  expect(level.missingElements[0].valueRight).toBe(1);
  expect(level.missingElements[0].valueHypotenuse).toBe(1);
  expect(level.missingElements[1].direction).toBe("down");
  expect(level.missingElements[1].valueLeft).toBe(1);
  expect(level.missingElements[1].valueRight).toBe(1);
  expect(level.missingElements[1].valueHypotenuse).toBe(2);
});

test("_scrambleElements should scramble for a certain probability", async () => {
  const element = {
    direction: "down",
    valueLeft: 1,
    textLeft: "1",
    valueRight: 2,
    textRight: "2",
    valueHypotenuse: 3,
    textHypotenuse: "3"
  };
  random.float.mockReturnValueOnce(0.7);
  random.boolean.mockReturnValueOnce(true);
  random.float.mockReturnValueOnce(0.5);

  const newElements = generatorSpec._scrambleElements([element]);
  expect(newElements.length).toBe(1);
  expect(newElements[0].direction).toBe("up");
  expect(newElements[0].valueLeft).toBe(2);
  expect(newElements[0].valueRight).toBe(3);
  expect(newElements[0].valueHypotenuse).toBe(1);
});

test("_scrambleElements should first rotate then split", async () => {
  const element = {
    direction: "down",
    valueLeft: 1,
    textLeft: "1",
    valueRight: 2,
    textRight: "2",
    valueHypotenuse: 3,
    textHypotenuse: "3"
  };
  random.float.mockReturnValueOnce(0.7);
  random.boolean.mockReturnValueOnce(true);
  random.float.mockReturnValueOnce(0.8);
  random.boolean.mockReturnValueOnce(false);
  random.int.mockReturnValueOnce(2);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(3);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.float.mockReturnValueOnce(0.8);

  const newElements = generatorSpec._scrambleElements([element]);
  expect(newElements.length).toBe(2);
  expect(newElements[0].direction).toBe("up");
  expect(newElements[0].valueLeft).toBe(2);
  expect(newElements[0].valueRight).toBe(3);
  expect(newElements[0].valueHypotenuse).toBe(1);
});

test("_splitUpElement should split elements", async () => {
  const element = {
    direction: "down",
    valueLeft: 1,
    textLeft: "1",
    valueRight: 2,
    textRight: "2",
    valueHypotenuse: 3,
    textHypotenuse: "3"
  };

  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(2);
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);

  const newElements = generatorSpec._splitUpElement(element);
  expect(newElements.length).toBe(2);
  expect(newElements[0].direction).toBe("down");
  expect(newElements[0].valueLeft).toBe(1);
  expect(newElements[0].valueRight).toBe(1);
  expect(newElements[0].valueHypotenuse).toBe(2);
  expect(newElements[0].textHypotenuse).toBe("√4");
  expect(newElements[1].direction).toBe("down");
  expect(newElements[1].valueLeft).toBe(0);
  expect(newElements[1].valueRight).toBe(1);
  expect(newElements[1].valueHypotenuse).toBe(1);
});

test("_rotateElement should rotate one clockwise", async () => {
  const element = {
    direction: "down",
    valueLeft: 1,
    textLeft: "1",
    valueRight: 2,
    textRight: "2",
    valueHypotenuse: 3,
    textHypotenuse: "3"
  };
  generatorSpec._rotateElement(element);
  expect(element.direction).toBe("up");
  expect(element.valueLeft).toBe(2);
  expect(element.valueRight).toBe(3);
  expect(element.valueHypotenuse).toBe(1);
});

test("_rotateElement should rotate two clockwise", async () => {
  const element = {
    direction: "up",
    valueLeft: 1,
    textLeft: "1",
    valueRight: 2,
    textRight: "2",
    valueHypotenuse: 3,
    textHypotenuse: "3"
  };
  generatorSpec._rotateElement(element);
  expect(element.direction).toBe("down");
  expect(element.valueLeft).toBe(2);
  expect(element.valueRight).toBe(3);
  expect(element.valueHypotenuse).toBe(1);
});

test("_getDirectionOfElement should work", async () => {
  expect(generatorSpec._getDirectionOfElement(1, 1)).toBe("up");
  expect(generatorSpec._getDirectionOfElement(0, 0)).toBe("up");
  expect(generatorSpec._getDirectionOfElement(0, 1)).toBe("down");
  expect(generatorSpec._getDirectionOfElement(1, 0)).toBe("down");
});

test("_getOperation should return random operation", async () => {
  random.int.mockReturnValue(0);
  expect(generatorSpec._getOperation(1)).toStrictEqual(
    generatorSpec.OPERATIONS[0]
  );
});

test("_getOperation should return other random operation", async () => {
  random.int.mockReturnValue(1);
  expect(generatorSpec._getOperation(1)).toStrictEqual(
    generatorSpec.OPERATIONS[1]
  );
});

test("_getOperation should not return the same operation as given", async () => {
  random.int.mockReturnValueOnce(1);
  expect(
    generatorSpec._getOperation(1, generatorSpec.OPERATIONS[1])
  ).toStrictEqual(generatorSpec.OPERATIONS[2]);
});

test("_getOperation should return the same operation as given if it is allowed", async () => {
  random.int.mockReturnValueOnce(0);
  expect(
    generatorSpec._getOperation(1, generatorSpec.OPERATIONS[0])
  ).toStrictEqual(generatorSpec.OPERATIONS[0]);
});

test("_getOperation should return same value for a ridiculous high number", async () => {
  random.int.mockReturnValueOnce(0);
  expect(generatorSpec._getOperation(10000)).toStrictEqual(
    generatorSpec.OPERATIONS[0]
  );
});

test("_createValueOnSide should create left side also on neighbour with direction up", async () => {
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "up" };
  generatorSpec._createValueOnSide(board, missingElement, 1, 1, "Left");
  expect(missingElement.valueLeft).toBe(1);
  expect(missingElement.textLeft).toBe("1");
  expect(board[1][0].valueLeft).toBe(1);
  expect(board[1][0].textLeft).toBe("1");
});

test("_createValueOnSide should create left side also on neighbour with direction down", async () => {
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "down" };
  generatorSpec._createValueOnSide(board, missingElement, 0, 1, "Left");
  expect(missingElement.valueLeft).toBe(1);
  expect(missingElement.textLeft).toBe("1");
  expect(board[0][2].valueLeft).toBe(1);
  expect(board[0][2].textLeft).toBe("1");
});

test("_createValueOnSide should not create left side on neighbour, because there is none", async () => {
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "up" };
  generatorSpec._createValueOnSide(board, missingElement, 0, 0, "Left");
  expect(missingElement.valueLeft).toBe(1);
  expect(missingElement.textLeft).toBe("1");
});

test("_createValueOnSide should create right side also on neighbour with direction up", async () => {
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "up" };
  generatorSpec._createValueOnSide(board, missingElement, 1, 1, "Right");
  expect(missingElement.valueRight).toBe(1);
  expect(missingElement.textRight).toBe("1");
  expect(board[1][2].valueRight).toBe(1);
  expect(board[1][2].textRight).toBe("1");
});

test("_createValueOnSide should create right side also on neighbour with direction down", async () => {
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  random.int.mockReturnValueOnce(0);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "down" };
  generatorSpec._createValueOnSide(board, missingElement, 0, 1, "Right");
  expect(missingElement.valueRight).toBe(1);
  expect(missingElement.textRight).toBe("1");
  expect(board[0][0].valueRight).toBe(1);
  expect(board[0][0].textRight).toBe("1");
});

test("_createValueOnSide should not create right side on neighbour, because there is none", async () => {
  random.int.mockReturnValueOnce(1);
  random.int.mockReturnValueOnce(0);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "up" };
  generatorSpec._createValueOnSide(board, missingElement, 0, 2, "Right");
  expect(missingElement.valueRight).toBe(1);
  expect(missingElement.textRight).toBe("1");
});

test("_createValueOnSide should respect already created element", async () => {
  const board = [
    [
      { placeholder: true },
      { filled: true, textHypotenuse: "1", valueHypotenuse: 1 },
      { filled: true }
    ],
    [
      { filled: true, textHypotenuse: "1", valueHypotenuse: 1 },
      { filled: true },
      { filled: true }
    ]
  ];
  const missingElement = { direction: "down" };
  generatorSpec._createValueOnSide(board, missingElement, 1, 0, "Hypotenuse");
  expect(missingElement.valueHypotenuse).toBe(1);
  expect(missingElement.textHypotenuse).toBe("1");
  expect(board[0][0].valueHypotenuse).not.toBeDefined();
});
