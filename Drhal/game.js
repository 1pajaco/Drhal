var config = {
    width: 500,
    height: 500,
    backgroundColor: 0x000000,
    scene: [Scene1],
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  }
 
  var playerx = config.width/2;;
  var playery = config.height/2;
  var player;
  var text;
  var keys;
  
  var game = new Phaser.Game(config);

  



  

