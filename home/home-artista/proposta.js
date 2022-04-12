const button_fazer_proposta = document.getElementById("fazer_proposta");

const button_cancelar_proposta_pedido_personalizado = document.getElementById("button_cancelar_proposta_pedido_personalizado");

const modal_proposta = document.getElementById("modal_proposta");

const listagem_pedidos_genero = document.getElementById("listagem_pedidos_genero");

const opcao_pedidos = document.getElementById("opcao-pedidos");

button_fazer_proposta.addEventListener("click", function(){

    modal_proposta.style.display = "flex";

    opcao_pedidos.style.display = "none";
    listagem_pedidos_genero.style.display = "none";
});