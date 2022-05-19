"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const listagemMeusPedidos = document.getElementById('listagemMeusPedidos');

console.log(listagemMeusPedidos);

const getMeusPedidos = () => {

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
       
                pedidoPersonalizado.map(pedidoPersonalizado => {

                    const idPedidoPersonalizado = pedidoPersonalizado.idPedidoPersonalizado;

                    let statusClass = "";
                    let status = pedidoPersonalizado.status;
                    if(status == "Aceito" || status == "Esperando execução"|| status == "Finalizado" || status == "Despachado" || status == "Despachado e Artista Avaliado"){
                        statusClass = "aceito";
                    } else if(status == "Recusado" || status == "Cancelado"){
                        statusClass = "recusado";
                    } else if(status == "Em andamento"){
                        statusClass = "em_andamento";
                    }

                    var enviadoPara = "Todos";

                    if(pedidoPersonalizado.isPublic == 0){
                        enviadoPara = "Um ou alguns artistas";
                    }

                    const divCard = document.createElement("div");
                    divCard.className = "card";
                    divCard.id = idPedidoPersonalizado;
                    divCard.innerHTML = `
               
                        <div class="genero_enviado_status">
        
                            <div class="genero">
                                <p class="translucido">Gênero:</p>
                                <p>${pedidoPersonalizado.nomeEspecialidade}</p>
                            </div>
        
                            <div class="enviado_para">
                                <p class="translucido">Enviado para:</p>
                                <p>${enviadoPara}</p>
                            </div>
        
                            <div class="status">
                                <p class="translucido">Status:</p>
                                <p class="${statusClass}">${pedidoPersonalizado.status}</p>
                            </div>

                        </div>
        
                        <p class="descricao_pedido">
                            ${pedidoPersonalizado.descricao}
                        </p>
    
                        <div class="exemplo_botoes" id="exemplo_botoes">

                            <div class="exemplo">
                                <img src="${pedidoPersonalizado.imagem1opcional}" alt="">  
                            </div>
        
                            <div class="botoes" id="botoes ${idPedidoPersonalizado}">
                            </div>
        
                        </div>
                    
                    `;

                    listagemMeusPedidos.appendChild(divCard);


                    const excluirPedido = (idPedido) => {
                        const configExcluirPedido = {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache',
                                'Authorization' : `Bearer ${tokenCliente}`
                            }
                        } 
                        fetch(`http://localhost:3000/pedidosPersonalizados/${idPedido}`, configExcluirPedido)
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                divCard.remove();
                            })
                    }

                    const cancelarPedido = (idPedido) => {
                        const configExcluirPedido = {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache',
                                'Authorization' : `Bearer ${tokenCliente}`
                            }
                        } 
                        fetch(`http://localhost:3000/pedidosPersonalizados/${idPedido}`, configExcluirPedido)
                            .then((res) => res.json())
                            .then((data) => {
                                divCard.remove();
                            })
                    }

                    const botoes = document.getElementById(`botoes ${idPedidoPersonalizado}`);

                    if(status == "Publicado"){
                        const buttonEditar = document.createElement('button');
                        buttonEditar.id = `editar_pedido ${idPedidoPersonalizado}`;
                        buttonEditar.className = "editar_pedido";
                        buttonEditar.innerHTML = "Editar Pedido";
        
                        const buttonExcluir = document.createElement('button');
                        buttonExcluir.id = `excluir_pedido ${idPedidoPersonalizado}`;
                        buttonExcluir.className = "excluir_pedido";
                        buttonExcluir.innerHTML = "Excluir Pedido";
        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonEditar);
                        botoes.appendChild(buttonExcluir);                    
        
                        buttonEditar.addEventListener('click', () => {
                            window.location.href = `../../../pedido-personalizado/editar-pedido/index.html?q=${idPedidoPersonalizado}`;
                        });
        
                        const fundo_excluir_pedido = document.getElementById("fundo_modal_exclusao");

                        buttonExcluir.addEventListener("click", () => {

                            fundo_excluir_pedido.innerHTML = `
                                <div class="modal_excluir_pedido">
                                    <h2>VOCÊ TEM CERTEZA DE QUE DESEJA EXCLUIR ESTE PEDIDO?</h2>
                    
                                    <div class="buttons">
                                        <button class="azul" id="negar_exclusao">NÃO</button>
                                        <button class="vermelho" id="confirmar_exclusao">SIM</button>
                                    </div>
                                </div>
                            `;
            
                            fundo_excluir_pedido.style.display = "flex";
        
                            const button_confirmar_exclusao = document.getElementById("confirmar_exclusao");
            
                            button_confirmar_exclusao.addEventListener("click", function(){
                                console.log(idPedidoPersonalizado);
        
                                excluirPedido(idPedidoPersonalizado);
                                fundo_excluir_pedido.innerHTML = "";
                                fundo_excluir_pedido.style.display = "none";
                            });
            
                            const button_negar_exclusao = document.getElementById("negar_exclusao");
            
                            button_negar_exclusao.addEventListener("click", () => {
        
                                fundo_excluir_pedido.innerHTML = "";
                                fundo_excluir_pedido.style.display = "none";
                
                            });
                    
            
                        });
        
                    } else if(status == "Aceito"){
                        const buttonVisualizarPropostas = document.createElement('button');
                        buttonVisualizarPropostas.id = `visualizar_proposta ${idPedidoPersonalizado}`;
                        buttonVisualizarPropostas.className = "visualizar_proposta";
                        buttonVisualizarPropostas.innerHTML = "Visualizar Propostas";
        
                        const buttonExcluir = document.createElement('button');
                        buttonExcluir.id = `excluir_pedido ${idPedidoPersonalizado}`;
                        buttonExcluir.className = "excluir_pedido";
                        buttonExcluir.innerHTML = "Excluir Pedido";
        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonVisualizarPropostas);
                        botoes.appendChild(buttonExcluir);                    
        
                        buttonVisualizarPropostas.addEventListener('click', () => {
                            window.location.href = `./propostas/index.html?q=${idPedidoPersonalizado}`;
                        });
        
                        const fundo_excluir_pedido = document.getElementById("fundo_modal_exclusao");

                     
            
                        buttonExcluir.addEventListener("click", () => {

                            fundo_excluir_pedido.innerHTML = `
                                <div class="modal_excluir_pedido">
                                    <h2>VOCÊ TEM CERTEZA DE QUE DESEJA EXCLUIR ESTE PEDIDO?</h2>
                    
                                    <div class="buttons">
                                        <button class="azul" id="negar_exclusao">NÃO</button>
                                        <button class="vermelho" id="confirmar_exclusao">SIM</button>
                                    </div>
                                </div>
                            `;
            
                            fundo_excluir_pedido.style.display = "flex";
        
                            const button_confirmar_exclusao = document.getElementById("confirmar_exclusao");
            
                            button_confirmar_exclusao.addEventListener("click", function(){
                                console.log(idPedidoPersonalizado);
        
                                excluirPedido(idPedidoPersonalizado);
                                fundo_excluir_pedido.innerHTML = "";
                                fundo_excluir_pedido.style.display = "none";
                            });
            
                            const button_negar_exclusao = document.getElementById("negar_exclusao");
            
                            button_negar_exclusao.addEventListener("click", () => {
                                fundo_excluir_pedido.innerHTML = "";
                                fundo_excluir_pedido.style.display = "none";
                
                            });
                    
            
                        });
                        
                    } else if (status == "Esperando execução"){
                        const buttonEntrarContato = document.createElement('button');
                        buttonEntrarContato.id = `entrar_contato ${idPedidoPersonalizado}`;
                        buttonEntrarContato.className = "entrar_contato";
                        buttonEntrarContato.innerHTML = "Entrar em contato";
        
                        const buttonCancelar = document.createElement('button');
                        buttonCancelar.id = `cancelar_pedido ${idPedidoPersonalizado}`;
                        buttonCancelar.className = "recusar";
                        buttonCancelar.innerHTML = "Cancelar Pedido";
        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonEntrarContato);
                        botoes.appendChild(buttonCancelar);
        
                        buttonEntrarContato.addEventListener('click', () => {
                            // window.location.href = `../../../chat/index.html?q=${idPedidoPersonalizado}`;
                        });
        
                        const fundo_modal_cancelar_pedido = document.getElementById("fundo_modal_cancelar_pedido");
                  
                        buttonCancelar.addEventListener("click", function(){
        
                            fundo_modal_cancelar_pedido.innerHTML = 
                            `
                            <div class="modal_cancelar_pedido">
                                <h2>VOCÊ TEM CERTEZA DE QUE DESEJA CANCELAR ESTE PEDIDO?</h2>
                                <p>Será reembolsado apenas 50% do valor previamente pago.</p>
                                <div class="buttons">
                                    <button class="azul" id="negar_cancelamento">NÃO</button>
                                    <button class="vermelho"  id="confirmar_cancelamento">SIM</button>
                                </div>
                            </div>    
                            `;
        
                            fundo_modal_cancelar_pedido.style.display = "flex";
        
                            const button_confirmar_cancelamento = document.getElementById("confirmar_cancelamento");
                            button_confirmar_cancelamento.addEventListener("click", function(){
        
                                cancelarPedido(idPedidoPersonalizado);
                                fundo_modal_cancelar_pedido.innerHTML = "";
                                fundo_modal_cancelar_pedido.style.display = "none";
                
                            });
        
                            const button_negar_cancelamento = document.getElementById("negar_cancelamento");
                            button_negar_cancelamento.addEventListener("click", function(){
                                fundo_modal_cancelar_pedido.innerHTML = "";
                                fundo_modal_cancelar_pedido.style.display = "none";
                
                            });
                        });
        
        
                    } else if(status == "Em andamento"){
                        const buttonEntrarContato = document.createElement('button');
                        buttonEntrarContato.id = `entrar_contato ${idPedidoPersonalizado}`;
                        buttonEntrarContato.className = "entrar_contato";
                        buttonEntrarContato.innerHTML = "Entrar em contato";
        
                        const buttonCancelar = document.createElement('button');
                        buttonCancelar.id = `cancelar_pedido ${idPedidoPersonalizado}`;
                        buttonCancelar.className = "recusar";
                        buttonCancelar.innerHTML = "Cancelar Pedido";
        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonEntrarContato);
                        botoes.appendChild(buttonCancelar);
        
                        buttonEntrarContato.addEventListener('click', () => {
                            // window.location.href = `../../../chat/index.html?q=${idPedidoPersonalizado}`;
                        });
        
                        const fundo_modal_cancelar_pedido = document.getElementById("fundo_modal_cancelar_pedido");
                  
                        buttonCancelar.addEventListener("click", function(){
        
                            fundo_modal_cancelar_pedido.innerHTML = 
                            `
                            <div class="modal_cancelar_pedido">
                                <h2>VOCÊ TEM CERTEZA DE QUE DESEJA CANCELAR ESTE PEDIDO?</h2>
                                <p>Será reembolsado apenas 50% do valor previamente pago.</p>
                                <div class="buttons">
                                    <button class="azul" id="negar_cancelamento">NÃO</button>
                                    <button class="vermelho"  id="confirmar_cancelamento">SIM</button>
                                </div>
                            </div>    
                            `;
        
                            fundo_modal_cancelar_pedido.style.display = "flex";
        
                            const button_confirmar_cancelamento = document.getElementById("confirmar_cancelamento");
                            button_confirmar_cancelamento.addEventListener("click", function(){
        
                                cancelarPedido(idPedidoPersonalizado);
                                fundo_modal_cancelar_pedido.innerHTML = "";
                                fundo_modal_cancelar_pedido.style.display = "none";
                
                            });
        
                            const button_negar_cancelamento = document.getElementById("negar_cancelamento");
                            button_negar_cancelamento.addEventListener("click", function(){
                                fundo_modal_cancelar_pedido.innerHTML = "";
                                fundo_modal_cancelar_pedido.style.display = "none";
                
                            });
                        });
        
        
                    } else if(status == "Finalizado"){
                       
                        const buttonEntrarContato = document.createElement('button');
                        buttonEntrarContato.id = `entrar_contato ${idPedidoPersonalizado}`;
                        buttonEntrarContato.className = "entrar_contato";
                        buttonEntrarContato.innerHTML = "Entrar em contato";
        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonEntrarContato);
        
        
                    } else if(status == "Despachado"){
                        const buttonAvaliarArtista = document.createElement('button');
                        buttonAvaliarArtista.id = `avaliar_artista ${idPedidoPersonalizado}`;
                        buttonAvaliarArtista.className = "avaliar_artista";
                        buttonAvaliarArtista.innerHTML = "Avaliar Artista";

                        const buttonEntrarContato = document.createElement('button');
                        buttonEntrarContato.id = `entrar_contato ${idPedidoPersonalizado}`;
                        buttonEntrarContato.className = "entrar_contato";
                        buttonEntrarContato.innerHTML = "Entrar em contato";
                        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonEntrarContato);
                        botoes.appendChild(buttonAvaliarArtista);

                        buttonEntrarContato.addEventListener('click', () => {
                            // window.location.href = `../../../chat/index.html?q=${idPedidoPersonalizado}`;
                        });

            
                        const fundo_modal_avaliar_artista = document.getElementById("fundo_modal_avaliar_artista");
                  
                        buttonAvaliarArtista.addEventListener("click", () => {
        
                            fundo_modal_avaliar_artista.innerHTML = 
                            `
                            <div class="modal_avaliar_artista">
                                <h2>Avalie seu artista</h2>
                                <div class="estrelas_nota">
                                    <img src="../../img/estrela2.png" alt="" srcset="">
                                    <img src="../../img/estrela2.png" alt="" srcset="">
                                    <img src="../../img/estrela2.png" alt="" srcset="">
                                    <img src="../../img/estrela2.png" alt="" srcset="">
                                    <img src="../../img/estrela2.png" alt="" srcset="">
                                    <p class="avaliacao">5.0</p>
                                </div>
                                <textarea name="" placeholder="Digite aqui sua avaliação" style="resize: none;" id="" cols="30" rows="10"></textarea>
                                <div class="buttons">
                                    <button class="vermelho" id="cancelar_avaliacao">CANCELAR</button>
                                    <button class="azul" id="confirmar_avaliacao">ENVIAR</button>
                                </div>
                            </div>
                            `;
        
                            fundo_modal_avaliar_artista.style.display = "flex";
        
                            const button_confirmar_avaliacao = document.getElementById("confirmar_avaliacao");
                            button_confirmar_avaliacao.addEventListener("click", function(){
        
                                avaliarArtista(idArtista);
                                fundo_modal_avaliar_artista.innerHTML = "";
                                fundo_modal_avaliar_artista.style.display = "none";
                
                            });
        
                            const button_cancelar_avaliacao = document.getElementById("cancelar_avaliacao");
                            button_cancelar_avaliacao.addEventListener("click", function(){
                                fundo_modal_avaliar_artista.innerHTML = "";
                                fundo_modal_avaliar_artista.style.display = "none";
                
                            });
                        });

                    } else if(status == "Despachado e Artista Avaliado"){

                        const buttonEntrarContato = document.createElement('button');
                        buttonEntrarContato.id = `entrar_contato ${idPedidoPersonalizado}`;
                        buttonEntrarContato.className = "entrar_contato";
                        buttonEntrarContato.innerHTML = "Entrar em contato";
                        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonEntrarContato);

                        buttonEntrarContato.addEventListener('click', () => {
                            // window.location.href = `../../../chat/index.html?q=${idPedidoPersonalizado}`;
                        });
                    }
        

                });
        })   
}

getMeusPedidos()