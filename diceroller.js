const types = { //Enumerate the seven types of starwars dice.
  boost: 0,     //blue
  setback: 1,   //black
  ability: 2,   //green
  difficulty: 3,//purple
  proficiency: 4,//yellow
  challenge: 5, //red
  force: 6      //white
}

const symbols = { //Enumerate the nine types of symbols that appear on the dice.
  none: 0,
  success: 1,
  failure: 2,
  advantage: 3,
  threat: 4,
  triumph: 5,
  dispair: 6,
  light: 7,
  dark: 8
}

class die { //dice class for creating specific types of dice and for rolling them.
  constructor(type){
    switch(type){
      case types.ability:
        this.sides = [
          [symbols.none, symbols.none],
          [symbols.advantage, symbols.advantage],
          [symbols.success, symbols.advantage],
          [symbols.success, symbols.success],
          [symbols.success, symbols.none],
          [symbols.success, symbols.none],
          [symbols.advantage, symbols.none],
          [symbols.advantage, symbols.none]
        ];
        break;
      case types.difficulty:
        this.sides = [
          [symbols.none, symbols.none],
          [symbols.threat, symbols.threat],
          [symbols.failure, symbols.none],
          [symbols.threat, symbols.none],
          [symbols.failure, symbols.threat],
          [symbols.threat, symbols.none],
          [symbols.threat, symbols.none],
          [symbols.failure, symbols.failure]
        ];
        break;
      case types.proficiency:
        this.sides = [
          [symbols.none, symbols.none],
          [symbols.advantage, symbols.none],
          [symbols.success, symbols.none],
          [symbols.success, symbols.none],
          [symbols.success, symbols.advantage],
          [symbols.success, symbols.advantage],
          [symbols.success, symbols.advantage],
          [symbols.success, symbols.success],
          [symbols.success, symbols.success],
          [symbols.advantage, symbols.advantage],
          [symbols.advantage, symbols.advantage],
          [symbols.triumph, symbols.none]
        ];
        break;
      case types.challenge:
        this.sides = [
          [symbols.none, symbols.none],
          [symbols.failure, symbols.none],
          [symbols.failure, symbols.none],
          [symbols.failure, symbols.failure],
          [symbols.failure, symbols.failure],
          [symbols.failure, symbols.threat],
          [symbols.failure, symbols.threat],
          [symbols.threat, symbols.none],
          [symbols.threat, symbols.none],
          [symbols.threat, symbols.threat],
          [symbols.threat, symbols.threat],
          [symbols.dispair, symbols.none]
        ];
        break;
      case types.boost:
        this.sides = [
          [symbols.none, symbols.none],
          [symbols.none, symbols.none],
          [symbols.advantage, symbols.advantage],
          [symbols.advantage, symbols.none],
          [symbols.success, symbols.advantage],
          [symbols.success, symbols.none]
        ];
        break;
      case types.setback:
        this.sides = [
          [symbols.none, symbols.none],
          [symbols.none, symbols.none],
          [symbols.failure, symbols.none],
          [symbols.failure, symbols.none],
          [symbols.threat, symbols.none],
          [symbols.threat, symbols.none]
        ];
        break;
      case types.force:
        this.sides = [
          [symbols.dark, symbols.none],
          [symbols.dark, symbols.none],
          [symbols.dark, symbols.none],
          [symbols.dark, symbols.none],
          [symbols.dark, symbols.none],
          [symbols.dark, symbols.none],
          [symbols.dark, symbols.dark],
          [symbols.light, symbols.none],
          [symbols.light, symbols.none],
          [symbols.light, symbols.light],
          [symbols.light, symbols.light],
          [symbols.light, symbols.light]
        ];
        break;
      default:
        console.log("Unrecognized die type! Type must be [0,6].");
    }
  }

  roll(){
    return this.sides[Math.random() * this.sides.length | 0];
  }
}

var dicepool = [0, 0, 0, 0, 0, 0, 0]; //variable used to keep track of how many dice of each type aree in the dicepool to be rolled

function syncDicePoolCounters(){ //ensure that the UI reflects the number of dice in the dicepool
  document.getElementById('numBoost').innerHTML = dicepool[types.boost];
  document.getElementById('numSetback').innerHTML = dicepool[types.setback];
  document.getElementById('numAbility').innerHTML = dicepool[types.ability];
  document.getElementById('numDifficulty').innerHTML = dicepool[types.difficulty];
  document.getElementById('numProficiency').innerHTML = dicepool[types.proficiency];
  document.getElementById('numChallenge').innerHTML = dicepool[types.challenge];
  document.getElementById('numForce').innerHTML = dicepool[types.force];
}

