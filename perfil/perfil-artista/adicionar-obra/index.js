"use strict";

const tokenArtista = localStorage.getItem('tokenArtista');

const inputNome = document.getElementById('inputNome');
const inputPreco = document.getElementById('inputPreco');
const inputQuantidade = document.getElementById('inputQuantidade');
const inputTecnica = document.getElementById('inputTecnica');
const inputDesconto = document.getElementById('inputDesconto');
const textAreaDescricao = document.getElementById('textAreaDescricao');
var selectExclusividade = document.getElementById('selectExclusividade');
var selectCategoria = document.getElementById('selectCategoria');
var selectSubcategoria = document.getElementById('selectSubCategoria');

const btnAddObra = document.getElementById('button_adicionar_obra');
const msgErro = document.getElementById('msgErro');


btnAddObra.addEventListener('click', () => {
    const nome = inputNome.value;
    const preco = inputPreco.value;
    const quantidade = inputQuantidade.value;
    const desconto = inputDesconto.value;
    const tecnica = inputTecnica.value;
    const descricao = textAreaDescricao.value;
    const exclusividade = selectExclusividade.value;
    const categoria = selectCategoria.value;
    const subCategoria = selectSubcategoria.value;
    
    if (nome == '' || preco == '' || quantidade == '' || desconto == '' || tecnica == '' || descricao == '' || exclusividade == '' || categoria == '' || subCategoria == '') {
        msgErro.innerText = 'Preencha todos os Campos Obrigatórios!';
        msgErro.style.display = 'flex';
    } else {
        cadastrarObra(nome, preco, quantidade, desconto, tecnica, descricao, exclusividade, categoria, subCategoria);
    }
})

const cadastrarObra = (
    nome, 
    preco,
    quantidade, 
    desconto, 
    tecnica, 
    descricao, 
    exclusividade,
    categoria,
    subCategoria) => {

    event.preventDefault();

    const obra = {
        "nome": nome,
        "preco": preco,
        "quantidade": quantidade,
        "desconto": desconto,
        "tecnica": tecnica,
        "descricao": descricao,
        "senha": senha,
        "exclusividade": exclusividade,
        "idCategoria": categoria,
		"idEspecialidade": subCategoria,
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + tokenArtista
        },
        body: JSON.stringify(obra)
    }
    
    fetch('http://localhost:3000/obraPronta/inserirObra', config)
        .then((res) => res.json())
        .then((data) => {
            window.location.href = "./perfil-artista.html";
        });
} 

const getEspecialidades = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch('http://localhost:3000/diversas/especialidades', config)
        .then((res) => res.json())
        .then((data) => {
            const especialidades = data.especialidades;
            console.log(especialidades)
           
           return especialidades.forEach(especialidade => {
                const option = document.createElement('option');
                option.value = especialidade.idEspecialidade;
                option.innerText = especialidade.nomeEspecialidade;
                selectSubcategoria.appendChild(option);
            });
        });
}

getEspecialidades();

const getCategorias = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch('http://localhost:3000/diversas/categorias', config)
        .then((res) => res.json())
        .then((data) => {
            const categorias = data.categorias;
            console.log(categorias)
           
           return categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.idCategoria;
                option.innerText = categoria.nomeCategoria;
                selectCategoria.appendChild(option);
            });
        });
}

getCategorias();
