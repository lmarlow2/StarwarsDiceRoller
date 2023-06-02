class die {
  static const types = {
    boost: 0,
    setback: 1,
    ability: 2,
    difficulty: 3,
    proficiency: 4,
    challenge: 5,
    force: 6
  }

  static const symbols = {
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

  constructor(type){
    switch(type){
      case die.types.ability:
        this.sides = [
          [die.symbols.none, die.symbols.none],
          [die.symbols.advantage, die.symbols.advantage],
          [die.symbols.success, die.symbols.advantage],
          [die.symbols.success, die.symbols.success],
          [die.symbols.success, die.symbols.none],
          [die.symbols.success, die.symbols.none],
          [die.symbols.advantage, die.symbols.none],
          [die.symbols.advantage, die.symbols.none]
        ];
        this.numSides = 8;
        break;
      case die.types.difficulty:
        this.sides = [
          [die.symbols.none, die.symbols.none],
          [die.symbols.threat, die.symbols.threat],
          [die.symbols.failure, die.symbols.none],
          [die.symbols.threat, die.symbols.none],
          [die.symbols.failure, die.symbols.threat],
          [die.symbols.threat, die.symbols.none],
          [die.symbols.threat, die.symbols.none],
          [die.symbols.failure, die.symbols.failure]
        ];
        this.numSides = 8;
        break;
      case die.types.proficiency:
        this.sides = [
          [die.symbols.none, die.symbols.none],
          [die.symbols.advantage, die.symbols.none],
          [die.symbols.success, die.symbols.none],
          [die.symbols.success, die.symbols.none],
          [die.symbols.success, die.symbols.advantage],
          [die.symbols.success, die.symbols.advantage],
          [die.symbols.success, die.symbols.advantage],
          [die.symbols.success, die.symbols.success],
          [die.symbols.success, die.symbols.success],
          [die.symbols.advantage, die.symbols.advantage],
          [die.symbols.advantage, die.symbols.advantage],
          [die.symbols.triumph, die.symbols.none]
        ];
        this.numSides = 12;
        break;
      case die.types.challenge:
        this.sides = [
          [die.symbols.none, die.symbols.none],
          [die.symbols.failure, die.symbols.none],
          [die.symbols.failure, die.symbols.none],
          [die.symbols.failure, die.symbols.failure],
          [die.symbols.failure, die.symbols.failure],
          [die.symbols.failure, die.symbols.threat],
          [die.symbols.failure, die.symbols.threat],
          [die.symbols.threat, die.symbols.none],
          [die.symbols.threat, die.symbols.none],
          [die.symbols.threat, die.symbols.threat],
          [die.symbols.threat, die.symbols.threat],
          [die.symbols.dispair, die.symbols.none]
        ];
        this.numSides = 12;
        break;
      case die.types.boost:
        this.sides = [
          [die.symbols.none, die.symbols.none],
          [die.symbols.none, die.symbols.none],
          [die.symbols.advantage, die.symbols.advantage],
          [die.symbols.advantage, die.symbols.none],
          [die.symbols.success, die.symbols.advantage],
          [die.symbols.success, die.symbols.none]
        ];
        this.numSides = 6;
        break;
      case die.types.setback:
        this.sides = [
          [die.symbols.none, die.symbols.none],
          [die.symbols.none, die.symbols.none],
          [die.symbols.failure, die.symbols.none],
          [die.symbols.failure, die.symbols.none],
          [die.symbols.threat, die.symbols.none],
          [die.symbols.threat, die.symbols.none]
        ];
        this.numSides = 6;
        break;
      case die.types.force:
        this.sides = [
          [die.symbols.dark, die.symbols.none],
          [die.symbols.dark, die.symbols.none],
          [die.symbols.dark, die.symbols.none],
          [die.symbols.dark, die.symbols.none],
          [die.symbols.dark, die.symbols.none],
          [die.symbols.dark, die.symbols.none],
          [die.symbols.dark, die.symbols.dark],
          [die.symbols.light, die.symbols.none],
          [die.symbols.light, die.symbols.none],
          [die.symbols.light, die.symbols.light],
          [die.symbols.light, die.symbols.light],
          [die.symbols.light, die.symbols.light]
        ];
        this.numSides = 12;
        break;
      default:
        console.log("Unrecognized diece type!");
    }
  }

  roll(){
    return this.sides[Math.floor(Math.random() * this.numSides)];
  }
}

var dicepool = [0, 0, 0, 0, 0, 0, 0];

function addDiceToPool(type){
  dicepool[type]++;
}

function removeDiceFromPool(type){
  dicepool[type]--;
}

function resetDicePool(){
  dicepool = [0, 0, 0, 0, 0, 0, 0]; 
}

function rollDicePool(){
  let results = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for(let dicetype = 0; dicetype < 7; dicetype++){
    if(dicepool[dicetype] > 0){
      let d = die(dicetype);
      for(let rolls = 0; rolls < dicepool[dicetype]; rolls++){
        let side = d.roll();
        results[side[0]]++;
        results[side[1]]++;
      }
    }
  }
  let netSuccess = results[die.symbols.success] - results[die.symbols.failure];
  let netAdvantage = results[die.symbols.advantage] - results[die.symbols.threat];
  let netForce = results[die.symbols.light] - results[die.symbols.dark];
  console.log("Successes: %d\nFailures: %d\nAdvantages: %d\nThreats: %d\n, Triumphs: %d\nDispairs: %d\nLightside: %d\nDarkside: %d\n", 
              results[die.symbols.success], results[die.symbols.failure], results[die.symbols.advantage], results[die.symbols.threat], 
              results[die.symbols.triumph], results[die.symbols.dispair], results[die.symbols.light], results[die.symbols.dark]);
  console.log("Net roll: %d %s, %d %s, %d Triumphs, %d Dispairs, %d %s\n", 
              Math.abs(netSuccess), netSuccess >= 0 ? "Successes" : "Failures", 
              Math.abs(netAdvantage), netAdvantage >= 0 ? "Advantages" : "Threats", 
              results[die.symbols.triumph], results[die.symbols.dispair],
              Math.abs(netForce), netForce > 0 ? "Lightside of the Force" : (netForce == 0 ? "Neutral Force" : "Darkside of the Force"));
}
