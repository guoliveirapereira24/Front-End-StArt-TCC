"use strict";

const tokenArtista = localStorage.getItem('tokenArtista');

const listagemPedidosPublicos = document.getElementById('listagem_pedidos_publicos');
const listagemPedidosParaMim = document.getElementById('listagem_pedidos_para_mim');

const buttonLogout = document.getElementById('logout');

const logout = () => {
    localStorage.setItem("tokenCliente", undefined);
    localStorage.setItem("tokenArtista", undefined);
    window.location.href = "../../login/index.html";
  }
  
  
  buttonLogout.addEventListener('click', () => {
    logout();
  });
  

const getPedidosPublicos = () => {
    const configPedidosPublicos = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokenArtista}`,
            'Cache-Control': 'no-cache'
        }
    }

    fetch("http://localhost:3000/pedidosPersonalizados/pedidosPublicos", configPedidosPublicos)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const pedidoPersonalizado = data.pedidoPersonalizado;
       
                pedidoPersonalizado.map(pedidoPersonalizado => {

                    const idPedidoPersonalizado = pedidoPersonalizado.idPedidoPersonalizado;

                    const divCard = document.createElement("div");
                    divCard.className = "card";
                    divCard.id = idPedidoPersonalizado;
                    divCard.innerHTML = `
                        <div id="nome_tipo_contato">
                            
                            <section class="img_nome_avaliacao">
                                <section class="img_nome">
                                    <img id="img_perfil" src="${pedidoPersonalizado.fotoPerfilCliente}" alt="" srcset="">
            
                                    <p class="nome" id="nome_cliente">${pedidoPersonalizado.nomeCliente}</p>
                                </section>
                        
                                
                                <section id="avaliacao">
                                    <img id="estrelas" src="../img/estrela2.png" alt="">
                                    <p>4.5</p>
                                </section>
            
                            </section>
                
                            <section id="categoria_pedido">
                                
                                <p>${pedidoPersonalizado.nomeEspecialidade}</p>
                                
                            </section>
                        
                            <button id="contatar">
                                <img src="../img/contatar.png" alt="">
                                <p>Contatar</p>
                            </button>
                            
                        </div>
                        <p id="descricao_pedido">${pedidoPersonalizado.descricao}</p>
        
                        <div id="exemplo_botoes">
                            <img src="${pedidoPersonalizado.imagem1opcional}" alt="">
        
                            <div class="botoes" id="botoes ${pedidoPersonalizado.idPedidoPersonalizado}">
                            </div>
        
                        </div>
                    `;
                    
                    listagemPedidosPublicos.appendChild(divCard);

                    const botoes = document.getElementById(`botoes ${idPedidoPersonalizado}`);

     
                        const buttonFazerProposta = document.createElement('button');
                        buttonFazerProposta.id = `fazer_proposta ${idPedidoPersonalizado}`;
                        buttonFazerProposta.className = "fazer_proposta";
                        buttonFazerProposta.innerHTML = "Fazer Proposta";
        
        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonFazerProposta);
                        
                        buttonFazerProposta.addEventListener('click', () => {

                            const date = new Date();
                            const currentYear = date.getFullYear();
                            const today = date.getDate();
                            const currentMonth = date.getMonth() + 1; 


                           

                            const divModalProposta = document.getElementById('modal_proposta');

                            divModalProposta.innerHTML = `
                                <h1 class="h1_proposta">Faça a sua proposta para esse pedido personalizado</h1>

                                <div class="descricao_preco_prazo_buttons">
                                    <section>  
                                        <p>Descrição:</p>
                                        <textarea style="resize: none" id="input_text_descricao_proposta_pedido_personalizado" class="descricao_pedido_personalizado" cols="13" rows="13"></textarea>
                                    </section>
                            
                        
                                    <div class="inputs_buttons">
                                        <section>
                                            <p>Preço:</p>
                                            <input type="text" name="preco" class="input_text_preco"  id="input_text_preco_proposta_pedido_personalizado" value="">
                                        </section>
                                        <section>
                                            <p>Prazo de entrega:</p>
                                            <input type="date" min="${currentYear + "-" + currentMonth + "-" + today}" name="prazo" class="input_text_prazo" id="input_text_prazo_proposta_pedido_personalizado">
                                        </section>
                        
                                        <div class="buttons_proposta_pedido_personalizado">
                                            <button class="cancelar" id="button_cancelar_proposta_pedido_personalizado">Cancelar</button>
                                            <button class="enviar" id="button_enviar_proposta_pedido_personalizado">Enviar</button>
                                        </div>
                        
                                    </div>
                        
                        
                                </div>
                            `;
                            divModalProposta.style.display = "flex";
                            console.log("sfjdsfds");

                            const buttonCancelarProposta = document.getElementById('button_cancelar_proposta_pedido_personalizado');
                            buttonCancelarProposta.addEventListener('click', () => {
                                divModalProposta.innerHTML = "";
                                divModalProposta.style.display = "none";
                            });

                            const buttonEnviarProposta = document.getElementById('button_enviar_proposta_pedido_personalizado');
                            buttonEnviarProposta.addEventListener('click', () => {

                                const descricaoProposta = document.getElementById('input_text_descricao_proposta_pedido_personalizado').value;
                                const precoProposta = document.getElementById('input_text_preco_proposta_pedido_personalizado').value;
                                const prazoProposta = document.getElementById('input_text_prazo_proposta_pedido_personalizado').value;

                                console.log(descricaoProposta);
                                    
                                const body = {
                                        "descricao": descricaoProposta,
                                        "preco": precoProposta,
                                        "prazoEntrega": prazoProposta,
                                        "status": "Publicada"
                                }

                                const configFazerProposta = {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${tokenArtista}`
                                    },
                                    body: JSON.stringify(body)
                                }
                                if(descricaoProposta == "" || precoProposta == "" || prazoProposta == ""){
                                    alert("Preencha todos os campos");
                                } else {

                                    fetch(`http://localhost:3000/proposta/fazerProposta/${idPedidoPersonalizado}`, configFazerProposta)
                                        .then((res) => res.json())
                                        .then((data) => {
                                            console.log(data);
                                            divModalProposta.innerHTML = "";
                                            divModalProposta.style.display = "none";
                                            divCard.remove()
                                        })
                                        .catch((error) => console.log(error));

                                 
                                }
                            });   
                        });

                })

        })


}

