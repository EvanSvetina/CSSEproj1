//Defining important variables.
function person(name, ride, food, favColor, tickets, money) { //constructuor script to make person objects really easily.
    this.name = name;
    this.ride = ride;
    this.food = food;
    this.favColor = favColor;
    this.tickets = tickets;
    this.money = money;
    this.whoWon = function (){
        console.log(this.name + "won the coin flip! Now they get to decide what to do today.");
    };
}

const person1 = person("Evan", "Ghost Rider", "Popcorn", "Yellow", 100, 500); //customizable people objects
const person2 = person("Nigilekbam", "Teacups", "Fried dough", "Oshi No Ko Purple", 120, 0.75);

let foodEaten = false;
let coinFlipNum = Math.floor(2 * Math.random());
let coin;

if (coinFlipNum = 0){
    coin = "heads"; //determine if coin is heads or tails
} else {
    coin = "tails";
}
if (coin = "heads"){ //if heads, do what person 1 wants
    console.log(person1.whoWon);
    if (person1.money >= 10){ //food event checker. are you wealthy enough to buy food for both people?
        person1.money -= 10;
        console.log("Firstly, " + person1.name +" bought 2" + person1.food + "s for himself and his friend.")
        foodEaten = true;
    } else {
        console.log(person1.name + "is broke as heck so both people are hungry all day.")
        foodEaten = false;
    }
    console.log("Now, " + person1.name + "has " + person1.money + "dollars left over.");
    //Now, depending on how many tickets you have, ride the ride of choice as many times as possible. Diff rides have diff rates.
    //for this example, I'll make Ghost rider take 7 tickets and Teacups take 5.

    let pooledTickets = person1.tickets + person2.tickets; //pooled tickets. NOTE: I'm making this funny. Person 1 will not share with person 2, but person 2 will share with person 1. Use this knowledge as you will.
    let rideTotal = Math.floor(pooledTickets % 7)//how many times you can ride the ride.
    if (pooledTickets > 7) { //minimum of 7 for a ride on person1's ride. you can't ride 0 times.
        console.log("Afterwards, both people decide to ride" + person1.ride + "a total of " + rideTotal +" times in a row.")
        person1.tickets = 0;
        person2.tickets = 0;
    } else {
        console.log("The duo does not have enough tickets to ride " + person1.name + "'s favorite ride.")
    }
    
    if (foodEaten = true && Math.random() > 0.7){ //30% chance to puke if they ate food.
        console.log("After doing that, both people are nauseous and puke their guts out.");
    } else {
        console.log("After that, both people are pretty tired and want to play some games.");
    }
    //the following code will use a money amount to determine a weighted chance at winning a plush of the person's favorite color. more money = more likely to win.
    let pooledMoney = person1.money + person2.money;
    let chanceToWin = 0.01 * Math.random() * pooledMoney; //chance to win is a random % times 1% times the amount of money you have.
    if (chanceToWin > 1){
        console.log("After pooling together all their money, the duo managed to get a " + person1.favColor + "plushie. Their favorite!");
    } else {
        console.log("despite their valiant efforts, the games win once again. The duo loses all their money trying to get a" + person1.favColor + "plushie for" + person1.name);
    }
    person1.money = 0;
    person2.money = 0;

} else { //otherwise do person 2's plan

    console.log(person2.whoWon);
    if (person2.money >= 10){ //food event checker. are you wealthy enough to buy food for both people?
        person2.money -= 10;
        console.log("Firstly, " + person2.name +" bought 2" + person2.food + "s for himself and his friend.")
        foodEaten = true;
    } else {
        console.log(person2.name + "is broke as heck so both people are hungry all day.")
        foodEaten = false;
    }
    console.log("Now, " + person2.name + "has " + person2.money + "dollars left over.");
    //Teacups take 5.
    rideTotal = Math.floor(person2.tickets % 5)//how many times you can ride the ride.
    if (person2.tickets > 5) { //same logic as above, need at least 5 tickets for the ride.
        console.log("Afterwards, both people decide to ride" + person2.ride + "a total of " + rideTotal +" times in a row.")
        person2.tickets = 0;
    } else {
        console.log(person2.name + "cannot afford the ride for both people, and " + person1.name + "isn't sharing, so no " + person2.ride + "for them")
    }
    if (foodEaten = true && Math.random() > 0.7){ //30% chance to puke if they ate food.
        console.log("After doing that, both people are nauseous and puke their guts out.");
    } else {
        console.log("After that, both people are pretty tired and want to play some games.");
    }
    //the following code will use a money amount to determine a weighted chance at winning a plush of the person's favorite color. more money = more likely to win.
    pooledMoney = person1.money + person2.money;
    let chanceToWin = 0.01 * Math.random() * pooledMoney; //chance to win is a random % times 1% times the amount of money you have.
    if (chanceToWin > 1){
        console.log("After pooling together all their money, the duo managed to get a " + person2.favColor + "plushie. Their favorite!");
    } else {
        console.log("despite their valiant efforts, the games win once again. The duo loses all their money trying to get a" + person2.favColor + "plushie for" + person2.name);
    }
    person1.money = 0;
    person2.money = 0;
}
console.log("After all this, " + person1.name + " and " + person2.name + "head home after a long day at the amusement park.");