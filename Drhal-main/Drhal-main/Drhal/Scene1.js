class Scene1 extends Phaser.Scene {
    constructor() {
      super("Scene1");
    }

    preload() {
        this.load.image("sprt", "img/sprt.png");
    }

    create() {

        this.input.on('pointerdown', function (pointer) {
          if (pointer.leftButtonDown()) {
              // Create a projectile at the mouse pointer position
              this.createProjectile(player.x, player.y);
          }
        }, this);


        //stage and score display
        stageT = this.add.text(20, 40, 'Test');
        scoreT = this.add.text(20, 60, 'Test');

        //create player movment keys
        keys = this.input.keyboard.addKeys("W,A,S,D");

        //create player add atributes
        player = this.physics.add.sprite(playerx, playery, "sprt"); 
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
          this.physics.add.overlap(projectile, sprt, this.handleCollision, null, this);

          //collide world bounds
          sprt.setCollideWorldBounds(true);
      }

    }

    createProjectile(x, y) {
      // Create a projectile sprite at the specified position
      projectile = this.physics.add.sprite(x, y, 'projectile');
      let angle = Phaser.Math.Angle.Between(player.x, player.y, this.input.x, this.input.y);
      this.physics.moveTo(projectile, this.input.x, this.input.y, 500);
    }

    handleCollision(projectile, sprt) {
        // Destroy the sprite upon collision with the player
        sprt.destroy();
        score++;
        actScore += 100;
    }

    update() {

      stageT.setText("Stage " + numSprt);
      scoreT.setText("Score " + actScore);

        if(score >= numSprt){
          numSprt++;
            for(let i = 0; i < numSprt; i++){
                //create dummy sprite
                sprt = this.physics.add.sprite(200, 200, "kek");
    
                //set random poz
                sprt.setRandomPosition(0, 0, game.width, game.height);
    
                //add to group
                this.sprts.add(sprt);
    
                //on overlap do this
                this.physics.add.overlap(projectile, sprt, this.handleCollision, null, this);
    
                //collide world bounds
                sprt.setCollideWorldBounds(true);
            }
            score = 0;
            
        }

        //Stop when no Player input
        player.setVelocity(0);

        this.sprts.children.iterate(function (sprt) {
          this.physics.moveTo(sprt, player.x, player.y, 50);
          this.physics.add.overlap(projectile, sprt, this.handleCollision, null, this);
          sprt.setCollideWorldBounds(true);
      }, this);
        
        //Player movment
        if(keys.A.isDown && keys.W.isDown){
            player.setVelocityX(-300);
            player.setVelocityY(-300);
          } else if(keys.A.isDown && keys.S.isDown){
            player.setVelocityX(-300);
            player.setVelocityY(300);
          } else if(keys.D.isDown && keys.W.isDown){
            player.setVelocityX(300);
            player.setVelocityY(-300);
          } else if(keys.D.isDown && keys.S.isDown){
            player.setVelocityX(300);
            player.setVelocityY(300);
          }

        if (keys.A.isDown) {
            player.setVelocityX(-300);
          } else if (keys.D.isDown) {
            player.setVelocityX(300);
          } else if (keys.W.isDown) {
            player.setVelocityY(-300);
          } else if (keys.S.isDown) {
            player.setVelocityY(300);
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