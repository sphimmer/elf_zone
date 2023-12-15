import { input } from "./input";
import { Almanac } from "./solution";
import { Almanac as A2}  from "./solution.part2";

const testInput = 
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

describe("day 5", () => {
    describe("part 1", () => {

        test("findDestinationValue", () => {
            const almanac = new Almanac(testInput);
            expect(almanac.findDestinationValue(98, almanac.seedSoilMap)).toBe(50);
            expect(almanac.findDestinationValue(53, almanac.seedSoilMap)).toBe(55);
            expect(almanac.findDestinationValue(10, almanac.seedSoilMap)).toBe(10);
            expect(almanac.findDestinationValue(96, almanac.seedSoilMap)).toBe(98);


        })
        test("almanac actual input", () => {
            const almanac = new Almanac(input);
            expect(almanac.getLowestLocation()).toBe(379811651);
        })
        test("almanac test input", () => {
            const almanac = new Almanac(testInput);
            expect(almanac.getLowestLocation()).toBe(35);
        })

        
        
    })

    describe('part 2', () => {
        test("actual", () => {
            const almanac = new A2(input);
            almanac.solve();
            expect(almanac.lowestLocation).toBe(27992443)


        })

        test("test", () => {
            const almanac = new A2(testInput);
            almanac.solve();
            expect(almanac.lowestLocation).toBe(46)
            
        })

        test("findDestinationValue", () => {
            const almanac = new A2(testInput);
            almanac.parseSeeds()
            almanac.parseMaps();
            expect(almanac.findDestinationRange([{start:74,end:87}], almanac.lightTemperatureMap)).toStrictEqual([{start: 45, end: 55}, {start: 78, end: 80}]);
            expect(almanac.findDestinationRange([{start: 45, end: 55}, {start: 78, end: 80}], almanac.temperatureHumidityMap)).toStrictEqual([ { start: 46, end: 56 }, { start: 78, end: 80 } ])
            expect(almanac.findDestinationRange([ { start: 46, end: 56 }, { start: 78, end: 80 } ], almanac.humidityLocationMap)).toStrictEqual([
                { start: 60, end: 60 },
                { start: 82, end: 84 },
                { start: 46, end: 55 }
              ]);
        })

        test("overlap", () => {
            const almanac = new A2('');
            expect(almanac.getOverlap({start: 5, end: 20}, {start: 7, end: 9})).toStrictEqual({
                matched: { start: 7, end: 9 },
                nonMatched: [ { start: 5, end: 6 }, { start: 10, end: 20 } ]
              });
            expect(almanac.getOverlap({start: 5, end: 8}, {start: 4, end: 6})).toStrictEqual({ matched: { start: 5, end: 6 }, nonMatched: [ { start: 7, end: 8 } ] });
        })
    })
});