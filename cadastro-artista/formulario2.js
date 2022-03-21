'use strict'

var button_pix = document.getElementById("pix");
var button_transferencia = document.getElementById("transferencia");

const formulario_transferencia = document.getElementById("dados-transferencia");
const formulario_pix = document.getElementById("dados-pix");


button_transferencia.addEventListener("click", function(){

    event.preventDefault();

    // var formulario_pix = document.getElementById("dados-pix")
    // var formulario_transferencia = document.getElementById("dados-transferencia")

    formulario_pix.style.display = "none";
    formulario_transferencia.style.display = "flex";

});
