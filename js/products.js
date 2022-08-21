document.addEventListener("DOMContentLoaded", function() {
})
const products_url = "https://japceibal.github.io/emercado-api/cats_products/101.json"
fetch(products_url)
.then(res=>res.json())
.then(datos=>{
    let divListaProductos = document.getElementById("products")
    for (let productos of datos.products){
        divListaProductos.innerHTML += ` <div onclick="setCatID(${productos.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${productos.image}" alt="${productos.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${productos.name} - ${productos.currency} ${productos.cost}</h4>
                    <small class="text-muted">${productos.soldCount} artículos</small>
                </div>
                <p class="mb-1">${productos.description}</p>
            </div>
        </div>
    </div>`
    }
});
