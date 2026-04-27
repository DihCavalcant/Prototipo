let jogadores = []

let btnAdicionarJogadores = document.getElementById("adicionarJogador")

let btncomecarjogo = document.getElementById("btn-start")

const itemtemplatejogador =  /** @type{HTMLTemplateElement} */ (document.getElementById("item-template-jogador")) 

const listajogadores = document.getElementById("listaDeJogadores")

const overlay = document.getElementById("overlay")

btnAdicionarJogadores.addEventListener("click", () =>{

    const clonetemplatejogador = itemtemplatejogador.content.cloneNode(true)
    let nameJogador = document.getElementById("nomedojogador").value
    let nomedojogadorLista = clonetemplatejogador.querySelector(".nomedojogadorLista")
    nomedojogadorLista.textContent = nameJogador
    
    if(nameJogador == ""){
        return 
    }
    
    listajogadores.append(clonetemplatejogador)

    let limparcampo = document.getElementById("nomedojogador")

    limparcampo.value = ""

    let btnRemoverJogadores = document.querySelectorAll(".iconremoveplayer")

    
btnRemoverJogadores.forEach((element) => {
    element.addEventListener("click", ()=>{
        element.parentElement.remove()
    })
});
})

btncomecarjogo.addEventListener("click", ()=>{
    
    let itemlistaplayer = document.querySelectorAll(".itemListaPlayer")

    itemlistaplayer.forEach((element) => {
          let itemparaarray = element.firstElementChild.textContent
          
          jogadores.push(itemparaarray)
    });
    
    
    if(jogadores == ""){
        return
    }

    overlay.style.display = "none"

})


// Lista de desafios extraída dos seus documentos
const baralhoOriginal = [
    { cor: "#9b221e", texto: "Vende os olhos de alguém e dance no seu colo." },
    { cor: "#9b221e", texto: "Beije lentamente o pescoço da pessoa a sua direita." },
    { cor: "#e6911d", texto: "Com quem você transaria dessa roda?" },
    { cor: "#9b221e", texto: "Escolha alguém para dar um selinho. Se essa pessoa recusar vocês bebem." },
    { cor: "#0a4d8c", texto: "Você precisa sofrer a consequência junto com a próxima pessoa." },
    { cor: "#1e8c3e", texto: "Você está livre da próxima consequência." },
    { cor: "#9b221e", texto: "Passe um doce para a pessoa a sua direita usando os labios." },
    { cor: "#e6911d", texto: "Quando foi a ultima vez que você se masturbou?" },
    { cor: "#9b221e", texto: "Todos os homens bebem." },
    { cor: "#9b221e", texto: "Todas as mulheres bebem." },
    { cor: "#e6911d", texto: "Ficaria com o/a ex de algum amig@ seu? A roda responde." },
    { cor: "#9b221e", texto: "Dê um gemido no ouvido da pessoa a sua direita." },
    { cor: "#9b221e", texto: "Poste 'volta vida' nos Stories e deixe por 10 minutos." },
    { cor: "#1e8c3e", texto: "Anjo da guarda: você pode realizar um desafio por outro jogador." }
    // ... adicione os outros conforme necessário
];

let restantes = [...baralhoOriginal];
let indiceAtual = 0;
let estadoJogo = "AGUARDANDO"; // AGUARDANDO, EXIBINDO, ANIMANDO

// Elementos da Carta
const cardWrapper = document.getElementById("card-wrapper");
const faceFront = document.getElementById("face-front");
const textoDesafio = document.getElementById("texto-desafio");
const nomeJogadorEl = document.getElementById("nome-jogador");
const turnoDisplay = document.getElementById("turno-display");
const mainGame = document.getElementById("main-game");

// Modificação no seu botão de começar para mostrar o jogo
btncomecarjogo.addEventListener("click", () => {
    if (jogadores.length > 0) {
        turnoDisplay.style.display = "block";
        mainGame.style.display = "block";
        estadoJogo = "PRONTO";
    }
});

// Lógica de clicar na tela para trocar carta
document.querySelector("main").addEventListener("click", () => {
    if (estadoJogo === "ANIMANDO" || jogadores.length === 0) return;

    if (estadoJogo === "EXIBINDO") {
        // Fechar carta
        cardWrapper.classList.add('is-exiting');
        estadoJogo = "ANIMANDO";
        setTimeout(() => {
            cardWrapper.classList.remove('is-drawn', 'is-flipped', 'is-exiting');
            estadoJogo = "PRONTO";
        }, 400);
    } else if (estadoJogo === "PRONTO") {
        // Sacar nova carta
        if (restantes.length === 0) restantes = [...baralhoOriginal];
        
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