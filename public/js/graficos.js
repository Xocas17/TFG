
    var path = window.location.href;
    var page1 = path.split("?").pop();
    var grafico = page1.split("=").pop();
    var mapaBuscar = "evolucion"+grafico;

    var mapa;
    firebase.auth().onAuthStateChanged(function(user) {
        var db = firebase.firestore();
        db.collection("usuarios").doc(user.email).get().then(function(doc){
            if(doc && doc.exists){
                var myData= doc.data();
                mapa = myData[mapaBuscar]
                console.log(Object.keys(mapa))
                console.log(Object.values(mapa))
            }
        }).then(function(){
            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(mapa),
                    datasets: [{
                        label: grafico,
                        data: Object.values(mapa),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Evolución ' + grafico +" desde el principio" ,
                            fontSize:30,
                            padding:30,
                            fontColor:'#12619c',
                        
                        },
                        legend:{
                            position:'bottom',
                            labels:{
                                padding:20,
                                boxWidth:15,
                                fontFamily:'system-ui',
                                fontColor:'black',
                            }
                        }
                    }
                }
            });
        })


    });



