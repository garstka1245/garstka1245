//Keyboard controls
function keyPressed(target) {
	if(target == "ArrowLeft"){
		return controls[37];
	}
	else if(target == "ArrowUp"){
		return controls[38];
	}
	else if(target == "ArrowRight"){
		return controls[39];
	}
	else if(target == "ArrowDown"){
		return controls[40];
	}
	else if(target == "PageUp"){
		return controls[33];
	}
	else if(target == "PageDown"){
		return controls[34];
	}
	else if(target == "Shift"){
		return controls[16];
	}
	else if(target == "`"){
		return controls[192];
	}
	else{
    return controls[target.toUpperCase().charCodeAt(0)];
	}
}

var controls=[];

//Mouse controls
var MouseSensitivity = 3;
var MaxMouseSensitivity = 30;

var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;
	
glCanvas.requestPointerLock = glCanvas.requestPointerLock ||
			     glCanvas.mozRequestPointerLock ||
			     glCanvas.webkitRequestPointerLock
				 
document.exitPointerLock = document.exitPointerLock ||
			   document.mozExitPointerLock ||
			   document.webkitExitPointerLock;

function outOfFocus(){
	document.exitPointerLock();
}
	
document.addEventListener('pointerlockchange', outOfFocus(), false);
document.addEventListener('mozpointerlockchange', outOfFocus(), false);
document.addEventListener('webkitpointerlockchange', outOfFocus(), false);

// Hook mouse move events
document.addEventListener("mousemove", function (e){
	if(document.pointerLockElement === glCanvas || document.mozPointerLockElement === glCanvas){
		// I need to not use e.movementX because apperently it's very inconsistent with pointerlock... pointerlock in general is inconsistent :/
		alphaCameraRot += Math.min(Math.max(e.movementX, -MaxMouseSensitivity), MaxMouseSensitivity)/(1000*(1/MouseSensitivity));
		betaCameraRot -= Math.min(Math.max(e.movementY, -MaxMouseSensitivity), MaxMouseSensitivity)/(1000*(1/MouseSensitivity));
		}
}, false);

var glcanvas = document.getElementById("glCanvas");

function resize(){
	glcanvas.width  = window.innerWidth;
	glcanvas.height = window.innerHeight;
}

function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
	
	
}
	
glCanvas.addEventListener ("mousedown", function (e) {
	//Lock pointer controls
	glCanvas.requestPointerLock();
	//Fullscreen
	//why are the pixels so off?
	if(e.x > 1536 - 50 && e.y > 686 - 50){
	//glcanvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	fullscreen();
	}
});
glCanvas.addEventListener ("mouseup", function (e) {

});

	var xRotVel = 0;
	var yRotVel = 0;
	var zRotVel = 0;
	
	var zCameraPos = -6;
	var xCameraPos = 0;
	var yCameraPos = 0;
	
	var alphaCameraRot = Math.PI/2;
	var betaCameraRot = 0;
	
	var zCameraRot = 0;
	var xCameraRot = 0;
	var yCameraRot = 0;
	
	var cameraSpeed = 0.1;
	
	var debugDispToggle = true;
	
