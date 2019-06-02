class Player { // Fists
    constructor(x,y, name, cass,direction="left") {
        this.name = name
        this.health = 100
        this.shield = 0
        this.speed = 5 // divide by 4th
        this.level = 0
        this.xp = 0
        this.points = 0
        this.strength = 5
        this.x = x
        this.y = y
        this.cass = cass
        this.offsetx = 0;
        this.offsety = 0;
        this.direction = direction
    }
    draw() {
        //ellipse(this.x, this.y, 30)
        
        imageMode(CENTER);
        
        if (this.cass == "fists" && this.direction == "up") {
            image(fistB, this.x+this.offsetx, this.y+this.offsety)
        }
        else if(this.cass == "fists" && this.direction == "down") {
            image(fistF, this.x+this.offsetx, this.y+this.offsety)
        }
        else if(this.cass == "fists" && this.direction == "left") {
            image(fistL, this.x+this.offsetx, this.y+this.offsety)
        } 
        else if (this.cass == "fists" && this.direction == "right") {
            image(fistR, this.x+this.offsetx, this.y+this.offsety)
        }
        else {
            print(this)
            ellipse(this.x+this.offsetx, this.y+this.offsety, 30)
        }
        push()
        fill(0);
        text(this.health+"%", this.x+this.offsetx-30, this.y+this.offsety-30)
        pop()

    }
}

class Engineer extends Player {
    constructor(x,y){
        super()
        this.shield = 25
        this.speed = 4.75
        this.level = 1
        this.strength = 8
    }
}

class Blade extends Player {
    constructor(x,y){
        super()
        this.shield = 50
        this.speed = 4.75
        this.level = 1
        this.strength = 10
    }
}

class Mage extends Player {
    constructor(x,y) {
        super()
        this.shield = 15
        this.speed = 4.75
        this.level = 1
        this.strength = 10
    }
}

class Bow extends Player {
    constructor(x,y) {
        super()
        this.shield = 15
        this.speed = 4.75
        this.level = 2
        this.strength = 10
    }
}

class Weapon {
    constructor() {
        this.x = x
        this.y = y
        this.rotation = -180
    }
    draw() {
        if (player.cass == "fists") {
            image(fistH, player.x+30, player.y)
        }
        else {
            print(player)
            ellipse(player.x, player.y, 30)
        }

    }
    rot(num) {
        rotate(num)
    }
}