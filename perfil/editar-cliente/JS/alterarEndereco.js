"use strict"

const inputCep = document.getElementById("cep");
const inputEndereco = document.getElementById("endereco")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")
const inputBairro = document.getElementById("bairro")
var selectCidade = document.getElementById("cidade")

const btnSalvarEndereco = document.getElementById("btnSalvarEndereco")

const patchEndereco = () => {
    const tokenCliente = localStorage.getItem('tokenCliente');


    const body = {
        "idCidade": selectCidade.value,
        "rua": inputEndereco.value,
        "cep": inputCep.value,
        "complemento": inputComplemento.value,
        "bairro": inputBairro.value,
    }

    const requestOptions = {
        method: 'PUT',
        headers:{
            "Authorization": `Bearer ${tokenCliente}`, 
            "Cache-Control": "no-cache", 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };

    fetch("http://localhost:3000/cliente/alterarEndereco", requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}


btnSalvarEndereco.addEventListener("click", () => {
    if(inputEndereco.value == "" || selectCidade.value == "" || inputCep.value == "" || inputComplemento.value == "" || inputBairro.value == ""){
        alert("Preencha todos os campos")
    } else {
        patchEndereco()
    }
})