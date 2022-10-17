let productInfo = document.getElementById("catID");
let comentarios = document.getElementById("info-comentarios");
var boton = document.getElementById('agregar');
var texto = document.getElementById('item');
let coment = [];
let productsRel = [];
let datos;
let puntuacion;
let now = new Date();
let divEstrellas = document.getElementById('estrellas');
let imageOnDisplay = 0;
let fotos;
let carritoProductos = [];
let productosCarrito = [];
const products_Info_url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`;
fetch(products_Info_url)
    .then(res => res.json())
    .then(datos => {
        productsRel = datos.relatedProducts;
        relatedProducts();
        productosCarrito = datos;
        fotos = datos.images;
        productInfo.innerHTML = `<div id="cont"> <h1 class="Category"> ${datos.name}</h1>
         <p class="precio"><b> Precio</b> </br> ${datos.currency} ${datos.cost}</p>
         <p class="descripcion"><b>Descripcion</b> </br>${datos.description}</p>
         <p class="Category"><b>Categoria</b></br> ${datos.category}</p>
         <p class="cant-vendidos"><b>Cantidad de Vendidos</b></br> ${datos.soldCount}</p>
         <button onclick="agregarAlCarrito(${datos.id})"id="agregar-producto" class="boton-agregar"> Agregar <i class="fas fa-shopping-cart"></i></botton>
         </div>
        
            <div class="img"><b>Imagenes ilustrativas</b></br>
            <div class="foto-grande"> <button class="boton" onclick="handleChangeDisplay(1)"> &lt;</button>
            <div class="img-container"> <img id="imgBox" src="${datos.images[0]}">
            </div>
            <button class="boton" onclick="handleChangeDisplay(-1)">&gt;</button>  
            </div>
            <div class="product-small-img">
                <img src="${datos.images[0]}"  index="0" onclick="myFunction(this)">
                <img src="${datos.images[1]}"  index="1" onclick="myFunction(this)">
                <img src="${datos.images[2]}"  index="2" onclick="myFunction(this)">
                <img src="${datos.images[3]}"  index="3" onclick="myFunction(this)">
                </div>
            </div>`
    })

function myFunction(smallImg) {
    var fullImg = document.getElementById("imgBox");
    fullImg.src = smallImg.src;
    imageOnDisplay = smallImg.getAttribute("index")
}
function handleChangeDisplay(numeric) {
    imageOnDisplay = parseInt(imageOnDisplay) + numeric
    if (imageOnDisplay === -1) imageOnDisplay = fotos.length - 1;
    if (imageOnDisplay === fotos.length) imageOnDisplay = 0;
    var fullImg = document.getElementById("imgBox");
    fullImg.src = fotos[imageOnDisplay]
}




const PRODUCT_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;
fetch(PRODUCT_COMMENTS_URL)
    .then(res => res.json())
    .then(datos => {
        coment = datos;
        comentUsuario();
    });
boton.addEventListener('click', (e) => {
    datos = {
        user: localStorage.getItem("user"),
        description: texto.value,
        dateTime: currentTime,
        score: puntuacion,
    }
    if ((texto.value != "")) {
        comentarios.innerHTML += `<p> ${texto.value} </p>`
        coment.push(datos);
        comentUsuario();
    }
});
let currentTime = new Date().toLocaleTimeString("es-CL", {
    year: "numeric",
    day: "numeric",
    month: "numeric",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
});
function comentUsuario() {
    let content = "";
    for (data of coment) {
        let star;
        if (data.score == 1) {
            star = `<span class="fa fa-star checked"></span><span class="fa fa-star "></span><span class="fa fa-star "></span><span class="fa fa-star "></span><span class="fa fa-star "></span>`
        } else if (data.score == 2) {
            star = `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star "></span><span class="fa fa-star"></span><span class="fa fa-star "></span>`
        } else if (data.score == 3) {
            star = `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star "></span><span class="fa fa-star "></span>`
        } else if (data.score == 4) {
            star = `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>`
        } else {
            star = `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>`
        }
        content += `<p class="precio"> ${data.description} </p>
<p class="descripcion">${data.user}</p>
<p class="Category">${data.dateTime}</p>
${star}</br>`
    }
    comentarios.innerHTML = content;
}
let estrellas = divEstrellas.querySelectorAll("span")
for (let i = 0; i < estrellas.length; i++) {
    let estrella = estrellas[i]
    estrella.addEventListener("click", (e) => {
        puntuacion = i + 1;
        for (let j = 0; j < estrellas.length; j++) {
            let estrella2 = estrellas[j]
            if (j <= i) {
                estrella2.classList.add("checked")
            } else {
                estrella2.classList.remove("checked")

            }
        }
    })
}

function relatedProducts() {
    let productos = "";
    for (data of productsRel) {
        productos += `<div class="name-img" onclick="pRelId(${data.id})"> <img class="img-pRel" src="${data.image}">
        <h4 class="name"> ${data.name}</h4></div>`
    }
    document.getElementById("product-rel").innerHTML += productos;
}

function pRelId(id) {
    localStorage.setItem("productID", id);
    window.location.href = "product-info.html"
}



function agregarAlCarrito(id) {
    localStorage.setItem("productID", id);
    let articulos = {
        name: productosCarrito.name,
        currency: productosCarrito.currency,
        id: productosCarrito.id, 
        image: productosCarrito.images[0],
        unitCost: productosCarrito.cost
    }
    let productoEncontrado = carrito.find(p=>p.id==id)
    if (productoEncontrado==undefined){
     carrito.push(articulos);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
window.location.href = "cart.html"
}
