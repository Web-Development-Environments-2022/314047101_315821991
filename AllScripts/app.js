var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var ghost_interval;
var gift_interval;
var key_pressed;
var last_direction;
var pacman_lives;

//media vars
var game_background_music = new Audio('media/sound/game_sound.mp3');
var ghost_1 = document.createElement('img');

ghost_1.src = 'media/ghosts/ghost_4.png';

// settings vars
var balls_number_from_settings;
var balls_eaten;
var ballsNumber_5;
var ballsNumber_15;
var ballsNumber_25;
var total_score_value;
var pointsColor_from_settings_5;
var pointsColor_from_settings_15;
var pointsColor_from_settings_25;
var time_to_play_from_settings;
var key_left_from_settings;
var key_up_from_settings;
var key_down_from_settings;
var key_right_from_settings;

//ghosts variables 
var ghosts_number_from_settings;
let ghosts_board;
let ghosts_current_positions;
let ghosts_last_positions;


//clock variables
var clock = document.createElement('img');
clock.src = 'media/alarm.png';

//pill variables
var pill = document.createElement('img');
pill.src = 'media/pill.png';

//gift variables
var gift = document.createElement('img');
gift.src = 'media/gift.png';



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
	window.clearInterval(ghost_interval);
	window.clearInterval(gift_interval);

	StopMusic();
}

function gameEnded(reason_to_end) {
	resetGame();
	gameOverOn(reason_to_end);
}

function Start() {
	last_direction = 4;
	pacman_lives = 5;
	balls_eaten = 0;
	document.getElementById("pacman_lives_display").src = "media/lives/live_5.jpeg";
	context = canvas.getContext("2d");
	ghosts_current_positions = [[0,0],[0,9],[9,0],[9,9]];
	ghosts_last_positions = [[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
	PlayMusic();
	total_score_value = (5 * ballsNumber_5) + (15 * ballsNumber_15) + (25 * ballsNumber_25); 

	board = new Array();
	ghosts_board = new Array();


	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = balls_number_from_settings;
	var pacman_remain = 1;
	start_time = new Date();

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		ghosts_board[i] = new Array();
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
				ghosts_board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
					ghosts_board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
					ghosts_board[i][j] = 2;
				} else {
					board[i][j] = 0;
					ghosts_board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	

	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		ghosts_board[emptyCell[0]][emptyCell[1]] = 1;
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
				ghosts_board[i][j] = rand;
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
	//add one clock
	var emptyCellForClock = findRandomEmptyCell(board);
	board[emptyCellForClock[0]][emptyCellForClock[1]] = 66;
	//add one pill
	var emptyCellForPill = findRandomEmptyCell(board);
	board[emptyCellForPill[0]][emptyCellForPill[1]] = 99;


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

	for (var i = 0; i < ghosts_number_from_settings; i++) {
		index_x = ghosts_current_positions[i][0];
		index_y = ghosts_current_positions[i][1];
		ghosts_board[index_x][index_y] = 22; // 22 marks ghosts position
	
	}
	// add first gift
	var valid=findRandomEmptyCell(board)
	gift_current_position=[valid[0],valid[1]];
	board[gift_current_position[0]][gift_current_position[1]] = 33;

	interval = setInterval(UpdatePosition, 150);
	ghost_interval = setInterval(UpdateGhosts, 600);
	gift_interval = setInterval(UpdateGift,2500);
}

function UpdateGift(){
	var valid=findRandomEmptyCell(board);
	board[gift_current_position[0]][gift_current_position[1]]=0;
	gift_current_position=[valid[0],valid[1]];
	board[gift_current_position[0]][gift_current_position[1]] = 33;
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
		document.getElementById("pacman_lives_display").src = "media/lives/live_4.jpeg";
	}
	if(pacman_lives < 4)
	{
		document.getElementById("pacman_lives_display").src = "media/lives/live_3.jpeg";
	}
	if(pacman_lives < 3)
	{
		document.getElementById("pacman_lives_display").src = "media/lives/live_2.jpeg";
	}
	if(pacman_lives < 2)
	{
		document.getElementById("pacman_lives_display").src = "media/lives/live_1.jpeg";
	}
	if(pacman_lives < 1)
	{
		document.getElementById("pacman_lives_display").src = "media/lives/live_0.jpeg";
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
			else if (board[i][j] == 66) {
				context.drawImage(clock, center.x-10 , center.y-10 ,  8*Math.PI, 8* Math.PI);
			}
			else if (board[i][j] == 99) {
				context.drawImage(pill, center.x-10 , center.y-10 ,  8*Math.PI, 8* Math.PI);

			}
			
			if (ghosts_board[i][j] == 22) { //draw ghosts
				context.drawImage(ghost_1, center.x-17 , center.y-17 , 40, 40);
			}
			if (board[i][j] == 33) { //draw ghosts
				context.drawImage(gift, center.x-17 , center.y-17 , 40, 40);
			}
		}
	}
}

