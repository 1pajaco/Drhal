var config = {
    width: 700,
    height: 700,
    backgroundColor: 0x000000,
    scene: [Scene1],
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  }
 
  var playerx = config.width/2;
  var playery = config.height/2;
  var player;
  var stageT;
  var scoreT;
  var keys;
  var sprt;
  var projectile = false;
  var numSprt = 1;
  var score = 0;
  var actScore = 0;
  
  var game = new Phaser.Game(config);

  



  

