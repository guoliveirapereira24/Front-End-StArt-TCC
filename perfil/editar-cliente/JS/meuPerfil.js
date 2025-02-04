"use strict"

const nomeCliente1 = document.getElementById("nome_cliente1");
const nomeCliente2 = document.getElementById("nome_cliente2");
const nomeCliente3 = document.getElementById("nome_cliente3");
const imgPerfil1 = document.getElementById("imgPerfil1");
const imgPerfil2 = document.getElementById("imgPerfil2");
const imgPerfil3 = document.getElementById("imgPerfil3");
const inputNomeCompleto = document.getElementById("nome_completo_cliente");
const inputNacionalidade = document.getElementById("nacionalidade_cliente");
const selectPais = document.getElementById("selectPais")
const inputBiografia = document.getElementById("textAreaBiografia")
const inputDataNascimento = document.getElementById("data_nascimento_cliente");
const inputTelefoneCelular = document.getElementById("telefone_cliente");
const inputEmail = document.getElementById("email_cliente");
const selectPreferencia = document.getElementById("selectPreferencia");
const inputCpfCnpj = document.getElementById("cpf_cnpj_cliente");

const inputCep = document.getElementById("cep");
const inputEndereco = document.getElementById("endereco")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")
const inputBairro = document.getElementById("bairro")
var selectEstado = document.getElementById("estado")
var selectCidade = document.getElementById("cidade")

const getEstados = () => {
    const config = {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        }
    }
    
    fetch('http://localhost:3000/diversas/estados', config)
        .then((res) => res.json())
        .then((data) => {
            const estados = data.estados;
        
           
           return estados.forEach(estado => {
                const option = document.createElement('option');
                option.id = "option" + estado.idEstado
                option.value = estado.idEstado;
                option.innerText = estado.nomeEstado;
                selectEstado.appendChild(option);
            });
        });  

}

getEstados();

const getCidades = (idCidadeSelecionada) => {
    const config = {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        }
    }

    const idEstado = selectEstado.value;
    
    fetch(`http://localhost:3000/diversas/cidades/${idEstado}`, config)
        .then((res) => res.json())
        .then((data) => {
            const cidades = data.cidades;
           
           return cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.id = "option" + cidade.idCidade;
                option.value = cidade.idCidade;
                option.innerText = cidade.nomeCidade;
                selectCidade.appendChild(option);
            }), selectCidade.value = idCidadeSelecionada;
        });

        
}



selectEstado.addEventListener("change", () => {
    const config = {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        }
    }

    const idEstado = selectEstado.value;
    
    fetch(`http://localhost:3000/diversas/cidades/${idEstado}`, config)
        .then((res) => res.json())
        .then((data) => {
            const cidades = data.cidades;
            selectCidade.innerHTML = "";
           
           return cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.idCidade;
                option.innerText = cidade.nomeCidade;
                selectCidade.appendChild(option);
            });
        });
});


const getEspecialidades = () => {
    const config = {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }
    
    fetch('http://localhost:3000/diversas/categorias', config)
        .then((res) => res.json())
        .then((data) => {
            const categoria = data.categorias;
           
           return categoria.map(categoria => {
                const option = document.createElement('option');
                option.id = categoria.idCategoria;   
                option.value = categoria.nomeCategoria;
                option.innerText = categoria.nomeCategoria;
                selectPreferencia.appendChild(option);
            });
        });
}



