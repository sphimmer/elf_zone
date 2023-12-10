import { input } from "./input";
import { Points, part1, part2 } from "./solution";

const testInput = `Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const cards = testInput.split('\n');
describe('day 4', () => {
    describe('part 1', () => {
        describe('points', () => {
            test.each([[4,8] ,[2,2],[1,1], [0,0]])("given %p, returns %p", (count, score) => {
                const points = new Points()
                for (let n = 0; n < count; n++) {
                    points.increase();
                }
                expect(points.score).toBe(score);
            })
        })
        test('test input', () => {
            const result = part1(testInput);
            expect(result).toBe(13);
        })

        test('actual input', () => {
            const result = part1(input);
            expect(result).toBe(17803);
        })
    })

    describe('part 2', () => {
        test('test input', () => {
            const result = part2(testInput);
            expect(result).toBe(30);
        })

        test('actual input', () => {
            // average compute time 2-3ms
            const result = part2(input);
            expect(result).toBe(5554894);
        })
    });
})
