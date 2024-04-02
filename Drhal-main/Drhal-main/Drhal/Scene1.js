class Scene1 extends Phaser.Scene {
    constructor() {
      super("Scene1");
    }

    preload() {
        this.load.image("sprt", "img/sprt.png");
    }

    create() {

        //stage and score display
        stageT = this.add.text(20, 40, 'Stage', { fontSize: '24px', fill: '#ffffff' }).setDepth(1);
        scoreT = this.add.text(20, 70, 'Score', { fontSize: '24px', fill: '#ffffff' }).setDepth(1);
        playerHP = this.add.text(800, 60, 'HP', { fontSize: '24px', fill: '#ffffff' }).setDepth(1);
        this.input.on('pointerdown', function (pointer) {
          if (pointer.leftButtonDown()) {
              // Create a projectile at the mouse pointer position
              this.createProjectile(player.x, player.y);
          }
        }, this);

        //create player movment keys
        keys = this.input.keyboard.addKeys("W,A,S,D");

        //create player add atributes
        player = this.physics.add.sprite(playerSettings.playerX, playerSettings.playerY, "temp"/*"sprt"*/); 
        player.displayWidth = 50;
        player.displayHeight = 50;  

        player.setCollideWorldBounds(true);

        //create dummy sprite
        this.sprts = this.physics.add.group(); 
        
        for(let i = 0; i < numSprt; i++){
          //create dummy sprite
          sprt = this.physics.add.sprite(200, 200, "kek");

          //set random poz
          sprt.setRandomPosition(0, 0, game.width, game.height);

          //add to group
          this.sprts.add(sprt);

          //on overlap do this
          this.physics.add.overlap(projectile, sprt, this.projectileSpriteCollision, null, this);
          this.physics.add.overlap(player, sprt, this.playerSpriteCollision, null, this);

          //collide world bounds
          sprt.setCollideWorldBounds(true);
      }

    }

    createProjectile(x, y) {
      // Create a projectile sprite at the specified position
      projectile = this.physics.add.sprite(x, y, 'projectile');
      projectile.displayHeight = 20;
      projectile.displayWidth = 20;
      
      //send projectile to mouse click
      let angle = Phaser.Math.Angle.Between(player.x, player.y, this.input.x, this.input.y);
      this.physics.moveTo(projectile, this.input.x, this.input.y, 500);

    } 

    projectileSpriteCollision(projectile, sprt) {
        // Destroy the sprite and projectile upon collision with the projectile
        projectile.destroy();
        sprt.destroy();

        //incrament score
        score++;
        actScore += 100;
    }

    playerSpriteCollision(player, sprt){
      if (!playerSettings.isInv && playerSettings.playerHP > 0) {
        playerSettings.playerHP--;
        playerSettings.isInv = true;
        playerSettings.invTimer = this.time.now + playerSettings.invDuration;
      }
    }

    update() {

      console.log(playerSettings.playerHP);
      if (playerSettings.isInv && this.time.now > playerSettings.invTimer) {
        playerSettings.isInv = false;
      }

      //text for score and stage
      stageT.setText("Stage: " + numSprt);
      scoreT.setText("Score: " + actScore);
      playerHP.setText("HP: " + playerSettings.playerHP);

        if(score >= numSprt){
          numSprt++;
            for(let i = 0; i < numSprt; i++){
                //create dummy sprite
                sprt = this.physics.add.sprite(0, 0, "kek");
    
                //set random poz
                // switch(i){
                //   case 1:
                //     sprt.setRandomPosition(0, 0, 0, game.height);
                //   break;

                //   case 2:
                //     sprt.setRandomPosition(0, 0, game.width, 0);
                //   break;

                //   case 3:
                //     sprt.setRandomPosition(0, 0, game.width, game.height);
                //   break;
                //   }
                //set random position of sprite
                sprt.setRandomPosition(0, 0, game.width, game.height);
    
                //add to group
                this.sprts.add(sprt);
    
                //on overlap do this
                this.physics.add.overlap(projectile, sprt, this.projectileSpriteCollision, null, this);
                this.physics.add.overlap(player, sprt, this.playerSpriteCollision, null, this);
    
                //collide world bounds
                sprt.setCollideWorldBounds(true);
            }
            score = 0;
            
        }

        //Stop when no Player input
        player.setVelocity(0);

        this.sprts.children.iterate(function (sprt) {
          this.physics.moveTo(sprt, player.x, player.y, 50);
          this.physics.add.overlap(projectile, sprt, this.projectileSpriteCollision, null, this);
          sprt.setCollideWorldBounds(true);
      }, this);
        
        //Player movment
        if (keys.A.isDown) {
          player.setVelocityX(-300);
        }
        if (keys.W.isDown) {
          player.setVelocityY(-300);
        }
        if (keys.S.isDown) {
          player.setVelocity(300);
        }
        if (keys.D.isDown) {
          player.setVelocity(300);
        }

        //Move sprt to player
        this.sprts.children.iterate(function (sprt) {
            this.physics.moveTo(sprt, player.x, player.y, 50);
        }, this);

        this.sprts.children.iterate(function (sprt) {
          this.physics.moveTo(sprt, player.x, player.y, 50);
        }, this);
    

         
         
    }
}