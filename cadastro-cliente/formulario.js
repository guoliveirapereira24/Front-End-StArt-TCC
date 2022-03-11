"use strict"

const formulario1 = document.getElementById("1");
const formulario2 = document.getElementById("2");
const formulario3 = document.getElementById("3");

const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");


function proximo(formulario1,formulario2,formulario3){
    if(formulario1.style.display == "flex"){

        formulario1.style.display = "none";
        formulario2.style.display = "flex";
        
        console.log("passou no 1")
        
    }
    else if (formulario2.style.display == "flex"){

        formulario2.style.display = "none";
        formulario3.style.display = "flex";
        console.log("Passou no 2")
    }

};

document.getElementById("button1")
    .addEventListener("click", proximo);


