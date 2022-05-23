"use strict"

const button_artistas_parceiros = document.getElementById("button_artistas_parceiros");
const button_obras_favoritas = document.getElementById("button_obras_favoritas");

const listagem_artistas_parceiros = document.getElementById("listagem_artistas_parceiros");
const listagem_obras_favoritas = document.getElementById("listagem_obras_favoritas");

button_obras_favoritas.addEventListener("click", function(){

    button_obras_favoritas.style.border = "2px solid";
    button_obras_favoritas.style.borderTopStyle = "none";
    button_obras_favoritas.style.borderLeftStyle = "none";
    button_obras_favoritas.style.borderRightStyle = "none";

    button_artistas_parceiros.style.border = "none";
    button_artistas_parceiros.style.borderBottomStyle = "none";
    

    listagem_artistas_parceiros.style.display = "none";
    listagem_obras_favoritas.style.display = "flex";

});

button_artistas_parceiros.addEventListener("click", function(){

    button_artistas_parceiros.style.border = "2px solid";
    button_artistas_parceiros.style.borderTopStyle = "none";
    button_artistas_parceiros.style.borderLeftStyle = "none";
    button_artistas_parceiros.style.borderRightStyle = "none";

    button_obras_favoritas.style.border = "none";
    button_obras_favoritas.style.borderBottomStyle = "none";
    

    listagem_artistas_parceiros.style.display = "flex";
    listagem_obras_favoritas.style.display = "none";

});

const icon_editar = document.getElementById("icon_lapis");

icon_editar.addEventListener("click", function(){
    window.location.href = "../editar-cliente/index.html"

});