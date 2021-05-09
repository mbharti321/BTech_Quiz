//for menu responsiveness
var menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";
function togglemenu() {
    if (menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "400px";
    }
    else {
        menuList.style.maxHeight = "0px";
    }

}

//loading login page on the load of index page
$(document).ready(function () {
    $('#content').load("signin.html");
});


//loading users json data
//include the   'async':false   parameter or the object data won't get captured when loading
var json = $.getJSON({ 'url': "users.json", 'async': false });
//The next line of code will filter out all the unwanted data from the object.
json = JSON.parse(json.responseText);
var userData = json["users"];



function validateUser() {
    var enteredEmail = document.getElementById("loginEmail").value;
    var enteredPassword = document.getElementById("loginPassword").value;
    var validUser = false;
    // console.log(enteredEmail);
    // console.log(enteredPassword);
    for (let i = 0; i < userData.length; i++) {
        if (userData[i]["emailId"] == enteredEmail && userData[i]["password"] == enteredPassword) {
            validUser = true;
            break;
        }
    }

    if (validUser) {
        alert("Login successful.");
        $("#content").load("quiz-rules.html");

    }
    else {
        alert("Invaild credentials!!! \nPlease try again.........");
    }
    return false;
}

function validateCheck() {
    var rulesCheck = document.getElementById("rulesCheck");
    console.log(rulesCheck.checked);
    if (rulesCheck.checked) {
        $("#content").load("quiz-questions.html");        
    }
    else {
        alert("Please select \"I agree\"!!!");
    }
    return false;
}

