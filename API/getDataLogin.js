export class Login {
  constructor(inputuser, inputpwd) {
    this.inputuser = inputuser;
    this.inputpwd = inputpwd;
  }
  getToken() {
      const xhttp = new XMLHttpRequest();
      xhttp.open(
        "POST",
        "https://httpdl.howizbiz.com/api/web-authenticate",
        false
      );
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send(
        "username=" + this.inputuser.value + "&password=" + this.inputpwd.value
      );
      return JSON.parse(xhttp.responseText);
  }
}
