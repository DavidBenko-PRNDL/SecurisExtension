var authToken = "";
var authEmail = "";

function sendGet() {
    if (authToken.length > 0 && authEmail.length > 0) {
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
    }
}

chrome.storage.local.get('authToken', function(items) {
        console.log(items.authToken);
        authToken = items.authToken;
    }, function (){
        sendGet();
    });
chrome.storage.local.get('authEmail', function(items) {
        console.log(items.authEmail);
        authEmail = items.authEmail;
    }, functiom () {
        sendGet();
    });

console.log(authToken);
console.log(authEmail);

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