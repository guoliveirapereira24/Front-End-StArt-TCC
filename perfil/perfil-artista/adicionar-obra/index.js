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
    inputImg1,
    inputImg2,
    inputImg3,
    inputImg4,
    inputImg5,
    inputImg6) => {

    event.preventDefault();

    var imgIsSet = false;

    var nameimg1 = '';
    var nameimg2 = '';
    var nameimg3 = '';
    var nameimg4 = '';
    var nameimg5 = '';
    var nameimg6 = '';


    let formData =  new FormData();

    formData.append('nomeObra', nome);
    formData.append('preco', preco);
    formData.append('quantidade', quantidade);
    formData.append('desconto', desconto);
    formData.append('tecnica', tecnica);
    formData.append('descricao', descricao);
    formData.append('eExclusiva', exclusividade);
    formData.append('idCategoria', categoria);
    formData.append('idEspecialidade', subCategoria)
    
    if(inputImg1.files[0] != undefined){
        imgIsSet = false
        const file = inputImg1.files[0]
        const nameFile = file.name

        const fileReader = new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            imgIsSet = true
        }

            formData.append('imagem1obrigatoria', inputImg1.files[0], nameFile);

    }
    if(inputImg2.files[0] != undefined){
        imgIsSet = false
        const file = inputImg2.files[0]
        const nameFile = file.name

        const fileReader = new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            imgIsSet = true
        }
        
        formData.append('imagem2opcional', inputImg1.files[0], nameFile);

    }
    if(inputImg3.files[0] != undefined){  
        imgIsSet = false
        const file = inputImg3.files[0]
        const nameFile = file.name

        const fileReader = new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            imgIsSet = true
        }


        formData.append('imagem3opcional', inputImg3.files[0], nameFile);

    }
    if(inputImg4.files[0] != undefined){
        imgIsSet = false
        const file = inputImg4.files[0]
        const nameFile = file.name

        const fileReader = new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            imgIsSet = true
        }

        formData.append('imagem4opcional', inputImg4.files[0], nameFile);

    }
    if(inputImg5.files[0] != undefined){
        imgIsSet = false
        const file = inputImg5.files[0]
        const nameFile = file.name

        const fileReader = new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            imgIsSet = true
        }

        formData.append('imagem5opcional', inputImg5.files[0], nameFile);

    }
    if(inputImg6.files[0] != undefined){
        imgIsSet = false
        const file = inputImg6.files[0]
        const nameFile = file.name

        const fileReader = new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            imgIsSet = true
        }

        formData.append('imagem6opcional', inputImg6.files[0], nameFile);

    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokenArtista}`);
   
    
    const config = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    }


    fetch('http://localhost:3000/obraPronta/inserirObra', config)
        .then(response => response.text())
        .then((result) => {
            window.location.href = "../index.html"
        })
        .catch(error => console.log('error', error));
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

    console.log(nome, preco, quantidade, desconto, tecnica, descricao, exclusividade, categoria, subCategoria);
    console.log(inputImg1Obrigatoria.files)

    
    if (nome == '' || preco == '' || quantidade == '' || desconto == '' || tecnica == '' || descricao == '' || exclusividade == '' || categoria == '' || subCategoria == '' || inputImg1Obrigatoria.files.length == 0) {
        msgErro.innerText = 'Preencha todos os Campos Obrigatórios!';
        msgErro.style.display = 'flex';
    } else {
        cadastrarObra(nome, preco, quantidade, desconto, tecnica, descricao, 
            exclusividade, categoria, subCategoria, inputImg1Obrigatoria, inputImg2Opcional, 
            inputImg3Opcional, inputImg4Opcional, inputImg5Opcional, inputImg6Opcional);
    }
})

getEspecialidades();
getCategorias();
configureImagePreview()
