
import { db, ref, get, update, push } from "./firebase-config.js";

let buttons = document.querySelectorAll("button")
let overlay = document.getElementById("overlay")
let poupUp = document.getElementById("poup-up")
let poupUpCreateRoom = document.getElementById("poup-up-create-room")
let boxConfirm = document.getElementById("boxConfirm")
let opcaoModos = document.querySelectorAll("Div.opcaoModos")
let btnVoltar = document.getElementById("btnVoltar")
let btnIniciar = document.getElementById("btnIniciar")
let btnEntrarSala = document.getElementById("btnEntrarSala"); // O botão de 'Entrar' no seu modal

// Funções para abrir os modais iniciais
buttons[1].addEventListener("click", () => {
    overlay.style.display = "flex"
    poupUpCreateRoom.style.display = "none"
    poupUp.style.display = "flex"
})

buttons[0].addEventListener("click", () => {
    overlay.style.display = "flex"
    poupUp.style.display = "none"
    poupUpCreateRoom.style.display = "flex"
})

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
})

opcaoModos.forEach((item) => {
    item.addEventListener("click", () => {
        let textModo = item.firstElementChild.textContent
        let mododejogoconfirmar = document.getElementById("mododejogoconfirmar")
        let reset = boxConfirm.firstElementChild.textContent
        let NomeDaSala = document.getElementById("NomeDaSala").value

        if (NomeDaSala == "") {
            alert("Preencha o campo nome")
            return
        }

        boxConfirm.style.display = "flex"
        overlay.firstElementChild.style.display = "none"
        mododejogoconfirmar.textContent = mododejogoconfirmar.textContent + textModo

        // --- LÓGICA DO BOTÃO INICIAR (Mantendo sua estrutura) ---
        btnIniciar.addEventListener("click", () => {
            let captura = boxConfirm.firstElementChild.textContent
            const nomeUsuario = document.getElementById("NomeDaSala").value;
            
            // Gerador de ID Único para os modos online
            const sufixo = Math.floor(1000 + Math.random() * 9000);
            const idSalaTecnico = `${nomeUsuario.trim().toLowerCase().replace(/\s+/g, '-')}-${sufixo}`;

            if (captura.toLowerCase().includes("normal")) {
                // Modo Normal Local (mantive sua URL antiga, ajuste se for rooms_2.html)
                window.location.href = "rooms.html?NormalGame"

            } else if (captura.toLowerCase().includes("custom")) {
                let btncustomColetivo = document.getElementById("btnColetivo")
                let customBOx = document.getElementById("boxcustomconfirm")
                let btnIndividual = document.getElementById("btnIndividual")
                let btnVoltarCustom = document.getElementById("btnVoltarCustom")

                customBOx.style.display = "flex"

                // MODO ONLINE (Coletivo)
                btncustomColetivo.addEventListener("click", () => {
                    // Agora o coletivo funciona com Firebase!
                    set(ref(db, 'salas/' + idSalaTecnico), {
                        status: "CONFIGURANDO",
                        mestre: nomeUsuario,
                        exibirID: `${nomeUsuario}#${sufixo}`,
                        modo: "CustomOnline"
                    }).then(() => {
                        window.location.href = `rooms.html?CustomGame&sala=${idSalaTecnico}`;
                    });
                })

                // MODO OFFLINE (Individual)
                btnIndividual.addEventListener("click", () => {
                    window.location.href = "rooms.html?CustomGame"
                })

                btnVoltarCustom.addEventListener("click", () => {
                    customBOx.style.display = "none"
                })

            } else if (captura.toLowerCase().includes("royale")) {
                alert("Esse Modo estara disponivel em breve")

            } else if (captura.toLowerCase().includes("mestre")) {
                // Modo Mestre com Firebase
                set(ref(db, 'salas/' + idSalaTecnico), {
                    status: "AGUARDANDO",
                    mestre: nomeUsuario,
                    exibirID: `${nomeUsuario}#${sufixo}`,
                    modo: "Mestre"
                }).then(() => {
                    window.location.href = `rooms.html?Mestre&sala=${idSalaTecnico}`;
                });
            }
        }, { once: true }); // O {once: true} evita que o evento se acumule!

        btnVoltar.addEventListener("click", () => {
            boxConfirm.style.display = "none"
            overlay.firstElementChild.style.display = "flex"
            mododejogoconfirmar.textContent = reset
        })
    })
})

btnEntrarSala.addEventListener("click", () => {
    const nomeUsuario = document.getElementById("NomeDaSalaEntrar").value; // Input do nome do player
    const idDigitado = document.getElementById("IdDaSalaEntrar").value; // Input do ID (Ex: Diego#1234)

    if (nomeUsuario === "" || idDigitado === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // O ID no Firebase é o "idSalaTecnico" (ex: diego-1234). 
    // Vamos converter o que o usuário digitou para o formato do banco:
    const idTecnico = idDigitado.replace("#", "-").toLowerCase();

    const salaRef = ref(db, `salas/${idTecnico}`);

    get(salaRef).then((snapshot) => {
        if (snapshot.exists()) {
            // A sala existe! Agora adicionamos o jogador na lista daquela sala
            const playersRef = ref(db, `salas/${idTecnico}/jogadores`);
            push(playersRef, nomeUsuario).then(() => {
                // Redireciona para a página do jogo com o parâmetro de Player
                window.location.href = `rooms.html?Player&sala=${idTecnico}`;
            });
        } else {
            alert("Sala não encontrada! Verifique o ID.");
        }
    }).catch((error) => {
        console.error("Erro ao buscar sala:", error);
    });
});