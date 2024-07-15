let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["knife"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const text = document.querySelector("#text"); 

// buttons
button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;

const locations = [
    {
        name: "town square",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        "button functions": [goToStore, goToCave, fightDragon],
        text: "You are in the town square. You see a sign that says 'Store'"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goToTown],
        text: "You enter the store!"
    },
    {
        name: "cave",
        "button text": ["Fight bats", "Fight fanged beast", "Go to Town Square"],
        "button functions": [fightBats, fightBeast, goToTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goToTown],
        text: "You are fighting the monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button functions": [goToTown, goToTown, goToTown],
        text: "You defeated the monster! You gain experience points and find gold."
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "OOPS! You died."
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "YAY. You defeated the dragon! You win the game."
    }
];

const monsters = [
    {
        name: "bats",
        level: 1,
        health: 15
    },
    {
        name: "fanged beast",
        level: 10,
        health: 50
    },
    {
        name: "dragon",
        level: 20,
        health: 200
    }
];

const weapons = [
    {
        name: "knife",
        power: 5
    },
    {
        name: "Dagger",
        power: 30
    },
    {
        name: "Crossbow",
        power: 50
    },
    {
        name: "Sword",
        power: 100
    }
];

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goToTown() {
    update(locations[0]);
}

function goToStore() {
    update(locations[1]);
}

function goToCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You don't have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold = gold - 30;
            currentWeapon += 1;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You don't have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function fightBats() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold = gold + 15;
        goldText.innerText = gold;
        let soldWeapon = inventory.shift(); // removes the first item from inventory
        text.innerText = "You sold a " + soldWeapon + ".";
        text.innerText = text.innerText + " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks! ";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
    health = health - monsters[fighting].level;
    monsterHealth = monsterHealth - weapons[currentWeapon].power;
    monsterHealth = monsterHealth - weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting == 2) {
            winGame();
        } else {
            defeatMonster();
        }
    }
}

function dodge() {
    text.innerText = "You dodged an attack from " + monsters[fighting].name + ".";
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function defeatMonster() {
    gold = gold + Math.floor(monsters[fighting].level * 6.7);
    xp = xp + monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["Stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goToTown();
}
