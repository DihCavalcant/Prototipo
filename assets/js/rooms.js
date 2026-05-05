import { db, ref, get, onValue, update, push } from "./firebase-config.js";

const itemtemplatejogador = /** @type{HTMLTemplateElement} */ (document.getElementById("item-template-jogador"));
const listajogadores = document.getElementById("listaDeJogadores");
const overlay = document.getElementById("overlay");
const displayIdSala = document.getElementById("displayIdSala");

// Elementos da Carta
const cardWrapper = document.getElementById("card-wrapper");
const faceFront = document.getElementById("face-front");
const textoDesafio = document.getElementById("texto-desafio");
const nomeJogadorEl = document.getElementById("nome-jogador");
const turnoDisplay = document.getElementById("turno-display");
const mainGame = document.getElementById("main-game");

// Configurações do Baralho
const baralhoOriginal = [
    { cor: "#9b221e", texto: "Vende os olhos de alguém e dance no seu colo." },
    // ... seus outros desafios ...
    { cor: "#9b221e", texto: "Beije a pessoa que o grupo escolher, ou beba." }
];

let restantes = [...baralhoOriginal];
let indiceAtual = 0;
let estadoJogo = "AGUARDANDO";
let jogadores = [];
let desafiosCustom = [];
let btnAdicionarJogadores = document.getElementById("adicionarJogador");
let btncomecarjogo = document.getElementById("btn-start");
let EtapaCustom = 1;
let modoDeJogo = "";
let baralhoAtivo = baralhoOriginal; // Começa com o padrão
let AreaAdicionarJogador = document.getElementById("AreaAdicionarJogador");

// 1. LÓGICA DE CARREGAMENTO (URL e FIREBASE)
const urlParams = new URLSearchParams(window.location.search);
const salaID = urlParams.get('sala');

window.addEventListener("load", () => {
    const search = window.location.search;

    // Definição de Modos
    if (search.includes("?CustomGame")) {
        modoDeJogo = "?CustomGame";
        btncomecarjogo.textContent = "PROXIMO";
    } 
    else if (search.includes("?Mestre") || search.includes("&Mestre")) {
        modoDeJogo = "?Mestre";
        btncomecarjogo.textContent = "Iniciar Partida";
        AreaAdicionarJogador.style.display = "none";
        overlay.querySelector("h2").textContent = "Aguardando Jogadores";
    }
    else if (search.includes("?Player") || search.includes("&Player")) {
        modoDeJogo = "?Player";
        btncomecarjogo.textContent = "SAIR DA SALA";
        btncomecarjogo.style.backgroundColor = "#9b221e"; 
        AreaAdicionarJogador.style.display = "none";
        overlay.querySelector("h2").textContent = "Aguardando o Mestre...";
    }

    // Lógica Firebase (Só roda se houver uma sala online)
    if (salaID) {
        const salaRef = ref(db, `salas/${salaID}`);

        // Busca ID visual (Ex: Diego#1234)
        get(salaRef).then((snapshot) => {
            if (snapshot.exists()) {
                const dados = snapshot.val();
                if (displayIdSala) displayIdSala.textContent = dados.exibirID;
                overlay.querySelector("h3").textContent = `ID: ${dados.exibirID}`;
            }
        });

        // ESCUTAR JOGADORES (Para Mestre e Player)
        onValue(ref(db, `salas/${salaID}/jogadores`), (snapshot) => {
            const dados = snapshot.val();
            if (dados && (modoDeJogo === "?Mestre" || modoDeJogo === "?Player")) {
                listajogadores.innerHTML = "";
                jogadores = []; 
                Object.values(dados).forEach(nome => {
                    jogadores.push(nome);
                    renderizarJogadorNaTela(nome);
                });
            }
        });

        // ESCUTAR STATUS (Para iniciar o jogo em todos os celulares)
        onValue(ref(db, `salas/${salaID}/status`), (snapshot) => {
            if (snapshot.val() === "JOGANDO") {
                iniciarFluxoDeJogo();
            }
        });
    }
});

