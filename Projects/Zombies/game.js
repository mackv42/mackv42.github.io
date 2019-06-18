var healthBar = document.getElementById('health');
var health = 100;

var pauseButton = document.getElementById('pause');
var resetButton = document.getElementById('reset');

var ammoBar = document.getElementById('ammo');
var ammo = 110;

var zombieBar = document.getElementById('zombies');
var numZombies = 2000;

healthBar.innerHTML = health;
ammoBar.innerHTML = ammo;
zombieBar.innerHTML = numZombies;

// Put in onload
window.onload = function(){
var canvas = document.getElementById('can');
var context = canvas.getContext('2d');



var c_pos = canvas.getBoundingClientRect();
var c_x = c_pos.left;
var c_y = c_pos.top;
var centerX = canvas.width/2;
var centerY = canvas.height/2;

function handleResize(){ // Put into Event
    c_pos = canvas.getBoundingClientRect();
    c_x = c_pos.left;
    c_y = c_pos.top;
}

function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}


var PleftFoot = new Image();
PleftFoot.src = './Resources/PlayerLeftFoot.png';

var playerWalk = [];

PleftFoot.onload = function(){
  playerWalk.push(PleftFoot);
}

var Pstill = new Image();
Pstill.src = './Resources/newone.png';

Pstill.onload = function(){
  playerWalk.push(PleftFoot);
}

var PrightFoot = new Image();
PrightFoot.src = './Resources/PlayerRightFoot.png';


PrightFoot.onload = function(){
  playerWalk.push(PrightFoot);
}

var zombie = function(x, y, speed, dam, health){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.dam = dam;
    this.health = health;

    this.midpointX = this.x;
    this.midpointY = this.y;
}

zombie.prototype.move = function(x, y){
    this.x += x;
    this.y += y;

    this.midpointX += x;
    this.midpointY += y;
}

zombie.prototype.circle = function(person){ // Circles around player
	var dx = this.x - person.x;
    var dy = this.y - person.y;

    //document.getElementById('tst').innerHTML = String(dx) + ' ' + String(dy);

    if(dx > 0){
        this.dir = -(Math.atan(dx/dy));

        if(dy < 0){
            this.dir = this.dir+Math.PI;
        }
    } else{
        this.dir = Math.atan(dy/dx) + .5*Math.PI;
    }   

    dy = Math.sin(this.dir+Math.PI) * this.speed; // Might want to change these
    dx = Math.cos(this.dir+Math.PI) * this.speed; //
    //dx = Math.cos(this.dir-ninety)*this.speed;

    this.move(dx, dy);
}

zombie.prototype.follow = function(person){
	var dx = this.x - person.x;
    var dy = this.y - person.y;

    //document.getElementById('tst').innerHTML = String(dx) + ' ' + String(dy);

    if(dx > 0){
        this.dir = -(Math.atan(dx/dy));

        if(dy < 0){
            this.dir = this.dir+Math.PI;
        }
    } else{
        this.dir = Math.atan(dy/dx) + .5*Math.PI;
    }   
    

    //document.getElementById("tst").innerHTML = this.dir;
    
    dy = Math.sin(this.dir-ninety)*this.speed; // Might want to change these
    dx = Math.sqrt((this.speed*this.speed) - (dy*dy)); //
    this.move(dx, dy);
    
    if(this.dir < 0 || this.dir > Math.PI){
        this.move(-2*dx, 0);
    }
}

zombie.prototype.attack = function(player){
    player.health -= this.dam;

    //Push Back Player
    var dx = this.x - player.x;
    var dy = this.y - player.y;

    var dir = 0;
    
    dir = getDirection(dx, dy);

    dy = Math.sin(dir-ninety)*15; // Might want to change these
    dx = Math.sqrt((15*15) - (dy*dy)); //
    player.move(dx, dy);
    
    if(dir < 0 || dir > Math.PI){
        player.move(-2*dx, 0);
    }

    player.health -= this.dam;
    document.getElementById('health').innerHTML = player.health;

    if(player.health <= 0){
        // Restart Game
        lose = true;
    }
}

var zombieLeftFoot = new Image();
zombieLeftFoot.src = "./Resources/zombie2.png";
zombieLeftFoot.onload = function(){

}

var csideY = Pstill.width/2;
var csideX = Pstill.height/2;

