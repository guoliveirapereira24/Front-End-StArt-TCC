"use strict";

const obrasArtistas = document.getElementById('linha_obrasArtistas');

const deleteObraById = (idObraPronta) => {
    const configObra = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    fetch(`http://localhost:3000/obraPronta/${idObraPronta}`, configObra)
        .then((res) => res.json())
        .then((data) => {
            window.location.reload();
        });
};

const redirectEditObra = (idObraPronta) => {
    window.location.href = `./editar-obra/index.html?q=${idObraPronta}`;
}


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

                obrasArtistas.appendChild(div);

                const edit_delete = document.getElementById('edit_delete ' + idObraPronta);

                const btnEdit = document.createElement('button');
                btnEdit.className = 'btn_edit';
                btnEdit.id = `btn_edit ${obraPronta.idObraPronta}`;
                btnEdit.innerHTML = `<img id="edit" src="../img/editar.png" alt="" onclick="javascript:redirectEditObra(${obraPronta.idObraPronta})">`;
                edit_delete.appendChild(btnEdit)

                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn_delete';
                btnDelete.id = `btn_delete ${obraPronta.idObraPronta}`;
                btnDelete.innerHTML = `<img id="button_delete" src="../img/excluir.png" alt="" onclick="javascript:deleteObraById(${obraPronta.idObraPronta})">`;
                edit_delete.appendChild(btnDelete);
                

            }),
            obrasArtistas.innerHTML += 
                `
                <div class="div_button_adicionar_obra">

                    <button class="button_adicionar_obra_perfil" id="button_adicionar_obra_perfil" onclick="window.location.href = './adicionar-obra/index.html'">
                        <img src="../img/plus.png" alt="" srcset="">
                    </button>   
                
            
                </div>
                `;    
        } else {
            obrasArtistas.innerHTML += 
            `
            <div class="div_button_adicionar_obra">

                <button class="button_adicionar_obra_perfil" id="button_adicionar_obra_perfil" onclick="window.location.href = './adicionar-obra/index.html'">
                    <img src="../img/plus.png" alt="" srcset="">
                </button>   
            
        
            </div>
            `;    
        }
    });
}


getObraPronta();




    
