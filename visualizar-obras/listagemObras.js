"use-strict"

const tokenCliente = localStorage.getItem('tokenCliente');

const inputPesquisa = document.getElementById('inputPesquisa')
const listagemObras = document.getElementById('listagemObras')

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

const listarObrasFavoritas = (divFavoritar,idObraPronta) => {

    const configObrasFavoritas = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenCliente}`
        }
    }

    fetch(`http://localhost:3000/favoritarObras/${idObraPronta}`, configObrasFavoritas)
        .then((res) => res.json())
        .then((data) => {
            const obrasFavoritas = data;

            const favoritar = document.getElementById(divFavoritar)
            
            if(obrasFavoritas.favorita == true) {
                favoritar.checked = true
            }else{
                favoritar.checked = false
            }
        })
}

const getObras = () => {

    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }

    fetch('http://localhost:3000/obraPronta/Obras', config)
    .then(response => response.json())
    .then(data => {
        const obrasProntas = data.obrasProntas
        obrasProntas.map(obraPronta => {

            const idObraPronta = obraPronta.idObraPronta

            const div = document.createElement('div')
            div.className = 'obra'
            div.id = `obra ${obraPronta.idObraPronta}`
            div.onclick = () => {window.location.href = `./mais-informacoes/index.html?q=${idObraPronta}`}

            const desconto = obraPronta.desconto
            const preco = obraPronta.preco
        
            const precoComDesconto = preco - ((preco * desconto) / 100)

            var nomeArtista = obraPronta.nomeArtista.split(' ')[0]
                if(obraPronta.nomeArtista.split(' ').length > 1){
                    nomeArtista += ' ' + obraPronta.nomeArtista.split(' ')[1]
                }
                if(obraPronta.nomeArtista.split(' ').length > 2){
                    nomeArtista += ' ' + obraPronta.nomeArtista.split(' ')[2]
                }
            
            
            div.innerHTML = `

                <img src="${obraPronta.imagem1obrigatoria}" alt="">
        
                <div class="nome_artista_preco" id="">
                    <div class="nome_obra_artista_categoria_tecnica" id="informacoes_obra">
                        <div class="nome_obra_artista" >
                            <p id="nome_obra_favorita1">${obraPronta.nomeObra}</p>
                            <p id="nome_artista_favorita1">${nomeArtista}</p>
                        </div>
                        
                        <div class="categoria_tecnica" id="categoria_tecnica_obra_favorita1">
                            <p id="categoria_obra_favorita1">${obraPronta.nomeCategoria}</p>
                            <p>-</p>
                            <p id="tecnica_obra1">${obraPronta.tecnica}</p>
                        </div>
                    </div>
        
                    <div class="img_favoritada_preco">
    
                        <input type="checkbox" id="favoritar ${idObraPronta}" class="coracao"/>
                        <label for="favoritar ${idObraPronta}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#19b425">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </label>
                        <div class="promocao" id="promocao ${idObraPronta}">
                            <p class="porcentagem_desconto">${desconto}%</p>
                            <p class="preco_original">R$ ${preco.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <p class="preco_obra_favorita" id="preco_obra_favorita1">R$ ${precoComDesconto.toFixed(2).replace('.', ',')}</p>
    
                    </div>
    
                </div>
                   

            `
            listagemObras.appendChild(div)

            const divDesconto = document.getElementById(`promocao ${idObraPronta}`)

            if(obraPronta.desconto == 0){
                divDesconto.className = 'promocao_desativada'
            }

            listarObrasFavoritas(`favoritar ${idObraPronta}`,idObraPronta)

            const divFavoritar = document.getElementById(`favoritar ${idObraPronta}`)

            divFavoritar.addEventListener('change', () => {
                favoritarDesfavoritar(`favoritar ${idObraPronta}`, idObraPronta)
            });

        })
    })

}

getObras();

inputPesquisa.addEventListener('keyup', () => {
    const pesquisa = inputPesquisa.value;
    listagemObras.innerHTML = "";

    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }

    if(pesquisa != ""){
         fetch(`http://localhost:3000/pesquisa/pesquisarObraPronta/${pesquisa}`, config)
            .then((res) => res.json())
            .then((data) => {
                const obrasProntas = data.obrasProntas
                obrasProntas.map(obraPronta => {

                    const idObraPronta = obraPronta.idObraPronta
        
                    const div = document.createElement('div')
                    div.className = 'obra'
                    div.id = `obra ${obraPronta.idObraPronta}`
                    div.onclick = () => {window.location.href = `./mais-informacoes/index.html?q=${idObraPronta}`}
        
                    const desconto = obraPronta.desconto
                    const preco = obraPronta.preco
                
                    const precoComDesconto = preco - ((preco * desconto) / 100)
        
                    var nomeArtista = obraPronta.nomeArtista.split(' ')[0]
                        if(obraPronta.nomeArtista.split(' ').length > 1){
                            nomeArtista += ' ' + obraPronta.nomeArtista.split(' ')[1]
                        }
                        if(obraPronta.nomeArtista.split(' ').length > 2){
                            nomeArtista += ' ' + obraPronta.nomeArtista.split(' ')[2]
                        }
                    
                    
                    div.innerHTML = `
        
                        <img src="${obraPronta.imagem1obrigatoria}" alt="">
                
                        <div class="nome_artista_preco" id="">
                            <div class="nome_obra_artista_categoria_tecnica" id="informacoes_obra">
                                <div class="nome_obra_artista" >
                                    <p id="nome_obra_favorita1">${obraPronta.nomeObra}</p>
                                    <p id="nome_artista_favorita1">${nomeArtista}</p>
                                </div>
                                
                                <div class="categoria_tecnica" id="categoria_tecnica_obra_favorita1">
                                    <p id="categoria_obra_favorita1">${obraPronta.nomeCategoria}</p>
                                    <p>-</p>
                                    <p id="tecnica_obra1">${obraPronta.tecnica}</p>
                                </div>
                            </div>
                
                            <div class="img_favoritada_preco">
            
                                <input type="checkbox" id="favoritar ${idObraPronta}" class="coracao"/>
                                <label for="favoritar ${idObraPronta}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#19b425">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </label>
                                <div class="promocao" id="promocao ${idObraPronta}">
                                    <p class="porcentagem_desconto">${desconto}%</p>
                                    <p class="preco_original">R$ ${preco.toFixed(2).replace('.', ',')}</p>
                                </div>
                                <p class="preco_obra_favorita" id="preco_obra_favorita1">R$ ${precoComDesconto.toFixed(2).replace('.', ',')}</p>
            
                            </div>
            
                        </div>
                           
        
                    `
                    listagemObras.appendChild(div)
        
                    const divDesconto = document.getElementById(`promocao ${idObraPronta}`)
        
                    if(obraPronta.desconto == 0){
                        divDesconto.className = 'promocao_desativada'
                    }
        
                    listarObrasFavoritas(`favoritar ${idObraPronta}`,idObraPronta)
        
                    const divFavoritar = document.getElementById(`favoritar ${idObraPronta}`)
        
                    divFavoritar.addEventListener('change', () => {
                        favoritarDesfavoritar(`favoritar ${idObraPronta}`, idObraPronta)
                    });
        
                })
            })
        
        }else{
            getObras();
        }
   

});