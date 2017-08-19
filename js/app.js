// Enemies our player must avoid
var Enemy = function(x,y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.getSpeed();
};

//Setting the enemy speed
Enemy.prototype.getSpeed = function() {
    return Math.floor(Math.random()* (280) + 220);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 510) {
        this.x = (this.speed * dt) + this.x;
    } else {
        this.x = -100;
        this.speed = this.getSpeed();
    }
    
    //When the player hits the enemy
    if (this.x - player.x < 30 && this.x - player.x > -30 &&
        this.y - player.y < 55 && this.y - player.y > -55) {
        alert("Game Over");
        player.score = 0;
        document.getElementById("score").innerHTML = player.score;
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x,y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    this.score = 0;
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

//Handling the inputs
Player.prototype.handleInput = function(key) {

    if (key == 'left') {
        if (this.x > 20) {
            this.x -= 100;
        }
    } else if (key == 'right') {
        if (this.x < 400) {
            this.x += 100;
        }
    } else if (key == 'up') {
        if (this.y > 0) {
            this.y -= 90;
        }
        if (this.y <= 0) {
            this.reset();
            this.score++;
            document.getElementById("score").innerHTML = this.score;
        }
        if(this.score===10) {
            alert("CONGRATULATIONS! You Win");
            this.score = 0;
            document.getElementById("score").innerHTML = this.score;
        }
    } else if (key == 'down') {
        if (this.y < 400) {
            this.y += 90;
        }
    }
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0, 40),
    new Enemy(0, 130),
    new Enemy(0, 220)
];

// Place the player object in a variable called player
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});