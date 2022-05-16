var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var key_pressed;
var last_direction = 4;
var pacman_lives = 5;
let board_wo_ghost;
//media vars
var game_background_music = new Audio('media/sound/game_sound.mp3');
var ghost_1 = document.createElement('img');
var ghost_2 = document.createElement('img');
var ghost_3 = document.createElement('img');
var ghost_4 = document.createElement('img');

ghost_1.src = 'media/ghosts/ghost_1.png';
ghost_2.src = 'media/ghosts/ghost_2.png';
ghost_3.src = 'media/ghosts/ghost_3.png';
ghost_4.src = 'media/ghosts/ghost_4.png';


let ghostList = [ghost_1, ghost_2,ghost_3,ghost_4]
let corners = [ [0,0],[0,9],[9,0],[9,9]  ]
let ghostNumFromUser;
let ghost_count = 0;
let ghostPosition;
let ghostInterval;

// settings vars
var balls_number_from_settings;
var ballsNumber_5;
var ballsNumber_15;
var ballsNumber_25;
var total_score_value;
var pointsColor_from_settings_5;
var pointsColor_from_settings_15;
var pointsColor_from_settings_25;
var ghosts_number_from_settings;
var time_to_play_from_settings;
var key_left_from_settings;
var key_up_from_settings;
var key_down_from_settings;
var key_right_from_settings;

function StopMusic() {
	game_background_music.pause();
	game_background_music.currentTime = 0
}


function PlayMusic() {
	game_background_music.play();
}

$(document).ready(function() {
	$("#homeDiv").show();
});

function resetGame() {
	window.clearInterval(interval);
	StopMusic();
}

function gameEnded(reason_to_end) {
	resetGame();
	gameOverOn(reason_to_end);
}
function Start() {
	context = canvas.getContext("2d");
	PlayMusic();
	total_score_value = (5 * ballsNumber_5) + (15 * ballsNumber_15) + (25 * ballsNumber_25); 

	window.clearInterval(ghostInterval);

	ghostInterval = 350;
	let ghost_remain = ghostNumFromUser;
	
	ghost_count = 0;
	ghostPosition = [];

	board = new Array();
	board_wo_ghost = new Array();

	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = balls_number_from_settings;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		board_wo_ghost[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 9 && j == 0) ||
				(i == 2 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
			board_wo_ghost[i][j] = board[i][j]
		}
	}

	//adding ghosts

	while (ghost_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 7 ;
		ghostPosition.push(emptyCell)
		ghost_remain--;
		
	}
	ghost_interval = setInterval(update_ghost,200);
	new_position_for_ghosts();


	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			if(board[i][j] == 1)
			{
				options = new Array();
				if(ballsNumber_5>0)
				{
					options.push(5);
				}
				if(ballsNumber_15>0)
				{
					options.push(15);
				}
				if(ballsNumber_25>0)
				{
					options.push(25);
				}
				var rand = options[~~(Math.random() * options.length)];
				board[i][j] = rand;
				if(rand ==5)
				{
					ballsNumber_5--;
				}
				else if(rand == 15)
				{
					ballsNumber_15--;
				}
				else
				{
					ballsNumber_25--;
				}
			}
		}
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)
			{
				e.preventDefault();
			}
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 200);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[key_up_from_settings]) {
		return 1;
	}
	if (keysDown[key_down_from_settings]) {
		return 2;
	}
	if (keysDown[key_left_from_settings]) {
		return 3;
	}
	if (keysDown[key_right_from_settings]) {
		return 4;
	}
	else
	{
		return 0;
	}
}

function drawLives()
{
	if(pacman_lives < 5)
	{
		document.getElementById("pacman_lives_display_5").style.display = "none";
	}
	if(pacman_lives < 4)
	{
		document.getElementById("pacman_lives_display_4").style.display = "none";
	}
	if(pacman_lives < 3)
	{
		document.getElementById("pacman_lives_display_3").style.display = "none";
	}
	if(pacman_lives < 2)
	{
		document.getElementById("pacman_lives_display_2").style.display = "none";
	}
	if(pacman_lives < 1)
	{
		document.getElementById("pacman_lives_display_1").style.display = "none";
	}
}

function Draw() {
	drawLives();
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				drawPlayer(center.x, center.y);
			}
			else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = pointsColor_from_settings_5; //color
				context.fill();
			}
			else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = pointsColor_from_settings_15; //color
				context.fill();
			}
			else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = pointsColor_from_settings_25; //color
				context.fill();
			}
			else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "#937EA5"; //color
				context.fill();
			}
			else if (board[i][j] == 7) {
				context.beginPath();
				context.drawImage(ghost_1, center.x-20 , center.y-20 , 50, 50);
				context.fill();
				if (ghost_count == ghostNumFromUser-1){
					ghost_count = 0
				}
				else
				{
					ghost_count++
				}
			}
		}
	}
}

function draw_ghost(center) {
	context.beginPath();
	context.drawImage(ghost_1, center.x-20 , center.y-20 , 50, 50);
	context.fill();

	// TODO: WTF
	if (ghost_count == ghostNumFromUser-1){
		ghost_count = 0
	}
	else {
		ghost_count++
	}
}
function new_position_for_ghosts(){
	let i = 0
	for (i = 0; i < ghostNumFromUser; i++){
		board[ghostPosition[i][0]][ghostPosition[i][1]] = 0
		ghostPosition[i][0] = corners[i][0]
		ghostPosition[i][1] = corners[i][1]

		board[corners[i][0]][corners[i][1]] = 7
	}
	var emptyCell = findRandomEmptyCell(board);
	board[shape.i][shape.j] = 0
	board_wo_ghost[shape.i][shape.j] = 0
	shape.i = emptyCell[0]
	shape.j = emptyCell[1]
	board[shape.i][shape.j] = 2
	board_wo_ghost[shape.i][shape.j] = 2
	Draw();
}

