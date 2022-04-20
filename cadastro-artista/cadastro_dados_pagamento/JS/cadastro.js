"use strict"

const tokenArtista = localStorage.getItem('tokenArtista');

if(tokenArtista === "null" || tokenArtista === null || 
   tokenArtista === "" || tokenArtista === "undefined") {
  window.location.href = "../../../index.html";
} 


// CADASTRO DE PIX

const inputChavePix = document.getElementById('inputChavePix');
var selectTipoChave= document.getElementById('tipoChavePix');
const msgErroPix = document.getElementById('msgErroPix');

const buttonCadastrarPix = document.getElementById('buttonCadastrarPix');

const cadastrarPix = (tipoChave,chave) => {

    event.preventDefault();

    const pix = {
        "tipoChave": tipoChave,
        "chave": chave
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${tokenArtista}`
        },
        body: JSON.stringify(pix)
    }
    
    fetch('http://localhost:3000/formaRecebimento/pix', config)
        .then((res) => res.json())
        .then((data) => {
            window.location.href = "../../../home/home-artista/index.html";
        });
}


buttonCadastrarPix.addEventListener("click", function() {

    if (inputChavePix.value == "" ||
        inputChavePix.value == null ||
        inputChavePix.value == "undefined") {

        msgErroPix.style.display = "flex";

    } else {

        if(selectTipoChave.value == "email" && inputChavePix.value.includes("@") && inputChavePix.value.includes(".")
           || selectTipoChave.value == "telefone/celular" && inputChavePix.value.length == 15
           || selectTipoChave.value == "cpf/cnpj" && inputChavePix.value.length == 14 || selectTipoChave.value == "cpf/cnpj" && inputChavePix.value.length == 18
           || selectTipoChave.value == "chaveAleatoria" && inputChavePix.value.length == 32) {

            cadastrarPix(
                selectTipoChave.value,
                inputChavePix.value
            );

        } else {
            msgErroPix.innerHTML = "Insira uma chave válida para o tipo de chave escolhido";
            msgErroPix.style.display = "flex";
        }
    }  
    
});


// CADASTRO DE CONTA BANCARIA

var selectTipoConta = document.getElementById('tipoConta');
var selectBanco = document.getElementById('banco');
const inputAgencia = document.getElementById('agencia');
const inputConta = document.getElementById('conta');
const inputDigito = document.getElementById('digito');
const inputCpf = document.getElementById('cpf');
const inputTitular = document.getElementById('titular');
const inputDigitoVerificador = document.getElementById('digito_verificador');

const buttonCadastrarTransferencia = document.getElementById('buttonCadastrarTransferencia');

const cadastrarContaBancaria = (tipoConta,agencia,conta,digito,cpf,titular,digitoVerificador,banco) => {

    event.preventDefault();

    const contaBancaria = {
        "tipoConta": tipoConta,
        "agencia": agencia,
        "conta": conta,
        "digito": digito,
        "cpfTitular": cpf,
        "titular": titular,
        "digitoVerificador": digitoVerificador,
        "banco": banco

    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${tokenArtista}`
        },
        body: JSON.stringify(contaBancaria)
    }
    
    fetch('http://localhost:3000/formaRecebimento/cadastrarContaBancaria', config)
        .then((res) => res.json())
        .then((data) => {
            window.location.href = "../../../home/home-artista/index.html";
        });
} 


buttonCadastrarTransferencia.addEventListener("click", function() {

    if (inputAgencia.value === "" ||
        selectBanco.value === "" ||
        inputConta.value === "" ||
        inputCpf.value === "" ||
        inputTitular.value === "" ||
        inputDigitoVerificador.value === ""){
            
        alert("Por favor, preencha todos os campos!");

    } else {

            cadastrarContaBancaria(
                selectTipoConta.value,
                inputAgencia.value.trim(),
                inputConta.value.trim(),
                inputDigito.value.trim(),
                inputCpf.value.trim(),
                inputTitular.value.trim(),
                inputDigitoVerificador.value.trim(),
                selectBanco.value
            );
    }  
    
});