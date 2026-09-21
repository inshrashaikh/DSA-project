const isWhitespace = (char) => /\s/.test(char);
const isDigit = (char) => /[0-9]/.test(char);
const isIdentifierStart = (char) => /[A-Za-z_]/.test(char);
const isIdentifierPart = (char) => /[A-Za-z0-9_]/.test(char);
const isOperator = (char) => /[+\-*/%^]/.test(char);
const isParenthesis = (char) => /[()]/.test(char);

function tokenizeWithPositions(expression = "") {
  const tokens = [];
  const source = String(expression);

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (isWhitespace(char)) {
      continue;
    }

    if (isIdentifierStart(char)) {
      let identifier = char;
      let j = i + 1;

      while (j < source.length && isIdentifierPart(source[j])) {
        identifier += source[j];
        j += 1;
      }

      tokens.push({ value: identifier, position: i });
      i = j - 1;
      continue;
    }

    if (
      isDigit(char) ||
      (char === "." && i + 1 < source.length && isDigit(source[i + 1]))
    ) {
      let number = char;
      let dotUsed = char === ".";
      let j = i + 1;

      while (j < source.length) {
        const nextChar = source[j];

        if (isDigit(nextChar)) {
          number += nextChar;
          j += 1;
          continue;
        }

        if (nextChar === "." && !dotUsed) {
          dotUsed = true;
          number += nextChar;
          j += 1;
          continue;
        }

        break;
      }

      tokens.push({ value: number, position: i });
      i = j - 1;
      continue;
    }

    if (isOperator(char) || isParenthesis(char)) {
      tokens.push({ value: char, position: i });
      continue;
    }

    tokens.push({ value: char, position: i });
  }

  return tokens;
}

function tokenize(expression = "") {
  return tokenizeWithPositions(expression).map((token) => token.value);
}

export { tokenizeWithPositions };
export default tokenize;
