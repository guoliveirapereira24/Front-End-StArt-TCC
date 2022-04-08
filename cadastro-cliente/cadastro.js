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
var selectCidade = document.getElementById('selectCidade');

const buttonContinuarDadosEndereco = document.getElementById("buttonContinuarDadosEndereco");
const buttonContinuarDadosDeAcesso = document.getElementById("buttonContinuarDadosDeAcesso");
const buttonCadastro = document.getElementById("buttonCadastro");

var formularioDadosPessoais = document.getElementById("formulario-dados-pessoais");
var formularioDadosEndereco = document.getElementById("formulario-dados-endereco");
var formularioDadosAcesso = document.getElementById("formulario-dados-acesso");

const msgAlertaErroDadosPessoais =  document.getElementById("msgAlertaErroDadosPessoais")
const msgAlertaErroDadosEndereco =  document.getElementById("msgAlertaErroDadosEndereco")
const msgAlertaErroDadosAcesso =  document.getElementById("msgAlertaErroDadosAcesso")


buttonContinuarDadosEndereco.addEventListener("click", function() {

    if (inputNomeCompleto.value === "" ||
        inputDataNascimento.value === "" ||
        inputTelefoneCelular.value === "" ||
        inputCpfCnpj.value === ""
    ) {     

            msgAlertaErroDadosPessoais.style.display = "flex"

    }
    else{
         
    event.preventDefault();

    formularioDadosPessoais.style.display = "none";

    formularioDadosEndereco.style.display = "flex";
        if(msgAlertaErroDadosPessoais.style.display = "flex"){

            msgAlertaErroDadosPessoais.style.display = "none"
        }
    
    }
});


buttonContinuarDadosDeAcesso.addEventListener("click", function() {

    if (inputCep.value === "" ||
        inputRua.value === "" ||
        inputNumero.value === "" ||
        inputComplemento.value === ""||
        inputBairro.value === "" ||
        selectCidade.value === "" ||
        selectEstado.value === "" 
    ){   
        msgAlertaErroDadosEndereco.style.display = "flex"
    } else{

        event.preventDefault();

        formularioDadosEndereco.style.display = "none";

        formularioDadosAcesso.style.display = "flex";

    }   
});


buttonCadastro.addEventListener("click", function() {

    if (inputEmail.value === "" ||
        inputSenha.value === "" ||
        inputConfirmarSenha.value === ""){

        msgAlertaErroDadosAcesso.style.display = "flex";

    } else {

        if(inputSenha.value.trim() !== inputConfirmarSenha.value.trim()){ 

            msgAlertaErroDadosAcesso.innerHTML = "As senhas informadas são diferentes";
            msgAlertaErroDadosAcesso.style.display = "flex";

        } else {
        
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
                selectCidade.value
            )

            window.location.href = "../home/home-cliente/cliente.html";
        }
    }
});


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
            localStorage.setItem('token', data.response.clienteCadastrado.token);
        });
}
