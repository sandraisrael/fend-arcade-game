let score = document.querySelector(".score")
let points = 0;

var Lives = function(x, y){
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};

Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}


// Enemies class 
var Enemy = function(x, y, speed = 1) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.location = ( x, y);
    this.speed = speed;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// To Update the enemy's position, required method for game-Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += 50 * this.speed * dt;
    
    // collison detection
    if (parseInt(this.x)+ 100 >= playerX && parseInt(this.x) <= playerX + 40 && this.y === playerY){
        console.log("a collision just occured your player diessss");  
        player.reset();
        alllives.pop()
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// player class
var Player = function (x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-pink-girl.png';
};

var playerX
var playerY

Player.prototype.update = function(){
    playerX = this.x;
    playerY = this.y;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// method to handleInput() 
Player.prototype.handleInput = function(pressedKeys){
    if (pressedKeys === 'left' && this.x > 33){
        this.x -= 100; 
        console.log(this.x);
    }
    else if (pressedKeys === 'up'&& this.y > 18){
        this.y -= 80;
        if (this.y < 60){
            points += 100;
            score.innerHTML = points;
            setTimeout(this.reset(), 2500);
        }
    }
    else if (pressedKeys === 'right' && this.x < 400){
        this.x += 100
    }
    else if (pressedKeys === 'down' && this.y < 380){
        this.y += 80
    }
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}

// possible X-axis positions on board
var columns = [ -5, -100, -200, -300, -400];
var enemyX;

// possible Y-axis positions on board
var rows = [ 60, 140, 220];
var enemyY;

var enemySpeed;

setInterval(function instances(){
    // enemyX = columns[Math.floor(Math.random() * 5)],
    enemyX = columns[Math.floor(Math.random() * 5)],
    enemyY = rows[Math.floor(Math.random() * 3)],
    // enemySpeed = Math.floor(Math.random() * 10),
    enemySpeed = 1,
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed)); 
},2500)



// Now instantiate your objects.
// allEnemies- array of all enemy objects 
var allEnemies = [ new Enemy(-8, 60, 1), new Enemy(0, 140, 1)];

// Place the player object in a variable called player
var player = new Player( 200, 380);

var alllives = [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540)];

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
