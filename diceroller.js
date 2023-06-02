
const types = {
  boost: 0,
  setback: 1,
  ability: 2,
  difficulty: 3,
  proficiency: 4,
  challenge: 5,
  force: 6
}

const symbols = {
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
class die {
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
        this.numSides = 8;
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
        this.numSides = 8;
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
        this.numSides = 12;
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
        this.numSides = 12;
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
        this.numSides = 6;
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
        this.numSides = 6;
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
      let d = new die(dicetype);
      for(let rolls = 0; rolls < dicepool[dicetype]; rolls++){
        let side = d.roll();
        results[side[0]]++;
        results[side[1]]++;
      }
    }
  }
  let netSuccess = results[symbols.success] - results[symbols.failure];
  let netAdvantage = results[symbols.advantage] - results[symbols.threat];
  let netForce = results[symbols.light] - results[symbols.dark];
  let totalsString = "Successes: " + results[symbols.success] + "\nFailures: " + results[symbols.failure] + "\nAdvantages: " + results[symbols.advantage] + "\nThreats: " + results[symbols.threat] + "\nTriumphs: " + results[symbols.triumph] + "\nDispairs: " + results[symbols.dispair] + "\nLightside: " + results[symbols.light] + "\nDarkside: " + results[symbols.dark] + "\n";
  console.log(totalsString);
  let netString = "Net roll: " + Math.abs(netSuccess) + " " + netSuccess >= 0 ? 'Successes' : 'Failures' + ", " + Math.abs(netAdvantage) + " " + netAdvantage >= 0 ? 'Advantages' : 'Threats' + ", " + results[symbols.triumph] + " Triumphs, " + results[symbols.dispair] + " Dispairs, " + Math.abs(netForce) + " " + netForce > 0 ? 'Lightside of the Force' : (netForce == 0 ? 'Neutral Force' : 'Darkside of the Force') + "\n";
  console.log(netString);
  document.getElementById('resultText').value = totalsString + netString;
}
