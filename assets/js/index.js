let buttons = document.querySelectorAll("button")

let overlay = document.getElementById("overlay")

let boxConfirm = document.getElementById("boxConfirm")

let opcaoModos = document.querySelectorAll("Div.opcaoModos")

let btnVoltar = document.getElementById("btnVoltar")
let btnIniciar = document.getElementById("btnIniciar")

buttons[1].addEventListener("click", ()=>{
    overlay.style.display = "flex"
})


buttons[0].addEventListener("click", ()=>{
    alert("este modo estara disponivel em breve")
})

overlay.addEventListener('click', (event) => {

        if (event.target === overlay) {
            overlay.style.display = 'none';
}
})


opcaoModos.forEach((item)=>{
    item.addEventListener("click",()=>{
       let textModo = item.firstElementChild.textContent
       let mododejogoconfirmar = document.getElementById("mododejogoconfirmar")
       let reset = boxConfirm.firstElementChild.textContent

       boxConfirm.style.display = "flex"
       overlay.firstElementChild.style.display =  "none"
    
       mododejogoconfirmar.textContent = mododejogoconfirmar.textContent + textModo


       btnIniciar.addEventListener("click", ()=>{

       let captura = boxConfirm.firstElementChild.textContent

       if(captura.toLowerCase().includes("normal")){
        window.location.href = "rooms.html?NormalGame"
       } else if(captura.toLowerCase().includes("custom")) {
         let btncustomColetivo = document.getElementById("btnColetivo")
         let customBOx = document.getElementById("boxcustomconfirm")
         let btnIndividual = document.getElementById("btnIndividual")
         let btnVoltarCustom = document.getElementById("btnVoltarCustom")

        customBOx.style.display = "flex"

        btncustomColetivo.addEventListener("click", ()=>{
            alert("o modo ainda esta em desenvolvimento")
        })

        btnIndividual.addEventListener("click", ()=>{
            window.location.href = "rooms.html?CustomGame"
        })

        btnVoltarCustom.addEventListener("click", ()=>{
            customBOx.style.display = "none"
        })

         
       } else if(captura.toLowerCase().includes("royale")) {
        alert("Esse Modo estara disponivel em breve")
       }else if(captura.toLowerCase().includes("mestre")) {
        window.location.href = "rooms.html?Mestre"
       }

       })

       btnVoltar.addEventListener("click", ()=> {
       boxConfirm.style.display = "none"
       overlay.firstElementChild.style.display =  "flex"
       mododejogoconfirmar.textContent = reset
 })
    })
})
