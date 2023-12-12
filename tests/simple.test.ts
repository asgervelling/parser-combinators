import { char, either, digit, hexDigit } from "../src/simple";

describe("char", () => {
  test("matches a single character", () => {
    expect(char("H")("Hello")).toBe(true);
  });

  test("fails if the character is not expected", () => {
    expect(char("e")("Hello")).toBe(false);
  });
});

describe("either", () => {
  const aOrB = either(char("a"), char("b"));

  test("returns true if any of the combinators return true", () => {
    expect(aOrB("a")).toBe(true);
    expect(aOrB("b")).toBe(true);
  });

  test("returns false if any of the combinators return false", () => {
    expect(aOrB("c")).toBe(false);
  });
});

describe("digit", () => {
  test("returns true if the character is a digit", () => {
    expect(digit("1")).toBe(true);
  });

  test("returns false if the character is not a digit", () => {
    expect(digit("a")).toBe(false);
  })
});

describe("hexDigit", () => {
  test("returns true if the character is a hex digit", () => {
    expect(hexDigit("a")).toBe(true);
    expect(hexDigit("1")).toBe(true);
  });

  test("returns false if the character is not a hex digit", () => {
    expect(hexDigit("g")).toBe(false);
  });
});