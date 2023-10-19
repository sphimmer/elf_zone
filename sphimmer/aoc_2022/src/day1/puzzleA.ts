import { elfCalorieLoadsSorted } from "./ElfCalorieLoads";

export function puzzleASolution(input: string): number {
    const elfLoads = elfCalorieLoadsSorted(input);
    return elfLoads[0];
}