"use strict";
/*
# Problemas a resolver:

# mover el escenario
# texturas del juego
# obstaculos
# dificultad
# perfección

*/
var canvas = document.getElementById('c'),
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

function resize(){
	var w = window.innerWidth / canvas.width;
	var h = window.innerHeight / canvas.height; 
	var scale = Math.min(h, w);
	
	canvas.style.width = (canvas.width * scale) + 'px';
	canvas.style.height = (canvas.height * scale) + 'px';
}

var z = randomX(canvas.width - 5);

var obstacle = {
	w: 5,
	h: 5,
	y: 95,
	x: z,
};

player.colision = function(){
	var vc = false;

	var dx = player.x + player.w;
	var dy = player.y + player.h;
	
	var ox = obstacle.x + obstacle.w;
	var oy = obstacle.y + obstacle.h;

	if(dx >= obstacle.x && dx <= ox && dy >= obstacle.y && dy <= oy){
		vc = true;
	}

	return vc;
};

player.resetPosition = function (){
	player.x = 0;
	player.y = 0;
};

player.forward = function(){
	if(player.colision()){
		player.resetPosition();
	}
	if(player.x === canvas.width){
		player.resetPosition();
	}
	player.x += 2;
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
}

obstacle.drawObstacle = function(ctx){
	ctx.fillStyle = "#fff";
    ctx.fillRect(obstacle.x , obstacle.y, obstacle.w, obstacle.h);
};

function paint(ctx){
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0, canvas.width, canvas.height);

	drawFloor(ctx);
	ctx.drawImage(player.img, player.x, player.y, player.w, player.h);
	obstacle.drawObstacle(ctx);
}

function loop(){
	requestAnimationFrame(loop);
	player.fall();
	player.forward();
	console.clear();
	console.log('player: '+ player.x);
	console.log('obstacle: '+obstacle.x);

	paint(ctx);
}

function confirmarPlayer(){
	player.imgOk = true;
	paint(ctx);
}

function init(){
	
	ctx = canvas.getContext('2d');

	player.h = 25; //canvas.width * 4 / 100;
	player.w = canvas.width * 4 / 100;

	player.img = new Image();
	player.img.src = player.imgURL;
	player.onload = confirmarPlayer;

	loop();
}

function randomX(max) {
	var maxim = Math.random() * max;
	if(maxim <= 20 && maxim === 0){
		maxim = Math.random() * max;
	} else {
		return maxim.toFixed(0);
	}
}

function randomY(max) {
	var maxim = Math.random() * max;
	if(maxim <= 60){
		maxim = Math.random() * max;
	} else {
		return maxim.toFixed(0);
	}
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