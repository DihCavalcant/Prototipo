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
        window.location.href = "rooms.html"
       } else if(captura.toLowerCase().includes("custom")) {
        alert("Esse Modo estara disponivel em breve")
       } else if(captura.toLowerCase().includes("royale")) {
        alert("Esse Modo estara disponivel em breve")
       }else if(captura.toLowerCase().includes("mestre")) {
        alert("Esse Modo estara disponivel em breve")
       }

       })

       btnVoltar.addEventListener("click", ()=> {
       boxConfirm.style.display = "none"
       overlay.firstElementChild.style.display =  "flex"
       mododejogoconfirmar.textContent = reset
 })
    })
})
