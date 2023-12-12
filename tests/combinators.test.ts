import { char, sequence } from "../src/combinators";

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
	});
});