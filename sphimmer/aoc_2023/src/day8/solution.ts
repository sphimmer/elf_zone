
export class DesertMap {
    instructions: number[];
    nodes: Record<string, string[]> = {};

    constructor(input: string){
        const lines = input.split('\n');
        this.instructions = lines[0].split('').map(instruction => {
            return instruction == 'L' ? 0 : 1;
        });
        for (let i = 2; i < lines.length; i++) {
            const nodeLine = lines[i].split('=');
            const nodeName = nodeLine[0].trim();
            const nodeDestinations = nodeLine[1].trim().match(/[^\(\), ]+/g)
            this.nodes[nodeName] = nodeDestinations;
        }
    }
}

export function parseInput(input: string) {
    const map = new DesertMap(input);
    return map;
}

export function part1(map: DesertMap, node = 'AAA', stepCount = 0): number {
    for (let i = 0; i < map.instructions.length; i++) {
        node = map.nodes[node][map.instructions[i]] 
        if(node == 'ZZZ') {
            return stepCount+i+1
        } 
    }
    stepCount += map.instructions.length
    return part1(map, node, stepCount)

}