let gameId=0;
let activeRoom=0;

const buttonOne = document.getElementById("create");
buttonOne.addEventListener("click", use);
const map = document.getElementById('map');

const buttonTwo = document.getElementById("move");
buttonTwo.addEventListener("click", move);

function use() {
    console.log("adg")
    createGame();
}
var request = {
    name: "jeden",
    howManyRooms: 10
}

function move(){
    console.log(gameId);
}

//dane:
//id gry
//id tam gdzie idziemy 

//zrobić zapytanie z tymi danymi

//wykonać ten ruch (podświetlić drugi pokoj) -> jeśli nie było błędu



function createGame() {
    var json = JSON.stringify(request);
    fetch("http://localhost:8080/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    }).then(response => response.json())
    .then(data => {
            console.log(data.connections);
            drawMap2(data.connections, data.activeRoom);
            gameId=data.id;
            console.log("create game with id: "+ gameId)
            activeRoom=data.activeRoom;
        }).catch(error => console.error(error.stack));

}

// Funkcja do rysowania pokoju
function drawRoom(room,activeRoomId) {
    const node = document.createElement('div');
    //node.dataset.roomId=room.id;
   // node.roomId = room.id; // dodanie atrybutu ale tylko do obiektu JS, nie jest synchronizowane z całym HTML
    node.setAttribute("room-id",room.id);
    node.classList.add('node');
    node.style.left = `${room.x}px`;
    node.style.top = `${room.y}px`;
    map.appendChild(node);
    if(room.id==activeRoomId){
       node.classList.add('active');
    }else{
        node.classList.add('passive');
    }
    node.addEventListener("click",clickRoom);
}

function clickTest(){
console.log("click");
}

function clickRoom(event){
console.log("move to room of id: " + event.target.getAttribute("room-id") + " from room of id: " + activeRoom);
changeActiveRoom(event.target.getAttribute("room-id"));
}

function changeActiveRoom(newActiveRoom){
    const url = new URL('http://localhost:8080/games/'+gameId+'/moves');
    url.searchParams.append('nextRoomId',newActiveRoom);

    fetch(url, {
        method: "POST"
    }).then(data => {
        if(!data.ok){
            throw new Error(`HTTP error! Status: ${data.status}`);
        }
            drawActiveRoom(newActiveRoom); //i tak to robi nawet jesli jest błąd 400
        }).catch(error => console.error("error:" + error.stack));  

}

/*const url = new URL('https://api.example.com/data');
url.searchParams.append('param1', 'value1');
url.searchParams.append('param2', 'value2');

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));*/



function drawActiveRoom(newActiveRoom){
const activeRoomNode = document.querySelector('[room-id="'+activeRoom + '"]');
//blad z selectorem cos nie tak, nie znalazl
activeRoomNode.classList.remove('active');
activeRoomNode.classList.add('passive');
const newActiveRoomNode = document.querySelector('[room-id="'+newActiveRoom + '"]');
newActiveRoomNode.classList.add('active');
newActiveRoomNode.classList.remove('passive');
activeRoom=newActiveRoom;
}

//Tworzenie pokoi
function createRooms(connection) {
    const rooms = [];
    for (i = 0; i < connection.length; i++) {
        let y = 0;
        if ((i + 1) % 2 == 0) {
            y = 200;
        } else y = 100;
        rooms.push({ id: connection[i].from, x: (i + 1) * 100, y: y })
    }
    return rooms;
}

// Funkcja do rysowania połączenia
function drawConnection(connection, rooms) {
    const fromRoom = rooms.find(room => room.id === connection.from);
    const toRoom = rooms.find(room => room.id === connection.to);

    if (fromRoom && toRoom) {
        const line = document.createElement('div');
        line.classList.add('line');

        const dx = toRoom.x - fromRoom.x;
        const dy = toRoom.y - fromRoom.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.left = `${fromRoom.x}px`;
        line.style.top = `${fromRoom.y}px`;
        line.style.transform = `rotate(${angle}deg)`;

        map.appendChild(line);
    }
}


function drawMap2(connections,activeRoom) {
    const rooms = createRooms(connections);
    for (const connection of connections) {
        drawConnection(connection, rooms);
    }
    for (const room of rooms) {
        drawRoom(room,activeRoom);
    }

}







