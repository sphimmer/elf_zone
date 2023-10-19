import { exampleInput, realInput } from "./input";
import { puzzlePartOne, puzzlePartTwo, rockPaperScissors } from "./puzzle";


describe('day 2', () => {

    describe('part one', () => {
        describe("rock paper scissors", () => {

            describe("rock", () => {
                it("should lose to paper", () => {
                    expect(rockPaperScissors('B', 'X')).toBe(1);
                })
                it("should draw with rock", () => {
                    expect(rockPaperScissors('A', 'X')).toBe(4);
                })

                it("should win to scissors", () => {
                    expect(rockPaperScissors('C', 'X')).toBe(7);
                })
            })
            describe("paper", () => {
                it("should win to rock", () => {
                    expect(rockPaperScissors('A', 'Y')).toBe(8);
                })
                it("should lose to scissors", () => {
                    expect(rockPaperScissors('C', 'Y')).toBe(2);
                })
                it("should draw to paper", () => {
                    expect(rockPaperScissors('B', 'Y')).toBe(5);
                })
            });

            describe("scisssors", () => {
                it("should beat paper", () => {
                    expect(rockPaperScissors('B', 'Z')).toBe(9);
                })
                it("should draw with scissors", () => {
                    expect(rockPaperScissors('C', 'Z')).toBe(6);
                })
                it("should lose to rock", () => {
                    expect(rockPaperScissors('A', 'Z')).toBe(3);
                })
            })
        })
        it('should solve for example input', () => {
            const result = puzzlePartOne(exampleInput);
            expect(result).toBe(15)
        })

        it('should solve for actual input', () => {
            const result = puzzlePartOne(realInput);
            expect(result).toBe(14264)
        })
    });

    describe('part two', () => {
        it("should solve for example input", () => {
            const result = puzzlePartTwo(exampleInput);
            expect(result).toBe(12);
        })

        it('should solve real input', () => {
            const result = puzzlePartTwo(realInput);
            expect(result).toBe(12382);
        })
    });
})