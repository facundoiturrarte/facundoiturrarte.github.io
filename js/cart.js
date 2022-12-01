const cart_Info_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let divCart = document.getElementById("cart");
let btnMinus = document.getElementById("minus");
let btnPlus = document.getElementById("plus");
let stotal = document.getElementById("sub-total");
let costoEnvio = document.getElementById("costo-envio");
let costoTotal = document.getElementById("costo-total");
let envioPremium = document.getElementById("premium");
let envioExpress = document.getElementById("express");
let envioStandard = document.getElementById("standard");

function articulos() {
  for (let info of carrito) {

    // info.cantidad puede ser null si el input del elemento no fue modificado.
    // para estos casos creamos esta condicion de que si es null se le asigna cantidad = 1 
    const cantidadReal = info.cantidad || 1;

    // calculamos el subtotal = cantidadReal por el costo de la unidad
    const subtotalDeProducto = cantidadReal * info.unitCost;

    divCart.innerHTML +=
      `<div id="${info.id}" class="card-body p-4">
      <div class=" row d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img src="${info.image}" class="img-fluid rounded-3" alt="Cotton T-shirt">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
        <p>Nombre</p>
          <p class="lead fw-normal mb-2">${info.name}</p>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 ">
        <p>Costo</p>
          <h5 class="mb-0">${info.currency} ${info.unitCost}</h5>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
          <input type="number" id="${info.id}"  onchange="cambiarCantidad(this)" min="1" value="${info.cantidad || 1}" class="form-control form-control-sm"> 
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 ">
        <p>Subtotal</p>
          <h5 id="total${info.id}" class="mb-0"> ${info.currency} ${subtotalDeProducto}</h5>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <a onclick="eliminar(${info.id})" href="#!" class="text-danger"><i id="delete-products" class="fas fa-trash fa-lg"></i></a>
        </div>
      </div>   
      </div>
 `
  }
}
function eliminar(id) {
  // 1. Buscar estado actual del carrito   
  const currentCarrito = carrito;

  // 2. eliminar del carrito el objeto elegido
  // eliminar un objeto de un array por el valor de una de sus propiedades se hace con el metodo 'filter'
  const carritoFiltrado = currentCarrito.filter(elemento => elemento.id != id);

  // 3. actualizar el carrito en el local storage y en el init
  localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
  carrito = carritoFiltrado;

  // 4. Quitar el elemento borrado de la interfaz
  document.getElementById(`${id}`).innerHTML = "";

  // 5. recalcular total
  recalcularSubtotal();
}

function cambiarCantidad(input) {
  // 1. Actualizo subtotal del elemento al que le cambie la cantidad
  let idDelProductoCambiado = input.id;
  let cantidad = input.value
  let producto = carrito.find(P => P.id == idDelProductoCambiado)
  let moneda = producto.currency
  let monto = producto.unitCost
  let total = cantidad * monto
  document.getElementById("total" + idDelProductoCambiado).innerHTML = moneda + total
  producto.cantidad = cantidad;
  // 2. Actualizo el local storage con la cantidad de unidades de ese producto
  localStorage.setItem('carrito', JSON.stringify(carrito));
  // 2. Re calcular el sub total de todos los productos del carrito
  recalcularSubtotal();
}

function recalcularSubtotal() {
  let subTotalFinal = 0;
  // recorrer toda la lista de productos del carrito con las cantidades actualizadas para calcular
  // el subtotal
  for (let producto of carrito) {
    // mismo caso que articulos()
    const cantidadReal = producto.cantidad || 1;

    // por defecto el valor real es en dolares y lo toma directamente desde el unit cost del producto
    let valorRealProducto = producto.unitCost;

    // si la moneda es pesos uruguayos, la variable valorRealProducto se va a actualizar con el unit cost dividido por 40 
    if (producto.currency === 'UYU') {
      valorRealProducto = Math.round(producto.unitCost / 40);
    }

    // cuando tengo el valor real final del prodocuto y la cantidad real de unidades las multiplico para obtener el costo total de todas las unidades
    const subtotalProducto = cantidadReal * valorRealProducto;

    // el subtotal de un producto, lo sumo al subtotal final de todos los productos en cada iteracion
    subTotalFinal += subtotalProducto;
  }
  stotal.innerHTML = `${subTotalFinal}`;
  recalcularTotal();
}

function calcularCostoDeEnvioInicial() {
  const stotalNum = Number(stotal.innerHTML);
  const envio = Math.round(stotalNum * 0.05);
  costoEnvio.innerHTML = `${envio}`;
  recalcularTotal();
}