const meuPerfil = () => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${localStorage.getItem('tokenCliente')}`
        }
    }
    
    fetch('http://localhost:3000/cliente/meuPerfil', config)
        .then((res) => res.json())
        .then((data) => {
            const cliente = data.cliente;
      
           return cliente.forEach(cliente => {
                inputTelefoneCelular.value = cliente.telefoneCelular;
                inputEmail.value = cliente.email;
                inputNomeCompleto.value = cliente.nomeCompleto;

                inputNacionalidade.value = cliente.nacionalidade;
                inputBiografia.innerHTML = cliente.biografia;
                inputCpfCnpj.value = cliente.cpf_cnpj;
                nomeCliente1.innerHTML = cliente.nomeCompleto;
                nomeCliente2.innerHTML = cliente.nomeCompleto;
                nomeCliente3.innerHTML = cliente.nomeCompleto;
                imgPerfil1.src = cliente.fotoPerfilCliente;
                imgPerfil2.src = cliente.fotoPerfilCliente;
                imgPerfil3.src = cliente.fotoPerfilCliente;


                let dataNascimento = cliente.dataNascimento;
                let dataNascimentoSplit = dataNascimento[0] + dataNascimento[1] + 
                dataNascimento[2] + dataNascimento[3] + dataNascimento[4] + 
                dataNascimento[5] + dataNascimento[6] + dataNascimento[7] +
                dataNascimento[8] + dataNascimento[9];
            
                inputDataNascimento.value = dataNascimentoSplit;

                let {preferencia} = cliente;
                if(preferencia != null){
                    selectPreferencia.value = preferencia
                }

                let {pais} = cliente;
                if(pais !== null) {
                    selectPais.innerHTML = listaPaises;
                    selectPais.value = pais
                } else {
                    selectPais.innerHTML = listaPaises;
                }

                
                inputEndereco.value = cliente.rua;
                inputNumero.value = cliente.numero;
                inputBairro.value = cliente.bairro;
                inputCep.value = cliente.cep;
                inputComplemento.value = cliente.complemento;

                selectEstado.value = cliente.idEstado;

                getCidades(cliente.idCidade);
                
            });
        });
}


getEspecialidades();
meuPerfil();





const listaPaises = `
<option value="Afeganistão">Afeganistão</option>
<option value="África do Sul">África do Sul</option>
<option value="Albânia">Albânia</option>
<option value="Alemanha">Alemanha</option>
<option value="Andorra">Andorra</option>
<option value="Angola">Angola</option>
<option value="Anguilla">Anguilla</option>
<option value="Antilhas Holandesas">Antilhas Holandesas</option>
<option value="Antárctida">Antárctida</option>
<option value="Antígua e Barbuda">Antígua e Barbuda</option>
<option value="Argentina">Argentina</option>
<option value="Argélia">Argélia</option>
<option value="Armênia">Armênia</option>
<option value="Aruba">Aruba</option>
<option value="Arábia Saudita">Arábia Saudita</option>
<option value="Austrália">Austrália</option>
<option value="Áustria">Áustria</option>
<option value="Azerbaijão">Azerbaijão</option>
<option value="Bahamas">Bahamas</option>
<option value="Bahrein">Bahrein</option>
<option value="Bangladesh">Bangladesh</option>
<option value="Barbados">Barbados</option>
<option value="Belize">Belize</option>
<option value="Benim">Benim</option>
<option value="Bermudas">Bermudas</option>
<option value="Bielorrússia">Bielorrússia</option>
<option value="Bolívia">Bolívia</option>
<option value="Botswana">Botswana</option>
<option value="Brasil" selected>Brasil</option>
<option value="Brunei">Brunei</option>
<option value="Bulgária">Bulgária</option>
<option value="Burkina Faso">Burkina Faso</option>
<option value="Burundi">Burundi</option>
<option value="Butão">Butão</option>
<option value="Bélgica">Bélgica</option>
<option value="Bósnia e Herzegovina">Bósnia e Herzegovina</option>
<option value="Cabo Verde">Cabo Verde</option>
<option value="Camarões">Camarões</option>
<option value="Camboja">Camboja</option>
<option value="Canadá">Canadá</option>
<option value="Catar">Catar</option>
<option value="Cazaquistão">Cazaquistão</option>
<option value="Chade">Chade</option>
<option value="Chile">Chile</option>
<option value="China">China</option>
<option value="Chipre">Chipre</option>
<option value="Colômbia">Colômbia</option>
<option value="Comores">Comores</option>
<option value="Coreia do Norte">Coreia do Norte</option>
<option value="Coreia do Sul">Coreia do Sul</option>
<option value="Costa do Marfim">Costa do Marfim</option>
<option value="Costa Rica">Costa Rica</option>
<option value="Croácia">Croácia</option>
<option value="Cuba">Cuba</option>
<option value="Dinamarca">Dinamarca</option>
<option value="Djibouti">Djibouti</option>
<option value="Dominica">Dominica</option>
<option value="Egito">Egito</option>
<option value="El Salvador">El Salvador</option>
<option value="Emirados Árabes Unidos">Emirados Árabes Unidos</option>
<option value="Equador">Equador</option>
<option value="Eritreia">Eritreia</option>
<option value="Escócia">Escócia</option>
<option value="Eslováquia">Eslováquia</option>
<option value="Eslovênia">Eslovênia</option>
<option value="Espanha">Espanha</option>
<option value="Estados Federados da Micronésia">Estados Federados da Micronésia</option>
<option value="Estados Unidos">Estados Unidos</option>
<option value="Estônia">Estônia</option>
<option value="Etiópia">Etiópia</option>
<option value="Fiji">Fiji</option>
<option value="Filipinas">Filipinas</option>
<option value="Finlândia">Finlândia</option>
<option value="França">França</option>
<option value="Gabão">Gabão</option>
<option value="Gana">Gana</option>
<option value="Geórgia">Geórgia</option>
<option value="Gibraltar">Gibraltar</option>
<option value="Granada">Granada</option>
<option value="Gronelândia">Gronelândia</option>
<option value="Grécia">Grécia</option>
<option value="Guadalupe">Guadalupe</option>
<option value="Guam">Guam</option>
<option value="Guatemala">Guatemala</option>
<option value="Guernesei">Guernesei</option>
<option value="Guiana">Guiana</option>
<option value="Guiana Francesa">Guiana Francesa</option>
<option value="Guiné">Guiné</option>
<option value="Guiné Equatorial">Guiné Equatorial</option>
<option value="Guiné-Bissau">Guiné-Bissau</option>
<option value="Gâmbia">Gâmbia</option>
<option value="Haiti">Haiti</option>
<option value="Honduras">Honduras</option>
<option value="Hong Kong">Hong Kong</option>
<option value="Hungria">Hungria</option>
<option value="Ilha Bouvet">Ilha Bouvet</option>
<option value="Ilha de Man">Ilha de Man</option>
<option value="Ilha do Natal">Ilha do Natal</option>
<option value="Ilha Heard e Ilhas McDonald">Ilha Heard e Ilhas McDonald</option>
<option value="Ilha Norfolk">Ilha Norfolk</option>
<option value="Ilhas Cayman">Ilhas Cayman</option>
<option value="Ilhas Cocos (Keeling)">Ilhas Cocos (Keeling)</option>
<option value="Ilhas Cook">Ilhas Cook</option>
<option value="Ilhas Feroé">Ilhas Feroé</option>
<option value="Ilhas Geórgia do Sul e Sandwich do Sul">Ilhas Geórgia do Sul e Sandwich do Sul</option>
<option value="Ilhas Malvinas">Ilhas Malvinas</option>
<option value="Ilhas Marshall">Ilhas Marshall</option>
<option value="Ilhas Menores Distantes dos Estados Unidos">Ilhas Menores Distantes dos Estados Unidos</option>
<option value="Ilhas Salomão">Ilhas Salomão</option>
<option value="Ilhas Virgens Americanas">Ilhas Virgens Americanas</option>
<option value="Ilhas Virgens Britânicas">Ilhas Virgens Britânicas</option>
<option value="Ilhas Åland">Ilhas Åland</option>
<option value="Indonésia">Indonésia</option>
<option value="Inglaterra">Inglaterra</option>
<option value="Índia">Índia</option>
<option value="Iraque">Iraque</option>
<option value="Irlanda do Norte">Irlanda do Norte</option>
<option value="Irlanda">Irlanda</option>
<option value="Irã">Irã</option>
<option value="Islândia">Islândia</option>
<option value="Israel">Israel</option>
<option value="Itália">Itália</option>
<option value="Iêmen">Iêmen</option>
<option value="Jamaica">Jamaica</option>
<option value="Japão">Japão</option>
<option value="Jersey">Jersey</option>
<option value="Jordânia">Jordânia</option>
<option value="Kiribati">Kiribati</option>
<option value="Kuwait">Kuwait</option>
<option value="Laos">Laos</option>
<option value="Lesoto">Lesoto</option>
<option value="Letônia">Letônia</option>
<option value="Libéria">Libéria</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Lituânia">Lituânia</option>
<option value="Luxemburgo">Luxemburgo</option>
<option value="Líbano">Líbano</option>
<option value="Líbia">Líbia</option>
<option value="Macau">Macau</option>
<option value="Macedônia">Macedônia</option>
<option value="Madagáscar">Madagáscar</option>
<option value="Malawi">Malawi</option>
<option value="Maldivas">Maldivas</option>
<option value="Mali">Mali</option>
<option value="Malta">Malta</option>
<option value="Malásia">Malásia</option>
<option value="Marianas Setentrionais">Marianas Setentrionais</option>
<option value="Marrocos">Marrocos</option>
<option value="Martinica">Martinica</option>
<option value="Mauritânia">Mauritânia</option>
<option value="Maurícia">Maurícia</option>
<option value="Mayotte">Mayotte</option>
<option value="Moldávia">Moldávia</option>
<option value="Mongólia">Mongólia</option>
<option value="Montenegro">Montenegro</option>
<option value="Montserrat">Montserrat</option>
<option value="Moçambique">Moçambique</option>
<option value="Myanmar">Myanmar</option>
<option value="México">México</option>
<option value="Mônaco">Mônaco</option>
<option value="Namíbia">Namíbia</option>
<option value="Nauru">Nauru</option>
<option value="Nepal">Nepal</option>
<option value="Nicarágua">Nicarágua</option>
<option value="Nigéria">Nigéria</option>
<option value="Niue">Niue</option>
<option value="Noruega">Noruega</option>
<option value="Nova Caledônia">Nova Caledônia</option>
<option value="Nova Zelândia">Nova Zelândia</option>
<option value="Níger">Níger</option>
<option value="Omã">Omã</option>
<option value="Palau">Palau</option>
<option value="Palestina">Palestina</option>
<option value="Panamá">Panamá</option>
<option value="Papua-Nova Guiné">Papua-Nova Guiné</option>
<option value="Paquistão">Paquistão</option>
<option value="Paraguai">Paraguai</option>
<option value="País de Gales">País de Gales</option>
<option value="Países Baixos">Países Baixos</option>
<option value="Peru">Peru</option>
<option value="Pitcairn">Pitcairn</option>
<option value="Polinésia Francesa">Polinésia Francesa</option>
<option value="Polônia">Polônia</option>
<option value="Porto Rico">Porto Rico</option>
<option value="Portugal">Portugal</option>
<option value="Quirguistão">Quirguistão</option>
<option value="Quênia">Quênia</option>
<option value="Reino Unido">Reino Unido</option>
<option value="República Centro-Africana">República Centro-Africana</option>
<option value="República Checa">República Checa</option>
<option value="República Democrática do Congo">República Democrática do Congo</option>
<option value="República do Congo">República do Congo</option>
<option value="República Dominicana">República Dominicana</option>
<option value="Reunião">Reunião</option>
<option value="Romênia">Romênia</option>
<option value="Ruanda">Ruanda</option>
<option value="Rússia">Rússia</option>
<option value="Saara Ocidental">Saara Ocidental</option>
<option value="Saint Martin">Saint Martin</option>
<option value="Saint-Barthélemy">Saint-Barthélemy</option>
<option value="Saint-Pierre e Miquelon">Saint-Pierre e Miquelon</option>
<option value="Samoa Americana">Samoa Americana</option>
<option value="Samoa">Samoa</option>
<option value="Santa Helena, Ascensão e Tristão da Cunha">Santa Helena, Ascensão e Tristão da Cunha</option>
<option value="Santa Lúcia">Santa Lúcia</option>
<option value="Senegal">Senegal</option>
<option value="Serra Leoa">Serra Leoa</option>
<option value="Seychelles">Seychelles</option>
<option value="Singapura">Singapura</option>
<option value="Somália">Somália</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Suazilândia">Suazilândia</option>
<option value="Sudão">Sudão</option>
<option value="Suriname">Suriname</option>
<option value="Suécia">Suécia</option>
<option value="Suíça">Suíça</option>
<option value="Svalbard e Jan Mayen">Svalbard e Jan Mayen</option>
<option value="São Cristóvão e Nevis">São Cristóvão e Nevis</option>
<option value="São Marino">São Marino</option>
<option value="São Tomé e Príncipe">São Tomé e Príncipe</option>
<option value="São Vicente e Granadinas">São Vicente e Granadinas</option>
<option value="Sérvia">Sérvia</option>
<option value="Síria">Síria</option>
<option value="Tadjiquistão">Tadjiquistão</option>
<option value="Tailândia">Tailândia</option>
<option value="Taiwan">Taiwan</option>
<option value="Tanzânia">Tanzânia</option>
<option value="Terras Austrais e Antárticas Francesas">Terras Austrais e Antárticas Francesas</option>
<option value="Território Britânico do Oceano Índico">Território Britânico do Oceano Índico</option>
<option value="Timor-Leste">Timor-Leste</option>
<option value="Togo">Togo</option>
<option value="Tonga">Tonga</option>
<option value="Toquelau">Toquelau</option>
<option value="Trinidad e Tobago">Trinidad e Tobago</option>
<option value="Tunísia">Tunísia</option>
<option value="Turcas e Caicos">Turcas e Caicos</option>
<option value="Turquemenistão">Turquemenistão</option>
<option value="Turquia">Turquia</option>
<option value="Tuvalu">Tuvalu</option>
<option value="Ucrânia">Ucrânia</option>
<option value="Uganda">Uganda</option>
<option value="Uruguai">Uruguai</option>
<option value="Uzbequistão">Uzbequistão</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Vaticano">Vaticano</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietname">Vietname</option>
<option value="Wallis e Futuna">Wallis e Futuna</option>
<option value="Zimbabwe">Zimbabwe</option>
<option value="Zâmbia">Zâmbia</option>
`;
