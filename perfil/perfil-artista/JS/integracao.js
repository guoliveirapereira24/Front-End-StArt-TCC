"use strict";

const tokenArtista = localStorage.getItem('tokenArtista');

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
            
            console.log(data)
           
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
        
                <img id="icon_lapis" src="../img/lapis.png" alt="" srcset="">
        
            </div>
        
            <div class="informacoes_artista" id="informacoes_cliente_button_meus_pedidos">
                <div id="text_informacoes_artista" class="text_informacoes_artista">
                    <p>${artista.nomeCompleto}</p>
                    <section>
                        <p class="transparente">Especialidade:</p>
                        <p id="text_especialidade_artista">${artista.nomeEspecialidadeArtista}</p>
                    </section>
                    <section>
                        <p class="transparente">Nacionalidade:</p>
                        <p id="text_nacionalidade_artista">${artista.nacionalidade}</p>
                    </section>
                    <section>
                        <p class="transparente">País:</p>
                        <p id="text_pais_artistas">${artista.pais}</p>
                    </section>
                </div>
            </div>
            
            <p class="descricao_perfil_artista" id="descricao_perfil_artista">${artista.biografia}</p>

                `

console.log(artista.idArtista)
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

fetch(`http://localhost:3000/avaliacao/artista/${idArtista}`, configAvaliacao)
                .then((res) => res.json())
                .then((data) => {
                    const avaliacao = data.avaliacaoArtista;
                    console.log(data)
                    if(data.avaliacaoArtista == undefined) {
                        return avaliacaoArtista.innerHTML = 0 + ".0";
                    } else {
                        return avaliacaoArtista.innerHTML = avaliacao;
                    }
            });

}
