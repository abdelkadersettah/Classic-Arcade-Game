// Enemies our player must avoid
var Enemy = function(x = 0, y) {
  // Variables applied to each of our instances go here,
  this.x = x;
  this.y = y;
  this.width = 74;
  this.height = 75;
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
let yPlace = [230, 145, 65, 65];
let allEnemies = yPlace.map((y, index) => {
  return new Enemy(-200 * index + 1, y);
});

Enemy.prototype.update = function(dt) {
  let arrayOfThisY = [];
  // //random Number
  // let randomNumber = level => Math.random() * level + 1;
  // let random = randomNumber(player.level) + dt;
  this.x += player.level + dt;
  if (this.x >= 610) {
    arrayOfThisY.push(this.y);
    arrayOfThisY = arrayOfThisY.filter((v, i, a) => a.indexOf(v) === i);
    this.y = arrayOfThisY[Math.floor(Math.random() * arrayOfThisY.length)];
    this.x = -this.y;
  }
};

function checkCollisions() {
  allEnemies.forEach(enemy => {
    if (
      player.x < enemy.width + enemy.x &&
      player.x + enemy.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      player.x = 210;
      player.y = 400;
    }
  });
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 75;
  this.height = 65;
  this.level = 1;
  this.speed = 15;
  this.score = 0;
  this.selector = "images/Selector.png";
  this.sprite = "images/char-boy.png";
};
//initiate method reset game
Player.prototype.initiate = function() {
  const reset = document.querySelector("button");
  reset.addEventListener("click", () => {
    location.reload();
  });
};
Player.prototype.gameMenu = function() {
  const score = document.querySelector(".score");
  const level = document.querySelector("li.level");
  score.innerHTML = `Score: ${this.score}`;
  level.textContent = `Level: ${player.level}`;
};

// this method change the player image
Player.prototype.selectPlayer = function() {
  let playerName, playerIndex;
  //player list
  const playerList = [
    "char-boy",
    "char-cat-girl",
    "char-horn-girl",
    "char-pink-girl",
    "char-princess-girl"
  ];
  if (this.y - this.x < 10 && this.y > 350) {
    //get player name from this.sprit property
    playerName = this.sprite.split("/")[1].split(".")[0];
    playerIndex = playerList.indexOf(playerName);
    //change player by adding 1 to playerIndex
    if (playerIndex == playerList.length - 1) {
      this.sprite = `images/char-boy.png`;
      this.x = 210;
      this.render();
    } else {
      this.sprite = `images/${playerList[playerIndex + 1]}.png`;
      this.x = 210;
      this.render();
    }
  }
};
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
  this.initiate();

  this.selectPlayer();
  this.gameMenu();

  //this.addScoreAndLife();
  if (this.y < 10) {
    this.x = 210;
    this.y = 400;
    this.level++;
    this.score += 100;
    this.speed += 5;
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.drawImage(Resources.get(this.selector), 410, 380);
  // this.addScoreAndLife();
};

// a handleInput() method.

Player.prototype.handleInput = function(input) {
  let canvas = document.querySelector("canvas");

  if (this.x + this.width < canvas.width && input == "right") {
    this.x += this.speed;
  } else if (input == "left" && this.x > -10) {
    this.x -= this.speed;
  } else if (input == "up" && this.y > -10) {
    this.y -= this.speed;
  } else if (input == "down" && this.y <= 400) {
    this.y += this.speed;
  }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
var player = new Player(210, 400);
