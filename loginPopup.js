function submitLogin() {
	var params = {
		"email":$("input[name=email]").val(),
		"password":$("input[name=password]").val()
	}

	var posting = $.post( "https://securis-debug.herokuapp.com/api/sign_in", {
		"user_login":params
	}, function(data) {
		console.log(data)
	},"JSON");

	posting.success(function(data) {
		if(data['success']) {
			chrome.storage.local.set({
				'authToken' : data[auth_token], 
				'authEmail' : data[email]
			}, function () {
				message('Token saved');
			});
			window.location.replace("authorizedPopup.html")
		}
	});

	posting.error(function(data) {
		console.log(data); 
		// Not returning correct data 
		//(i.e: {"success":false,"message":"Error with your login or password"})
		$("#results").html('Error with login or password.');
	});

	return false;
}

function main() {
	// Init
}

document.addEventListener('DOMContentLoaded', function () {
  $("#my_form").submit(submitLogin);
  main();
});