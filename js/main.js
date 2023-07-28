//PRODUCTOS
const productos = [
    //Hoodies
    {
        id:"hoodie-01",
        titulo: "Hoodie 01",
        imagen: "./img/hoodies/HOODIE01.webp",
        categoria: {
            nombre: "Hoodies",
            id: "hoodies"
        },
        precio: 120
    },
    {
        id:"hoodie-02",
        titulo: "Hoodie 02",
        imagen: "./img/hoodies/HOODIE02.webp",
        categoria: {
            nombre: "Hoodies",
            id: "hoodies"
        },
        precio: 120
    },
    {
        id:"hoodie-03",
        titulo: "Hoodie 03",
        imagen: "./img/hoodies/HOODIE03.webp",
        categoria: {
            nombre: "Hoodies",
            id: "hoodies"
        },
        precio: 120
    },

//JOGGERS
{
    id:"jogger-01",
    titulo: "Jogger 01",
    imagen: "./img/joggers/JOGGER01.webp",
    categoria: {
        nombre: "Joggers",
        id: "joggers"
    },
    precio: 120
},
{
    id:"jogger-01",
    titulo: "Jogger 02",
    imagen: "./img/joggers/JOGGER02.webp",
    categoria: {
        nombre: "Joggers",
        id: "joggers"
    },
    precio: 120
},
{
    id:"jogger-01",
    titulo: "Jogger 03",
    imagen: "./img/joggers/JOGGER03.webp",
    categoria: {
        nombre: "Joggers",
        id: "joggers"
    },
    precio: 120
},

//OVERSIZE
{
    id:"oversize-01",
    titulo: "Oversize 01",
    imagen: "./img/oversizes/OVERSIZE01.webp",
    categoria: {
        nombre: "Oversizes",
        id: "oversizes"
    },
    precio: 100
},
{
    id:"oversize-02",
    titulo: "Oversize 02",
    imagen: "./img/oversizes/OVERSIZE02.webp",
    categoria: {
        nombre: "Oversizes",
        id: "oversizes"
    },
    precio: 100
},

{
    id:"oversize-03",
    titulo: "Oversize 03",
    imagen: "./img/oversizes/OVERSIZE03.webp",
    categoria: {
        nombre: "Oversizes",
        id: "oversizes"
    },
    precio: 100
},
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
    productoAgregado.cantidad = 1;    
    productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito()   {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
} 