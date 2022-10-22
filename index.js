
class Auto{
    constructor(id,marca, modelo, anio, km, condicion, color, precio){
        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.anio = parseInt(anio)
        this.km = parseFloat(km)
        this.condicion = condicion
        this.color = color
        this.precio = parseFloat(precio)
        this.vendido = false
    }
}



/* let stock = JSON.parse(localStorage.getItem(`stock`)) || [] */
let reserva  = JSON.parse(localStorage.getItem(`reserva`)) || []

let stock = []

const cargarAutos = async() =>{
    const response = await fetch("autos.json")
    const data = await response.json()
    console.log(data)

    for (let auto of data){
        let autoNuevo = new Auto(auto.id, auto.marca,auto.modelo, auto.anio,auto.km, auto.condicion, auto.color, auto.precio)
        stock.push(autoNuevo)
    }
}

cargarAutos()

if (localStorage.getItem("stock")){
    stock = JSON.parse(localStorage.getItem("stock"))
}else{
    console.log(`Cargando el proceso`)
    localStorage.setItem("stock",JSON.stringify(stock))
}




let coleccionAutos = document.getElementById("divAutos");



function coleccionStock(array){
    
    coleccionAutos.innerHTML = ``
    array.forEach((Auto)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<a href="" class=" text-decoration-none text-black"> <div class="card" id="divAutos" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">${Auto.marca} ${Auto.modelo}</h5>
                                <p class="card-text">Año: ${Auto.anio} </p>
                                <p class="card-text">Km: ${Auto.km}km</p>
                                <p class="card-text">$${Auto.precio}</p>
                                <a href="#" id="comprarBtn${Auto.id}" class="btn btn-warning">Reservar</a>
                                </div>
        </div> </a> `
        coleccionAutos.appendChild(nuevoProducto)

        let btnCompra = document.getElementById(`comprarBtn${Auto.id}`)

        btnCompra.addEventListener(`click`, ()=> {
            ComprarVehiculo()
            agregarAlaReserva(Auto)
            console.log(Auto)
            console.log(reserva)
            
        })

        function agregarAlaReserva(auto){
            Auto.vendido = true
            reserva.length < 1 && reserva.push(auto) & localStorage.setItem("reserva", JSON.stringify(reserva))
            btnCompra == reserva[0] <= 1? btnCompra.innerText= `Reservado` : null
        }

        function ComprarVehiculo(){
            reserva.length === 0?Swal.fire({icon: 'success', title: 'Felicitaciones Por Su Compra', text: 'Su compra se puede ver en la consola', footer: '<a href="">Alguna consulta? Mande su pregunta al staff</a>' }):Swal.fire({icon: 'error',  title: 'Oops...',   text: 'Unicamente puedes reservar un auto a la vez',  footer: '<a href="">Alguna consulta? Mande su pregunta al staff</a>'})
            reserva.length === 0? btnCompra.innerText= `Reservado`: btnCompra.innerText= `Reservar`
        }

    })

}


function nuevoAutoVender(array){
    let aniadirAutoMarca = document.getElementById("marcaAniadir");
    let aniadirAutoModelo = document.getElementById("modeloAniadir")
    let aniadirAutoAnio = document.getElementById("anioAniadir")
    let aniadirAutoKm = document.getElementById("kmAniadir")
    let aniadirAutoPrecio = document.getElementById("precioAniadir")
    let nuevoAuto = new Auto(stock.length+1 ,aniadirAutoMarca.value, aniadirAutoModelo.value, aniadirAutoAnio.value,aniadirAutoKm.value, "Buena", "Plata", aniadirAutoPrecio.value)
    array.push(nuevoAuto)
    localStorage.setItem("stock", JSON.stringify(stock))
    console.log(array)
    coleccionStock(array)
}



const formulario = document.getElementById(`myForm`)


let btnInfoAuto = document.getElementById("btnEnviarInfo")
btnInfoAuto.addEventListener("click", ()=>{nuevoAutoVender(stock)})
btnInfoAuto.addEventListener("click", ()=>{formulario.reset()})

let btnMostrarStock = document.getElementById(`menuStock`)
btnMostrarStock.addEventListener("click", ()=>{
    coleccionStock(stock)
    
})

let btnOcultarStock = document.getElementById(`btnOcultarMenu`)

function borrarMenuStock(){
    coleccionAutos.innerHTML = ``
}


btnOcultarStock.addEventListener("click",borrarMenuStock)

let btnReserva = document.getElementById(`btnReserva`)



/* Modal para venta */

function modalReserva(array){
    modalReservaBody.innerHTML = ``
    array.forEach((reserva)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<a href="" class=" text-decoration-none text-black"> <div class="card" id="divAutos" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">${reserva.marca} ${reserva.modelo}</h5>
                                <p class="card-text">Año: ${reserva.anio} </p>
                                <p class="card-text">Km: ${reserva.km}km</p>
                                <p class="card-text">$${reserva.precio}</p>
                                </div>
        </div>`
        modalReservaBody.appendChild(nuevoProducto)
})
}

function noMasDex(array){
    array.length > 1? array.splice(1,1):null
}


btnReserva.addEventListener(`click`, ()=>{
    modalReserva(reserva)
})

/* Fetch Clima */

let weather ={
    "apiKey":"a64273766eb2fe301b8852b78aa6dd31",
    fetchWeather: function(){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=-34.6075682&lon=-58.4370894&appid=a64273766eb2fe301b8852b78aa6dd31"
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    }
}

/* Modal fetch mail */

const dataMail = {
    service_id: `service_c4znnao`,
    template_id:`template_wablv4x`,
    user_id:`WiuVzPnssCMDsxkxq`
}

function formConsulta(){
    modalConsultaBody.innerHTML = ``
    let nuevaConsulta = document.createElement(`div`)
    nuevaConsulta.innerHTML = `
                                <input type="text" id="consultaName" placeholder="Enter Name">
                                <input type="text" name="" id="cosultaEmail" placeholder="Enter Email">
                                <button .onclick:'enviarMail()';>Send Email</button>
                                `
    
    modalConsultaBody.appendChild(nuevaConsulta)
}


function enviarMail() {
    let templateParams = {
        person_name: document.getElementById(`consultaName`).value,
        person_email: document.getElementById(`cosultaEmail`).value
    }
    emailjs.send('gmail','template_wablv4x', templateParams)
    .then(function(res){
        console.log("success", res.status,res.text)
    }), function(error){
        console.log('FAILED...', error)
    }
}

let btnConsulta = document.getElementById(`btnConsulta`)

btnConsulta.addEventListener(`click`, ()=>{
    formConsulta()
})