let player;
let socket;
let SID;
let players = {};
let playersNew = {};
let x= 76500
let y = 4800
function preload(){
  fistB = loadImage('assets/img/fistCat/fistB.png')
  fistF = loadImage('assets/img/fistCat/fistF.png')
  fistL = loadImage('assets/img/fistCat/fistL.png')
  fistR = loadImage('assets/img/fistCat/fistR.png')
  fistH = loadImage('assets/img/fistCat/fistH.png')
  tmap = loadTiledMap("Yoku", "data");
  // engiCat = loadImage('assets/img/engiCat.png')
  // mageCat = loadImage('assets/img/mageCat.png')
  // bowCat = loadImage('assets/img/bowCat.png')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  fistF.resize(75,75)
  fistB.resize(75,75)
  fistR.resize(75,75)
  fistL.resize(75,75)
  fistH.resize(75,75)

  //player = new Player(350,350)
  socket = io('http://207.63.186.14:5000');
  socket.on('connect', function(sock){
    socket.emit('initPlayer',player)
    print("connected")
  
  });
  socket.on('initPlayer',function() {
    print("emit")
  })
  socket.on('addPlayer',function(data){
    
    players[data.sid] = new Player(data.x,data.y,data.name,data.cass,data.direction)
    players[data.sid].sid = data.sid;
  });
  socket.on('remove player',function(data){
    delete players[data.sid];
  });

  socket.on('player move',function(data){
    players[data.sid].sid = data.sid;
    players[data.sid].x = data.x
    players[data.sid].y = data.y
    players[data.sid].direction = data.direction;
    players[data.sid].cass = data.cass;
  });
  player = new Player(width/2,width/2,"name")
  s = tmap.getMapSize();
  fill(0)
}

function draw() {
  background(0);
  //background(tmap.getBackgroundColor());
  tmap.draw(x, y);
  fill(255)
  text("Camera Coords: "+x+","+y,10,255)
  text("Map Size: " + tmap.getMapSize(), 10, 300);
  text("Layer 0 Type: " + tmap.getType(0), 10, 350);
  //image(fistCat, player.x, player.y)
  for (let i = 0; i < Object.keys(players).length; i++) {
    pyer = players[Object.keys(players)[i]];
    pyer.draw();
  }
  let needsupdate = false
  if (keyIsDown(65)) { //A
    //console.log(`Key ${keyCode.key} pressed.`)
    player.x -= player.speed
    player.direction = "left"
    player.draw()
    needsupdate = true
  } 
  if (keyIsDown(68)) {//D
    //console.log(`Key ${keyCode.key} pressed.`)
    player.x += player.speed
    player.direction = "right"
    player.draw()
    needsupdate = true
  }  
  if (keyIsDown(87)) { //W
    //console.log(`Key ${keyCode.key} pressed.`)
    player.y -= player.speed
    player.direction = "up"
    player.draw()
    needsupdate = true
  }  
  if (keyIsDown(83)) {//S
    //console.log(`Key ${keyCode.key} pressed.`)
    player.y += player.speed
    player.direction = "down"
    player.draw()
    needsupdate = true
  }
  player.cass = "fists"
  if(needsupdate){
    socket.emit('move',player)
  }
  if (keyIsPressed) {
    if(key == 'a' || key == 'A') x -= player.speed;
    if(key == 'd' || key == 'D') x += player.speed;
    if(key == 'w' || key == 'W') y -= player.speed;
    if(key == 's' || key == 'S') y += player.speed;
}
  
}

