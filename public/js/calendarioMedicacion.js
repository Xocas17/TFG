var lugarGlobal="";
var permisoCalendario;
var cal;
var fecha=new Date();
var aPoner=[];
var eventosTodos=[];
var usuario;
var citaSeleccionada;

firebase.auth().onAuthStateChanged(function(user) {
var db = firebase.firestore();
 usuario = user.email;
 db.collection("usuarios").doc(usuario).get().then(function (doc){
  if(doc &&doc.exists){
    var myData = doc.data();
    var citasMedicas = myData.citasMedicas;
    citasMedicas.forEach(function(cita){
      var object = new Object();
      var contenido = cita.split("##")
      var especialidad = contenido[0]
      var fecha = contenido[1]
      var hora = contenido[2]
      var periodica = contenido[3]
      var fechaOriginal= fecha.split("/")
      var fechaParseada = fechaOriginal[2]+"-"+fechaOriginal[1]+"-"+fechaOriginal[0]
      object.id= especialidad + " " + fecha
      object.title=especialidad +" " + fecha
      object.start=fechaParseada;
      object.end= fechaParseada;
      object.backgroundColor="blue";
      object.description="Tienes una consulta de " + especialidad + " el día " + fecha + " a las " + hora;
      object.borrarBD=cita;
      eventosTodos.push(object);


    
    })
        var calendarEl = document.getElementById('calendar');
        cal = new FullCalendar.Calendar(calendarEl, {
        eventClick: function(info) {
          console.log("Object",info.event)
          fecha=info.event.start
          citaSeleccionada=info.event.extendedProps.borrarBD;
          document.getElementById("tituloCita").innerText=info.event.title;
          document.getElementById("descriCita").innerText=info.event.extendedProps.description;            
          modalOpen("#modal")
    },
    events: eventosTodos,
    locale: 'es'
    })
    cal.render();
  }
})
})
function modalClose(m){
$(m).modal('close'); 
}
function modalOpen(m){
$(m).modal('open');
}	

function añadirCita(){
  var r = confirm("Estás seguro de añadir la cita?");
  if (r == true) {
    var especialidad = document.getElementById("especialidad").value;
    var fecha = document.getElementById("fechaPicker").value;
    var hora = document.getElementById("timePicker").value;
    var periodicidad = document.getElementById("periodicidad").value;
    var cita=especialidad+"##"+fecha+"##"+hora+"##"+periodicidad;
    var db = firebase.firestore();
    db.collection("usuarios").doc(usuario).update({
      citasMedicas: firebase.firestore.FieldValue.arrayUnion(cita)
    }).then(function(){
      $('#modal').modal('close');
      alert("Cita añadida correctamente");
      location.reload();
    })
  } 
}
$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
  $('.modal').modal();
  var selects = document.querySelectorAll('.select');
  M.FormSelect.init(selects)
  var minDate = new Date()
  $('.timepicker').timepicker({
    twelveHour: false
  })
  $('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    minDate: minDate
  })
});

function modificarCita(){
var citaModificar  = citaSeleccionada;
var especialidad= document.getElementById("especialidadMod").value
var fecha = document.getElementById("fechaPickerMod").value
var hora = document.getElementById("timePickerMod").value
var periodicidad = document.getElementById("periodicidadMod").value
var citaModificada = especialidad + "##" + fecha + "##" + hora + "##" + periodicidad;
var r = confirm("Estas seguro de que quieres modificar la cita?");

if(r==true){
var db = firebase.firestore();
db.collection("usuarios").doc(usuario).update({
  citasMedicas: firebase.firestore.FieldValue.arrayRemove(citaModificar)
}).then(function(){
  db.collection("usuarios").doc(usuario).update({
    citasMedicas:firebase.firestore.FieldValue.arrayUnion(citaModificada)
  }).then(function(){
    alert("Descripción modificada correctamente.")
    location.reload();
  })

})
}
else{
  $('#modal2').modal('close');
}
}

function abrirCita(){
modalClose('#modal')
var citaModificar  = citaSeleccionada;
var citaPartes = citaModificar.split("##");
var select = document.getElementById("especialidadMod");
select.value=citaPartes[0];
M.FormSelect.init(select);  
var minDate = new Date()

var fecha = document.getElementById('fechaPickerMod');
M.Datepicker.init(fecha,{
  format: 'dd/mm/yyyy',
  minDate: minDate
})
$(fecha).val(citaPartes[1])

var hora = document.getElementById('timePickerMod')
M.Timepicker.init(hora, {
  defaultTime: citaPartes[2],
  twelveHour: false

});
$(hora).val(citaPartes[2])
$(hora).attr('selected','selected')
document.getElementById("periodicidadMod").value=citaPartes[3];
modalOpen('#modal3')
}
function eliminarCita(){
var r = confirm("Estás seguro de borrar la cita?");
  if (r == true) {
    var db = firebase.firestore();
    db.collection("usuarios").doc(usuario).update({
      citasMedicas: firebase.firestore.FieldValue.arrayRemove(citaSeleccionada)
    }).then(function(){
      $('#modal2').modal('close');
      alert("Cita borrada correctamente");
      location.reload();
    })
  } 

}

