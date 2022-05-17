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
var selectEstado = document.getElementById('selectEstado');

const buttonContinuarDadosEndereco = document.getElementById("buttonContinuarDadosEndereco");
const buttonContinuarDadosDeAcesso = document.getElementById("buttonContinuarDadosDeAcesso");
const buttonCadastro = document.getElementById("buttonCadastro");

var formularioDadosPessoais = document.getElementById("formulario-dados-pessoais");
var formularioDadosEndereco = document.getElementById("formulario-dados-endereco");
var formularioDadosAcesso = document.getElementById("formulario-dados-acesso");

const msgAlertaErroDadosPessoais =  document.getElementById("msgAlertaErroDadosPessoais")
const msgAlertaErroDadosEndereco =  document.getElementById("msgAlertaErroDadosEndereco")
const msgAlertaErroDadosAcesso =  document.getElementById("msgAlertaErroDadosAcesso")


const loginCliente = (email, senha) => {

    const loginCliente = {
        "emailLogin": email,
        "senhaLogin": senha
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginCliente)
    }

    fetch('http://localhost:3000/cliente/login', config)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('tokenCliente', data.token);
            if(localStorage.getItem('tokenCliente') == data.token){
                window.location.href = "../home/home-cliente/index.html";
            }
        });
    
}




const getEstados = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch('http://localhost:3000/diversas/estados', config)
        .then((res) => res.json())
        .then((data) => {
            const estados = data.estados;
        
           
           return estados.forEach(estado => {
                const option = document.createElement('option');
                option.id = "option" + estado.idEstado
                option.value = estado.idEstado;
                option.innerText = estado.nomeEstado;
                selectEstado.appendChild(option);
            });
        });  
}

getEstados();

const getCidades = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const idEstado = selectEstado.value;
    
    fetch(`http://localhost:3000/diversas/cidades/${idEstado}`, config)
        .then((res) => res.json())
        .then((data) => {
            const cidades = data.cidades;
           
           return cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.idCidade;
                option.innerText = cidade.nomeCidade;
                selectCidade.appendChild(option);
            });
        });
}


selectEstado.addEventListener("change", function() {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const idEstado = selectEstado.value;
    
    fetch(`http://localhost:3000/diversas/cidades/${idEstado}`, config)
        .then((res) => res.json())
        .then((data) => {
            const cidades = data.cidades;
            selectCidade.innerHTML = "";
           
           return cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.idCidade;
                option.innerText = cidade.nomeCidade;
                selectCidade.appendChild(option);
            });
        });
} );


buttonContinuarDadosEndereco.addEventListener("click", function() {

    if (inputNomeCompleto.value === "" ||
        inputDataNascimento.value === "" ||
        inputTelefoneCelular.value === "" ||
        inputCpfCnpj.value === "" 
    ) {     

            msgAlertaErroDadosPessoais.style.display = "flex"

    }else{
    event.preventDefault();
        if(inputCpfCnpj.value.length === 18 || inputCpfCnpj.value.length === 14){

            if(inputTelefoneCelular.value.length === 15){

                if(inputDataNascimento.value.length === 10 && inputDataNascimento.value.substring(0,4) < 2022){
                    formularioDadosPessoais.style.display = "none";

                    formularioDadosEndereco.style.display = "flex";
                    if(msgAlertaErroDadosPessoais.style.display = "flex"){

                        msgAlertaErroDadosPessoais.style.display = "none"
                    }

                    getCidades();
                }
                else{
                    msgAlertaErroDadosPessoais.innerText = "A data de nascimento deve ser menor que o ano atual"
                    msgAlertaErroDadosPessoais.style.display = "flex"
                }
            }
            else{
                msgAlertaErroDadosPessoais.innerText = "Telefone inválido"
                msgAlertaErroDadosPessoais.style.display = "flex"
            }
            
        
        } else {
            msgAlertaErroDadosPessoais.innerText = "CPF ou CNPJ inválido"
            msgAlertaErroDadosPessoais.style.display = "flex"
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



inputTelefoneCelular.onkeypress = function(e){
    var chr = String.fromCharCode(e.which);
    if ("1234567890-()".indexOf(chr) < 0){
        return false
    }
    if(inputTelefoneCelular.value.length === 1){
    inputTelefoneCelular.value = "(" + inputTelefoneCelular.value;
    } else if(inputTelefoneCelular.value.length === 3){
        inputTelefoneCelular.value += ") ";
    } else if(inputTelefoneCelular.value.length === 4){
        inputTelefoneCelular.value += " ";
    } else if(inputTelefoneCelular.value.length === 10){
        inputTelefoneCelular.value += "-";
    }
}
   

inputDataNascimento.onkeydown = function(e){
    if (inputDataNascimento.value.length === 11){
        return false;
    }

}

  
inputCpfCnpj.onkeypress = function(e){
    
    var chr = String.fromCharCode(e.which);
    if ("1234567890-/.".indexOf(chr) < 0){
        return false
    }
    

    if(inputCpfCnpj.value.length === 3){
        inputCpfCnpj.value += ".";
    } else if(inputCpfCnpj.value.length === 7){
        inputCpfCnpj.value += ".";
    } else if(inputCpfCnpj.value.length === 11){
        inputCpfCnpj.value += "-";
    } else if(inputCpfCnpj.value.length === 16){
        inputCpfCnpj.value = inputCpfCnpj.value[0]+inputCpfCnpj.value[1]
        +"."+inputCpfCnpj.value[2]+inputCpfCnpj.value[4]
        +inputCpfCnpj.value[5]+"."+inputCpfCnpj.value[6]
        +inputCpfCnpj.value[8]+inputCpfCnpj.value[9]
        +"/"+inputCpfCnpj.value[10]+inputCpfCnpj.value[12]
        +inputCpfCnpj.value[13]+inputCpfCnpj.value[14]+"-"
        +inputCpfCnpj.value[15];
    } 
    
}


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
            loginCliente(email, senha)
        });
}
