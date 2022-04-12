"use strict"
const button_minhas_obras = document.getElementById("button_minhas_obras");
const button_minhas_propostas = document.getElementById("button_minhas_propostas");

const listagem_minhas_obras = document.getElementById("listagem_minhas_obras");
const listagem_minhas_propostas = document.getElementById("listagem_minhas_propostas");

button_minhas_propostas.addEventListener("click", function(){

    button_minhas_propostas.style.border = "2px solid";
    button_minhas_propostas.style.borderTopStyle = "none";
    button_minhas_propostas.style.borderLeftStyle = "none";
    button_minhas_propostas.style.borderRightStyle = "none";

    button_minhas_obras.style.border = "none";
    button_minhas_obras.style.borderBottomStyle = "none";
    

    listagem_minhas_obras.style.display = "none";
    listagem_minhas_propostas.style.display = "flex";

});

button_minhas_obras.addEventListener("click", function(){

    button_minhas_obras.style.border = "2px solid";
    button_minhas_obras.style.borderTopStyle = "none";
    button_minhas_obras.style.borderLeftStyle = "none";
    button_minhas_obras.style.borderRightStyle = "none";

    button_minhas_propostas.style.border = "none";
    button_minhas_propostas.style.borderBottomStyle = "none";
    

    listagem_minhas_obras.style.display = "flex";
    listagem_minhas_propostas.style.display = "none";

});