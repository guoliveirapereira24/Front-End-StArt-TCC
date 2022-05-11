"use strict";

const inputDescricao = document.getElementById("textAreaDescricao");
const imgOpcional1 = document.getElementById("inputImage1");
const imgOpcional2 = document.getElementById("inputImage2");
const imgOpcional3 = document.getElementById("inputImage3");
var selectCategoria = document.getElementById("selectCategoria");
var selectGenero = document.getElementById("selectGenero");

const inputPesquisa = document.getElementById("inputPesquisa");
var listagem_artistas_pesquisados = document.getElementById("listagem_artistas_pesquisados");
var arrayVisibilidade = {}

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


inputPesquisa.addEventListener('keyup', () => {
    const pesquisa = inputPesquisa.value;
    listagem_artistas_pesquisados.innerHTML = "";

    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }

    if(pesquisa != ""){
         fetch(`http://localhost:3000/pesquisa/pesquisarArtista/${pesquisa}`, config)
            .then((res) => res.json())
            .then((data) => {
                const artista = data.artista;

            
            return artista.map(artista => {
                var nomeArtista = artista.nomeArtista.split(' ')[0]
                if(artista.nomeArtista.split(' ').length > 1){
                    nomeArtista += ' ' + artista.nomeArtista.split(' ')[1]
                }
                if(artista.nomeArtista.split(' ').length > 2){
                    nomeArtista += ' ' + artista.nomeArtista.split(' ')[2]
                }
            
                const div = document.createElement('div');
                    div.className = 'card_artista';
                    div.id = "card " + artista.idArtista;
                    div.innerHTML = `
                        <div class="div_img_artista">
                            <img class="img_artista" src="${artista.fotoPerfilArtista}" alt="">
                        </div>
                        <div class="div_nome_artista">
                            <p class="nome_artista">${nomeArtista}</p>
                        </div>

                        <div class="div_img_close" id="div_img_close ${artista.idArtista}">
                        </div>
                    `;

                    listagem_artistas_pesquisados.appendChild(div);

                    const divButtons = document.getElementById(`div_img_close ${artista.idArtista}`);

                    const btnAddArtistaVisibilidade = document.createElement('button');
                    btnAddArtistaVisibilidade.id = `btnAddArtistaVisibilidade ${artista.idArtista}`;
                    btnAddArtistaVisibilidade.className = "add-artista";
                    btnAddArtistaVisibilidade.onclick = () => addArtista(artista.idArtista);
                    btnAddArtistaVisibilidade.innerHTML = `<img class="img_add" src="./img/add.png" alt="">`;

                    const btnRemoveArtistaVisibilidade = document.createElement('button');
                    btnRemoveArtistaVisibilidade.id = `btnRemoveArtistaVisibilidade ${artista.idArtista}`;
                    btnRemoveArtistaVisibilidade.className = "remove-artista";
                    btnRemoveArtistaVisibilidade.onclick = () => removeArtista(artista.idArtista);
                    btnRemoveArtistaVisibilidade.innerHTML = `<img class="img_add" src="./img/close.png" alt="">`;

                    divButtons.appendChild(btnAddArtistaVisibilidade);
                    divButtons.appendChild(btnRemoveArtistaVisibilidade);

                });
            });
    }
   

});

const addArtista = (idArtista) => {

    const buttonAdd = document.getElementById(`btnAddArtistaVisibilidade ${idArtista}`);
    buttonAdd.style.display = 'none';

    const buttonRemove = document.getElementById(`btnRemoveArtistaVisibilidade ${idArtista}`);
    buttonRemove.style.display = 'flex';

    arrayVisibilidade[idArtista] = idArtista;
    console.log(arrayVisibilidade);
}

const removeArtista = (idArtista) => {
        const buttonAdd = document.getElementById(`btnAddArtistaVisibilidade ${idArtista}`);
        buttonAdd.style.display = 'flex';

        const buttonRemove = document.getElementById(`btnRemoveArtistaVisibilidade ${idArtista}`);
        buttonRemove.style.display = 'none';

        delete arrayVisibilidade[idArtista];
        console.log(arrayVisibilidade);
}





