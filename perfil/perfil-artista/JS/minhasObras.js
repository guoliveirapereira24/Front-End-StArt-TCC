"use strict";

const obrasArtistas = document.getElementById('linha_obrasArtistas');

function getObraPronta(){

    const configObras = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    
    
    fetch('http://localhost:3000/obraPronta/minhasObras', configObras)
        .then((res) => res.json())
        .then((data) => {
            const obraPronta = data.obraPronta;
           
           return obraPronta.forEach(obraPronta => {

            const div = document.createElement('div');
                div.className = 'card_minha_obra';
                div.id = obraPronta.idObraPronta;
                div.innerHTML = 
                `

                    <img src="../img/minha_obra1.png" alt="">
                    <div class="edit_delete">

                        <button>
                            <img id="edit" src="../img/editar.png" alt="">
                        </button>

                        <button>
                            <img id="button_delete" src="../img/excluir.png" alt="">
                        </button>
                    </div>
            

                    <div class="nome_artista" id="">
                        <div class="nome_obra_artista" id="informacoes_obra">
                            <div class="nome_obra_artista">
                                <p id="nome_minha_obra1">${obraPronta.nomeObra}</p>
                                <p id="nome_artista">${obraPronta.nomeArtista}</p>
                            </div>
                            
                            <div class="categoria_tecnica" id="categoria_tecnica">
                                <p id="categoria_minha_obra1">${obraPronta.nomeEspecialidade}</p>
                                <p>-</p>
                                <p id="tecnica_minha_obra1">${obraPronta.tecnica}</p>
                            </div>
                        </div>
                    </div>

                `
                obrasArtistas.appendChild(div);

                


        }),
        obrasArtistas.innerHTML += `<div class="div_button_adicionar_obra">

                <button class="button_adicionar_obra_perfil" id="button_adicionar_obra_perfil">
                    <img src="../img/plus.png" alt="" srcset="">
                </button>
        
            </div>
               
            <div class="modal_excluir_obra" id="modal_excluir_obra">
        
                <h2>VOCÊ TEM CERTEZA DE QUE DESEJA EXCLUIR ESTA OBRA?</h2>
                    <div class="botoes_excluir_obra">
                        <button class="button_azul" id="button_negar_exclusao_obra">NÃO</button>
                        <button class="button_vermelho" id="button_confirmar_exclusao_obra">SIM</button>
                    </div>
            </div>`
    });
  
}

getObraPronta();


// const button_delete = document.getElementById("button_delete");
// const modal_excluir_obra = document.getElementById("modal_excluir_obra");
// const button_negar_exclusao_obra = document.getElementById("button_negar_exclusao_obra");

// button_delete.addEventListener("click", function(){

//     modal_excluir_obra.style.display = "flex";
    
// });
// button_negar_exclusao_obra.addEventListener("click", function(){

//     modal_excluir_obra.style.display = "none";
    
// });