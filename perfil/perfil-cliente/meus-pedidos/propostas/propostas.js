"use-strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const query = location.search.slice(1)
const idPedidoPersonalizado = query.split('=')[1]


const aceitarProposta = (idProposta, idPedidoPersonalizado) => {

    const body = {
        idProposta: idProposta,
        idPedidoPersonalizado: idPedidoPersonalizado
    }

    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenCliente}`
        },
        body: JSON.stringify(body)
    }
    fetch(`http://localhost:3000/proposta/aceitarProposta`, config)
    .then(res => res.json())
    .then(data => {
        console.log(data);
       
    })

}

const recusarProposta = (idProposta, idArtista, idPedidoPersonalizado) => {

    const body = {
        idPedidoPersonalizado: idPedidoPersonalizado,
        idProposta: idProposta,
        idArtista: idArtista
    }

    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenCliente}`
        },
        body: JSON.stringify(body)
    }

    fetch(`http://localhost:3000/proposta/recusarProposta`, config)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    
}

const listagem_propostas = document.getElementById('listagem_cards')

const getPropostas = () => {

    const config = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokenCliente}`,
            "Cache-Control": "no-cache"
        }
    }

    fetch(`http://localhost:3000/proposta/propostasParaMim/${idPedidoPersonalizado}`, config)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            const proposta = data.proposta;
       
            proposta.forEach(proposta => {


                let prazoEntregaPadraoBanco = proposta.prazoEntrega;
                let prazoEntregaPadrao = prazoEntregaPadraoBanco[0] + prazoEntregaPadraoBanco[1] + prazoEntregaPadraoBanco[2] + prazoEntregaPadraoBanco[3] + prazoEntregaPadraoBanco[4] + prazoEntregaPadraoBanco[5] + prazoEntregaPadraoBanco[6] + prazoEntregaPadraoBanco[7] + prazoEntregaPadraoBanco[8] + prazoEntregaPadraoBanco[9];
                let prazoEntregaPadraoBrasileiro = prazoEntregaPadrao.split('-').reverse().join('/');

                const divCard = document.createElement("div");
                divCard.className = "card";
                divCard.id = 
                divCard.innerHTML = `
                    <div class="nome_tipo_contato" id="nome_tipo_contato">
            
                        <div class="img_nome">
                            <img id="img_perfil" src="${proposta.fotoPerfilArtista}" alt="" srcset="">

                            <p class="nome" id="nome_cliente">${proposta.nomeArtista}</p>
                        </div>
            

                        <section class="contatar" id="contatar">
                            <img src="../../../img/contatar.png" alt="">
                            <p>Contatar</p>
                        </section>
                    
                    </div>

                    <p class="proposta">${proposta.descricao}</p>

                    <div class="div_preco_prazo_botoes">
                        <div class="preco_prazo">
                            <div class="div_preco">
                                <p class="translucido">Preço:</p>
                                <p class="">R$ ${proposta.preco}</p>
                            </div>

                            <div class="div_prazo">
                                <p class="translucido">Prazo de entrega:</p>
                                <p>${prazoEntregaPadraoBrasileiro}</p>
                                <!-- <img class="red_arrow" src="../../../img/red-arrow2.png" alt="">
                                <img class="green_arrow" src="../../../img/green-arrow2.png" alt=""> -->
                            </div>
                        </div>

                        <div class="buttons" id="buttons ${proposta.idProposta}">
                        </div>
                    </div>
                `;	


                listagem_propostas.appendChild(divCard);

                const buttons = document.getElementById(`buttons ${proposta.idProposta}`);

                const botaoContatar = document.getElementById('contatar');
                botaoContatar.addEventListener('click', () => {
                    window.location.href = `../../../chat/index.html?id=${proposta.idArtista}`
                });

                const botaoAceitar = document.createElement('button');
                botaoAceitar.className = "button_azul";
                botaoAceitar.innerHTML = "Aceitar";

                const botaoRecusar = document.createElement('button');
                botaoRecusar.className = "button_vermelho";
                botaoRecusar.innerHTML = "Recusar";

                buttons.appendChild(botaoAceitar);
                buttons.appendChild(botaoRecusar);

                botaoAceitar.addEventListener('click', () => {
                    aceitarProposta(proposta.idProposta, proposta.idPedidoPersonalizado);
                    window.location.href = "../index.html"
                });

                botaoRecusar.addEventListener('click', () => {
                    recusarProposta(proposta.idProposta, proposta.idArtista, proposta.idPedidoPersonalizado);
                    divCard.remove();
                });
 
            })
            
        })

}
getPropostas();