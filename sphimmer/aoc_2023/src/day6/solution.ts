
export interface Race {
    timeAllowed: number;
    distanceRecord: number;
    winningTimes: number[];
}


export function part1(input: string) {
    const lines = input.split('\n');
    const times = lines[0].match(/\d+/g).map(time => +time);
    const distancs = lines[1].match(/\d+/g).map(time => +time);
    let answer = 1;
    for (let x = 0; x < times.length; x++) {
        const race = {timeAllowed: times[x], distanceRecord: distancs[x], winningTimes: []}
        race.winningTimes = p1findWinningTimes(race);
        answer *= race.winningTimes.length;
    }
    return answer;
}

export function p1findWinningTimes(race: Race) {
    const winningTimes = []
    for (let n = 0; n < race.timeAllowed; n++) {
        if (n*(race.timeAllowed - n) > race.distanceRecord) {
            winningTimes.push(n)
        }
    }
    return winningTimes
}

export function part2(input: string) {
    const lines = input.split('\n');
    const time = +lines[0].slice(lines[0].indexOf(":")+1).replaceAll(' ', '');
    const distance = +lines[1].slice(lines[1].indexOf(":")+1).replaceAll(' ', '');
    return p2findWinningTimes(time, distance);
}

export function p2findWinningTimes(time: number, distance: number) {
    let rangeStart = 0;
    for (let n = 0; n < time; n++) {
        if(n*(time - n) > distance){
            rangeStart = n;
            break;
        }
    }
    let rangeEnd = time - rangeStart + 1;
    return rangeEnd - rangeStart;
}