let perfil = document.forms['perfil-validation'];
let primerNombre = document.getElementById('primer-nombre')
let segundoNombre = document.getElementById('segundo-nombre')
let primerApellido = document.getElementById('primer-apellido')
let segundoApellido = document.getElementById('segundo-apellido')
let email = document.getElementById('email')
let numContacto = document.getElementById('numero-contacto')
let arrayUsuario =[];

 perfil.addEventListener("submit", function (e) {
  e.preventDefault();
  errores(document.getElementById('primer-nombre'), 'error-primer-nombre', 'Debes agregar tu nombre', e);
  errores(document.getElementById('primer-apellido'), 'error-primer-apellido', 'Debes agregar tu apellido', e)
  perfil.classList.add('was-validated');
arrayUsuario ={
  pNombre: primerNombre.value,
  sNombre: segundoNombre.value,
  pApellido: primerApellido.value,
  sApellido: segundoApellido.value,
  correo: email.value,
  contacto: numContacto.value,
  photo: profileImage.style.backgroundImage = `url(${fr.result})`
}
localStorage.setItem("GuardarDatos",  JSON.stringify(arrayUsuario));
})

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




  
  'use strict';

const fr = new FileReader();
const fileField = document.querySelector('.js__profile-upload-btn');
const profileImage = document.getElementById('photo-usuario');
const profilePreview = document.querySelector('.js__profile-preview');


/**
 * Recoge el archivo añadido al campo de tipo "file"
 * y lo carga en nuestro objeto FileReader para que 
 * lo convierta a algo con lo que podamos trabajar.
 * Añade un listener al FR para que ejecute una función
 * al tener los datos listos
 * @param {evento} e 
 */
function getImage(e){
  const myFile = e.currentTarget.files[0];
  fr.addEventListener('load', writeImage);
  fr.readAsDataURL(myFile);
}


/**
 * Una vez tenemos los datos listos en el FR podemos
 * trabajar con ellos ;)
 */
function writeImage() {
  /* En la propiedad `result` de nuestro FR se almacena
   * el resultado. Ese resultado de procesar el fichero que hemos cargado
   * podemos pasarlo como background a la imagen de perfil y a la vista previa
   * de nuestro componente.
   */
  profileImage.style.backgroundImage = `url(${fr.result})`;
  profilePreview.style.backgroundImage = `url(${fr.result})`;
}


/**
 * Añadimos los listeners necesarios:
 * - al botón visible para generar el click automático
 * - al campo oculto para cuando cambie su value
 */
fileField.addEventListener('change', getImage);