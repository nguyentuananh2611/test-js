export class Users {
  constructor(url, param) {
    this.url = url;
    this.param = param;
  }
  getDataUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", this.url + this.param, false);
    xhttp.setRequestHeader(
      "Authorization",
      " Bearer " + localStorage.getItem("token")
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
  }
}
