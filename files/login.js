$(document).ready(function(){

    $("h1").animate({
        opacity: "1"
    },2000, ()=>{
        $("h1").animate({
            fontSize: "5vh"
        },500);
    });
    $("h2").animate({
        opacity: "1"
    },2000, ()=>{
        $("h2").animate({
            fontSize: "25vh",
            
        },500);
        $("#pass_div").animate({
            opacity: "1",
        },300);
        
    });

});

var password = "epco";

function check(){
    var pass_input = document.getElementById("pass_input");
    if(pass_input.value.trim() == ""){
        pass_input.style.border = "solid 3px red";
        return false;
    }
    else if(pass_input.value != password){
        pass_input.style.border ="solid 3px red";
        alert("Password not matched");
        return false;
    }
    else{
        return true;
    }
}