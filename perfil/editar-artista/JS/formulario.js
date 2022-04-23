'use strict'

var button_pix = document.getElementById("button_pix");
var button_transferencia = document.getElementById("button_transferencia");
var button_continuar = document.getElementById("buttonTransferencia");

const dados_transferencia = document.getElementById("dados-transferencia");
const formulario_dados_transferencia = document.getElementById("formulario_dados_transferencia");
const formulario_pix = document.getElementById("dados-pix");


button_transferencia.addEventListener("click", function(){

    event.preventDefault();

    var formulario_pix = document.getElementById("dados-pix")
    // var formulario_transferencia = document.getElementById("dados-transferencia")
    
    button_transferencia.style.border = "2px solid";
    button_transferencia.style.borderTopStyle = "none";
    button_transferencia.style.borderLeftStyle = "none";
    button_transferencia.style.borderRightStyle = "none";

    button_pix.style.border = "none";
    
    // button_pix.style.border-bottom = "";

    formulario_pix.style.display = "none";
    dados_transferencia.style.display = "flex";
    formulario_dados_transferencia.style.display = "flex";

});


button_pix.addEventListener("click", function(){

    event.preventDefault();

    // var formulario_pix = document.getElementById("dados-pix")
    // var formulario_transferencia = document.getElementById("dados-transferencia")
    
    button_pix.style.border = "2px solid";
    button_pix.style.borderTopStyle = "none";
    button_pix.style.borderLeftStyle = "none";
    button_pix.style.borderRightStyle = "none";

    button_transferencia.style.border = "none";


    dados_transferencia.style.display = "none";
    formulario_dados_transferencia.style.display = "none";
    formulario_pix.style.display = "flex";
   


    
});