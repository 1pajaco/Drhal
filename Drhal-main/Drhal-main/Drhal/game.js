var config = {
    width: 1000,
    height: 900,
    backgroundColor: 0x000000,
    scene: [Scene1],
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  }
 
  let player;

  let playerSettings = {
    playerY: config.height/2,
    playerX: config.width/2,
    playerHP: 5,
    isInv: false,
    invDuration: 1301, 
    invTimer: 0
  };

  let angle;
  let stageT;
  let scoreT;
  let playerHP;
  let keys;
  let sprt;
  let projectile = false;
  let numSprt = 1;
  let score = 0;
  let actScore = 0;
  
  var game = new Phaser.Game(config);

  



  

