document.querySelector("form").addEventListener("submit", event => {
    console.log("enviar o formulário")

    // Evita que o fomulário seja enviado(e a tela recarregada)
    event.preventDefault()
})