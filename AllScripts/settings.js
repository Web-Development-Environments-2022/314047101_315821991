var time;

var upBtn;
var downBtn;
var leftBtn;
var rightBtn;

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
    let ghosts = Math.floor(Math.random() * (4) + 1);

    $('input[type=checkbox]').prop('checked', false);

    if (ghosts == 1) {
        document.getElementById("check1").checked = true;
    }
    if (ghosts == 2) {
        document.getElementById("check2").checked = true;
    }
    if (ghosts == 3) {
        document.getElementById("check3").checked = true;
    }
    if (ghosts == 4) {
        document.getElementById("check4").checked = true;
    }
}

function setRandomBalls(){

    let numOfBalls = Math.floor(Math.random() * (41) + 50);
    document.getElementById("num_of_balls").value = numOfBalls;
    document.getElementById("dynamic_balls").value = numOfBalls;

}

function setRandomColors(){
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("5pointsColor").value = randomColor;

    randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("15pointsColor").value = randomColor;

    randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("25pointsColor").value = randomColor;
}

function setRandomTime(){
    time = Math.floor(Math.random() * (180 - 60) + 60);
    document.getElementById("time").value = time;
    document.getElementById("dynamic_time").value = time;
}

function getGhostsNum(){
    var check_1 = document.getElementById("check1");
    var check_2 = document.getElementById("check2");
    var check_3 = document.getElementById("check3");
    var check_4 = document.getElementById("check4");

    if (check_1.checked) {
        return 1;
    }
    if (check_2.checked) {
        return 2;
    }
    if (check_3.checked) {
        return 3;
    }
    if (check_4.checked) {
        return 4;
    }
}

function startPlay() {
    // get number of balls
    var balls_num = document.getElementById("num_of_balls").value;
    number_of_balls = parseInt(balls_num);

    number_of_ghost = getGhostsNum();
    document.getElementById("ghost_number_display").value = number_of_ghost;

    amount_of_time = document.getElementById("time").value;
    time = amount_of_time;
    document.getElementById("time_to_play_display").value = amount_of_time;

    colorPoints5 = document.getElementById("5pointsColor").value;

    colorPoints15 = document.getElementById("15pointsColor").value;

    colorPoints25 = document.getElementById("25pointsColor").value;


    Start();
    changeDiv('GameDiv');
}