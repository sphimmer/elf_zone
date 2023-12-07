function arraySum(array: number[]): number {
    return array.reduce((sum, val) => {
        return sum + val;
    }, 0);
}

function parseInput(input: string, regex: RegExp, combinationFunc: (d: RegExpMatchArray) => number): number[] {
    return input.split('\n').map((line: string) => {
        const digits = line.match(regex);
        return combinationFunc(digits);
    });
}

export function part1(input: string): number{
    const combinationFunc = (digits: RegExpMatchArray): number => {
        return +(digits[0] + digits[digits.length-1])
    }
    const calibration_values = parseInput(input, /\d/g, combinationFunc)
    
    return arraySum(calibration_values);
}

const wordNumMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

export function convertWordToNumber(word: string): string{
    if(isNaN(parseInt(word))) {
        return wordNumMap[word];
    } else {
        return word;
    }        
}

export function part2(input: string): number {
    
    const combinationFunc = (digits: RegExpMatchArray): number => {
        return +(convertWordToNumber(digits[0]) + convertWordToNumber(digits[digits.length-1]));
    }
    const regex = /[\d]|one|two|three|four|five|six|seven|eight|nine/g;

    input = input.replace(/threeight/g, 'threeeight')
        .replace(/oneight/g, 'oneeight')
        .replace(/twone/g, 'twoone')
        .replace(/fiveight/g, 'fiveeight')
        .replace(/sevenine/g, 'sevennine')
        .replace(/nineight/g, 'nineeight')
        .replace(/eightwo/g, 'eighttwo')
        .replace(/eighthree/g, 'eightthree');
    const calibration_values = parseInput(input, regex, combinationFunc);
    
    return arraySum(calibration_values);
}