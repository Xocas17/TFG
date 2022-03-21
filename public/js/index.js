function cambiarcontraseña() {
  $("html").css("cursor", "progress");
var correo = document.getElementById("email").value.toLowerCase();
if (correo.length <=1) {
  $("html").css("cursor", "default");
  alert("Antes debes escribir tu dirección de correo en el campo de login de usuario para que podamos enviarte el email de recuperación");
  return;
} else {
  firebase.auth().sendPasswordResetEmail(correo);
  $("html").css("cursor", "default");
  alert("Has recibido un correo con las instrucciones para cambiar tu contraseña");

}

}
function toggleSignIn() {

$("html").css("cursor", "progress");
console.log("Entra1");
if (firebase.auth().currentUser) {
var current_user = firebase.auth().currentUser;
var email = document.getElementById("email").value;
email = email.toLowerCase();
var tipocuenta;
console.log("Entra2");
if (email.localeCompare(current_user.email) == 0) {
  console.log("Entrauno")
  $("html").css("cursor", "default");
  location.href="./html/menuPrincipal.html"

} else {
  console.log("Entrados")
alert(
"Había una sesión iniciada de otro usuario, cerrando sesión, vuelva a loguearse"
);

firebase.auth().signOut();
}
$("html").css("cursor", "default");
} else {
var email = document.getElementById("email").value;
email = email.toLowerCase();
var password = document.getElementById("password").value;
if (email.length < 4) {
$("html").css("cursor", "default");
alert("Introduce un correo válido.");
return;
}
if (password.length < 4) {
$("html").css("cursor", "default");
alert("La contraseña es demasiado corta.");
return;
}
// Sign in with email and pass.
// [START authwithemail]

firebase
.auth()
.signInWithEmailAndPassword(email, password)
.then(function (user) {
// user signed in

var db = firebase.firestore();
var docRef = db.collection("usuarios").doc(email);
docRef.get().then(function (doc) {
  if (doc && doc.exists) {
    $("html").css("cursor", "default");
    location.href="./html/menuPrincipal.html"
    //}
  }
});
})
.catch(function (error) {
var errorCode = error.code;
var errorMessage = error.message;

if (errorCode === "auth/wrong-password") {
  alert("Contraseña errónea.");
} else {
  alert(errorMessage);
}
console.log(error);
document.getElementById("quickstart-sign-in").disabled = false;
$("html").css("cursor", "default");
});

// [END authwithemail]
}

}