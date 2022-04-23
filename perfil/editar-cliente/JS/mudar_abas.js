"use strict"


const button_editar_perfil = document.getElementById("button_editar_perfil");
const button_alterar_senha = document.getElementById("button_alterar_senha");
const button_informacoes_pessoais = document.getElementById("button_informacoes_pessoais");
const button_endereco = document.getElementById("button_endereco");
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
    button_endereco.style.border = "none";
    botao_desativar_conta.style.border = "none";

});

button_alterar_senha.addEventListener("click", function(){

    conteudo_alterar_senha.style.display = "flex";

    conteudo_editar_perfil.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "none";
    conteudo_desativar_conta.style.display = "none";

    button_editar_perfil.style.borderLeft = "none";
    button_informacoes_pessoais.style.border = "none";
    button_endereco.style.border = "none";
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
    button_endereco.style.border = "none";
    botao_desativar_conta.style.borderLeft = "5px solid";

});

button_endereco.addEventListener("click", function(){

    conteudo_editar_perfil.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "flex";
    conteudo_desativar_conta.style.display = "none";
    conteudo_alterar_senha.style.display = "none";

    button_editar_perfil.style.border = "none";
    button_alterar_senha.style.border = "none";
    button_informacoes_pessoais.style.border = "none";
    button_endereco.style.borderLeft = "5px solid";
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
    button_endereco.style.borderLeft = "none";
    botao_desativar_conta.style.border = "none";

});