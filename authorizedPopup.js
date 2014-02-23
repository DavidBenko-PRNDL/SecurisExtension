var getting = $.get( "https://securis-debug.herokuapp.com/accounts.json", {
        "auth_token": chrome.storage.local.get("auth_token", function(items) {
            if(chrome.runtime.lastError)
            {
                /* error */
                return;
            }
        }),
        "auth_email": chrome.storage.local.get("auth_email", function(items) {
            if(chrome.runtime.lastError)
            {
                /* error */
                return;
            }
        })
    }, function(data) {
        console.log(data)
    });

getting.error(function (data) {
    window.location.replace("loginPopup.html")
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