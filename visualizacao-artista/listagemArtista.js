"use strict";

const tokenArtista = localStorage.getItem('tokenArtista');

const inputPesquisa = document.getElementById('inputPesquisa')

const listagem = document.getElementById("linha_artistas");

const listarArtistas = () => {

    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        }
    }

    fetch("http://localhost:3000/artista/listagemArtistas", config)
        .then(response => response.json())
        .then(data => {
            
            listagem.innerHTML = "";

            const artista = data.artista

            artista.map(artista => {

                const idArtista = artista.idArtista
                    
                const div = document.createElement('div')
                div.className = 'card'
                div.id = `artista ${idArtista}`

                var nomeArtista = artista.nomeArtistico.split(' ')[0]
                    if(artista.nomeArtistico.split(' ').length > 1){
                        nomeArtista += ' ' + artista.nomeArtistico.split(' ')[1]
                    }
                    if(artista.nomeArtistico.split(' ').length > 2){
                        nomeArtista += ' ' + artista.nomeArtistico.split(' ')[2]
                    }
                
                
                div.innerHTML = `
    
                <div class="img_artista">
                    <img src="${artista.fotoPerfilArtista}" id="img_perfil_artista" alt="" srcset="">
                </div>

                <div class="text_informacoes_artista">

                    <div class="nome_coracao">
                        <h2>${nomeArtista}</h2>
                    </div>

                    <div class="especialidades_avaliacao">
                    
                        <h2 class="especialidade_categoria">${artista.nomeEspecialidadeArtista}</h2>

                        <section class="avaliacao" id="avaliacaoArtista">
                        </section>

                    </div>
            
                </div>
                `

                listagem.appendChild(div)

                div.onclick = () => {
                    window.location.href = `./visualizar-perfil-artista/index.html?q=${idArtista}`
                }


                const getAvaliacaoArtista = (idArtista) => {

                    const configAvaliacao = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                            'Authorization' : `Bearer ${tokenArtista}`
                        }
                    } 
                
                    const avaliacao = document.getElementById(`avaliacaoArtista`);
                
                fetch(`http://localhost:3000/avaliacao/avaliacaoDeArtista/${idArtista}`, configAvaliacao)
                                .then((res) => res.json())
                                .then((data) => {
                                    const avaliacaoArtista = data.avaliacaoArtista;
                                    return avaliacaoArtista.map(avaliacaoArtista => {
                                        avaliacao.innerHTML = `
                                            <img src="img/estrela2.png" alt="">
                                            <p class="amarelo" id="avaliacaoArtista">${(avaliacaoArtista.notaArtista).toFixed(2)}</p>
                                        `
                                    })
                                })
                                .catch((err) => console.log(err))
                
                }

                getAvaliacaoArtista(idArtista)

            });
        });
}

listarArtistas();


inputPesquisa.addEventListener('keyup', () => {
    const pesquisa = inputPesquisa.value;
    listagem.innerHTML = "";

    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }

    if(pesquisa != ""){
        
        fetch(`http://localhost:3000/pesquisa/pesquisarArtista/${pesquisa}`, config)
        .then(response => response.json())
        .then(data => {
            
            listagem.innerHTML = "";
            console.log(data)

            const artista = data.artista

            artista.map(artista => {

                const idArtista = artista.idArtista
                    
                const div = document.createElement('div')
                div.className = 'card'
                div.id = `artista ${idArtista}`

                var nomeArtista = artista.nomeArtistico.split(' ')[0]
                    if(artista.nomeArtistico.split(' ').length > 1){
                        nomeArtista += ' ' + artista.nomeArtistico.split(' ')[1]
                    }
                    if(artista.nomeArtistico.split(' ').length > 2){
                        nomeArtista += ' ' + artista.nomeArtistico.split(' ')[2]
                    }
                
                
                div.innerHTML = `

                <div class="img_artista">
                    <img src="${artista.fotoPerfilArtista}" id="img_perfil_artista" alt="" srcset="">
                </div>

                <div class="text_informacoes_artista">

                    <div class="nome_coracao">
                        <h2>${nomeArtista}</h2>
                    </div>

                    <div class="especialidades_avaliacao">
                    
                        <h2 class="especialidade_categoria">${artista.nomeEspecialidadeArtista}</h2>

                        <section class="avaliacao" id="avaliacaoArtista">
                        </section>

                    </div>
            
                </div>
                `

                listagem.appendChild(div)


                const getAvaliacaoArtista = (idArtista) => {

                    const configAvaliacao = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                            'Authorization' : `Bearer ${tokenArtista}`
                        }
                    } 
                
                    const avaliacao = document.getElementById(`avaliacaoArtista`);
                
                fetch(`http://localhost:3000/avaliacao/avaliacaoDeArtista/${idArtista}`, configAvaliacao)
                                .then((res) => res.json())
                                .then((data) => {
                                    const avaliacaoArtista = data.avaliacaoArtista;
                                    return avaliacaoArtista.map(avaliacaoArtista => {
                                        avaliacao.innerHTML = `
                                            <img src="img/estrela2.png" alt="">
                                            <p class="amarelo" id="avaliacaoArtista">${(avaliacaoArtista.notaArtista).toFixed(2)}</p>
                                        `
                                    })
                                })
                                .catch((err) => console.log(err))
                
                }

                getAvaliacaoArtista(idArtista)

            });
        });
    } else {
        listarArtistas();
    }

});

