const inputEmail = document.getElementById('input-email');
const inputSenha = document.getElementById('input-senha');

const buttonLogar = document.getElementById('button-logar');
const msgAlertaErro = document.getElementById('msgAlertaErro')

const tokenArtista = localStorage.getItem('tokenArtista')
const tokenCliente = localStorage.getItem('tokenCliente')


const loginArtista = (email, senha) => {

    event.preventDefault();

    const loginArtista = {
        "emailLogin": email,
        "senhaLogin": senha
    };
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginArtista)
    }
 
    fetch('http://localhost:3000/artista/login', config)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('tokenArtista', data.token); 
            if(localStorage.getItem('tokenArtista') === data.token){
            window.location.href = "../home/home-artista/index.html";
            }
        });
    
}

const loginCliente = (email, senha) => {

    event.preventDefault();

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
            window.location.href = "../home/home-cliente/cliente.html";
            }
        });
    
}


buttonLogar.addEventListener("click", function() {

    if (inputEmail.value === "" ||
        inputSenha.value === "") {

        msgAlertaErro.style.display = "flex";

    } else {
    
        if(inputEmail.value !== "" && inputSenha.value !== "" && inputEmail.value.includes("@")
            && inputEmail.value.includes(".") && inputEmail.value.length > 5) {

            loginArtista(inputEmail.value, inputSenha.value);
            loginCliente(inputEmail.value, inputSenha.value);

        } else {
            msgAlertaErro.innerHTML = "Email ou senha incorretos";
            msgAlertaErro.style.display = "flex";
        }
    }
     
});

