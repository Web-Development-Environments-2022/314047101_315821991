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
    if(user_name in localStorage)
    {
        if(localStorage.getItem(user_name) == password)
        {
            changeDiv('settingsDiv');
            connected_user_name = user_name;
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