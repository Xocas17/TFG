var lugarGlobal="";
var permisoCalendario;
var cal;
var fecha=new Date();
var aPoner=[];
var eventosTodos=[];
var usuario;
var medicacionSeleccionada;

firebase.auth().onAuthStateChanged(function(user) {
var db = firebase.firestore();
 usuario = user.email;
 db.collection("usuarios").doc(usuario).get().then(function (doc){
  if(doc &&doc.exists){
    var myData = doc.data();
    var medicaciones = myData.medicaciones;
    medicaciones.forEach(function(medicacion){
      var object = new Object();
      var contenido = medicacion.split("##")
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
      object.borrarBD=medicacion;
      eventosTodos.push(object);


    
    })
        var calendarEl = document.getElementById('calendar');
        cal = new FullCalendar.Calendar(calendarEl, {
        eventClick: function(info) {
          console.log("Object",info.event)
          fecha=info.event.start
          medicacionSeleccionada=info.event.extendedProps.borrarBD;
          document.getElementById("tituloMedicacion").innerText=info.event.title;
          document.getElementById("descriMedicacion").innerText=info.event.extendedProps.description;            
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

function añadirMedicacion(){
  var r = confirm("Estás seguro de añadir la medicación?");
  if (r == true) {
    var especialidad = document.getElementById("especialidad").value;
    var fecha = document.getElementById("fechaPicker").value;
    var hora = document.getElementById("timePicker").value;
    var periodicidad = document.getElementById("periodicidad").value;
    var medicacion=especialidad+"##"+fecha+"##"+hora+"##"+periodicidad;
    var db = firebase.firestore();
    db.collection("usuarios").doc(usuario).update({
      medicaciones: firebase.firestore.FieldValue.arrayUnion(medicacion)
    }).then(function(){
      $('#modal').modal('close');
      alert("Medicación añadida correctamente");
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
    minDate: minDate,
    i18n: {
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
      weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
  }
  })
});

function modificarMedicacion(){
var medicacionModificar  = medicacionSeleccionada;
var especialidad= document.getElementById("especialidadMod").value
var fecha = document.getElementById("fechaPickerMod").value
var hora = document.getElementById("timePickerMod").value
var periodicidad = document.getElementById("periodicidadMod").value
var medicacionModificada = especialidad + "##" + fecha + "##" + hora + "##" + periodicidad;
var r = confirm("Estas seguro de que quieres modificar la medicación?");

if(r==true){
var db = firebase.firestore();
db.collection("usuarios").doc(usuario).update({
  medicaciones: firebase.firestore.FieldValue.arrayRemove(medicacionModificar)
}).then(function(){
  db.collection("usuarios").doc(usuario).update({
    medicaciones:firebase.firestore.FieldValue.arrayUnion(medicacionModificada)
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

function abrirMedicacion(){
modalClose('#modal')
var medicacionModificar  = medicacionSeleccionada;
var medicacionPartes = medicacionModificar.split("##");
var select = document.getElementById("especialidadMod");
select.value=medicacionPartes[0];
M.FormSelect.init(select);  
var minDate = new Date()

var fecha = document.getElementById('fechaPickerMod');
M.Datepicker.init(fecha,{
  format: 'dd/mm/yyyy',
  minDate: minDate,
  i18n: {
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
    weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
}
})
$(fecha).val(medicacionPartes[1])

var hora = document.getElementById('timePickerMod')
M.Timepicker.init(hora, {
  defaultTime: medicacionPartes[2],
  twelveHour: false

});
$(hora).val(medicacionPartes[2])
$(hora).attr('selected','selected')
document.getElementById("periodicidadMod").value=medicacionPartes[3];
modalOpen('#modal3')
}
function eliminarMedicación(){
var r = confirm("Estás seguro de borrar la medicación?");
  if (r == true) {
    var db = firebase.firestore();
    db.collection("usuarios").doc(usuario).update({
      medicaciones: firebase.firestore.FieldValue.arrayRemove(medicacionSeleccionada)
    }).then(function(){
      $('#modal2').modal('close');
      alert("Medicación borrada correctamente");
      location.reload();
    })
  } 

}