var character = function(x, y, dir){
    this.img = Pstill;
    this.width = this.img.width;
    this.height = this.img.width;

    this.cur = 0;
    this.tim = 1000;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = 10;
};

character.prototype.draw = function(){
	context.save();
	context.translate(centerX, centerY);
	context.rotate(this.dir);

	context.drawImage(Pstill, -csideX, -csideY); //Position is based on center
	context.restore();
}

character.prototype.move = function(x, y){
    this.x += x;
    this.y += y;
    this.midpointX += x;
    this.midpointY += y;
}

var bullet = function(x, y, dir, speed, dam){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.speed = speed;
	this.dam = dam;
}

var bullets = [];

var bulletImg = new Image();
bulletImg.src = "./Resources/bullet2.png";
bulletImg.onload = function(){

}

var bsideY = bulletImg.height/2;
var bsideX = bulletImg.width/2;

bullet.prototype.draw = function(){ //Update coordinates and draw
	context.save();
	context.translate(centerX+this.x - p1.x, centerY+this.y - p1.y); //To Keep relative to player( should put this inside of function )
	context.rotate(this.dir);
	context.drawImage(bulletImg, -bsideX, -bsideY); //Draw From the center of bullet
	context.restore();
}

bullet.prototype.update = function(){
	var dy = Math.sin(this.dir)*this.speed;
    var dx = Math.sqrt((this.speed*this.speed)-(dy*dy));

    this.x += dx;
    this.y += dy;

    if(this.dir > ninety){
        this.x -= 2*dx;
    } else if(this.dir < -.5*Math.PI){  
        this.x -= 2*dx;
    }
}

character.prototype.shoot = function(){
    if(ammo > 0){
        var b = new bullet(this.x, this.y, this.dir-ninety, 30, 100); 
        ammo--;
        ammoBar.innerHTML = ammo;

        bullets.push(b);
    } else{
        //make click noise
    }
}

var p1 = new character(100, 100, 0);
p1.health = 100;

var bulletBox = function(x, y, howMany){
    this.x = x;
    this.y = y;
    this.amount = howMany;
}

var ammoBox = new Image();
ammoBox.src = './Resources/ammoBox.png';
ammoBox.onload = function(){}

bulletBox.prototype.draw = function(){ 
    context.save();
    context.translate(centerX+this.x - p1.x, centerY+this.y - p1.y);
    context.drawImage(ammoBox, -16, -16);
    context.restore();
}

AboxList = [];

function spawnBoxes(howMany, width, height){
    for(let i=0; i<howMany; i++){
        AboxList.push(new bulletBox(getRandomArbitrary(0, width), getRandomArbitrary(0, height), 50));
    }
}

spawnBoxes(5, 3000, 3000);

function updateBoxes(){
    for(let i=0; i!=AboxList.length; i++){
        AboxList[i].draw();
        var dx = AboxList[i].x - p1.x;
        var dy = AboxList[i].y - p1.y;

        var distance = Math.sqrt((dx*dx)+(dy*dy));

        if(distance < 32){
            ammo += AboxList[i].amount;
            ammoBar.innerHTML = ammo;
            AboxList.splice(i, 1);
            i--;
            continue;
        }
    }
}

canvas.addEventListener("mousedown", function(){p1.shoot();});

function handler(event){ 
    var x = event.clientX - c_x;
    var y = event.clientY - c_y;

    var dx = (centerX-x);
    var dy = (centerY-y);

    if(dx > 0){
        p1.dir = -(Math.atan(dx/dy));

        if(dy < 0){
            p1.dir = p1.dir+Math.PI;
        }
    } else{
        p1.dir = Math.atan(dy/dx) + .5*Math.PI;
    }
}

canvas.addEventListener("mousemove", handler);

zombie.prototype.draw = function(){
    context.save();
    context.translate(centerX+this.x - p1.x, centerY+this.y - p1.y);
    context.rotate(this.dir);
    context.drawImage(zombieLeftFoot, -csideX, -csideY);
    context.restore();
}

var zombies = [];

function createZombies(amount, width, height){
    var sx = zombieLeftFoot.width/2;
    var sy = zombieLeftFoot.height/2;

    for(let i = 0; i<amount; i++){ //x, y, speed, dam, health
        zombies.push(new zombie(getRandomArbitrary(200, width), getRandomArbitrary(200, height), getRandomArbitrary(2, 9), 10, getRandomArbitrary(10, 350)));
        zombies[i].midpointY += sx; 
        zombies[i].midpointX += sy;
    }
}

