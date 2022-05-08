'use strict'

var button_pix = document.getElementById("button_pix");
var button_transferencia = document.getElementById("button_transferencia");
var button_continuar = document.getElementById("buttonTransferencia");

const dados_transferencia = document.getElementById("dados-transferencia");
const formulario_dados_transferencia = document.getElementById("formulario_dados_transferencia");
const formulario_pix = document.getElementById("dados-pix");


button_transferencia.addEventListener("click", function(){

    event.preventDefault();

    var formulario_pix = document.getElementById("dados-pix")
    // var formulario_transferencia = document.getElementById("dados-transferencia")
    
    button_transferencia.style.border = "2px solid";
    button_transferencia.style.borderTopStyle = "none";
    button_transferencia.style.borderLeftStyle = "none";
    button_transferencia.style.borderRightStyle = "none";

    button_pix.style.border = "none";
    
    // button_pix.style.border-bottom = "";

    formulario_pix.style.display = "none";
    dados_transferencia.style.display = "flex";
    formulario_dados_transferencia.style.display = "flex";

});


button_pix.addEventListener("click", function(){

    event.preventDefault();

    // var formulario_pix = document.getElementById("dados-pix")
    // var formulario_transferencia = document.getElementById("dados-transferencia")
    
    button_pix.style.border = "2px solid";
    button_pix.style.borderTopStyle = "none";
    button_pix.style.borderLeftStyle = "none";
    button_pix.style.borderRightStyle = "none";

    button_transferencia.style.border = "none";


    dados_transferencia.style.display = "none";
    formulario_dados_transferencia.style.display = "none";
    formulario_pix.style.display = "flex";
   


    
});

const selectPais = document.getElementById("selectPais");




const button_editar_perfil = document.getElementById("button_editar_perfil");
const button_alterar_senha = document.getElementById("button_alterar_senha");
const button_informacoes_pessoais = document.getElementById("button_informacoes_pessoais");
const button_forma_recebimento = document.getElementById("button_forma_recebimento");
const botao_desativar_conta = document.getElementById("botao_desativar_conta");

const conteudo_editar_perfil = document.getElementById("conteudo_editar_perfil");
const conteudo_alterar_senha = document.getElementById("conteudo_alterar_senha");
const conteudo_informacoes_pessoais = document.getElementById("conteudo_informacoes_pessoais");
const editar_forma_recebimento = document.getElementById("editar_forma_recebimento");
const conteudo_desativar_conta = document.getElementById("conteudo_desativar_conta");

button_editar_perfil.addEventListener("click", function(){

    conteudo_editar_perfil.style.display = "flex";
    conteudo_alterar_senha.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "none";
    conteudo_desativar_conta.style.display = "none";

    button_editar_perfil.style.borderLeft = "5px solid";
    button_alterar_senha.style.borderLeftStyle = "none";
    button_informacoes_pessoais.style.border = "none";
    button_forma_recebimento.style.border = "none";
    botao_desativar_conta.style.border = "none";

});

button_alterar_senha.addEventListener("click", function(){

    conteudo_alterar_senha.style.display = "flex";

    conteudo_editar_perfil.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "none";
    conteudo_desativar_conta.style.display = "none";

    button_editar_perfil.style.border = "none";
    button_informacoes_pessoais.style.border = "none";
    button_forma_recebimento.style.border = "none";
    botao_desativar_conta.style.border = "none";
    button_alterar_senha.style.borderLeft = "5px solid";

});

botao_desativar_conta.addEventListener("click", function(){

    conteudo_editar_perfil.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "none";
    conteudo_desativar_conta.style.display = "flex";
    conteudo_alterar_senha.style.display = "none";

    button_editar_perfil.style.border = "none";
    button_alterar_senha.style.border = "none";
    button_informacoes_pessoais.style.border = "none";
    button_forma_recebimento.style.border = "none";
    botao_desativar_conta.style.borderLeft = "5px solid";

});

button_forma_recebimento.addEventListener("click", function(){

    conteudo_editar_perfil.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "flex";
    conteudo_desativar_conta.style.display = "none";
    conteudo_alterar_senha.style.display = "none";

    button_editar_perfil.style.border = "none";
    button_alterar_senha.style.border = "none";
    button_informacoes_pessoais.style.border = "none";
    button_forma_recebimento.style.borderLeft = "5px solid";
    botao_desativar_conta.style.borderLeftStyle = "none";

});

button_informacoes_pessoais.addEventListener("click", function(){

    conteudo_editar_perfil.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "flex";
    editar_forma_recebimento.style.display = "none";
    conteudo_desativar_conta.style.display = "none";
    conteudo_alterar_senha.style.display = "none";

    button_editar_perfil.style.border = "none";
    button_alterar_senha.style.border = "none";
    button_informacoes_pessoais.style.borderLeft = "5px solid";
    button_forma_recebimento.style.borderLeft = "none";
    botao_desativar_conta.style.border = "none";

});



const container_forms_buttons = document.getElementById("container_forms_buttons");
const aba_desativar_conta = document.getElementById("aba_desativar_conta");
const modal_desativar_conta = document.getElementById("modal_desativar_conta");
const container = document.getElementById("container");

const button_desativar_conta = document.getElementById("button_desativar_conta_modal");
const button_negar_desativacao_conta = document.getElementById("button_negar_desativacao_conta");
const button_confirmar_desativacao_conta = document.getElementById("button_confirmar_desativacao_conta");

button_desativar_conta.addEventListener("click", function(){

    modal_desativar_conta.style.display = "flex";

    

    // container_forms_buttons.style.display = "block";

    // aba_desativar_conta.style.display = "block";
});

button_negar_desativacao_conta.addEventListener("click", function(){

    modal_desativar_conta.style.display = "none";

})
