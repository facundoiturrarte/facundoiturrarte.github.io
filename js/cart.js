const cart_Info_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let divCart = document.getElementById("cart");
let btnMinus = document.getElementById("minus");
let btnPlus = document.getElementById("plus");

fetch(cart_Info_url)
  .then(res => res.json())
  .then(datos => {
    articulos()
  })
function articulos() {
  let info_articulos = `<section class="h-100" style="background-color: #eee;">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
  
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
            <div>
              <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                    class="fas fa-angle-down mt-1"></i></a></p>
            </div>
          </div>
  
          <div class="card rounded-3 mb-4">`;
  for (let info of carrito) {
    info_articulos +=
      `
          <div id="${info.id}" class="card-body p-4">
            <div class=" row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src=${info.image}
                  class="img-fluid rounded-3" alt="Cotton T-shirt">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">${info.name}</p>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 ">
                <h5 class="mb-0">${info.currency} ${info.unitCost}</h5>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              
                
                
                <input type="number" id="${info.id}" onchange="cambiarCantidad(this)"  min="1"  value="1"
                  class="form-control form-control-sm" />


              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 ">
                <h5 id="total${info.id}" class="mb-0">${info.currency} ${info.unitCost}</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a onclick="eliminar(${info.id})" href="#!" class="text-danger"><i id="delete-products" class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>                    
 `
  }
  info_articulos += `</div>
 </div>
</div>
</div>
</div>
<div>
<p>Tipo de envio</p>
<div class="form-check">
<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
<label class="form-check-label" for="flexRadioDefault1">
Premium de 2 a 5 dias (15%)
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
<label class="form-check-label" for="flexRadioDefault2">
Expres de 5 a 8 dias (7%)
</label>
</div> 
<div class="form-check">
<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
<label class="form-check-label" for="flexRadioDefault2">
Standard de 12 a 15 dias (5%)
</label>
</div> 
</div> 
<form>

<form>
<div class="mb-3">
<label for="name" class="form-label">Direccion</label>
<input type="name" class="form-control1" >
<div class="form-text"></div>
</div>
<div class="mb-3">
<label class="form-label">Numero</label>
<input type="text" class="form-control1">
</div>
<div class="mb-3">
<label class="form-label">Esquina</label>
<input type="name" class="form-control">
</div>
<div class="mb-3">
<label class="form-label">Codigo Postal</label>
<input type="number" class="form-control">
</div>
<div class="mb-3">
<select class="form-control" >
<option value="AR">Artigas</option>
<option value="CA">Canelones</option>
<option value="CL">Cerro Largo</option>
<option value="CO">Colonia</option>
<option value="DU">Durazno</option>
<option value="FL">Flores</option>
<option value="FD">Florida</option>
<option value="LA">Lavalleja</option>
<option value="MA">Maldonado</option>
<option value="MO">Montevideo</option>
<option value="PA">Paysandu</option>
<option value="RN">Rio Negro</option>
<option value="RI">Rivera</option>
<option value="RO">Rocha</option>
<option value="SA">Salto</option>
<option value="SJ">San Jose</option>
<option value="SO">Soriano</option>
<option value="TA">Tacuarembo</option>
<option value="TT">Treinta y Tres</option>
</select></div>    
<div class="mb-3">
<label class="form-label">Telefono de contacto</label>
<input type="nummber" class="form-control">
</div>        
<button type="submit" class="btn btn-primary">Finalizar Compra</button>
</form>`
  divCart.innerHTML = info_articulos
}

function eliminar(id) {
  document.getElementById(`${id}`).innerHTML = ""
}

function cambiarCantidad(input) {
  let id = input.id;
  let cantidad = input.value
  let producto = carrito.find(P => P.id == id)
  let moneda = producto.currency
  let monto = producto.unitCost
  let total = cantidad * monto
  document.getElementById("total" + id).innerHTML = moneda + total

}
