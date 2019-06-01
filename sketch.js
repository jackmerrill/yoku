let player;
let socket;
let players = {};
function preload(){
  fistB = loadImage('assets/img/fistCat/fistB.png')
  fistF = loadImage('assets/img/fistCat/fistF.png')
  fistL = loadImage('assets/img/fistCat/fistL.png')
  fistR = loadImage('assets/img/fistCat/fistR.png')
  // engiCat = loadImage('assets/img/engiCat.png')
  // mageCat = loadImage('assets/img/mageCat.png')
  // bowCat = loadImage('assets/img/bowCat.png')
}

function setup() {
  createCanvas(800, 800)
  fistF.resize(75,75)
  fistB.resize(75,75)
  fistR.resize(75,75)
  fistL.resize(75,75)

  player = new Player(350,350)
  socket = io('http://207.63.186.14:5000');
  socket.on('connect', function(sock){
    print("connected")

  });
  socket.on('initPlayer',function() {
    socket.emit('initPlayer',player)
    print("emit")
  })
  socket.on('addPlayer',function(data){
    players[data.sid] = new Player(data.x,data.y,data.name)
    print("added player")
  });
  socket.on('remove player',function(data){
    delete players[data.sid];
  });

  socket.on('player move',function(data){
    players[data.sid].x = data.x;
    players[data.sid].y = data.y;
  });
  player = new Player(100,100,"name")
}

function draw() {
  background(0);
  //image(fistCat, player.x, player.y)
  for (let i = 0; i < Object.keys(players).length; i++) {
    pyer = players[Object.keys(players)[i]];
    //print(pyer);
    pyer.draw();
  }
  let needsupdate = false
  if (keyIsDown(65)) { //A
    console.log(`Key ${keyCode.key} pressed.`)
    player.x -= player.speed
    needsupdate = true
  } 
  if (keyIsDown(68)) {//D
    console.log(`Key ${keyCode.key} pressed.`)
    player.x += player.speed
    needsupdate = true
  }  
  if (keyIsDown(87)) { //W
    console.log(`Key ${keyCode.key} pressed.`)
    player.y -= player.speed
    needsupdate = true
  }  
  if (keyIsDown(83)) {//S
    console.log(`Key ${keyCode.key} pressed.`)
    player.y += player.speed
    needsupdate = true
  }
  if(needsupdate){
    socket.emit('move',{'x':player.x,'y':player.y})
  }
  
}

