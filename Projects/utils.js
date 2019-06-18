//MODEL//////////////////////////////////////////////////////////////////////////
//direction in radians from a 2D vector
function getDirection(dx,dy){
     var dir = 0;
     if(dx > 0){
        dir = -(Math.atan(dx/dy));

        if(dy < 0){
            dir = dir+Math.PI;
        }
    } else{
        dir = Math.atan(dy/dx) + .5*Math.PI;
    }
    return dir;
}

var point = function(x, y){
    this.x = x;
    this.y = y;
}

var rectangle = function(){

}

//creates a shape draws points in clockwise order
var shape = function(pointOnScreen, arg){
    this.midpoint;
    this.coordinates = pointOnScreen;
}

//if a point is inbetween a line
function inbetween(p1, p2, n){
	if(n >= p1 && n <= p2){
		return true;
	}

	return false;
}

//collisiion for a square
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

//switch world space to fit shape2 then check for collision
function collision2(shape1, shape2){
    var p1 = point(shape1.x, shape1.y);
    var p2 = point(shape1.x+shape1.width, shape1.y);
    var p3 = point(shape1.x, shape1.y+shape1.height);
    var p4 = point(shape1.x+shape1.width, shape1.y+shape1.height);
    //some maths
    collision(shape1, shape2);
}

/////////////////////////////////// VIEW ///////////////////////////////
context.prototype.drawSprite = function(){

}

/////////////////////////////////////////////////// CONTROLLER ////////