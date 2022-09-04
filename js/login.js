let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("Ingresar");
let info = document.getElementById("info");

function login() {
<<<<<<< HEAD
    if (email.value.length == 0 || password.value.length >= 8) {
        localStorage.setItem("user",email.value);
=======
    if (email.value.length != 0 && password.value.length >= 8) {
>>>>>>> df563c4c725f17d1f1afe6cf7f48de5c4819fc29
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
