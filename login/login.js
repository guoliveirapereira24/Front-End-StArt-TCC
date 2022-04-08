localStorage.setItem('token', null);

const inputEmail = document.getElementById('input-email');
const inputSenha = document.getElementById('input-senha');

const buttonLogar = document.getElementById('button-logar');


buttonLogar.addEventListener("click", function() {

    if (inputEmail.value === "" ||
        inputSenha.value === "" ||
        inputConfirmarSenha.value === ""){

        msgAlertaErro.style.display = "flex";

    } else {
    
                if(inputEmail.value.includes("@")){
    
                    loginArtista(inputEmail.value, inputSenha.value);
    
                } else {
    
                    loginCliente(inputEmail.value, inputSenha.value);
    
                }

    }
     
    
});

const loginArtista = (email, senha) => {

    event.preventDefault();

    const loginArtista = {
        "email": email,
        "senha": senha
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
            localStorage.setItem('token', data.token);  
        });
}

const loginCliente = (email, senha) => {

    event.preventDefault();

    const loginCliente = {
        "email": email,
        "senha": senha
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
            localStorage.setItem('token', data.token);  
        });
}