let jogadores = []
let desafiosCustom = []
let btnAdicionarJogadores = document.getElementById("adicionarJogador")
let btncomecarjogo = document.getElementById("btn-start")
const itemtemplatejogador =  /** @type{HTMLTemplateElement} */ (document.getElementById("item-template-jogador")) 
const listajogadores = document.getElementById("listaDeJogadores")
const overlay = document.getElementById("overlay")
let EtapaCustom = 1
let modoDeJogo = ""

window.addEventListener("load", ()=>{
    if(window.location.search == "?CustomGame"){
        modoDeJogo = "?CustomGame"
        
        btncomecarjogo.textContent = "PROXIMO"
    }
})

btnAdicionarJogadores.addEventListener("click", () =>{

    const clonetemplatejogador = itemtemplatejogador.content.cloneNode(true)
    let nameJogador = document.getElementById("nomedojogador").value
    let nomedojogadorLista = clonetemplatejogador.querySelector(".nomedojogadorLista")
    nomedojogadorLista.textContent = nameJogador
    
    if(nameJogador == ""){
        return 
    }
    
    listajogadores.appendChild(clonetemplatejogador)

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
    
    

    if(modoDeJogo == "?CustomGame" && EtapaCustom == 1){

jogadores = []
    
    itemlistaplayer.forEach((element) => {
          let itemparaarray = element.firstElementChild.textContent
          
          jogadores.push(itemparaarray)
    })
        
        overlay.querySelector("h2").textContent = "Hora Dos Desafios"
        overlay.querySelector("input").placeholder = "Adicione um Novo Desafio"
        
        EtapaCustom = 2

        btncomecarjogo.textContent = "COMEÇAR JOGO"

        listajogadores.innerHTML = ""

        return
    } 
    
    if(modoDeJogo == "?CustomGame" && EtapaCustom == 2){

        desafiosCustom = []
        itemlistaplayer.forEach((element) => {
          let itemparaarray = element.firstElementChild.textContent
          
          desafiosCustom.push({cor: "#5a2d82", texto: itemparaarray})
    });

        overlay.querySelector("h2").textContent = "Hora Dos Desafios"
        
    }     
    
    if(jogadores == ""){
        return
    }


    
   if(modoDeJogo == "?CustomGame"){
         restantes = [...desafiosCustom]
    }

    if (jogadores.length > 0) {
        turnoDisplay.style.display = "block";
        mainGame.style.display = "block";
        estadoJogo = "PRONTO";
    }
        overlay.style.display = "none"

})

