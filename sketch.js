function preload(){
  // put preload code here
}

function setup() {
  createCanvas(800, 800)
}

function draw() {
  background(0);
  
}

function keyPressed(keyCode) {
  if (keyCode.keyCode == 65) { //A
    console.log(`Key ${keyCode.key} pressed.`)
    value = 255;
  } else if (keyCode.keyCode == 68) {//D
    console.log(`Key ${keyCode.key} pressed.`)
    value = -255;
  } else if (keyCode.keyCode == 87) { //W
    console.log(`Key ${keyCode.key} pressed.`)
    value = 255;
  } else if (keyCode.keyCode == 83) {//S
    console.log(`Key ${keyCode.key} pressed.`)
    value = 255;
  }
}