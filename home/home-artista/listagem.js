"use strict"

const button_pedidos_para_mim = document.getElementById("pedidos-para-mim");
const button_pedidos_publicos = document.getElementById("pedidos-publicos")

const pedidos_para_mim = document.getElementById("para-mim");
const pedidos_publicos = document.getElementById("publicos");


button_pedidos_para_mim.addEventListener("click", function(){

    button_pedidos_para_mim.style.border = "2px solid";
    button_pedidos_para_mim.style.borderTopStyle = "none";
    button_pedidos_para_mim.style.borderLeftStyle = "none";
    button_pedidos_para_mim.style.borderRightStyle = "none";

    button_pedidos_publicos.style.border = "none";
    button_pedidos_publicos.style.borderBottomStyle = "none";
    
    // button_pix.style.border-bottom = "";

    pedidos_publicos.style.display = "none";
    pedidos_para_mim.style.display = "flex";

});

button_pedidos_publicos.addEventListener("click", function(){

    button_pedidos_publicos.style.border = "2px solid";
    button_pedidos_publicos.style.borderTopStyle = "none";
    button_pedidos_publicos.style.borderLeftStyle = "none";
    button_pedidos_publicos.style.borderRightStyle = "none";

    button_pedidos_para_mim.style.border = "none";
    button_pedidos_para_mim.style.borderBottomStyle = "none";
    

    pedidos_publicos.style.display = "flex";
    pedidos_para_mim.style.display = "none";

});