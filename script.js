var player = document.getElementById('player');
var CPU = document.getElementById('CPU');
var jeu =  ["./ciseaux.png", "./pierre.png", "./feuilles.png"];
var scoreP =document.getElementById('scoreP');
var scoreCPU =document.getElementById('scoreCPU');
var music = document.getElementById('start');
var ciseaux = document.getElementById('ciseaux');
var pierre = document.getElementById('pierre');
var feuille = document.getElementById('feuille');
var countdown = document.getElementById('countdown');
var btns = document.getElementsByClassName('btn');
var go = document.getElementById('go');

var start = new Audio("./start.wav");

var choix =null;
ciseaux.onclick = function(){
	player.src = jeu[0];
	choix = 0;
}
pierre.onclick = function(){
	player.src = jeu[1];
	choix = 1;
}
feuille.onclick = function(){
	player.src = jeu[2];
	choix = 2;
}

go.onclick = function(){
	go.disabled = true;
	start.play();
	temps();
	jackpot();
	setTimeout(match,3600);
	}


function temps(){
	for( i = 0 ; i < btns.length ; i++){
		btns[i].disabled= false;
		}
	setTimeout(Shi, 1000) 
	setTimeout(Fu, 2000) 
	setTimeout(Mi, 3000) 
}
function Shi() {
	countdown.innerHTML = " Shi..";
}
function Fu() {
	countdown.innerHTML = "Fu..";
}
function Mi() {
	countdown.innerHTML = "Mi !!";
	for( i = 0 ; i < btns.length ; i++){
		btns[i].disabled= true;
		
	}
}
 function removeclick(button1, button2, button3){
	for( i = 0 ; i < btns.length ; i++){
		btns[i].disabled= true;
		}
 }
 
var roulette;
var timerJ = 0;
function jackpot(){
	
	var anim = setInterval(function(){
		// if (roulette >= jeu.length-1)
		// {roulette = -1; }
		if ( timerJ >= 30) 
		{clearInterval(anim);
		timerJ = 0
		}
	// roulette ++;
	roulette = Math.floor(Math.random()*3);
	timerJ = ++timerJ;
	CPU.src = jeu[roulette];
	},100);
}

function reset(){
	player.src = "./int.png";
	CPU.src = "./int.png";
	go.disabled = false;
	countdown.innerHTML = " Press GO !";
	choix = null;
}
// 0 ciseau 1 pierre 2 feuille
var Pnum = 0;
var CPUnum = 0;
function match(){
	start.pause();
	start.currentTime =0;
		if (((choix === 0) && (roulette === 2)) || ((choix === 1 ) && (roulette === 0)) || ((choix === 2 ) && (roulette === 1)))
			{scoreP.innerHTML = ++Pnum; 
			layer(win);
		}
		else if (((choix === 1) && (roulette === 2)) || ((choix === 2) && (roulette === 0)) || ((choix === 0) && (roulette === 1)) || (choix === null))
			{scoreCPU.innerHTML = ++CPUnum;
			layer(lose);
		}
		else 
		{layer(draw);
		}
}
var win = "You won !!";
var lose = "You lose..";
var draw = "Draw"; 

function layer(round){
	var layer = document.createElement('div');
	document.body.appendChild(layer);
	layer.id = 'layer';
	if(Pnum === 3) 
		{ layer.innerHTML = "You're a trully champion!";
	}
	else if(CPUnum === 3) 	
		{ layer.innerHTML = "You have been defeated..";
	}
	else 
		{layer.innerHTML = round;
	}
	creatbtn();
}
function creatbtn() {
	var close = document.createElement('div');
	var layer = document.getElementById('layer');
	layer.appendChild(close);
	close.setAttribute('style', 'border : solid; background: white; cursor: pointer;');
	if((Pnum === 3) || (CPUnum === 3)){
		close.innerHTML = "Play again ?";
		close.onclick =function(){
			layer.remove();
			totalreset();
		}
	}
	else {
		close.innerHTML = "Next round";
		close.onclick = function(){
			layer.remove();
			reset();
		}
	}
};
function totalreset(){
	reset();
	Pnum = 0;
	CPUnum = 0;
	scoreP.innerHTML = 0;
	scoreCPU.innerHTML = 0;
}