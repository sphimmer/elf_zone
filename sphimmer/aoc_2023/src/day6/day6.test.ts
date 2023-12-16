import { input } from "./input";
import { part1, part2 } from "./solution"

const testInput = 
`Time:      7  15   30
Distance:  9  40  200`;
describe("day 6", () => {
    describe("part 1", () => {
        test("test input", () => {
            const result = part1(testInput)
            expect(result).toBe(288);
        })
        test("actual input", () => {
            const result = part1(input)
            expect(result).toBe(6209190);
        })
    })

    describe("part 2", () => {
        test("test input", () => {
            const result = part2(testInput);
            expect(result).toBe(71503);
        });

        test("actual input", () => {
            const result = part2(input);
            expect(result).toBe(28545089);
        })
    })
})