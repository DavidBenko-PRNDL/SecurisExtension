var authToken = "";
var authEmail = "";

chrome.storage.local.get('authToken', function(items) {
        console.log(items.authToken);
        authToken = items.authToken;
    });
chrome.storage.local.get('authEmail', function(items) {
        console.log(items.authEmail);
        authEmail = items.authEmail;
    });

var getting = $.get("https://securis-debug.herokuapp.com/accounts.json", {
        "auth_token": authToken,
        "auth_email": authEmail
    }, function(data) {
        console.log(data)
    });

getting.error(function (data) {
    //window.location.replace("loginPopup.html");
    console.log("Failed")
});

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