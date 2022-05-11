"use strict";

const fundo_modal_escolher_artista = document.getElementById("fundo_modal_escolher_artista");
const para_alguns_artistas = document.getElementById("para_alguns_artistas");

const select_visibilidade = document.getElementById("select_visibilidade");

const button_cancelar = document.getElementById("cancelar");
const div_artistas_escolhidos = document.getElementById("artistas_escolhidos");
const text_artistas_escolhidos = document.getElementById("text_artistas_escolhidos");


select_visibilidade.addEventListener("change", () => {
    const visibilidade = select_visibilidade.value;

    if (visibilidade == 0) {
        fundo_modal_escolher_artista.style.display = "flex";
        div_artistas_escolhidos.style.display = "flex";
        text_artistas_escolhidos.innerText = "Escolha um artista";
    }
});

button_cancelar.addEventListener("click", () => {
    fundo_modal_escolher_artista.style.display = "none";
    div_artistas_escolhidos.style.display = "none";
    select_visibilidade.value = 1;
});
