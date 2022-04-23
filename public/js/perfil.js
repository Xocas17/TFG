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
    var mountainsRef = storageRef.child('fotosUsuario/'+usuario+'.jpeg');
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
        storageRef.child("fotosUsuario/"+usuario+".jpeg").delete().then(function(){
            alert("Foto eliminada correctamente");
            location.reload();
        })
    }

}
function actualizarDatos(){
    $("html").css("cursor", "progress");
    var telefono = document.getElementById("telefonoInput").value;
    var altura = document.getElementById("alturaInput").value;
    var colesterol = document.getElementById("colesterolInput").value;
    var trigliceridos = document.getElementById("trigliceridosInput").value;
    var km = document.getElementById("kmInput").value;
    var peso = document.getElementById("pesoInputDiario").value;
    if(peso.length==0){
        peso=document.getElementById("pesoOutput").value;
    }
    
    var perfil = document.getElementById("privacidad").checked;
    var correoCitas = document.getElementById("cCitas").checked;
    var telefonoCitas = document.getElementById("tCitas").checked;
    var correoMedicacion =document.getElementById("cMedic").checked;
    var telefonoMedicacion =document.getElementById("tMedic").checked;
    var date = new Date();
    var dia = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var fecha = dia +"/" + month+"/"+year;
    var metrosCuadrados = (altura*altura)/10000;
    var imc = peso/metrosCuadrados;


    if(km.length==0){
        km=0;
    }
    if(km<0){
        $("html").css("cursor", "default");
        alert("Debes introducir un número de kms válido");
        return;
    }
    if(telefono.length!=9){
        $("html").css("cursor", "default");
        alert("Debes introducir un número de teléfono válido");
        return;
    }
    if(peso.includes(",")){
        $("html").css("cursor", "default");
        alert("El separador decimal es '.'");
        return;
      }

    if(altura<50||altura>250){
        $("html").css("cursor", "default");
        alert("Debes introducir una altura válida(en cm)");
        return;
      }
      console.log("Colesterol",colesterol.length!=0)
    if(colesterol.length!=0 && (colesterol>1000 || colesterol <=0)){
        $("html").css("cursor", "default");
        alert("Debes introducir un colesterol menor que 1000");
        return;
    }
    if(trigliceridos!=="" && (trigliceridos>1000 || trigliceridos <=0)){
        $("html").css("cursor", "default");
        alert("Debes introducir unos triglicéridos menores que 1000");
        return;
    }
    if(perfil ==true){
        perfil="público"
    }
    else{
        perfil="privado"
    }

    db.collection("usuarios")
        .doc(email)
        .update({
            perfil: perfil,
            altura:altura,
            peso:peso,
            imc:imc,
            smsCitas: telefonoCitas,
            smsMedicacion: telefonoMedicacion,
            correoCitas: correoCitas,
            correoMedicacion: correoMedicacion,
            colesterol: colesterol,
            trigliceridos:trigliceridos,
            evolucionKm:{
                [fecha]:km
            },
            evolucionPeso:{
                [fecha]:peso
            },
            evolucionIMC:{
                [fecha]:imc
            }
        })
        .then(function () {

            $("html").css("cursor", "default");
            alert("Usuario actualizado correctamente")
            location.reload();

        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
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
var usuario;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
       email = user.email;
        var docRef = db.collection("usuarios").doc(email);
        docRef.get().then(function (doc) {
            if (doc && doc.exists) {

                var myData = doc.data();
                var nombreCompleto = myData.nombre +" " + myData.apellidos;
                var edad = myData.fechaNacimiento;
                
                var nacionalidad = myData.nacionalidad;
                 usuario= myData.nombreUsuario;
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

                if(privacidad=="público"){
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
                var imgUrl2 = "fotosUsuario/" + usuario + ".jpeg";
                storageRef.child(imgUrl2).getDownloadURL().then(onResolve, onReject);

                document.getElementById("nombreSpan").innerText=nombreCompleto;
                document.getElementById("edadSpan").innerText="  "+edad;
                document.getElementById("correoSpan").innerText=email;
                document.getElementById("usuarioSpan").innerText="  "+usuario;
                document.getElementById("nacionalidadSpan").innerText=nacionalidad;

                document.getElementById("telefonoInput").value=telefono;

                document.getElementById("pesoOutput").value=peso;
                document.getElementById("imcOutput").value=IMC;
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