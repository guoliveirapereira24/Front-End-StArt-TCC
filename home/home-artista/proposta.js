const button_fazer_proposta = document.getElementById("fazer_proposta");

const button_fazer_proposta1 = document.getElementById("fazer_proposta1");

const button_cancelar_proposta_pedido_personalizado = document.getElementById("button_cancelar_proposta_pedido_personalizado");

const modal_proposta = document.getElementById("modal_proposta");

const listagem_pedidos_genero = document.getElementById("listagem_pedidos_genero");

const opcao_pedidos = document.getElementById("opcao-pedidos");


button_fazer_proposta.addEventListener("click", function(){

    modal_proposta.style.display = "flex";

    destaque.style.display = "none";
    opcao_pedidos.style.display = "none";
    listagem_pedidos_genero.style.display = "none";
});


button_fazer_proposta1.addEventListener("click", function(){

    modal_proposta.style.display = "flex";

    destaque.style.display = "none";
    opcao_pedidos.style.display = "none";
    listagem_pedidos_genero.style.display = "none";
});


button_cancelar_proposta_pedido_personalizado.addEventListener("click", function(){

    event.preventDefault();

    modal_proposta.style.display = "none";

    destaque.style.display = "flex";
    opcao_pedidos.style.display = "flex";
    listagem_pedidos_genero.style.display = "flex";

});

const modal_exclusao_pedido = document.getElementById("modal_exclusao_pedido");
const button_recusar = document.getElementById("button_recusar");

const button_recusar1 = document.getElementById("button_recusar1");

const button_nao_recusar_pedido = document.getElementById("button_nao_recusar_pedido");

const recepcao = document.getElementById("recepcao");
const container_slide = document.getElementById("container-slide");
const destaque = document.getElementById("destaque");
const destaque_modal = document.getElementById("artistas-destaque");
const button_publicos = document.getElementById("button-pedidos-publicos");
const button_para_mim = document.getElementById("button-pedidos-para-mim");
const pedidos_categorias = document.getElementById("listagem_pedidos_genero")

button_recusar.addEventListener("click", function(){

    recepcao.style.opacity = "50%";

    container_slide.style.opacity = "50%";

    destaque.style.opacity = "50%";

    button_publicos.style.opacity = "50%";

    button_para_mim.style.opacity = "50%";

    pedidos_categorias.style.opacity = "50%";

    modal_exclusao_pedido.style.display = "flex";

});

button_recusar1.addEventListener("click", function(){

    recepcao.style.opacity = "50%";

    container_slide.style.opacity = "50%";

    destaque.style.opacity = "50%";

    button_publicos.style.opacity = "50%";

    button_para_mim.style.opacity = "50%";

    pedidos_categorias.style.opacity = "50%";

    modal_exclusao_pedido.style.display = "flex";

});

button_nao_recusar_pedido.addEventListener("click", function(){

    destaque_modal.style.display = "none";

    recepcao.style.opacity = "100%"; 

    container_slide.style.opacity = "100%";

    destaque.style.opacity = "100%";

    button_publicos.style.opacity = "100%";

    button_para_mim.style.opacity = "100%";

    pedidos_categorias.style.opacity = "100%"



});
