module objects {
    export class Player extends objects.GameObject
     {
        //PRIVATE INSTANCE VARIBALES 
        private assetManager: createjs.LoadQueue;
        private keyBoardKey = new managers.keyBoardInput();
        private bullet: objects.Bullet;
        bulletSpawn:createjs.Point;
       
        //PUBLIC PROPERTIES
        public getPlayerX() : number
        {
            return this.x;
        }
        public getPlayerY(): number
        {
            return this.y;
        }
        public getPayerRotation():number
        {
            return this.playerRotation;
        }
        //CONSTRUCTORS
        constructor() 
        {
            super("player");
            this.Start();
        }

        //PUBLIC METHODS             
        public Start()                                      // Start method runs when object is instantiated
        {
            this.regXY();
            this.y = 400;
            this.x = 400;
            this.playerHealth = 100;
            this.keyBoardKey = new managers.keyBoardInput();
            this.bulletSpawn = new createjs.Point(this.y+50, this.x);
        }
        public Update()                                     // Update method runs 60fps
        {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y;
            this.checkBounds();
            this.playerMovement();
        }
        public Reset()
        {}
        
        //PRIVATE METHODS
        private regXY(): void                               //Method to set bitmap registry point at the center
        {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width /2;
            this.halfHeight = this.height /2;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }
        private checkBounds() 
        {
            if(this.x >= config.Screen.WIDTH - this.halfWidth) {
              this.x = config.Screen.WIDTH - this.halfWidth;
            }
            if(this.x <= this.halfWidth) {
              this.x = this.halfWidth;
            }
      
            if(this.y >= config.Screen.HEIGHT - this.halfHeight) {
              this.y = config.Screen.HEIGHT - this.halfHeight;
            }
      
            if(this.y <= this.halfHeight) {
              this.y = this.halfHeight;
            }
        }
        private playerMovement()                            // Move player object
        {  
            var getKey = this.keyBoardKey.getkeyInput(); 

            if (getKey !=null && getKey == config.Key.LEFT_ARROW ||  getKey == config.Key.A)              // Left
            {
                this.x -= this.playerSpeed;
            }   
            else if (getKey !=null && getKey == config.Key.UP_ARROW ||  getKey == config.Key.W)         // Up
            {
                this.y -= this.playerSpeed;
            } 
            else if (getKey !=null && getKey == config.Key.RIGHT_ARROW||  getKey == config.Key.D)         // Right
            {
                this.x += this.playerSpeed;
            } 
            else if (getKey !=null && getKey == config.Key.DOWN_ARROW || getKey == config.Key.S)         // Down
            {
                this.y += this.playerSpeed;
            }        
            this.setPlayerRotation(); 
        }
        private setPlayerRotation()                         // Method finds angle between Player and Mouse pointer, sets angle to player rotation
        {
            var xAngle = this.stage.mouseX- this.x;
            var yAngle = this.stage.mouseY- this.y;
            this.playerRotation = Math.atan2(yAngle,xAngle) * (180/ Math.PI);    
            this.rotation = this.playerRotation;
            //console.log("Player Rotation: " +this.playerRotation);
        }

    }
}