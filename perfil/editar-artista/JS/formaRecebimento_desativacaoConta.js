"use strict"

var selectTipoChavePix = document.getElementById("tipoChavePix");
const inputChavePix = document.getElementById("inputChavePix");

const inputTitular = document.getElementById("titular");
const inputAgencia = document.getElementById("agencia");
const inputConta = document.getElementById("conta");
const inputCpf = document.getElementById("cpf");
const inputDigitoVerificador = document.getElementById("digito_verificador");
const inputDigito = document.getElementById("digito");
var selectBanco = document.getElementById("banco");
var selectTipoConta = document.getElementById("tipo_conta");

var pixIsSet = false;
var contaBancariaIsSet = false;


const getPix = () => {

    const tokenArtista = localStorage.getItem('tokenArtista');


    const requestOptions = {
        method: 'GET',
        headers:{
            "Authorization": `Bearer ${tokenArtista}`, 
            "Cache-Control": "no-cache"
        }
    };

    fetch("http://localhost:3000/formaRecebimento/pix/artista", requestOptions)
        .then(res => res.json())
        .then(data => {
            const pixDeArtista = data.pixDeArtista;
           if(pixDeArtista.length !== 0){
            return pixDeArtista.forEach(pixDeArtista => {
                
                selectTipoChavePix.value = pixDeArtista.tipoChave;
                inputChavePix.value = pixDeArtista.chave; 
                pixIsSet = true;
            })
           }
        })


}

const postPix = () => {

    const tokenArtista = localStorage.getItem('tokenArtista');

    const body = {
        "tipoChave": selectTipoChavePix.value,
        "chave": inputChavePix.value
    }

    const requestOptions = {
        method: 'POST',
        headers:{
            "Authorization": `Bearer ${tokenArtista}`,
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };

    fetch("http://localhost:3000/formaRecebimento/pix", requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
}


const patchPix = () => {

    const tokenArtista = localStorage.getItem('tokenArtista');

    const body = {
        "tipoChave": selectTipoChavePix.value,
        "chave": inputChavePix.value
    }

    const requestOptions = {
        method: 'PUT',
        headers:{
            "Authorization": `Bearer ${tokenArtista}`,
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };

    fetch("http://localhost:3000/formaRecebimento/pix", requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
}


const getContaBancaria = () => {
    const tokenArtista = localStorage.getItem('tokenArtista');

    const requestOptions = {
        method: 'GET',
        headers:{
            "Authorization": `Bearer ${tokenArtista}`, 
            "Cache-Control": "no-cache"
        }
    };

    fetch("http://localhost:3000/formaRecebimento/contaBancaria/artista", requestOptions)
        .then(res => res.json())
        .then(data => {
            const contaBancariaDeArtista = data.contaBancariaDeArtista;
           if(contaBancariaDeArtista.length !== 0){
            return contaBancariaDeArtista.forEach(contaBancariaDeArtista => {
                
                inputTitular.value = contaBancariaDeArtista.titular;
                inputAgencia.value = contaBancariaDeArtista.agencia;
                inputConta.value = contaBancariaDeArtista.conta;
                inputCpf.value = contaBancariaDeArtista.cpfTitular;
                inputDigitoVerificador.value = contaBancariaDeArtista.digitoVerificador;
                inputDigito.value = contaBancariaDeArtista.digito;
                selectBanco.value = contaBancariaDeArtista.banco;
                selectTipoConta.value = contaBancariaDeArtista.tipoConta;
            
                contaBancariaIsSet = true;
            })
           }
        })
}

const postContaBancaria = () => {
    const tokenArtista = localStorage.getItem('tokenArtista');

    const body = {
        "titular": inputTitular.value,
        "agencia": inputAgencia.value,
        "conta": inputConta.value,
        "cpfTitular": inputCpf.value,
        "digitoVerificador": inputDigitoVerificador.value,
        "digito": inputDigito.value,
        "banco": selectBanco.value,
        "tipoConta": selectTipoConta.value
    }

    const requestOptions = {
        method: 'POST',
        headers:{
            "Authorization": `Bearer ${tokenArtista}`, 
            "Cache-Control": "no-cache", 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };

    fetch("http://localhost:3000/formaRecebimento/cadastrarContaBancaria", requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

const patchContaBancaria = () => {
    const tokenArtista = localStorage.getItem('tokenArtista');

    const body = {
        "titular": inputTitular.value,
        "agencia": inputAgencia.value,
        "conta": inputConta.value,
        "cpfTitular": inputCpf.value,
        "digitoVerificador": inputDigitoVerificador.value,
        "digito": inputDigito.value,
        "banco": selectBanco.value,
        "tipoConta": selectTipoConta.value
    }

    const requestOptions = {
        method: 'PUT',
        headers:{
            "Authorization": `Bearer ${tokenArtista}`, 
            "Cache-Control": "no-cache", 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };

    fetch("http://localhost:3000/formaRecebimento/atualizarContaBancaria", requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

getPix();
getContaBancaria();

const btnSavePix = document.getElementById("button_salvar_pix");
const btnSaveTransf = document.getElementById("button_salvar_transf");

btnSavePix.addEventListener('click', () => {
    if(pixIsSet === true && inputChavePix != "" && selectTipoChavePix != ""){
        patchPix();
    }else if(pixIsSet === false && inputChavePix != "" && selectTipoChavePix != ""){
        postPix();
    } else if(inputChavePix == "" || selectTipoChavePix == ""){
        const msgErroPix = document.getElementById("msgErroPix");
        msgErroPix.style.display = "flex";
    }
});

btnSaveTransf.addEventListener("click", () => {
    if(contaBancariaIsSet === true && inputTitular != "" && inputAgencia != "" && inputConta != "" && inputCpf != "" && inputDigitoVerificador != "" && inputDigito != "" && selectBanco != "" && selectTipoConta != ""){
        patchContaBancaria();
    }else if(contaBancariaIsSet === false && inputTitular != "" && inputAgencia != "" && inputConta != "" && inputCpf != "" && inputDigitoVerificador != "" && inputDigito != "" && selectBanco != "" && selectTipoConta != ""){
        postContaBancaria();
    }else if(inputTitular == "" || inputAgencia == "" || inputConta == "" || inputCpf == "" || inputDigitoVerificador == "" || inputDigito == "" || selectBanco == "" || selectTipoConta == ""){
        const msgErroTransf = document.getElementById("msgErroTransf");
        msgErroTransf.style.display = "flex";
    }
})

const btnDesativarConta = document.getElementById("button_confirmar_desativacao_conta");

btnDesativarConta.addEventListener("click", () => {
    const tokenArtista = localStorage.getItem('tokenArtista');

    const requestOptions = {
        method: 'PUT',
        headers:{
            "Authorization": `Bearer ${tokenArtista}`, 
            "Cache-Control": "no-cache", 
            "Content-Type": "application/json"
        }
    }

    fetch("http://localhost:3000/artista/desativarConta", requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('tokenArtista', undefined)
            window.location.href = "../../../login/index.html";
        })
})