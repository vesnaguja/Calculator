"use client";
import React, { useState } from "react";

const CALCULATOR_BUTTONS = [
  { symbol: "C", style: "bg-green-200 col-span-3" },
  { symbol: "/", style: "bg-orange-200" },
  { symbol: "7", style: "bg-gray-200" },
  { symbol: "8", style: "bg-gray-200" },
  { symbol: "9", style: "bg-gray-200" },
  { symbol: "*", style: "bg-orange-200" },
  { symbol: "4", style: "bg-gray-200" },
  { symbol: "5", style: "bg-gray-200" },
  { symbol: "6", style: "bg-gray-200" },
  { symbol: "-", style: "bg-orange-200" },
  { symbol: "1", style: "bg-gray-200" },
  { symbol: "2", style: "bg-gray-200" },
  { symbol: "3", style: "bg-gray-200" },
  { symbol: "+", style: "bg-orange-200" },
  { symbol: "0", style: "bg-gray-200" },
  { symbol: ".", style: "bg-gray-200" },
  { symbol: "=", style: "bg-orange-200 col-span-2" },
];

const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | number>(0);

  const calculateExpression = (expression: string): number => {
    const operators = ["+", "-", "*", "/"];
    let currentNumber = "";
    let currentOperator = "";
    let accumulator = 0;

    for (let i = 0; i < expression.length; i++) {
      if (!operators.includes(expression[i])) {
        currentNumber += expression[i];
      } else {
        if (currentOperator === "+") {
          accumulator += parseFloat(currentNumber);
        } else if (currentOperator === "-") {
          accumulator -= parseFloat(currentNumber);
        } else if (currentOperator === "*") {
          accumulator *= parseFloat(currentNumber);
        } else if (currentOperator === "/") {
          accumulator /= parseFloat(currentNumber);
        } else {
          // // If there was no current operator before, the current number is the initial accumulator
          accumulator = parseFloat(currentNumber);
          // console.log("accumulator", accumulator);
        }
        currentNumber = ""; // Reset the current number for the next iteration
        currentOperator = expression[i]; // Update the current operator
      }
    }

    // Perform the final operation with the last number and operator
    if (currentOperator === "+") {
      accumulator += parseFloat(currentNumber);
    } else if (currentOperator === "-") {
      accumulator -= parseFloat(currentNumber);
    } else if (currentOperator === "*") {
      accumulator *= parseFloat(currentNumber);
    } else if (currentOperator === "/") {
      accumulator /= parseFloat(currentNumber);
    }

    return accumulator;
  };

  const handleCalculatorBtn = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
    setResult(0);
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = calculateExpression(input);
      setResult(calculatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClick = (value: string) => {
    if (value === "C") {
      handleClear();
    } else if (value === "=") {
      handleCalculate();
    } else {
      handleCalculatorBtn(value);
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <section className="p-4 bg-gray-300 rounded-xl w-full md:w-2/3 lg:w-1/3">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full text-end bg-gray-300 text-2xl"
        />

        <p className={`${result === 0 ? "invisible" : "visible"} text-end`}>
          {result}
        </p>
      </section>
      <section className="grid gap-2 m-4 grid-cols-4 w-full px-4 md:w-2/3 lg:w-1/3">
        {CALCULATOR_BUTTONS.map(({ symbol, style }) => (
          <button
            key={symbol}
            onClick={() => handleClick(symbol)}
            className={`${style} p-2 rounded`}
          >
            {symbol}
          </button>
        ))}
      </section>
    </main>
  );
};

export default Home;