const getPedidosParaMim = () => {
    const configPedidosPublicos = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokenArtista}`,
            'Cache-Control': 'no-cache'
        }
    }

    fetch("http://localhost:3000/pedidosPersonalizados/pedidosParaMim", configPedidosPublicos)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const pedidoPersonalizado = data.pedidoPersonalizado;
       
                pedidoPersonalizado.map(pedidoPersonalizado => {

                    const idPedidoPersonalizado = pedidoPersonalizado.idPedidoPersonalizado;

                    const divCard = document.createElement("div");
                    divCard.className = "card";
                    divCard.id = idPedidoPersonalizado;
                    divCard.innerHTML = `
                        <div id="nome_tipo_contato">
                            
                            <section class="img_nome_avaliacao">
                                <section class="img_nome">
                                    <img id="img_perfil" src="${pedidoPersonalizado.fotoPerfilCliente}" alt="" srcset="">
            
                                    <p class="nome" id="nome_cliente">${pedidoPersonalizado.nomeCliente}</p>
                                </section>
                        
                                
                                <section id="avaliacao">
                                    <img id="estrelas" src="../img/estrela2.png" alt="">
                                    <p>4.5</p>
                                </section>
            
                            </section>
                
                            <section id="categoria_pedido">
                                
                                <p>${pedidoPersonalizado.nomeEspecialidade}</p>
                                
                            </section>
                        
                            <button id="contatar">
                                <img src="../img/contatar.png" alt="">
                                <p>Contatar</p>
                            </button>
                            
                        </div>
                        <p id="descricao_pedido">${pedidoPersonalizado.descricao}</p>
        
                        <div id="exemplo_botoes">
                            <img src="${pedidoPersonalizado.imagem1opcional}" alt="">
        
                            <div class="botoes" id="botoes ${pedidoPersonalizado.idPedidoPersonalizado}">
                            </div>
        
                        </div>
                    `;
                    
                    listagemPedidosParaMim.appendChild(divCard);

                    const botoes = document.getElementById(`botoes ${idPedidoPersonalizado}`);

     
                        const buttonFazerProposta = document.createElement('button');
                        buttonFazerProposta.id = `fazer_proposta ${idPedidoPersonalizado}`;
                        buttonFazerProposta.className = "fazer_proposta";
                        buttonFazerProposta.innerHTML = "Fazer Proposta";
        
                        const buttonExcluirProposta = document.createElement('button');
                        buttonExcluirProposta.id = `button_recusar ${idPedidoPersonalizado}`;
                        buttonExcluirProposta.className = "recusar";
                        buttonExcluirProposta.innerHTML = "Recusar Pedido";
        
                        botoes.innerHTML = ""
                        botoes.appendChild(buttonFazerProposta);
                        botoes.appendChild(buttonExcluirProposta);
                        
                        buttonFazerProposta.addEventListener('click', () => {

                            const date = new Date();

                            const currentYear = date.getFullYear();
                            const today = date.getDate();
                            const currentMonth = date.getMonth() + 1; 
                           

                            const divModalProposta = document.getElementById('modal_proposta');

                            divModalProposta.innerHTML = `
                                <h1 class="h1_proposta">Faça a sua proposta para esse pedido personalizado</h1>

                                <div class="descricao_preco_prazo_buttons">
                                    <section>  
                                        <p>Descrição:</p>
                                        <textarea style="resize: none" id="input_text_descricao_proposta_pedido_personalizado" class="descricao_pedido_personalizado" cols="13" rows="13"></textarea>
                                    </section>
                            
                        
                                    <div class="inputs_buttons">
                                        <section>
                                            <p>Preço:</p>
                                            <input type="text" name="preco" class="input_text_preco"  id="input_text_preco_proposta_pedido_personalizado" value="">
                                        </section>
                                        <section>
                                            <p>Prazo de entrega:</p>
                                            <input type="date" min="${currentYear + "-" + currentMonth + "-" + today}" name="prazo" class="input_text_prazo" id="input_text_prazo_proposta_pedido_personalizado">
                                        </section>
                        
                                        <div class="buttons_proposta_pedido_personalizado">
                                            <button class="cancelar" id="button_cancelar_proposta_pedido_personalizado">Cancelar</button>
                                            <button class="enviar" id="button_enviar_proposta_pedido_personalizado">Enviar</button>
                                        </div>
                        
                                    </div>
                        
                        
                                </div>
                            `;
                            divModalProposta.style.display = "flex";

                            const buttonCancelarProposta = document.getElementById('button_cancelar_proposta_pedido_personalizado');
                            buttonCancelarProposta.addEventListener('click', () => {
                                divModalProposta.innerHTML = "";
                                divModalProposta.style.display = "none";
                            });

                            const buttonEnviarProposta = document.getElementById('button_enviar_proposta_pedido_personalizado');
                            buttonEnviarProposta.addEventListener('click', () => {

                                const descricaoProposta = document.getElementById('input_text_descricao_proposta_pedido_personalizado').value;
                                const precoProposta = document.getElementById('input_text_preco_proposta_pedido_personalizado').value;
                                const prazoProposta = document.getElementById('input_text_prazo_proposta_pedido_personalizado').value;

                                console.log(descricaoProposta);
                                    
                                const body = {
                                        "descricao": descricaoProposta,
                                        "preco": precoProposta,
                                        "prazoEntrega": prazoProposta,
                                        "status": "Publicada"
                                }

                                const configFazerProposta = {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${tokenArtista}`
                                    },
                                    body: JSON.stringify(body)
                                }
                                if(descricaoProposta == "" || precoProposta == "" || prazoProposta == ""){
                                    alert("Preencha todos os campos");
                                } else {

                                    fetch(`http://localhost:3000/proposta/fazerProposta/${idPedidoPersonalizado}`, configFazerProposta)
                                        .then((res) => res.json())
                                        .then((data) => {
                                            console.log(data);
                                            divModalProposta.innerHTML = "";
                                            divModalProposta.style.display = "none";
                                            divCard.remove()
                                        })
                                        .catch((error) => console.log(error));

                                 
                                }
                            });   
                        });

                })

        })


}

getPedidosPublicos();
getPedidosParaMim();