function recalcularTotal() {
  // Total es la suma de subtotal de productos mas el costo de envio
  // este metodo se debe reutilizar cada vez que se ejecute nuevamente recalcularSubtotal() o recalcular costos de envio
  const total = Number(stotal.innerHTML) + Number(costoEnvio.innerHTML);
  costoTotal.innerHTML = total;
}


envioPremium.addEventListener('click', function () {
  if (envioPremium.checked) {
    // Objetivo: calcular el costo de envio en base al subtotal de la compra.
    const envio = Math.round(stotal.innerHTML * 0.15);
    costoEnvio.innerHTML = `${envio}`;
    recalcularTotal();
  }
})

envioExpress.addEventListener('click', function () {
  if (envioExpress.checked) {
    // Objetivo: calcular el costo de envio en base al subtotal de la compra.
    const envio = Math.round(stotal.innerHTML * 0.07);
    costoEnvio.innerHTML = `${envio}`;
    recalcularTotal();
  }
})

envioStandard.addEventListener('click', function () {
  if (envioStandard.checked) {
    // Objetivo: calcular el costo de envio en base al subtotal de la compra.
    const envio = Math.round(stotal.innerHTML * 0.05);
    costoEnvio.innerHTML = `${envio}`;
    recalcularTotal();
  }
})

let pagoPorTransferencia = document.getElementById("transferencia");
let pagoPorTarjeta = document.getElementById("tarjeta");
let numeroDeCuenta = document.getElementById("numeroDeCuenta");
let nroTarjeta = document.getElementById("nro-tarjeta");
let codigoSeg = document.getElementById("codigo-seg");
let vto = document.getElementById("vto");

pagoPorTarjeta.addEventListener('click', function () {
  if (pagoPorTarjeta.checked) {
    numeroDeCuenta.disabled = true;
    nroTarjeta.disabled = false;
    codigoSeg.disabled = false;
    vto.disabled = false;
  }
})

pagoPorTransferencia.addEventListener('click', function () {
  if (pagoPorTransferencia.checked) {
    nroTarjeta.disabled = true;
    codigoSeg.disabled = true;
    vto.disabled = true;
    numeroDeCuenta.disabled = false;
  }
})

let formulario = document.forms['form-validacion'];

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  if (carrito.length == 0 || carrito == null) {
    alert('Debes tener al menos un elemento en el carrito')
    return false
  }
  errores(document.getElementById('calle'), 'error-calle', 'Debes agregar una calle', e);
  errores(document.getElementById('number'), 'error-numero', 'Debes agregar los numeros', e)
  errores(document.getElementById('esquina'), 'error-esquina', 'Debes agregar una esquina', e)
  formulario.classList.add('was-validated');
  if (!pagoPorTarjeta.checked && !pagoPorTransferencia.checked) {
    document.getElementById('terminos-boton').classList.add('color-rojo');
    document.getElementById('error-terminos').innerHTML = 'Debe elegir una forma de pago';
    document.getElementById('error-terminos').classList.add('d-block');
  } else if (pagoPorTransferencia.checked && !numeroDeCuenta.value) {
    document.getElementById('terminos-boton').classList.add('color-rojo');
    document.getElementById('error-terminos').innerHTML = 'Debe ingresar numero de cuenta';
    document.getElementById('error-terminos').classList.add('d-block');
  } else if (pagoPorTarjeta.checked && (!nroTarjeta.value || !codigoSeg.value || !vto.value)) {
    document.getElementById('terminos-boton').classList.add('color-rojo');
    document.getElementById('error-terminos').innerHTML = 'Debe completar los datos de la tarjeta';
    document.getElementById('error-terminos').classList.add('d-block');
  }
  else {
    document.getElementById('terminos-boton').classList.remove('color-rojo');
    document.getElementById('error-terminos').innerHTML = '';

    // implica que todo el formlario esta ok y se ejecuto la compra virtual correctamente

    alert('Se realizo la compra correctamente');
    localStorage.setItem('carrito', null);
    location.reload();
  }

});

function errores(input, nombreid, texto, e) {
  e.preventDefault();
  if (input.value === '') {
    input.setCustomValidity(true);
    document.getElementById(nombreid).innerHTML = texto;
    document.getElementById(nombreid).classList.add('d-block');
  } else {
    e.preventDefault();
    input.setCustomValidity('');
    document.getElementById(nombreid).innerHTML = '';
  }
}