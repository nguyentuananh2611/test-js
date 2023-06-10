import { Users } from "../API/getDataUser.js";
import { Tableuser } from "../API/renderTable.js";
import { Paginate } from "../API/pagination.js";
import { Roles } from "../API/roles.js";
const endpoint = "https://httpdl.howizbiz.com/api/";
const router = "users";
let url = endpoint + router;
let currentPage = 1;
let itemsPerPage = 5;
let search = "";
let tableUser = document.getElementById("tableUser");
let arruser = [
  "Ten Hien Thi",
  "Ten Dang Nhap",
  "So Dien thoai",
  "Quyen",
  "Ngay Tao",
  "Hanh Dong",
];
let ulPaginate = document.getElementById("paginate");
let body = document.getElementById("bodyUser");
let div1 = document.getElementById("div1");
let text1 = "+ them moi";
let text2 = "update";
let buttonAddnew = document.getElementById("addNew");

fn_loadData();
function fn_loadData() {
  let param = `?paginate=true&page=${currentPage}&perpage=${itemsPerPage}&with=roles&search=${search}`;
  const readDataUser = new Users(url, param);
  let dataUser = readDataUser.getDataUser();
  console.log(dataUser);
  const readRoles = new Roles("https://httpdl.howizbiz.com/api/roles");
  let dataRoles = readRoles.readRoles();
  console.log(dataRoles);
  const readTable = new Tableuser(
    tableUser,
    arruser,
    dataUser,
    div1,
    text1,
    text2,
    buttonAddnew,
    dataRoles,
    "https://httpdl.howizbiz.com/api/users",
    readDataUser
  );
  let renderTable = readTable.renderTable();
  let renderModalButton = readTable.rendermodalwithbutton();
}
let buttonLogout = document.getElementById("buttonLogout");
console.log(buttonLogout);
  buttonLogout.addEventListener("click", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
      let x = JSON.parse(xhttp.responseText);
      localStorage.setItem("token", x.access_token);
      window.location.replace("../login/login.html");
    };
    xhttp.open("POST", endpoint + "web-logout");
    xhttp.setRequestHeader(
      "Authorization",
      " Bearer " + localStorage.getItem("token")
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  });
