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
const imagePreview1 = document.getElementById('imagePreview1');
const imagePreview2 = document.getElementById('imagePreview2');
const imagePreview3 = document.getElementById('imagePreview3');
const imagePreview4 = document.getElementById('imagePreview4');
const imagePreview5 = document.getElementById('imagePreview5');
const imagePreview6 = document.getElementById('imagePreview6');

var img1 = "";
var img2 = "";
var img3 = "";
var img4 = "";
var img5 = "";
var img6 = "";

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

const query = location.search.slice(1)
const idObra = query.split('=')[1]

const getObraPronta = () => {

    const configObras = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    
    fetch(`http://localhost:3000/obraPronta/${idObra}`, configObras)
        .then((res) => res.json())
        .then((data) => {
            const obraPronta = data.obraPronta;

            return obraPronta.map(obraPronta => {
                inputNome.value = obraPronta.nomeObra;
                inputPreco.value = obraPronta.preco;
                inputQuantidade.value = obraPronta.quantidade;
                inputTecnica.value = obraPronta.tecnica;
                inputDesconto.value = obraPronta.desconto;
                textAreaDescricao.innerHTML = obraPronta.descricao;

                let {idCategoria} = obraPronta;
                selectCategoria.value = idCategoria

                let {idEspecialidade} = obraPronta;
                selectSubcategoria.value = idEspecialidade

                let {eExclusiva} = obraPronta;
                selectExclusividade.options[eExclusiva].selected = true;

                img1 = obraPronta.imagem1obrigatoria;
                img2 = obraPronta.imagem2opcional;
                img3 = obraPronta.imagem3opcional;
                img4 = obraPronta.imagem4opcional;
                img5 = obraPronta.imagem5opcional;
                img6 = obraPronta.imagem6opcional;

                if (obraPronta.imagem1obrigatoria != '') {
                    imagePreview1.src = `${obraPronta.imagem1obrigatoria}`;
                } else {
                    imagePreview1.src = '../../img/plus2.png'
                }

                if (obraPronta.imagem2opcional != '') {
                    imagePreview2.src = `${obraPronta.imagem2opcional}`;
                } else {
                    imagePreview2.src = '../../img/plus2.png'
                }

                if (obraPronta.imagem3opcional != '') {
                    imagePreview3.src = `${obraPronta.imagem3opcional}`;
                } else {
                    imagePreview3.src = '../../img/plus2.png'
                }

                if (obraPronta.imagem4opcional != '') {
                    imagePreview4.src = `${obraPronta.imagem4opcional}`;
                } else {
                    imagePreview4.src = '../../img/plus2.png'
                }

                if (obraPronta.imagem5opcional != '') {
                    imagePreview5.src = `${obraPronta.imagem5opcional}`;
                } else {
                    imagePreview5.src = '../../img/plus2.png'
                }

                if (obraPronta.imagem6opcional != '') {
                    imagePreview6.src = `${obraPronta.imagem6opcional}`;
                } else {
                    imagePreview6.src = '../../img/plus2.png'
                }
    
            });     
        });
}


const editarObra = (
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

    } else{
        if (imagePreview1.src == img1) {
            formData.append('img1', imagePreview1.src);
        } else {
            formData.append('img1', '');
        }
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

    } else {
        if (imagePreview2.src == img2) {
            formData.append('img2', imagePreview2.src);
        } else {
            formData.append('img2', '');
        }
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

    } else {
        if (imagePreview3.src == img3) {
            formData.append('img3', imagePreview3.src);
        } else {
            formData.append('img3', '');
        }
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

    } else {
        if (imagePreview4.src == img4) {
            formData.append('img4', imagePreview4.src);
        } else {
            formData.append('img4', '');
        }
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

    } else {
        if (imagePreview5.src == img5) {
            formData.append('img5', imagePreview5.src);
        } else {
            formData.append('img5', '');
        }
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

    } else {
        if (imagePreview6.src == img6) {
            formData.append('img6', imagePreview6.src);
        } else {
            formData.append('img6', '');
        }
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokenArtista}`);
   
    
    const config = {
        method: 'PATCH',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    }


    fetch(`http://localhost:3000/obraPronta/atualizarObra/${idObra}`, config)
        .then(response => response.text())
        .then(result => window.location.href = '../index.html')
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
    const descricao = textAreaDescricao.innerHTML;
    const exclusividade = selectExclusividade.value;
    const categoria = selectCategoria.value;
    const subCategoria = selectSubcategoria.value;


//    return console.log(inputImg1Obrigatoria.files[0].name)
    
    if (nome == '' || preco == '' || quantidade == '' || desconto == '' || tecnica == '' || descricao == '' || exclusividade == '' || categoria == '' || subCategoria == '' || inputImg1Obrigatoria == null || inputImg1Obrigatoria == undefined) {
        msgErro.innerText = 'Preencha todos os Campos Obrigatórios!';
        msgErro.style.display = 'flex';
    } else {
        editarObra(nome, preco, quantidade, desconto, tecnica, descricao, 
            exclusividade, categoria, subCategoria, inputImg1Obrigatoria, inputImg2Opcional, 
            inputImg3Opcional, inputImg4Opcional, inputImg5Opcional, inputImg6Opcional);
    }
})

configureImagePreview()
getEspecialidades();
getCategorias();
getObraPronta();

