"use strict";

const tokenCliente = localStorage.getItem('tokenCliente');

const listagemMeusPedidos = document.getElementById('listagemMeusPedidos');

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
    
    document.getElementById("s1").src = "../../img/star1.png";
    document.getElementById("s2").src = "../../img/star1.png";
    document.getElementById("s3").src = "../../img/star1.png";
    document.getElementById("s4").src = "../../img/star1.png";
    document.getElementById("s5").src = "../../img/star1.png";
    avaliacao = 5;
   
   }
    
    //ESTRELA 4
   if (estrela == 4){ 
    document.getElementById("s1").src = "../../img/star1.png";
    document.getElementById("s2").src = "../../img/star1.png";
    document.getElementById("s3").src = "../../img/star1.png";
    document.getElementById("s4").src = "../../img/star1.png";
    document.getElementById("s5").src = "../../img/star0.png";
    avaliacao = 4;
   }
   
   //ESTRELA 3
   if (estrela == 3){ 
    document.getElementById("s1").src = "../../img/star1.png";
    document.getElementById("s2").src = "../../img/star1.png";
    document.getElementById("s3").src = "../../img/star1.png";
    document.getElementById("s4").src = "../../img/star0.png";
    document.getElementById("s5").src = "../../img/star0.png";
    avaliacao = 3;
 }
    
   //ESTRELA 2
   if (estrela == 2){ 
    document.getElementById("s1").src = "../../img/star1.png";
    document.getElementById("s2").src = "../../img/star1.png";
    document.getElementById("s3").src = "../../img/star0.png";
    document.getElementById("s4").src = "../../img/star0.png";
    document.getElementById("s5").src = "../../img/star0.png";
    avaliacao = 2;
   }
    
    //ESTRELA 1
   if (estrela == 1){ 
    document.getElementById("s1").src = "../../img/star1.png";
    document.getElementById("s2").src = "../../img/star0.png";
    document.getElementById("s3").src = "../../img/star0.png";
    document.getElementById("s4").src = "../../img/star0.png";
    document.getElementById("s5").src = "../../img/star0.png";
    avaliacao = 1;
   }
    
    document.getElementById('rating').innerHTML = avaliacao.toFixed(1);
    
}

const avaliarArtista = (idArtista, avaliacao, descricao) => {

    const body = {
        idArtista: idArtista,
        avaliacaoArtista: avaliacao,
        descricao: descricao
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenCliente}`
        },
        body: JSON.stringify(body)
    }


    fetch(`http://localhost:3000/avaliacao/avaliarArtista`, config)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}

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
                            <div class="modal_avaliar_artista" id="modal_avaliar_artista${proposta.idArtista}">
                                <h2>Avalie seu artista</h2>
                                <div class="estrelas_nota">
                                    <div class="estrelas" id="estrelas_nota">
                                        <a href="javascript:void(0)" id="avaliar1">
                                        <img src="../../img/star0.png" id="s1"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar2">
                                        <img src="../../img/star0.png" id="s2"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar3">
                                        <img src="../../img/star0.png" id="s3"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar4">
                                        <img src="../../img/star0.png" id="s4"></a>
                                        
                                        <a href="javascript:void(0)" id="avaliar5">
                                        <img src="../../img/star0.png" id="s5"></a>
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
        
                            fundo_modal_avaliar_artista.style.display = "flex";

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
                                star1.src = "../../img/star1.png";
                                star2.src = "../../img/star0.png";
                                star3.src = "../../img/star0.png";
                                star4.src = "../../img/star0.png";
                                star5.src = "../../img/star0.png";
                            })

                            star2.addEventListener("mouseenter", function(){
                                star1.src = "../../img/star1.png";
                                star2.src = "../../img/star1.png";
                                star3.src = "../../img/star0.png";
                                star4.src = "../../img/star0.png";
                                star5.src = "../../img/star0.png";
                            })

                            star3.addEventListener("mouseenter", function(){
                                star1.src = "../../img/star1.png";
                                star2.src = "../../img/star1.png";
                                star3.src = "../../img/star1.png";
                                star4.src = "../../img/star0.png";
                                star5.src = "../../img/star0.png";
                            })

                            star4.addEventListener("mouseenter", function(){
                                star1.src = "../../img/star1.png";
                                star2.src = "../../img/star1.png";
                                star3.src = "../../img/star1.png";
                                star4.src = "../../img/star1.png";
                                star5.src = "../../img/star0.png";
                            })

                            star5.addEventListener("mouseenter", function(){
                                star1.src = "../../img/star1.png";
                                star2.src = "../../img/star1.png";
                                star3.src = "../../img/star1.png";
                                star4.src = "../../img/star1.png";
                                star5.src = "../../img/star1.png";
                            })


                            estrelasParaArtista.addEventListener("mouseleave", function(){
                                if(rating.innerHTML == 1.0){
                                    star1.src = "../../img/star1.png";
                                    star2.src = "../../img/star0.png";
                                    star3.src = "../../img/star0.png";
                                    star4.src = "../../img/star0.png";
                                    star5.src = "../../img/star0.png";
                                } else if(rating.innerHTML == 2.0){
                                    star1.src = "../../img/star1.png";
                                    star2.src = "../../img/star1.png";
                                    star3.src = "../../img/star0.png";
                                    star4.src = "../../img/star0.png";
                                    star5.src = "../../img/star0.png";
                                } else if(rating.innerHTML == 3.0){
                                    star1.src = "../../img/star1.png";
                                    star2.src = "../../img/star1.png";
                                    star3.src = "../../img/star1.png";
                                    star4.src = "../../img/star0.png";
                                    star5.src = "../../img/star0.png";
                                } else if(rating.innerHTML == 4.0){
                                    star1.src = "../../img/star1.png";
                                    star2.src = "../../img/star1.png";
                                    star3.src = "../../img/star1.png";
                                    star4.src = "../../img/star1.png";
                                    star5.src = "../../img/star0.png";
                                } else if(rating.innerHTML == 5.0){
                                    star1.src = "../../img/star1.png";
                                    star2.src = "../../img/star1.png";
                                    star3.src = "../../img/star1.png";
                                    star4.src = "../../img/star1.png";
                                    star5.src = "../../img/star1.png";
                                } else if(rating.innerHTML == ""){
                                    star1.src = "../../img/star0.png";
                                    star2.src = "../../img/star0.png";
                                    star3.src = "../../img/star0.png";
                                    star4.src = "../../img/star0.png";
                                    star5.src = "../../img/star0.png";
                                }
                            })

                            const textAreaDescricao = document.getElementById("textAreaDescricao");

                           
                            const button_confirmar_avaliacao = document.getElementById("confirmar_avaliacao");
                            button_confirmar_avaliacao.addEventListener("click", function(){

                                const avaliacao = document.getElementById("avaliacao");
                                const descricao = document.getElementById("textAreaDescricao").value;
                                const id_artista = document.getElementById("id_artista").value; 

                                if(rating.innerHTML == ""){
                                    alert("Você precisa dar uma nota para avaliar!");
                                    return;
                                } else if(textAreaDescricao == ""){
                                    alert("Você precisa dar uma descrição para avaliar!");
                                    return;
                                } else if(rating.innerHTML != "" && textAreaDescricao != ""){
                                    avaliarArtista(idArtista, avaliacao, descricao);
                                    fundo_modal_avaliar_artista.innerHTML = "";
                                    fundo_modal_avaliar_artista.style.display = "none";
                                }


        
                               
                
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