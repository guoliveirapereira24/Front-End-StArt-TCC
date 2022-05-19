"use-strict"

const listagemObras = document.getElementById('listagemObras')

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
        console.log(data)
        const obrasProntas = data.obrasProntas
        obrasProntas.map(obraPronta => {
            const div = document.createElement('div')
            div.className = 'obra'
            div.id = `obra ${obraPronta.idObraPronta}`

            const desconto = obraPronta.desconto
            const preco = obraPronta.preco
        
            const precoComDesconto = preco - ((preco * desconto) / 100)

            div.innerHTML = `

                <img src="${obraPronta.imagem1obrigatoria}" alt="">
        
                <div class="nome_artista_preco" id="">
                    <div class="nome_obra_artista_categoria_tecnica" id="informacoes_obra">
                        <div class="nome_obra_artista" >
                            <p id="nome_obra_favorita1">${obraPronta.nomeObra}</p>
                            <p id="nome_artista_favorita1">${obraPronta.nomeArtista}</p>
                        </div>
                        
                        <div class="categoria_tecnica" id="categoria_tecnica_obra_favorita1">
                            <p id="categoria_obra_favorita1">${obraPronta.nomeCategoria}</p>
                            <p>-</p>
                            <p id="tecnica_obra1">${obraPronta.tecnica}</p>
                        </div>
                    </div>
        
                    <div class="img_favoritada_preco">
    
                        <img id="img_favoritada" src="./img/favorito.png" alt="">
                        <div class="promocao" id="promocao ${obraPronta.idObraPronta}">
                            <p class="porcentagem_desconto">${desconto}%</p>
                            <p class="preco_original">R$ ${preco.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <p class="preco_obra_favorita" id="preco_obra_favorita1">R$ ${precoComDesconto.toFixed(2).replace('.', ',')}</p>
    
                    </div>
    
                </div>
                   

            `
            listagemObras.appendChild(div)

            const divDesconto = document.getElementById(`promocao ${obraPronta.idObraPronta}`)

            if(obraPronta.desconto == 0){
                divDesconto.className = 'promocao_desativada'
            }

        })
    })

}

getObras();