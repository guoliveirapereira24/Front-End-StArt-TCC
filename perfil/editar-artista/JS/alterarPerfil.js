"use strict";

const tokenArtista = localStorage.getItem('tokenArtista');

const inputNomeCompleto = document.getElementById("nome_completo_artista");
const inputNomeArtistico = document.getElementById("nome_artistico");
const inputNacionalidade = document.getElementById("nacionalidade_artista");
const selectPais = document.getElementById("selectPais")
const inputBiografia = document.getElementById("textAreaBiografia")
const inputDataNascimento = document.getElementById("data_nascimento_artista");
const inputTelefoneCelular = document.getElementById("telefone_artista");
const inputEmail = document.getElementById("email_artista");
const selectEspecialidade = document.getElementById("selectEspecialidadeArtista");
const imgPerfil1 = document.querySelector("#imgPerfil1");
const urlImg = imgPerfil1;

const inputImg = document.getElementById('inputImage');
const btnSavePerfil = document.getElementById('buttonMeuPerfil');


const atualizarPerfil = (nomeArtistico, nacionalidade, pais, biografia, idEspecialidadeArtista, imgPerfil, inputImgPerfil) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokenArtista}`);	

    var imgIsSet = false;

    var formdata = new FormData();
    formdata.append("nomeArtistico", nomeArtistico);
    formdata.append("nacionalidade", nacionalidade);
    formdata.append("pais", pais);
    formdata.append("biografia", biografia);
    formdata.append("idEspecialidadeArtista", idEspecialidadeArtista);
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

        formdata.append('fotoPerfilArtista', inputImgPerfil.files[0], nameFile);

    }


    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/artista/perfil", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

btnSavePerfil.addEventListener('click', () => {
    const nomeArtistico = inputNomeArtistico.value;
    const nacionalidade = inputNacionalidade.value;
    const pais = selectPais.value;
    const biografia = inputBiografia.value;
    const idEspecialidadeArtista = selectEspecialidade.value;
    const inputImgPerfil = inputImg;
    const imgPerfil = urlImg.src;
    
    if (nomeArtistico == '' || nacionalidade == '' || pais == '' || biografia == '' || idEspecialidadeArtista == '') {
        alert('Preencha todos os campos');
    } else {
        atualizarPerfil(nomeArtistico, nacionalidade, pais, biografia, idEspecialidadeArtista, imgPerfil, inputImgPerfil);
    }
})

const imagePreview = (idFile, idImagem) => {
    const file = document.getElementById(idFile).files[0]
    const preview = document.getElementById(idImagem)
    const fileReader = new FileReader()

    if (file) {
        fileReader.readAsDataURL(file)
    } else {
        preview.src = imgPerfil
    }

    fileReader.onloadend = () => (preview.src = fileReader.result)
}


const configureImagePreview = () => {
    const inputImage = document.querySelector('#inputImage')
    const handleFileImage = () => imagePreview('inputImage', 'imgPerfil1')
    inputImage.addEventListener('change', handleFileImage)
}


configureImagePreview();


