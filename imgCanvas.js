"use strict";
window.addEventListener('load', init, false);
var canvas = null,
	fondo,
	ctx = null;

var cargo = false;

function confirmarImg(){
	cargo = true;
	paint(ctx);
}

function init (){
	canvas = document.getElementById('c');
	ctx = canvas.getContext('2d');

	fondo = new Image();
	fondo.src = 'ncage.jpg';
    fondo.onload = confirmarImg;

    paint(ctx);
}

function paint(ctx){
	ctx.drawImage(fondo,0,0, 50, 50);
}

//Carga la imagen!!