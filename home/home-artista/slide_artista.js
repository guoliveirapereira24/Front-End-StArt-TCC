"use strict"
const tela = document.getElementById("tela");
const recepcao = document.getElementById("recepcao");
const container_slide = document.getElementById("container-slide");
const destaque = document.getElementById("destaque");
const destaque_modal = document.getElementById("artistas-destaque");
const publicos = document.getElementById("publicos");
const para_mim = document.getElementById("para-mim");

var button_saiba_mais = document.getElementById("saiba-mais");
const button_ok = document.getElementById("ok");

button_saiba_mais.addEventListener("click", function(){

    recepcao.style.opacity = "50%";

    container_slide.style.opacity = "50%";

    destaque.style.opacity = "50%";

    publicos.style.opacity = "50%";

    para_mim.style.opacity = "50%";

    destaque_modal.style.display = "flex";

});

button_ok.addEventListener("click", function(){

    recepcao.style.opacity = "100%"; 

    container_slide.style.opacity = "100%";

    destaque.style.opacity = "100%";

    publicos.style.opacity = "100%";

    para_mim.style.opacity = "100%";

    destaque_modal.style.display = "none";


});

const slide2 = document.getElementById("slide2");
const descricao_slide2 = document.getElementById("descricao-slide2");

slide2.addEventListener("click", function(){

    slide2.style.opacity = "80%";
    descricao_slide2.style.display = "flex";
});


