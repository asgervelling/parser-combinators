import { char, either } from "../src/combinators";

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