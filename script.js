const racas = document.getElementById("racas");
const quantidade = document.getElementById("quantidade");
const galeria = document.getElementById("galeria");
const mensagem = document.getElementById("mensagem");

// Carregar raças
async function carregarRacas() {
    try {
        const resposta = await fetch(
            "https://dog.ceo/api/breeds/list/all"
        );

        if (!resposta.ok) throw new Error("Erro na API");

        const dados = await resposta.json();

        for (let raca in dados.message) {
            const opcao = document.createElement("option");
            opcao.value = raca;
            opcao.textContent = raca;
            racas.appendChild(opcao);
        }

    } catch (erro) {
        mensagem.textContent = "Erro ao carregar raças.";
    }
}

// Mostrar imagens
function mostrarImagens(imagens) {
    galeria.innerHTML = "";

    imagens.forEach(function(url) {
        const imagem = document.createElement("img");

        imagem.src = url;
        imagem.alt = "Fotografia da raça escolhida";

        galeria.appendChild(imagem);
    });
}

// Buscar imagens na API
async function buscarImagens(url) {
    mensagem.textContent = "Carregando...";
    galeria.innerHTML = "";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar imagens");
        }

        const dados = await resposta.json();

        mostrarImagens(dados.message);

        mensagem.textContent = "";

    } catch (erro) {
        mensagem.textContent = "Erro ao buscar imagens.";
    }
}

// Botão de imagens aleatórias
document.getElementById("aleatorios")
.addEventListener("click", function() {

    const numero = Number(quantidade.value);

    if (!Number.isInteger(numero) || numero < 1 || numero > 10) {
        mensagem.textContent = "Escolha um número de 1 a 10";
        return;
    }

    buscarImagens(
        `https://dog.ceo/api/breeds/image/random/${numero}`
    );
});

// Botão de imagens por raça
document.getElementById("porRaca")
.addEventListener("click", function() {

    const raca = racas.value;

    if (raca === "") {
        mensagem.textContent = "Escolha uma raça";
        return;
    }

    buscarImagens(
        `https://dog.ceo/api/breed/${raca}/images/random/3`
    );
});

// Iniciar carregamento das raças
carregarRacas();