//Debug loop
function debugDisp(){
	document.getElementById("debug").innerHTML = 
			"alphaCamRot: " + Math.sin(alphaCameraRot).toFixed(3) + 
	"<br> betaCamRot: " + betaCameraRot.toFixed(3) + 
	"<br> " + 
	"<br> yLookingAt: " + (betaCameraRot  + yCameraPos).toFixed(3) + 
	"<br> " +
	"<br> xCamPos: " +  xCameraPos.toFixed(3) +
	"<br> yCamPos: " +  yCameraPos.toFixed(3) +
	"<br> zCamPos: " +  zCameraPos.toFixed(3) +
	"<br> <br> w a s d to move around, space up, shift down, click to lock mouse, esc to get out, commands to type in the box on top: gl background #660000 sets background color to a hex value; gl model 8 changes models 0-12 i think i have; gl texture 0-2 changes textures; ~ to toggle this.";
}
//Controls loop
function refreshControls(){
	if(document.pointerLockElement === glCanvas || document.mozPointerLockElement === glCanvas){
		if(keyPressed("w")){
			zCameraPos += Math.sin(alphaCameraRot)*cameraSpeed;
			xCameraPos += Math.cos(alphaCameraRot)*cameraSpeed;
		}
		else if(keyPressed("s")){
			zCameraPos -= Math.sin(alphaCameraRot)*cameraSpeed;
			xCameraPos -= Math.cos(alphaCameraRot)*cameraSpeed;
		}
		if(keyPressed("a")){
			xCameraPos += Math.sin(alphaCameraRot)*cameraSpeed;
			zCameraPos -= Math.cos(alphaCameraRot)*cameraSpeed;
		}
		else if(keyPressed("d")){
			xCameraPos -= Math.sin(alphaCameraRot)*cameraSpeed;
			zCameraPos += Math.cos(alphaCameraRot)*cameraSpeed;
		}
		if(keyPressed(" ")){
			yCameraPos += cameraSpeed;
		}
		else if(keyPressed("Shift")){
			yCameraPos -= cameraSpeed;
		}
		
		if(keyPressed("ArrowUp")){
			yRotVel += 0.01;
		}
		if(keyPressed("ArrowDown")){
			yRotVel -= 0.01;
		}
		if(keyPressed("ArrowLeft")){
			xRotVel += 0.01;
		}
		if(keyPressed("ArrowRight")){
			xRotVel -= 0.01;
		}
		if(keyPressed("PageUp")){
			zRotVel += 0.01;
		}
		if(keyPressed("PageDown")){
			zRotVel -= 0.01;
		}
		if(keyPressed("`")){
			if(debugDispToggle){
			console.log(debugDispToggle);
				setTimeout(function(){debugDispToggle = false;},200);
			}
			else{
				setTimeout(function(){debugDispToggle = true;},200);
			}
		}
	}
	// Touch Movement
for(i = 0; i <= 1; i++){ 
	if(TouchXS[i] < window.innerWidth/2 && TouchXS[i] < window.innerHeight/2 && touchdown){
		movementRad = Math.atan2(movementZ, movementX);
		zCameraPos -= Math.cos(alphaCameraRot+movementRad)*cameraSpeed;
		xCameraPos += Math.sin(alphaCameraRot+movementRad)*cameraSpeed;
		yCameraPos += Math.sin(betaCameraRot)*movementRad*cameraSpeed;
	}
	}
}
//Change camera speed
document.addEventListener("wheel", function (e) {
	//console.log(e.deltaY);
	if(cameraSpeed > 0){
	cameraSpeed -= e.deltaY/40;
	}
	else{
	cameraSpeed = 0.1;
	}
	/*
	if (e.ctrlKey == true) {
       e.preventDefault();
    }*/
});
//Touch control
var TouchXS = [];
var TouchYS = [];
var movementX = 0;
var movementZ = 0;
var lookX = 0;
var lookY = 0;
var touchdown = false;

glCanvas.addEventListener("touchstart", function (e) {
	touchdown = true;
for(i = 0; i <= 1; i++){ 
	if(e.touches[i]){
		TouchXS[i] = e.touches[i].screenX;
		TouchYS[i] = e.touches[i].screenY;
	}
}
//Upper left corner
if(e.touches[0].screenX < window.innerWidth/2 && e.touches[0].screenY < window.innerHeight/2){
//Fullscreen
	fullscreen();
}		
else{
//Look controls
}
});

glCanvas.addEventListener("touchmove", function (e) {
//Movement controls
for(i = 0; i <= 1; i++){ 
	if(TouchXS[i] < window.innerWidth/2 && TouchXS[i] < window.innerHeight/2){
		movementX = (Math.min(Math.max((TouchXS[i] - e.touches[i].screenX), -100), 100)* MouseSensitivity)/ 10000;
		movementZ = (Math.min(Math.max((TouchYS[i] - e.touches[i].screenY), -100), 100)* MouseSensitivity)/ 10000
	}
	//Look controls
	else if(!(TouchXS[i] < window.innerWidth/2 && TouchXS[i] < window.innerHeight/2) && (e.touches[i])){
		lookX = Math.min(Math.max((TouchXS[i] - e.touches[i].screenX), -100), 100);
		lookY = Math.min(Math.max((TouchYS[i] - e.touches[i].screenY), -100), 100);
		alphaCameraRot -= (lookX)/(1000*(1/MouseSensitivity));
		betaCameraRot += (lookY)/(1000*(1/MouseSensitivity));
		TouchXS[i] = e.touches[i].screenX;
		TouchYS[i] = e.touches[i].screenY;
	}
}
});

glCanvas.addEventListener("touchend", function (e) {
	touchdown = false;
});





window.onkeydown = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

	for(var i =0; i < 222; i++){
		if(key == i){
			controls[i]= true;
		}
	}
	/*if(e.ctrlKey==true && (e.which == '61') || (e.which == '173')){
		e.preventDefault();
	}*/
};

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

	for(var i =0; i < 222; i++){
		if(key == i){
			controls[i]= false;
		}
	}
};