class Player { // Fists
    constructor(x,y) {
        this.health = 100
        this.shield = 0
        this.speed = 5 // divide by 4th
        this.level = 0
        this.xp = 0
        this.points = 0
        this.strength = 5
        this.x = x
        this.y = y
        this.class = "fists"
    }
    draw(cls, direction) {
        if (cls == "fists" && direction == "down") {
            image(fistB, Player.x, Player.y)
            image(fistH, Player.x-5, Player.y)
        }
        if (cls == "fists" && direction == "up") {
            image(fistF, Player.x, Player.y)
        }
        if (cls == "fists" && direction == "left") {
            image(fistL, Player.x, Player.y)
        }
        if (cls == "fists" && direction == "right") {
            image(fistR, Player.x, Player.y)
        }
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