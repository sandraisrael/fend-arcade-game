// Enemies our player must avoid
var Enemy = function(x, y, speed = 1) {
    // Variables applied to each of our instances go here,

    this.x = x;
    this.y = y;
    this.location = ( x, y);
    this.speed = speed;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// To Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += 50 * this.speed * dt;
    
    // parseInt(this.x)+ 100 == playerX && this.y === playerY

    // collison detection
    if (parseInt(this.x)+ 100 >= playerX && parseInt(this.x) <= playerX + 40 && this.y === playerY){
        console.log("a collision just occurs your player diessss");
        console.log("collision" ,this.x, playerX, playerY, this.y);
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
var Player = function (x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
var playerX
var playerY

Player.prototype.update = function(){
    // You should multiply any movement by the dt parameter
    playerX = this.x;
    playerY = this.y;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// a handleInput() method
Player.prototype.handleInput = function(pressedKeys){
    if (pressedKeys === 'left' && this.x > 33){
        this.x -= 100; 
        console.log(this.x);
    }
    else if (pressedKeys === 'up'&& this.y > 18){
        this.y -= 80;
        if (this.y < 60){
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
    setTimeout(() =>{
        console.log("reset player");
        this.x = 200;
        this.y = 380;
    }, 200);
}

// possible X-axis positions on board
var columns = [ -5, -100, -200, -300, -400];
var enemyX;

// possible Y-axis positions on board
var rows = [ 60, 140, 220];
var enemyY;

var enemySpeed;
// var possibleSpeed = []

setInterval(function instances(){
    // enemyX = columns[Math.floor(Math.random() * 5)],
    enemyX = columns[Math.floor(Math.random() * 5)],
    enemyY = rows[Math.floor(Math.random() * 3)],
    // enemySpeed = Math.floor(Math.random() * 10),
    enemySpeed = 1,
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed)); 
},2500)



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(0, 60, 1), new Enemy(0, 140, 1)];

// , new Enemy(0, 145, 25), new Enemy(0, 230, 17), new Enemy(0,310, 17)

// Place the player object in a variable called player
// var player = new Player( -17, -13);
var player = new Player( 200, 380);



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
