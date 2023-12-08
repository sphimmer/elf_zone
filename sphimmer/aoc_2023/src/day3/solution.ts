


function getFullNumberAndIndexes(line: string[], index:number): {partNumber: string, indexes: number[]} {
    let number: string = '';
    const indexes: number[] = []
    for (let x = index; x < line.length; x++) {
        if(Number.isInteger(parseInt(line[x]))) {
            number += line[x];
            indexes.push(x);
        } else {
            break;
        }
    }
    return {partNumber: number, indexes};
}

export function hasSymbol(indexes: number[], lines: string[]): boolean {
    let symbols: RegExpMatchArray | null = null
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        const start = indexes[0]-1;
        const stop = indexes[indexes.length-1]+2;
        symbols = line.substring(start, stop).match(/[^\d|.]/g);
        if(symbols){
            return true
        }
    }   
    return false
}

export function part1(input: string) {
    let sum = 0;
    const lines = input.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let previousLine: string = '';
        let nextLine: string = '';
        if (i > 0){
            previousLine = lines[i-1];
        }
        if (i < lines.length - 1) {
            nextLine = lines[i+1];
        }

        // iterate over characters until number is found
        const characters = line.split('');
        for (let n = 0; n < characters.length; n++) {
            const char = characters[n];
            if(Number.isInteger(parseInt(char))) {
                // we have a number, lets get the whole number and adjacent characters
                const {partNumber, indexes} = getFullNumberAndIndexes(characters, n);
                // find adjacent or diagonal symbols
                const isPart = hasSymbol(indexes, [line, previousLine, nextLine])
                if(isPart) {
                    sum += +partNumber
                }
                n = indexes[indexes.length-1]
            } 
        }
    }
    return sum;
}