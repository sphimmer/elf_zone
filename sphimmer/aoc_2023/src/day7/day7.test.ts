import { input } from "./input";
import { evaluateHand, solution } from "./solution";

const testInput = 
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const test2 = 
`Q97J7 740
65KJ6 889
6664J 275
JKK44 856
TJ285 722
482JT 338
KQ7T7 949
5K89Q 977
KJ949 437
366T3 204
T5797 847
3K7K3 953
J2543 100
JJJJJ 2
22222 3`;

describe("day 7", () =>{
    describe("part 1", () =>{
        test("evaluate hand", () => {
            expect(evaluateHand("44444")).toBe(21);
            expect(evaluateHand("54555")).toBe(20)
            expect(evaluateHand("QAAQQ")).toBe(19);
            expect(evaluateHand("T55J5")).toBe(18);
            expect(evaluateHand('KK677')).toBe(17);
            expect(evaluateHand("32T3K")).toBe(16);
            expect(evaluateHand("JKQTA")).toBe(15);
            expect(evaluateHand("23497")).toBe(15);
            expect(evaluateHand("54627")).toBe(15);
            expect(evaluateHand("75362")).toBe(15);
            expect(evaluateHand("29675")).toBe(15);
        })

        test("test input", () => {
            const result = solution(testInput, 1);
            expect(result).toBe(6440);
        })

        test("actual input", () => {
            const result = solution(input, 1);
            expect(result).toBe(250254244);
        })

    })
    describe("part 2", () =>{
        test("test input", () => {
            const result = solution(testInput, 2);
            expect(result).toBe(5905);
        })

        test("actual input", () => {
            const result = solution(input, 2);
            expect(result).toBe(250087440);
        })

        test("evaluateHand", () => {
            expect(evaluateHand('T55J5', true)).toBe(20);
            expect(evaluateHand('KTJJT', true)).toBe(20);
            expect(evaluateHand('QQQJA', true)).toBe(20);
            expect(evaluateHand('22222', true)).toBe(21);
            expect(evaluateHand('JJJJJ', true)).toBe(21);
            expect(evaluateHand('JJ2JJ', true)).toBe(21);
        })
    })
})