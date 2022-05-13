"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const query = location.search.slice(1)
const idPedido = query.split('=')[1]

const inputDescricao = document.getElementById("textAreaDescricao");
const imgOpcional1 = document.getElementById("inputImage1");
const imgOpcional2 = document.getElementById("inputImage2");
const imgOpcional3 = document.getElementById("inputImage3");
const imagePreview1 = document.getElementById("imagePreview1");
const imagePreview2 = document.getElementById("imagePreview2");
const imagePreview3 = document.getElementById("imagePreview3");
var selectCategoria = document.getElementById("selectCategoria");
var selectGenero = document.getElementById("selectGenero");
const btnEditar = document.getElementById("btnEditar")

var img1 = "";
var img2 = "";
var img3 = "";


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

const getPedido = () => {

    const configPedido = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenCliente}`
        }
    } 

    
    fetch(`http://localhost:3000/pedidosPersonalizados/${idPedido}`, configPedido)
        .then((res) => res.json())
        .then((data) => {
            const pedidoPersonalizado = data.pedidoPersonalizado;

            return pedidoPersonalizado.map(pedidoPersonalizado => {
                inputDescricao.value = pedidoPersonalizado.descricao;
                selectGenero.value = pedidoPersonalizado.idEspecialidade;
                selectCategoria.value = pedidoPersonalizado.idCategoria;

                img1 = pedidoPersonalizado.imagem1opcional;
                img2 = pedidoPersonalizado.imagem2opcional;
                img3 = pedidoPersonalizado.imagem3opcional;


                if (pedidoPersonalizado.imagem1obrigatoria != '') {
                    imagePreview1.src = `${pedidoPersonalizado.imagem1opcional}`;
                } else {
                    imagePreview1.src = './img/add.png'
                }

                if (pedidoPersonalizado.imagem2opcional != '') {
                    imagePreview2.src = `${pedidoPersonalizado.imagem2opcional}`;
                } else {
                    imagePreview2.src = './img/add.png'
                }

                if (pedidoPersonalizado.imagem3opcional != '') {
                    imagePreview3.src = `${pedidoPersonalizado.imagem3opcional}`;
                } else {
                    imagePreview3.src = './img/add.png'
                }

            });     
        });
}



const editarPedido = (descricao, categoria, genero, imgOpcional1, imgOpcional2, 
    imgOpcional3) => {
        event.preventDefault();

        var imgIsSet = false;
    
        let formData =  new FormData();
    
        formData.append('descricao', descricao);
        formData.append('idEspecialidade', genero);
        formData.append('idCategoria', categoria);

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
    
        } else {
            if (imagePreview1.src == img1) {
                formData.append('img1', imagePreview1.src);
            } else {
                formData.append('img1', '');
            }
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
    
        } else {
            if (imagePreview2.src == img2) {
                formData.append('img2', imagePreview2.src);
            } else {
                formData.append('img2', '');
            }
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
    
        } else {
            if (imagePreview3.src == img2) {
                formData.append('img3', imagePreview3.src);
            } else {
                formData.append('img3', '');
            }
        }

        console.log(imgOpcional1.files[0])
        console.log(imgOpcional2.files[0])
        console.log(imgOpcional3.files[0])
        
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokenCliente}`);
       
        
        const config = {
            method: 'PATCH',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        }
    
    
        fetch(`http://localhost:3000/pedidosPersonalizados/editarPedido/${idPedido}`, config)
            .then(response => response.text())
            .then((result) => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
 
    
}


btnEditar.addEventListener("click", () => {
    const descricao = inputDescricao.value;
    const categoria = selectCategoria.value;
    const genero = selectGenero.value;
    
    if (descricao == '' || categoria == '' || genero == '') {
       alert('Preencha todos os Campos Obrigatórios!');
    } else {
        editarPedido(descricao, categoria, genero, imgOpcional1, imgOpcional2, 
            imgOpcional3);
    }
})

getPedido();




