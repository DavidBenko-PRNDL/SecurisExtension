var authToken = "";
var authEmail = "";

// check if logged in by sending get request
function sendGet() {
    // async for local storage, ensure both have loaded prior to get request
    var getting = $.get("https://securis-debug.herokuapp.com/accounts.json", {
            "auth_token": "",
            "auth_email": ""
        }, function(data) {
            console.log(data)
        });

    // if errors, incorrect auth_token or email, log in again
    getting.error(function (data) {
    	console.log(data)
        window.location.replace("loginPopup.html");
    });
}
sendGet();

// // load auth_token and email from local storage
// chrome.storage.local.get('authToken', function(items) {
//         console.log(items.authToken);
//         authToken = items.authToken;
//         sendGet();
//     });
// chrome.storage.local.get('authEmail', function(items) {
//         console.log(items.authEmail);
//         authEmail = items.authEmail;
//         sendGet();
//     });

// console.log(authToken);
// console.log(authEmail);

//Open all links displayed on popup
document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});