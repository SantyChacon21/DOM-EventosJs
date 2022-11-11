
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
        nuevoProducto.innerHTML = `<a href="" class=" text-decoration-none text-black"  id="verCrts${Auto.id}"> 
                                <div class="card btn" data-bs-toggle="modal" data-bs-target="#modalAuto" id="divAutos" style="width: 18rem;">
                                <div class="card-body btn" data-bs-toggle="modal" data-bs-target="#modalAuto">
                                <h5 class="card-title ">${Auto.marca} ${Auto.modelo}</h5>
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

        btnCompra.addEventListener(`click`, ()=>{
        modalAuto()
        })
        
        let verCrts = document.getElementById(`verCrts${Auto.id}`)

        verCrts.addEventListener(`click`, ()=>{
            modalAuto()
        })

        console.log(verCrts)

        function modalAuto (){
    modalAutoBody.innerHTML =``

    Auto.forEach((auto) =>{
        let nuevoAuto = document.createElement (`div`)
        nuevoAuto.innerHTML= `
                            <a href="" class=" text-decoration-none text-black"> <div class="card" id="divAutos" style="width: 18rem;">
                            <div class="card-body">
                            <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
                            <p class="card-text">Año: ${auto.anio} </p>
                            <p class="card-text">Km: ${auto.km}km</p>
                            <p class="card-text">$${auto.precio}</p>
                            <a href="#" id="comprarBtn${auto.id}" class="btn btn-warning">Reservar</a>
                            </div>
                            </div> </a>
                                `
    })
}

    })

}




let btnCompraReserva = document.getElementById(`btnCompraReserva`)

function aceptacionCompra(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Estas a punto de realizar la compra de un auto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Comprar!',
        cancelButtonText: 'No, no comprar :(',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Enhorabuena, te esperamos con tu vehiculo'
              })
              noMasDox()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La compra ha sido cancelada, te esperamos pronto :)',
            'error'
          )
        }
      })
}

function errorMenos(){

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'No hay vehiculos reservados'
      })
}


btnCompraReserva.addEventListener(`click`, ()=>{
    reserva.length >= 1? aceptacionCompra() : errorMenos()
})

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

function noMasDox(){
    reserva = []
    localStorage.removeItem("reserva")
    modalReserva(reserva)
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