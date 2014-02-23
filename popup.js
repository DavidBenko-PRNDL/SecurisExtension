function submitLogin() {
	console.log("hello")
	$.ajax({
		type: "POST",
		url: "https://securis-debug.herokuapp.com/api/sign_in",
		data: {'user_login': $("#my_form").serialize()}
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