// Função auxiliar para renderizar jogadores
function renderizarJogadorNaTela(nome) {
    const clonetemplate = itemtemplatejogador.content.cloneNode(true);
    clonetemplate.querySelector(".nomedojogadorLista").textContent = nome;
    
    const btnRemover = clonetemplate.querySelector(".iconremoveplayer");

    if (modoDeJogo === "?Player") {
        btnRemover.style.display = "none"; // Player não remove ninguém
    } else {
        btnRemover.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        });
    }
    listajogadores.appendChild(clonetemplate);
}

// 2. ADICIONAR JOGADORES (MODO LOCAL)
btnAdicionarJogadores.addEventListener("click", () => {
    let nameJogador = document.getElementById("nomedojogador").value;
    if (nameJogador === "") return;
    renderizarJogadorNaTela(nameJogador);
    document.getElementById("nomedojogador").value = "";
});

// 3. LOGICA DO BOTÃO PRINCIPAL (COMEÇAR / SAIR / PRÓXIMO)
btncomecarjogo.addEventListener("click", () => {
    // Ação do Player: Sair
    if (modoDeJogo === "?Player") {
        if (confirm("Deseja realmente sair da sala?")) {
            window.location.href = "index.html";
        }
        return;
    }

    // Verificação mínima para modos locais
    if (modoDeJogo !== "?Mestre" && listajogadores.querySelectorAll(".nomedojogadorLista").length <= 1) {
        alert("Número de jogadores insuficiente");
        return;
    }

    // Fluxo do Modo Custom
    if (modoDeJogo === "?CustomGame") {
        if (EtapaCustom === 1) {
            // Captura nomes e vai para etapa de desafios
            jogadores = Array.from(document.querySelectorAll(".nomedojogadorLista")).map(el => el.textContent);
            overlay.querySelector("h2").textContent = "Hora Dos Desafios";
            overlay.querySelector("input").placeholder = "Adicione um Novo Desafio";
            listajogadores.innerHTML = "";
            btncomecarjogo.textContent = "COMEÇAR JOGO";
            EtapaCustom = 2;
            return;
        } else if (EtapaCustom === 2) {
            // Captura desafios e inicia
            baralhoAtivo = Array.from(document.querySelectorAll(".nomedojogadorLista")).map(el => ({
                cor: "#5a2d82",
                texto: el.textContent
            }));
            iniciarFluxoDeJogo();
            return;
        }
    }

    // Fluxo Mestre ou Local Padrão
    if (modoDeJogo === "?Mestre") {
        update(ref(db, `salas/${salaID}`), { status: "JOGANDO" });
    } else {
        // Modo Local Normal
        jogadores = Array.from(document.querySelectorAll(".nomedojogadorLista")).map(el => el.textContent);
        baralhoAtivo = baralhoOriginal;
        iniciarFluxoDeJogo();
    }
});

function iniciarFluxoDeJogo() {
    restantes = [...baralhoAtivo];
    if (jogadores.length > 0) {
        turnoDisplay.style.display = "block";
        mainGame.style.display = "block";
        estadoJogo = "PRONTO";
        overlay.style.display = "none";
    }
}

// 4. LOGICA DE TROCA DE CARTAS
document.querySelector("main").addEventListener("click", () => {
    if (estadoJogo === "ANIMANDO" || jogadores.length === 0) return;

    if (estadoJogo === "EXIBINDO") {
        cardWrapper.classList.add('is-exiting');
        estadoJogo = "ANIMANDO";
        setTimeout(() => {
            cardWrapper.classList.remove('is-drawn', 'is-flipped', 'is-exiting');
            estadoJogo = "PRONTO";
        }, 400);
    } else if (estadoJogo === "PRONTO") {
        if (restantes.length === 0) restantes = [...baralhoAtivo];
        
        const i = Math.floor(Math.random() * restantes.length);
        const carta = restantes.splice(i, 1)[0];

        nomeJogadorEl.innerText = jogadores[indiceAtual];
        indiceAtual = (indiceAtual + 1) % jogadores.length;

        faceFront.style.backgroundColor = carta.cor;
        textoDesafio.innerText = carta.texto;

        cardWrapper.classList.add('is-drawn');
        setTimeout(() => {
            cardWrapper.classList.add('is-flipped');
            estadoJogo = "EXIBINDO";
        }, 50);
    }
});