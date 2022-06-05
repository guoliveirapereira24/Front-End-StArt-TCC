"use strict";


const minhasPropostas = document.getElementById('listagem_minhas_propostas');

const Avaliar = (estrela) => {
    var url = window.location;
    url = url.toString()
    url = url.split("index.html");
    url = url[0];

    console.log(url);
   
    var s1 = document.getElementById("s1").src;
    var s2 = document.getElementById("s2").src;
    var s3 = document.getElementById("s3").src;
    var s4 = document.getElementById("s4").src;
    var s5 = document.getElementById("s5").src;
    var avaliacao = 0;
   
   if (estrela == 5){ 
    
    document.getElementById("s1").src = "../img/star1.png";
    document.getElementById("s2").src = "../img/star1.png";
    document.getElementById("s3").src = "../img/star1.png";
    document.getElementById("s4").src = "../img/star1.png";
    document.getElementById("s5").src = "../img/star1.png";
    avaliacao = 5;
   
   }
    
    //ESTRELA 4
   if (estrela == 4){ 
    document.getElementById("s1").src = "../img/star1.png";
    document.getElementById("s2").src = "../img/star1.png";
    document.getElementById("s3").src = "../img/star1.png";
    document.getElementById("s4").src = "../img/star1.png";
    document.getElementById("s5").src = "../img/star0.png";
    avaliacao = 4;
   }
   
   //ESTRELA 3
   if (estrela == 3){ 
    document.getElementById("s1").src = "../img/star1.png";
    document.getElementById("s2").src = "../img/star1.png";
    document.getElementById("s3").src = "../img/star1.png";
    document.getElementById("s4").src = "../img/star0.png";
    document.getElementById("s5").src = "../img/star0.png";
    avaliacao = 3;
 }
    
   //ESTRELA 2
   if (estrela == 2){ 
    document.getElementById("s1").src = "../img/star1.png";
    document.getElementById("s2").src = "../img/star1.png";
    document.getElementById("s3").src = "../img/star0.png";
    document.getElementById("s4").src = "../img/star0.png";
    document.getElementById("s5").src = "../img/star0.png";
    avaliacao = 2;
   }
    
    //ESTRELA 1
   if (estrela == 1){ 
    document.getElementById("s1").src = "../img/star1.png";
    document.getElementById("s2").src = "../img/star0.png";
    document.getElementById("s3").src = "../img/star0.png";
    document.getElementById("s4").src = "../img/star0.png";
    document.getElementById("s5").src = "../img/star0.png";
    avaliacao = 1;
   }
    
    document.getElementById('rating').innerHTML = avaliacao.toFixed(1);
    
}

