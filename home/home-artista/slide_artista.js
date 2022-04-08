"use strict"
const tela = document.getElementById("tela");
const recepcao = document.getElementById("recepcao");
const container_slide = document.getElementById("container-slide");
const destaque = document.getElementById("destaque");
const destaque_modal = document.getElementById("artistas-destaque");
const button_publicos = document.getElementById("button-pedidos-publicos");
const button_para_mim = document.getElementById("button-pedidos-para-mim");
const pedidos_categorias = document.getElementById("listagem_pedidos_genero")

var button_saiba_mais = document.getElementById("saiba-mais");
const button_ok = document.getElementById("ok");

button_saiba_mais.addEventListener("click", function(){

    recepcao.style.opacity = "50%";

    container_slide.style.opacity = "50%";

    destaque.style.opacity = "50%";

    button_publicos.style.opacity = "50%";

    button_para_mim.style.opacity = "50%";

    pedidos_categorias.style.opacity = "50%";

    destaque_modal.style.display = "flex";

});

button_ok.addEventListener("click", function(){

    recepcao.style.opacity = "100%"; 

    container_slide.style.opacity = "100%";

    destaque.style.opacity = "100%";

    button_publicos.style.opacity = "100%";

    button_para_mim.style.opacity = "100%";

    pedidos_categorias.style.opacity = "100%"

    destaque_modal.style.display = "none";


});

const slide2 = document.getElementById("slide2");
const descricao_slide2 = document.getElementById("descricao-slide2");

slide2.addEventListener("click", function(){

    slide2.style.opacity = "80%";
    descricao_slide2.style.display = "flex";
});


