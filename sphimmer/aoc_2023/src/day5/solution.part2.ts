interface MapLine {
    sourceRange: Range;
    destinationRange: Range;
    range: number;
}

interface Range {
    start: number;
    end: number;
}

class SeedRanges {
    seeds: Range[] = [];
    soils: Range[] = [];
    fertilizers: Range[] = [];
    waters: Range[] = [];
    lights: Range[] = [];
    temperatures: Range[] = [];
    humiditys: Range[] = [];
    locations: Range[] = [];
}

export class Almanac {
    seedRanges: SeedRanges[];
    seedSoilMap: MapLine[] = [];
    soilFertilizerMap: MapLine[] = [];
    fertilizerWaterMap: MapLine[] = [];
    waterLightMap: MapLine[] = [];
    lightTemperatureMap: MapLine[] = [];
    temperatureHumidityMap: MapLine[] = [];
    humidityLocationMap: MapLine[] = [];
    input: string;
    lowestLocation: number;
    constructor(input: string){
        this.input = input;
    }

    parseSeeds() {
        this.seedRanges = this.input.slice(this.input.indexOf('seeds: '), this.input.indexOf('seed-to-soil map:')).trim().match(/ \d*.\d*/g).map(seedRangeString => {
            const seedRangeValues = seedRangeString.trim().split(' ')
            const seedRange = new SeedRanges();
            seedRange.seeds.push({start: +seedRangeValues[0], end: +seedRangeValues[0] + +seedRangeValues[1]-1});
            return seedRange;
        })
    }

    parseMaps() {
        this.seedSoilMap =            this.getMapLines('seed-to-soil map:', 'soil-to-fertilizer map:');
        this.soilFertilizerMap =      this.getMapLines('soil-to-fertilizer map:', 'fertilizer-to-water map:');
        this.fertilizerWaterMap =     this.getMapLines('fertilizer-to-water map:', 'water-to-light map:');
        this.waterLightMap =          this.getMapLines('water-to-light map:', 'light-to-temperature map:');
        this.lightTemperatureMap =    this.getMapLines('light-to-temperature map:', 'temperature-to-humidity map:');
        this.temperatureHumidityMap = this.getMapLines('temperature-to-humidity map:', 'humidity-to-location map:');
        this.humidityLocationMap =    this.getMapLines('humidity-to-location map:');
    }
    solve() {
        this.parseSeeds();
        this.parseMaps();
        
        this.seedRanges.map(sr => {
            sr.soils = this.findDestinationRange(sr.seeds, this.seedSoilMap);
            sr.fertilizers = this.findDestinationRange(sr.soils, this.soilFertilizerMap);
            sr.waters = this.findDestinationRange(sr.fertilizers, this.fertilizerWaterMap);
            sr.lights = this.findDestinationRange(sr.waters, this.waterLightMap);
            sr.temperatures = this.findDestinationRange(sr.lights, this.lightTemperatureMap);
            sr.humiditys = this.findDestinationRange(sr.temperatures, this.temperatureHumidityMap);
            sr.locations = this.findDestinationRange(sr.humiditys, this.humidityLocationMap);
            sr.locations.forEach(l => {
                if(!this.lowestLocation) {
                    this.lowestLocation = l.start;
                }
                if(l.start < this.lowestLocation){
                    this.lowestLocation = l.start
                }
            })
        })
    }

    getMapLines(mapTitle: string, nextMapTitle: string = 'end'): MapLine[]{
        const sliceEnd = nextMapTitle != 'end' ? this.input.indexOf(nextMapTitle) : this.input.length;
        return this.input.slice(this.input.indexOf(mapTitle), sliceEnd).trim().split('\n').slice(1)
        .flatMap(line => {
            const mapNumbers = line.split(' ');
            return {
                destinationRange: {start: +mapNumbers[0], end: +mapNumbers[0] + +mapNumbers[2] -1},
                sourceRange: {start: +mapNumbers[1], end: +mapNumbers[1] + +mapNumbers[2] -1},
                range: +mapNumbers[2],
            }
        });
    }

    findDestinationRange(sourceRanges: Range[], destinationMap: MapLine[]): Range[] {
        let destinationRangeMatch: Range[] = [];
        let notMatched: Range[] = sourceRanges;
        destinationMap.map(map => {    
            let rangesToMatch = notMatched
            notMatched = [];
            for (let i = 0; i < rangesToMatch.length; i++) {
                const range = rangesToMatch[i];
                const matchedRanges = this.getOverlap(range, map.sourceRange);
                if(matchedRanges.matched) {
                    const rangeDiff = map.sourceRange.start - map.destinationRange.start;
                    const newDestinationRange = {start: matchedRanges.matched.start - rangeDiff , end: matchedRanges.matched.end - rangeDiff}
                    if (destinationRangeMatch.filter(r => r.start == newDestinationRange.start && r.end == newDestinationRange.end).length == 0) {
                        destinationRangeMatch.push(newDestinationRange)
                    }
                } 
                if(matchedRanges.nonMatched && matchedRanges.nonMatched.length > 0) {
                    notMatched.push(...matchedRanges.nonMatched);
                }

                if(!matchedRanges.matched && !matchedRanges.nonMatched){
                    notMatched.push(range)
                }
            }
        })
        
        return destinationRangeMatch.concat(...notMatched);
    }

    getOverlap(range1: Range, range2: Range): {matched?: Range , nonMatched?: Range[] } {
        // Ensure ranges are valid
        if (range1.start > range1.end || range2.start > range2.end) {
          return null
        }
      
        // Check for overlap
        if (range1.end < range2.start || range2.end < range1.start) {
          // No overlap
          return {};
        } else {
          // Calculate overlap
          const overlapStart = Math.max(range1.start, range2.start);
          const overlapEnd = Math.min(range1.end, range2.end);
          const overlap: Range = { start: overlapStart, end: overlapEnd };
          
          const leftOversBelow: Range = {
            start: overlap.start > range1.start ? range1.start : null,
            end: overlap.start > range1.start ? overlap.start-1 : null,
          }

          const leftOversAbove: Range = {
            start: overlap.end < range1.end ? overlap.end+1 : null,
            end: overlap.end < range1.end ? range1.end : null
          }
          const nonMatched: Range[] = [];
          if(leftOversBelow.start && leftOversBelow.end) {
            nonMatched.push(leftOversBelow);
          }
          if(leftOversAbove.start && leftOversAbove.end) {
            nonMatched.push(leftOversAbove);
          }
          return {matched: overlap, nonMatched};
        }
      }
}