function addDiceToPool(type){ //add a die to the dicepool
  dicepool[type]++;
  syncDicePoolCounters();
}

function removeDiceFromPool(type){ //remove a die from the dicepool
  if(dicepool[type] > 0){
    dicepool[type]--;
    syncDicePoolCounters();
  }
}

function resetDicePool(){ //zero the dicepool
  dicepool = [0, 0, 0, 0, 0, 0, 0];
  syncDicePoolCounters();
}

function rollDicePool(){ //roll the dice
  let results = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //store the total number of times each symbol type is rolled on all the dice
  for(let dicetype = 0; dicetype < 7; dicetype++){ //for each type of dice
    if(dicepool[dicetype] > 0){ //if any dice of that type are in the current dicepool
      let d = new die(dicetype); //create a die of that type
      for(let rolls = 0; rolls < dicepool[dicetype]; rolls++){ //roll the new die a  umber of times equal to the number of dice of that type in the dicepool
        let side = d.roll(); //roll the die
        results[side[0]]++; //record its first symbol
        results[side[1]]++; //record its second symbol
      }
    }
  }
  let netSuccess = results[symbols.success] - results[symbols.failure]; //calculate how successful the roll was
  let netAdvantage = results[symbols.advantage] - results[symbols.threat]; //calculate how advantageous the roll was
  let netForce = results[symbols.light] - results[symbols.dark]; //calculate if the roll was more dark or light
  let totalsString = "Successes: " + results[symbols.success] + "\nFailures: " + results[symbols.failure] + "\nAdvantages: " + results[symbols.advantage] + "\nThreats: " + results[symbols.threat] + "\nTriumphs: " + results[symbols.triumph] + "\nDispairs: " + results[symbols.dispair] + "\nLightside: " + results[symbols.light] + "\nDarkside: " + results[symbols.dark] + "\n";
  console.log(totalsString); //display the results to the user
  let netString = "Net roll: " + Math.abs(netSuccess) + " " + (netSuccess >= 0 ? 'Successes' : 'Failures') + ", " + Math.abs(netAdvantage) + " " + (netAdvantage >= 0 ? 'Advantages' : 'Threats') + ", " + results[symbols.triumph] + " Triumphs, " + results[symbols.dispair] + " Dispairs, " + Math.abs(netForce) + " " + (netForce > 0 ? 'Lightside of the Force' : (netForce == 0 ? 'Neutral Force' : 'Darkside of the Force')) + "\n";
  console.log(netString); //display the  et roll results to the user
  document.getElementById('resultText').value = totalsString + netString;
}

const criticalInjuries = [ //list all the types of personal injuries that can occur in the game
  "Minor Nick: 1 strain",
  "Slowed: Can only act during last allied initiative slot on next turn",
  "Sudden Jolt: Drop item in hand",
  "Distracted: Cannot perform free maneuver next turn",
  "Off-Balance: add a setback (black) die to next skill check",
  "Discouraging Wound: Flip light side Destiny Point to dark side (reverse for NPC)",
  "Stunned: Staggered until end of next turn",
  "Stinger: add a difficulty (purple) die to next check",
  "Bowled Over: Knocked prone, +1 strain",
  "Head Ringer: add difficulty (purple) die to Intellect / Cunning checks until end of encounter",
  "Fearsome Wound: add difficulty (purple) die to Presence / Willpower checks until end of encounter",
  "Agonizing Wound: add difficulty (purple) die to Brawn / Agility checks until end of encounter",
  "Slightly Dazed: Disoriented until end of encounter",
  "Scattered Senses: Gains no boost (blue) dice until end of encounter",
  "Hamstrung: Lose free maneuver until end of encounter",
  "Overpowered: Attacker may immediately attempt another free attack, using same pool as original attack",
  "Winded: Cannot voluntarily suffer strain until end of encounter",
  "Compromised: add difficulty (purple) die until end of encounter",
  "At the Brink: 1 strain per action",
  "Crippled: One limb is impaired until healed/replaced. add difficulty (purple) die to all checks using that limb.",
  "Maimed: One limb is permanently lost. Cannot perform actions with limb. All other actions add a setback (black) die",
  "Horrific Injury: -1 penalty to random characteristic until injury is healed",
  "Temporarily Lame: Cannot perform more than 1 maneuver per turn until injury is healed",
  "Blinded: Cannot see. add two difficulty (purple) dice  to all checks. Add three difficulty (purple) dice to Perception and Vigilance.",
  "Knocked Senseless: Staggered until end of encounter.",
  "Gruesome Injury: Permanent -1 penalty to random characteristic",
  "Bleeding Out: Suffer 1 wound & 1 strain per turn until injury is healed. Suffer 1 Critical Injury per 5 wounds beyond wound threshold.",
  "The End is Nigh: Character dies after last Initiative slot of next round.",
  "Dead"
]

