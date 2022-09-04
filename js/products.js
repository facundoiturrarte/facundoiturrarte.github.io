let divListaProductos = document.getElementById("products")
let btnGral = document.getElementById("sortByCount");
let btnDesc = document.getElementById("sortDesc");
let btnAsc = document.getElementById("sortAsc");
let btnFiltrar = document.getElementById("FilterCount");
let inputMin = document.getElementById("CountMin");
let inputMax = document.getElementById("CountMax");
let btnLimpiar = document.getElementById("clearFilter")
let search = document.getElementById("input-buscador")
let btnSearch = document.getElementById("btn-search")
let gral = [];
let original = [];
let parrafo = document.getElementById("parrafoAutos");
const products_url = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";
fetch(products_url)
    .then(res => res.json())
    .then(datos => {
        gral = datos.products;
        original = datos.products;
        console.log(original);
        parrafo.innerHTML = datos.catName;
        mostrarProductos();
    })
function mostrarProductos() {
    let contenido = "";
    for (let productos of gral) {
        contenido += `<div onclick="setCatID(${productos.id})" class="list-group-item list-group-item-action cursor-active">
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
    divListaProductos.innerHTML = contenido
}


btnGral.addEventListener('click', event => {
    gral.sort((a, b) => {
        if (a.soldCount > b.soldCount) { return -1; }
        if (a.soldCount < b.soldCount) { return 1; }
        return 0;
    })
    mostrarProductos();
})

btnAsc.addEventListener('click', event => {
    gral.sort((a, b) => {
        if (a.cost < b.cost) { return -1; }
        if (a.cost > b.cost) { return 1; }
        return 0;
    })
    mostrarProductos();
})

btnDesc.addEventListener('click', event => {
    gral.sort((a, b) => {
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0;
    })
    mostrarProductos();
})
btnFiltrar.addEventListener('click', function () {
    let min;
    if (inputMin.value !== '' && inputMin.value !== undefined) {
        min = inputMin.value;
    } else {
        min = -Infinity;
    };
    let max;
    if (inputMax.value !== '' && inputMax.value !== undefined) {
        max = inputMax.value;
    } else {
        max = Infinity;
    };
    gral = original.filter(gral => gral.cost >= min && gral.cost <= max);
    mostrarProductos();
});
btnLimpiar.addEventListener('click', function (event) {
    inputMax.value = "";
    inputMin.value = "";
    btnFiltrar.click();
});

search.addEventListener('keyup', e => {
    gral = original.filter(gral => gral.description.toLowerCase() && gral.name.toLowerCase().includes(search.value.toLowerCase()))
    mostrarProductos(gral);
})

