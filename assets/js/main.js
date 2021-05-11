//loading users json data
//include the   'async':false   parameter or the object data won't get captured when loading
var json = $.getJSON({ 'url': "users.json", 'async': false });
//The next line of code will filter out all the unwanted data from the object.
json = JSON.parse(json.responseText);
var userData = json["users"];

//loading questions data
var json2 = $.getJSON({ 'url': "questions.json", 'async': false });
//The next line of code will filter out all the unwanted data from the object.
json2 = JSON.parse(json2.responseText);
var questions = json2["questions"];


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



//login validation
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
        //if correct credential, load quiz rules page
        $("#content").load("quiz-rules.html");
    }
    else {
        alert("Invaild credentials!!! \nPlease try again.........");
    }
    return false;
}

//function to valited if user checked the "I agree checkbox"
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




var currQuestionNum = 0;
var currAnswer = "";
let userAnswers = [];// store user answers
var correctCount = 0;

function initializeUserAnswerMap() {    
    for(let i=0; i < questions.length; i++){
        userAnswers[i] = [i + 1, "Not attempted"];
    }
}
//function
function loadFirstQuestion() {
    loadQuestion(0);
}


//function
function loadNextQuestion() {
    if (!validateAnswer()) {
        return false;
    }
    currQuestionNum += 1;

    var submitBtn = document.getElementById("submitBtn");
    var nextBtn = document.getElementById("nextBtn");

    if (currQuestionNum == questions.length - 1) {
        submitBtn.style.display = "block";
        submitBtn.style.background = "#3371e2";
        submitBtn.style.color = "#FFF";
        nextBtn.style.display = "none";
        // alert("This is the last Question.!!");
    }

    loadQuestion(currQuestionNum);    
    clearAllRadioBtn();
}


//function
function loadPreviousQuestion() {
    var submitBtn = document.getElementById("submitBtn");
    var nextBtn = document.getElementById("nextBtn");

    if (currQuestionNum > 0) {
        currQuestionNum -= 1;
        submitBtn.style.display = "none";
        nextBtn.style.display = "block";
    }
    else {
        alert("This is the first Question.!!");
        return false;
    }
    loadQuestion(currQuestionNum);
    // clearAllRadioBtn();
}

//standard funtion for loading question
function loadQuestion(quesNum){
    var currQuestion = questions[quesNum]["question"];
    currAnswer = questions[quesNum]["ans"];
    var currOptions = questions[quesNum]["options"];

    document.getElementById("question").innerHTML = currQuestion;
    document.getElementById("option1").value = currOptions[0];
    document.getElementById("option2").value = currOptions[1];
    document.getElementById("option3").value = currOptions[2];
    document.getElementById("option4").value = currOptions[3];
    document.getElementById("option1Lable").innerHTML = currOptions[0];
    document.getElementById("option2Lable").innerHTML = currOptions[1];
    document.getElementById("option3Lable").innerHTML = currOptions[2];
    document.getElementById("option4Lable").innerHTML = currOptions[3];
}

function validateAnswer() {
    var selectedAnswer = document.querySelector('input[name="option"]:checked');

    if (selectedAnswer != null) {
        // alert(selectedAnswer.value + "  option is selected");
        var isCorrect = false;
        if (selectedAnswer.value == currAnswer) {
            isCorrect = true; 
            if(userAnswers[currQuestionNum][1] != "Attempted"){
                correctCount += 1;
            }
            else if(userAnswers[currQuestionNum][1] == "Attempted" && !userAnswers[currQuestionNum][2]){
                            correctCount += 1;
            }
        }
        else{
            if(userAnswers[currQuestionNum][1] == "Attempted" && userAnswers[currQuestionNum][2]){
                correctCount -= 1;
            }
        }
        
        // push user response
        userAnswers[currQuestionNum] = [currQuestionNum + 1, "Attempted", isCorrect, selectedAnswer.value, currAnswer];
        console.log(userAnswers);
        console.log(correctCount);
        return true;
    }
    else {
        alert("No option Selected!\nPlease look back to this question..");
        // return false;      
        // console.log(userAnswers);
        return true;
    }

}

//to clear radio button selection
function clearAllRadioBtn() {
    try {
        if(document.querySelector('input[name="option"]:checked').checked != false){
            document.querySelector('input[name="option"]:checked').checked = false;
        }
      }
      catch(err) {
        console.log(err.message);
      }
    
}

//load result page once submit button is clicked
function loadResultPage() {
    if (!validateAnswer()) {
        return false;
    }
    $("#content").load("quiz-result.html");
}

//funstion to load user result 
function showUserResult() {

    document.getElementById("totalCount").innerHTML = questions.length;
    document.getElementById("correctCount").innerHTML = correctCount;
    document.getElementById("correctPercent").innerHTML = correctCount / questions.length * 100 + " %";
  
    //load each answer details
    $(document).ready(function () {
        for (var i in userAnswers) {
            var element = document.createElement("p");
            element.innerHTML = userAnswers[i];
            $("#resultDiv").append(element);
        }
    });
}


function showAnswers() {

}



