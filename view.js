function getRandomArbitrary(min, max) {
   return Math.random() * (max - min) + min;   
}

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,3000);
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#ffffff");
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.domElement.id = "renderer";
document.getElementById("masthead").appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();



function ellipsoid (latitudeBands, longitudeBands, a, b, c, size) {
    ellipsoidgeometry = new THREE.Geometry();
    for (var latNumber=0; latNumber <= latitudeBands; latNumber++)
        {
            var theta = (latNumber *      Math.PI *2/ latitudeBands);
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
           
             for (var longNumber=0; longNumber <= longitudeBands; longNumber++)
             {
                var phi = (longNumber  *2* Math.PI / longitudeBands);
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);
               
                var x = a*cosPhi * cosTheta ;
                var y = b*cosTheta*sinPhi;
                var z = c*sinTheta;
                ellipsoidgeometry.vertices.push(new THREE.Vector3( x*size,y*size,z*size));
               
            }
       
   
    }
    
    for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
        var first = (latNumber * (longitudeBands + 1)) + longNumber;
        var second = first + longitudeBands + 1;

        ellipsoidgeometry.faces.push(new THREE.Face3(first,second,first+1));
        ellipsoidgeometry.faces.push(new THREE.Face3(second,second+1,first+1));
      }
    }

    return ellipsoidgeometry;
}

var materials =  new Array();



var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

spheres = new THREE.Object3D();
var update = function(){
    var e = new Array(150);
    for(var i=0; i<e.length; i++){
        //very surprising behavior here
        e[i] = new THREE.Mesh(ellipsoid(10, 10, 3, 3, 20, .3), materials[0]);
        e[i].position.x = (Math.random() - 0.5) * 90;
        e[i].position.y = (Math.random() - 0.5) * 90;
        e[i].position.z = (Math.random() - 0.5) * 40;
        e[i].speed = .5+Math.random()*2;
        spheres.add(e[i]);
    }

    scene.add(spheres);
    
    setInterval(()=>{ for(var i=0; i<e.length; i++){
        e[i].position.z += e[i].speed;
        if(e[i].position.z > 220){
            e[i].position.z = -20;
        }
    }}, 30);
}


render();
update();
//