function UpdateGhosts() {

	var i;
	for (i = 0; i < ghosts_number_from_settings; i++){
		
		ghosts_board[ghosts_current_positions[i][0]][ghosts_current_positions[i][1]] = board[ghosts_current_positions[i][0]][ghosts_current_positions[i][1]]; 
		
		let next_step = choose_next_step(ghosts_current_positions[i][0] , ghosts_current_positions[i][1], ghosts_last_positions[i][0], ghosts_last_positions[i][1]);

		ghosts_last_positions[i][0] = ghosts_current_positions[i][0];
		ghosts_last_positions[i][1] = ghosts_current_positions[i][1];

		if (next_step == "U") {
			ghosts_current_positions[i][1] -= 1;
		}
		else if (next_step == "D") {
			ghosts_current_positions[i][1] += 1;
		}
		else if (next_step == "R") {
			ghosts_current_positions[i][0] += 1;
		}
		else if (next_step == "L") {
			ghosts_current_positions[i][0] -= 1;
		}

		ghosts_board[ghosts_current_positions[i][0]][ghosts_current_positions[i][1]] = 22;
	}
}

function find_neighbords(ghostX, ghostY, last_ghost_x, last_ghost_y){
	// find all possible steps : check four direction
	// return array of possible neighbords, if the step is not valid, will add an empty list

	possible_neighbords=new Array();
	if(isValid(ghostX,ghostY-1, last_ghost_x, last_ghost_y)) // up
		possible_neighbords.push([ghostX,ghostY-1]);
	else
		possible_neighbords.push([]);

	if(isValid(ghostX,ghostY+1, last_ghost_x, last_ghost_y)) // down
		possible_neighbords.push([ghostX,ghostY+1]);
	else
		possible_neighbords.push([]);

	if(isValid(ghostX+1,ghostY, last_ghost_x, last_ghost_y)) // right
		possible_neighbords.push([ghostX+1,ghostY]);
	else
		possible_neighbords.push([]);

	if(isValid(ghostX-1,ghostY, last_ghost_x, last_ghost_y)) // left
		possible_neighbords.push([ghostX-1,ghostY]);
	else
		possible_neighbords.push([]);


	return possible_neighbords;	 //possible_neighbords= [[UP],[DOWN],[RIGHT],[LEFT]]
	
}

function isValid(positionX,positionY, last_ghost_x, last_ghost_y){
	//return true is the index value is not a wall, ghost or out of board
	if(positionX == last_ghost_x &&  positionY == last_ghost_y) // prevent loop
	{
		return false;
	}
	if(positionX<0 || positionY<0 ||  positionX > 9||  positionY > 9)
	{
		return false;
	}
	if (ghosts_board[positionX][positionY]==22 || board[positionX][positionY]== 4)
		return false;	
	return true;	
}

function find_neighbords_distances(neighbords){ 
	// return for each neighbor it's distance from pacman
	neighbords_distance=new Array();

	for (var i=0; i < 4; i++){
		if(neighbords[i].length == 0)// if the step were not valid, the there will be an emtpy list.
			neighbords_distance.push(Infinity); //if the step were not valid, than put infinity as the distance value.
		else{
			calculate_distance=Math.abs(shape.i-neighbords[i][0])+Math.abs(shape.j-neighbords[i][1]);
			neighbords_distance.push(calculate_distance);}		
	}
	return neighbords_distance;
}

