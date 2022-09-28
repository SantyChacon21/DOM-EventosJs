function titulo(){
    console.log("Hola Bienvenido")
}

let tituloPrincipal = document.getElementById("tituloGraf")

tituloPrincipal.addEventListener("click", titulo);


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



let stock = []
if (localStorage.getItem("stock")){
    stock = JSON.parse(localStorage.getItem("stock"))
}else{
    console.log(`Cargando el proceso`)
    stock.push(new Auto("1", "ford", "raptor", "2022", "12000", "Buena", "Azul", "12000000"))
    stock.push(new Auto("2", "chevrolet", "s10", "2020", "60000", "Buena", "Azul", "12000000"))
    stock.push(new Auto("3", "ford", "raptor", "2022", "12.000", "Buena", "Azul", "12000000"))
    stock.push(new Auto("4", "chevrolet", "camaro", "2020", "11000", "Buena", "Azul", "12000000"))
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
                                <a href="#" id="comprarBtn${Auto.id}" class="btn btn-warning">Comprar</a>
                                </div>
        </div> </a> `
        coleccionAutos.appendChild(nuevoProducto)

        let btnCompra = document.getElementById(`comprarBtn${Auto.id}`)

        function ComprarVehiculo(){
            console.log(Auto)
            Swal.fire({
                icon: 'success',
                title: 'Felicitaciones Por Su Compra',
                text: 'Su compra se puede ver en la consola',
                footer: '<a href="">Alguna consulta? Mande su pregunta al staff</a>'
              })
              
        }

        btnCompra.addEventListener(`click`, ComprarVehiculo)
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
btnMostrarStock.addEventListener("click", ()=>{coleccionStock(stock)})

let btnOcultarStock = document.getElementById(`btnOcultarMenu`)

function borrarMenuStock(){
    coleccionAutos.innerHTML = ``
}

btnOcultarStock.addEventListener("click",borrarMenuStock)



