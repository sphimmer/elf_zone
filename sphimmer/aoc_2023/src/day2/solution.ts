interface GameSet {
    red?: number;
    green?: number;
    blue?: number;
}

const part1PossibleGameCount = {
    red: 12,
    green: 13,
    blue: 14,
}

function part1IsGamePossible(gameSet: GameSet): boolean{
    if(gameSet.blue != undefined && gameSet.blue > part1PossibleGameCount.blue){
        return false
    }

    if(gameSet.green != undefined && gameSet.green > part1PossibleGameCount.green){
        return false
    }

    if(gameSet.red != undefined && gameSet.red > part1PossibleGameCount.red){
        return false
    }
    return true
}

function getColorNum(set: string): {color: string, count: number}{
    const split = set.split(' ');
    return {color: split[1], count: +split[0]}
}

export function part1(input: string): number {
    let sum = 0;

    const lines = input.split('\n');
    lines.map((line) => {
        const gameRegxGroups = line.match(/(Game \w+)|(: )|(.*)/g)
        const gameId = gameRegxGroups[0].split(' ')[1];
        const gameSetsString: string = gameRegxGroups[2];

        const sets = gameSetsString.split(';').map((segment: string) => {
            const gameSet: GameSet = {};
            segment.split(', ').map((cubes) => {
                cubes = cubes.trim()
                return getColorNum(cubes);
            }).map((gs) => {
                gameSet[gs.color] = gs.count
            })
            return gameSet;
        }).map(set => part1IsGamePossible(set))
        if (!sets.includes(false)) {
            sum += +gameId;
        } 
    })


    return sum;
}