var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        //PRIVATE METHODS
        Collision.prototype.verticalWallCollision = function () {
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
        };
        Collision.prototype.horizontalWallCollision = function () {
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
        };
        //PUBLIC METHODS
        //Check distance between player and zombie
        Collision.prototype.objectToObject2Dist = function (startPoint, endPoint) {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2));
        };
        //Check if thrs collision
        Collision.prototype.checkCollision = function (object1, object2) {
            this.object1 = object1;
            this.object2 = object2;
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var objectHalfHeight = object1.height * 0.5;
            var object2HalfHeight = object2.height * 0.5;
            var objectHalfWidth = object1.width;
            var object2HalfWidth = object2.width;
            var minimumDistance = objectHalfHeight + object2HalfHeight;
            var minimumDistance2 = objectHalfWidth + object2HalfWidth;
            startPoint.x = object1.regX + object1.x;
            startPoint.y = object1.regY + object1.y;
            endPoint.x = object2.regX + object2.x;
            endPoint.y = object2.regY + object2.y;
            //Check if object is bullet and if gun fire is true
            if (object2.name == "bullet" && object2.bulletCollided) {
                //Check if distance between zombie and bullet is less than the height of bullet + half height of zombie
                if (this.objectToObject2Dist(startPoint, endPoint) <= minimumDistance2) {
                    //Decrease zombie health
                    object1.zombieHealth--;
                    object2.Reset();
                    //console.log(object1.zombieHealth);
                    //Check if zombie health is 0, then reset the object
                    if (object1.zombieHealth <= 0) {
                        object1.Reset();
                        //this.parent.removeChild(this);
                    }
                    //Reset gun fire to false
                    object2.bulletCollided = false;
                }
            }
            //Check if object is zombie
            if (object1.name == "player" && object2.name == "zombie") {
                //Check if the distance between object 1 and object 2 is less than the minimum distance  
                if (this.objectToObject2Dist(startPoint, endPoint) < minimumDistance) {
                    //Check if objects are currently colliding, default = false
                    if (!object1.isColliding) {
                        //Decrease player health
                        object1.playerHealth -= 0.01;
                        //Check if player health is 0, then remove child and change scene
                        if (object1.playerHealth <= 0) {
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
            /*             //Check if object is another zombie
                        if (object1.name=="zombie" && object2.name == "zombie") {
                            //Check if the distance between object 1 and object 2 is less than the minimum distance
                            if (this.objectToObject2Dist(startPoint, endPoint) < minimumDistance) {
                                //Check if objects are currently colliding, default = false
                                if (!object1.isColliding) {
                                    //Decrease player health
                                     object1.x = object2.x+object2.halfWidth- object1.x+object1.halfWidth;
                                    //object1.x = object2.x+object2.halfWidth;
                                    object1.isColliding = true;
                                }
                                else {
                                    //console.log("Not Colliding");
                                    object1.isColliding = false;
                                }
                            }
                        }
             */
            //Check if object is right window
            if (object2.name == "windowRight") {
                //Check if the distance between object 1 and object 2 is less than the minimum distance  
                if (object1.x >= object2.x
                    && object1.x <= object2.x + object2.width
                    && object1.y >= object2.y + object2.height
                    && object1.y <= object2.y + object2.height + object1.halfWidth) {
                    console.log("colliding with right window");
                    //Check if objects are currently colliding, default = false
                    if (!object1.isColliding && !object2.isBroken) {
                        //object1.y = object2.y+ object2.height + object1.halfHeight;
                        object2.windowRightHealth -= 1;
                        console.log(object2.windowRightHealth);
                        //Check if window health is 0, then remove child
                        if (object2.windowRightHealth <= 0) {
                            object2.parent.removeChild(object2);
                            object2.isBroken = true;
                            object1.windowReached = true;
                        }
                        object1.isColliding = true;
                    }
                    else {
                        console.log("Right: Not Colliding");
                        object1.isColliding = false;
                        // If the Window is already broken, then the Zombies can just go through
                        if (this.object2.isBroken) {
                            console.log("Right Window is Gone"); // Debugger
                            this.object1.windowReached = true;
                        }
                    }
                }
            }
            //Check if object is right window
            if (object2.name == "windowLeft") {
                //Check if the distance between object 1 and object 2 is less than the minimum distance  
                if (object1.y <= object2.y + object2.height
                    && object1.y >= object2.y
                    && object1.x >= object2.x - object1.halfWidth
                    && object1.x <= object2.x - object2.halfWidth) {
                    //Check if objects are currently colliding, default = false
                    if (!object1.isColliding && !object2.isBroken) {
                        object1.x = object2.x + object2.width - object1.halfWidth;
                        object2.windowLeftHealth -= 1;
                        console.log(object2.windowLeftHealth);
                        //Check if window health is 0, then remove child
                        if (object2.windowLeftHealth <= 0) {
                            object2.parent.removeChild(object2);
                            object2.isBroken = true;
                            object1.windowReached = true;
                        }
                        object1.isColliding = true;
                    }
                    else {
                        //console.log("Left: Not Colliding");
                        object1.isColliding = false;
                        // If the Window is already broken, then the Zombies can just go through
                        if (this.object2.isBroken) {
                            console.log("Right Window is Gone"); // Debugger
                            this.object1.windowReached = true;
                        }
                    }
                }
            }
        };
        Collision.prototype.collisionPushBack = function (object1, object2) {
            // How much overlap exists between the 2 objects?
            var overlapDistance = (managers.Vector.Distance(managers.Vector.ToPoint(object1.position), managers.Vector.ToPoint(object2.position))
                - object1.halfWidth - object2.halfWidth) * 0.25;
            // What's the orientation vector from object 1 to object 2?
            var overlapVector = managers.Vector.DegreeToVector(managers.Vector.RotateTowardPosition(managers.Vector.ToPoint(object1.position), managers.Vector.ToPoint(object2.position)));
            // apply the orietation vector to object 1
            var obj1pos = new managers.Vector();
            obj1pos = managers.Vector.ToPoint(object1.position).Add(overlapVector.Multiply(overlapDistance / 2));
            object1.position.x = obj1pos.x;
            object1.position.y = obj1pos.y;
            // apply the orientation vector to object 2, but in the opposite direction
            var obj2pos = new managers.Vector();
            obj2pos = managers.Vector.ToPoint(object2.position).Add(overlapVector.Multiply(-overlapDistance / 2));
            object2.position.x = obj2pos.x;
            object2.position.y = obj2pos.y;
        };
        Collision.prototype.checkCollisionWall = function (object1, object2) {
            this.object1 = object1;
            this.object2 = object2;
            //Vertical Walls
            if (object2.name == "leftWallTop") {
                if (!object1.isColliding) {
                    this.verticalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "leftWallBottom") {
                if (!object1.isColliding) {
                    this.verticalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "rightWallBath") {
                if (!object1.isColliding) {
                    this.verticalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "rightWall") {
                if (!object1.isColliding) {
                    this.verticalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "insideVerticalWall") {
                if (!object1.isColliding) {
                    this.verticalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            //Horizontal Walls
            if (object2.name == "topWall") {
                if (!object1.isColliding) {
                    this.horizontalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "bottomWall") {
                if (!object1.isColliding) {
                    this.horizontalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "mainGateWallLeft") {
                if (!object1.isColliding) {
                    this.horizontalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "mainGateWallRight") {
                if (!object1.isColliding) {
                    this.horizontalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
            if (object2.name == "insideHorizontalWall") {
                if (!object1.isColliding) {
                    this.horizontalWallCollision();
                }
                else {
                    object1.isColliding = false;
                }
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map