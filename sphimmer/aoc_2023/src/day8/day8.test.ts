import { input } from "./input";
import { parseInput, part1 } from "./solution";

const testInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const testInput2 =`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;


describe('day 8', () => {

    describe('part 1', () => {
        describe('test input', () => {
            test('parse input', () => {
                const result = parseInput(testInput1);
                expect(result.instructions).toEqual([1,0]);
                expect(result.nodes['AAA']).toEqual(['BBB', 'CCC']);
                expect(Object.keys(result.nodes).length).toBe(7);
            });

            test('test input 1', () => {
                const result = part1(parseInput(testInput1));
                expect(result).toBe(2);
            })

            test('test input 2', () => {
                const result = part1(parseInput(testInput2));
                expect(result).toBe(6);
            })
        })
        describe('actual input', () => {
            test('test input 2', () => {
                const result = part1(parseInput(input));
                expect(result).toBe(12169);
            })
        });
    })
})