const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth ");
let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting; // undefined
let monsterHealth; // undefined
let inventory = ["stick"]; // array of strings
const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: `You are in the town square. You see a sign that says "Store". <div class="textimg">
          <img src="317024-P9JTT1-246.jpg" alt="">
        </div>`,
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: `You enter the store. <div class="textimg">
          <img src="324622-P9VW88-950.jpg" alt="">
        </div>`,
  },
  {
    name: "cave",
    "button text": [
      "Fight slime",
      "Fight fanged beast",
      "Fight dragon",
      "Go to town square",
    ],
    "button functions": [fightSlime, fightBeast, fightDragon, goTown],
    text: `You enter the cave. You see some monsters. <div class="textimg">
          <img src="gettyimages-1161114477-612x612.jpg" alt="">
        </div>`,
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: ` <span class="chtext">You are fighting a monster.</span> <div class="textimg">
          <img src="Fighting.png" alt="">
        </div>`,
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Get easter egg"],
    "button functions": [goTown, easterEgg],
    text: `The monster screams Arg! as it dies. <span class="chtext">You gain experience points and find gold</span>.`,
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// this function is called when go to a new location
function update(location) {
  monsterStats.style.display = "none";
  if (
    location["button text"].length === 4 &&
    location["button functions"].length === 4
  ) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
  } else if (
    location["button text"].length === 2 &&
    location["button functions"].length === 2
  ) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button4.style.display = "none";
    button3.style.display = "none";
  } else {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
  } // update the buttons
  text.innerHTML = location.text;
}

// this function is called when the user clicks the "Go to store" button
function goTown() {
  button4.style.display = "none";
  button3.style.display = "inline";
  update(locations[0]);
}

// this function is called when the user clicks the "Go to store" button
function goStore() {
  button4.style.display = "none";
  button3.style.display = "inline";
  update(locations[1]);
}
function buyHealth() {
  // if the user has enough gold to buy health
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerHTML = `
      <span class="chtext">You do not have enough gold to buy health.</span> 
      <div class="textimg" style="background-color: white;">
        <img src="Gold Box.png" alt="">
      </div>`; // display a message to the user
  } // update the gold and health text
}
function buyWeapon() {
  // if the current weapon is not the last weapon in the array
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;

      currentWeaponIndex++; // increase the current weapon index
      goldText.innerText = gold;

      let newWeapon = weapons[currentWeaponIndex].name; // get the name of the new weapon
      text.innerHTML = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon); // add the new weapon to the inventory
      text.innerHTML += ` In your inventory you have: <span class="chtext"> ${inventory.join(
        " , "
      )}</span> <div class="textimg">
        <img src="313734-P9FBYB-499.jpg" alt="">`;
    } else {
      text.innerHTML = `
      <span class="chtext">You do not have enough gold to buy health.</span> 
      <div class="textimg" style="background-color: white;">
        <img src="Gold Box.png" alt="">
      </div>`;
    }
  } else {
    // if the current weapon is the last weapon in the array
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
    text.innerHTML = `You already have <span class="chtext">the most powerful weapon!</span> you can sell some weapns. <div class="textimg" style="background-color: white;">
        <img src="324963-P9NH37-405.jpg" alt="">
      </div> `;
  }
}
function sellWeapon() {
  // if the user has more than one weapon
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    // remove the first weapon from the inventory
    let currentWeapon = inventory.shift();
    text.innerHTML = `You sold a <span class="chtext">${currentWeapon}</span> .`;
    text.innerHTML += ` In your inventory you have:   <span class="chtext"> ${inventory.join(
      " , "
    )}</span> <div class="textimg">
        <img src="313734-P9FBYB-499.jpg" alt="">`;
  } else {
    text.innerHTML = `Don't sell your <span class="chtext">only weapon!</span> <div class="textimg">
        <img src="stop_10392625.png" alt="">`;
  }
}

// this function is called when the user clicks the "Go to cave" button
function goCave() {
  button4.style.display = "inline";
  button3.style.display = "inline";
  update(locations[2]);
}
// this function is called when the user clicks the "Fight monsters" buttons
function goFight() {
  update(locations[3]); // update the location to the fight location
  monsterHealth = monsters[fighting].health; // set the monster health to the health of the monster the user is fighting
  monsterStats.style.display = "flex";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function fightSlime() {
  button4.style.display = "none";
  fighting = 0; // set the fighting variable to 0
  goFight();
}
function fightDragon() {
  button4.style.display = "none";
  fighting = 2; // set the fighting variable to 2
  goFight();
}
function fightBeast() {
  button4.style.display = "none";
  fighting = 1; //  set the fighting variable to 1
  goFight();
}
function attack() {
  // this function is called when the user clicks the "Attack" button
  button4.style.display = "none";
  text.innerHTML = `The  <span class="chtext">${monsters[fighting].name}</span> attacks.`; // display a message to the user
  text.innerHTML += ` You attack it with your  <span class="chtext"></span>${weapons[currentWeaponIndex].name}</span> . <div class="textimg">
          <img src="Fighting1.png" alt="">
        </div>`;
  health -= getMonsterAttackValue(monsters[fighting].level); // decrease the user's health by the monster's attack value
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1; // decrease the monster's health by the user's weapon power
  } else {
    text.innerHTML += " You miss."; // display a message to the user
  }
  healthText.innerText = health; // update the health text
  monsterHealthText.innerText = monsterHealth; // update the monster health text
  if (health <= 0) {
    lose(); // if the user's health is less than or equal to 0, call the lose function
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  if (Math.random() <= 0.1 && inventory.length !== 1) {
    // if the random number is less than or equal to 0.1 and the inventory length is not 1
    text.innerText += " Your " + inventory.pop() + " breaks."; // display a message to the user
    currentWeaponIndex--;
  }
}
function getMonsterAttackValue(level) {
  // this function returns the monster's attack value
  const hit = level * 5 - Math.floor(Math.random() * xp); // the monster's attack value is a random number between 0 and the monster's level * 5
  return hit > 0 ? hit : 0; // if the attack value is greater than 0, return the attack value, otherwise return 0
}
function isMonsterHit() {
  // this function returns true if the monster is hit, otherwise it returns false
  return Math.random() > 0.2 || health < 20;
}
function lose() {
  update(locations[5]);
}
function winGame() {
  update(locations[6]);
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // increase the user's gold by the monster's level * 6.7
  xp += monsters[fighting].level; // increase the user's xp by the monster's level
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function dodge() {
  button4.style.display = "none";

  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
function easterEgg() {
  button3.style.display = "inline";
  update(locations[7]);
}
// this function is called when the user clicks the "Pick a number" buttons
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
