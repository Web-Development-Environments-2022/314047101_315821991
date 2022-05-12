function changeDiv(divName)
{
    let windowTag = '#' + divName;
    $(".windowDivs").hide();
    $(windowTag).show();

}

function LoginUser()
{
    let user_name = document.getElementById("UserNameLogin").value;
    let password = document.getElementById("PasswordLogin").value;
    if(user_name in localStorage & localStorage.getItem(user_name) == password)
    {
        changeDiv('settingsDiv');
    }
    else
    {
        window.alert("incorrect password for the given user");
        changeDiv('loginDiv');
    }
}