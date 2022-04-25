"use strict";

const propostas = document.getElementById('listagem_minhas_propostas');

function getMinhasPropostas(){

    const configPropostas = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    
    
    fetch('http://localhost:3000/proposta/minhasPropostas', configPropostas)
        .then((res) => res.json())
        .then((data) => {
            const propostas = data.proposta;
           
           return propostas.forEach(proposta => {

            const div = document.createElement('div');
                div.id = "card";
                div.innerHTML = 
                `

                <div id="nome_tipo_contato">
                    <p class="text_para">Para:</p>

                    <img id="img_perfil" src="../img/cliente.png" alt="" srcset="">

                    <p class="nome"  id="nome_cliente">Gabriel Gonçalves</p>

                    <section id="categoria_pedido">
                        <p>Desenho</p>
                    </section>

                    <div class="container_status" id="container_status">
                        <p class="transparente" id="">Status:</p>
                        <p class="publicada" id="status_publicacao" >Publicada</p>
                    </div>
                
                </div>

                <p id="descricao_pedido">
                    Olá, Patrícia! Quero um desenho dessa foto da minha namorada. Se estiver disposta
                a fazer, entre contato comigo para negociarmos e acertarmos os detalhes.
                </p>

                <div id="preco_prazo_buttons" class="preco_prazo_buttons">
                    <div id="preco_prazo" class="preco_prazo">
                        <div class="preco">
                            <p class="transparente">Preço:</p>
                            <p class="" id="preco_proposta">R$ 250,00</p>
                        </div>
                        <div class="prazo">
                            <p class="transparente">Prazo de entrega:</p>
                            <p class="" id="prazo_proposta">04/03/2022</p>
                        </div>

                        <button id="button_ver_pedido" class="button_ver_pedido">
                            Ver Pedido
                        </button>
                        
                    </div>

                    <div id="botoes" class="botoes">
                        <button id="editar_proposta">Editar Proposta</button>
                        <button id="excluir_proposta">Excluir Proposta</button>
                    </div>


                </div>

                `
                propostas.appendChild(div);

                


        })
    });
  
}

getMinhasPropostas();