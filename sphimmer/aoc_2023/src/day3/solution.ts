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
    const start = indexes[0]-1;
    const stop = indexes[indexes.length-1]+2;
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        
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
        // iterate over characters until number is found
        const characters = line.split('');
        for (let n = 0; n < characters.length; n++) {
            const char = characters[n];
            if(Number.isInteger(parseInt(char))) {
                // we have a number, lets get the whole number and adjacent characters
                const {partNumber, indexes} = getFullNumberAndIndexes(characters, n);
                // find adjacent or diagonal symbols
                const previousLine: string = i > 0 ? lines[i-1] : '';
                const nextLine: string = i < lines.length -1 ?  lines[i+1] : '';
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

export function getGearRatioNumbers(index: number, lines: string[]): string[]{
    
    const start = index-1;
    const stop = index+1;
    const numbers: string[] = []
    lines.forEach(line => {
        let foundNumberIndexes: number[] = [];
        // see if line contains a digit between start and stop indices
        for (let i = start; i <= stop; i++) {
            const char = line[i];
            
            if(Number.isInteger(parseInt(char)) && !foundNumberIndexes.includes(i)) {
                // find whole number from this index spot on that line
                let numStart = i;
                foundNumberIndexes.push(numStart);
                while (numStart >= 0 && /\d/.test(line[numStart])) {
                    numStart--;
                    foundNumberIndexes.push(numStart);
                }

                // Iterate forward to find the end of the number
                let numEnd = i;
                foundNumberIndexes.push(numEnd);
                while (numEnd < line.length && /\d/.test(line[numEnd])) {
                    // console.log(/\d/.test(line[numEnd]))
                    numEnd++;
                    foundNumberIndexes.push(numEnd);
                }
                const extractedNumber = line.slice(numStart+1, numEnd);
                // console.log(extractedNumber)
                numbers.push(extractedNumber);
            }
        }
    });
    return numbers;
}

export function getAllIndexes(arr: string[], val: string): number[] {
    const indexes: number[] = [];
    let i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}


export function part2(input: string) {
    let sum = 0;
    const lines = input.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const characters = line.split('');

        const indexes = getAllIndexes(characters, '*');
        
        if(indexes.length > 0){
            //found a line with a gear
            let previousLine: string = i > 0 ? lines[i-1] : '';
            let nextLine: string = i < lines.length -1 ?  lines[i+1] : '';
            indexes.map(ind => {
                const gearNumbers = getGearRatioNumbers(ind, [line, previousLine, nextLine]);
                if(gearNumbers.length == 2) {
                    sum += +gearNumbers[0] * +gearNumbers[1];
                }
            })
        }
    }
    return sum;
}