const avaliarCliente = (idCliente, avaliacao, descricao, idProposta) => {

    const body = {
        idCliente: idCliente,
        avaliacaoCliente: avaliacao,
        descricao: descricao,
        idProposta: idProposta
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenArtista}`
        },
        body: JSON.stringify(body)
    }


    fetch(`http://localhost:3000/avaliacao/avaliarCliente`, config)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}


function getAvaliacaoCliente(idCliente, idProposta) {

    const configAvaliacao = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    } 

    const divAvaliacaoCliente = document.getElementById(`avaliacaoCliente ${idProposta}`);

            fetch(`http://localhost:3000/avaliacao/avaliacaoDeCliente/${idCliente}`, configAvaliacao)
                .then((res) => res.json())
                .then((data) => {
                    const avaliacaoCliente = data.avaliacaoCliente;
                    return avaliacaoCliente.map(avaliacaoCliente => {
                        divAvaliacaoCliente.innerHTML = (avaliacaoCliente.notaCliente).toFixed(2);
                    })
            });
}

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


        if(propostas !== undefined){   
        return propostas.map(proposta => {

            let prazoEntregaPadraoBanco = proposta.prazoEntrega;
            let prazoEntregaPadrao = prazoEntregaPadraoBanco[0] + prazoEntregaPadraoBanco[1] + prazoEntregaPadraoBanco[2] + prazoEntregaPadraoBanco[3] + prazoEntregaPadraoBanco[4] + prazoEntregaPadraoBanco[5] + prazoEntregaPadraoBanco[6] + prazoEntregaPadraoBanco[7] + prazoEntregaPadraoBanco[8] + prazoEntregaPadraoBanco[9];
            let prazoEntregaPadraoBrasileiro = prazoEntregaPadrao.split('-').reverse().join('/');

            var precoFormatado = (proposta.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


            let statusClass = "";
            let status = proposta.status;
        if(status == "Aceita" || status == "Finalizado" || status == "Despachado" || status == "Despachado e Cliente Avaliado"){
                statusClass = "aceita";
            } else if(status == "Recusada" || status == "Cancelada"){
                statusClass = "recusada";
            } else if(status == "Em andamento"){
                statusClass = "andamento";
            }


            const div = document.createElement('div');
            div.className = "card";
            div.id = proposta.idProposta;
            div.innerHTML = 
            `
            <div id="nome_tipo_contato">
                <p class="text_para">Para:</p>

                <img class="img_perfil" id="img_perfil ${proposta.idProposta}" src="${proposta.fotoPerfilCliente}" alt="" srcset="">

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
                ${proposta.descricaoProposta}
            </p>

            <div id="preco_prazo_buttons" class="preco_prazo_buttons">
                <div id="preco_prazo" class="preco_prazo">
                    <div class="preco">
                        <p class="transparente">Preço:</p>
                        <p class="" id="preco_proposta">R$ ${precoFormatado}</p>
                    </div>
                    <div class="prazo">
                        <p class="transparente">Prazo de entrega:</p>
                        <p class="" id="prazo_proposta">${prazoEntregaPadraoBrasileiro}</p>
                    </div>

                    <button id="button_ver_pedido ${proposta.idProposta}" class="button_ver_pedido">
                        Ver Pedido
                    </button>
                    
                </div>

                <div id="botoes ${proposta.idProposta}" class="botoes">
                </div>


            </div>

            `
            minhasPropostas.appendChild(div);

            const imgPerfil = document.getElementById(`img_perfil ${proposta.idProposta}`);

                imgPerfil.addEventListener('click', () => {
                    window.location.href = `../../../visualizar-cliente/index.html?q=${proposta.idCliente}`;
                })

            const buttons = document.getElementById(`botoes ${proposta.idProposta}`);

            const getPropostaById = (idProposta) => {
                const configPropostaById = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Authorization' : `Bearer ${tokenArtista}`
                    }
                } 
                fetch(`http://localhost:3000/proposta/${idProposta}`, configPropostaById)
                    .then((res) => res.json())
                    .then((data) => {
                            return data.proposta;
                    })
            }

            const excluirProposta = (idProposta) => {
                const configExcluirProposta = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Authorization' : `Bearer ${tokenArtista}`
                    }
                } 
                fetch(`http://localhost:3000/proposta/${idProposta}`, configExcluirProposta)
                    .then((res) => res.json())
                    .then((data) => {
                
                            window.location.reload();
                        
                    })
            }

            const atualizarStatus = (idProposta, status) => {

                const bodyAtualizarStatus = {
                    "status" : `${status}`
                }
    
                const configAtualizarStatus = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Authorization' : `Bearer ${tokenArtista}`
                    },
                    body: JSON.stringify(bodyAtualizarStatus)
                }
            
                fetch(`http://localhost:3000/proposta/atualizarStatus/${idProposta}`, configAtualizarStatus)
                .then((res) => res.json())
                .then((data) => {
                    window.location.reload();
                });
            } 

            const atualizarStatusPedido = (idPedidoPersonalizado, status) => {

                const bodyAtualizarStatus = {
                    "status" : `${status}`
                }
    
                const configAtualizarStatus = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Authorization' : `Bearer ${tokenArtista}`
                    },
                    body: JSON.stringify(bodyAtualizarStatus)
                }
            
                fetch(`http://localhost:3000/pedidosPersonalizados/atualizarStatusPedido/${idPedidoPersonalizado}`, configAtualizarStatus)
                .then((res) => res.json())
                .then((data) => {
                    window.location.reload();
                });
            } 

            if(status == "Publicada"){
                const buttonEditar = document.createElement('button');
                buttonEditar.id = `editar_proposta ${proposta.idProposta}`;
                buttonEditar.className = "editar_proposta";
                buttonEditar.innerHTML = "Editar Proposta";

                const buttonExcluir = document.createElement('button');
                buttonExcluir.id = `excluir_proposta ${proposta.idProposta}`;
                buttonExcluir.className = "excluir_proposta";
                buttonExcluir.innerHTML = "Excluir Proposta";

                buttons.innerHTML = ""
                buttons.appendChild(buttonEditar);
                buttons.appendChild(buttonExcluir);

                const modal_editar_proposta = document.getElementById("modal_editar_proposta")
                

                buttonEditar.addEventListener('click', () => {
                    const configPropostaById = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                            'Authorization' : `Bearer ${tokenArtista}`
                        }
                    } 
                    fetch(`http://localhost:3000/proposta/${proposta.idProposta}`, configPropostaById)
                        .then((res) => res.json())
                        .then((data) => {

                            const propostaById = data.proposta
                            console.log(data)
                            return propostaById.map(propostaById => {
                                let prazoEntregaPadraoBanco = propostaById.prazoEntrega;
                                let prazoEntregaPadrao = prazoEntregaPadraoBanco[0] + prazoEntregaPadraoBanco[1] + prazoEntregaPadraoBanco[2] + prazoEntregaPadraoBanco[3] + prazoEntregaPadraoBanco[4] + prazoEntregaPadraoBanco[5] + prazoEntregaPadraoBanco[6] + prazoEntregaPadraoBanco[7] + prazoEntregaPadraoBanco[8] + prazoEntregaPadraoBanco[9];
                
                                modal_editar_proposta.innerHTML = 
                                `
                                <h1 class="h1_proposta">Editar proposta</h1>
                                <div class="descricao_preco_prazo_buttons">
                                    <section>  
                                        <p>Descrição:</p>
                                        <textarea name="modal_proposta" style="resize: none" id="descricao_pedido_personalizado" class="descricao_pedido_personalizado" cols="13" rows="13">${propostaById.descricao}</textarea>
                                    </section>
                                    <div class="inputs_buttons">
                                        <section>
                                            <p>Preço:</p>
                                            <input type="number" name="preco" class="input_text_preco"  id="input_text_preco_proposta_pedido_personalizado" value="${propostaById.preco}">
                                        </section>
                                        <section>
                                            <p>Prazo de entrega:</p>
                                            <input type="date" name="prazo" class="input_text_prazo" value="${prazoEntregaPadrao}" id="input_text_prazo_proposta_pedido_personalizado">
                                        </section>
                                        <div class="buttons_proposta_pedido_personalizado">
                                            <button class="cancelar" id="button_cancelar_proposta_pedido_personalizado">Cancelar</button>
                                            <button class="enviar" id="button_enviar_proposta_pedido_personalizado">Enviar</button>
                                        </div>
                                    </div>
                                </div>
                                `;


                                const button_cancelar_proposta_pedido_personalizado = document.getElementById("button_cancelar_proposta_pedido_personalizado");

                                if(button_cancelar_proposta_pedido_personalizado != null){
                                    button_cancelar_proposta_pedido_personalizado.addEventListener('click', function(){
                                        modal_editar_proposta.innerHTML = "";
                                        modal_editar_proposta.style.display = "none";
                                    })
                                }
            
                                const button_enviar_proposta_pedido_personalizado = document.getElementById("button_enviar_proposta_pedido_personalizado");
            
                                if(button_enviar_proposta_pedido_personalizado != null){
                                    button_enviar_proposta_pedido_personalizado.addEventListener('click', function(){
                                            
                                            const descricao = document.getElementById("descricao_pedido_personalizado").value;
                                            const preco = document.getElementById("input_text_preco_proposta_pedido_personalizado").value;
                                            const prazo = document.getElementById("input_text_prazo_proposta_pedido_personalizado").value;
                    
                                            const bodyAtualizarProposta = {
                                                "descricao" : descricao,
                                                "preco" : preco,
                                                "prazoEntrega" : prazo,
                                                "status" : status
                                            }
                    
                                            const configAtualizarProposta = {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Cache-Control': 'no-cache',
                                                    'Authorization' : `Bearer ${tokenArtista}`
                                                },
                                                body: JSON.stringify(bodyAtualizarProposta)
                                            }

                                            console.log(configAtualizarProposta)
                                            console.log(bodyAtualizarProposta)
                    
                                            fetch(`http://localhost:3000/proposta/atualizarProposta/${proposta.idProposta}`, configAtualizarProposta)
                                            .then((res) => res.json())
                                            .then((data) => {
                                                modal_editar_proposta.innerHTML = "";
                                                modal_editar_proposta.style.display = "none";
                                                window.location.reload();
                                            })
                                    })
                                }

                                modal_editar_proposta.style.display = "flex";
                            })
                        })
                });

                const fundo_excluir_proposta = document.getElementById("fundo_excluir_proposta");
    
                buttonExcluir.addEventListener("click", function(){
    
                    fundo_excluir_proposta.innerHTML = 
                    `
                    <div class="modal_excluir_proposta" id="modal_excluir_proposta">
                        <h2>VOCÊ TEM CERTEZA DE QUE DESEJA EXCLUIR ESTA PROPOSTA?</h2>
                        <div class="botoes_excluir_proposta">
                            <button class="button_azul" id="button_negar_exclusao_proposta">NÃO</button>
                            <button class="button_vermelho" id="button_confirmar_exclusao_proposta">SIM</button>
                        </div>
                    </div>
                    `;
    
                    fundo_excluir_proposta.style.display = "flex";

                    const button_confirmar_exclusao_proposta = document.getElementById("button_confirmar_exclusao_proposta");
    
                    button_confirmar_exclusao_proposta.addEventListener("click", function(){

                        excluirProposta(proposta.idProposta);
                        fundo_excluir_proposta.style.display = "none";
        
                    });
    
                    const button_negar_exclusao_proposta = document.getElementById("button_negar_exclusao_proposta");
    
                    button_negar_exclusao_proposta.addEventListener("click", function(){
    
                        fundo_excluir_proposta.style.display = "none";
        
                    });
            
    
                });

            } else if(status == "Aceita"){
                const buttonIniciarPedido = document.createElement('button');
                buttonIniciarPedido.id = `iniciar_pedido ${proposta.idProposta}`;
                buttonIniciarPedido.className = "iniciar_pedido";
                buttonIniciarPedido.innerHTML = "Iniciar Pedido";

                const buttonEditar = document.createElement('button');
                buttonEditar.id = `editar_proposta ${proposta.idProposta}`;
                buttonEditar.className = "editar_proposta";
                buttonEditar.innerHTML = "Editar Proposta";
   
                const buttonExcluir = document.createElement('button');
                buttonExcluir.id = `excluir_proposta ${proposta.idProposta}`;
                buttonExcluir.className = "excluir_proposta";
                buttonExcluir.innerHTML = "Excluir Proposta";

                buttons.innerHTML = ""
                buttons.appendChild(buttonIniciarPedido);
                buttons.appendChild(buttonEditar);
                buttons.appendChild(buttonExcluir);

                buttonIniciarPedido.addEventListener("click", () => {
                    atualizarStatus(proposta.idProposta, "Em andamento"); 
                    atualizarStatusPedido(proposta.idPedidoPersonalizado, "Em andamento");
                });


                const modal_editar_proposta = document.getElementById("modal_editar_proposta")
                
                buttonEditar.addEventListener('click', function(){

             
                    const configPropostaById = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                            'Authorization' : `Bearer ${tokenArtista}`
                        }
                    } 
                    fetch(`http://localhost:3000/proposta/${proposta.idProposta}`, configPropostaById)
                        .then((res) => res.json())
                        .then((data) => {

                            const propostaById = data.proposta
                            console.log(data)
                            return propostaById.map(propostaById => {
                                let prazoEntregaPadraoBanco = propostaById.prazoEntrega;
                                let prazoEntregaPadrao = prazoEntregaPadraoBanco[0] + prazoEntregaPadraoBanco[1] + prazoEntregaPadraoBanco[2] + prazoEntregaPadraoBanco[3] + prazoEntregaPadraoBanco[4] + prazoEntregaPadraoBanco[5] + prazoEntregaPadraoBanco[6] + prazoEntregaPadraoBanco[7] + prazoEntregaPadraoBanco[8] + prazoEntregaPadraoBanco[9];
                
                                modal_editar_proposta.innerHTML = 
                                `
                                <h1 class="h1_proposta">Editar proposta</h1>
                                <div class="descricao_preco_prazo_buttons">
                                    <section>  
                                        <p>Descrição:</p>
                                        <textarea name="modal_proposta" style="resize: none" id="descricao_pedido_personalizado" class="descricao_pedido_personalizado" cols="13" rows="13">${propostaById.descricao}</textarea>
                                    </section>
                                    <div class="inputs_buttons">
                                        <section>
                                            <p>Preço:</p>
                                            <input type="number" name="preco" class="input_text_preco"  id="input_text_preco_proposta_pedido_personalizado" value="${propostaById.preco}">
                                        </section>
                                        <section>
                                            <p>Prazo de entrega:</p>
                                            <input type="date" name="prazo" class="input_text_prazo" value="${prazoEntregaPadrao}" id="input_text_prazo_proposta_pedido_personalizado">
                                        </section>
                                        <div class="buttons_proposta_pedido_personalizado">
                                            <button class="cancelar" id="button_cancelar_proposta_pedido_personalizado">Cancelar</button>
                                            <button class="enviar" id="button_enviar_proposta_pedido_personalizado">Enviar</button>
                                        </div>
                                    </div>
                                </div>
                                `;


                                const button_cancelar_proposta_pedido_personalizado = document.getElementById("button_cancelar_proposta_pedido_personalizado");

                                if(button_cancelar_proposta_pedido_personalizado != null){
                                    button_cancelar_proposta_pedido_personalizado.addEventListener('click', function(){
                                        modal_editar_proposta.innerHTML = "";
                                        modal_editar_proposta.style.display = "none";
                                    })
                                }
            
                                const button_enviar_proposta_pedido_personalizado = document.getElementById("button_enviar_proposta_pedido_personalizado");
            
                                if(button_enviar_proposta_pedido_personalizado != null){
                                    button_enviar_proposta_pedido_personalizado.addEventListener('click', function(){
                                            
                                            const descricao = document.getElementById("descricao_pedido_personalizado").value;
                                            const preco = document.getElementById("input_text_preco_proposta_pedido_personalizado").value;
                                            const prazo = document.getElementById("input_text_prazo_proposta_pedido_personalizado").value;
                    
                                            const bodyAtualizarProposta = {
                                                "descricao" : descricao,
                                                "preco" : preco,
                                                "prazoEntrega" : prazo,
                                                "status" : status
                                            }
                    
                                            const configAtualizarProposta = {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Cache-Control': 'no-cache',
                                                    'Authorization' : `Bearer ${tokenArtista}`
                                                },
                                                body: JSON.stringify(bodyAtualizarProposta)
                                            }

                                            console.log(configAtualizarProposta)
                                            console.log(bodyAtualizarProposta)
                    
                                            fetch(`http://localhost:3000/proposta/atualizarProposta/${proposta.idProposta}`, configAtualizarProposta)
                                            .then((res) => res.json())
                                            .then((data) => {
                                                modal_editar_proposta.innerHTML = "";
                                                modal_editar_proposta.style.display = "none";
                                                window.location.reload();
                                            })
                                    })
                                }

                                modal_editar_proposta.style.display = "flex";
                            })
                        })
                    

                });
                

                const fundo_excluir_proposta = document.getElementById("fundo_excluir_proposta");
    
                buttonExcluir.addEventListener("click", function(){
    
                    fundo_excluir_proposta.innerHTML = 
                    `
                    <div class="modal_excluir_proposta" id="modal_excluir_proposta" value="${proposta.idProposta}">
                        <h2>VOCÊ TEM CERTEZA DE QUE DESEJA EXCLUIR ESTA PROPOSTA?</h2>
                        <div class="botoes_excluir_proposta">
                            <button class="button_azul" id="button_negar_exclusao_proposta">NÃO</button>
                            <button class="button_vermelho" id="button_confirmar_exclusao_proposta">SIM</button>
                        </div>
                    </div>
                    `;
    
                    fundo_excluir_proposta.style.display = "flex";

                    const button_confirmar_exclusao_proposta = document.getElementById("button_confirmar_exclusao_proposta");
    
                    button_confirmar_exclusao_proposta.addEventListener("click", function(){

                        excluirProposta(proposta.idProposta);
                        fundo_excluir_proposta.style.display = "none";
        
                    });
    
                    const button_negar_exclusao_proposta = document.getElementById("button_negar_exclusao_proposta");
    
                    button_negar_exclusao_proposta.addEventListener("click", function(){
    
                        fundo_excluir_proposta.style.display = "none";
                        fundo_excluir_proposta.innerHTML = "";
        
                    });
            
    
                });
                
                
            } else if(status == "Em andamento"){
                const buttonFinalizarPedido = document.createElement('button');
                buttonFinalizarPedido.id = `finalizar_pedido ${proposta.idProposta}`;
                buttonFinalizarPedido.className = "finalizar_pedido";
                buttonFinalizarPedido.innerHTML = "Finalizar Pedido";

                const buttonEntrarContato = document.createElement('button');
                buttonEntrarContato.id = `entrar_em_contato ${proposta.idProposta}`;
                buttonEntrarContato.className = "entrar_em_contato";
                buttonEntrarContato.innerHTML = "Entrar em contato";

                const buttonCancelar = document.createElement('button');
                buttonCancelar.id = `cancelar_proposta ${proposta.idProposta}`;
                buttonCancelar.className = "cancelar_proposta";
                buttonCancelar.innerHTML = "Cancelar Proposta";

                buttons.innerHTML = ""
                buttons.appendChild(buttonFinalizarPedido);
                buttons.appendChild(buttonEntrarContato);
                buttons.appendChild(buttonCancelar);

                buttonEntrarContato.addEventListener("click", function(){
                    window.location.href = `../../../chat/index.html?q=${proposta.idCliente}`;
                });

                const fundo_finalizar_pedido = document.getElementById("fundo_finalizar_pedido");

                buttonFinalizarPedido.addEventListener("click", function(){

                    fundo_finalizar_pedido.innerHTML = 
                    `
                    <div class="modal_finalizar_pedido" id="modal_finalizar_pedido">

                    <h2>VOCÊ TEM CERTEZA DE QUE DESEJA FINALIZAR ESTE PEDIDO?</h2>
                        <div class="botoes_finalizar_pedido">
                            <button class="button_vermelho" id="button_negar_finalizar_pedido">NÃO</button>
                            <button class="button_azul" id="button_confirmar_finalizar_pedido">SIM</button>
                        </div>
                    </div>                
                    `;

                    fundo_finalizar_pedido.style.display = "flex";

                    const button_confirmar_finalizar_pedido = document.getElementById("button_confirmar_finalizar_pedido");
                    button_confirmar_finalizar_pedido.addEventListener("click", function(){

                        atualizarStatus(proposta.idProposta, "Finalizado")
                        atualizarStatusPedido(proposta.idPedidoPersonalizado, "Finalizado")
                        fundo_finalizar_pedido.style.display = "none";

                    });

                    const button_negar_finalizar_pedido = document.getElementById("button_negar_finalizar_pedido");
                    button_negar_finalizar_pedido.addEventListener("click", function(){

                        fundo_finalizar_pedido.style.display = "none";
                        fundo_finalizar_pedido.innerHTML = "";
                    });
            

                });

                const fundo_cancelar_proposta = document.getElementById("fundo_cancelar_proposta");
          
                buttonCancelar.addEventListener("click", function(){

                    fundo_cancelar_proposta.innerHTML = 
                    `
                    <div class="modal_excluir_proposta" id="modal_excluir_proposta">
                        <h2>VOCÊ TEM CERTEZA DE QUE DESEJA EXCLUIR ESTA PROPOSTA?</h2>
                        <div class="botoes_excluir_proposta">
                            <button class="button_azul" id="button_negar_exclusao_proposta">NÃO</button>
                            <button class="button_vermelho" id="button_confirmar_exclusao_proposta">SIM</button>
                        </div>
                    </div>
                    `;

                    fundo_cancelar_proposta.style.display = "flex";

                    const button_confirmar_exclusao_proposta = document.getElementById("button_confirmar_exclusao_proposta");
                    button_confirmar_exclusao_proposta.addEventListener("click", function(){

                        excluirProposta(proposta.idProposta);
                        fundo_excluir_proposta.style.display = "none";
        
                    });

                    const button_negar_exclusao_proposta = document.getElementById("button_negar_exclusao_proposta");
                    button_negar_exclusao_proposta.addEventListener("click", function(){

                        fundo_cancelar_proposta.style.display = "none";
        
                    });
                });


            } else if(status == "Finalizado"){
                const buttonPedidoDespachado = document.createElement('button');
                buttonPedidoDespachado.id = `pedido_despachado ${proposta.idProposta}`;
                buttonPedidoDespachado.className = "pedido_despachado";
                buttonPedidoDespachado.innerHTML = "Pedido Despachado";

                const buttonEntrarContato = document.createElement('button');
                buttonEntrarContato.id = `entrar_em_contato ${proposta.idProposta}`;
                buttonEntrarContato.className = "entrar_em_contato";
                buttonEntrarContato.innerHTML = "Entrar em contato";

                buttons.innerHTML = ""
                buttons.appendChild(buttonPedidoDespachado);
                buttons.appendChild(buttonEntrarContato);

                buttonPedidoDespachado.onclick = () => {
                    atualizarStatus(proposta.idProposta, "Despachado")
                    atualizarStatusPedido(proposta.idPedidoPersonalizado, "Despachado")
                }

                
                buttonEntrarContato.addEventListener("click", function(){
                    window.location.href = `../../../chat/index.html?q=${proposta.idCliente}`;
                });


            } else if(status == "Despachado"){
                const buttonEntrarContato = document.createElement('button');
                buttonEntrarContato.id = "entrar_em_contato";
                buttonEntrarContato.className = "entrar_em_contato";
                buttonEntrarContato.innerHTML = "Entrar em contato";

                const buttonAvaliarCliente = document.createElement('button');
                buttonAvaliarCliente.id = `avaliar_cliente ${proposta.idProposta}` ;
                buttonAvaliarCliente.className = "avaliar_cliente";
                buttonAvaliarCliente.innerHTML = "Avaliar Cliente";
                
                buttons.innerHTML = ""
                buttons.appendChild(buttonEntrarContato);
                buttons.appendChild(buttonAvaliarCliente);

                
                buttonEntrarContato.addEventListener("click", function(){
                    window.location.href = `../../../chat/index.html?q=${proposta.idCliente}`;
                });

                const fundo_modal_avaliar_cliente = document.getElementById("fundo_modal_avaliar_cliente");
                  
                buttonAvaliarCliente.addEventListener("click", () => {
        
                            fundo_modal_avaliar_cliente.innerHTML = 
                            `
                            <div class="modal_avaliar_cliente" id="modal_avaliar_cliente ${proposta.idArtista}">
                                <h2>Avalie seu artista</h2>
                                <div class="estrelas_nota">
                                    <div class="estrelas" id="estrelas_nota">
                                        <a href="javascript:void(0)" id="avaliar1">
                                        <img src="../img/star0.png" id="s1"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar2">
                                        <img src="../img/star0.png" id="s2"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar3">
                                        <img src="../img/star0.png" id="s3"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar4">
                                        <img src="../img/star0.png" id="s4"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar5">
                                        <img src="../img/star0.png" id="s5"></a>
                                    </div>
                                    
                                    <p class="avaliacao" id="rating"></p>
                                </div>
                                <textarea name="" placeholder="Digite aqui sua avaliação" style="resize: none;" id="textAreaDescricao" cols="30" rows="10"></textarea>
                                <div class="buttons">
                                    <button class="vermelho" id="cancelar_avaliacao">CANCELAR</button>
                                    <button class="azul" id="confirmar_avaliacao">ENVIAR</button>
                                </div>
                            </div>
                            `;
        
                            fundo_modal_avaliar_cliente.style.display = "flex";

                            const estrelasParaArtista = document.getElementById("estrelas_nota");

                            const star1 = document.getElementById("s1");
                            const star2 = document.getElementById("s2");
                            const star3 = document.getElementById("s3");
                            const star4 = document.getElementById("s4");
                            const star5 = document.getElementById("s5");

                            const avaliar1 = document.getElementById("avaliar1");
                            const avaliar2 = document.getElementById("avaliar2");
                            const avaliar3 = document.getElementById("avaliar3");
                            const avaliar4 = document.getElementById("avaliar4");
                            const avaliar5 = document.getElementById("avaliar5");

                            const rating = document.getElementById("rating");

                            avaliar1.onclick = () => {
                                Avaliar(1)
                            }

                            avaliar2.onclick = () => {
                                Avaliar(2)
                            }

                            avaliar3.onclick = () => {
                                Avaliar(3)
                            }

                            avaliar4.onclick = () => {
                                Avaliar(4)
                            }

                            avaliar5.onclick = () => {
                                Avaliar(5)
                            }

                            star1.addEventListener("mouseenter", function(){
                                star1.src = "../img/star1.png";
                                star2.src = "../img/star0.png";
                                star3.src = "../img/star0.png";
                                star4.src = "../img/star0.png";
                                star5.src = "../img/star0.png";
                            })

                            star2.addEventListener("mouseenter", function(){
                                star1.src = "../img/star1.png";
                                star2.src = "../img/star1.png";
                                star3.src = "../img/star0.png";
                                star4.src = "../img/star0.png";
                                star5.src = "../img/star0.png";
                            })

                            star3.addEventListener("mouseenter", function(){
                                star1.src = "../img/star1.png";
                                star2.src = "../img/star1.png";
                                star3.src = "../img/star1.png";
                                star4.src = "../img/star0.png";
                                star5.src = "../img/star0.png";
                            })

                            star4.addEventListener("mouseenter", function(){
                                star1.src = "../img/star1.png";
                                star2.src = "../img/star1.png";
                                star3.src = "../img/star1.png";
                                star4.src = "../img/star1.png";
                                star5.src = "../img/star0.png";
                            })

                            star5.addEventListener("mouseenter", function(){
                                star1.src = "../img/star1.png";
                                star2.src = "../img/star1.png";
                                star3.src = "../img/star1.png";
                                star4.src = "../img/star1.png";
                                star5.src = "../img/star1.png";
                            })


                            estrelasParaArtista.addEventListener("mouseleave", function(){
                                if(rating.innerHTML == 1.0){
                                    star1.src = "../img/star1.png";
                                    star2.src = "../img/star0.png";
                                    star3.src = "../img/star0.png";
                                    star4.src = "../img/star0.png";
                                    star5.src = "../img/star0.png";
                                } else if(rating.innerHTML == 2.0){
                                    star1.src = "../img/star1.png";
                                    star2.src = "../img/star1.png";
                                    star3.src = "../img/star0.png";
                                    star4.src = "../img/star0.png";
                                    star5.src = "../img/star0.png";
                                } else if(rating.innerHTML == 3.0){
                                    star1.src = "../img/star1.png";
                                    star2.src = "../img/star1.png";
                                    star3.src = "../img/star1.png";
                                    star4.src = "../img/star0.png";
                                    star5.src = "../img/star0.png";
                                } else if(rating.innerHTML == 4.0){
                                    star1.src = "../img/star1.png";
                                    star2.src = "../img/star1.png";
                                    star3.src = "../img/star1.png";
                                    star4.src = "../img/star1.png";
                                    star5.src = "../img/star0.png";
                                } else if(rating.innerHTML == 5.0){
                                    star1.src = "../img/star1.png";
                                    star2.src = "../img/star1.png";
                                    star3.src = "../img/star1.png";
                                    star4.src = "../img/star1.png";
                                    star5.src = "../img/star1.png";
                                } else if(rating.innerHTML == ""){
                                    star1.src = "../img/star0.png";
                                    star2.src = "../img/star0.png";
                                    star3.src = "../img/star0.png";
                                    star4.src = "../img/star0.png";
                                    star5.src = "../img/star0.png";
                                }
                            })

                            const textAreaDescricao = document.getElementById("textAreaDescricao");
                           
                            const button_confirmar_avaliacao = document.getElementById("confirmar_avaliacao");
                            button_confirmar_avaliacao.addEventListener("click", function(){

                                const avaliacao = rating.innerHTML;
                                const descricao = textAreaDescricao.value;
                                if(avaliacao == ""){
                                    alert("Você precisa dar uma nota para avaliar!");
                                    return;
                                } else if(descricao == ""){
                                    alert("Você precisa dar uma descrição para avaliar!");
                                    return;
                                } else if(avaliacao != "" && descricao != ""){
                                    avaliarCliente(proposta.idCliente, avaliacao, descricao, proposta.idProposta);
                                    atualizarStatus(proposta.idProposta, "Despachado e Cliente Avaliado");
                                    fundo_modal_avaliar_cliente.innerHTML = "";
                                    fundo_modal_avaliar_cliente.style.display = "none";
                                    window.location.reload();
                                }
                               
                
                            });
        
                            const button_cancelar_avaliacao = document.getElementById("cancelar_avaliacao");
                            button_cancelar_avaliacao.addEventListener("click", function(){
                                fundo_modal_avaliar_cliente.innerHTML = "";
                                fundo_modal_avaliar_cliente.style.display = "none";
                
                            });

                        });


            } else if(status == "Recusada"){

                const buttonExcluir = document.createElement('button');
                buttonExcluir.id = `excluir_proposta ${proposta.idProposta}`;
                buttonExcluir.className = "excluir_proposta";
                buttonExcluir.innerHTML = "Excluir Proposta";

                buttons.innerHTML = ""
                buttons.appendChild(buttonExcluir);

             
                buttonExcluir.addEventListener("click", () => {
                    excluirProposta(proposta.idProposta);
                    div.remove();
                });

            } else if(status == "Despachado e Cliente Avaliado"){

                const buttonEntrarContato = document.createElement('button');
                buttonEntrarContato.id = `entrar_contato ${proposta.idProposta}`;
                buttonEntrarContato.className = "entrar_em_contato";
                buttonEntrarContato.innerHTML = "Entrar em contato";
                
                buttons.innerHTML = ""
                buttons.appendChild(buttonEntrarContato);

                buttonEntrarContato.addEventListener("click", function(){
                    window.location.href = `../../../chat/index.html?q=${proposta.idCliente}`;
                });
            }



            const fundo_ver_pedido = document.getElementById("fundo_ver_pedido");
          
            const button_ver_pedido= document.getElementById("button_ver_pedido " + proposta.idProposta);

            button_ver_pedido.addEventListener("click", function(){

               fundo_ver_pedido.innerHTML = 

                ` 
                <div class="modal_ver_pedido" id="modal_ver_pedido ${proposta.idProposta}">
                    <div class="nome_tipo_contato" id="nome_tipo_contato">

                        <img class="img_perfil" id="img_perfil ${proposta.idCliente}" src="${proposta.fotoPerfilCliente}" alt="" srcset="">

                        <p class="nome"  id="nome_cliente">${proposta.nomeCliente}</p>
                        <section id="avaliacao">
                            <img id="estrelas" src="../img/estrela2.png" alt="">
                            <p id="avaliacaoCliente ${proposta.idProposta}"></p>
                        </section>

                        <section class="categoria_pedido" id="categoria_pedido">
                            <p>${proposta.nomeCategoria}</p>
                        </section>

                        <p id="fechar" class="fechar" alt="">x</p>
                    </div>

                    <p id="descricao_pedido">
                        ${proposta.descricaoPedidoPersonalizado}
                    </p>


                    <div class="imgs">
                        <div class="img_grande" id="imgGrande ${proposta.idPedidoPersonalizado}">
                        </div>
                        <div class="imgs_pequenas" id="imgPequena ${proposta.idPedidoPersonalizado}">
                        </div>
                    </div>    

                </div>`;

                const imgGrande = document.getElementById(`imgGrande ${proposta.idPedidoPersonalizado}`);
                const imgPequena = document.getElementById(`imgPequena ${proposta.idPedidoPersonalizado}`);

                if(proposta.imagem1opcional != ""){
                    imgGrande.innerHTML = `
                        <img src="${proposta.imagem1opcional}" alt="" class="img1" id="img-1 ${proposta.idPedidoPersonalizado}">
                    `;
                } else {
                    imgGrande.innerHTML = `
                        <img src="../img/no-image.png" alt="" class="img1" id="img-1">
                    `;
                }

                if(proposta.imagem2opcional != ""){
                    const div = `
                            <div class="img_pequena">
                                <img src="${proposta.imagem2opcional}" alt="" class="img2" id="img-2 ${proposta.idPedidoPersonalizado}">
                            </div>
                            `;
                    imgPequena.innerHTML += div;
                }

                if(proposta.imagem3opcional != ""){
                    const div = `
                            <div class="img_pequena">
                                <img src="${proposta.imagem3opcional}" alt="" class="img2" id="img-3 ${proposta.idPedidoPersonalizado}">
                            </div>
                            `;
                    imgPequena.innerHTML += div;
                }

                var img1 = document.getElementById(`img-1 ${proposta.idPedidoPersonalizado}`)
                var img2 = document.getElementById(`img-2 ${proposta.idPedidoPersonalizado}`)
                var img3 = document.getElementById(`img-3 ${proposta.idPedidoPersonalizado}`)
    
                const perfilCliente = document.getElementById(`img_perfil ${proposta.idCliente}`);
                perfilCliente.addEventListener("click", () => {
                    window.location.href = `../../../visualizar-cliente/index.html?q=${proposta.idCliente}`;
                });

                const removeImageIfEmptyAndPutEventListener = (img) => {
                    const tradeImage = () => {
                        const imageOnMain = img1.src
                        const imageSelected = img.src

                        img1.src = imageSelected
                        img.src = imageOnMain
                    }

                    if (img == null) {
                        console.log(img)
                    } else {
                        img.addEventListener('click', () => {
                            tradeImage()
                        })
                    }
                }

                const optionalImages = [img2, img3]

                optionalImages.map(removeImageIfEmptyAndPutEventListener)
            
            

                getAvaliacaoCliente(proposta.idCliente, proposta.idProposta);

                fundo_ver_pedido.style.display = "flex";

                const fechar = document.getElementById("fechar");

                fechar.addEventListener("click", function(){

                    fundo_ver_pedido.innerHTML = "";
                    fundo_ver_pedido.style.display = "none";

                });
        

            });
        })
    } else {
        minhasPropostas.innerHTML = "<h2 id='semProposta'>Você não possui propostas...</h2>";
    }
    }) 
}

getMinhasPropostas();



