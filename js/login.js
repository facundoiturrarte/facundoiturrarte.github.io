let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("Ingresar");
let info = document.getElementById("info");

function login() {
    if (email.value.length == 0 || password.value.length >= 8) {
        localStorage.setItem("user",email.value);
        window.location.href = "index.html";
    } else {
        info.innerHTML = "La contraseña debe contener más de 8 caracteres"
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    let usuario = localStorage.getItem("user");
    document.getElementById("user").innerHTML= usuario;
})  
       
   
function loginGoogle() {
    window.location.href = "index.html";
}