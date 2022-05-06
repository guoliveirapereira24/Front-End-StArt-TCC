"use strict"

const nomeArtista = document.getElementById("nome_artista");
const selectEspecialidade = document.getElementById("selectEspecialidadeArtista");

const getEspecialidades = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }
    
    fetch('http://localhost:3000/diversas/especialidadesArtista', config)
        .then((res) => res.json())
        .then((data) => {
            const especialidades = data.especialidadesArtista;
            console.log(especialidades)
           
           return especialidades.forEach(especialidadeArtista => {
                const option = document.createElement('option');
                option.value = especialidadeArtista.idEspecialidadeArtista;
                option.innerText = especialidadeArtista.nomeEspecialidadeArtista;
                selectEspecialidade.appendChild(option);
            });
        });
}

getEspecialidades();

const meuPerfil = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }
    
    fetch('http://localhost:3000/diversas/categorias', config)
        .then((res) => res.json())
        .then((data) => {
            const categorias = data.categorias;
           
           return categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.idCategoria;
                option.innerText = categoria.nomeCategoria;
                selectCategoria.appendChild(option);
            });
        });
}

