const loginUser = document.getElementById("login-user")
if (localStorage.getItem("user")) {
  loginUser.innerHTML = ` <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Usuario: <span id="user"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
    <li><a class="dropdown-item" id="my-profile" href="my-profile.html">Mi Perfil</a></li>
    <li><a class="dropdown-item" href="login.html">Cerrar Sesión</a></li>
  </ul>`
} else {
  loginUser.innerHTML = `
  <a class="btn btn-secondary"  id="dropdownMenuButton1" href="login.html">Iniciar Sesión</a>`
}