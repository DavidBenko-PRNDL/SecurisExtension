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
	}, function(data) {
		console.log(data)
	});
}

function clickHandler(e) {
	submitLogin();
}

function main() {
	// Init
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});