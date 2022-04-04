
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var email = user.email;
        var docRef = db.collection("usuarios").doc(email);
        docRef.get().then(function (doc) {
            if (doc && doc.exists) {

                var myData = doc.data();
                var nombreCompleto = myData.nombre +" " + myData.apellidos;
                var edad = myData.edad;
                var pais = myData.pais;
                var usuario= myData.nombreUsuario;
                var telefono = myData.telefono;
                var codigo = telefono.split(" ")[0];
                telefono = telefono.split(" ")[1];
                var peso = myData.peso;
                var altura= myData.altura;
                var IMC = myData.imc;
                var colesterol = myData.colesterol;
                var trigliceridos = myData.trigliceridos;

                document.getElementById("nombreSpan").innerText=nombreCompleto;
                document.getElementById("edadSpan").innerText="  "+edad;
                document.getElementById("correoSpan").innerText=email;
                document.getElementById("usuarioSpan").innerText="  "+usuario;
                document.getElementById("paisSpan").innerText=pais;

                document.getElementById("codigoInput").value=codigo;
                document.getElementById("telefonoInput").value=telefono;

                document.getElementById("pesoInput").value=peso;
                document.getElementById("imcInput").value=IMC;
                document.getElementById("alturaInput").value=altura;
                document.getElementById("colesterolInput").value=colesterol;
                document.getElementById("trigliceridosInput").value=trigliceridos;
            }
        }).catch(function (error) {
            console.log("Got an error: ", error);
        });


    } else {
        // No user is signed in.
    }
});