/**
 * Instead of just returning a boolean,
 * as is the case in simple.ts, we can make the
 * combinators more practical by returning a SuccessResult
 * or a FailureResult.
 */
type SuccessResult = {
  success: true;
  value: string;
  rest: string;
};

type FailureResult = {
  success: false;
};

type CombinatorResult = SuccessResult | FailureResult;

type Combinator = (s: string) => CombinatorResult;

/**
 * True if the first char of the string matches c.
 */
export function char(c: string): Combinator {
  return (s: string) => {
    if (s[0] === c) {
      return {
        success: true,
        value: c,
        rest: s.substring(1),
      };
    } else {
      return {
        success: false,
      };
    }
  };
}

/**
 * True if either of the combinators returns true.
 */
export function either(...combinators: Combinator[]): Combinator {
  return (s: string) => {
    for (let i = 0; i < combinators.length; i++) {
      const result = combinators[i](s);
      if (result.success) {
        return result;
      }
    }

    return { success: false };
  };
}

export function sequence(...combinators: Combinator[]): Combinator {
  return (s: string) => {
    let rest = s;
    let value = "";

    for (let i = 0; i < combinators.length; i++) {
      const result = combinators[i](rest);
      if (result.success) {
        rest = result.rest;
        value += result.value;
      } else {
        return { success: false };
      }
    }

    return {
      success: true,
      value,
      rest,
    };
  };
}

// A use case for sequence

export const string = (s: string) => sequence(...s.split("").map(char));

/**
 * Return success if the combinator matches at least n times.
 */
export function nOrMore(n: number, combinator: Combinator): Combinator {
  return (str: string) => {
    let matches = 0;
    let rest = str;
    let value = "";

    while (1) {
      const result = combinator(rest);
      if (result.success) {
        matches++;
        value += result.value;
        rest = result.rest;
        continue;
      }
      break;
    }

    if (matches >= n) {
      return {
        success: true,
        value,
        rest,
      };
    }

    return {
      success: false,
    };
  };
}

export function optional(c: Combinator): Combinator {
  return (str: string) => {
    const result = c(str);
    if (result.success) {
      return result;
    }

    return {
      success: true,
      value: "",
      rest: str,
    };
  };
}

// Combining them

export const digit = either(..."0123456789".split("").map(char));
export const hexDigit = either(digit, ..."abcdefABCDEF".split("").map(char));
export const hexNumber = sequence(string("0x"), nOrMore(1, hexDigit));

export const integer = nOrMore(1, digit);
export const floatingPoint = sequence(integer, char("."), integer);
export const number = either(integer, floatingPoint);
