import { BasicType, validateObjectKeys } from "../../utils/validationUtils";

describe("validateObjectKeys", () => {
  // test 1
  test("missing required key", () => {
    expect(
      validateObjectKeys(
        {
          name: "John",
          age: 35,
          gender: "MALE",
        },
        [
          { name: "name", type: BasicType.string },
          { name: "lastname", type: BasicType.string },
          { name: "age", type: BasicType.number },
        ],
        [{ name: "gender", type: BasicType.string }]
      )
    ).not.toBe("");
  });

  // test 2
  test("extra key (neither required nor optional)", () => {
    expect(
      validateObjectKeys(
        {
          name: "John",
          lastname: "Doe",
          age: 35,
          gender: "MALE",
          favouriteFood: "lasagna",
        },
        [
          { name: "name", type: BasicType.string },
          { name: "lastname", type: BasicType.string },
          { name: "age", type: BasicType.number },
        ],
        [{ name: "gender", type: BasicType.string }]
      )
    ).not.toBe("");
  });

  // test 3
  test("age must be a string", () => {
    expect(
      validateObjectKeys(
        {
          name: "John",
          lastname: "Doe",
          age: "35",
          gender: "MALE",
        },
        [
          { name: "name", type: BasicType.string },
          { name: "lastname", type: BasicType.string },
          { name: "age", type: BasicType.number },
        ],
        [{ name: "gender", type: BasicType.string }]
      )
    ).not.toBe("");
  });

  // test 4
  test("gender must be a string", () => {
    expect(
      validateObjectKeys(
        {
          name: "John",
          lastname: "Doe",
          age: 35,
          gender: { name: "MALE" },
        },
        [
          { name: "name", type: BasicType.string },
          { name: "lastname", type: BasicType.string },
          { name: "age", type: BasicType.number },
        ],
        [{ name: "gender", type: BasicType.string }]
      )
    ).not.toBe("");
  });

  // test 5
  test("all empty inputs", () => {
    expect(validateObjectKeys({}, [], [])).toBe("");
  });

  // test 6
  test("valid without optional key", () => {
    expect(
      validateObjectKeys(
        {
          name: "John",
          lastname: "Doe",
          age: 35,
        },
        [
          { name: "name", type: BasicType.string },
          { name: "lastname", type: BasicType.string },
          { name: "age", type: BasicType.number },
        ],
        [{ name: "gender", type: BasicType.string }]
      )
    ).toBe("");
  });

  // test 7
  test("valid with optional key", () => {
    expect(
      validateObjectKeys(
        {
          name: "John",
          lastname: "Doe",
          age: 35,
          gender: "MALE",
        },
        [
          { name: "name", type: BasicType.string },
          { name: "lastname", type: BasicType.string },
          { name: "age", type: BasicType.number },
        ],
        [{ name: "gender", type: BasicType.string }]
      )
    ).toBe("");
  });
});