const criticalInjuriesThresholds = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105,110, 115,120, 125, 130, 140, 150, 250] //list the threshold for each type of personal injury

const criticalVehicleDamage = [ //list all the kinds of vehilce damage that can happen in the game
  "Mechnical Stress: +1 system strain",
  "Jostled: Small explosion or impact. Crew suffer +1 strain and are disoriented for 1 round.",
  "Losing Power to Shields: -1 defense in a defense zone until repaired. If no defense, -1 strain.",
  "Knocked Off Course: On next turn, pilot cannot execute any maneuvers and must make Piloting check to regain control the difficulty of this check is equal to the current speed of the ship (ie. one difficulty [purple] die per level of the ships speed at the time this damage is dealt)",
  "Tailspin: All attacks from ship suffer two setback (black) dice and all crew immobilized until end of pilot’s next turn.",
  "Component Hit: One component inoperable until end of next round.",
  "Shields Failing: -1 defense in all zones until repaired. If no defense, -2 strain.",
  "Navicomputer Failure: Navicomputer (or R2 unit) fails until repaired. If no hyperdrive, navigation systems fail (pilot flying blind).",
  "Power Fluctuations: Pilot cannot voluntarily inflict system strain until repaired.",
  "Shields Down: Defense in affected zone reduced to 0, -1 defense in all other zones until repaired. If no defense, -4 system strain.",
  "Engine Damaged: -1 speed (minimum 1) until repaired.",
  "Shield Overload: -2 strain. Defense = 0 in all zones. Cannot be repaired until end of encounter. If no defense, -1 armor.",
  "Engines Down: Speed = 0 and cannot perform maneuvers until repaired. (Ship continues on present course due to momentum.)",
  "Major System Failure: One component inoperable until repaired.",
  "Major Hull Breach: If the ship's Silhouette is less than or equal to four then the hull depressurizes in a number of rounds equal to its silhouette. If the ship's Silhouette is five or more then the hull is partially depressurized at GM’s discretion.",
  "Destabilized: Hull Trauma Threshold and System Strain Threshold are half of thier original values until repaired.",
  "Fire!: -2 strain. Crew may be caught in fire. Takes one round per two silhouette to put out, requiring Cool and Vigilance checks.",
  "Breaking Up: Ship is completely destroyed at the end of the next round.",
  "Vaporized: Ship is destroyed in an impressive fireball. Nothing survives."
]

const criticalVehicleDamageThresholds = [9, 18, 27, 36, 45, 54, 64, 72, 81, 90, 99, 108, 117, 126, 133, 138, 144, 153, 250] //list the thresholds for different types of vehicle damge

function rollCriticalHit(isVehicle){ //roll a critical injury
  let roll = (Math.random() * 100 | 0) + parseInt(document.getElementById("critSlider").value); //get a random number from 0 to 100 and add the value from the UI slider
  var thresholds = isVehicle ? criticalVehicleDamageThresholds : criticalInjuriesThresholds; //select the correct threshold list for the situation
  var injuries = isVehicle ? criticalVehicleDamage : criticalInjuries; //select the correct injury list for the situation
  for(let i = 0; i < thresholds.length; i++){ //compare the threshold list to the value rolled to determine which injury occurs
    if(roll < thresholds[i]){ //linear search of 19 items. Binary search would be more efficient, but seems overkill for such a small set.
      document.getElementById('resultText').value = "[" + roll + "] " + injuries[i]; //display result to the user
      return;
    }
  }
}

function updateSliderDisplay(){ //update slider display for the user so that he or she can tell what value has been selected
   document.getElementById('output').innerHTML = document.getElementById("critSlider").value
}
