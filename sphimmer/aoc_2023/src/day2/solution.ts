class GameSet {
    red?: number;
    green?: number;
    blue?: number;
    constructor(gameRound?: string){
        if (gameRound) {
            gameRound.split(', ').map((cubes) => {
                return getColorNum(cubes);
            }).map((gs) => {
                this[gs.color] = gs.count
            })
        }
    }

    getGameSetPower() {
        return this.red * this.blue * this.green;
    }
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
    const split = set.trim().split(' ');
    return {color: split[1], count: +split[0]}
}

function parseGameLine(line: string): RegExpMatchArray {
    return line.match(/(Game \w+)|(: )|(.*)/g)
}

export function part1(input: string): number {
    let sum = 0;

    const lines = input.split('\n');
    lines.map((line) => {
        const gameRegxGroups = parseGameLine(line)
        const gameId = gameRegxGroups[0].split(' ')[1];
        const gameRounds: string[] = gameRegxGroups[2].split(';');

        const sets = gameRounds.map(
            (round: string) => new GameSet(round)
        ).map(
            set => part1IsGamePossible(set)
        );
        if (!sets.includes(false)) {
            sum += +gameId;
        } 
    })
    return sum;
}

function part2GameRoundPower(gameRound: {color: string, count: number}[][]): number {
    const minimumGameSetPossible: GameSet = new GameSet()

    gameRound.map(sets => {
        sets.map(set => {
            if (minimumGameSetPossible[set.color] == undefined) {
                minimumGameSetPossible[set.color] = set.count;
            } else if (set.count > minimumGameSetPossible[set.color]) {
                minimumGameSetPossible[set.color] = set.count;
            }
        });
    })
    return minimumGameSetPossible.getGameSetPower();
}

export function part2(input: string): number {
    const lines = input.split('\n');
    let sum = 0;
    lines.map((line) => {
        const gameRegxGroups = parseGameLine(line)
        const gameRounds: string[] = gameRegxGroups[2].split(';');
        const sets = gameRounds.map((round: string) => {
            return round.split(', ').map(cubes => getColorNum(cubes));
        });
        const power = part2GameRoundPower(sets);
        sum += power;
    });
    return sum;
}