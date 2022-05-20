"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');
// if(tokenCliente === "null" || tokenCliente === null || 
// tokenCliente === "" || tokenCliente === "undefined") {
//   window.location.href = "../../index.html";
// } 

const informacoesClienteDiv = document.getElementById('informacoesClienteDiv');

function getInformacoesCliente(){

    const configCliente = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenCliente}`
        }
    } 

    
    
    fetch('http://localhost:3000/cliente/meuPerfil', configCliente)
        .then((res) => res.json())
        .then((data) => {
            const informacoesCliente = data.cliente;
           
           return informacoesCliente.map(cliente => {

                informacoesClienteDiv.innerHTML = 
                `
                <div id="img_nome_avaliacao">
                    <img src="${cliente.fotoPerfilCliente}" id="img_perfil_cliente" alt="" srcset="">

                    <div id="nome_avaliacao">
                        <h1>${cliente.nomeCompleto}</h1>
                        <section id="avaliacao">
                            <img src="../img/estrela2.png" id="avaliacao" alt="" srcset="">
                            <p id="avaliacaoCliente"></p>
                        </section>
                    
                    </div>

                    <img id="icon_lapis" src="../img/lapis.png" alt="" srcset="">

                </div>

                <div class="informacoes_cliente" id="informacoes_cliente_button_meus_pedidos">
                    <div id="text_informacoes_cliente" class="text_informacoes_cliente">
                        <p>${cliente.nomeCompleto}</p>
                        <section>
                            <p class="transparente">Preferência:</p>
                            <p id="text_preferencia_cliente">${cliente.preferencia}</p>
                        </section>
                        <section>
                            <p class="transparente">Nacionalidade:</p>
                            <p id="text_nacionalidade_cliente">${cliente.nacionalidade}</p>
                        </section>
                        <section>
                            <p class="transparente">País:</p>
                            <p id="text_pais">${cliente.pais}</p>
                        </section>
                    </div>
                    <button class="button_meus_pedidos" id="button_meus_pedidos">
                        Meus Pedidos
                    </button>

                </div>
                
                <p class="descricao_perfil_cliente" id="descricao_perfil_cliente">${cliente.biografia}</p>
                            `


            getAvaliacaoCliente(cliente.idCliente);

            const editPerfil = document.getElementById("icon_lapis")

            editPerfil.onclick = () => {
                window.location.href = "../editar-cliente/index.html"
            }

            const btnMeusPedidos = document.getElementById("button_meus_pedidos")

            btnMeusPedidos.addEventListener("click", () => {
                
                window.location.href = "./meus-pedidos/index.html"
            })

        });
    });

   
}

getInformacoesCliente();
    
function getAvaliacaoCliente(idCliente){

    const configAvaliacao = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    } 

    const divAvaliacaoCliente = document.getElementById('avaliacaoCliente');

fetch(`http://localhost:3000/avaliacao/avaliacaoDeCliente/${idCliente}`, configAvaliacao)
                .then((res) => res.json())
                .then((data) => {
                    const avaliacaoCliente = data.avaliacaoCliente;
                    return avaliacaoCliente.map(avaliacaoCliente => {
                        divAvaliacaoCliente.innerHTML = (avaliacaoCliente.notaCliente).toFixed(2);
                    })
            });

    const preferencia = document.getElementById('text_preferencia_cliente')
    const nacionalidade = document.getElementById('text_nacionalidade_cliente');
    const pais = document.getElementById('text_pais');
    const descricao = document.getElementById('descricao_perfil_cliente');

    if(nacionalidade.innerHTML == "null"){
        nacionalidade.innerHTML = "Não informado";
    }
    if(pais.innerHTML == "null"){
        pais.innerHTML = "Não informado";
    }
    if(preferencia.innerHTML == "null"){
        preferencia.innerHTML = "Não informado";
    }
    if(descricao.innerHTML == "null"){
        descricao.innerHTML = "";
    }

}


