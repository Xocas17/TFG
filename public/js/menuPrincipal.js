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

        document.getElementById("nombreNav").innerText=nombre +" " +apellidos;
        document.getElementById("emailNav").innerText=email;
      }

    })
    }
  }); 

});