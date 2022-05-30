$(document).ready(function(){
  var select = document.getElementById("nacionalidad")
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

  if(contra1.length<=4){
    $("html").css("cursor", "default");
    alert("La contraseña introducida es demasiado corta");
    return;
  }
  if(contra1!==contra2){
    $("html").css("cursor", "default");
    alert("Las contraseñas no coinciden");
    return;
  }

  var usuario = document.getElementById("usuario").value;
  if(usuario.length==0){
    $("html").css("cursor", "default");
    alert("Debes introducir un nombre de usuario");
    return;
  }
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
  var nacionalidad = document.getElementById("nacionalidad").value;
  var provincia = document.getElementById("provincia").value;
  var peso = document.getElementById("peso").value;
  var metrosCuadrados = (altura*altura)/10000;
  var imc = peso/metrosCuadrados;
  var telefono = document.getElementById("telefono").value;
  var citasMedicas = new Array();
  var medicaciones = new Array();
  var evolucionPeso = {}
  var evolucionKm = {}
  var evolucionIMC = {}
  var amigos = new Array();
  var solicitudesAmistad = new Array();
  var colesterol="";
  var trigliceridos="";

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
  if(peso.length==0){
    $("html").css("cursor", "default");
    alert("Debes introducir tu peso");
    return;
  }

  if(peso.includes(",")){
    $("html").css("cursor", "default");
    alert("El separador decimal es '.'");
    return;
  }

  if(peso<=0 || peso >500){
    $("html").css("cursor", "default");
    alert("Debes introducir un peso válido");
    return;
  }

  if(altura.length==0){
    $("html").css("cursor", "default");
    alert("Debes introducir tu altura");
    return;
  }
  if(altura<50||altura>250){
    $("html").css("cursor", "default");
    alert("Debes introducir una altura válida");
    return;
  }

  if(nacionalidad==""){
    $("html").css("cursor", "default");
    alert("Debes seleccionar una nacionalidad");
    return;
  }
  
  if(provincia==""){
    $("html").css("cursor", "default");
    alert("Debes seleccionar una provincia");
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
            nacionalidad,
            provincia,
            peso,
            imc,
            fechaNacimiento:fechaNac,
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
            solicitudesAmistad,
            telefono
          })
          .then(function () {

            $("html").css("cursor", "default");
            alert("Usuario registrado correctamente")
            location.href="menuPrincipal.html"
          
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