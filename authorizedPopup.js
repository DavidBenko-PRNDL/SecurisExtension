// check if logged in by sending get request
function sendGet() {
    getAuthCreds(function (creds) {
        // async for local storage, ensure both have loaded prior to get request
        var getting = $.get("https://securis-debug.herokuapp.com/accounts.json", {
            "auth_token": creds.authToken,
            "auth_email": creds.authEmail
        }, function (data) {});

        // if errors, incorrect auth_token or email, log in again
        getting.error(function (data) {
            window.location.replace("loginPopup.html");
        });
    });
}
sendGet();

// function to send DELETE request to logout of chrome extension
function logout() {
    getAuthCreds(function (creds) {
        var params = {
            "auth_token": creds.authToken,
            "auth_email": creds.authEmail
        }

        var logoutRequest = $.ajax({
            type: "DELETE",
            url: "https://securis-debug.herokuapp.com/api/sign_out",
            data: params,
            success: function (data) {
                window.location.replace("loginPopup.html");
            }
        });

        logoutRequest.error(function (data) {
            // log data when DELETE error
            console.log(data);
        });

        return false;
    });
}
$("#logoutButton").click(logout);

// function to retrieve auth_token and auth_email from local storage
function getAuthCreds(callback) {
    chrome.storage.local.get(['authToken', 'authEmail'], function (items) {
        if (chrome.runtime.lastError) {
            window.location.replace("loginPopup.html");
            return;
        }
        callback(items);
    });
}