"use strict"

var button1 = document.querySelector(".button1");
var button2 = document.querySelector(".button2");
var button3 = document.querySelector(".button3");



const msgAlertaErro =  document.getElementById("msgAlertaErro")
const msgAlertaErro2 =  document.getElementById("msgAlertaErro2")
const msgAlertaErro3 =  document.getElementById("msgAlertaErro3")

button1.addEventListener("click", function() {


    if (document.getElementById("nome").value === "" ||
        document.getElementById("data-nascimento").value === "" ||
        document.getElementById("telefone").value === "" ||
        document.getElementById("cpf-cnpj").value === ""
    ){
            console.log("É obrigatório preencher todos os campos!!")        
     
            msgAlertaErro.style.display = "flex"

    }
    else{
         
    event.preventDefault();

    var formulario1 = document.getElementById("formulario-dados-pessoais");

    formulario1.style.display = "none";

    var formulario2 = document.getElementById("formulario-dados-endereco");

    formulario2.style.display = "flex";
        if(msgAlertaErro.style.display = "flex"){

            msgAlertaErro.style.display = "none"
        }
    
    
    }
});

// FIM DO PRIMEIRO FORMULÁRIO

// COMEÇO DO SEGUNDO FORMULÁRIO

button2.addEventListener("click", function() {

    if (document.getElementById("cep").value === "" ||
    document.getElementById("rua").value === "" ||
    document.getElementById("numero").value === "" ||
    document.getElementById("complemento").value === ""||
    document.getElementById("bairro").value === "" ||
    document.getElementById("cidade").value === "" ||
    document.getElementById("estado").value === "" 
){
        console.log("É obrigatório preencher todos os campos!!")        
 
        msgAlertaErro2.style.display = "flex"

}
else{

    event.preventDefault();

    var formulario2 = document.getElementById("formulario-dados-endereco");

    var formulario3 = document.getElementById("formulario-dados-acesso");

    formulario2.style.display = "none";

    formulario3.style.display = "flex";

    }   
});

button3.addEventListener("click", function() {

    // var senha = document.getElementById("senha");

    // var senha1 = document.querySelector("senha")

    var confirmar_senha = document.getElementById("confirmar_senha");

    if (document.getElementById("email").value === "" ||
    document.getElementById("senha").value === "" ||
    document.getElementById("confirmar-senha").value === ""){
        console.log("É obrigatório preencher todos os campos!!")        
 
        msgAlertaErro3.style.display = "flex";
    }

    var senha = document.formulario.senha.value();
    console.log(senha);  

    if(senha !== confirmar_senha){ 

    var senha = document.formulario.senha.value();

    console.log(senha);    

    console.log("As senhas informadas são diferentes");

    msgAlertaErro3.innerHTML = "As senhas informadas são diferentes";

    msgAlertaErro3.style.display = "flex";
    }   
    else {

        console.log("Dados enviados com sucesso");
    }
     
    
});

//  PASSAR DE TELA AO CLICAR NOS BOTÕES

