"use strict";

// const tokenArtista = localStorage.getItem('tokenArtista');
// if(tokenArtista === "null" || tokenArtista === null || 
//    tokenArtista === "" || tokenArtista === "undefined") {
//   window.location.href = "../../index.html";
// } 

const informacoesArtistaDiv = document.getElementById('informacoesArtistaDiv');

function getInformacoesArtista(){

    const configArtista = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    
    
    fetch('http://localhost:3000/artista/meuPerfil', configArtista)
        .then((res) => res.json())
        .then((data) => {
            const informacoesArtista = data.artista;
           
           return informacoesArtista.map(artista => {

                informacoesArtistaDiv.innerHTML = 
                `
                <div id="img_nome_avaliacao">
                <img src="../img/artista1.png" id="img_perfil_artista" alt="" srcset="">
        
                <div id="nome_avaliacao">
                   <h1>${artista.nomeArtistico}</h1>
                    <section id="avaliacao">
                        <img src="../img/estrela2.png" id="avaliacao" alt="" srcset="">
                        <p id="avaliacaoArtista" value="${artista.idArtista}"></p>
                    </section>
                </div>
        
                <img id="icon_lapis" src="../img/lapis.png" alt="" srcset="" onclick="window.location.href = '../editar-artista/index.html'">
        
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
            </div>
            
            <p class="descricao_perfil_artista" id="descricao_perfil_artista">${artista.biografia}</p>

                `


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
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    const avaliacaoArtista = document.getElementById('avaliacaoArtista');

fetch(`http://localhost:3000/avaliacao/avaliacaoDeArtista/${idArtista}`, configAvaliacao)
                .then((res) => res.json())
                .then((data) => {
                    const avaliacao = data.avaliacaoArtista;
                    if(data.avaliacaoArtista == null) {
                        return avaliacaoArtista.innerHTML = 0 + ".00";
                    } else {
                        return avaliacaoArtista.innerHTML = avaliacao.toFixed(2);
                    }
            });
    
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
