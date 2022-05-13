"use strict";

const button_entrar_contato = document.getElementById("button_entrar_contato");

const editar_pedido =  document.getElementById("editar_pedido");

const visualizar_proposta = document.getElementById("visualizar_proposta");

editar_pedido.addEventListener("click", function(){

    window.location.href = "../../pedido-personalizado/";

});