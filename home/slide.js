'use strict';

const images = [
    { id: '5', url: './img/' },
    { id: '6', url: './img/' },
    { id: '7', url: './img/' },
    { id: '8', url: './img/' },
    { id: '8', url: './img/' },
    { id: '8', url: './img/' },
    { id: '8', url: './img/' },
    { id: '8', url: './img/' },
    { id: '8', url: './img/' }
];

const containerItems = document.querySelector('#container-items');

const loadImages = (images, container) => {
    images.forEach((image) => {
        container.innerHTML += `
            <div class='item'>
                <img src='${image.url}'
            </div>
        `;
    });
};

loadImages(images, containerItems);

let items = document.querySelectorAll('.item');

const previous = () => {
    containerItems.appendChild(items[0]);
    items = document.querySelectorAll('.item');
};

const next = () => {
    const lastItem = items[items.length - 1];
    containerItems.insertBefore(lastItem, items[0]);
    items = document.querySelectorAll('.item');
};

document.querySelector('#previous').addEventListener('click', previous);
document.querySelector('#next').addEventListener('click', next);
