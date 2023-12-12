type Combinator = (s: string) => boolean;

export function char(c: string): Combinator {
  return (s: string) => {
    if (s[0] === c) {
      return true;
    }
    else {
      return false;
    }
  }
}
