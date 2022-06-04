"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const query = location.search.slice(1)
const idArtista = query.split('=')[1];

const informacoesArtistaDiv = document.getElementById('informacoesArtistaDiv');

function getInformacoesArtista(){

    const configArtista = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    } 

    
    
    fetch(`http://localhost:3000/artista/${idArtista}`, configArtista)
        .then((res) => res.json())
        .then((data) => {
            const informacoesArtista = data.artista;
           
           return informacoesArtista.map(artista => {

                informacoesArtistaDiv.innerHTML = 
                `
                <div id="img_nome_avaliacao">
                <img src="${artista.fotoPerfilArtista}" id="img_perfil_artista" alt="" srcset="">
        
                <div id="nome_avaliacao">
                   <h1>${artista.nomeArtistico}</h1>
                    <section id="avaliacao">
                        <img src="../img/estrela2.png" id="avaliacao" alt="" srcset="">
                        <p id="avaliacaoArtista" value="${artista.idArtista}"></p>
                    </section>
                </div>
            
            <div class="botoes_doar_contatar">
                <button class="contatar" id="contatar">
                    <img class="img_contatar" src="../../home/img/contatar.png" alt="">
                    <p>Contatar</p>
                </button>

                <div class="doacao">
                    <img src="../../perfil/img/doar.png" alt="">
                    <p>Doar</p>
                </div>

            </div>
        

            </div>
        
            <div class="informacoes_artista" id="informacoes_cliente_button_meus_pedidos">
                <div id="text_informacoes_artista" class="text_informacoes_artista">
                    <p>${artista.nomeCompleto}</p>
                    <section>
                        <p class="transparente" id="especialidade-artista">Especialidade:</p>
                        <p id="text_especialidade_artista">${artista.nomeEspecialidadeArtista}</p>
                    </section>
                    <section>
                        <p class="transparente" id="nacionalidade-artista">Nacionalidade:</p>
                        <p id="text_nacionalidade_artista">${artista.nacionalidade}</p>
                    </section>
                    <section>
                        <p class="transparente" id="especialidade-artista">País:</p>
                        <p id="text_pais_artistas">${artista.pais}</p>
                    </section>
                </div>
                
                <button class="button_fazer_pedido" id="button_fazer_pedido">
                    Fazer Pedido
                </button>

            </div>
            
            <p class="descricao_perfil_artista" id="descricao_perfil_artista">${artista.biografia}</p>

                `

            const buttonFazerPedido = document.getElementById('button_fazer_pedido');

            buttonFazerPedido.addEventListener('click', () => {
                location.href = `./fazer-pedido/index.html?q=${artista.idArtista}`
            })

            const buttonContatar = document.getElementById(`contatar`);
            buttonContatar.addEventListener('click', () => {
                const idArtista = artista.idArtista;
                const configContatar = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${tokenCliente}`,
                        'Cache-Control': 'no-cache'
                    },
                    body: JSON.stringify({
                        idArtista: idArtista
                    })
                }

                fetch("http://localhost:3000/chat/chatCliente", configContatar)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        const idChat = data.idChat;
                        window.location.href = "../../chat/index.html?q=" + idChat;
                    })
            })


            getAvaliacaoArtista(artista.idArtista);
        });
    });

   
}

getInformacoesArtista();
    
function getAvaliacaoArtista(idArtista){

    const configAvaliacao = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    } 

    const divAvaliacaoArtista = document.getElementById('avaliacaoArtista');

fetch(`http://localhost:3000/avaliacao/avaliacaoDeArtista/${idArtista}`, configAvaliacao)
                .then((res) => res.json())
                .then((data) => {
                    const avaliacaoArtista = data.avaliacaoArtista;
                    return avaliacaoArtista.map(avaliacaoArtista => {
                       divAvaliacaoArtista.innerHTML = (avaliacaoArtista.notaArtista).toFixed(2);
                    })
                })

                   
    
const nacionalidade = document.getElementById('text_nacionalidade_artista');
const pais = document.getElementById('text_pais_artistas');
const descricao = document.getElementById('descricao_perfil_artista');

if(nacionalidade.innerHTML == "null"){
    nacionalidade.innerHTML = "Não informado";
}
if(pais.innerHTML == "null"){
    pais.innerHTML = "Não informado";
}
if(descricao.innerHTML == "null"){
    descricao.innerHTML = "";
}

}
