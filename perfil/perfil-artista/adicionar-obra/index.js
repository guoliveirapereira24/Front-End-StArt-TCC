"use strict";

const inputNome = document.getElementById('inputNome');
const inputPreco = document.getElementById('inputPreco');
const inputQuantidade = document.getElementById('inputQuantidade');
const inputTecnica = document.getElementById('inputTecnica');
const inputDesconto = document.getElementById('inputDesconto');
const textAreaDescricao = document.getElementById('textAreaDescricao');
var selectExclusividade = document.getElementById('selectExclusividade');
var selectCategoria = document.getElementById('selectCategoria');
var selectSubcategoria = document.getElementById('selectSubcategoria');

const cadastrarObra = (
    nome, 
    preco,
    quantidade, 
    desconto, 
    tecnica, 
    descricao, 
    exclusividade,
    categoria,
    subCategoria) => {

    event.preventDefault();

    const artista = {
        "nome": nome,
        "preco": preco,
        "quantidade": quantidade,
        "desconto": desconto,
        "tecnica": tecnica,
        "descricao": descricao,
        "senha": senha,
        "exclusividade": exclusividade,
        "idCategoria": categoria,
		"idEspecialidade": subCategoria,
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artista)
    }
    
    fetch('http://localhost:3000/artista/cadastro', config)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('tokenArtista', data.response.artistaCadastrado.token); 
            window.location.href = "../cadastro_dados_pagamento/index.html";   
        });
} 