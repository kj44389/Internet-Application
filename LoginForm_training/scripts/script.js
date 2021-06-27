

	function login(){

	  var userEmail = document.getElementById("input100-login").value;
	  var userPass = document.getElementById("input100-pass").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Złe hasło.');
      }
			else if (errorCode === 'auth/invalid-email') {
        alert('Podany email jest nieprawidłowy.');
      }
			else if (errorCode === 'auth/user-not-found') {
        alert('Użytkownik nie istnieje.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
	}


  function setup(){

          firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                // User is signed in.

                alert("Zalogowano!");


              } else {
                // No user is signed in.

                console.log('wylogowano')

              }
            });

    $("#input100-login").keyup(function(){
      let err = $("#wrap-label-login")
      let wrap_input = $(".wrap-input")

      if(this.value == ""){
        err.css({"-webkit-transform":"matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,40,0,1)"});
        wrap_input.eq(0).css({"margin":"10 0 10 0"});
      }
      else{
        err.css({"-webkit-transform":"matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1)"});
        wrap_input.eq(0).css({"margin":"30 0 0 0"});
      }

    });
    $("#input100-pass").keyup(function(){
      let err = $("#wrap-label-pass")
      let wrap_input = $(".wrap-input")

      if(this.value == ""){
        err.css({"-webkit-transform":"matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,40,0,1)"});
        wrap_input.eq(1).css({"margin":"10 0 10 0"});
      }
      else{
        err.css({"-webkit-transform":"matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1)"});
          wrap_input.eq(1).css({"margin":"30 0 0 0"});
      }

    });



  }
