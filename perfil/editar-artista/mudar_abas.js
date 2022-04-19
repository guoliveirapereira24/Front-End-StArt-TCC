
const button_editar_perfil = document.getElementById("button_editar_perfil");
const button_alterar_senha = document.getElementById("button_alterar_senha");
const button_informacoes_pessoais = document.getElementById("button_informacoes_pessoais");
const button_forma_recebimento = document.getElementById("button_forma_recebimento");
const button_desativar_conta = document.getElementById("button_desativar_conta");

const conteudo_editar_perfil = document.getElementById("conteudo_editar_perfil");
const conteudo_alterar_senha = document.getElementById("conteudo_alterar_senha");
const conteudo_informacoes_pessoais = document.getElementById("conteudo_informacoes_pessoais");
const editar_forma_recebimento = document.getElementById("editar_forma_recebimento");
const aba_desativar_conta = document.getElementById("aba_desativar_conta");

button_editar_perfil.addEventListener("click", function(){

    conteudo_editar_perfil.style.display = "flex";
    conteudo_alterar_senha.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "none";
    aba_desativar_conta.style.display = "none";

    button_alterar_senha.style.border = "none";
    button_informacoes_pessoais.style.border = "none";
    button_forma_recebimento.style.border = "none";
    button_desativar_conta.style.border = "none";

});

button_alterar_senha.addEventListener("click", function(){

    conteudo_alterar_senha.style.display = "flex";

    conteudo_editar_perfil.style.display = "none";
    conteudo_informacoes_pessoais.style.display = "none";
    editar_forma_recebimento.style.display = "none";
    aba_desativar_conta.style.display = "none";

    button_editar_perfil.style.border = "none";
    // button_alterar_senha.style.border = "none";
    button_informacoes_pessoais.style.border = "none";
    button_forma_recebimento.style.border = "none";
    button_desativar_conta.style.border = "none";

});
