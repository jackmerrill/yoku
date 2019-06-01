let player;

function preload(){
  fistCat = loadImage('assets/img/fistCat.png')
  // engiCat = loadImage('assets/img/engiCat.png')
  // mageCat = loadImage('assets/img/mageCat.png')
  // bowCat = loadImage('assets/img/bowCat.png')
}

function setup() {
  createCanvas(800, 800)
  fistCat.resize(30,30)
  player = new Player(100,100)
}

function draw() {
  background(0);
  image(fistCat, player.x, player.y)
  if (keyIsDown(65)) { //A
    console.log(`Key ${keyCode.key} pressed.`)
    player.x -= player.speed
  } 
  if (keyIsDown(68)) {//D
    console.log(`Key ${keyCode.key} pressed.`)
    player.x += player.speed
  }  
  if (keyIsDown(87)) { //W
    console.log(`Key ${keyCode.key} pressed.`)
    player.y -= player.speed
  }  
  if (keyIsDown(83)) {//S
    console.log(`Key ${keyCode.key} pressed.`)
    player.y += player.speed
  } 

}

function keyPressed(keyCode) {
  if (keyCode.keyCode == 65 && keyIsDown(keyCode.keyCode)) { //A
    console.log(`Key ${keyCode.key} pressed.`)
    player.x -= player.speed
  } else if (keyCode.keyCode == 68) {//D
    console.log(`Key ${keyCode.key} pressed.`)
    player.x += player.speed
  } else if (keyCode.keyCode == 87) { //W
    console.log(`Key ${keyCode.key} pressed.`)
    player.y -= player.speed
  } else if (keyCode.keyCode == 83) {//S
    console.log(`Key ${keyCode.key} pressed.`)
    player.y += player.speed
  }
}