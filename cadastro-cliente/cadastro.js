'use strict'

const inputNomeCompleto = document.getElementById('inputNome');
const inputDataNascimento = document.getElementById('inputDataNascimento');
const inputTelefoneCelular = document.getElementById('inputTelefone');
const inputCpfCnpj = document.getElementById('inputCpfCnpj');
const inputCep = document.getElementById('inputCep');
const inputRua = document.getElementById('inputRua');
const inputNumero = document.getElementById('inputNumero');
const inputComplemento = document.getElementById('inputComplemento');
const inputBairro = document.getElementById('inputBairro');
const inputEmail = document.getElementById('inputEmail');
const inputSenha = document.getElementById('inputSenha');
const inputConfirmarSenha = document.getElementById('inputConfirmarSenha');
var select = document.getElementById('selectCidade');
var valueCidade = select.options[select.selectedIndex].value


const checkAndValidateInputs = () => {

    cadastrarCliente(
        inputNomeCompleto.value.trim(),
        inputDataNascimento.value,
        inputTelefoneCelular.value.trim(),
        inputCpfCnpj.value.trim(),
        inputEmail.value.trim(),
        inputConfirmarSenha.value.trim(),
        inputCep.value.trim(),
        inputRua.value.trim(),
        inputNumero.value.trim(),
        inputComplemento.value.trim(),
        inputBairro.value.trim(),
        1
    )
}


const cadastrarCliente = (
    nomeCompleto, 
    dataNascimento, 
    telefoneCelular, 
    cpfCnpj, 
    email, 
    senha, 
    cep, 
    rua, 
    numero, 
    complemento, 
    bairro, 
    cidade) => {

    event.preventDefault();

    const cliente = {
        "nomeCompleto": nomeCompleto,
        "dataNascimento": dataNascimento,
        "telefoneCelular": telefoneCelular,
        "cpf_cnpj": cpfCnpj,
        "email": email,
        "senha": senha,
        "contaEstaAtiva": 1,
		"idCidade": cidade,
        "rua": rua,
        "cep": cep,
        "numero": numero,
        "complemento": complemento,
        "bairro": bairro
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    }

    console.log(cliente)
    
    fetch('http://localhost:3000/cliente/cadastro', config)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        });
}

const buttonCadastro = document.getElementById("buttonCadastro");

buttonCadastro.addEventListener("click", checkAndValidateInputs)