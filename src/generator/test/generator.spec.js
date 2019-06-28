const random = require("random");

const generatorSpec = require("../lib/generator");

afterEach(() => {
  jest.restoreAllMocks();
});

test("generateLevel should call required methods", async () => {
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const _createBoardSpy = jest
    .spyOn(generatorSpec, "_createBoard")
    .mockResolvedValueOnce(board);
  const _createMissingElementsSpy = jest
    .spyOn(generatorSpec, "_createMissingElements")
    .mockResolvedValueOnce();
  await generatorSpec.generateLevel(1);
  expect(_createBoardSpy).toHaveBeenCalledTimes(1);
  expect(_createMissingElementsSpy).toHaveBeenCalledTimes(1);
  expect(_createMissingElementsSpy).toHaveBeenCalledWith(
    { board: board, missingElements: [] },
    1
  );
});

test("resulting level should have board attribute", async () => {
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  jest.spyOn(generatorSpec, "_createBoard").mockResolvedValueOnce(board);
  jest.spyOn(generatorSpec, "_createMissingElements").mockResolvedValueOnce();
  const level = await generatorSpec.generateLevel(1);
  expect(level.board).toBeDefined();
  expect(Array.isArray(level.board)).toBeTruthy();
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
  jest.spyOn(random, "int").mockReturnValue(1);
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
  jest
    .spyOn(random, "int")
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(1);
  const { rowIndex, columnIndex } = generatorSpec._getRandomFreeTriangle(level);
  expect(rowIndex).toBe(0);
  expect(columnIndex).toBe(1);
});

test("_getRandomFreeTriangle should throw an error, if there is no free tile", async () => {
  const level = {
    board: [
      [{ placeholder: true }, { placeholder: true }, { placeholder: true }],
      [{ placeholder: true }, { placeholder: true }, { placeholder: true }]
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
  const _randomFreeTriangleSpy = jest
    .spyOn(generatorSpec, "_getRandomFreeTriangle")
    .mockReturnValue({ rowIndex: 1, columnIndex: 1 });

  const _createValueOnSideSpy = jest
    .spyOn(generatorSpec, "_createValueOnSide")
    .mockReturnValue();
  const _scrambleElementsSpy = jest
    .spyOn(generatorSpec, "_scrambleElements")
    .mockImplementation(missingElements => missingElements);

  await generatorSpec._createMissingElements(level, 1);
  expect(level.missingElements.length).toBe(1);
  expect(_randomFreeTriangleSpy).toHaveBeenCalledTimes(1);
  expect(_randomFreeTriangleSpy).toHaveBeenCalledWith(level);
  expect(_createValueOnSideSpy).toHaveBeenCalledTimes(3);
  expect(_createValueOnSideSpy).toHaveBeenNthCalledWith(
    1,
    level.board,
    expect.anything(),
    1,
    1,
    "Left"
  );
  expect(_createValueOnSideSpy).toHaveBeenNthCalledWith(
    2,
    level.board,
    expect.anything(),
    1,
    1,
    "Right"
  );
  expect(_createValueOnSideSpy).toHaveBeenNthCalledWith(
    3,
    level.board,
    expect.anything(),
    1,
    1,
    "Hypotenuse"
  );
  expect(_scrambleElementsSpy).toHaveBeenCalledTimes(1);
});

test("_createMissingElements should create two missing element", async () => {
  const level = {
    board: [
      [{ filled: true }, { filled: true }, { filled: true }],
      [{ filled: true }, { filled: true }, { filled: true }]
    ],
    missingElements: []
  };

  const _randomFreeTriangleSpy = jest
    .spyOn(generatorSpec, "_getRandomFreeTriangle")
    .mockReturnValueOnce({ rowIndex: 0, columnIndex: 1 })
    .mockReturnValueOnce({ rowIndex: 1, columnIndex: 1 });

  const _createValueOnSideSpy = jest
    .spyOn(generatorSpec, "_createValueOnSide")
    .mockReturnValue();
  const _scrambleElementsSpy = jest
    .spyOn(generatorSpec, "_scrambleElements")
    .mockImplementation(missingElements => missingElements);

  await generatorSpec._createMissingElements(level, 2);
  expect(level.missingElements.length).toBe(2);
  expect(_randomFreeTriangleSpy).toHaveBeenCalledTimes(2);
  expect(_createValueOnSideSpy).toHaveBeenCalledTimes(6);
  expect(_scrambleElementsSpy).toHaveBeenCalledTimes(1);
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
  jest
    .spyOn(random, "float")
    .mockReturnValueOnce(0.7)
    .mockReturnValueOnce(0.5);
  jest.spyOn(random, "boolean").mockReturnValueOnce(true);
  const _rotateElementSpy = jest
    .spyOn(generatorSpec, "_rotateElement")
    .mockReturnValue();

  const newElements = generatorSpec._scrambleElements([element]);
  expect(newElements.length).toBe(1);
  expect(_rotateElementSpy).toHaveBeenCalledTimes(1);
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

  jest
    .spyOn(random, "float")
    .mockReturnValueOnce(0.7)
    .mockReturnValueOnce(0.8)
    .mockReturnValueOnce(0.8);
  jest
    .spyOn(random, "boolean")
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);
  const _rotateElementSpy = jest
    .spyOn(generatorSpec, "_rotateElement")
    .mockReturnValue();
  const _splitUpElementSpy = jest
    .spyOn(generatorSpec, "_splitUpElement")
    .mockImplementation(element => [element, element]);

  const newElements = generatorSpec._scrambleElements([element]);
  expect(newElements.length).toBe(2);
  expect(_rotateElementSpy).toHaveBeenCalledTimes(1);
  expect(_splitUpElementSpy).toHaveBeenCalledTimes(1);
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

  jest
    .spyOn(random, "int")
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(2);

  jest
    .spyOn(generatorSpec, "_getOperation")
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce({ symbol: value => `√${Math.pow(value, 2)}` })
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])

    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0])
    .mockReturnValueOnce(generatorSpec.OPERATIONS[0]);

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

