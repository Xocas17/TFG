var email;
var usuario;

function añadirAmigo(){
$("html").css("cursor", "progress");
var amigoAñadir = document.getElementById("usuarioAñadir").value;
var db = firebase.firestore();
var docRef = db.collection("usuarios").where("nombreUsuario","==",amigoAñadir);
var emailAmigoAñadir;
docRef.get().then(function (querySnapshot){
    querySnapshot.forEach(function (doc) {
        emailAmigoAñadir=doc.id;
    })
}).then(function(){
    try{
        db.collection("usuarios").doc(emailAmigoAñadir).update({
            solicitudesAmistad: firebase.firestore.FieldValue.arrayUnion(usuario)
        }).then(function(){
            $("html").css("cursor", "default");
            alert("Solicitud de amistad enviada correctamente");
            location.reload();
        })
        

    } catch(error){
        $("html").css("cursor", "default");
        alert("Ha habido un error, es posible que el usuario introducido no exista");
        location.reload();
    }

})

}
function borrarAmigo(amigo){
    $("html").css("cursor", "progress");
    var db = firebase.firestore();
    db.collection("usuarios").doc(email).update({
        amigos: firebase.firestore.FieldValue.arrayRemove(amigo),
    }).then(function () {
        var db = firebase.firestore();
        var docRef = db.collection("usuarios").where("nombreUsuario", "==", amigo);
        var emailAmigoAñadir;
        docRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                emailAmigoAñadir = doc.id;
            })
        }).then(function () {
            db.collection("usuarios").doc(emailAmigoAñadir).update({
                amigos: firebase.firestore.FieldValue.arrayRemove(usuario)
            }).then(function () {
                $("html").css("cursor", "default");
                alert("Amigo eliminado correctamente");
                location.reload();
            })



        })
    })
}
function aceptarSolicitud(amigo) {
    $("html").css("cursor", "progress");
    var db = firebase.firestore();
    db.collection("usuarios").doc(email).update({
        solicitudesAmistad: firebase.firestore.FieldValue.arrayRemove(amigo),
        amigos: firebase.firestore.FieldValue.arrayUnion(amigo)
    }).then(function () {
        var db = firebase.firestore();
        var docRef = db.collection("usuarios").where("nombreUsuario", "==", amigo);
        var emailAmigoAñadir;
        docRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                emailAmigoAñadir = doc.id;
            })
        }).then(function () {
            db.collection("usuarios").doc(emailAmigoAñadir).update({
                amigos: firebase.firestore.FieldValue.arrayUnion(usuario)
            }).then(function () {
                $("html").css("cursor", "default");
                alert("Solicitud de amistad añadida correctamente");
                location.reload();
            })



        })
    })
}

function rechazarSolicitud(amigo){
$("html").css("cursor", "progress");
var db = firebase.firestore();
db.collection("usuarios").doc(email).update({
    solicitudesAmistad: firebase.firestore.FieldValue.arrayRemove(amigo)
}).then(function(){
    $("html").css("cursor", "default");
    alert("Solicitud de amistad rechazada correctamente");
    location.reload();
})
}

function modalOpen(m){
    $(m).modal('open');
    }	
$(document).ready(function(){
    $('.modal').modal();
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
       email = user.email;
        var docRef = db.collection("usuarios").doc(email);
        var amigos;
        var solicitudesAmistad;
        docRef.get().then(function (doc) {
            if (doc && doc.exists) {

                var myData = doc.data();
                usuario = myData.nombreUsuario;
                 amigos = myData.amigos;
                solicitudesAmistad = myData.solicitudesAmistad;



            }
        }).then(function(){
            
            solicitudesAmistad.forEach(function(a){
                var imgUrl = "https://firebasestorage.googleapis.com/v0/b/tfginfo-be99f.appspot.com/o/fotosUsuario%2F" + encodeURIComponent(a) + ".jpeg?alt=media";
                var solicitud='<li class="collection-item avatar"><a><img id="imgPerfil'+a+'" class="circle" src="'+imgUrl+'" onerror="this.onerror=null;this.src=\'../src/img/perfilDefault.png\';"></a><center><br><span>'+a+'</span></center><a onclick="aceptarSolicitud(\''+a+'\')" style="cursor:pointer" class="secondary-content"><i class="material-icons">check</i></a><a onclick="rechazarSolicitud(\''+a+'\')" style="cursor:pointer;margin-top:2em;" class="secondary-content"><i class="material-icons">close</i></a></li>';
                $('#solicitudesAmistad').append(solicitud)
            })
            amigos.forEach(function(a){
                var imgUrl = "https://firebasestorage.googleapis.com/v0/b/tfginfo-be99f.appspot.com/o/fotosUsuario%2F" + encodeURIComponent(a) + ".jpeg?alt=media";
                var amigo='<li class="collection-item avatar"><a><img id="imgPerfil'+a+'" class="circle" src="'+imgUrl+'" onerror="this.onerror=null;this.src=\'../src/img/perfilDefault.png\';"></a><center><br><span>'+a+'</span></center><a onclick="borrarAmigo(\''+a+'\')" style="cursor:pointer" class="secondary-content"><i class="material-icons">delete</i></a></li>';
                $('#listaAmigos').append(amigo)
            })

        })

    } else {
        // No user is signed in.
    }
});