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


selectTipoChave.addEventListener('change', function(e) {
    event.preventDefault();
    if(selectTipoChave.value === "email"){
        inputChavePix.setAttribute('type', 'email');
        inputChavePix.value = "";
    } else if(selectTipoChave.value === "telefone/celular"){
        inputChavePix.setAttribute('type', 'tel');
        inputChavePix.setAttribute('maxLength', '15');
        inputChavePix.value = "";
    } else if(selectTipoChave.value === "cpf/cnpj"){
        inputChavePix.setAttribute('type', 'text');
        inputChavePix.setAttribute('maxLength', '17');
        inputChavePix.value = "";
    } else if(selectTipoChave.value === "chaveAleatoria"){
        inputChavePix.setAttribute('type', 'text');
        inputChavePix.value = "";
    }
});

inputChavePix.onkeypress = function(e){
    event.preventDefault();
    if(selectTipoChave.value === "telefone/celular"){

        inputChavePix.onkeypress = function(e){
            var chr = String.fromCharCode(e.which);
            if ("1234567890-()".indexOf(chr) < 0){
                return false
            }
            

            if(inputChavePix.value.length === 1){
                inputChavePix.value = "(" + inputChavePix.value;
            } else if(inputChavePix.value.length === 3){
                inputChavePix.value += ") ";
            } else if(inputChavePix.value.length === 4){
                inputChavePix.value += " ";
            } else if(inputChavePix.value.length === 10){
                inputChavePix.value += "-";
            }
        }

    } else if(selectTipoChave.value === "cpf/cnpj"){

        inputChavePix.onkeypress = function(e){
            var chr = String.fromCharCode(e.which);
            if ("1234567890-/.".indexOf(chr) < 0){
                return false
            }

            if(inputChavePix.value.length === 3){
                inputChavePix.value += ".";
            } else if(inputChavePix.value.length === 7){
                inputChavePix.value += ".";
            } else if(inputChavePix.value.length === 11){
                inputChavePix.value += "-";
            } else if(inputChavePix.value.length === 17){
            inputChavePix.value = inputChavePix.value[0]+inputChavePix.value[1]
                +"."+inputChavePix.value[2]+inputChavePix.value[4]
                +inputChavePix.value[5]+"."+inputChavePix.value[6]
                +inputChavePix.value[8]+inputChavePix.value[9]
                +"/"+inputChavePix.value[10]+inputChavePix.value[12]
                +inputChavePix.value[13]+inputChavePix.value[14]+"-"
                +inputChavePix.value[15]+inputChavePix.value[16];
            }  
        }
    }
    
};




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

    event.preventDefault();

    if (inputChavePix.value == ""){

        msgErroPix.style.display = "flex";

    } else {

        if(selectTipoChave.value == "email" && inputChavePix.value.includes("@") && inputChavePix.value.includes(".")
           || selectTipoChave.value == "telefone/celular" && inputChavePix.value.length == 15
           || selectTipoChave.value == "cpf/cnpj" && inputChavePix.value.length == 14 || selectTipoChave.value == "cpf/cnpj" && inputChavePix.value.length == 17
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
const msgErroTransf = document.getElementById('msgErroTransf')

const buttonCadastrarTransferencia = document.getElementById('buttonCadastrarTransferencia');


inputCpf.onkeypress = function(e){
    var chr = String.fromCharCode(e.which);
    if ("1234567890-/.".indexOf(chr) < 0){
        return false
    }

    if(inputCpf.value.length === 3){
        inputCpf.value += ".";
    } else if(inputCpf.value.length === 7){
        inputCpf.value += ".";
    } else if(inputCpf.value.length === 11){
        inputCpf.value += "-";
    }
    
}

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

    event.preventDefault();

    if (inputAgencia.value === "" ||
        selectBanco.value === "" ||
        inputConta.value === "" ||
        inputCpf.value === "" ||
        inputTitular.value === "" ||
        inputDigitoVerificador.value === ""){
            
        msgErroTransf.style.display = "flex";

    } else {

        if(inputCpf.value.length === 14 ){

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
        } else {
            msgErroTransf.innerHTML = "Insira um CPF válido";
            msgErroTransf.style.display = "flex";
        }
    }  
    
});