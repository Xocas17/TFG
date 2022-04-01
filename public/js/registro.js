$(document).ready(function(){
  var select = document.getElementById("pais")
  M.FormSelect.init(select);
  var select = document.getElementById("provincia")
  M.FormSelect.init(select);  
  var select = document.getElementById("perfil")
  M.FormSelect.init(select);
});
function comprobarPais(){
  var pais= document.getElementById("pais").value;
  if(pais=="Spain"){
    document.getElementById("divProvincia").style.display="block";
  }
  else{
    document.getElementById("divProvincia").style.display="none";
  }
}
function handleSignUp() {

  $("html").css("cursor", "progress");


  var correo1 = document.getElementById("email").value.toLowerCase();
  var correo2 = document.getElementById("correo2").value.toLowerCase();

  if (correo2 != correo1) {
    $("html").css("cursor", "default");
    alert("Los correos no coinciden, evite usar copiar y pegar");
    return;
  }
  else{
    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(correo1)){
     
      } else {
        $("html").css("cursor", "default");
      alert("La dirección de email es incorrecta.");
      return;
      }
  }

  var contra1= document.getElementById("password").value;
  var contra2=document.getElementById("confirmPassword").value;
  if(contra1!==contra2){
    $("html").css("cursor", "default");
    alert("Las contraseñas no coinciden");
    return;
  }
  var usuario = document.getElementById("usuario").value;
  var db = firebase.firestore();
  var docRef = db.collection("usuarios").where("nombreUsuario","==",usuario);
  var existe=false;
  docRef.get().then(function (querySnapshot){
      querySnapshot.forEach(function(doc){
        existe=true;
      });
  }).then(function(){

  if(existe==true){
    $("html").css("cursor", "default");
    alert("Ya existe ese nombre de usuario");
    return;
  }
  var nombre = document.getElementById("nombre").value;
  var apellidos = document.getElementById("apellidos").value;

  var perfil = document.getElementById("perfil").value;
  var altura = document.getElementById("altura").value;
  var edad = document.getElementById("edad").value;
  var pais = document.getElementById("pais").value;
  var provincia = document.getElementById("provincia").value;
  var peso = document.getElementById("peso").value;
  var metrosCuadrados = (altura*altura)/10000;
  var imc = peso/metrosCuadrados;
  

  if(nombre.length<=1){
    $("html").css("cursor", "default");
    alert("Debes introducir un nombre válido");
    return;
  }
  if(apellidos.length<=1){
    $("html").css("cursor", "default");
    alert("Debes introducir un nombre válido");
    return;
  }

  if(peso.includes(",")){
    $("html").css("cursor", "default");
    alert("El separador decimal es '.'");
    return;
  }
  if(edad<18){
    $("html").css("cursor", "default");
    alert("Debes ser mayor de edad");
    return;
  }
  if(edad>130){
    $("html").css("cursor", "default");
    alert("Debes introducir una edad válida");
    return;
  }
  if(altura<50||altura>250){
    $("html").css("cursor", "default");
    alert("Debes introducir una altura válida");
    return;
  }
  
  firebase
    .auth()
    .createUserWithEmailAndPassword(correo1, contra1)
    .then(
      function (user) {
        //location.href='./continuarregistro.html';
        var user = firebase.auth().currentUser;
        //logUser(user);

        var uid2 = user.uid;
        var db = firebase.firestore();
    
        db.collection("usuarios")
          .doc(user.email)
          .set({
            correo: correo1,
            identificador: uid2,
            nombreUsuario: usuario,
            nombre,
            apellidos,
            perfil,
            altura,
            edad,
            pais,
            provincia,
            peso,
            imc
          })
          .then(function () {

            $("html").css("cursor", "default");
            alert("Usuario registrado correctamente")
        
          
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

        //location.href='./continuarregistro.html';
      },
      function (error) {
        // Handle Errors here.
        var errorboton2 = "1";
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");

          return
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      }
    );
  }); 
}