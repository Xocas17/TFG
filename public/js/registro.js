$(document).ready(function(){
  var select = document.getElementById("pais")
  M.FormSelect.init(select);
  var select = document.getElementById("provincia")
  M.FormSelect.init(select);  
  var select = document.getElementById("perfil")
  M.FormSelect.init(select);
  var currYear = (new Date()).getFullYear();
  $('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    defaultDate: new Date(currYear-18,1,31),
    // setDefaultDate: new Date(2000,01,31),
    maxDate: new Date(currYear-18,12,31),
    yearRange: [1928, currYear-18],
    i18n: {
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
      weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
  }
  })
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
  var fechaNac = document.getElementById("fechaNac").value; 
  var perfil = document.getElementById("perfil").value;
  var altura = document.getElementById("altura").value;
  var pais = document.getElementById("pais").value;
  var provincia = document.getElementById("provincia").value;
  var peso = document.getElementById("peso").value;
  var metrosCuadrados = (altura*altura)/10000;
  var imc = peso/metrosCuadrados;
  var telefono = document.getElementById("telefono").value;
  var citasMedicas = new Array();
  var medicaciones = new Array();
  var evolucionPeso = new Array();
  var evolucionKm = new Array();
  var evolucionIMC = new Array();
  var kmDiarios=0;
  if(telefono.length!=9){
    $("html").css("cursor", "default");
    alert("Debes introducir un número de teléfono válido");
    return;
  }

  if(fechaNac.length<=1){
    $("html").css("cursor", "default");
    alert("Debes introducir una fecha de nacimiento");
    return;
  }
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
            pais,
            provincia,
            peso,
            imc,
            fechaNacimiento:fechaNac,
            smsCitas:false,
            smsMedicacion:false,
            correoCitas:false,
            correoMedicacion:false,
            colesterol,
            trigliceridos,
            citasMedicas,
            medicaciones,
            evolucionKm,
            evolucionPeso,
            evolucionIMC,
            amigos,
            solicitudesAmistad
          })
          .then(function () {

            $("html").css("cursor", "default");
            alert("Usuario registrado correctamente")
            location.href="html/menuPrincipal.html"
          
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

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