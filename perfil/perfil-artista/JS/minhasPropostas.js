"use strict";


const minhasPropostas = document.getElementById('listagem_minhas_propostas');

function getMinhasPropostas(){

    const configPropostas = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    
    
    fetch('http://localhost:3000/proposta/minhasPropostas', configPropostas)
        .then((res) => res.json())
        .then((data) => {
        const propostas = data.proposta;
           
        return propostas.forEach(proposta => {

            let prazoEntregaPadraoBanco = proposta.prazoEntrega;
            let prazoEntregaPadrao = prazoEntregaPadraoBanco[0] + prazoEntregaPadraoBanco[1] + prazoEntregaPadraoBanco[2] + prazoEntregaPadraoBanco[3] + prazoEntregaPadraoBanco[4] + prazoEntregaPadraoBanco[5] + prazoEntregaPadraoBanco[6] + prazoEntregaPadraoBanco[7] + prazoEntregaPadraoBanco[8] + prazoEntregaPadraoBanco[9];
            let prazoEntregaPadraoBrasileiro = prazoEntregaPadrao.split('-').reverse().join('/');

            let statusClass = "";
            let status = proposta.status;
            if(status == "Aceita" || status == "Finalizada" || status == "Despachado"){
                statusClass = "aceita";
            } else if(status == "Recusada" || status == "Cancelada"){
                statusClass = "recusada";
            } else if(status == "Em andamento"){
                statusClass = "andamento";
            }
            const div = document.createElement('div');
            div.id = "card";
            div.innerHTML = 
            `
            <div id="nome_tipo_contato">
                <p class="text_para">Para:</p>

                <img id="img_perfil" src="../img/cliente.png" alt="" srcset="">

                <p class="nome"  id="nome_cliente">${proposta.nomeCliente}</p>

                <section id="categoria_pedido">
                    <p>${proposta.nomeCategoria}</p>
                </section>

                <div class="container_status" id="container_status">
                    <p class="transparente" id="">Status:</p>
                    <p class="${statusClass}" id="status_publicacao">${proposta.status}</p>
                </div>
            
            </div>

            <p id="descricao_pedido">
                ${proposta.descricao}
            </p>

            <div id="preco_prazo_buttons" class="preco_prazo_buttons">
                <div id="preco_prazo" class="preco_prazo">
                    <div class="preco">
                        <p class="transparente">Preço:</p>
                        <p class="" id="preco_proposta">R$ ${(proposta.preco).toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="prazo">
                        <p class="transparente">Prazo de entrega:</p>
                        <p class="" id="prazo_proposta">${prazoEntregaPadraoBrasileiro}</p>
                    </div>

                    <button id="button_ver_pedido" class="button_ver_pedido">
                        Ver Pedido
                    </button>
                    
                </div>

                <div id="botoes" class="botoes">
                </div>


            </div>

            `
            minhasPropostas.appendChild(div);

            const buttons = document.getElementById('botoes');

            if(status == "Publicada"){
                const buttonEditar = document.createElement('button');
                buttonEditar.id = "editar_proposta";
                buttonEditar.innerHTML = "Editar Proposta";

                const buttonExcluir = document.createElement('button');
                buttonEditar.id = "excluir_proposta";
                buttonEditar.innerHTML = "Excluir Proposta";
                buttons.appendChild(buttonEditar, buttonExcluir);

            } else if(status == "Aceita"){
                const buttonIniciarPedido = document.createElement('button');
                buttonIniciarPedido.id = "iniciar_pedido";
                buttonIniciarPedido.innerHTML = "Iniciar Pedido";
 

                const buttonEditar = document.createElement('button');
                buttonEditar.id = "editar_proposta";
                buttonEditar.innerHTML = "Editar Proposta";
   

                const buttonExcluir = document.createElement('button');
                buttonEditar.id = "excluir_proposta";
                buttonEditar.innerHTML = "Excluir Proposta";

                buttons.innerHTML = buttonIniciarPedido;
                buttons.appendChild(buttonEditar);
                buttons.appendChild(buttonExcluir);

            } else if(status == "Em andamento"){
                const buttonFinalizarPedido = document.createElement('button');
                buttonFinalizarPedido.id = "finalizar_pedido";
                buttonFinalizarPedido.innerHTML = "Finalizar Pedido";
                buttons.appendChild(buttonFinalizarPedido);

                const buttonEntrarContato = document.createElement('button');
                buttonEntrarContato.id = "entrar_em_contato";
                buttonEntrarContato.innerHTML = "Entrar em contato";
                buttons.appendChild(buttonEntrarContato);

                const buttonCancelar = document.createElement('button');
                buttonCancelar.id = "cancelar_proposta";
                buttonCancelar.innerHTML = "Cancelar Proposta";
                buttons.appendChild(buttonCancelar);

            } else if(status == "Finalizado"){
                const buttonPedidoDespachado = document.createElement('button');
                buttonPedidoDespachado.id = "pedido_despachado";
                buttonPedidoDespachado.innerHTML = "Pedido Despachado";
                buttons.appendChild(buttonPedidoDespachado);

                const buttonEntrarContato = document.createElement('button');
                buttonEntrarContato.id = "entrar_em_contato";
                buttonEntrarContato.innerHTML = "Entrar em contato";
                buttons.appendChild(buttonEntrarContato);

            } else if(status == "Despachado"){
                const buttonEntrarContato = document.createElement('button');
                buttonEntrarContato.id = "entrar_em_contato";
                buttonEntrarContato.innerHTML = "Entrar em contato";
                buttons.appendChild(buttonEntrarContato);
            }

                


        })
    });
  
}

getMinhasPropostas();