let player;
let socket;
let SID;
let players = {};
let playersNew = {};
let x= 0;
let y = 0;
let offsetx = 0;
let offsety = 0;
let viewportx = x;
let viewporty = y;
let viewportxsize = 1000;
let viewportysize = 1000;
function preload(){
  fistB = loadImage('assets/img/fistCat/fistB.png')
  fistF = loadImage('assets/img/fistCat/fistF.png')
  fistL = loadImage('assets/img/fistCat/fistL.png')
  fistR = loadImage('assets/img/fistCat/fistR.png')
  tmap = loadTiledMap("Yoku", "data");

  // WEAPONS
  fistH = loadImage('assets/img/fistCat/fistH.png')
  mageH = loadImage('assets/img/mageCat/mageH.png')
  engiH = loadImage('assets/img/engiCat/enWrench.png')
  engiT = loadImage('assets/img/engiCat/enTur.png')
  bowE = loadImage('assets/img/bowCat/bowBowE.png')
  bowL = loadImage('assets/img/bowCat/bowBowL.png')
  bowA = loadImage('assets/img/bowCat/bowArrow.png')
  bladeS = loadImage('assets/img/bladeCat/bladeSword.png')

  // engiCat = loadImage('assets/img/engiCat.png')
  // mageCat = loadImage('assets/img/mageCat.png')
  // bowCat = loadImage('assets/img/bowCat.png')
}

function setup() {
  createCanvas(1280, 720)
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
  socket.on('setsid', function(sid){
    print("set sid")
    player.sid = sid["sid"]
  })
  socket.on('addPlayer',function(data){
    print("added player")
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
    if(data.sid != player.sid){
      players[data.sid].draw();
    }
  });
  s = tmap.getMapSize();
  let x= (s.x*tmap.getTileSize().x)/2
  let y = (s.y*tmap.getTileSize().y)/2;
  
  let offsetx = (s.x*tmap.getTileSize().x)/2;
  let offsety = (s.y*tmap.getTileSize().y)/2;
  let viewportx = x;
  let viewporty = y;
  player = new Player(x,y,"name")
  weapon = new Weapon()

  fill(0)
}

function draw() {
  background(0);
  x = player.x
  y = player.y
  //background(tmap.getBackgroundColor());
  tmap.draw(player.x, player.y);
  fill(255)
  text("Camera Coords: "+x+","+y,10,255)
  text("Map Size: " + tmap.getMapSize(), 10, 300);
  text("Layer 0 Type: " + tmap.getType(0), 10, 350);
  //image(fistCat, player.x, player.y)
  player.offsetx = -player.x+width/2
  player.offsety = -player.y+height/2
  player.draw();
  for (let i = 0; i < Object.keys(players).length; i++) {
    pyer = players[Object.keys(players)[i]];
    pyer.offsetx = -player.x+width/2
    pyer.offsety = -player.y+height/2
    if(pyer.sid != player.sid){
      pyer.draw();
    }
    
    weapon.draw()
  }
  let needsupdate = false
  if (keyIsDown(65)) { //A
    //console.log(`Key ${keyCode.key} pressed.`)
    player.x -= player.speed
    player.direction = "left"
    //player.draw()
    needsupdate = true
  } 
  if (keyIsDown(68)) {//D
    //console.log(`Key ${keyCode.key} pressed.`)
    player.x += player.speed
    player.direction = "right"
    //player.draw()
    needsupdate = true
  }  
  if (keyIsDown(87)) { //W
    //console.log(`Key ${keyCode.key} pressed.`)
    player.y -= player.speed
    player.direction = "up"
    //player.draw()
    needsupdate = true
  }  
  if (keyIsDown(83)) {//S
    //console.log(`Key ${keyCode.key} pressed.`)
    player.y += player.speed
    player.direction = "down"
    //player.draw()
    needsupdate = true
  }
  if (keyIsDown(37)) { // LeftArrow
    weapon.rot(5.0)
    weapon.draw()
    needsupdate = true
  }
  player.cass = "fists"
  if(needsupdate){
    socket.emit('move',player)
  }
  //player.draw()
}