// Lista de desafios extraída dos seus documentos
const baralhoOriginal = [
    { cor: "#9b221e", texto: "Vende os olhos de alguém e dance no seu colo." },
    { cor: "#9b221e", texto: "Beije lentamente o pescoço da pessoa à sua direita." },
    { cor: "#9b221e", texto: "Escolha alguém para dar um selinho. Se essa pessoa recusar, vocês bebem." },
    { cor: "#9b221e", texto: "Escolha alguém para encenar uma posição sexual com você." },
    { cor: "#e6911d", texto: "Com quem você transaria dessa roda?" },
    { cor: "#9b221e", texto: "Lamber alguém da roda; a pessoa escolhe onde e a roda escolhe quem." },
    { cor: "#0a4d8c", texto: "Você precisa sofrer a consequência junto com a próxima pessoa." },
    { cor: "#1e8c3e", texto: "Você está livre da próxima consequência." },
    { cor: "#9b221e", texto: "Passe um doce para a pessoa à sua direita usando os lábios." },
    { cor: "#e6911d", texto: "Quando foi a última vez que você se masturbou?" },
    { cor: "#9b221e", texto: "Todos os homens bebem." },
    { cor: "#9b221e", texto: "Todas as mulheres bebem." },
    { cor: "#9b221e", texto: "Dê um beijo no pescoço na pessoa da sua esquerda ou os dois terminam suas bebidas." },
    { cor: "#e6911d", texto: "Ficaria com o/a ex de algum amigo seu? A roda responde." },
    { cor: "#9b221e", texto: "Dê uma mordida na boca da pessoa à sua frente ou os dois bebem." },
    { cor: "#9b221e", texto: "Peça a alguém para escolher uma letra do alfabeto; você deve dar um selinho em alguém com essa letra." },
    { cor: "#e6911d", texto: "Teria coragem de ter um relacionamento aberto? Explique-se." },
    { cor: "#e6911d", texto: "Com qual pessoa do mesmo sexo nesta sala você ficaria?" },
    { cor: "#e6911d", texto: "Qual o lugar mais fora do comum que você já ficou ou transou com alguém?" },
    { cor: "#9b221e", texto: "Dê um gemido no ouvido da pessoa à sua direita." },
    { cor: "#e6911d", texto: "Com quem desta roda você faria um trisal?" },
    { cor: "#9b221e", texto: "Dê um selinho em alguém do sexo oposto, a roda escolhe." },
    { cor: "#9b221e", texto: "Dê um selinho em alguém do mesmo sexo, a roda escolhe." },
    { cor: "#e6911d", texto: "Qual a última pessoa que você ficou?" },
    { cor: "#9b221e", texto: "Escolha duas pessoas para dar um selinho lento." },
    { cor: "#9b221e", texto: "Vende-se: alguém do grupo lhe dá um beijo; se você acertar quem foi, todos bebem, se errar, você bebe." },
    { cor: "#9b221e", texto: "Poste 'volta vida' na bolinha do Instagram e deixe por pelo menos 10 minutos." },
    { cor: "#9b221e", texto: "Mostre uma foto da sua pasta segura ou oculta." },
    { cor: "#9b221e", texto: "Escolha alguém para abrir o zíper da calça com a boca." },
    { cor: "#e6911d", texto: "Com quais jogadores você faria uma DP (dupla penetração)?" },
    { cor: "#e6911d", texto: "A roda decide o nome de 3 pessoas e você deve dizer qual tem o melhor beijo." },
    { cor: "#9b221e", texto: "Escolha duas pessoas para realizar um selinho triplo com você, ou todos bebem." },
    { cor: "#9b221e", texto: "Sente-se atrás do jogador à sua frente e beije o pescoço dele lentamente." },
    { cor: "#1e8c3e", texto: "Você está com sorte: pode escolher uma pessoa para realizar sua próxima consequência." },
    { cor: "#9b221e", texto: "Todos devem dar um selinho em alguém; quem não conseguir, bebe." },
    { cor: "#9b221e", texto: "Escolha alguém para virar um shot com você." },
    { cor: "#e6911d", texto: "Pegaria alguém que está namorando?" },
    { cor: "#e6911d", texto: "Você prefere dar ou receber prazer?" },
    { cor: "#e6911d", texto: "O que você considera traição?" },
    { cor: "#e6911d", texto: "Quando foi a última vez que você teve alguma relação sexual?" },
    { cor: "#1e8c3e", texto: "Escolha uma carta que já foi retirada para realizar ou responder." },
    { cor: "#e6911d", texto: "Já transou com alguém do jogo?" },
    { cor: "#e6911d", texto: "Já beijou alguém do jogo?" },
    { cor: "#e6911d", texto: "Você é ativo ou passivo?" },
    { cor: "#e6911d", texto: "Qual seu tipo de pornô favorito?" },
    { cor: "#e6911d", texto: "Já teve relações com mais de uma pessoa ao mesmo tempo? Se não, tem vontade?" },
    { cor: "#e6911d", texto: "Com quantos anos você perdeu a virgindade?" },
    { cor: "#e6911d", texto: "Já tirou a virgindade de alguém?" },
    { cor: "#e6911d", texto: "Você perdeu a virgindade com um homem ou uma mulher?" },
    { cor: "#9b221e", texto: "Vende seus olhos e irão lhe oferecer uma bebida; se você acertar qual é, todos bebem." },
    { cor: "#0a4d8c", texto: "Embaralhar: troquem de lugares." },
    { cor: "#0a4d8c", texto: "Realize ou responda a mesma carta da pessoa à sua frente na vez dela." },
    { cor: "#0a4d8c", texto: "Surpresa: saia por 1 minuto enquanto os jogadores escolhem 3 cartas já retiradas; você escolherá uma aleatoriamente." },
    { cor: "#9b221e", texto: "Fique abraçado com algum jogador até sua próxima vez; os outros jogadores escolhem quem." },
    { cor: "#0a4d8c", texto: "Amigo da onça: você escolhe uma pessoa para realizar o seu próximo desafio por você." },
    { cor: "#9b221e", texto: "Escolha duas pessoas para beberem." },
    { cor: "#0a4d8c", texto: "Amigo da onça: solte o nome de 3 pessoas e pergunte a um amigo seu quem ele(a) pegaria." },
    { cor: "#e6911d", texto: "Jurado: dê nota para quem você acha (ou sabe) que tem os 3 melhores beijos." },
    { cor: "#e6911d", texto: "Com quem foi seu melhor beijo?" },
    { cor: "#e6911d", texto: "Com quem foi seu pior beijo?" },
    { cor: "#1e8c3e", texto: "Anjo da guarda: você pode realizar um desafio por algum outro jogador." },
    { cor: "#9b221e", texto: "Todos abaixam a cabeça e levantam no 3 apontando para alguém; quem tiver mais dedos apontados, bebe." },
    { cor: "#e6911d", texto: "Quais são as três coisas que mais lhe chamam atenção em uma pessoa?" },
    { cor: "#e6911d", texto: "Peça para alguém adivinhar com quantas pessoas do jogo você já pegou; se ela acertar você bebe, se errar ela bebe." },
    { cor: "#0a4d8c", texto: "Embaralhar: você pode trocar quantas pessoas quiser de lugar." },
    { cor: "#0a4d8c", texto: "Embaralhar: o grupo decide o lugar onde você irá ficar a partir de agora." },
    { cor: "#e6911d", texto: "Você já traiu ou conhece alguém que já?" },
    { cor: "#e6911d", texto: "Perdoaria traição?" },
    { cor: "#e6911d", texto: "Pergunte ao grupo se você beija bem." },
    { cor: "#0a4d8c", texto: "Competição: desafie alguém para ficar imóvel; quem perder ou rir primeiro bebe." },
    { cor: "#e6911d", texto: "Pegaria o atual de algum amigo seu?" },
    { cor: "#e6911d", texto: "Você já esteve afim de alguém que esteja jogando?" },
    { cor: "#9b221e", texto: "Deixe a roda escolher 3 pessoas e depois você escolhe qual dar um selinho." },
    { cor: "#9b221e", texto: "Se a última pessoa que você pegou estiver aqui, beije-a; se não, beba." },
    { cor: "#0a4d8c", texto: "Se a próxima pessoa não realizar o desafio, você bebe por ela." },
    { cor: "#0a4d8c", texto: "Coloquem as cartas novamente no baralho, boa sorte." },
    { cor: "#9b221e", texto: "Beije uma pessoa no rosto para cada letra do seu nome." },
    { cor: "#1e8c3e", texto: "Jogue uma moeda: se cair cara você bebe, se cair coroa está livre da próxima carta." },
    { cor: "#1e8c3e", texto: "Escolha uma carta que você já tirou para realizar novamente." },
    { cor: "#e6911d", texto: "Escolha 2 jogadores para falarem alguma verdade sobre você para você." },
    { cor: "#9b221e", texto: "Beije a pessoa que o grupo escolher, ou beba." }
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
// btncomecarjogo.addEventListener("click", () => {

// });
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