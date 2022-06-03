var socket = io('http://localhost:3000');

const tokenArtista = localStorage.getItem('tokenArtista');
const tokenCliente = localStorage.getItem('tokenCliente')

if(tokenCliente != "null" && tokenCliente != "undefined") {
    
    const meuPerfil = () => {
        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenCliente}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }

        fetch('http://localhost:3000/cliente/meuPerfil', config)
        .then(res => res.json())
        .then(data => {

            const cliente = data.cliente

            cliente.map(cliente => {
                const imgPerfil = document.getElementById('userimg');
                imgPerfil.src = cliente.fotoPerfilCliente;
            })
        })
    }

    meuPerfil()

    const conversasDeCliente = () => {
        const config = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokenCliente,
                'Cache-control': 'no-cache',
                'Content-Type': 'application/json'
            }
        }

        fetch('http://localhost:3000/chat/conversasDeCliente', config)
            .then(res => res.json())
            .then(data => {
                const chat = data.chat

                
                const chatList = document.getElementById('chatlist');

                chat.forEach(chat => {

                    var nomeArtista = chat.nomeArtista.split(' ')[0]
                    if(chat.nomeArtista.split(' ').length > 1){
                        nomeArtista += ' ' + chat.nomeArtista.split(' ')[1]
                    }
                    if(chat.nomeArtista.split(' ').length > 2){
                        nomeArtista += ' ' + chat.nomeArtista.split(' ')[2]
                    }
                   
                    const block = document.createElement('div')
                    block.className = 'block'
                    block.id = chat.idChat
                    block.innerHTML = `
                        <div class="imgBox">
                            <img src="${chat.imgArtista}" class="cover" alt="">
                        </div>
                        <div class="details">
                            <div class="listHead">
                                <h4>${nomeArtista}</h4>
                                <p class="time" id="timeMessage"></p>
                            </div>
                            <div class="message_p" id="lastMessage">
                                <p></p>
                            </div>
                        </div>
                    `

                    chatList.appendChild(block)

                    const query = location.search.slice(1)
                    const idChatQuery = query.split('=')[1]

                    if(idChatQuery == null){

                        block.onclick = () => {
                            const idChat = chat.idChat
                            const idCliente = chat.idCliente

                            const chatbox = document.getElementById('chatbox')
                            const sendMessage = document.getElementById('sendMessage')
                            const inputMessage = document.getElementById('inputMessage')

                            function renderMessage(message) {
                                if(message.artistaOUcliente === 1){
                                    chatbox.append('<div class="message my_msg"><p>' + message.mensagem + '<br><span>' + message.data_hora +'</span></p></div>')
                                } else if(message.artistaOUcliente === 0) {
                                    chatbox.append('<div class="message my_msg"><p>' + message.mensagem + '<br><span>' + message.data_hora +'</span></p></div>')
                                }
                            }

                            socket.emit('idChat', idChat)

                            socket.on('previousMessages', function(messages) {
                                chatbox.innerHTML = '';
                                for (message of messages) {
                                    renderMessage(message);
                                }
                            })

                            socket.on('receivedMessage', function(message) {
                                renderMessage(message);
                            })

                            sendMessage.submit(function(event){
                                event.preventDefault();
                                
                               
                                const artistaOUcliente = 1;

                                var currentdate = new Date();
                                var datetime = currentdate.getFullYear() + "-" + currentdate.getMonth() 
                                + "-" + currentdate.getDay() + " " 
                                + currentdate.getHours() + ":" 
                                + currentdate.getMinutes() + ":" + currentdate.getSeconds();

                                var foto = null;
                                const message = inputMessage.value;
                                        
                                if(message.length){
                                    var messageObject = {
                                        mensagem: message,
                                        foto: foto,
                                        data_hora: datetime,
                                        artistaOUcliente: artistaOUcliente,
                                        idUsuario: idCliente
                                    };

                                    renderMessage(messageObject);

                                    socket.emit('sendMessage', messageObject)
                                }
                                });

                        }

                    } else {

                    }

                        
                })
            })
    }

    conversasDeCliente()
    
} else if(tokenArtista != "null" && tokenArtista != "undefined") {

    const meuPerfil = () => {
        const config = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenArtista}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }

        fetch('http://localhost:3000/artista/meuPerfil', config)
        .then(res => res.json())
        .then(data => {

            const artista = data.artista

            artista.map(artista => {
                const imgPerfil = document.getElementById('userimg');
                imgPerfil.src = artista.fotoPerfilArtista;
            })
        })
    }

    meuPerfil()


    const conversasDeArtista = () => {
        const config = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokenArtista,
                'Cache-control': 'no-cache',
                'Content-Type': 'application/json'
            }
        }

        fetch('http://localhost:3000/chat/conversasDeArtista', config)
            .then(res => res.json())
            .then(data => {
                const chat = data.chat

                const chatList = document.getElementById('chatlist');

                chat.map(chat => {

                    var nomeCliente = chat.nomeCliente.split(' ')[0]
                    if(chat.nomeCliente.split(' ').length > 1){
                        nomeCliente += ' ' + chat.nomeCliente.split(' ')[1]
                    }
                    if(chat.nomeCliente.split(' ').length > 2){
                        nomeCliente += ' ' + chat.nomeCliente.split(' ')[2]
                    }

                    const block = document.createElement('div')
                    block.className = 'block'
                    block.id = chat.idChat
                    block.innerHTML = `
                        <div class="imgBox">
                            <img src="${imgCliente}" class="cover" alt="">
                        </div>
                        <div class="details">
                            <div class="listHead">
                                <h4>${nomeCliente}</h4>
                                <p class="time" id="timeMessage"></p>
                            </div>
                            <div class="message_p" id="lastMessage">
                                <p></p>
                            </div>
                        </div>
                    `

                    chatList.appendChild(block)
                })
            })
    }

    conversasDeArtista()
} 

// var $chat = $('#chat');
// var $messages = $('.messages');
// const divMessage = document.getElementById('messages');

// function renderMessage(message) {
//     if(message.artistaOUcliente === 0){
//         $messages.append('<div><strong>' + message.idUsuario + '</strong>: ' + message.mensagem + '</div>');
//     } else if(message.artistaOUcliente === 1) {
//         $messages.append('<div class="message"><strong>' + message.idUsuario + '</strong>: ' + message.mensagem + '</div>');
//     }
// }

// const query = location.search.slice(1)
// const idChat = query.split('=')[1]

// socket.emit('idChat', idChat)

// socket.on('previousMessages', function(messages) {
//     divMessage.innerHTML = '';
//     for (message of messages) {
//         renderMessage(message);
//     }
// })

// socket.on('receivedMessage', function(message) {
//     renderMessage(message);
// })


// $chat.submit(function(event){
//     event.preventDefault();
//     var author = 1;

//     if(tokenArtista === undefined){
//         artistaOUcliente = 0;
//     }
//     var message = $('input[name=message]').val();

//     var currentdate = new Date();
//     var datetime = currentdate.getFullYear() + "-" + currentdate.getMonth() 
//     + "-" + currentdate.getDay() + " " 
//     + currentdate.getHours() + ":" 
//     + currentdate.getMinutes() + ":" + currentdate.getSeconds();

//     var foto = null;
    

            
//     if(author.length && message.length){
//         var messageObject = {
//             mensagem: message,
//             foto: foto,
//             data_hora: datetime,
//             artistaOUcliente: artistaOUcliente,
//             idUsuario: author
//         };

//         renderMessage(messageObject);

//         socket.emit('sendMessage', messageObject)
//     }
//     });