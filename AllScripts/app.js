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

function Start() {
	context = canvas.getContext("2d");
	PlayMusic();
	total_score_value = (5 * ballsNumber_5) + (15 * ballsNumber_15) + (25 * ballsNumber_25); 
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = balls_number_from_settings;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
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
		}
	}
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
	interval = setInterval(UpdatePosition, 90);
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

function Draw() {
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
		}
	}
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
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(time_elapsed >= time_to_play_from_settings)
	{
		resetGame();
		alert("time over!");
	}
	if (score == total_score_value) {
		resetGame();
		window.alert("Game completed");
	} 
	else {
		Draw();
	}
}