test("_rotateElement should rotate clockwise too", async () => {
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
  jest.spyOn(random, "int").mockReturnValueOnce(0);
  expect(generatorSpec._getOperation(1)).toStrictEqual(
    generatorSpec.OPERATIONS[0]
  );
});

test("_getOperation should return other random operation", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  expect(generatorSpec._getOperation(1)).toStrictEqual(
    generatorSpec.OPERATIONS[1]
  );
});

test("_getOperation should not return the same operation as given", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  expect(
    generatorSpec._getOperation(1, generatorSpec.OPERATIONS[1])
  ).toStrictEqual(generatorSpec.OPERATIONS[2]);
});

test("_getOperation should return the same operation as given if it is allowed", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(0);
  expect(
    generatorSpec._getOperation(1, generatorSpec.OPERATIONS[0])
  ).toStrictEqual(generatorSpec.OPERATIONS[0]);
});

test("_getOperation should return same value for a ridiculous high number", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(0);
  expect(generatorSpec._getOperation(10000)).toStrictEqual(
    generatorSpec.OPERATIONS[0]
  );
});

test("_createValueOnSide should create left side also on neighbour with direction up", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  const _getOperationSpy = jest
    .spyOn(generatorSpec, "_getOperation")
    .mockReturnValue(generatorSpec.OPERATIONS[0]);
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
  expect(_getOperationSpy).toHaveBeenCalledTimes(2);
});

test("_createValueOnSide should create left side also on neighbour with direction down", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  const _getOperationSpy = jest
    .spyOn(generatorSpec, "_getOperation")
    .mockReturnValue(generatorSpec.OPERATIONS[0]);
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
  expect(_getOperationSpy).toHaveBeenCalledTimes(2);
});

test("_createValueOnSide should not create left side on neighbour, because there is none", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  const _getOperationSpy = jest
    .spyOn(generatorSpec, "_getOperation")
    .mockReturnValue(generatorSpec.OPERATIONS[0]);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "up" };
  generatorSpec._createValueOnSide(board, missingElement, 0, 0, "Left");
  expect(missingElement.valueLeft).toBe(1);
  expect(missingElement.textLeft).toBe("1");
  expect(_getOperationSpy).toHaveBeenCalledTimes(1);
});

test("_createValueOnSide should create right side also on neighbour with direction up", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  const _getOperationSpy = jest
    .spyOn(generatorSpec, "_getOperation")
    .mockReturnValue(generatorSpec.OPERATIONS[0]);
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
  expect(_getOperationSpy).toHaveBeenCalledTimes(2);
});

test("_createValueOnSide should create right side also on neighbour with direction down", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  const _getOperationSpy = jest
    .spyOn(generatorSpec, "_getOperation")
    .mockReturnValue(generatorSpec.OPERATIONS[0]);
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
  expect(_getOperationSpy).toHaveBeenCalledTimes(2);
});

test("_createValueOnSide should not create right side on neighbour, because there is none", async () => {
  jest.spyOn(random, "int").mockReturnValueOnce(1);
  const _getOperationSpy = jest
    .spyOn(generatorSpec, "_getOperation")
    .mockReturnValue(generatorSpec.OPERATIONS[0]);
  const board = [
    [{ filled: true }, { filled: true }, { filled: true }],
    [{ filled: true }, { filled: true }, { filled: true }]
  ];
  const missingElement = { direction: "up" };
  generatorSpec._createValueOnSide(board, missingElement, 0, 2, "Right");
  expect(missingElement.valueRight).toBe(1);
  expect(missingElement.textRight).toBe("1");
  expect(_getOperationSpy).toHaveBeenCalledTimes(1);
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
