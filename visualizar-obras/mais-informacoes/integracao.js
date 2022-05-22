const tokenCliente = localStorage.getItem('tokenCliente')

const query = location.search.slice(1)
const idObra = query.split('=')[1]


const listarObra = () => {

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenCliente}`,
            'Content-Type': 'application/json'
        }
    }

    // fazer fetch de obra pronta por idObra
    fetch(`http://localhost:3000/obraPronta/${idObra}`, config)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const obraPronta = data.obraPronta

            obraPronta.map(obraPronta => {
                document.getElementById("nomeObra").innerHTML = obraPronta.nomeObra
                document.getElementById("nomeCategoria").innerHTML = obraPronta.nomeCategoria
                document.getElementById("nomeCategoria2").innerHTML = obraPronta.nomeCategoria
                document.getElementById("nomeTecnica").innerHTML = obraPronta.tecnica
                document.getElementById("nomeTecnica2").innerHTML = obraPronta.tecnica
                document.getElementById("nomeSubCategoria").innerHTML = obraPronta.nomeSubCategoria
                document.getElementById("descricao").innerHTML = obraPronta.descricao
                document.getElementById("nomeArtista").innerHTML = obraPronta.nomeArtista
                document.getElementById("fotoPerfilArtista").src = obraPronta.fotoPerfilArtista
                document.getElementById("img-1").innerHTML = `<img src="${obraPronta.imagem1obrigatoria}" alt="">`
                
                const listaImagens = document.getElementById("listaImagens")

                if (obraPronta.imagem2opcional != '') {
                    const div = `
                        <div class="img_pequena" id="img-2">
                            <img src="${obraPronta.imagem2opcional}" alt="">
                        </div>`
                    listaImagens.appendChild(div)
                } else {
                    const div = document.createElement("div")
                    div.classList.add("img_pequena")
                    div.id = "img-2"
                    div.innerHTML = `
                        <div class="img_pequena" id="img-2">
                            <img src="${obraPronta.imagem1obrigatoria}" alt="">
                        </div>`
                    listaImagens.appendChild(div)
                }
            })
           
        })

}

listarObra()
