import { login, loginGmail } from "./app.js";

//----- Login code start	  
document.getElementById("login").addEventListener("click", function() {
    var email =  document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;

    login(email, password);
});


document.getElementById("loginGmail").addEventListener("click",(e) => {
    loginGmail();
});
//----- End