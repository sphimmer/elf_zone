import { input } from "./input";
import { getAllIndexes, getGearRatioNumbers, hasSymbol, part1, part2 } from "./solution"


const testInput = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const lines = testInput.split('\n')
describe("day 3", () => {
    describe("part 1", () => {
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

    describe('part 2', () => {

        test('getAllIndexes', () => {
            let result = getAllIndexes(lines[1].split(''), '*');
            expect(result).toStrictEqual([3]);
            const testLine = "....*.....*..";
            result = getAllIndexes(testLine.split(''), '*');
            expect(result).toStrictEqual([4,10]);
        })

        test('getGearRatioNumbers', () => {

            let result = getGearRatioNumbers(3, [lines[1], lines[0], lines[2]]);
            expect(result).toStrictEqual(['467', '35']);

            result = getGearRatioNumbers(3, [lines[3], lines[4], lines[5]]);
            expect(result).toStrictEqual(['617']);

            result = getGearRatioNumbers(5, [lines[8], lines[7], lines[9]]);
            expect(result).toStrictEqual(['755', '598']);
        })
        test("part 2 test input", () => {
            const result = part2(testInput);
            expect(result).toBe(467835);
        })

        test("part 2 actual", () => {
            const result = part2(input);
            expect(result).toBe(91622824);
        })
    });
})