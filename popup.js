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

document.getElementById('submit').onClick = submitLogin;