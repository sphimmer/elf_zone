
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

export function getPart2StartingNodes(map: DesertMap): string[] {
    return Object.keys(map.nodes).filter(key => {
        if (key.endsWith('A')) {
            return key
        }
    })
}

export function followMap(desertMap: DesertMap, nodes: string[], stepCount: number = 0) {
    const distances = []
    // for (let n = 0; n < nodes.length; n++) {
        let node = nodes[5];
        console.log(nodes)
    
    
        let instructions = desertMap.instructions;
        while(!node.endsWith('Z')) {
            stepCount++;
            node = desertMap.nodes[node][instructions[0]]
            instructions.push(instructions[0]);
            instructions = instructions.slice(1);
        }
        distances.push(stepCount);
        stepCount = 0;
    // }

    console.log(distances);
    // console.log(nodes);
    // let endNodesCount = 0;
    // let inst = 0;
    // while(endNodesCount < nodes.length) {

    //     nodes = nodes.map(n => {
    //         return desertMap.nodes[n][desertMap.instructions[inst]]
    //     })

    //     endNodesCount = nodes.filter((n) => {
    //         return n[2] == 'Z'
    //     }).length;
        
    //     stepCount++;
        
    //     if(inst < desertMap.instructions.length-1) {
    //         inst++;
    //     } else {
    //         inst = 0;
    //     }
    // }

    // return stepCount;
    // }
    // for (let i = 0; i < desertMap.instructions.length; i++) {
    //     nodes = nodes.map(node => {
    //         return desertMap.nodes[node][desertMap.instructions[i]];
    //     });
    //     // console.log(nodes);
    //     const endingNodes = nodes.filter(node => {
    //         if(node[2] === 'Z') {
    //             return node
    //         }
    //     });
    //     // console.log(endingNodes);
    //     if(endingNodes.length == nodes.length) {
    //         console.log(stepCount+i+1);
    //         return stepCount+i+1;
    //     }
    // }
    // stepCount = desertMap.instructions.length;
    // return followMap(desertMap, nodes, stepCount);
}

// export function part2(input: string): number {
//     const desertMap = parseInput(input);
//     const startingNodes = getPart2StartingNodes(desertMap);
//     return followMap(desertMap, startingNodes);
// }
