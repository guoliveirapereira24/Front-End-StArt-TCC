'use strict'

const inputNomeCompleto = document.getElementById('inputNomeCompleto');
const inputNomeArtistico = document.getElementById('inputNomeArtistico');
const inputDataNascimento = document.getElementById('inputDataNascimento');
const inputTelefoneCelular = document.getElementById('inputTelefone');
const inputCpfCnpj = document.getElementById('inputCpfCnpj');
const inputEmail = document.getElementById('inputEmail');
const inputSenha = document.getElementById('inputSenha');
const inputConfirmarSenha = document.getElementById('inputConfirmarSenha');
var selectEspecialidade = document.getElementById('selectEspecialidade');

var buttonContinuarDadosDeAcesso = document.getElementById("buttonContinuarDadosDeAcesso");
var buttonCadastrarArtista = document.getElementById("buttonCadastrarArtista");

const msgAlertaErroDadosPessoais =  document.getElementById("msgAlertaErroDadosPessoais")
const msgAlertaErroDadosAcesso =  document.getElementById("msgAlertaErroDadosAcesso")

var formularioDadosPessoais = document.getElementById("formulario-dados-pessoais");
var formularioDadosAcesso = document.getElementById("formulario-dados-acesso");

buttonContinuarDadosDeAcesso.addEventListener("click", function() {

    if (inputNomeCompleto.value === "" ||
        inputNomeArtistico.value === "" ||
        inputDataNascimento.value === "" ||
        inputTelefoneCelular.value === "" ||
        inputCpfCnpj.value === ""
    ){    
     
        msgAlertaErroDadosPessoais.style.display = "flex"

    }
    else{

        formularioDadosPessoais.style.display = "none";

        formularioDadosAcesso.style.display = "flex";
        
        if(msgAlertaErroDadosPessoais.style.display = "flex"){

            msgAlertaErroDadosPessoais.style.display = "none"

        }
        
    }
});

buttonCadastrarArtista.addEventListener("click", function() {

    if (inputEmail.value === "" ||
        inputSenha.value === "" ||
        inputConfirmarSenha.value === ""){

        msgAlertaErroDadosAcesso.style.display = "flex";

    } else {

        if(inputSenha.value.trim() !== inputConfirmarSenha.value.trim()){ 

            msgAlertaErroDadosAcesso.innerHTML = "As senhas informadas são diferentes";
            msgAlertaErroDadosAcesso.style.display = "flex";

        } else {
            cadastrarArtista(
                inputNomeCompleto.value.trim(),
                inputNomeArtistico.value.trim(),
                inputDataNascimento.value,
                inputTelefoneCelular.value.trim(),
                inputCpfCnpj.value.trim(),
                inputEmail.value.trim(),
                inputConfirmarSenha.value.trim(),
                selectEspecialidade.value
            );

            

        }
    }  
    
});


const cadastrarArtista = (
    nomeCompleto, 
    nomeArtistico,
    dataNascimento, 
    telefoneCelular, 
    cpfCnpj, 
    email, 
    senha, 
    especialidade) => {

    event.preventDefault();

    const artista = {
        "nomeCompleto": nomeCompleto,
        "nomeArtistico": nomeArtistico,
        "dataNascimento": dataNascimento,
        "telefoneCelular": telefoneCelular,
        "cpf_cnpj": cpfCnpj,
        "email": email,
        "senha": senha,
        "contaEstaAtiva": 1,
        "eDestacado":0,
		"idEspecialidade": especialidade,
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artista)
    }
    
    fetch('http://localhost:3000/artista/cadastro', config)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('tokenArtista', data.response.artistaCadastrado.token); 
            window.location.href = "../cadastro_dados_pagamento/index.html";   
        });
} 
