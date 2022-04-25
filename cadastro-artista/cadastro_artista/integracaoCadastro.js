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

const getEspecialidades = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch('http://localhost:3000/diversas/especialidadesArtista', config)
        .then((res) => res.json())
        .then((data) => {
            const especialidades = data.especialidadesArtista;
            console.log(especialidades)
           
           return especialidades.forEach(especialidadeArtista => {
                const option = document.createElement('option');
                option.value = especialidadeArtista.idEspecialidadeArtista;
                option.innerText = especialidadeArtista.nomeEspecialidadeArtista;
                selectEspecialidade.appendChild(option);
            });
        });
}

getEspecialidades();

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
        event.preventDefault();
        msgAlertaErroDadosPessoais.style.display = "none"
        if(inputCpfCnpj.value.length === 18 || inputCpfCnpj.value.length === 14){

            if(inputTelefoneCelular.value.length === 15){
                formularioDadosPessoais.style.display = "none";

                formularioDadosAcesso.style.display = "flex";
                
                if(msgAlertaErroDadosPessoais.style.display = "flex"){
        
                    msgAlertaErroDadosPessoais.style.display = "none"
        
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
    } else if(inputCpfCnpj.value.length === 17){
        inputCpfCnpj.value = inputCpfCnpj.value[0]+inputCpfCnpj.value[1]
        +"."+inputCpfCnpj.value[2]+inputCpfCnpj.value[4]
        +inputCpfCnpj.value[5]+"."+inputCpfCnpj.value[6]
        +inputCpfCnpj.value[8]+inputCpfCnpj.value[9]
        +"/"+inputCpfCnpj.value[10]+inputCpfCnpj.value[12]
        +inputCpfCnpj.value[13]+inputCpfCnpj.value[14]+"-"
        +inputCpfCnpj.value[15]+inputCpfCnpj.value[16];
    } 
    
}


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