const listarArtistasParceiros = () => {

    const configArtistasParceiros = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenCliente}`
        }
    } 

fetch(`http://localhost:3000/diversas/artistasParceiros`, configArtistasParceiros)
                .then((res) => res.json())
                .then((data) => {
                    const artistasParceiros = data.artistasParceiros;
                    const listarArtistasParceiros = document.getElementById('listagem_artistas_parceiros')
                    return artistasParceiros.forEach(artistasParceiros => {

                        const div = document.createElement('div');
                        div.className = 'img_nome_artista';
                        div.id = artistasParceiros.idArtista;
                        div.innerHTML = `
                            <img src="${artistasParceiros.fotoPerfilArtista}" id="img_artista_parceiro1" alt="" class="img_artista_parceiro">
                            <p class="nome_artista_parceiro" id="${artistasParceiros.idArtista}">${artistasParceiros.nomeArtistico}</p> 
                        `
                        listarArtistasParceiros.appendChild(div)
                    })
                    
            });

}

listarArtistasParceiros();

const listarObrasFavoritas = () => {

    const configObrasFavoritas = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenCliente}`
        }
    } 

fetch(`http://localhost:3000/diversas/obrasFavoritas`, configObrasFavoritas)
                .then((res) => res.json())
                .then((data) => {
                    const obrasFavoritas = data.obrasFavoritas;
                    const listarObrasFavoritas = document.getElementById('listagem_obras_favoritas')
                    return obrasFavoritas.forEach(obrasFavoritas => {

                        const div = document.createElement('div');
                        div.className = 'obra_favorita';
                        div.id = obrasFavoritas.idObraPronta;

                        const idObraPronta = obrasFavoritas.idObraPronta

                        div.innerHTML = `
                            <img class="img_obra" src="${obrasFavoritas.imagem1obrigatoria}" alt="">

                            <div class="nome_artista_favorito_preco" id="">
                                <div class="nome_obra_artista_categoria_tecnica" id="informacoes_obra">
                                    <div class="nome_obra_artista" >
                                        <p id="nome_obra_favorita1">${obrasFavoritas.nomeObra}</p>
                                        <p id="nome_artista_favorita1">${obrasFavoritas.nomeArtistico}</p>
                                    </div>
                                    
                                    <div class="categoria_tecnica" id="categoria_tecnica_obra_favorita1">
                                        <p id="categoria_obra_favorita1">${obrasFavoritas.nomeCategoria}</p>
                                        <p>-</p>
                                        <p id="tecnica_obra1">${obrasFavoritas.tecnica}</p>
                                    </div>
                                </div>
                    
                                <div class="img_favoritada_preco">
                
                                    <input type="checkbox" id="favoritar ${idObraPronta}" class="coracao"/>
                                    <label for="favoritar ${idObraPronta}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#19b425">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </label>
                                    <p id="preco_obra_favorita">R$${(obrasFavoritas.preco).toFixed(2).replace('.', ',')}</p>
                
                                </div>
                
                            </div>
                        `
                        listarObrasFavoritas.appendChild(div)


                        const divFavoritar = document.getElementById(`favoritar ${idObraPronta}`)

                        divFavoritar.checked = true;

                        divFavoritar.addEventListener('change', () => {
                            favoritarDesfavoritar(`favoritar ${idObraPronta}`, idObraPronta)
                        });

                    })
                    
            });
}

listarObrasFavoritas()

const favoritarObra = (idObraPronta) => {

    const body = {
        idObraPronta: idObraPronta
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenCliente}`
        },
        body: JSON.stringify(body)
    }

    fetch(`http://localhost:3000/favoritarObras/favoritarObra`, config)
        .then((res) => res.json())
        .then((data) => {
        }
    );  
}

const deleteObraFavorita = (idObraPronta) => {
    const configObrasFavoritas = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenCliente}`
        }
    } 

    fetch(`http://localhost:3000/favoritarObras/desfavoritarObra/${idObraPronta}`, configObrasFavoritas)
        .then((res) => res.json())
        .then((data) => {
        }
    );
}

const favoritarDesfavoritar = (divFavoritar,idObraPronta) => {
                
    const favoritar = document.getElementById(divFavoritar)

    if(favoritar.checked == true) {
        favoritar.checked = true
        favoritarObra(idObraPronta)
    }else{
        favoritar.checked = false
        deleteObraFavorita(idObraPronta)
    }

}