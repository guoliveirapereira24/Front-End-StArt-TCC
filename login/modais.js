"use strict"

const cadastre_se= document.getElementById("cadastre-se");
const esqueceu_senha = document.getElementById("esqueceu_senha");

const fundo_cadastrar_como = document.getElementById("fundo_cadastrar_como");

const fundo_esqueceu_senha = document.getElementById("fundo_esqueceu_senha");

const container_cadastrar_como = document.getElementById("container_cadastrar_como");
const container_esqueceu_senha = document.getElementById("container_esqueceu_senha");

const container_reativar_conta = document.getElementById("container_reativar_conta");

const button_continuar_artista = document.getElementById("button_continuar_artista");

const button_continuar_cliente = document.getElementById("button_continuar_cliente");

const close_cadastrar_como = document.getElementById("close_cadastrar_como");
const close_esqueceu_senha = document.getElementById("close_esqueceu_senha");

cadastre_se.addEventListener("click", function(){
    fundo_cadastrar_como.style.display = "flex";
    container_cadastrar_como.style.display = "flex";

});
button_continuar_artista.addEventListener("click", function(){

    window.location.href = "../cadastro-artista/cadastro_artista/index.html";

});

button_continuar_cliente.addEventListener("click", function(){

    window.location.href = "../cadastro-cliente/index.html";

});

esqueceu_senha.addEventListener("click", function(){
    fundo_esqueceu_senha.style.display = "flex";
    container_esqueceu_senha.style.display = "flex";

});

close_cadastrar_como.addEventListener("click", function(){
    fundo_cadastrar_como.style.display = "none";
    container_cadastrar_como.style.display = "none";
});
close_esqueceu_senha.addEventListener("click", function(){
    fundo_esqueceu_senha.style.display = "none";
    container_esqueceu_senha.style.display = "none";
});