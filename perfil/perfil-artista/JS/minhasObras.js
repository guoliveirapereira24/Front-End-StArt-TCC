"use strict";

const tokenArtista = localStorage.getItem('tokenArtista');

function getObraPronta(){

    const configObras = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${tokenArtista}`
        }
    } 

    
    
    fetch('http://localhost:3000/obraPronta/minhasObras', configObras)
        .then((res) => res.json())
        .then((data) => {
            const obraPronta = data.obraPronta;
           
           return obraPronta.map(obraPronta => {

                obrasArtistas.innerHTML = 
                ``
        });
    });
  
}