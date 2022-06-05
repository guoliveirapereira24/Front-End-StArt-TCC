var socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

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

                            block.className = 'block active'
                            const idChat = chat.idChat
                            const idCliente = chat.idCliente


                            const header = document.getElementById('header')
                            header.innerHTML = `
                                <div class="imgText">
                                    <div class="userimg">
                                        <img src="${chat.imgArtista}" alt="" class="cover">
                                    </div>
                                    <h4>${nomeArtista}</h4>
                                </div>
                            `

                            const chatinput = document.getElementById('chatinput')
                            chatinput.innerHTML = `
                            <input type="text" placeholder="Escreva uma mensagem" id="inputMessage">
                            <button class="send_btn" id="sendMessage">
                                <img src="./img/icon-send.png" alt="">
                            </button>`

                            const chatbox = document.getElementById('chatbox')
                            const sendMessage = document.getElementById('sendMessage')
                            const inputMessage = document.getElementById('inputMessage')

                            

                            function renderMessage(message) {

                                var dateTimeMessage = new Date(message.data_hora)
                                var timeMessage = dateTimeMessage.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

                                var date = new Date(message.data_hora);
                                var date = date.toLocaleDateString('pt-BR');

                                
                                var dateNow = new Date(Date.now());
                                dateNow = dateNow.toLocaleDateString('pt-BR');


                                if(((dateNow.split('/')[0]) - (date.split('/')[0])) == 1){
                                    date = 'Ontem'
                                } else if(date == dateNow){
                                    date = timeMessage
                                } else if(date < dateNow){
                                    date = date
                                }


                                if(message.artistaOUcliente === 1){
                                    const messageBox = document.createElement('div')
                                    messageBox.className = 'message my_msg'
                                    messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                    chatbox.append(messageBox)
                                } else if(message.artistaOUcliente === 0) {
                                    const messageBox = document.createElement('div')
                                    messageBox.className = 'message friend_msg'
                                    messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                    chatbox.append(messageBox)
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

                            sendMessage.onclick = function(event){
                                event.preventDefault();
                                
                               
                                const artistaOUcliente = 1;

                                var dateNow = new Date(Date.now());
                                dateNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + ' ' + dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds();
                           


                                var foto = null;
                                const message = inputMessage.value;
                                        
                                if(message.length){
                                    var messageObject = {
                                        mensagem: message,
                                        foto: foto,
                                        data_hora: dateNow,
                                        artistaOUcliente: artistaOUcliente,
                                        idUsuario: idCliente
                                    };

                                    renderMessage(messageObject);

                                    socket.emit('sendMessage', messageObject)
                                }
                                };

                        }

                    } else {

                        block.className = 'block active'
                        const idChat = chat.idChat
                        const idCliente = chat.idCliente

                        const header = document.getElementById('header')
                        header.innerHTML = `
                            <div class="imgText">
                                <div class="userimg">
                                    <img src="${chat.imgArtista}" alt="" class="cover">
                                </div>
                                <h4>${nomeArtista}</h4>
                            </div>
                        `

                        const chatinput = document.getElementById('chatinput')
                            chatinput.innerHTML = `
                            <input type="text" placeholder="Escreva uma mensagem" id="inputMessage">
                            <button class="send_btn" id="sendMessage">
                                <img src="./img/icon-send.png" alt="">
                            </button>`

                        const chatbox = document.getElementById('chatbox')
                        const sendMessage = document.getElementById('sendMessage')
                        const inputMessage = document.getElementById('inputMessage')

                        function renderMessage(message) {

                            var dateTimeMessage = new Date(message.data_hora)
                            var timeMessage = dateTimeMessage.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

                            var date = new Date(message.data_hora);
                            var date = date.toLocaleDateString('pt-BR');

                            
                            var dateNow = new Date(Date.now());
                            dateNow = dateNow.toLocaleDateString('pt-BR');



                            if(((dateNow.split('/')[0]) - (date.split('/')[0])) == 1){
                                date = 'Ontem'
                            } else if(date == dateNow){
                                date = timeMessage
                            } else if(date < dateNow){
                                date = date
                            }

                            if(message.artistaOUcliente === 1){
                                const messageBox = document.createElement('div')
                                messageBox.className = 'message my_msg'
                                messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                chatbox.append(messageBox)
                            } else if(message.artistaOUcliente === 0) {
                                const messageBox = document.createElement('div')
                                messageBox.className = 'message friend_msg'
                                messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                chatbox.append(messageBox)
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

                        sendMessage.onclick = function(event){
                            event.preventDefault();
                            
                           
                            const artistaOUcliente = 1;

                            var dateNow = new Date(Date.now());
                            dateNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + ' ' + dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds();
                       


                            var foto = null;
                            const message = inputMessage.value;
                                    
                            if(message.length){
                                var messageObject = {
                                    mensagem: message,
                                    foto: foto,
                                    data_hora: dateNow,
                                    artistaOUcliente: artistaOUcliente,
                                    idUsuario: idCliente
                                };

                                renderMessage(messageObject);

                                socket.emit('sendMessage', messageObject)
                            }
                            };

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
                            <img src="${chat.imgCliente}" class="cover" alt="">
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

                    

                    const query = location.search.slice(1)
                    const idChatQuery = query.split('=')[1]

                    if(idChatQuery == null){

                        block.onclick = () => {

                            block.className = 'block active'

                            const idChat = chat.idChat
                            const idArtista = chat.idArtista

                            const header = document.getElementById('header')
                            header.innerHTML = `
                                <div class="imgText">
                                    <div class="userimg">
                                        <img src="${chat.imgCliente}" alt="" class="cover">
                                    </div>
                                    <h4>${nomeCliente}</h4>
                                </div>
                            `

                            const chatinput = document.getElementById('chatinput')
                            chatinput.innerHTML = `
                            <input type="text" placeholder="Escreva uma mensagem" id="inputMessage">
                            <button class="send_btn" id="sendMessage">
                                <img src="./img/icon-send.png" alt="">
                            </button>`

                            const chatbox = document.getElementById('chatbox')
                            const sendMessage = document.getElementById('sendMessage')
                            const inputMessage = document.getElementById('inputMessage')

                            

                            function renderMessage(message) {

                                var dateTimeMessage = new Date(message.data_hora)
                                var timeMessage = dateTimeMessage.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

                                var date = new Date(message.data_hora);
                                var date = date.toLocaleDateString('pt-BR');

                                
                                var dateNow = new Date(Date.now());
                                dateNow = dateNow.toLocaleDateString('pt-BR');

                                if(((dateNow.split('/')[0]) - (date.split('/')[0])) == 1){
                                    date = 'Ontem'
                                } else if(date == dateNow){
                                    date = timeMessage
                                } else if(date < dateNow){
                                    date = date
                                }

                                
                                if(message.artistaOUcliente === 1){
                                    const messageBox = document.createElement('div')
                                    messageBox.className = 'message friend_msg'
                                    messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                    chatbox.append(messageBox)
                                } else if(message.artistaOUcliente === 0) {
                                    const messageBox = document.createElement('div')
                                    messageBox.className = 'message my_msg'
                                    messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                    chatbox.append(messageBox)
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

                            sendMessage.onclick = function(event){
                                event.preventDefault();
                                
                               
                                const artistaOUcliente = 0;

                                var dateNow = new Date(Date.now());
                                dateNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + ' ' + dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds();
                           


                                var foto = null;
                                const message = inputMessage.value;
                                        
                                if(message.length){
                                    var messageObject = {
                                        mensagem: message,
                                        foto: foto,
                                        data_hora: dateNow,
                                        artistaOUcliente: artistaOUcliente,
                                        idUsuario: idArtista
                                    };

                                    renderMessage(messageObject);

                                    socket.emit('sendMessage', messageObject)
                                }
                                };

                        }

                    } else {
                        block.className = 'block active'

                        const idChat = idChatQuery
                        const idArtista = chat.idArtista

                        const header = document.getElementById('header')
                        header.innerHTML = `
                            <div class="imgText">
                                <div class="userimg">
                                    <img src="${chat.imgCliente}" alt="" class="cover">
                                </div>
                                <h4>${nomeCliente}</h4>
                            </div>
                        `

                        const chatinput = document.getElementById('chatinput')
                            chatinput.innerHTML = `
                            <input type="text" placeholder="Escreva uma mensagem" id="inputMessage">
                            <button class="send_btn" id="sendMessage">
                                <img src="./img/icon-send.png" alt="">
                            </button>`

                        const chatbox = document.getElementById('chatbox')
                        const sendMessage = document.getElementById('sendMessage')
                        const inputMessage = document.getElementById('inputMessage')

                        function renderMessage(message) {

                            var dateTimeMessage = new Date(message.data_hora)
                            var timeMessage = dateTimeMessage.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

                            var date = new Date(message.data_hora);
                            var date = date.toLocaleDateString('pt-BR');

                            
                            var dateNow = new Date(Date.now());
                            dateNow = dateNow.toLocaleDateString('pt-BR');

          

                            if(((dateNow.split('/')[0]) - (date.split('/')[0])) == 1 && date.split('/')[1] == dateNow.split('/')[1] && date.split('/')[2] == dateNow.split('/')[2]){
                                date = 'Ontem'
                            } else if(date == dateNow){
                                date = timeMessage
                            } else if(date < dateNow){
                                date = date
                            }

                            
                            if(message.artistaOUcliente === 1){
                                const messageBox = document.createElement('div')
                                messageBox.className = 'message friend_msg'
                                messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                chatbox.append(messageBox)
                            } else if(message.artistaOUcliente === 0) {
                                const messageBox = document.createElement('div')
                                messageBox.className = 'message my_msg'
                                messageBox.innerHTML = '<p>' + message.mensagem + '<br><span>' + date + '</span></p>'
                                chatbox.append(messageBox)
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

                        sendMessage.onclick = function(event){
                            event.preventDefault();
                            
                           
                            const artistaOUcliente = 0;

                            var dateNow = new Date(Date.now());
                            dateNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + ' ' + dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds();
                       


                            var foto = null;
                            const message = inputMessage.value;
                                    
                            if(message.length){
                                var messageObject = {
                                    mensagem: message,
                                    foto: foto,
                                    data_hora: dateNow,
                                    artistaOUcliente: artistaOUcliente,
                                    idUsuario: idArtista
                                };

                                renderMessage(messageObject);

                                socket.emit('sendMessage', messageObject)
                            }
                            };
                    }
                })
            })
    }

    conversasDeArtista()
} 
