import { input } from "./input";
import { DesertMap, followMap, getPart2StartingNodes, parseInput, part1 } from "./solution";

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

const testInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
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

    describe('part 2', () => {
        test('starting nodes', () => {
            const nodes = getPart2StartingNodes(new DesertMap(testInput3));
            expect(nodes.length).toBe(2);
        })

        // test('test input', () => {
        //     const result = part2(testInput3);
        //     expect(result).toBe(6);
        // })

        // test('actual input', () => {
        //     const result = part2(input);
        //     expect(result).toBe(6);
        // })

        test('starting Nodes actual input', () => {
            const nodes = getPart2StartingNodes(new DesertMap(input));
            console.log(nodes.length);
        })

        test('followMap', () => {
            const map = new DesertMap(input);
            const r = followMap(map, getPart2StartingNodes(map))
            console.log(r);
        })
    })
})