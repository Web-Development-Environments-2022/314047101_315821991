var time;
var ghosts;

var upBtn;
var downBtn;
var leftBtn;
var rightBtn;

var numOfBalls;

var colorPoints5;
var colorPoints15;
var colorPoints25;



function BtnValues(code) {
    switch (code) {
        case 37:
            k = "⇦";
            break;
        case 38:
            k = "⇧";
            break;
        case 39:
            k = "➪";
            break;
        case 40:
            k ="⇩";
            break;
    }
    return k;
}

function getLeft(event) {
    var new_key = event.which || event.keyCode;
    var flag = checkKey(new_key);
    if (leftBtn == null || flag) {
        leftBtn = new_key;
        if (new_key >= 37 && new_key <= 40)
            flag=true;
        else flag=false;
        if (flag){
            document.getElementById("leftKey").value=BtnValues(new_key);
        }
        document.getElementById("left").style.display = "block";
    }
}

function getUp(event) {
    var new_key = event.which || event.keyCode;
    var flag = checkKey(new_key);
    if (upBtn == null || flag) {
        upBtn = new_key;
        if (new_key >= 37 && new_key <= 40)
            flag=true;
        else flag=false;
        if (flag){
            document.getElementById("upKey").value=BtnValues(new_key);
        }
        document.getElementById("up").style.display = "block";
    }
}
function getDown(event) {
    var new_key = event.which || event.keyCode;
    var flag = checkKey(new_key);
    if (downBtn == null || flag) {
        downBtn = new_key;
        if (new_key >= 37 && new_key <= 40)
            flag=true;
        else flag=false;
        if (flag){
            document.getElementById("downKey").value=BtnValues(new_key);
        }
        document.getElementById("down").style.display = "block";
    }
}
function getRight(event) {
    var new_key = event.which || event.keyCode;
    var flag = checkKey(new_key);
    if (rightBtn == null ||flag) {
        rightBtn = new_key;
        if (new_key >= 37 && new_key <= 40)
            flag=true;
        else flag=false;
        if (flag) {
            document.getElementById("rightKey").value = BtnValues(new_key);
        }
        document.getElementById("right").style.display = "block";
    }
}
function checkKey(new_key){
    return (new_key !== 91 && new_key !== 120
         && new_key !== 9 && new_key !== 112 
         && new_key !==27 && new_key !== 113 
         && new_key !== 114 && new_key !== 115
        && new_key !== 116 && new_key !== 117 
        && new_key !== 118 && new_key !== 119
         && new_key !== 20 && new_key !== 121 
         && new_key !== 122 && new_key !== 123 
         && new_key !== 124);

}




function setRandom() {

    setRandomKey();

    setRandomGhosts();

    setRandomBalls();
    
    setRandomTime();

    setRandomColors();
    

}

function setRandomKey(){
    document.getElementById("leftKey").value = "⇦"
    leftBtn = 37;
    document.getElementById("upKey").value ="⇧"
    upBtn = 38;
    document.getElementById("rightKey").value = "➪"
    rightBtn = 39;
    document.getElementById("downKey").value ="⇩"
    downBtn = 40;

    document.getElementById("left").style.display = "inherit";
    document.getElementById("up").style.display = "inherit";
    document.getElementById("down").style.display = "inherit";
    document.getElementById("right").style.display = "inherit";

}



function setRandomGhosts(){
    document.getElementById("num_of_ghost").value = 1;
   //TODO: if one put V on checkbox doffrent then 1, whan click RandomBtn the V is not chang to 1 
}

function setRandomBalls(){

    numOfBalls = Math.floor(Math.random() * (41) + 50);
    document.getElementById("num_of_balls").value = numOfBalls;
    document.getElementById("dynamic_balls").value = numOfBalls;

}

function setRandomColors(){
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    colorPoints5 = randomColor;
    document.getElementById("5pointsColor").value = colorPoints5;

    randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    colorPoints15 = randomColor;
    document.getElementById("15pointsColor").value = colorPoints15;

    randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    colorPoints25 = randomColor;
    document.getElementById("25pointsColor").value = colorPoints25;
}

function setRandomTime(){
    time = Math.floor(Math.random() * (180 - 60) + 60);
    document.getElementById("time").value = time;
    document.getElementById("dynamic_time").value = time;
}

function getGhostsNum(){
    var ghost_num = 1;
    //TODO: number of ghost can be also 2\3\4

   
}
function getTime(){
    var game_time = document.getElementById("time").value;

    if (parseInt(game_time) >= 60)
        time = game_time;

    else
        alert("Worng time value");
}

function getBallsNum(){
    var balls_num = document.getElementById("num_of_balls").value;
    balls_num = parseInt(balls_num);
    if (balls_num >= 50 && balls_num <= 90)
        numOfBalls = balls_num;

    if (isNaN(balls_num) || balls_num > 90 || balls_num < 50)
        alert("Number of balls out of range");

}


function get_values(){
    getBallsNum();

    getGhostsNum();
    
    getTime();
    numOfBalls = parseInt(document.getElementById("num_of_balls").value);
    
    ghosts =  document.getElementById("num_of_ghost").value;

    colorPoints5 = document.getElementById("5pointsColor").value;

    colorPoints15 = document.getElementById("15pointsColor").value;

    colorPoints25 = document.getElementById("25pointsColor").value;

    time = document.getElementById("time").value;


}
function startPlay() {
    get_values();
    var ballsFlag=false;
    var colorPointsFlag =false;
    var ghostFlag =false;
    var timeFlag =false;
    if(typeof (numOfBalls) != NaN)
        ballsFlag=true;
    if(typeof (colorPoints5) != "#fffff" && typeof (colorPoints15) != "#fffff" && typeof (colorPoints25) != "#fffff")
        colorPointsFlag=true;
    if (typeof (ghosts) != "")
        ghostFlag=true;
     if(typeof (time) != "")
        timeFlag=true;

    if (ballsFlag && colorPointsFlag && timeFlag &&ghostFlag)
         
        changeDiv('GameDiv');
    
    else
        alert("Please fill the settings fields");

}