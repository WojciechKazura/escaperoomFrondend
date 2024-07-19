var button=document.getElementById("create");
button.addEventListener("click",use);

function use(){
console.log("adg")
createGame();
}
    var request={
        name : "jeden",
        howManyRooms : 30
    }

function createGame(){
    var json= JSON.stringify(request);
    fetch("http://localhost:8080/games",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:json
    
    }).then(response=>response.json())
    .then(data=>{
    createMap(data);
    console.log("utworzony pokój o id "+data.firstRoom.id)
    }).catch(error=>console.error("error:"+error));

}

function createMap(data){    
    console.log(data.howManyRooms);
for(var i=0;i<data.howManyRooms;i++){
 var map = document.getElementById("map");
 var room = document.createElement("div");
map.appendChild(room);
room.innerHTML="room"+i;
}


}



