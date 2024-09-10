var button = document.getElementById("create");
button.addEventListener("click", use);
const map = document.getElementById('map');

function use() {
    console.log("adg")
    createGame();
}
var request = {
    name: "jeden",
    howManyRooms: 10
}

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
            console.log("mapa " + data.connections)
            drawMap2(data.connections, data.activeRoom);
        }).catch(error => console.error("error:" + error));

}

// Funkcja do rysowania pokoju
function drawRoom(room,activeRoomId) {
    console.log(room.x)
    console.log(activeRoomId);
    const node = document.createElement('div');
    node.classList.add('node');
    node.style.left = `${room.x}px`;
    node.style.top = `${room.y}px`;
    map.appendChild(node);
    if(room.id==activeRoomId){
       node.classList.add('active');
    }else{
        node.classList.add('passive');
    }
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


function drawMap2(connections,activeRoom) {
    const rooms = createRooms(connections);
    for (const room of rooms) {
        drawRoom(room,activeRoom);
    }
    for (const connection of connections) {
        drawConnection(connection, rooms);
    }
}







