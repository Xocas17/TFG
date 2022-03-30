function desconectar(){
  firebase.auth().signOut().then(function() {
    location.href="../index.html"
  }, function(error) {
    
  });
  
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);

  var db = firebase.firestore();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    var db = firebase.firestore();
    db.collection("usuarios").doc(user.email).get().then(function(doc){
      if(doc && doc.exists){
        var myData = doc.data();
        var nombre = myData.nombre;
        var apellidos = myData.apellidos;
        var email = user.email;
        var imgUrl = "https://firebasestorage.googleapis.com/v0/b/tfginfo-be99f.appspot.com/o/fotosUsuario%2F" + encodeURIComponent(email) + ".jpeg?alt=media";
        document.getElementById("nombreNav").innerText=nombre +" " +apellidos;
        document.getElementById("emailNav").innerText=email;
        document.getElementById("imgPerfil").src=imgUrl;
      }

    })
    }
  }); 

});