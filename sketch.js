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
let currentX;
let currentY;
let oldx
let oldy
let images = {};
let rand;
let name
let login

function loadCat(cat) {
  let fistB = loadImage('assets/img/'+cat+'Cat/'+cat+'B.png')
  let fistF = loadImage('assets/img/'+cat+'Cat/'+cat+'F.png')
  let fistL = loadImage('assets/img/'+cat+'Cat/'+cat+'L.png')
  let fistR = loadImage('assets/img/'+cat+'Cat/'+cat+'R.png')
  fistF.resize(70,70)
  fistB.resize(70,70)
  fistR.resize(70,70)
  fistL.resize(70,70)
  //fistH.resize(100,100)
  return {"B":fistB,"F":fistF,"L":fistL,"R":fistR};
}
function preload(){
  login = false
  let words = ["fist","mage","bow","engi","blade","fists"]
  for (let i = 0; i < words.length; i++) {
    let tempCat = loadCat(words[i])
    for (let index = 0; index < tempCat.keys; index++) {
      tempCat[tempCat.keys()[index]].resize(100,100);
    }
    images[words[i]] = tempCat
  }
  rand = random(words);
  
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

  // LOGO
  logo = loadImage('assets/Logo.png')




  

  // engiCat = loadImage('assets/img/engiCat.png')
  // mageCat = loadImage('assets/img/mageCat.png')
  // bowCat = loadImage('assets/img/bowCat.png')
}
function setup() {
  createCanvas(1280,720)

  logo.resize(625.5, 0)
  fill(255)
  imageMode(CENTER)
  image(logo, width/2, height/8)
  textAlign(CENTER)
  input = createInput();
  input.position(width/2 - 80, 240);

  button = createButton('submit');
  button.position(800-80, 240, 65);
  button.mousePressed(function(){name = input.value()});
  fill(0)
  textSize(24)
  text("Nickname", width/2, 220)
  afterLogin()
  login = true
}

function afterLogin() {

  //player = new Player(350,350)
  socket = io('http://207.63.186.14:5000');
  socket.on('connect', function(sock){
    socket.emit('initPlayer',player)
    print("connected")
  
  });
  socket.on('initPlayer',function() {
    socket.emit("nameUpdate","Cool name b")
  })
  socket.on('setsid', function(sid){
    print("set sid")
    player.sid = sid["sid"]
  })
  socket.on('addPlayer',function(data){
    print("added player")
    print(data.cass)
    players[data.sid] = new Player(data.x,data.y,data.name,data.cass,data.direction)
    players[data.sid].sid = data.sid;
  });
  socket.on('remove player',function(data){
    delete players[data.sid];
  });
  socket.on('respawn',function(data){
    if(data.sid == player.sid) {
      player.x = (s.x*tmap.getTileSize().x)/2;
      player.y = (s.y*tmap.getTileSize().y)/2;
      player.health = 100
      socket.emit('move',player)
    }
    
  });

  socket.on('player move',function(data){
    players[data.sid].sid = data.sid;
    players[data.sid].x = data.x
    players[data.sid].health = data.health;
    players[data.sid].xp = data.xp;
    players[data.sid].y = data.y
    players[data.sid].direction = data.direction;
    players[data.sid].cass = data.cass;
    players[data.sid].name = data.name;
    if(data.sid != player.sid){
      players[data.sid].draw();
    }
    else {
      player.name = players[data.sid].name
      player.health = players[data.sid].health
      player.xp = players[data.sid].xp
      player.speed = players[data.sid].speed
    }
  });
  s = tmap.getMapSize();
  let x= (s.x*tmap.getTileSize().x)/2
  let y = (s.y*tmap.getTileSize().y)/2;
  
  let offsetx = (s.x*tmap.getTileSize().x)/2;
  let offsety = (s.y*tmap.getTileSize().y)/2;
  let viewportx = x;
  let viewporty = y;
  oldx = offsetx;
  oldy = offsety;
  
  player = new Player(x,y,name,rand)
  weapon = new Weapon()

  fill(0)
}

function draw() {
  if (login == false) {return}
  background(0);
  let currentX = (s.x*tmap.getTileSize().x)/2;
  let currentY = (s.y*tmap.getTileSize().y)/2;
  x = player.x
  y = player.y
  //background(tmap.getBackgroundColor());
  tmap.draw(player.x, player.y);
  fill(255)
  textSize(24)
  text("Health: "+player.health, 1100,50)
  text("XP: "+player.xp, 1100, 100)
  if (player.xp >= 100) {
    text("Press U to level up", 1100, 150)
  }

  
  //image(fistCat, player.x, player.y)
  player.offsetx = -player.x+width/2
  player.offsety = -player.y+height/2
  
  for (let i = 0; i < Object.keys(players).length; i++) {
    pyer = players[Object.keys(players)[i]];
    pyer.offsetx = -player.x+width/2
    pyer.offsety = -player.y+height/2
    if(pyer.sid != player.sid && pyer.health > 0){
      pyer.draw();
    }
    
    weapon.draw()
  }
  let needsupdate = false
  if(player.health < 1) {
    player.x = lerp(x, currentX, 0.05)
    player.y = lerp(y, currentY, 0.05)
    return
  };
  player.draw();
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
  //player.cass = "fists"
  if(needsupdate){
    socket.emit('move',player)
  }
  //player.draw()
}
function keyPressed(key) {
  if (key.keyCode == 32 && player.health > 0) {
    print("attack")
    socket.emit("attack")
  }
}

