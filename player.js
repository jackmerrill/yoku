class Player { // Fists
    constructor(x,y, name) {
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
        this.class = "fists"
    }
    draw(direction) {
        ellipse(this.x, this.y, 30)
        if (this.class == "fists" && direction == "down") {
            image(fistB, this.x, this.y)
        }
        if (this.class == "fists" && direction == "up") {
            image(fistF, this.x, this.y)
        }
        if (this.class == "fists" && direction == "left") {
            image(fistL, this.x, this.y)
        }
        if (this.class == "fists" && direction == "right") {
            image(fistR, this.x, this.y)
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