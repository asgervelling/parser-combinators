/**
 * These combinators and parsers are simple, for demonstration purposes.
 * They only match a single char. Not how you would do it,
 * but it illustrates how they work.
 * See other TS file for more realistic implementations.
 */
type Combinator = (s: string) => boolean;

/**
 * True if the first char of the string matches c.
 */
export function char(c: string): Combinator {
  return (s: string) => {
    if (s[0] === c) {
      return true;
    }
    else {
      return false;
    }
  };
}

/**
 * True if either of the combinators returns true.
 */
export function either(...combinators: Combinator[]): Combinator {
  return (s: string) => {
    for (let i = 0; i < combinators.length; i++) {
      if (combinators[i](s)) {
        return true;
      }
    }

    return false;
  };
}

// Some use cases for either

export const digit = either(..."0123456789".split("").map(char));
export const hexDigit = either(digit, ..."abcdefABCDEF".split("").map(char));