createZombies(numZombies, 3000, 3000);

function updateZombies(player){
    for (let i=0; i < zombies.length; i++){
        let dy = zombies[i].y - player.y;
        let dx = zombies[i].x - player.x;
        let distance = Math.sqrt((dy*dy)+(dx*dx));
        
        if(distance < 40){
            zombies[i].attack(player);
        } else{
            zombies[i].circle(player);
        }

        zombies[i].draw();
    };


}


function updateBullets(){
	for(let i=0; i<bullets.length; i++){
		bullets[i].update();
		bullets[i].draw();

		for(let j=0; j<zombies.length; j++){ // Put bullet.update and zombie.update in one function
        	dy = zombies[j].midpointY-bullets[i].y; // Change so center is correct
        	dx = zombies[j].midpointX-bullets[i].x;
        	var distance = Math.sqrt((dx*dx)+(dy*dy));
        	
        	if(distance < 40){ //Definitely change
                zombies[j].health -= bullets[i].dam;
                if(zombies[j].health <= 0){
                    zombies.splice(j, 1);

                    numZombies--;
                    zombieBar.innerHTML = numZombies
                }
                bullets.splice(i, 1);

        		/*zombies.splice(j, 1);

                numZombies--;
                zombieBar.innerHTML = numZombies;*/
                
                break;
        	}

            if(bullets[i].x > 12000 || bullets[i].x < -12000){ //Make this smaller later on
                bullets.splice(i, 1);
                break;
            } else if(bullets[i].y > 12000 || bullets[i].y < -12000){
                bullets.splice(i, 1);
                break;
            }
    	}
	}
}

//Start Controls///////////////////////////////////////////////
var Key = {
  _pressed: {},

  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};


////////////////////////////////////////////////////////////////////////////////
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
//
var side = Math.sqrt(50);

character.prototype.update = function(){
    var only = true;
    if (Key.isDown(Key.UP)){
        this.y -= this.speed;

        if(Key.isDown(Key.LEFT)){
            this.y += side;
            this.x -= side;
            only = false;
        }

        if(Key.isDown(Key.RIGHT)){
            this.y += side;
            this.x += side;
            only = false;
        } 
    } else if (Key.isDown(Key.DOWN)){ 
        this.y += this.speed;
        if(Key.isDown(Key.LEFT)){
            this.y -= side;
            this.x -= side;
            only = false;
        }

        if(Key.isDown(Key.RIGHT)){
            this.y -= side;
            this.x += side;
            only = false;
        }              
    }

  if (Key.isDown(Key.LEFT) && only) this.x -= this.speed;
  if (Key.isDown(Key.RIGHT) && only) this.x += this.speed;

  

    /*if(joystick._pressed === true && !(joystick.theta() === NaN){
        this.x += this.speed*Math.sin(joystick.theta());
        this.y += this.speed*Math.cos(joystick.theta());
    }*/
}



///END CONTROLS//////////////////////////////////////////////////

var map = new Image();
map.src = "./Resources/Map.png";

map.onload = function(){

}
///////////////////////////////////////////////////////////////
function loseScreen(){
    clear();
    //Ask to restart
}

var pbutton = false;

pauseButton.addEventListener('click', function(){
    if(pbutton){
        pbutton = false;
    } else{
        pbutton = true;
    }
});

resetButton.addEventListener('click', function(){
    p1.x = 0;
    p1.y = 0;
    p1.health = 100;
    ammo = 110;

    AboxList = [];
    spawnBoxes(5, 3000, 3000);

    zombies = [];
    numZombies = 100;
    zombieBar.innerHTML = numZombies;
    createZombies(numZombies, 3000, 3000);
});


function drawLoop(){
    if(lose){
        loseScreen();
        return;
    }

	setTimeout(function loop(){requestAnimationFrame(drawLoop)}, 18); //18 milliseconds

    if(!pbutton){
        clear();
        context.drawImage(map, centerX-p1.x, centerY-p1.y);
        p1.update();
        updateZombies(p1);

        p1.draw();
        updateBullets();
        updateBoxes();
    }
}

drawLoop();
}