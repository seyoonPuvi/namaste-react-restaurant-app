import { sum } from "../components/sum";

test("this test function calculates sum of the two numbers", () => {
  const result = sum(5, 7);
  expect(result).toBe(12);
});
