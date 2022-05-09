"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const inputNacionalidade = document.getElementById("nacionalidade_cliente");
const selectPais = document.getElementById("selectPais")
const inputBiografia = document.getElementById("textAreaBiografia")
const selectPreferencia = document.getElementById("selectPreferencia");

const imgPerfil1 = document.querySelector("#imgPerfil1");
const urlImg = imgPerfil1;

const inputImg = document.getElementById('inputImage');
const btnSavePerfil = document.getElementById('buttonMeuPerfil');


const atualizarPerfil = (nacionalidade, pais, biografia, preferencia, imgPerfil, inputImgPerfil) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokenCliente}`);	

    var imgIsSet = false;

    var formdata = new FormData();
    formdata.append("nacionalidade", nacionalidade);
    formdata.append("pais", pais);
    formdata.append("biografia", biografia);
    formdata.append("preferencia", preferencia);
    formdata.append("imgPerfil", imgPerfil);


    if(inputImgPerfil.files[0] != undefined){
        imgIsSet = false
        const file = inputImgPerfil.files[0]
        const nameFile = file.name

        const fileReader = new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            imgIsSet = true
        }

        formdata.append('fotoPerfilCliente', inputImgPerfil.files[0], nameFile);

    } else{
        formdata.append('img1', urlImg.src);
    }


    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/cliente/perfil", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

btnSavePerfil.addEventListener('click', () => {
    const nacionalidade = inputNacionalidade.value;
    const pais = selectPais.value;
    const biografia = inputBiografia.value;
    const preferencia = selectPreferencia.value;
    const inputImgPerfil = inputImg;
    const imgPerfil = urlImg.src;
    
    if (nacionalidade == '' || pais == '' || biografia == '' || preferencia == '') {
        alert('Preencha todos os campos');
    } else {
        atualizarPerfil(nacionalidade, pais, biografia, preferencia, imgPerfil, inputImgPerfil);
    }
})

const imagePreview = (idFile, idImagem) => {
    const file = document.getElementById(idFile).files[0]
    const preview = document.getElementById(idImagem)
    const fileReader = new FileReader()

    if (file) {
        fileReader.readAsDataURL(file)
    } else {
        preview.src = urlImg.getAttribute('src')
    }

    fileReader.onloadend = () => (preview.src = fileReader.result)
}


const configureImagePreview = () => {
    const inputImage = document.querySelector('#inputImage')
    const handleFileImage = () => imagePreview('inputImage', 'imgPerfil1')
    inputImage.addEventListener('change', handleFileImage)
}


configureImagePreview();
