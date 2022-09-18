let productInfo = document.getElementById("catID");
let comentarios = document.getElementById("info-comentarios");
var boton = document.getElementById('agregar');
var texto = document.getElementById('item');
let coment = [];
let datos;
let puntuacion;
let now = new Date();
let divEstrellas = document.getElementById('estrellas');
const products_Info_url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("catID")}.json`;
fetch(products_Info_url)
    .then(res => res.json())
    .then(datos => {
        console.log(datos)
        productInfo.innerHTML =  `<div id="cont"> <h1 class="Category"> ${datos.name}</h1>
         <p class="precio"><b> Precio</b> </br> ${datos.currency} ${datos.cost}</p>
         <p class="descripcion"><b>Descripcion</b> </br>${datos.description}</p>
         <p class="Category"><b>Categoria</b></br> ${datos.category}</p>
         <p class="cant-vendidos"><b>Cantidad de Vendidos</b></br> ${datos.soldCount}</p>
         </div>
        
            <div class="img"><b>Imagenes ilustrativas</b></br>
            <div class="img-container"> <img id="imgBox" src="${datos.images[0]}">
            </div>
            <div class="product-small-img">
                <img src="${datos.images[0]}"  onclick="myFunction(this)">
                <img src="${datos.images[1]}"  onclick="myFunction(this)">
                <img src="${datos.images[2]}"  onclick="myFunction(this)">
                <img src="${datos.images[3]}"  onclick="myFunction(this)">
                </div>
            </div>`
    })
   function myFunction(smallImg){
    var fullImg = document.getElementById("imgBox");
    fullImg.src = smallImg.src;
   }

const PRODUCT_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("catID")}.json`;
fetch(PRODUCT_COMMENTS_URL)
    .then(res => res.json())
    .then(datos => {
        console.log(datos)
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
 console.log(estrellas);
for (let i =0 ; i < estrellas.length ; i++){
    let estrella = estrellas[i]
    estrella.addEventListener("click", (e)=>{
        console.log(puntuacion);
        puntuacion=i+1;
        for(let j =0 ; j < estrellas.length ; j++){
            let estrella2 = estrellas[j]
            if ( j <= i ) {
                estrella2.classList.add("checked")
                }else{ estrella2.classList.remove("checked")

                }
        }
    })
}





