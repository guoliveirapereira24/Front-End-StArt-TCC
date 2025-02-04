"use strict";


// ALTERAR SENHA


const inputSenhaAntiga = document.getElementById("senha_antiga");
const inputSenhaNova = document.getElementById("senha_nova");

const btnAlterarSenha = document.getElementById("btnAlterarSenha");

const atualizarSenha = () => {
    const senhaAntiga = inputSenhaAntiga.value;
    const senhaNova = inputSenhaNova.value;

    const tokenCliente = localStorage.getItem('tokenCliente');

    const body = {
        "senhaAntiga" : senhaAntiga,
        "novaSenha" : senhaNova
    }

    const requestOptions = {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenCliente}`
        },
        body: JSON.stringify(body)
    };

    fetch("http://localhost:3000/cliente/alterarSenha", requestOptions)
        .then(response => response.json())
        .then(result => {
        
            alert("Senha alterada com sucesso!");
    
            inputSenhaAntiga.value = "";
            inputSenhaNova.value = "";

        })

}

btnAlterarSenha.addEventListener('click', () => {
    if(inputSenhaAntiga.value == '' || inputSenhaNova.value == ''){
        alert("Preencha todos os campos!");
    } else {
        console.log("Teste")
        atualizarSenha();
    }
});


// ALTERAR DADOS PESSOAIS


const inputNomeCompleto = document.getElementById("nome_completo_cliente");
const inputDataNascimento = document.getElementById("data_nascimento_cliente");
const inputTelefoneCelular = document.getElementById("telefone_cliente");
const inputEmail = document.getElementById("email_cliente");
const inputCpf_cnpj = document.getElementById("cpf_cnpj_cliente");

const btnDadosPessoais = document.getElementById("btnDadosPessoais");

const alterarDadosPessoais = () => {

    const nomeCompleto = inputNomeCompleto.value;
    const dataNascimento = inputDataNascimento.value;
    const telefoneCelular = inputTelefoneCelular.value;
    const email = inputEmail.value;
    const cpf_cnpj = inputCpf_cnpj.value;
    
    

    const tokenCliente = localStorage.getItem('tokenCliente');

    const body = {
        "nomeCompleto" : nomeCompleto,
        "dataNascimento" : dataNascimento,
        "telefoneCelular" : telefoneCelular,
        "cpf_cnpj" : cpf_cnpj,
        "email" : email,
        
    }

    const requestOptions = {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenCliente}`
        },
        body: JSON.stringify(body)
    };

    fetch("http://localhost:3000/cliente/dadosPessoais", requestOptions)
        .then(res => res.json())
        .then(data => console.log(data))

}

btnDadosPessoais.addEventListener('click', () => {
    if(inputNomeCompleto.value == '' || inputDataNascimento.value == '' || inputTelefoneCelular.value == '' || inputEmail.value == '' || inputCpf_cnpj.value == ''){
        alert("Preencha todos os campos!");
    } else {
        alterarDadosPessoais();
    }
});




