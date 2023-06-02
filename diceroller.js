class die {
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

  constructor(color) {
    switch(color){
      case "green":
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
        break;
      case "purple":
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
        break;
      case "yellow":
        this.sides = [
          [die.symbols.none, die.symbols.none],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ];
        break;
      case "red":
        break;
      case "blue":
        break;
      case "black":
        break;
      case "force":
        break;
      default:
    }
  }
}

var initiativeOrder = [];
var currentInitiative = 0;

function removeFromInitiativeOrder(index){
  if(currentInitiative > index) currentInitiative--;
  if(currentInitiative == initiativeOrder.length - 1) currentInitiative = 0;
  initiativeOrder.splice(index, 1);
  displayInitiativeList();
}

function displayInitiativeList(){
  let list = "";
  for(let k = 0; k < initiativeOrder.length; k++){
    list += "<li>";
    if(k == currentInitiative)
      list += "<mark>";
    list += initiativeOrder[k].name;
    if(k == currentInitiative)
      list += "</mark>";
    list += "    <button onclick='removeFromInitiativeOrder(" + k + ")'>Remove</button>";
    list += "</li>";
  }
  document.getElementById("initiativeList").innerHTML = list;
}

function compare(a,b){ return b.initiative - a.initiative; }

function addToInitiativeOrder(){
  if(document.getElementById("roll").checked){
    document.getElementById("initiative").value = Math.floor(Math.random() * 20);
  }
  initiativeOrder.push({name:document.getElementById("name").value, initiative:document.getElementById("initiative").value});
  initiativeOrder.sort(compare);
  displayInitiativeList();
}

function resetInitiativeOrder(){
  initiativeOrder = [];
  currentInitiative = 0;
  document.getElementById("initiativeList").innerHTML = "";
}

function advanceList(){
  currentInitiative = (currentInitiative + 1) % initiativeOrder.length;
  displayInitiativeList();
}
