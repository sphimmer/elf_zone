import { elfCalorieLoadsSorted } from "./ElfCalorieLoads";

export function puzzleBSolution(input: string, elfCount: number): number {
    const elfLoads = elfCalorieLoadsSorted(input);
    let sum = 0;
    for (let i = 0; i < elfCount; i++) {
        sum += elfLoads[i];
        
    }
    return sum;
}