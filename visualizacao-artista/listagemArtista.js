"use strict";


// Função const para listar artistas no modal usando fetch e o método GET
const listarArtistas = () => {

    fetch("http://localhost:3000/artista/")
        .then(response => response.json())
        .then(data => {
            const listaArtistas = document.getElementById("linha_artistas");
            listaArtistas.innerHTML = "";

            const artista = data.artista

            artista.map(artista => {

                const div = document.createElement('div')
                div.className = 'card'
                div.id = `artista ${artista.idArtista}`
    
                const desconto = artista.desconto
                const preco = artista.preco
            
                const precoComDesconto = preco - ((preco * desconto) / 100)
    
                var nomeArtista = artista.nomeArtista.split(' ')[0]
                    if(artista.nomeArtista.split(' ').length > 1){
                        nomeArtista += ' ' + artista.nomeArtista.split(' ')[1]
                    }
                    if(artista.nomeArtista.split(' ').length > 2){
                        nomeArtista += ' ' + artista.nomeArtista.split(' ')[2]
                    }
                
                const idartista = artista.idartista
    
                div.innerHTML = `
    
                    <img src="${artista.imagem1obrigatoria}" alt="">
            
                    <div class="nome_artista_preco" id="">
                        <div class="nome_obra_artista_categoria_tecnica" id="informacoes_obra">
                            <div class="nome_obra_artista" >
                                <p id="nome_obra_favorita1">${artista.nomeObra}</p>
                                <p id="nome_artista_favorita1">${nomeArtista}</p>
                            </div>
                            
                            <div class="categoria_tecnica" id="categoria_tecnica_obra_favorita1">
                                <p id="categoria_obra_favorita1">${artista.nomeCategoria}</p>
                                <p>-</p>
                                <p id="tecnica_obra1">${artista.tecnica}</p>
                            </div>
                        </div>
            
                        <div class="img_favoritada_preco">
        
                            <input type="checkbox" id="favoritar ${idartista}" class="coracao"/>
                            <label for="favoritar ${idartista}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#19b425">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </label>
                            <div class="promocao" id="promocao ${idartista}">
                                <p class="porcentagem_desconto">${desconto}%</p>
                                <p class="preco_original">R$ ${preco.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <p class="preco_obra_favorita" id="preco_obra_favorita1">R$ ${precoComDesconto.toFixed(2).replace('.', ',')}</p>
        
                        </div>
        
                    </div>
                       
    
                `
                listagemObras.appendChild(div)
    
                const divDesconto = document.getElementById(`promocao ${idartista}`)
    

                listaArtistas.innerHTML += `
                    <div class="artista">
                        <img src="${artista.foto}" alt="${artista.nome}" class="foto-artista">
                        <div class="nome-artista">${artista.nome}</div>
                        <div class="botao-artista">
                            <button class="btn btn-primary" onclick="visualizarArtista('${artista.id}')">Ver mais</button>
                        </div>
                    </div>
                `;
            });
        });
}


