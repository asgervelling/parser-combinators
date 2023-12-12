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
export function either(...combinators: Combinator[]) {
  return (s: string) => {
    for (let i = 0; i < combinators.length; i++) {
      if (combinators[i](s)) {
        return true;
      }
    }

    return false;
  };
}