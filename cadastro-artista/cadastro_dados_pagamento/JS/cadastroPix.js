"use strict"

const tokenArtista = localStorage.getItem('tokenArtista');

if(tokenArtista === "null" || tokenArtista === null || 
   tokenArtista === "" || tokenArtista === "undefined") {
  window.location.href = "../../index.html";
} 

const inputChavePix = document.getElementById('inputChavePix');
var selectTipoChave= document.getElementById('tipoChavePix');

const buttonCadastrarPix = document.getElementById('buttonCadastrarPix');


buttonCadastrarPix.addEventListener("click", function() {

    if (inputChavePix.value === "" ||
        selectTipoChave.value === ""){

        alert("Por favor, preencha todos os campos!");

    } else {

            cadastrarPix(
                inputChavePix.value.trim(),
                selectTipoChave.value
            );
    }  
    
});

const cadastrarPix = (tipoChave,chave) => {

    event.preventDefault();

    const pix = {
        "tipoChave": tipoChave,
        "chave": chave
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            
        },
        Authorization: `Bearer ${tokenArtista}`,
        body: JSON.stringify(pix)
    }
    
    fetch('http://localhost:3000/formaRecebimento/pix', config)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            window.location.href = "../../../home/home-artista/index.html";   
        });
} 
