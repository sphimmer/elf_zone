import { input } from "./input";
import { hasSymbol, part1 } from "./solution"


const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;


describe("day 3", () => {
    describe("part 1", () => {
        const lines = testInput.split('\n')
        test('hasSymbol', () => {
            let result = hasSymbol([0,1,2], [lines[0], lines[1]]);
            expect(result).toBe(true)

            result = hasSymbol([5,6,7], [lines[0], lines[1]]);
            expect(result).toBe(false)

            result = hasSymbol([7,8], [lines[5],lines[4], lines[6]])
            expect(result).toBe(false)

        })

        test("part 1 test", () => {
            const result = part1(testInput);
            expect(result).toBe(4361);
        });

        test("part 1 actual", () => {
            const result = part1(input);
            expect(result).toBe(560670);
        })
        
    })
})