"use strict"

const cadastre_se= document.getElementById("cadastre-se");
const esqueceu_senha = document.getElementById("esqueceu_senha");

const container_cadastrar_como = document.getElementById("container_cadastrar_como");
const container_esqueceu_senha = document.getElementById("container_esqueceu_senha");

const container_reativar_conta = document.getElementById("container_reativar_conta");

const button_continuar_artista = document.getElementById("button_continuar_artista");

const button_continuar_cliente = document.getElementById("button_continuar_cliente");

const close_cadastrar_como = document.getElementById("close_cadastrar_como");
const close_esqueceu_senha = document.getElementById("close_esqueceu_senha");

cadastre_se.addEventListener("click", function(){

    container_cadastrar_como.style.display = "flex";

});
button_continuar_artista.addEventListener("click", function(){

    window.location.href = "../cadastro-artista/cadastro_artista";

});

button_continuar_cliente.addEventListener("click", function(){

    window.location.href = "../cadastro-cliente"

});

esqueceu_senha.addEventListener("click", function(){

    container_esqueceu_senha.style.display = "flex";

});

close_cadastrar_como.addEventListener("click", function(){
    container_cadastrar_como.style.display = "none";
});
close_esqueceu_senha.addEventListener("click", function(){
    container_esqueceu_senha.style.display = "none";
});