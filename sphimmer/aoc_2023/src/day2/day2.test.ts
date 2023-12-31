import { input } from "./input";
import { part1, part2 } from "./solution";

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe('day 2', () => {
    describe('part 1', () => {
        test('part 1 test data', () => {
            const result = part1(testInput);
            expect(result).toBe(8);
        });

        test('part 1 actual', () => {
            const result = part1(input);
            expect(result).toBe(2617);
        })
    })

    describe('part2', () => {
        test('part2 test data', () => {
            const result = part2(testInput);
            expect(result).toBe(2286);
        })

        test('part2 actual', () => {
            const result = part2(input);
            expect(result).toBe(59795);
        })
    })
});