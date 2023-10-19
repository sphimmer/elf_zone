export function elfCalorieLoadsSorted(input: string) {
    const elfLoads = input.split('\n\n').map((load) => {
        return load.split('\n').map(val => {
            return Number(val)
        }).reduce((sum, num) => sum+num, 0)
    }).sort((a,b) => a>b ? -1 : 1 );
    return elfLoads
}