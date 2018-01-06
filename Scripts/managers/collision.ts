module managers 
{
    export class Collision 
    {
        private object1: objects.GameObject;
        private object2: objects.GameObject;
        private keyBoardKey = new managers.keyBoardInput();
        public killCount:number=0;
         

        //PRIVATE METHODS
        private verticalWallCollision() {
            //Left
            if (this.object1.y <= this.object2.y + this.object2.height
                && this.object1.y >= this.object2.y
                && this.object1.x >= this.object2.x - this.object1.halfWidth
                && this.object1.x <= this.object2.x - this.object2.width) {
                this.object1.x = this.object2.x - this.object1.halfWidth;
            }
            //Right
            if (this.object1.y <= this.object2.y + this.object2.height
                && this.object1.y >= this.object2.y
                && this.object1.x <= this.object2.x + this.object2.width + this.object1.halfWidth
                && this.object1.x >= this.object2.x + this.object2.width) {
                this.object1.x = this.object2.x + this.object2.width + this.object1.halfWidth;
            }
            //Top
            if (this.object1.y >= this.object2.y + this.object1.halfWidth
                && this.object1.y <= this.object2.y
                && this.object1.x <= this.object2.x + this.object2.width
                && this.object1.x >= this.object2.x) {
                this.object1.y = this.object2.y - this.object1.halfWidth;
            }
            //Bottom
            if (this.object1.y >= this.object2.y
                && this.object1.y <= this.object2.y + this.object2.height + this.object1.halfWidth
                && this.object1.x <= this.object2.x + this.object2.width
                && this.object1.x >= this.object2.x) {
                this.object1.y = this.object2.y + this.object2.height + this.object1.halfWidth;
            }
        }
        private horizontalWallCollision() {
            if (this.object1.x >= this.object2.x
                && this.object1.x <= this.object2.x + this.object2.width
                && this.object1.y >= this.object2.y + this.object2.height - this.object1.halfWidth
                && this.object1.y <= this.object2.y + this.object2.height) {
                this.object1.y = this.object2.y + this.object2.height - this.object1.halfWidth;
            }
            if (this.object1.x >= this.object2.x
                && this.object1.x <= this.object2.x + this.object2.width
                && this.object1.y >= this.object2.y + this.object2.height
                && this.object1.y <= this.object2.y + this.object2.height + this.object1.halfWidth) {
                this.object1.y = this.object2.y + this.object2.height + this.object1.halfWidth;
            }
        }

        //PUBLIC METHODS
        //Check distance between player and zombie
        public objectToObject2Dist(startPoint: createjs.Point, endPoint: createjs.Point): number {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2))
        }

        //Check if thrs collision
        public checkCollision(object1: objects.GameObject, object2: objects.GameObject)
        {
            this.object1 = object1;
            this.object2 = object2;

            var startPoint: createjs.Point = new createjs.Point();
            var endPoint: createjs.Point = new createjs.Point();
            var objectHalfHeight: number = object1.height * 0.5;
            var object2HalfHeight: number = object2.height * 0.5;
            var objectHalfWidth: number = object1.width;
            var object2HalfWidth: number = object2.width;

            var minimumDistance: number = objectHalfHeight + object2HalfHeight;
            var minimumDistance2: number = objectHalfWidth + object2HalfWidth;

            startPoint.x = object1.regX + object1.x;
            startPoint.y = object1.regY + object1.y;
            endPoint.x = object2.regX + object2.x;
            endPoint.y = object2.regY + object2.y;

            //Check if object is bullet and if gun fire is true
            if (object2.name == "bullet" && object2.bulletCollided) {
                //Check if distance between zombie and bullet is less than the height of bullet + half height of zombie
                if (this.objectToObject2Dist(startPoint, endPoint) <= minimumDistance2)
                {
                    //Decrease zombie health
                    object1.zombieHealth--;
                    object2.Reset();
                    //console.log(object1.zombieHealth);

                    //Check if zombie health is 0, then reset the object
                    if (object1.zombieHealth <= 0) {
                        object1.Reset();
                        this.killCount++;
                        //this.parent.removeChild(this);
                    }
                    //Reset gun fire to false
                    object2.bulletCollided = false;
                }
            }

            //Check if object is zombie
            if (object1.name=="player" && object2.name == "zombie") {
                //Check if the distance between object 1 and object 2 is less than the minimum distance  
                if (this.objectToObject2Dist(startPoint, endPoint) < minimumDistance) {
                    //Check if objects are currently colliding, default = false
                    if (!object1.isColliding) {
                        //Decrease player health
                        object1.playerHealth -= 0.5;
                        //Check if player health is 0, then remove child and change scene
                        if (object1.playerHealth <= 0) {
                            object1.playerHealth = 0;           // Reset back to 0 to remove possible errors
                            object1.isAlive = false;
                            object1.parent.removeChild(object1);
                        }
                        object1.isColliding = true;
                    }
                    else {
                        //console.log("Not Colliding");
                        object1.isColliding = false;
                    }
                }
            }

            //Check if object is window and player
            if (object1.name=="player" && object2.name == "windowLeft") 
            {
                var getKey = this.keyBoardKey.getkeyInput();
                //Check if the distance between object 1 and object 2 is less than the minimum distance  
                if (this.objectToObject2Dist(startPoint, endPoint) < minimumDistance) 
                {
                    object2.buildWindow =true;
                    //Check if objects are currently colliding, default = false
                    if (!object1.isColliding && object2.isBroken) 
                    {                       
<<<<<<< HEAD
                        if  ( getKey == config.Key.R || getKey == config.Key.NUM_PAD_0 && object2.windowLeftHealth <1000 )
=======
                        if  (( getKey == config.Key.R || getKey == config.Key.NUM_PAD_0) && object2.windowLeftHealth <1000)
>>>>>>> 1fb7edc1adcebe3020438802338078c585098339
                        {
                            object2.windowLeftHealth +=50;
                            if (object2.windowLeftHealth >= 1000)
                            {
                                object2.visible= true;
                                object2.isBroken = false;
                            }
                        }
                        object1.isColliding = true;
                    }
                    else {
                        //console.log("Not Colliding");0
                        object1.isColliding = false;
                       
                    }
                }
                else{ object2.buildWindow =false;}
            }

             //Check if object is window and player
             if (object1.name=="player" && object2.name == "windowRight") 
             {
                 var getKey = this.keyBoardKey.getkeyInput();
                 //Check if the distance between object 1 and object 2 is less than the minimum distance  
                 if (this.objectToObject2Dist(startPoint, endPoint) < minimumDistance) 
                 {
                     object2.buildWindow =true;
                     //Check if objects are currently colliding, default = false
                     if (!object1.isColliding && object2.isBroken) 
                     {                       
<<<<<<< HEAD
                         if  ( getKey == config.Key.R || getKey == config.Key.NUM_PAD_0 && object2.windowRightHealth <1000 )
=======
                         if  (( getKey == config.Key.R || getKey == config.Key.NUM_PAD_0) && object2.windowRightHealth <1000 )
>>>>>>> 1fb7edc1adcebe3020438802338078c585098339
                         {
                             object2.windowRightHealth +=50;
                             if (object2.windowRightHealth >= 1000)
                             {
                                 object2.visible= true;
                                 object2.isBroken = false;
                             }
                         }
                         object1.isColliding = true;
                     }
                     else {
                         //console.log("Not Colliding");
                         object1.isColliding = false;
                     }
                 }
                 else{ object2.buildWindow =false;}
             }
 

            //Check if object is right window
            if (object1.name=="zombie" && object2.name == "windowRight") 
            {
                //Check if the distance between object 1 and object 2 is less than the minimum distance  
                 if (this.objectToObject2Dist(startPoint, endPoint) < object1.height) 
                {                              
                    //Check if objects are currently colliding, default = false
                    if (!object1.isColliding && !object2.isBroken) 
                    {                    
                        object1.y= object2.y+object1.halfHeight
                        object2.windowRightHealth -=1;
                        console.log(object2.windowRightHealth);
                        //Check if window health is 0, then remove child
                        if (object2.windowRightHealth <= 0) 
                        {
                            //object2.parent.removeChild(object2);
                            object2.visible = false;
                            object2.isBroken =true;
                            object1.windowReached = true; 
                        }
                        object1.isColliding = true;
                    }
                    else 
                    {
                        console.log("Right: Not Colliding");
                        object1.isColliding = false;  
                         // If the Window is already broken, then the Zombies can just go through
                         if (this.object2.isBroken){
                            console.log ("Right Window is Gone"); // Debugger
                            this.object1.windowReached = true;
                        }                   
                    }
                }        
            }

            //Check if object is left window
            if (object1.name=="zombie" && object2.name == "windowLeft") 
            {
                //Check if the distance between object 1 and object 2 is less than the minimum distance  
                if (object1.y <=object2.y +object2.height
                    &&object1.y >=object2.y
                    &&object1.x >=object2.x -object1.halfWidth
                    &&object1.x <=object2.x -object2.halfWidth) 
                {
                    //Check if objects are currently colliding, default = false
                    if (!object1.isColliding && !object2.isBroken) 
                    {
                        object1.x =  object2.x- object1.halfWidth
                        object2.windowLeftHealth -=1;
                        console.log(object2.windowLeftHealth);
                        //Check if window health is 0, then remove child
                        if (object2.windowLeftHealth <= 0) 
                        {
                            //object2.parent.removeChild(object2);
                            object2.visible = false;
                            object2.isBroken =true;
                            object1.windowReached = true;
                        }
                        object1.isColliding = true;
                    }
                    else {
                        //console.log("Left: Not Colliding");
                        object1.isColliding = false;
                        
                        // If the Window is already broken, then the Zombies can just go through
                        if (this.object2.isBroken){
                            console.log ("Right Window is Gone"); // Debugger
                            this.object1.windowReached = true;
                        }
                    }
                }
            }
        }

        public checkCollisionWall(object1: objects.GameObject, object2: objects.GameObject) 
        { 
            this.object1 = object1;
            this.object2 = object2;

            //Vertical Walls
            if (object2.name == "leftWallTop") 
            {
                if (!object1.isColliding)
                {    
                    this.verticalWallCollision();
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "leftWallBottom") 
            {
                if (!object1.isColliding)
                {    
                    this.verticalWallCollision();
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "rightWallBath") 
            {
                if (!object1.isColliding)
                {      
                    this.verticalWallCollision();
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "rightWall") 
            {
                if (!object1.isColliding)
                {     
                    this.verticalWallCollision();
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "insideVerticalWall") 
            {
                if (!object1.isColliding)
                {     
                    this.verticalWallCollision();
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            
            //Horizontal Walls
            if (object2.name == "topWall") 
            {
                if (!object1.isColliding) 
                {                                        
                    this.horizontalWallCollision()
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "bottomWall") 
            {
                if (!object1.isColliding)
                {      
                    this.horizontalWallCollision()
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "mainGateWallLeft") 
            {
                if (!object1.isColliding)
                {      
                    this.horizontalWallCollision()
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "mainGateWallRight") 
            {
                if (!object1.isColliding)
                {      
                    this.horizontalWallCollision()
                }
                else 
                {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "insideHorizontalWall") 
            {
                if (!object1.isColliding)
                {     
                    this.horizontalWallCollision()
                }
                else 
                {
                    object1.isColliding = false;
                }
            }         
        }
    }
}