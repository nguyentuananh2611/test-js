export class Tableuser {
  constructor(
    table,
    arr,
    data,
    div,
    text1,
    text2,
    button1,
    datarole,
    url,
    readData
  ) {
    this.table = table;
    this.arr = arr;
    this.data = data;
    this.div = div;
    this.text1 = text1;
    this.text2 = text2;
    this.button1 = button1;
    this.text = "";
    this.datarole = datarole;
    this.url = url;
    this.readData = readData;
  }
  renderTable(database) {
    database = this.data;
    let dataList = database.list;
    let tr = document.createElement("tr");
    for (let i = 0; i < this.arr.length; i++) {
      tr.innerHTML += `<th>${this.arr[i]}</th>`;
    }
    this.table.appendChild(tr);
    dataList.forEach((data) => {
      let dataTimepath = data.created_at.split("T")[0];
      let dateCr = dataTimepath.split("-");
      let time = dateCr[2] + "-" + dateCr[1] + "-" + dateCr[0];
      let tr = document.createElement("tr");
      tr.id = data.id;
      let arr = [];
      let dataRoles = data.roles;
      let button = `<button style="border:none;" type="button"
            class="btn btn-outline-secondary buttonUpdate"
            id="${tr.id}"
            data-bs-toggle="modal"
            data-bs-target="#ModalUpdate"><i class="fa-solid fa-pencil"></i></button><button style="border:none;" type="button"
            id="${tr.id}"
            class="btn btn-outline-secondary buttonDelete"
            data-bs-toggle="modal"
            data-bs-target="#ModalDelete"><i class="fa-regular fa-trash-can"></i></button>`;
      let dataRoleName = [];
      for (let i = 0; i < dataRoles.length; i++) {
        dataRoleName.push(`<span>${dataRoles[i].name}</span>`);
      }
      arr.push(
        data.name,
        data.username,
        data.mobile,
        dataRoleName.join(""),
        time,
        button
      );
      for (let i = 0; i < arr.length; i++) {
        tr.innerHTML += `<td>${arr[i]}</td>`;
        this.table.appendChild(tr);
      }
    });
  }
  rendermodal() {
    this.div.innerHTML = `<h3>${this.text}</h3>
    <div><label style="display:block">Ten Hien Thi</label><input id="inputName" style="display: bloc type="text"></div>
    <div><label style="display:block">Ten Dang Nhap</label><input id="inputUserName" style="display: block" type="text"></div>
    <div><label style="display:block">Email</label><input id="inpuEmail" style="display: block" type="text"></div>
    <div><label style="display:block">Mat Khau</label><input id="inputPassword" style="display: block" type="text"></div>
    <div><label style="display:block">Xac Nhan Mat Khau</label><input id="inputPasswordConfimation" style="display: block" type="text"></div>
    <div><input id ="inputQuyen" style="display:block;" placeholder="quyen"><select style="display:none" name="Quyền" id="select" multiple>
     </select></div>
     <div><button id ="${this.text}">${this.text}</button><button id="huy">Huy</button></div>`;
    let select = document.getElementById("select");
    let inputQuyen = document.getElementById("inputQuyen");
    inputQuyen.addEventListener("click", () => {
      select.style.display = "block";
    });
    this.datarole.forEach((data) => {
      let option = document.createElement("option");
      option.value = data.id;
      option.innerText = data.name;
      select.appendChild(option);
    });
    let buttonHuy = document.getElementById("huy");
    buttonHuy.addEventListener("click", ()=>{
        this.div.style.display = "none";
    })
  }
  rendermodalwithbutton() {
    let roles_id = [];
    let buttonUpdatecolection = document.getElementsByClassName("buttonUpdate");
    let buttonUpdate = Array.from(buttonUpdatecolection);
    for (let i = 0; i < buttonUpdate.length; i++) {
      buttonUpdate[i].addEventListener("click", () => {
        this.text = this.text2; //
        this.div.value = buttonUpdate[i].id;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
          let x = JSON.parse(xhttp.responseText);
          inputName.setAttribute("placeholder", x.name);
          inputUserName.value = x.username;
          inpuEmail.setAttribute("placeholder", x.email);
        };
        xhttp.open("GET", this.url + "/" + buttonUpdate[i].id);
        xhttp.setRequestHeader(
          "Authorization",
          " Bearer " + localStorage.getItem("token")
        );
        xhttp.send();
        //
        this.rendermodal();
        let inputName = document.getElementById("inputName");
        let inputUserName = document.getElementById("inputUserName");
        let inpuEmail = document.getElementById("inpuEmail");
        let inputPassword = document.getElementById("inputPassword");
        let inputPasswordConfimation = document.getElementById(
          "inputPasswordConfimation"
        );
        inputPassword.parentNode.style.display = "none";
        inputPasswordConfimation.parentNode.style.display = "none";

        //
        let clickUpdate = document.getElementById(this.text2);
        clickUpdate.addEventListener("click", () => {
          const xhttp = new XMLHttpRequest();
          xhttp.onload = () => {
            this.div.style.display = "none";
            this.table.innerHTML = "";
            this.data = this.readData.getDataUser();
            console.log(this.data);
            this.renderTable(this.data);
          };
          let testvar = {
            name: inputName.value,
            username: inputUserName.value,
            email: inpuEmail.value,
            id: this.div.value,
            roles: roles_id,
          };
          xhttp.open("PUT", this.url + "/" + this.div.value);
          xhttp.setRequestHeader(
            "Authorization",
            " Bearer " + localStorage.getItem("token")
          );
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(JSON.stringify(testvar));
        });
      });
    }
    //
    this.button1.addEventListener("click", () => {
      this.text = this.text1;
      this.rendermodal();
      let inputName = document.getElementById("inputName");
      let inputUserName = document.getElementById("inputUserName");
      let inpuEmail = document.getElementById("inpuEmail");
      let inputPassword = document.getElementById("inputPassword");
      let inputPasswordConfimation = document.getElementById(
        "inputPasswordConfimation"
      );
      let select = document.getElementById("select");
      let inputQuyen = document.getElementById("inputQuyen");
      let optioncolection = select.getElementsByTagName("option");
      let option = Array.from(optioncolection);
      for (let i = 0; i < option.length; i++) {
        option[i].addEventListener("click", () => {
          inputQuyen.value += option[i].innerText;
          select.value = option[i].value;
          roles_id.push(select.value);
        });
      }
      //
      let clickAdd = document.getElementById(this.text1);
      clickAdd.addEventListener("click", () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
          this.div.style.display = "none";
          this.table.innerHTML = "";
          this.data = this.readData.getDataUser();
          console.log(this.data);
          this.renderTable(this.data);
        };
        let testvar = {
          name: inputName.value,
          username: inputUserName.value,
          email: inpuEmail.value,
          password: inputPassword.value,
          password_confirmation: inputPasswordConfimation.value,
          role_ids: roles_id,
        };
        xhttp.open("POST", this.url);
        xhttp.setRequestHeader(
          "Authorization",
          " Bearer " + localStorage.getItem("token")
        );
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(testvar));
      });
    });
    //
    let buttonDeletecollection =
      document.getElementsByClassName("buttonDelete");
    let buttonDelete = Array.from(buttonDeletecollection);
    for (let i = 0; i < buttonDelete.length; i++) {
      buttonDelete[i].addEventListener("click", () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
          this.table.innerHTML = "";
          this.data = this.readData.getDataUser();
          this.renderTable(this.data);
        };
        xhttp.open("DELETE", this.url + "/" + buttonDelete[i].id);
        xhttp.setRequestHeader(
          "Authorization",
          " Bearer " + localStorage.getItem("token")
        );
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
      });
    }
  }
}
