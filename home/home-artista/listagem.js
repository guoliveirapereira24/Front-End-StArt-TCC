"use strict"

const tokenArtista = localStorage.getItem('tokenArtista');

// if(tokenArtista === "null" || tokenArtista === null || 
//    tokenArtista === "" || tokenArtista === "undefined") {
//   window.location.href = "../../index.html";
// } 

const buttonLogout = document.getElementById('logout');

function functionLogout() {
    localStorage.setItem('tokenCliente', null);
    localStorage.setItem('tokenArtista', null);
}

buttonLogout.addEventListener('click', functionLogout());

const button_pedidos_para_mim = document.getElementById("button-pedidos-para-mim");
const button_pedidos_publicos = document.getElementById("button-pedidos-publicos")

const pedidos_para_mim = document.getElementById("listagem_pedidos_para_mim");
const pedidos_publicos = document.getElementById("listagem_pedidos_publicos");


button_pedidos_para_mim.addEventListener("click", function(){

    button_pedidos_para_mim.style.border = "2px solid";
    button_pedidos_para_mim.style.borderTopStyle = "none";
    button_pedidos_para_mim.style.borderLeftStyle = "none";
    button_pedidos_para_mim.style.borderRightStyle = "none";

    button_pedidos_publicos.style.border = "none";
    button_pedidos_publicos.style.borderBottomStyle = "none";
    

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

function logout() {
    localStorage.setItem("tokenCliente", null);
    localStorage.setItem("tokenArtista", null);
    window.location.href = "../../login/index.html";
  }