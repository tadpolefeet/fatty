// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var player;
var count = 3;
var pipes = [];
var score = -4;
var labelScore = "";
var highScore = "";
var label = "<---Highscore!";
var labelHScore = "";
var label2 = "";

var gapSize = 85;
var gapMargin = 50;
var blockHeight = 50;
var height = game.height;
var width = game.width;

var pipeEndExtraWidth = 5;
var pipeEndHeight = 25;

var y = "";


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("pipeBlock","../assets/pipe2-body.png");
game.load.image("playerImg", "../assets/jamesBond.gif");
game.load.image("flappy", "../assets/flappy.png");
game.load.audio("flap", "../assets/sfx_wing.wav");
game.load.audio("point", "../assets/point.ogg");
game.load.image("background", "../assets/background3.png");
game.load.image("player2", "../assets/flappyblue.png");

game.load.image("pipeEnd", "../assets/pipe2-end.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

for(count = 0; count < 3; count++)
{
  var backimage = game.add.sprite(288*count, 0, "background" );
  backimage.height = 400;
}


game.physics.startSystem(Phaser.Physics.ARCADE);

labelScore = game.add.text(20, 60, "0",
{font: "30px Arial", fill: "#FFFFFF"});

labelHScore = game.add.text(20, 100, highScore,
{font: "30px Arial", fill: "#FFFFFF"});

label = game.add.text(60, 100, "High Score this time!");

label2 = game.add.text(20, 20, "Space to play!");

player = game.add.sprite(150, 200, "flappy");
player2 = game.add.sprite(100, 200, "player2");


game.physics.arcade.enable(player);
player.anchor.setTo(0.5, 0.5);
player.body.gravity.y = 300;

game.physics.arcade.enable(player2);
player2.anchor.setTo(0.5, 0.5);
player2.body.gravity.y = 300;


var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
      pipeInterval,
      generatePipe
  );

game.input.keyboard
.addKey(Phaser.Keyboard.SPACEBAR)
.onDown
.add(playerJump);


game.input.keyboard
.addKey(Phaser.Keyboard.UP)
.onDown
.add(player2Jump);





}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

player.rotation = Math.atan(player.body.velocity.y / 300);
player2.rotation = Math.atan(player2.body.velocity.y / 300);

  game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);

  game.physics.arcade.overlap(
  player2,
  pipes,
  gameOver);


if((player.y) > 400) {gameOver();}
if(player.y < 0) {gameOver();}

if(player2.y > 400) {gameOver();}
else if(player.y < 0) {gameOver();}


}

function generatePipe() {

 var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

addPipeEnd(width-2.25, gapStart-25);

    for(y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
      addPipeBlock(width, y - blockHeight);
    }

    addPipeEnd(width-2.25, gapStart + gapSize + 13);

      for(y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
      }
      changeScore();
}

function addPipeBlock(x, y) {
    var block = game.add.sprite(x,y,"pipeBlock");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;

  }


  function addPipeEnd(x, y) {
   var block = game.add.sprite(x, y, "pipeEnd");
   pipes.push(block);
 game.physics.arcade.enable(block);
  block.body.velocity.x = -200;
 }




function playerJump() {

player.body.velocity.y = -170 ;
game.sound.play("flap");

}

function player2Jump() {

player2.body.velocity.y = -170 ;
game.sound.play("flap");

}

function changeScore() {

score = score + 2;
if(score > 0) {labelScore.setText(score.toString());}
if(score > 0) {game.sound.play("point");}
if(score > highScore) {highScore = score;}
labelHScore.setText(highScore);

}

function gameOver() {

score = -4;

game.state.restart();

highscorechange();

}


function highscorechange() {
  jQuery("#hscore").on("click", function() {

  jQuery("#hscore").empty();
  var message = highScore;
  jQuery("#hscore").append("<p>" + message +  "</p>");

  });
}
