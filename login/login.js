import { Login } from "../API/getDataLogin.js";
let inputUserName =  document.getElementById("Username");
let inputPassword = document.getElementById("pwd");
let buttonLogin =  document.getElementById("buttonLogin");
buttonLogin.addEventListener("click", ()=>{
    const readDataLogin = new Login(inputUserName, inputPassword);
    let dataLogin = readDataLogin.getToken();
    localStorage.setItem("token", dataLogin.access_token);
    window.location.replace("../users/users.html");
})