"use stricts"

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