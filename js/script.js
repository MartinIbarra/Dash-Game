"use strict";
/*
* Problemas a resolver:

# mover el escenario
# texturas del juego
# carga de las texturas
# obstaculos



this.fillChar = function (ctx){
    	ctx.fillStyle = '#f00';
		ctx.fillRect(this.x, this.y, this.w, this.h);
    };


*/
var canvas = null,
	ctx = null,
	keybottom = 40,
	keyTop = 38,
	player = null,
	inMove = false,
	fallSpeed = 0,
	gravity = 1,
	charX,
	imgOk = false,
	charY, 
	floorH;


window.addEventListener('load', init, false);
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

function init(){
	canvas = document.getElementById('fondo');
	ctx = canvas.getContext('2d');
	charY = canvas.width * 4 / 100;
	charX = canvas.width * 4 / 100;
	creation();
	loop();
}

function loop() {
    requestAnimationFrame(loop);
    player.fall();
    player.forward();
    paint(ctx);
}

function Floor(ctx){
	floorH = (canvas.height / 3) * 2;
	ctx.fillStyle = '#00f';
    ctx.fillRect(0, floorH, canvas.width, floorH);
}

function creation(){
	player = new Char(0, 0, charX, charY);
}

function paint(ctx){
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0, canvas.width, canvas.height);
    Floor(ctx);
    player.fillChar(ctx);
}

function confirmarChar(){
	imgOk = true;
   	paint(ctx);
}

function Char(x, y, w, h){
	var imgURL = "./assets/img/ncage.jpg";
	this.x = (x === null) ? 0 : x;
    this.y = (y === null) ? 0 : y;
    this.w = (w === null) ? 0 : w;
    this.h = (h === null) ? 0 : h;

    this.fillChar = function (ctx){
    	this.fondo = new Image();
    	this.fondo.src = imgURL;
    	this.fondo.onload = confirmarChar;

    	ctx.drawImage(this.fondo, x, y);

    	paint(ctx);
    };

    this.forward = function (){
    	this.x += 3;
    };

    this.jump = function (){
    	var jumpStr = 10;
    	fallSpeed -= jumpStr;
    };

    this.fall = function (){
    	this.y += fallSpeed;
    	fallSpeed += gravity;
    	
		if(this.y >= floorH - charY){
			this.y = floorH - charY;
			fallSpeed = 0;
			inMove = false;
		}
    };
}

function keyUp(e){
	if(e.keyCode === keybottom){
		inMove = false;
	}
}

function keyDown(e){
	if(e.keyCode === keyTop){
		if(!inMove){
			inMove = true;
			player.jump();
		}
	}
}