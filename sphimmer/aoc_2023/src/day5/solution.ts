interface MapLine {
    sourceRangeStart: number;
    destinationRangeStart: number;
    range: number;
}

export class Almanac {
    seeds: Map<number, Seed> = new Map();
    seedSoilMap: MapLine[];
    soilFertilizerMap: MapLine[];
    fertilizerWaterMap: MapLine[];
    waterLightMap: MapLine[];
    lightTemperatureMap: MapLine[];
    temperatureHumidityMap: MapLine[];
    humidityLocationMap: MapLine[];
    input: string;
    constructor(input: string){
        this.input = input;
        input.slice(input.indexOf('seeds: '), input.indexOf('seed-to-soil map:')).trim().split(' ').slice(1).map(num => {
            const seed = new Seed()
            seed.seed = +num;
            this.seeds.set(+num, seed);
        });
        this.seedSoilMap =            this.getMapLines('seed-to-soil map:', 'soil-to-fertilizer map:');
        this.soilFertilizerMap =      this.getMapLines('soil-to-fertilizer map:', 'fertilizer-to-water map:');
        this.fertilizerWaterMap =     this.getMapLines('fertilizer-to-water map:', 'water-to-light map:');
        this.waterLightMap =          this.getMapLines('water-to-light map:', 'light-to-temperature map:');
        this.lightTemperatureMap =    this.getMapLines('light-to-temperature map:', 'temperature-to-humidity map:');
        this.temperatureHumidityMap = this.getMapLines('temperature-to-humidity map:', 'humidity-to-location map:');
        this.humidityLocationMap =    this.getMapLines('humidity-to-location map:');
        this.mapSeeds();
    }

    getMapLines(mapTitle: string, nextMapTitle: string = 'end'): MapLine[]{
        const sliceEnd = nextMapTitle != 'end' ? this.input.indexOf(nextMapTitle) : this.input.length;
        return this.input.slice(this.input.indexOf(mapTitle), sliceEnd).trim().split('\n').slice(1)
        .flatMap(line => {
            const mapNumbers = line.split(' ');
            return {
                destinationRangeStart: +mapNumbers[0],
                sourceRangeStart: +mapNumbers[1],
                range: +mapNumbers[2],
            }
        });
    }

    mapSeeds(){
        this.seeds.forEach((seed, seedId) => {
            // add soil to each seed
            seed.soil = this.findDestinationValue(seed.seed, this.seedSoilMap)
            seed.fertilizer = this.findDestinationValue(seed.soil, this.soilFertilizerMap)
            seed.water = this.findDestinationValue(seed.fertilizer, this.fertilizerWaterMap)
            seed.light = this.findDestinationValue(seed.water, this.waterLightMap)
            seed.temperature = this.findDestinationValue(seed.light, this.lightTemperatureMap)
            seed.humidity = this.findDestinationValue(seed.temperature, this.temperatureHumidityMap)
            seed.location = this.findDestinationValue(seed.humidity, this.humidityLocationMap)
            
        })
    }

    findDestinationValue(source: number, destinationMap: MapLine[]): number {
        for (let n = 0; n < destinationMap.length; n++) {
            const map = destinationMap[n];
            const seedRangeDiff = source - map.sourceRangeStart;
            if(seedRangeDiff < map.range && seedRangeDiff >= 0) {
                return seedRangeDiff + map.destinationRangeStart;
            }
        }
        return source
    }

    getLowestLocation() {
        let lowest: number = undefined;
        let lowestLocationSeed: Seed;
        this.seeds.forEach((seed, _key) => {
            if(!lowest) {
               lowest = seed.location; 
               lowestLocationSeed = seed;
            }
            lowest = seed.location <= lowest ? seed.location : lowest;
            lowestLocationSeed = seed.location <= lowest ? seed: lowestLocationSeed;
        })
        console.log(lowestLocationSeed);
        return lowest;
        
    }
}

class Seed {
    seed: number
    soil: number;
    fertilizer: number;
    water: number;
    light: number;
    temperature: number;
    humidity: number;
    location: number;
}
