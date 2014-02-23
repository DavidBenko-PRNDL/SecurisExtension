<<<<<<< HEAD
function submitLogin(e) {
	var params = {
		"email":$("input[name=email]").val(),
		"password":$("input[name=password]").val()
	}

	console.log(params);

	$.post( "https://securis-debug.herokuapp.com/api/sign_in", {
		"user_login":params
=======
function submitLogin() {
	console.log("hello")
	
	// Need to be cleaned before POSTing
	params = {
		"email" : $("#my_form input[name=email]").val(),
		"password" : $("#my_form input[name=password]").val()
	}
	console.log(params);
	$.post("https://securis-debug.herokuapp.com/api/sign_in", {
		'user_login': params
>>>>>>> b0907d41f535c4d25f6a6e9d4797e189afafd424
	}, function(data) {
		console.log(data)
	});
	return e.preventDefault();
}

function main() {
	// Init
}

document.addEventListener('DOMContentLoaded', function () {
  //$("#my_form").addEventListener("submit",submitLogin(),false);
  $("#my_form").submit(submitLogin);
  main();
});