import { char, hexNumber, sequence, string } from "../src/combinators";

describe("sequence", () => {
	const aAndB = sequence(char("a"), char("b"));

	it("returns true if all of the combinators are true", () => {
		expect(aAndB("abcdef")).toEqual({
			success: true,
			value: "ab",
			rest: "cdef"
		});
	});

	it("returns false any of the combinators are false", () => {
		expect(aAndB("bcdef")).toEqual({
			success: false
		});
    expect(aAndB("xabcdx")).toEqual({
      success: false
    });
	});
});

describe("string", () => {
  it("returns true if a substring is found in the beginning of a string", () => {
    expect(string("abc")("abcdef")).toEqual({
      success: true,
      value: "abc",
      rest: "def"
    });
    expect(string("a")("abcdef")).toEqual({
      success: true,
      value: "a",
      rest: "bcdef"
    });
  });

  it("returns false if a substring is not found in the beginning of a string", () => {
    expect(string("bc")("abcdef")).toEqual({ success: false });
  });
})

describe("hexNumber", () => {
  it("should return a success on a hex number", () => {
    expect(hexNumber("0x1afb")).toEqual({
      success: true,
      value: "0x1afb",
      rest: ""
    });
  });

  // Fails
  it("should return a failure on an invalid hex number", () => {
    expect(hexNumber("0x1G")).toEqual({ success: false });
  });

  it("should return a failure on a string that is not a hex number", () => {
    expect(hexNumber("hello")).toEqual({ success: false });
  });
});
