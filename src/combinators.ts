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
}

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
        rest: s.substring(1)
      };
    }
    else {
      return {
        success: false
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
      const result = combinators[i](s);
      if (result.success) {
        rest = result.rest;
        value += result.value;
      }
      else {
        return { success: false };
      }
    }

    return {
      success: true,
      value,
      rest
    }
  };
}

// Some use cases for either

export const digit = either(..."0123456789".split("").map(char));
export const hexDigit = either(digit, ..."abcdefABCDEF".split("").map(char));