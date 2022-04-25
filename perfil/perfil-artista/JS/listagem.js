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

const icon_editar = document.getElementById("icon_lapis");

icon_editar.addEventListener("click", function(){
    window.location.href = "../editar-artista/index.html"

});

const button_delete = document.getElementById("button_delete");
const modal_excluir_obra = document.getElementById("modal_excluir_obra");
const button_negar_exclusao_obra = document.getElementById("button_negar_exclusao_obra");

button_delete.addEventListener("click", function(){

    modal_excluir_obra.style.display = "flex";
    
});
button_negar_exclusao_obra.addEventListener("click", function(){

    modal_excluir_obra.style.display = "none";
    
});

const modal_ver_pedido = document.getElementById("modal_ver_pedido");
const fechar = document.getElementById("fechar");
const button_ver_pedido= document.getElementById("button_ver_pedido");

button_ver_pedido.addEventListener("click", function(){
    
    modal_ver_pedido.style.display = "flex";

});
fechar.addEventListener("click", function(){
    
    modal_ver_pedido.style.display = "none";

});

const modal_excluir_proposta = document.getElementById("modal_excluir_proposta");
const excluir_proposta = document.getElementById("excluir_proposta");
const button_negar_exclusao_proposta = document.getElementById("button_negar_exclusao_proposta");

excluir_proposta.addEventListener("click", function(){

    modal_excluir_proposta.style.display = "flex";

});
button_negar_exclusao_proposta.addEventListener("click", function(){

    modal_excluir_proposta.style.display = "none";

});
