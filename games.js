var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var color = "#00FFFF";

var joystick  = new VirtualJoystick({
        container : document.getElementById('container'),
        mouseSupport  : true,
      });
      joystick.addEventListener('touchStart', function(){
        console.log('down')
      })
      joystick.addEventListener('touchEnd', function(){
        console.log('up')
      })

function changeColor(c){
  console.log(c.value);
  color = c.value;
}

var RAD = Math.PI / 180;
    
var shape = function(x, y, width, height, color){
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.color = color;
        this.dir = "up";
};

//this and draw for shape then node inherits

shape.prototype.copy= function(){
  return new shape(this.x, this.y, this.height, this.width, this.color);
}
    

shape.prototype.move = function(dx, dy){
  this.x += dx;
  this.y += dy;
};

shape.prototype.update = function(){
  switch(this.dir){
    case "up":
      this.y -= this.width;
      break;
    case "down":
      this.y += this.width;
      break;
    case "left":
      this.x -= this.width;
      break;
    case "right":
      this.x += this.width;
      break;
  }

  if(this.x > canvas.width){
    this.x = 0;
  } else if(this.x < 0){
    this.x = canvas.width;
  } else if(this.y > canvas.height){
    this.y = 0;
  } else if(this.y < 0){
    this.y = canvas.height;
  }
};

shape.prototype.draw = function(){
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
};




function clear(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
    
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    var snake = function(sz, num){
        this.many = num;
        this.nodes = [];
        this.nodes.push(new shape(10, 10, sz, sz, color));
        for(i=0; i!=num; i++){
           this.nodes.push(new shape(10 , 10+i*sz, sz, sz, color));
        }
    };
     
    snake.prototype.draw = function(){
        for(i=1; i!=this.nodes.length; i++){
           this.nodes[i].draw();
        }
        this.nodes[0].draw();
    };

    snake.prototype.update = function(){
      for(i=this.nodes.length-1; i!=0; i--){
        this.nodes[i].dir = this.nodes[i-1].dir;
      }

      for(i=0; i!=this.nodes.length; i++){
        this.nodes[i].update();
      }

      if(this.many > 0){
        switch(this.nodes[this.nodes.length-1].dir){
          case "right":
            this.nodes.push(new shape(this.nodes[this.nodes.length-1].x-this.nodes[1].width, this.nodes[this.nodes.length-1].y, this.nodes[0].width, this.nodes[0].width, color));
            break;
          case "left":
            this.nodes.push(new shape(this.nodes[this.nodes.length-1].x+this.nodes[1].width, this.nodes[this.nodes.length-1].y, this.nodes[0].width, this.nodes[0].width, color));
            break;
          case "up":
            this.nodes.push(new shape(this.nodes[this.nodes.length-1].x, this.nodes[this.nodes.length-1].y+this.nodes[1].width, this.nodes[0].width, this.nodes[0].width, color));
            break;
          case "down":
            this.nodes.push(new shape(this.nodes[this.nodes.length-1].x, this.nodes[this.nodes.length-1].y-this.nodes[1].width, this.nodes[0].width, this.nodes[0].width, color));
            break;
        }
        this.many-=1;
      }
    }; 
    
    var clicked = false;
    
    function start(){
        var s = new snake(5, 5);
        

        if(!clicked){
             clicked = true;
             //Fix turning backwards
            document.addEventListener("keyup", function(event){
                 switch(event.keyCode){
                   case 37:
                      if(s.nodes[0].dir!="right"){
                         s.nodes[0].dir = "left";
                      }
                      
                      break;
                   case 38:
                      if(s.nodes[0].dir!="down"){
                        s.nodes[0].dir = "up";
                      }
                      break;
                   case 39:
                     if(s.nodes[0].dir!="left"){
                      s.nodes[0].dir = "right";
                     }
                     
                     break;
                   case 40:
                     if(s.nodes[0].dir!="up"){
                       s.nodes[0].dir = "down";
                     }
                     
                     break;
                     
                   default:
                      break;
                 }
             });

        // event listeners for onscreen controller
      setInterval(function(){
        if(joystick.up()){
          s.nodes[0].dir = "up";
        } else if(joystick.down()){
          s.nodes[0].dir = "down";
        } else if(joystick.right()){
          s.nodes[0].dir = "right";
        } else if(joystick.left()){
          s.nodes[0].dir='left'
        }
      }, 1/30 * 1000);

        var cookie = new shape(Math.floor(getRandomArbitrary(0, canvas.width/s.nodes[0].width)) * s.nodes[0].width, Math.floor(getRandomArbitrary(0, canvas.height/s.nodes[0].width)) * s.nodes[0].width, s.nodes[0].width, s.nodes[0].width, "#000000");
          
        function drawLoop(){
          setTimeout(function loop(){requestAnimationFrame(drawLoop)}, 18);
          if(s.nodes[1].x == cookie.x && s.nodes[1].y == cookie.y){  // if snake eats cookie
            s.many+=2; // adds 2 new nodes
            cookie.x = Math.floor(getRandomArbitrary(0, canvas.width/s.nodes[0].width)) * s.nodes[0].width;
            cookie.y = Math.floor(getRandomArbitrary(0, canvas.height/s.nodes[0].width)) * s.nodes[0].width;
          }
          
          /*
          for(var i=2; i!=s.nodes.length; i++){
             if(s.nodes[i].x == s.nodes[0].x && s.nodes[i].y == s.nodes[0].y){
                alert("you lose");
             }
          }*/

          s.update();
          clear();
          //cookie.draw();
          ctx.beginPath();
          ctx.rect(cookie.x, cookie.y, cookie.width, cookie.height);
          ctx.fillStyle = color;
          ctx.fill();
          s.draw();
      }
        drawLoop();
      }
}

window.onload = start();