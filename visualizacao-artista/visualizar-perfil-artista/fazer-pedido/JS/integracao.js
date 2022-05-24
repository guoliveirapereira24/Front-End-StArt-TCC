"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const query = location.search.slice(1)
const idArtista = query.split('=')[1]

const inputDescricao = document.getElementById("textAreaDescricao");
const imgOpcional1 = document.getElementById("inputImage1");
const imgOpcional2 = document.getElementById("inputImage2");
const imgOpcional3 = document.getElementById("inputImage3");
var selectCategoria = document.getElementById("selectCategoria");
var selectGenero = document.getElementById("selectGenero");

const btnCadastrar = document.getElementById("btnCadastrar")

var arrayVisibilidade = [];
arrayVisibilidade.push(idArtista);

const imagePreview = (idFile, idImagem) => {
    const file = document.getElementById(idFile).files[0]
    const preview = document.getElementById(idImagem)
    const fileReader = new FileReader()

    if (file) {
        fileReader.readAsDataURL(file)
    } else {
        preview.src = './img/add.png'
    }

    fileReader.onloadend = () => (preview.src = fileReader.result)
}

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
}

configureImagePreview()


const cadastrarPedido = (descricao, categoria, genero, imgOpcional1, imgOpcional2, 
    imgOpcional3, visibilidade) => {
        event.preventDefault();

        var imgIsSet = false;
    
        let formData =  new FormData();
    
        formData.append('descricao', descricao);
        formData.append('idEspecialidade', genero);
        formData.append('status', 'Publicado');
        formData.append('idCategoria', categoria);
        formData.append('visibilidadeArray', `{ "array": [${visibilidade}] }`);

        console.log(formData);
   
        console.log(imgOpcional1.files[0])
        if(imgOpcional1.files[0] != undefined){
            imgIsSet = false
            const file = imgOpcional1.files[0]
            const nameFile = file.name
    
            const fileReader = new FileReader(file)
            fileReader.readAsDataURL(file)
            fileReader.onloadend = () => {
                imgIsSet = true
            }
    
                formData.append('imagem1opcional', imgOpcional1.files[0], nameFile);
    
        }
        if(imgOpcional2.files[0] != undefined){
            imgIsSet = false
            const file = imgOpcional2.files[0]
            const nameFile = file.name
    
            const fileReader = new FileReader(file)
            fileReader.readAsDataURL(file)
            fileReader.onloadend = () => {
                imgIsSet = true
            }
            
            formData.append('imagem2opcional', imgOpcional2.files[0], nameFile);
    
        }
        if(imgOpcional3.files[0] != undefined){  
            imgIsSet = false
            const file = imgOpcional3.files[0]
            const nameFile = file.name
    
            const fileReader = new FileReader(file)
            fileReader.readAsDataURL(file)
            fileReader.onloadend = () => {
                imgIsSet = true
            }
    
    
            formData.append('imagem3opcional', imgOpcional3.files[0], nameFile);
    
        }

    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokenCliente}`);
       
        
        const config = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        }
    
    
        fetch('http://localhost:3000/pedidosPersonalizados/cadastrarPedido', config)
            .then(response => response.text())
            .then((result) => {
                console.log(result)
                window.location.href = `../index.html?q=${idArtista}`;
            })
            .catch(error => console.log('error', error));
 
    
}


btnCadastrar.addEventListener("click", () => {
    const descricao = inputDescricao.value;
    const categoria = selectCategoria.value;
    const genero = selectGenero.value;
    
    if (descricao == '' || categoria == '' || genero == '') {
       alert('Preencha todos os Campos Obrigatórios!');
    } else {
        cadastrarPedido(descricao, categoria, genero, imgOpcional1, imgOpcional2, 
            imgOpcional3, arrayVisibilidade);
    }
})




