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
        default:
            k = String.fromCharCode(code);
    }
    return k;
}

function getChoosenKey(key_type) {
    $(document).on('keydown',function(event){
        new_key = event.keyCode;
        switch (key_type) {
            case "leftKey":
                if(new_key == upBtn || new_key == downBtn || new_key == rightBtn)
                {
                    alert("This character is used for another button, please select a free character");
                    break;
                }
                document.getElementById("leftKey").value =  BtnValues(new_key);
                leftBtn = new_key;
                break;
            case "upKey":
                if(new_key == leftBtn || new_key == downBtn || new_key == rightBtn)
                {
                    alert("This character is used for another button, please select a free character");
                    break;
                }
                document.getElementById("upKey").value =  BtnValues(new_key);
                upBtn = new_key;
                break;
            case "downKey":
                if(new_key == leftBtn || new_key == upBtn || new_key == rightBtn)
                {
                    alert("This character is used for another button, please select a free character");
                    break;
                }
                document.getElementById("downKey").value =  BtnValues(new_key);
                downBtn = new_key;
                break;
            case "rightKey":
                if(new_key == leftBtn || new_key == upBtn || new_key == downBtn)
                {
                    alert("This character is used for another button, please select a free character");
                    break;
                }
                document.getElementById("rightKey").value =  BtnValues(new_key);
                rightBtn = new_key;
                break;
        }
        $(document).off('keydown');
        })
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