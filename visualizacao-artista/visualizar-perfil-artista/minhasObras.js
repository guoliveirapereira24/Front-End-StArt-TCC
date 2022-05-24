"use strict";

const obrasArtistas = document.getElementById('linha_obrasArtistas');

function getObraPronta(){

    const configObras = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    } 
    
    fetch(`http://localhost:3000/obraPronta/obrasDeArtista/${idArtista}`, configObras)
        .then((res) => res.json())
        .then((data) => {
            const obraPronta = data.obraPronta;

            
           if(obraPronta !== undefined){
            return obraPronta.forEach(obraPronta => {

                const idObraPronta = obraPronta.idObraPronta;

                const div = document.createElement('div');
                div.className = 'card_minha_obra';
                div.id = obraPronta.idObraPronta;
                div.innerHTML = 
                `
                    <img src="${obraPronta.imagem1obrigatoria}" alt="">
             
                    <div class="nome_artista" id="">
                        <div class="nome_obra_artista" id="informacoes_obra">
                            <div class="nome_obra_artista">
                                <p id="nome_minha_obra1">${obraPronta.nomeObra}</p>
                                <p id="nome_artista">${obraPronta.nomeCategoria}</p>
                            </div>
                            
                            <div class="categoria_tecnica" id="categoria_tecnica">
                                <p id="categoria_minha_obra1">${obraPronta.nomeEspecialidade}</p>
                                <p>-</p>
                                <p id="tecnica_minha_obra1">${obraPronta.tecnica}</p>
                            </div>
                        </div>
                    </div>
                `

                div.onclick = () => {
                    window.location.href = `../../visualizar-obras/mais-informacoes/index.html?q=${idObraPronta}`
                }

                obrasArtistas.appendChild(div);


            }) 
        } else {
            obrasArtistas.innerHTML += 
            `
            <h2>Este artista não possui obras prontas</h2>
            `;    
        }
    });
}


getObraPronta();