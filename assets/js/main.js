var menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";
function togglemenu(){
    if(menuList.style.maxHeight == "0px"){
        menuList.style.maxHeight = "130px";
    }
    else{
        menuList.style.maxHeight = "0px";
    }

}

//loading login page on the load of index page
$(document).ready(function(){       
    $('#content').load("signin.html"); 
 });



