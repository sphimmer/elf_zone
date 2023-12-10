export class Points {
    score = 0;
    increase(){
        if (this.score == 0) {
            this.score = 1;
        } else {
            this.score *= 2
        }
    }
}

export function part1(input: string) {
    const cards = input.split('\n');
    const sum = cards.flatMap(card => {
        const splitCard = card.split('|');
        const winningNumbers = splitCard[0].split(':')[1].trim().split(' ').filter((v) => v != '');
        const numbersHave = splitCard[1].trim().split(' ').filter((v) => v != '');
        const points = new Points()
        numbersHave.forEach(num => {
            if (winningNumbers.includes(num)) {
                points.increase();
            }
        })
        return points.score;
    }).reduce((sum, score) => sum + score, 0)
    return sum;
}

class Card {
    id: string;
    winningNumbers: string [];
    numbersHave: string[]

    constructor(cardLine: string) {
        const splitCard = cardLine.split('|');
        const cardLeftSide = splitCard[0].split(':')
        this.winningNumbers = cardLeftSide[1].trim().split(' ').filter((v) => v != '');
        this.id = cardLeftSide[0].match(/[0-9]+[0-9]+|\d/g)[0];
        this.numbersHave = splitCard[1].trim().split(' ').filter((v) => v != '');
    }
}

export class ScratchCardCounter {
    cards: { [key: string]: number } = {};
    totalCount: number = 0;
    
    addCard(cardId: number, count: number = 1): void {
        if( this.cards[cardId] ){
            this.cards[cardId] += count;
        } else {
            this.cards[cardId] = count;
        }
        this.totalCount += count;
    }
}

export function part2(input: string) {
    const cards = input.split('\n');
    const scratchCardCounter = new ScratchCardCounter();

    cards.forEach((cardLine, i) => {
        const card = new Card(cardLine);
        // save current card
        scratchCardCounter.addCard(+card.id);
        
        card.numbersHave.forEach(num => {
            if (card.winningNumbers.includes(num)) {
                i++;
                scratchCardCounter.addCard(i+1, scratchCardCounter.cards[card.id]);
            }
        })    
    
    })
    return scratchCardCounter.totalCount;
}