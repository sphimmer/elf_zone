import { input } from "./input";
import { convertWordToNumber, part1, part2 } from "./solution"

describe('day 1', () => {
    describe('part 1', () => {
        it("test data should equal 142", () => {
            const input = `1abc2
                pqr3stu8vwx
                a1b2c3d4e5f
                treb7uchet`;
            const result = part1(input);
            expect(result).toBe(142);
        })

        it("should get answer for puzzle input", () => {
            const result = part1(input);
            expect(result).toBe(54940);
        })
    });

    describe('part 2', () => {
        it('should equal 281', () => {
            const testInput = `two1nine
                eightwothree
                abcone2threexyz
                xtwone3four
                4nineeightseven2
                zoneight234
                7pqrstsixteen`;
            const result = part2(testInput);
            expect(result).toBe(281);
        })

        it('should be different than part 1', () => {
            const testInput = `fouronevhnrz44
            78seven8
            rninethree6
            eight45fourfgfive1
            lnxms8`;
            const result1 = part1(testInput)
            const result2 = part2(testInput);
            expect(result1).toBe(317);
            expect(result2).toBe(387);
        })

        test('input', () => {
           
            const result = part2(input);
            expect(result).toBe(54208);
        })

        const cases = [
            ['one', '1'],
            ['two', '2'],
            ['three', '3'],
            ['four', '4'],
            ['five', '5'],
            ['six', '6'],
            ['seven', '7'],
            ['eight', '8'],
            ['nine', '9'],
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
            ['6', '6'],
            ['7', '7'],
            ['8', '8'],
            ['9', '9'],
        ]
        test.each(cases)("given %p, returns %p", (word, number) => {
            const result = convertWordToNumber(word);
            expect(result).toBe(number)
        });

        test('twone', () => {
            const testinput = `twone`;
            const result = part2(testinput);
            expect(result).toBe(21);
        })

    });
})