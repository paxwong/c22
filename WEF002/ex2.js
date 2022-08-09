const cards = [
    ['Spade', 'A'],
    ['Diamond', 'J'],
    ['Club', '3'],
    ['Heart', '6'],
    ['Spade', 'K'],
    ['Club', '2'],
    ['Heart', 'Q'],
    ['Spade', '6'],
    ['Heart', 'J'],
    ['Spade', '10'],
    ['Club', '4'],
    ['Diamond', 'Q'],
    ['Diamond', '3'],
    ['Heart', '4'],
    ['Club', '7']
];


function compareCard(cardA, cardB) {
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const suits = ["Diamond", "Club", "Heart", "Spade"];
    const [suitA, rankA] = cardA;
    const [suitB, rankB] = cardB;
    const ranksDiff = ranks.indexOf(rankA) - ranks.indexOf(rankB);
    if (ranksDiff !== 0) {
        return ranksDiff;
    } else {
        return suits.indexOf(suitA) - suits.indexOf(suitB);
    }
}

// 1. Count the number of card which is of suit Spade. (Hints: using reduce)
let countSpade = 0
let cards1 = cards.reduce(function(previous, current){
    if (current[0] === "Spade") {
        countSpade = countSpade +1 
    }
    return current
},0)
console.log(countSpade)

// 2. Remove all the card that is smaller than ["Club", "3"].
let cards2 = cards.filter(function(card){
return (compareCard(card,['Diamond', '3']) >= 0)
})
console.log(cards2)

// 3. Count the number of card which is of suit Diamond or Heart and with the rank larger than or equal to J.
let cards3 = cards.filter(function(card){
    return ((compareCard(card,["Diamond","J"]) >= 0) && (card[0] === "Heart" || card[0] === "Diamond"))
})
console.log(cards3.length)

// 4. Replace all of the cards with suit Club to suit Diamond, keeping the same rank.
let cards4 = cards.map(function(card){
    if (card[0] === "Club"){
        return ["Diamond",card[1]]
    } else {return card}
})
console.log(cards4)

// 5. Replace all of the cards with rank A to rank 2. Keeping the same suit.
let cards5 = cards.map(function(card){
    if (card[1] === "A"){
        return [card[0],"2"]
    } else {return card}
})
console.log(cards5)