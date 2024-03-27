console.log("hello");


var itemNames =  ["Key","Coins","Door"];
var messageView=document.getElementById("messageView");

console.log(messageView);

var items=document.getElementById("itemsTable");
var urlParams= new URLSearchParams(window.location.search);
var id=urlParams.get("id");
console.log(id);

for( var itemName of itemNames){
var row =items.insertRow(-1);//-1 ozanacza to na koniec tabeli
var cell = row.insertCell(0);
var cell2 =  row.insertCell(1);
cell.innerHTML=itemName;
var button=document.createElement("button");
button.innerHTML="Użyj";
cell2.appendChild(button);
button.addEventListener("click",use);

}

function use(){
    var firstMessage="Kliknij co chcesz uzyć!!!!!!!!!!!!!!!!!!!!!!!!!11";
    messageView.innerHTML=firstMessage;
    console.log(firstMessage);
}

