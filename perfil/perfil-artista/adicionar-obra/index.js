"use strict";

import { imagePreview } from '../../../imagePreview.js';

const tokenArtista = localStorage.getItem('tokenArtista');
const inputNome = document.getElementById('inputNome');
const inputPreco = document.getElementById('inputPreco');
const inputQuantidade = document.getElementById('inputQuantidade');
const inputTecnica = document.getElementById('inputTecnica');
const inputDesconto = document.getElementById('inputDesconto');
const textAreaDescricao = document.getElementById('textAreaDescricao');
var selectExclusividade = document.getElementById('selectExclusividade');
var selectCategoria = document.getElementById('selectCategoria');
var selectSubcategoria = document.getElementById('selectSubCategoria');
const btnAddObra = document.getElementById('button_adicionar_obra');
const msgErro = document.getElementById('msgErro');
const inputImg1Obrigatoria = document.getElementById('inputImage1');
const inputImg2Opcional = document.getElementById('inputImage2');
const inputImg3Opcional = document.getElementById('inputImage3');
const inputImg4Opcional = document.getElementById('inputImage4');
const inputImg5Opcional = document.getElementById('inputImage5');
const inputImg6Opcional = document.getElementById('inputImage6');

const configureImagePreview = () => {
    const inputImage1 = document.querySelector('#inputImage1')
    const handleFileImage1 = () => imagePreview('inputImage1', 'imagePreview1')
    inputImage1.addEventListener('change', handleFileImage1)

    const inputImage2 = document.querySelector('#inputImage2')
    const handleFileImage2 = () => imagePreview('inputImage2', 'imagePreview2')
    inputImage2.addEventListener('change', handleFileImage2)

    const inputImage3 = document.querySelector('#inputImage3')
    const handleFileImage3 = () => imagePreview('inputImage3', 'imagePreview3')
    inputImage3.addEventListener('change', handleFileImage3)

    const inputImage4 = document.querySelector('#inputImage4')
    const handleFileImage4 = () => imagePreview('inputImage4', 'imagePreview4')
    inputImage4.addEventListener('change', handleFileImage4)

    const inputImage5 = document.querySelector('#inputImage5')
    const handleFileImage5 = () => imagePreview('inputImage5', 'imagePreview5')
    inputImage5.addEventListener('change', handleFileImage5)

    const inputImage6 = document.querySelector('#inputImage6')
    const handleFileImage6 = () => imagePreview('inputImage6', 'imagePreview6')
    inputImage6.addEventListener('change', handleFileImage6)
}

const cadastrarObra = (
    nome, 
    preco,
    quantidade, 
    desconto, 
    tecnica, 
    descricao, 
    exclusividade,
    categoria,
    subCategoria,
    inputImgObrigatoria,
    inputImg2Opcional,
    inputImg3Opcional,
    inputImg4Opcional,
    inputImg5Opcional,
    inputImg6Opcional) => {

    event.preventDefault();
    const obra =  new FormData();

    obra.append('nomeObra', nome);
    obra.append('preco', preco);
    obra.append('quantidade', quantidade);
    obra.append('desconto', desconto);
    obra.append('tecnica', tecnica);
    obra.append('descricao', descricao);
    obra.append('eExclusiva', exclusividade);
    obra.append('idCategoria', categoria);
    obra.append('idEspecialidade', subCategoria);
    obra.append('imagem1obrigatoria', inputImgObrigatoria, 'imagem1obrigatoria');
    obra.append('imagem2opcional', inputImg2Opcional, 'imagem2opcional');
    obra.append('imagem3opcional', inputImg3Opcional, 'imagem3opcional');
    obra.append('imagem4opcional', inputImg4Opcional, 'imagem4opcional');
    obra.append('imagem5opcional', inputImg5Opcional, 'imagem5opcional');
    obra.append('imagem6opcional', inputImg6Opcional, 'imagem6opcional');
    
    
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Content-Length': '<calculated when request is sent>',
            'Host': '<calculated when request is sent>',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${tokenArtista}`
        },
        body: obra
    }
    
    fetch('http://localhost:3000/obraPronta/inserirObra', config)
        .then((res) => res.json())
        .then((data) => {
            if (data.erro) {
                msgErro.innerText = data.erro;
            } 
            console.log(data);
        })
        .catch((err) => console.log(err));
} 

const getEspecialidades = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }
    
    fetch('http://localhost:3000/diversas/especialidades', config)
        .then((res) => res.json())
        .then((data) => {
            const especialidades = data.especialidades;
           
           return especialidades.forEach(especialidade => {
                const option = document.createElement('option');
                option.value = especialidade.idEspecialidade;
                option.innerText = especialidade.nomeEspecialidade;
                selectSubcategoria.appendChild(option);
            });
        });
}

const getCategorias = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }
    
    fetch('http://localhost:3000/diversas/categorias', config)
        .then((res) => res.json())
        .then((data) => {
            const categorias = data.categorias;
           
           return categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.idCategoria;
                option.innerText = categoria.nomeCategoria;
                selectCategoria.appendChild(option);
            });
        });
}

btnAddObra.addEventListener('click', () => {
    const nome = inputNome.value;
    const preco = inputPreco.value.toString();
    const quantidade = inputQuantidade.value.toString();
    const desconto = inputDesconto.value.toString();
    const tecnica = inputTecnica.value;
    const descricao = textAreaDescricao.value;
    const exclusividade = selectExclusividade.value;
    const categoria = selectCategoria.value;
    const subCategoria = selectSubcategoria.value;
    const inputImg1 = inputImg1Obrigatoria.files[0];
    const inputImg2 = inputImg2Opcional.files[0];
    const inputImg3 = inputImg3Opcional.files[0];
    const inputImg4 = inputImg4Opcional.files[0];
    const inputImg5 = inputImg5Opcional.files[0];
    const inputImg6 = inputImg6Opcional.files[0];
    
    if (nome == '' || preco == '' || quantidade == '' || desconto == '' || tecnica == '' || descricao == '' || exclusividade == '' || categoria == '' || subCategoria == '' || inputImg1 == null || inputImg1 == undefined) {
        msgErro.innerText = 'Preencha todos os Campos Obrigatórios!';
        msgErro.style.display = 'flex';
    } else {
        cadastrarObra(nome, preco, quantidade, desconto, tecnica, descricao, 
            exclusividade, categoria, subCategoria, inputImg1, inputImg2, 
            inputImg3, inputImg4, inputImg5, inputImg6);
    }
})

getEspecialidades();
getCategorias();
configureImagePreview()
