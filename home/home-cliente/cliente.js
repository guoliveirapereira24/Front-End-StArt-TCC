"use strict"


const tokenCliente = localStorage.getItem('tokenCliente');


if(tokenCliente == "null" || tokenCliente == null || 
   tokenCliente == "" || tokenCliente == "undefined") {
  window.location.href = "../../index.html";
} 


const buttonLogout = document.getElementById('logout');

function functionLogout() {
    localStorage.setItem('tokenCliente', null);
    localStorage.setItem('tokenArtista', null);
}

buttonLogout.addEventListener('click', functionLogout());

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

function logout() {
  localStorage.setItem("tokenCliente", null);
  localStorage.setItem("tokenArtista", null);
  window.location.href = "../../login/index.html";
}


