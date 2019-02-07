var allEnemies = [];

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    this.checkCollision();
};

// checks en enemy's collision with player
Enemy.prototype.checkCollision = function () {
    if (player.y + 131 >= this.y + 90 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 25 <= this.x + 88 &&
        player.x + 76 >= this.x + 11) {
        console.log('collision');
        gameReset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function () { }

/*
 * handles input for the player
 */
Player.prototype.handleInput = function (key) {
    if (key == 'left') {
        this.x = (this.x - this.speed + 505) % 505;
    } else if (key == 'right') {
        this.x = (this.x + this.speed) % 505;
    } else if (key == 'up') {
        this.y = (this.y - this.speed + 606) % 606;
        // going to water
        if (this.y <= (83 - 48)) { 
            document.getElementsByClassName('modal')[0].style.display = 'block';
            return;
        }
    } else {
        this.y = (this.y + this.speed) % 606;
        if (this.y > 400) {
            this.y = 400;
        }
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
    if (this.x > 458) {
        this.x = 458;
    }
};

/*
 * resets the player to default position
 */
Player.prototype.reset = function () {
    this.x = 202.5;
    this.y = 383;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(0, 0, 50);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * This is to handle click on close button in modal
 */
document.getElementsByClassName('modal-close')[0].addEventListener('click',
    function () {
        document.getElementsByClassName('modal')[0].style.display = 'none';
        gameReset();
    });

/*
 * resets the game in case of collision
 */
function gameReset() {
    player.reset();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 80)
    );
}

gameReset(); 