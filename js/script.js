"use strict";
/*
# Problemas a resolver:

# mover el escenario
# texturas del juego
# obstaculos
# dificultad
# perfección

*/
var canvas = null,
	ctx = null;

var gravity = 1,
	fallSpeed = 0;

var keyBoard = {
	up: 38
};

var floorH = null;

var player = {
	imgURL: 'assets/img/ncage.png',
	imgOk: false,
	x:0,
	y:0,
	h: null,	// canvas.width * 4 / 100,
	w: null,	// canvas.width * 4 / 100,
	inMove: false,
	jumpStr: 10
};

var obstacle = {
	x: 0,
	y: 0,
	h: 0,
	w: 0
};

function resize(){
	var w = window.innerWidth / canvas.width;
	var h = window.innerHeight / canvas.height; 
	var scale = Math.min(h, w);
	
	canvas.style.width = (canvas.width * scale) + 'px';
	canvas.style.height = (canvas.height * scale) + 'px';
}

player.resetPosition = function (){
	player.x = 0;
	player.y = 0;
};

player.forward = function(){
	player.x += 3;
	if(player.x === canvas.width){
		player.resetPosition();
	}
};

player.jump = function(){
    fallSpeed -= player.jumpStr;
};

player.fall = function(){
	player.y += fallSpeed;
    fallSpeed += gravity;
    	
	if(player.y >= floorH - player.h){
		player.y = floorH - player.h;
		fallSpeed = 0;
		player.inMove = false;
	}
};

function drawFloor(ctx){
	floorH = (canvas.height / 3) * 2;
	ctx.fillStyle = '#00f';
    ctx.fillRect(0, floorH, canvas.width, floorH);

    ctx.fillStyle = "#fff";
    ctx.fillRect(canvas.width / 2 , 50, 25, floorH / 3);
}

function paint(ctx){
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0, canvas.width, canvas.height);

	ctx.drawImage(player.img, player.x, player.y, player.w, player.h);
	drawFloor(ctx);
}

function loop(){
	requestAnimationFrame(loop);
	player.fall();
	player.forward();
	
	paint(ctx);
}

function confirmarPlayer(){
	player.imgOk = true;
	paint(ctx);
}

function init(){
	canvas = document.getElementById('c');
	ctx = canvas.getContext('2d');

	player.h = canvas.width * 4 / 100;
	player.w = canvas.width * 4 / 100;

	player.img = new Image();
	player.img.src = player.imgURL;
	player.onload = confirmarPlayer;

	loop();
}

function keyUp(e){
	/*
	if(e.keyCode === keyBoard.up){
		player.inMove = false;		<-- esto esta mal! 
	}
	*/
}

function keyDown(e){
	if(e.keyCode === keyBoard.up){
		if(!player.inMove){
			player.inMove = true;
			player.jump();
		}
	}
}

window.addEventListener('load', init, false);
window.addEventListener('resize', resize, false);
window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());