function choose_next_step(ghost_current_x, ghost_current_y, last_ghost_x, last_ghost_y){
	directions=["U","D","R","L"];

	possible_steps = find_neighbords(ghost_current_x, ghost_current_y, last_ghost_x, last_ghost_y);

	//  ----------- prevent loops ----------- 
	if(ghost_current_x == 2 && ghost_current_y < 7 && ghost_current_y > 1 && shape.i > 3 && shape.j < 6 && shape.j > 2)
	{
		// prevent loop from the left to obstacle 1 - go down if possible
		if(possible_steps[1].length != 0)
		{
			return directions[1];
		}
	}

	if(ghost_current_x == 4 && ghost_current_y < 7 && ghost_current_y > 1 && shape.i < 3 && shape.j < 6 && shape.j > 2)
	{
		// prevent loop from the right to obstacle 1 - go down if possible
		if(possible_steps[1].length != 0)
		{
			return directions[1];
		}
	}

	if(ghost_current_x == 5 && ghost_current_y < 2 && ghost_current_y >= 0 && shape.i > 6 && shape.j < 3 && shape.j > 0)
	{
		// prevent loop from the left to obstacle 2 - go down if possible
		if(possible_steps[1].length != 0)
		{
			return directions[1];
		}
	}

	if(ghost_current_x == 7 && ghost_current_y < 2 && ghost_current_y >= 0 && shape.i < 6 && shape.j < 3 && shape.j > 0)
	{
		// prevent loop from the right to obstacle 2 - go down if possible
		if(possible_steps[1].length != 0)
		{
			return directions[1];
		}
	}

	//  ----------- finish prevent loops ----------- 

	possible_steps_distances = find_neighbords_distances(possible_steps);

	var best_step=Infinity;
	var index;

	for (var i=0; i<possible_steps_distances.length; i++){ //iretate over all possible steps, and pick the smallest, save it index
		if (possible_steps_distances[i]<best_step){
			best_step=possible_steps_distances[i];
			index=i;
		}
	}	
	return directions[index]; //return the chosen step by the distances 

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
	

	let board_last_value = board[shape.i][shape.j];
	board[shape.i][shape.j] = 2;

	//UpdateGhosts();

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	var cell_value = ghosts_board[shape.i][shape.j];
	if (cell_value == 22) {
		GhostEatPacman();
	}

	else
	{
		if (board_last_value == 5) {
			score+=5;
			balls_eaten += 1;
		}
		if (board_last_value == 15) {
			score+=15;
			balls_eaten += 1;
		}
		if (board_last_value == 25) {
			score+=25;
			balls_eaten += 1;
		}
		if (board_last_value == 66) {
			time_to_play_from_settings=time_to_play_from_settings*2;
			document.getElementById("time_to_play_display").value = time_to_play_from_settings;
		}
		if (board_last_value == 33) {
			score+=50;
		}
		if (board_last_value == 99) {
			if(pacman_lives==5){
				document.getElementById("pacman_lives_display").src = "media/lives/live_6.png";
			}
			else if(pacman_lives==4){
				document.getElementById("pacman_lives_display").src = "media/lives/live_5.jpeg";
			}
			else if(pacman_lives==3){
				document.getElementById("pacman_lives_display").src = "media/lives/live_4.jpeg";
			}
			else if(pacman_lives==2){
				document.getElementById("pacman_lives_display").src = "media/lives/live_3.jpeg";
			}
			else if(pacman_lives==1){
				document.getElementById("pacman_lives_display").src = "media/lives/live_2.jpeg";
			}
			
			pacman_lives+=1;
		}
	}
	


	Draw();

	if(time_elapsed >= time_to_play_from_settings)
	{
		gameEnded('no_more_time_to_play');
	}
	if (balls_eaten == balls_number_from_settings) {
		gameEnded('win_the_game');
	}
	if (pacman_lives == 0) {
		gameEnded('no_more_lives');
	} 
}

function GhostEatPacman(){
	board[shape.i][shape.j] = 0;
	score -= 10;
	pacman_lives -= 1;
	var emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;
	resetGhosts();
}

function resetGhosts(){
	for (var i = 0; i < ghosts_number_from_settings; i++) {
		ghosts_board[ghosts_current_positions[i][0]][ghosts_current_positions[i][1]] = 0; // reset ghosts
	
	}
	
	ghosts_current_positions = [[0,0],[0,9],[9,0],[9,9]];
	ghosts_last_positions = [[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
	
	for (var i = 0; i < ghosts_number_from_settings; i++) {
		index_x = ghosts_current_positions[i][0];
		index_y = ghosts_current_positions[i][1];
		ghosts_board[ghosts_current_positions[i][0]][ghosts_current_positions[i][1]] = 22; // reset ghosts
	
	}
}