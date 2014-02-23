function submitLogin(e) {
	var params = {
		"email":$("input[name=email]").val(),
		"password":$("input[name=password]").val()
	}

	console.log(params);

	$.post( "https://securis-debug.herokuapp.com/api/sign_in", {
		"user_login":params
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