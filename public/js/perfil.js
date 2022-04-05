function ValidateSize(file) {
    var FileSize = file.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 5) {
        alert('Debes subir una foto menor de 2mb');
    } else {
    
    subirFoto();
        
    }
}
function subirFoto(){
    $("html").css("cursor", "progress");
    var file = $('#inputFoto').prop('files')[0]; 
	var image = new FormData();                  
	image.append('file', file);
    var storageRef = firebase.storage().ref();
    var mountainsRef = storageRef.child('fotosUsuario/'+email+'.jpeg');
    mountainsRef.put(file).then(function(snapshot) {
        $("html").css("cursor", "default");
        alert("Foto actualizada con éxito");
        location.reload();
    
    });
    
}
function borrarFoto(){
    var r = confirm("Estas seguro de que quieres eliminar la foto?");
    if(r==true){
        var storageRef = firebase.storage().ref();
        storageRef.child("fotosUsuario/"+email+".jpeg").delete().then(function(){
            alert("Foto eliminada correctamente");
            location.reload();
        })
    }

}
function onResolve(foundURL) { 
    document.getElementById("fotoPerfil").src=foundURL;
    document.getElementById("borrarFoto").style.display="inline-flex";
    document.getElementById("editarFoto").style.display="inline-flex";
    } 
 function onReject(error){ 
    document.getElementById("borrarFoto").style.display="none";
    document.getElementById("editarFoto").style.display="none"; 
    document.getElementById("fotoPerfil").setAttribute("onclick","document.getElementById('inputFoto').click()");
    }
var email;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
       email = user.email;
        var docRef = db.collection("usuarios").doc(email);
        docRef.get().then(function (doc) {
            if (doc && doc.exists) {

                var myData = doc.data();
                var nombreCompleto = myData.nombre +" " + myData.apellidos;
                var edad = myData.fechaNacimiento;
                
                var pais = myData.pais;
                var usuario= myData.nombreUsuario;
                var telefono = myData.telefono;
                var peso = myData.peso;
                var altura= myData.altura;
                var IMC = myData.imc;
                var colesterol = myData.colesterol;
                var trigliceridos = myData.trigliceridos;
                var date= new Date();
                var añoActual = date.getFullYear();
                var mes = date.getMonth()+1;
                var dia = date.getDate();
                var privacidad=myData.perfil;
                var tCitas = myData.smsCitas;
                var tMedic = myData.smsMedicacion;
                var cCitas = myData.correoCitas;
                var cMedic = myData.correoMedicacion;

                if(privacidad=="publico"){
                    privacidad=true;
                }
                else{
                    privacidad=false;
                }

                if((edad.split("/")[1]-mes)<=0 && (edad.split("/")[0]-dia)<=0){
                    edad=añoActual-edad.split("/")[2]
                }
                else{
                    edad=añoActual-edad.split("/")[2] -1;
                }
              
                var storageRef = firebase.storage().ref();
                var imgUrl2 = "fotosUsuario/" + email + ".jpeg";
                storageRef.child(imgUrl2).getDownloadURL().then(onResolve, onReject);

                document.getElementById("nombreSpan").innerText=nombreCompleto;
                document.getElementById("edadSpan").innerText="  "+edad;
                document.getElementById("correoSpan").innerText=email;
                document.getElementById("usuarioSpan").innerText="  "+usuario;
                document.getElementById("paisSpan").innerText=pais;

                document.getElementById("telefonoInput").value=telefono;

                document.getElementById("pesoInput").value=peso;
                document.getElementById("imcInput").value=IMC;
                document.getElementById("alturaInput").value=altura;
                document.getElementById("colesterolInput").value=colesterol;
                document.getElementById("trigliceridosInput").value=trigliceridos;

                document.getElementById("privacidad").checked = privacidad;
                document.getElementById("tCitas").checked = tCitas;
                document.getElementById("tMedic").checked = tMedic;
                document.getElementById("cCitas").checked = cCitas;
                document.getElementById("cMedic").checked = cMedic;


            }
        }).catch(function (error) {
            console.log("Got an error: ", error);
        });


    } else {
        // No user is signed in.
    }
});