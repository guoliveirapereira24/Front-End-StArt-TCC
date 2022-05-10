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
