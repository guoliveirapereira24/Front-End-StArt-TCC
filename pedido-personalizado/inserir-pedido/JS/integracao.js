"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const inputDescricao = document.getElementById("textAreaDescricao");
const imgOpcional1 = document.getElementById("inputImage1");
const imgOpcional2 = document.getElementById("inputImage2");
const imgOpcional3 = document.getElementById("inputImage3");
var selectCategoria = document.getElementById("selectCategoria");
var selectGenero = document.getElementById("selectGenero");

const btnCadastrar = document.getElementById("btnCadastrar")

const inputPesquisa = document.getElementById("inputPesquisa");
var listagem_artistas_pesquisados = document.getElementById("listagem_artistas_pesquisados");
var arrayVisibilidade = [];

const fundo_modal_escolher_artista = document.getElementById("fundo_modal_escolher_artista");
const para_alguns_artistas = document.getElementById("para_alguns_artistas");

const select_visibilidade = document.getElementById("select_visibilidade");

const button_cancelar = document.getElementById("cancelar");
const btnConfimar = document.getElementById("btnConfirmar")
const div_artistas_escolhidos = document.getElementById("artistas_escolhidos");
const text_artistas_escolhidos = document.getElementById("text_artistas_escolhidos");

const btnEscolherArtista = document.getElementById("escolherArtista")


select_visibilidade.addEventListener("change", () => {
    const visibilidade = select_visibilidade.value;

    if (visibilidade == 0) {
        div_artistas_escolhidos.style.display = "flex";

    } else if (visibilidade == 1) {
        div_artistas_escolhidos.style.display = "none";
        arrayVisibilidade = []
    }
});
btnEscolherArtista.addEventListener("click", () => {
     fundo_modal_escolher_artista.style.display = "flex";
})

button_cancelar.addEventListener("click", () => {
    fundo_modal_escolher_artista.style.display = "none";
    div_artistas_escolhidos.style.display = "none";
    div_artistas_escolhidos.innerHTML = ""; 
    select_visibilidade.value = 1; 
    arrayVisibilidade = []
});

btnConfirmar.addEventListener("click", () => {
    fundo_modal_escolher_artista.style.display = "none";
})



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

                const idArtista = artista.idArtista
            
                const div = document.createElement('div');
                    div.className = 'card_artista';
                    div.id = "card " + idArtista;
                    div.innerHTML = `
                        <div class="div_img_artista">
                            <img class="img_artista" src="${artista.fotoPerfilArtista}" alt="">
                        </div>
                        <div class="div_nome_artista">
                            <p class="nome_artista">${nomeArtista}</p>
                        </div>

                        <div class="div_img_close" id="div_img_close ${idArtista}">
                        </div>
                    `;

                    listagem_artistas_pesquisados.appendChild(div);

                    const divButtons = document.getElementById(`div_img_close ${idArtista}`);

                    const btnAddArtistaVisibilidade = document.createElement('button');
                    btnAddArtistaVisibilidade.id = `btnAddArtistaVisibilidade ${idArtista}`;
                    btnAddArtistaVisibilidade.className = "add-artista";
                    btnAddArtistaVisibilidade.onclick = () => addArtista(idArtista);
                    btnAddArtistaVisibilidade.innerHTML = `<img class="img_add" src="./img/add.png" alt="">`;

                    const btnRemoveArtistaVisibilidade = document.createElement('button');
                    btnRemoveArtistaVisibilidade.id = `btnRemoveArtistaVisibilidade ${idArtista}`;
                    btnRemoveArtistaVisibilidade.className = "remove-artista";
                    btnRemoveArtistaVisibilidade.onclick = () => removeArtista(idArtista);
                    btnRemoveArtistaVisibilidade.innerHTML = `<img class="img_add" src="./img/close.png" alt="">`;

                    divButtons.appendChild(btnAddArtistaVisibilidade);
                    divButtons.appendChild(btnRemoveArtistaVisibilidade);

                    if(arrayVisibilidade[idArtista] == idArtista){
                        btnAddArtistaVisibilidade.style.display = 'none';
                        btnRemoveArtistaVisibilidade.style.display = 'flex';
                    } else if(arrayVisibilidade[idArtista] != idArtista){
                        btnAddArtistaVisibilidade.style.display = 'flex';
                        btnRemoveArtistaVisibilidade.style.display = 'none';
                    }

                    button_cancelar.addEventListener("click", () => {
                        btnAddArtistaVisibilidade.style.display = 'flex';
                        btnRemoveArtistaVisibilidade.style.display = 'none';
                    });

                });
            });
    }
   

});

const addArtista = (idArtista) => {
    const buttonAdd = document.getElementById(`btnAddArtistaVisibilidade ${idArtista}`);
    buttonAdd.style.display = 'none';

    const buttonRemove = document.getElementById(`btnRemoveArtistaVisibilidade ${idArtista}`);
    buttonRemove.style.display = 'flex';

    arrayVisibilidade.push(idArtista);
    console.log(arrayVisibilidade);
}

const removeArtista = (idArtista) => {
        const buttonAdd = document.getElementById(`btnAddArtistaVisibilidade ${idArtista}`);
        buttonAdd.style.display = 'flex';

        const buttonRemove = document.getElementById(`btnRemoveArtistaVisibilidade ${idArtista}`);
        buttonRemove.style.display = 'none';

        var myIndex = arrayVisibilidade.indexOf(idArtista);
        if (myIndex !== -1) {
            arrayVisibilidade.splice(myIndex, 1);
        }
        console.log(arrayVisibilidade);
}


const cadastrarPedido = (descricao, categoria, genero, imgOpcional1, imgOpcional2, 
    imgOpcional3, visibilidade) => {
        event.preventDefault();

        var imgIsSet = false;
    
        let formData =  new FormData();
    
        formData.append('descricao', descricao);
        formData.append('idEspecialidade', genero);
        formData.append('status', 'Publicada');
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
        window.location.href = "../../home/home-cliente/index.html"
    }
})




