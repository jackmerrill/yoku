class Player { // Fists
    constructor(x,y, name="", cass="fist",direction="left") {
        
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
        print(this.cass)
        images[this.cass]["B"].resize(100,100)
        images[this.cass]["F"].resize(100,100)
        images[this.cass]["L"].resize(100,100)
        images[this.cass]["R"].resize(100,100)
    }
    resize() {
        images[this.cass]["B"].resize(100,100)
        images[this.cass]["F"].resize(100,100)
        images[this.cass]["L"].resize(100,100)
        images[this.cass]["R"].resize(100,100)
    }
    draw() {
        //ellipse(this.x, this.y, 30)
        
        imageMode(CENTER);
        
        if (this.direction == "up") {
            
            image(images[this.cass]["B"], this.x+this.offsetx, this.y+this.offsety)
        }
        else if(this.direction == "down") {
            
            image(images[this.cass]["F"], this.x+this.offsetx, this.y+this.offsety)
        }
        else if(this.direction == "left") {
            
            image(images[this.cass]["L"], this.x+this.offsetx, this.y+this.offsety)
        } 
        else if (this.direction == "right") {
            
            image(images[this.cass]["R"], this.x+this.offsetx, this.y+this.offsety)
        }
        else {
            print(this)
            ellipse(this.x+this.offsetx, this.y+this.offsety, 30)
        }
        push()
        fill(0);
        textAlign(CENTER);
        text(this.health+"%", this.x+this.offsetx, this.y+this.offsety-30)
        text(this.name, this.x+this.offsetx, this.y+this.offsety+60)
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
        image(fistH, player.x+30, player.y)

    }
    rot(num) {
        rotate(num)
    }
}