function update_ghost() {

	var i;
	for (i = 0; i < ghostNumFromUser; i++){
		if (board[ghostPosition[i][0]][ghostPosition[i][1]] == 2 ) {
			GhostEatPacman();
			break;
		}
		let GhostX = ghostPosition[i][0];
		let GhostY = ghostPosition[i][1];
		
		let direction = chooseDirection(GhostX , GhostY);

		// TODO: not sure what this is
		if (board_wo_ghost[ghostPosition[i][0]][ghostPosition[i][1]] != 7){
			board[ghostPosition[i][0]][ghostPosition[i][1]] = board_wo_ghost[ghostPosition[i][0]][ghostPosition[i][1]];
		}
		else{
			board[ghostPosition[i][0]][ghostPosition[i][1]] = 0;
		}

		if (direction == "up") {
			ghostPosition[i][1] = ghostPosition[i][1] - 1;
		}
		if (direction == "down") {
			ghostPosition[i][1] = ghostPosition[i][1] + 1;
		}
		if (direction == "left") {
			ghostPosition[i][0] = ghostPosition[i][0] - 1;
		}
		if (direction == "right") {
			ghostPosition[i][0] = ghostPosition[i][0] + 1;
		}

		board[ghostPosition[i][0]][ghostPosition[i][1]] = 7;
	}

	Draw();
	
}
function validStep(ghostX, ghostY){
	if (ghostX < 0 || ghostX > 9 || ghostY < 0  || ghostX > 9){
		return false;
	}

	board_value = board[ghostX][ghostY]

	if (board_value == 4 || board_value == 7){
		return false
	}

	return true
}


function calcDistance(ghostX, ghostY){
	return Math.abs(shape.i - ghostX) + Math.abs(shape.j - ghostY)
}


function chooseDirection(ghostA, ghostB){
		let direction;	
		let distance;
		let minimalDistance = 100;
		
		let randPos = Math.random();
		let validSteps = []

		// down
		if (validStep(ghostA, ghostB+1)){
			validSteps.push("down");
			distance = calcDistance(ghostA, ghostB+1);

			if (distance < minimalDistance){
				minimalDistance = distance;
				direction = "down"
			}
		}

		// up
		if (validStep(ghostA, ghostB-1)){
			validSteps.push("up");
			distance = calcDistance(ghostA, ghostB-1);

			if (distance < minimalDistance){
				minimalDistance = distance;
				direction = "up"
			}
		}
		

		// right
		if (validStep(ghostA+1, ghostB)){
				validSteps.push("right");
				distance = calcDistance(ghostA+1, ghostB);
		
				if (distance < minimalDistance){
					minimalDistance = distance;
					direction = "right"
					}
				}
		
		// left
		if (validStep(ghostA-1, ghostB)){
			validSteps.push("left");
			distance = calcDistance(ghostA-1, ghostB);

			if (distance < minimalDistance){
				minimalDistance = distance;
				direction = "left"
			}
		}

		if (randPos > 0.75){
			direction = validSteps[Math.floor(Math.random() * validSteps.length)]
		}

		return direction
}

function drawPlayer(centerX, centerY)
{
	context.beginPath();
	if(last_direction == 1)
	{
		// pacman goes up
		context.arc(centerX, centerY, 15, 1.7 * Math.PI, 1.3 * Math.PI); // half circle		

	}
	else if(last_direction == 2)
	{
		// pacman goes down
		context.arc(centerX, centerY, 15, 0.7 * Math.PI, 0.3 * Math.PI); // half circle	
	}
	else if(last_direction == 3)
	{
		// pacman goes left
		context.arc(centerX, centerY, 15, 1.1 * Math.PI, 0.8 * Math.PI); // half circle	
	}
	else if(last_direction == 4)
	{
		// pacman goes right
		context.arc(centerX, centerY, 15, 0.1 * Math.PI, 1.8 * Math.PI); // half circle	
	}

	context.lineTo(centerX, centerY);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();

	if(last_direction == 1)
	{
		// pacman goes up
		context.arc(centerX + 10, centerY + 2, 2.5, 0, 2 * Math.PI); // circle

	}
	else if(last_direction == 2)
	{
		// pacman goes down
		context.arc(centerX - 10, centerY + 2, 2.5, 0, 2 * Math.PI); // circle
	}
	else if(last_direction == 3)
	{
		// pacman goes left
		context.arc(centerX - 5, centerY - 9, 2.5, 0, 2 * Math.PI); // circle
	}
	else if(last_direction == 4)
	{
		// pacman goes right
		context.arc(centerX + 5, centerY - 9, 2.5, 0, 2 * Math.PI); // circle
	}

	context.fillStyle = "black"; //color
	context.fill();
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if(x != 0)
	{
		last_direction = x;
	}
	else
	{
		x = last_direction;
	}
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score+=5;
	}
	if (board[shape.i][shape.j] == 15) {
		score+=15;
	}
	if (board[shape.i][shape.j] == 25) {
		score+=25;
	}
	var cell_value = board[shape.i][shape.j];

	board[shape.i][shape.j] = 2;
	board_wo_ghost[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (cell_value == 7) {
		GhostEatPacman();
	}
	Draw();
	if(time_elapsed >= time_to_play_from_settings)
	{
		gameEnded('no_more_time_to_play');
	}
	if (score == total_score_value) {
		gameEnded('win_the_game');
	}
	if (pacman_lives == 0) {
		gameEnded('no_more_lives');
	} 
	else {
		Draw();
	}
}

function GhostEatPacman(){
	score = score -10
	dr = pacman_lives - 1
	drawLives();
	new_position_for_ghosts();
}