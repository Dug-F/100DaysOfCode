import { naturalNotes, toNaturalNote, getBaseInterval, getBaseIntervalNote } from "../scripts/algorithms.js";

const white = "\x1b[37m";
const red = "\x1b[31m";
const green = "\x1b[32m";

let failCount = 0;

const runTestCases = (func, testCases) => {
  console.log(white, `Testing ${func.name}\n`);
  for (const testCase of testCases) {
    const result = func(testCase.input);
    const colour = result === testCase.expected ? green : red;
    failCount += !(result === testCase.expected);
    console.log(colour, `Input: ${testCase.input}, Expected: ${testCase.expected}, Result: ${result}`);
    console.log(colour, `Test passed: ${result === testCase.expected}\n`);
  }
};

const runTestCases2 = (func, testCases) => {
  console.log(white, `Testing ${func.name}\n`);
  for (const testCase of testCases) {
    const result = func(testCase.input1, testCase.input2);
    const colour = result === testCase.expected ? green : red;
    failCount += !(result === testCase.expected);
    console.log(colour, `Input1: ${testCase.input1}, Input2: ${testCase.input2}, Expected: ${testCase.expected}, Result: ${result}`);
    console.log(colour, `Test passed: ${result === testCase.expected}\n`);
  }
};

const test1 = () => {
  const testCases = [
    { input: "C", expected: "C" },
    { input: "D♯", expected: "D" },
    { input: "F♯", expected: "F" },
    { input: "G♯", expected: "G" },
    { input: "A♯", expected: "A" },
    { input: "B♭", expected: "B" },
    { input: "G7", expected: "G" },
    { input: "", expected: null },
    { input: "K", expected: null },
  ];

  runTestCases(toNaturalNote, testCases);
};

const test2 = () => {
  const testCases = [
    { input: "m3", expected: 3 },
    { input: "dim5", expected: 5 },
    { input: "♭7", expected: 7 },
    { input: "maj9", expected: 9 },
    { input: "aug", expected: null },
    { input: "", expected: null },
    { input: "notAnInterval", expected: null },
  ];

  runTestCases(getBaseInterval, testCases);
};

const test3 = () => {
  const testCases = [
    { input1: "C", input2: "M3", expected: "E" },
    { input1: "Bb", input2: "m7", expected: "A" },
    { input1: "Gb", input2: "aug4", expected: "C" },
    { input1: "D#", input2: "dim5", expected: "A" },
    { input1: "F#", input2: "P4", expected: "B" },
    { input1: "A", input2: "M2", expected: "B" },
  ];

  runTestCases2(getBaseIntervalNote, testCases);
};

test1();
test2();
test3();

console.log(failCount === 0 ? green : red, `Tests failed: ${failCount}`);
