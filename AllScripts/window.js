$(document).ready(function(){
    $('.check').click(function() {
        $('.check').not(this).prop('checked', false);
    });
});

function changeDiv(divName)
{
    if(document.getElementById("GameDiv").style.display == "block")
    {
        resetGame();
        StopMusic();
    }
    if(divName == "settingsDiv")
    {
        resetSettingsDiv();
    }
    let windowTag = '#' + divName;
    $(".windowDivs").hide();
    $(windowTag).show();

}

function LoginUser()
{
    let user_name = document.getElementById("UserNameLogin").value;
    let password = document.getElementById("PasswordLogin").value;
    if(localStorage.getItem(user_name) != null)
    {
        if(localStorage.getItem(user_name) == password)
        {
            changeDiv('settingsDiv');
            document.getElementById("lblusername").value = user_name;
        }
        else{
            document.getElementById("PasswordLogin").value = "";
            alert("Incorrect password, please try again..");
        }
    }
    else
    {
        document.getElementById("PasswordLogin").value = "";
        document.getElementById("UserNameLogin").value = "";
        alert("This username doesn't exist, please try again.");
    }
    document.getElementById("loginForm").reset();
}

function aboutOn()
{
    const popupContainter = document.getElementById("dPopupContainer");
    popupContainter.style.display = "block";

    window.addEventListener("click", function(event) {
        if(event.target == popupContainter){
            $(".popupContainer").hide();
        }
    });

    $(document).keydown(function(e) {
    var code = e.keyCode || e.which;
    if (code == 27)
        $(".popupContainer").hide();
    });
}

function aboutOff()
{
    const popupContainter = document.getElementById("dPopupContainer");
    popupContainter.style.display = "none";
}

function gameOverOn(game_end_reason)
{
    const popupContainter_gameOver = document.getElementById("dPopupContainer_endGame");
    popupContainter_gameOver.style.display = "block";
    document.getElementById("score_end_game_label").innerHTML = score;

    var message;
    switch (game_end_reason) {
        case 'no_more_time_to_play':
            if(score < 100)
            {
                message = "You are better than ";
                message += score;
                message += " points!"
            }
            else
            {
                message = "You've run out of time, but you'r still a Winner!";
            }
            break;
        case 'win_the_game':
            message = "Winner! You'r the best!";
            break;
        case 'no_more_lives':
            message = "Loser! You've run out of lives!";
            break;
        default:
            message = ""; 
    }
    document.getElementById("message_end_game_label").innerHTML = message;
}

function gameOverOff(nextScreen)
{
    const popupContainter_gameOver = document.getElementById("dPopupContainer_endGame");
    popupContainter_gameOver.style.display = "none";
    if(nextScreen == 'play')
    {
        changeDiv('settingsDiv');
    }
    else if(nextScreen == 'home')
    {
        changeDiv('homeDiv');
    }
}