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
