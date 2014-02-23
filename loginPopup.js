// send login post request
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

	// check if posting was successfull 
	posting.success(function(data) {
		if(data['success']) {
			chrome.storage.local.set({
				'authToken' : data['auth_token'], 
				'authEmail' : data['email']
			}, function () {
				console.log('Information saved');
			});
			window.location.replace("authorizedPopup.html")
		}
	});

	// check if posting 401d for invalid login
	posting.error(function(data) {
		console.log(data); 
		$("#results").html('Error with login or password.');
	});

	return false;
}

function main() {
	// Init
}

// event listener for login button
document.addEventListener('DOMContentLoaded', function () {
  $("#my_form").submit(submitLogin);
  main();
});