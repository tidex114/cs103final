let num

function generateRecipe() {
    num=Number(document.getElementById("x").value);
    if(num === 1){
        console.log("working")
        document.getElementById("recipe1").style.display = "block";
        document.getElementById("output").style.display = "none";
        document.getElementById("x").value="";

    }
    else if(num === 2){
        document.getElementById("recipe2").style.display = "block";
        document.getElementById("output").style.display = "none";
        document.getElementById("x").value="";
    }
    else if(num === 3){
        document.getElementById("recipe3").style.display = "block";
        document.getElementById("output").style.display = "none";
        document.getElementById("x").value="";
    }
    else if(num === 4){
        document.getElementById("recipe4").style.display = "block";
        document.getElementById("output").style.display = "none";
        document.getElementById("x").value="";
    }
    else if(isNaN(num)) {
        document.getElementById("output").innerHTML = "You did not enter a number.";
        document.getElementById("x").value="";
    }
    else if(num<1){
        document.getElementById("output").innerHTML = "The number entered must be between 1 and 4";
        document.getElementById("x").value="";
    }
    else if(num%1!==0){
        document.getElementById("output").innerHTML = "You cannot enter a decimal number";
        document.getElementById("x").value="";
    }
    else if(num>4){
        document.getElementById("output").innerHTML = "You're number must be less than 4";
        document.getElementById("x").value="";
    }
}

