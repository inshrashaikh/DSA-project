import express from "express";
import { infixToPostfix } from "../algorithms/infixToPostfix.js";
import { infixToPrefix } from "../algorithms/infixToPrefix.js";

export const router = express.Router();

const sampleExpression = "A+B*(C-D)";

router.get("/", (req, res) => {
  res.render("index", {
    expression: "",
    mode: "postfix",
    result: null,
    error: null,
  });
});

router.post("/convert", (req, res) => {
  const expression = String(req.body.expression || "").trim();
  const mode = req.body.mode === "prefix" ? "prefix" : "postfix";
  const result =
    mode === "prefix" ? infixToPrefix(expression) : infixToPostfix(expression);

  res.render("index", {
    expression,
    mode,
    result,
    error: result.success ? null : result.error,
  });
});

router.get("/visualizer", (req, res) => {
  const result = infixToPostfix(sampleExpression);

  res.render("visualizer", {
    expression: sampleExpression,
    result,
    error: result.success ? null : result.error,
  });
});

export default router;
