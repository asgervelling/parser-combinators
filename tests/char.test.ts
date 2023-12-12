import { char } from "../src/combinators";

describe("char", () => {
  test("matches a single character", () => {
    expect(char("H")("Hello")).toBe(true);
  });

  test("fails if the character is not expected", () => {
    expect(char("e")("Hello")).toBe(false);
  });
});