uid="";
(function() {

    var firebaseConfig= (function() {
        var json = null;
        $.ajax({
          'async': false,
          'global': false,
          'url': "json/fb_config.json",
          'dataType': "json",
          'success': function(data) {
            json = data;
          }
        }); 
        return json;
      })();


    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    //get elements 
    console.log('init index');
      
    firebase.auth().onAuthStateChanged (firebaseUser => {
        if (firebaseUser){
            console.log(firebaseUser);
            uid = firebaseUser.uid;
            var ref = firebase.database().ref().child("Users").child(uid);
            // document.getElementById("name").value = ref.child()
            console.log(uid);
            ref.once('value', function(snapshot) {
                console.log(snapshot.val());
                if (snapshot.val()!==null){
                    dataset = snapshot.val();
                    document.getElementById("name").value = dataset.name; 
                    document.getElementById("email").value = dataset.email_id;
                    document.getElementById("phno").value = dataset.phone_number;
                    document.getElementById("age").value  = dataset.age;
                    document.getElementById("address").value = dataset.address;
                    document.getElementById("city").value = dataset.city;
                    document.getElementById("state").value = dataset.state;
                }
            });
        }
        else{
            console.log('not logged in');
            window.location = "signinwithphno.html";
        }

    });
  
  
  }());
gender="";
function changegen(str){
    gender = str;
}

function getInputValue() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phno = document.getElementById("phno").value;
    var age  = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    // alert(fName);
    object = {
        'userid':uid,
        'verified':true,
        'name':name,
        'phone_number':phno,
        'gender':gender,
        'state':state,
        'age':age,
        'address':address,
        'city':city,
        'country':"India",
        'email_id':email,
    }
    console.log(object); 
    var ref = firebase.database().ref().child("Users").child(uid);
    ref.set(object);
    window.location= "index.html";
 }