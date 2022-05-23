const tokenCliente = localStorage.getItem('tokenCliente')

const query = location.search.slice(1)
const idObra = query.split('=')[1]


const getAvaliacaoArtista = (idArtista) => {

    const configAvaliacao = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    } 

    const avaliacao = document.getElementById(`notaArtista`);

    fetch(`http://localhost:3000/avaliacao/avaliacaoDeArtista/${idArtista}`, configAvaliacao)
            .then((res) => res.json())
            .then((data) => {
                const avaliacaoArtista = data.avaliacaoArtista;
                return avaliacaoArtista.map(avaliacaoArtista => {
                    avaliacao.innerHTML = (avaliacaoArtista.notaArtista).toFixed(2)
                })
            })
            .catch((err) => console.log(err))

}



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

const listarObra = () => {

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenCliente}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }

    // fazer fetch de obra pronta por idObra
    fetch(`http://localhost:3000/obraPronta/${idObra}`, config)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const obraPronta = data.obraPronta

            obraPronta.map(obraPronta => {
                const desconto = obraPronta.desconto
                const preco = obraPronta.preco
                const precoComDesconto = preco - ((preco * desconto) / 100)

                document.getElementById("nomeObra").innerHTML = obraPronta.nomeObra
                document.getElementById("nomeCategoria").innerHTML = obraPronta.nomeCategoria
                document.getElementById("nomeCategoria2").innerHTML = obraPronta.nomeCategoria
                document.getElementById("nomeTecnica").innerHTML = obraPronta.tecnica
                document.getElementById("nomeTecnica2").innerHTML = obraPronta.tecnica
                document.getElementById("nomeSubCategoria").innerHTML = obraPronta.nomeSubCategoria
                document.getElementById("descricao").innerHTML = obraPronta.descricao
                document.getElementById("preco").innerHTML = `R$ ${(precoComDesconto).toFixed(2).replace('.', ',')}`
                document.getElementById("nomeArtista").innerHTML = obraPronta.nomeArtista
                document.getElementById("fotoPerfilArtista").src = obraPronta.fotoPerfilArtista
                document.getElementById("imgPrincipal").innerHTML = `<img id="img-1" src="${obraPronta.imagem1obrigatoria}" alt="">`

                listarObrasFavoritas(`favoritar`,idObra)
        
                const divFavoritar = document.getElementById(`favoritar`)
    
                divFavoritar.addEventListener('change', () => {
                    favoritarDesfavoritar(`favoritar`, idObra)
                });

                getAvaliacaoArtista(obraPronta.idArtista)

                const selectQuantidade = document.getElementById('selectQuantidade')
                const quantidade = obraPronta.quantidade;

                for (let i = 0; i < quantidade; i++) {
                    const option = document.createElement('option')
                    option.value = i + 1
                    if (i == 0) {
                        option.innerHTML = (i + 1) + ' unidade'
                        selectQuantidade.appendChild(option)
                    } else {
                        option.innerHTML = (i + 1) + ' unidades'
                        selectQuantidade.appendChild(option)
                    }
                }
                    
                
                const listaImagens = document.getElementById("listaImagens")

                if (obraPronta.imagem2opcional != '') {
                    const div = `
                        <div class="img_pequena">
                            <img id="img-2" src="${obraPronta.imagem2opcional}" alt="">
                        </div>`
                    listaImagens.innerHTML += div 
                }

                if (obraPronta.imagem3opcional != '') {
                    const div = `
                        <div class="img_pequena">
                            <img id="img-3" src="${obraPronta.imagem3opcional}" alt="">
                        </div>`
                    listaImagens.innerHTML += div 
                }

                if (obraPronta.imagem4opcional != '') {
                    const div = `
                        <div class="img_pequena">
                            <img id="img-4" src="${obraPronta.imagem4opcional}" alt="">
                        </div>`
                    listaImagens.innerHTML += div 
                }

                if (obraPronta.imagem5opcional != '') {
                    const div = `
                        <div class="img_pequena">
                            <img id="img-5" src="${obraPronta.imagem5opcional}" alt="">
                        </div>`
                    listaImagens.innerHTML += div 
                }

                if (obraPronta.imagem6opcional != '') {
                    const div = `
                        <div class="img_pequena">
                            <img id="img-6" src="${obraPronta.imagem6opcional}" alt="">
                        </div>`
                    listaImagens.innerHTML += div 
                }

                listaMaisObrasDesteArtista(obraPronta.idArtista);

                var img1 = document.getElementById('img-1')
                var img2 = document.getElementById('img-2')
                var img3 = document.getElementById('img-3')
                var img4 = document.getElementById('img-4')
                var img5 = document.getElementById('img-5')
                var img6 = document.getElementById('img-6')


                const removeImageIfEmptyAndPutEventListener = (img) => {
                    const tradeImage = () => {
                        const imageOnMain = img1.src
                        const imageSelected = img.src

                        img1.src = imageSelected
                        img.src = imageOnMain
                    }

                    if (img.src.endsWith('images/img-produto.png')) {
                        img.style.display = 'none'
                    } else {
                        img.addEventListener('click', tradeImage)
                    }
                }

                const optionalImages = [img2, img3, img4, img5, img6]

                optionalImages.map(removeImageIfEmptyAndPutEventListener)

            })
           
        })

}

listarObra()

const maisDesteArtista = document.getElementById('maisDesteArtista')

const listaMaisObrasDesteArtista = (idArtista) => {

    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }

    fetch(`http://localhost:3000/obraPronta/maisDesteArtista/${idArtista}`, config)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const obraPronta = data.obraPronta
        obraPronta.map(obraPronta => {
            const idObraPronta = obraPronta.idObraPronta

            const div = document.createElement('div')
            div.className = 'obra'
            div.id = `obra ${obraPronta.idObraPronta}`

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

                <img src="${obraPronta.imagem1obrigatoria}" onclick="window.location.href = './index.html?q=${idObraPronta}'"alt="">
        
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
            maisDesteArtista.appendChild(div)

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

