let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("Ingresar");
let info = document.getElementById("info");

function login() {
    if (email.value.length == 0 || password.value.length >= 8) {
        console.log('hiiiiw')
        window.location.href = "index.html";
    } else {
        info.innerHTML = "La contrasena debe contener mas de 8 caracteres"
    }
}

function loginGoogle() {
    window.location.href = "index.html";
}