window.addEventListener("DOMContentLoaded", () => {
    agregarProductos(productos);
    actualizarCantidadCarrito();
    mostrarCarrito()
});
const productos = [{
    id: 1,
    nombre: "🍉 Sandía",
    precio: 500,
    Kg: 1,
    imagen: "img/sandia.jpg",
    tipo: false
},
{
    id: 2,
    nombre: "🍐 Pera",
    precio: 250,
    Kg: 1,
    imagen: "img/pera.jpg",
    tipo: false
},
{
    id: 3,
    nombre: "🍒 Cerezas",
    precio: 800,
    Kg: 1,
    imagen: "img/cerezas.jpg",
    tipo: true
},
{
    id: 4,
    nombre: "🥝 Kiwi",
    precio: 750,
    Kg: 1,
    imagen: "img/kiwi.jpg",
    tipo: true
},
{
    id: 5,
    nombre: "🍑 Durazno",
    precio: 300,
    Kg: 1,
    imagen: "img/durazno.jpg",
    tipo: false
},
{
    id: 6,
    nombre: "🥥 Coco",
    precio: 500,
    Kg: 1,
    imagen: "img/coco.jpg",
    tipo: true
}
];

function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}
function setItem(parametro){
    localStorage.setItem("carrito", JSON.stringify(parametro));
}


//************************************************//
//***********Función agregar productos************//
//************************************************//
const agregarAlCarrito = (idProducto) => {
    const carrito = getCarrito()
    const productoDuplicado = carrito.some(e=>e.id===idProducto)
    console.log(productoDuplicado);
    if (productoDuplicado > 0) {
        incrementarCantidad
    }else {
    //buscando producto a agregar
    const productoAgregado = productos.find(producto => producto.id === idProducto)
    carrito.push(productoAgregado);
    
    setItem(carrito)
    mostrarCarrito();
    //animación alert
    Toastify({
        text: `Agregaste al carrito ${productoAgregado.nombre}`,
        duration: 1200,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #fb8500, #f7ede2)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
        }
    
    //actualizando html
    actualizarCantidadCarrito();
    

};

function actualizarCantidadCarrito() {
    const carrito = getCarrito()
    document.querySelector("#cantidad-prod").innerHTML = carrito.length;
};

const crearCards = document.querySelector('#cardsJS');


//************************************************//
//************Función para crear Cards************//
//************************************************//
function agregarProductos(array) {
    crearCards.innerHTML = " ";
    array.forEach(element => {
        crearCards.innerHTML += `
            <div id="change" class="card h-100">
                <!-- Sale badge-->
                <div class="badge bg-dark text-white position-absolute" style="tipo: 0.5rem; right: 0.5rem">${element.id}</div>
                <!-- Product image-->
                <img class="card-img-top" src="${element.imagen}" alt="frutas" />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${element.nombre}</h5>
                        <!-- Product price-->                        
                        $ ${element.precio}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><button onclick="agregarAlCarrito(${element.id})" class="btn btn-outline-dark mt-auto" href="#">Comprar</button></div>
                </div>
            </div>
        `
    })
}

//************************************************//
//******Crea la lista de productos comprados******//
//************************************************//
function mostrarCarrito() {
    const carrito = getCarrito();
    document.getElementById("listaProducto").innerHTML="";
    carrito.forEach( producto => {
        document.getElementById("listaProducto").innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td><button min="0" onclick="decrementarCantidad(${producto.id})"><</button>${producto.Kg}<button  onclick="incrementarCantidad(${producto.id})">></button></td>
            <td><button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">X</=></td>
            <td>${producto.Kg * producto.precio}</td>
        </tr>
    `        
    sumarTotalCarrito();
    })
}

//************************************************//
//*****Botón que incrementa los Kg comprados******//
//************************************************//
function incrementarCantidad(id){
    const carrito= getCarrito()
    const indice= carrito.findIndex(e=>e.id===id);
    carrito[indice].Kg++
    setItem(carrito);
    mostrarCarrito();
}

//************************************************//
//******Botón que disminuye los Kg comprados******//
//************************************************//
function decrementarCantidad(id){
    const carrito= getCarrito()
    const indice= carrito.findIndex(e=>e.id===id);   
    //el contador no puede pasar a nro negatico 
    if (carrito[indice].Kg>1) {
    carrito[indice].Kg--
    };
    setItem(carrito);
    mostrarCarrito();
}

//************************************************//
//***Botón que elimina el producto de la lista****//
//************************************************//
function eliminarProducto(id){
    const carrito= getCarrito()
    const carritoFinal= carrito.filter(e=>e.id!==id);
    setItem(carritoFinal);    
    mostrarCarrito();
}

//************************************************//
//***********Función sumar total carrito**********//
//************************************************//
function sumarTotalCarrito() {
    const carrito = getCarrito();
    const sumarTodoPrecioCantidad = carrito.reduce(
      (accum, element) => accum + (element.precio*element.Kg),0
    );
    document.getElementById("total-carrito").innerHTML = sumarTodoPrecioCantidad;
};

//************************************************//
//*****Botón evento que modifica el HTML**********//
//************************************************//
function cambiar() {
    const top = productos.filter(e => e.tipo === true);
    agregarProductos(top);
}
document.getElementById("boton").onclick = function () {
    cambiar();
}

//************************************************//
//****Botón vaciar carrito (elimina el storage)****//
//************************************************//
function vaciarCarrito() {
    localStorage.removeItem("carrito");

    swal("Borraste el carrito", "No te vayas, sigue comprando!", "success");
}

document.getElementById("botonBorrar").onclick = function () {
    vaciarCarrito();   
}

//************************************************//
//************Pagar Compra (Total)****************//
//************************************************//
function pagarCompra(){
    localStorage.clear("carrito")
}
document.getElementById("botonPagarCompra").onclick = function () {
    pagarCompra();
    location.reload();
}

//************************************************//
//********Cotización Dolar (de la Fecha)**********//
//************************************************//

const valorDolar = async () => {
    fetch("https://api.bluelytics.com.ar/v2/latest")
    .then((response) => response.json())
    .then((data) => generarCBU(data.oficial));
}

const generarCBU = (oficial) => {
    document.getElementById ("dolar").innerHTML = 
    `Venta ${oficial.value_sell} - Compra ${oficial.value_buy}`
}



//***llamando api que si funciona */
fetch("https://api.bluelytics.com.ar/v2/latest")
.then((response) => response.json())
.then((data) => console.log(data.oficial.value_sell));



//***api que si funcionan*******/
//https://www.dolarsi.com/api/api.php?type=valoresprincipales
//https://bluelytics.com.ar/#!/api

