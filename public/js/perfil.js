document.getElementById("fotoPerfil").src=""
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var email = user.email;
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
              
                
                var imgUrl = "https://firebasestorage.googleapis.com/v0/b/tfginfo-be99f.appspot.com/o/fotosUsuario%2F" + encodeURIComponent(email) + ".jpeg?alt=media";
                document.getElementById("fotoPerfil").src=imgUrl;
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