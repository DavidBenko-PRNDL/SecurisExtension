// check if logged in by sending get request
function checkAuth(callback) {
    chrome.runtime.sendMessage({action_name: "checkAuth"}, function (response) {
        console.log("here");
        if (!response) {
            console.log("response");
            window.location.replace(loginPopup.html);
        }
        callback(response);
    });
    ////
    //// not waiting for response
    ////
}
checkAuth();

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