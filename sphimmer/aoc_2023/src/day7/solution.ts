export const Cards: Record<string, number>  = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
}

export const CardsV2: Record<string, number>  = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 1,
    'Q': 12,
    'K': 13,
    'A': 14,
}

export const Hands: Record<string, number> = {
    '5': 21,        // 5 of a kind
    '41': 20,       // 4 of a kind
    '32': 19,       // full house
    '311': 18,      // 3 of a kind
    '221': 17,      // 2 pair
    '2111': 16,     // 1 pair
    '11111': 15,    // high card 
}


export interface Play {
    hand: string,
    bid: number,
    handValue?: number,
}

export function evaluateHand(hand: string, jIsJoker = false){
    let handComp = {};
    hand.split('').map(card => {
        if(handComp[card]) {
            handComp[card]++;
        } else {
            handComp[card] = 1;
        }
    })

    if (jIsJoker && handComp['J'] && Object.keys(handComp).length > 1) {
        let highestCard: {card: string, count: number};
        Object.keys(handComp).forEach(key => {
            if (key != 'J') {
                if(!highestCard) {
                    highestCard = {card: key, count: handComp[key]};
                } 
                if(handComp[key] > highestCard.count){
                    highestCard  = {card: key, count: handComp[key]};
                }    
            }
        })
        handComp[highestCard.card] += handComp['J'];
        delete handComp['J'];
    } 

    const handNumber = Object.values(handComp).sort().reverse().join('');

    return Hands[handNumber];
    
}

export function parseInput(input: string): Play[] {
    const plays = input.split('\n').map((l: string): Play => {
        const line = l.split(' ');
        return {
            hand: line[0],
            bid: +line[1]
        }
    });
    return plays;
}

export function sortHands(handA: Play, handB: Play, CardPoints: Record<string, number>, jIsJoker = false) {

    handA.handValue = evaluateHand(handA.hand, jIsJoker);
    handB.handValue = evaluateHand(handB.hand, jIsJoker);
    if (handA.handValue > handB.handValue) {
        return 1;
    }
    if(handA.handValue < handB.handValue) {
        return -1;
    }
    if(handA.handValue == handB.handValue){
        for (let c = 0; c < handA.hand.length; c++) {
            if(CardPoints[handA.hand[c]] > CardPoints[handB.hand[c]]) {
                return 1
            }
            if(CardPoints[handA.hand[c]] < CardPoints[handB.hand[c]]) {
                return -1
            }
        }
    }
}

export function solution(input: string, part: 1 | 2){
    const plays = parseInput (input);
    const cardPoints = part == 1 ? Cards : CardsV2;
    const jIsJoker = part == 2;
    plays.sort((a: Play, b: Play) => sortHands(a, b, cardPoints, jIsJoker));

    let winnings = 0;
    
    for (let i = plays.length -1; i >= 0; i--) {
        winnings += plays[i].bid * (i+1);
    }

    return winnings;
}