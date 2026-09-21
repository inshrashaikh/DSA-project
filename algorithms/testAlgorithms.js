import assert from "node:assert/strict";
import Stack from "./Stack.js";
import tokenize from "./tokenizer.js";
import { validateExpression } from "./validator.js";
import { infixToPostfix } from "./infixToPostfix.js";
import { infixToPrefix } from "./infixToPrefix.js";

const runStackTests = () => {
  const stack = new Stack();

  stack.push("A");
  stack.push("B");
  stack.push("C");
  assert.equal(stack.peek(), "C");
  assert.equal(stack.pop(), "C");
  assert.equal(stack.size(), 2);
  assert.deepEqual(stack.toArray(), ["A", "B"]);

  const empty = new Stack();
  assert.equal(empty.pop(), undefined);
  assert.equal(empty.peek(), undefined);
  assert.equal(empty.isEmpty(), true);
  assert.equal(empty.size(), 0);
  assert.deepEqual(empty.toArray(), []);

  empty.clear();
  assert.equal(empty.size(), 0);
};

const runTokenizerTests = () => {
  assert.deepEqual(tokenize("A + B * (C - D)"), [
    "A",
    "+",
    "B",
    "*",
    "(",
    "C",
    "-",
    "D",
    ")",
  ]);
  assert.deepEqual(tokenize(" total + price * quantity "), [
    "total",
    "+",
    "price",
    "*",
    "quantity",
  ]);
  assert.deepEqual(tokenize("10 + 25.50 / 3"), ["10", "+", "25.50", "/", "3"]);
  assert.deepEqual(tokenize("A + B * C"), ["A", "+", "B", "*", "C"]);
};

const runValidationTests = () => {
  assert.deepEqual(validateExpression("A+B"), { valid: true, error: null });
  assert.deepEqual(validateExpression("A+B*C"), { valid: true, error: null });
  assert.deepEqual(validateExpression("A+"), {
    valid: false,
    error: { message: "Operator at end of expression", position: 1 },
  });
  assert.deepEqual(validateExpression("+A"), {
    valid: false,
    error: { message: "Operator at start of expression", position: 0 },
  });
  assert.deepEqual(validateExpression("A+*B"), {
    valid: false,
    error: { message: "Consecutive operators are not allowed", position: 2 },
  });
  assert.deepEqual(validateExpression("A**B"), {
    valid: false,
    error: { message: "Consecutive operators are not allowed", position: 2 },
  });
  assert.deepEqual(validateExpression("(A+B"), {
    valid: false,
    error: { message: "Missing closing parenthesis", position: 3 },
  });
  assert.deepEqual(validateExpression("A+B)"), {
    valid: false,
    error: { message: "Unexpected closing parenthesis", position: 3 },
  });
  assert.deepEqual(validateExpression("A B"), {
    valid: false,
    error: { message: "Missing operator between operands", position: 2 },
  });
  assert.deepEqual(validateExpression("A+B@C"), {
    valid: false,
    error: { message: "Invalid character found", position: 3 },
  });
  assert.deepEqual(validateExpression("((A+B)"), {
    valid: false,
    error: { message: "Missing closing parenthesis", position: 5 },
  });
};

const runInfixToPostfixTests = () => {
  const tests = [
    { expression: "A+B", expected: "A B +" },
    { expression: "A+B*C", expected: "A B C * +" },
    { expression: "(A+B)*C", expected: "A B + C *" },
    { expression: "A*(B+C)", expected: "A B C + *" },
    { expression: "A+B*(C-D)", expected: "A B C D - * +" },
    { expression: "(A+B)*(C-D)", expected: "A B + C D - *" },
    { expression: "A^B^C", expected: "A B C ^ ^" },
    { expression: "10+20*5", expected: "10 20 5 * +" },
    { expression: "100/(20+5)", expected: "100 20 5 + /" },
    {
      expression: "total + price * quantity",
      expected: "total price quantity * +",
    },
  ];

  for (const { expression, expected } of tests) {
    const result = infixToPostfix(expression);
    assert.equal(result.success, true, `Expected success for ${expression}`);
    assert.equal(
      result.postfix,
      expected,
      `Expected ${expected} for ${expression}, got ${result.postfix}`,
    );
    assert.ok(
      Array.isArray(result.steps),
      `Steps should be array for ${expression}`,
    );
    assert.ok(
      result.steps.length > 0,
      `Steps should not be empty for ${expression}`,
    );
    for (const step of result.steps) {
      assert.ok(step.token !== undefined);
      assert.ok(step.action !== undefined);
      assert.ok(step.reason !== undefined);
      assert.ok(Array.isArray(step.stack));
      assert.ok(Array.isArray(step.output));
      assert.deepEqual(step.stack, [...step.stack]);
      assert.deepEqual(step.output, [...step.output]);
    }
  }

  const invalid = infixToPostfix("A+");
  assert.equal(invalid.success, false);
  assert.equal(invalid.postfix, null);
  assert.deepEqual(invalid.error.message, "Operator at end of expression");
};

const runInfixToPrefixTests = () => {
  const tests = [
    { expression: "A+B", expected: "+ A B" },
    { expression: "A+B*C", expected: "+ A * B C" },
    { expression: "(A+B)*C", expected: "* + A B C" },
    { expression: "A*(B+C)", expected: "* A + B C" },
    { expression: "A+B*(C-D)", expected: "+ A * B - C D" },
    { expression: "A^B^C", expected: "^ A ^ B C" },
    { expression: "10+20*5", expected: "+ 10 * 20 5" },
    { expression: "100/(20+5)", expected: "/ 100 + 20 5" },
  ];

  for (const { expression, expected } of tests) {
    const result = infixToPrefix(expression);
    assert.equal(result.success, true, `Expected success for ${expression}`);
    assert.equal(
      result.prefix,
      expected,
      `Expected ${expected} for ${expression}, got ${result.prefix}`,
    );
    assert.ok(Array.isArray(result.steps));
    assert.ok(result.steps.length > 0);
  }

  const invalid = infixToPrefix("A+");
  assert.equal(invalid.success, false);
  assert.equal(invalid.prefix, null);
};

runStackTests();
runTokenizerTests();
runValidationTests();
runInfixToPostfixTests();
runInfixToPrefixTests();

console.log("All algorithm tests passed.");
