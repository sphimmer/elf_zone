import { puzzleASolution } from "./puzzleA";
import { readFileSync } from 'fs';
import { input } from "./input";
import { puzzleBSolution } from "./puzzleB";

const exampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe ("day 1", () => {
    describe("puzzleA", () => {
        it("should solve for example data", () => {
            expect(puzzleASolution(exampleInput)).toBe(24000);
        });
    
        it("should solve the puzzle with puzzle input", () => {
           const result = puzzleASolution(input);
           expect(result).toBe(70116);
        })
    })
    
    describe("puzzle B", () => {
        it("should solve for example data", () => {
            expect(puzzleBSolution(exampleInput, 3)).toBe(45000);
        });
        
        it("should solve puzzle b for real input", () => {
            const result = puzzleBSolution(input, 3);
            console.log(result);
            expect(result).toBe(206582);
        });
    })
});