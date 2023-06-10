export class Roles {
  constructor(url) {
    this.url = url;
  }
  readRoles() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", this.url, false);
    xhttp.setRequestHeader(
      "Authorization",
      " Bearer " + localStorage.getItem("token")
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
  }
}
