"use strict";

const button_entrar_contato = document.getElementById("button_entrar_contato");

const editar_pedido =  document.getElementById("editar_pedido");

const visualizar_proposta = document.getElementById("visualizar_proposta");

editar_pedido.addEventListener("click", function(){

    window.location.href = "../../pedido-personalizado/";

});


const meusPedidos = document.getElementById("listagem_cards");

function getMeusPedidos() {
    
    const configMeusPedidos = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokenCliente}`,
            'Cache-Control': 'no-cache'
        }
    }

    fetch("http://localhost:3000/pedidosPersonalizados/meusPedidos", configMeusPedidos)
        .then((res) => res.json())
        .then((data) => {

            const pedidoPersonalizado = data.pedidoPersonalizado;

            if(pedidoPersonalizado.length === 0){

                const div_vazia = document.createElement("div");
                div_vazia.classList.add("vazia");
                div_vazia.innerHTML = `<h1>Você ainda não possui pedidos personalizados</h1>`;
                meusPedidos.appendChild(div_vazia);

            } else {
                
                pedidoPersonalizado.forEach(pedido => {

                    let statusClass = "";
                    let status = pedido.status;
                    if(status == "Aceita" || status == "Finalizado" || status == "Despachado"){
                        statusClass = "aceito";
                    } else if(status == "Recusada" || status == "Cancelada"){
                        statusClass = "recusado";
                    } else if(status == "Em andamento"){
                        statusClass = "em_andamento";
                    }


                    const div_card = document.createElement("div");
                    div_card.className = "card";
                    div_card.id = pedido.idPedidoPersonalizado;

                    div_card.innerHTML = `
               
                        <div class="genero_enviado_status">
        
                            <div class="genero">
                                <p class="translucido">Gênero:</p>
                                <p>Retrato</p>
                            </div>
        
                            <div class="enviado_para">
                                <p class="translucido">Enviado para:</p>
                                <p>Todos</p>
                            </div>
        
                            <div class="status">
                                <p class="translucido">Status:</p>
                                <p>Publicado</p>
                            </div>

                        </div>
        
                        <p class="descricao_pedido">
                            Olá! Quero um desenho dessa foto da minha querida avó. Quem estiver disposto 
                                a fazer, entre contato comigo para negociarmos e acertarmos os detalhes.
                        </p>
    
                        <div class="exemplo_botoes" id="exemplo_botoes">

                            <div class="exemplo">
                                <img src="../../img/exemplo2.png" alt="">  
                            </div>
        
                            <div class="botoes" id="botoes">
                                <button class="editar_pedido" id="editar_pedido">Editar Pedido</button>
                                <button class="excluir_pedido" id="button_excluir_pedido">Excluir Pedido</button>
                            </div>
        
                        </div>
                    
                    `;

                    meusPedidos.appendChild(div_card);

                });

            }
        })   
}