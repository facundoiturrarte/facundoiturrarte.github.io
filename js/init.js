const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
document.addEventListener("DOMContentLoaded", ()=>{
  let usuario = localStorage.getItem("user");
  let datosUsuario = JSON.parse(localStorage.getItem("GuardarDatos"))
  if(usuario){ 
  document.getElementById("user").innerHTML= usuario;
  document.getElementById("email").value= usuario
  document.getElementById('primer-nombre').value=datosUsuario.pNombre
  document.getElementById('segundo-nombre').value=datosUsuario.sNombre
  document.getElementById('primer-apellido').value=datosUsuario.pApellido
  document.getElementById('segundo-apellido').value=datosUsuario.sApellido
  document.getElementById('numero-contacto').value=datosUsuario.contacto
  document.getElementById('photo-usuario').style=`background-image:${datosUsuario.photo}`
}else{
  document.getElementById("email").value=''
  document.getElementById('primer-nombre').value=''
  document.getElementById('segundo-nombre').value=''
  document.getElementById('primer-apellido').value=''
  document.getElementById('segundo-apellido').value=''
  document.getElementById('numero-contacto').value=''
  document.getElementById('photo-usuario').style=''
}

const cart_Info = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
 let carrito = JSON.parse(localStorage.getItem("carrito")) || []; 

 fetch(cart_Info)
 .then(res => res.json())
 .then(datos => {
     articulos()
     recalcularSubtotal()
     // calcular el valor actual del costo de envio
     calcularCostoDeEnvioInicial()
})
})