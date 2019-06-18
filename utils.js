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

function getDirection(dx,dy){
     if(dx > 0){
        this.dir = -(Math.atan(dx/dy));

        if(dy < 0){
            this.dir = this.dir+Math.PI;
        }
    } else{
        this.dir = Math.atan(dy/dx) + .5*Math.PI;
    }
}

function getDistance(dx,dy){
	return Math.sqrt(dx*dx + dy*dy);
}

function inbetween(p1, p2, n){
	if(n >= p1 && n <= p2){
		return true;
	}

	return false;
}


function collision(shape1, shape2){ //make sure to use as little shape, big shape
    if(inbetween(shape2.x, shape2.x + shape2.width, shape1.x)){
        
    } else if(inbetween(shape2.x, shape2.x + shape2.width, shape1.x + shape1.width)){
        
    } else{
       return false;
    }
    
    if(inbetween(shape2.y, shape2.y + shape2.height, shape1.y)){
       
    } else if(inbetween(shape2.y, shape2.y + shape2.height, shape1.y + shape1.height)){
        
    } else{
       return false;
    }
    
    return true;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}