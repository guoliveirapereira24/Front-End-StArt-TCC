"use strict"


const tokenCliente = localStorage.getItem('tokenCliente');

const buttonLogout = document.getElementById('logout');

const logout = () => {
  localStorage.setItem("tokenCliente", undefined);
  localStorage.setItem("tokenArtista", undefined);
  window.location.href = "../../login/index.html";
}


buttonLogout.addEventListener('click', () => {
  logout();
});

const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});



if(tokenCliente == "null" || tokenCliente == null || 
   tokenCliente == "" || tokenCliente == "undefined") {
    window.location.href = "../../login/index.html";
} 


const getArtistaDestaque = () => {
  fetch("http://localhost:3000/artista/artistasDestaque", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {

      let artistasDestaque = data.artistasDestaque;

      artistasDestaque.map(artistasDestaque => {
        const div = document.createElement('li');
        div.id = artistasDestaque.idArtista;
        div.innerHTML = `
              <img src="${artistasDestaque.fotoPerfilArtista}" alt="">
        `;

        div.onclick = () => {
          window.location.href = `../../visualizacao-artista/visualizar-perfil-artista/index.html?q=${artistasDestaque.idArtista}`;
        }

        document.getElementById('artistasEmDestaque').appendChild(div);
      })
    })
    .catch(err => console.log(err));
}

getArtistaDestaque();



const getObraByCategoria = (Categoria) => {

  fetch(`http://localhost:3000/obraPronta/obrasCategoria/${Categoria}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {

      let obraPronta = data.obraPronta;

      obraPronta.map(obraPronta => {
        const div = document.createElement('li');
        div.id = obraPronta.idObraPronta;
        div.innerHTML = `
              <img src="${obraPronta.imagem1obrigatoria}" alt="">
        `;

        div.onclick = () => {
          window.location.href = `../../visualizar-obras/mais-informacoes/index.html?q=${obraPronta.idObraPronta}`;
        }

        document.getElementById(Categoria).appendChild(div);
      })
    })
    .catch(err => console.log(err));
}

getObraByCategoria("Desenho")
