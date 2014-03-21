// function to verify if logged in
function verifyAuth(callback) {
    getAuthCreds(function (creds) {
        // async for local storage, ensure both have loaded prior to get request
        var getting = $.get("https://securis-debug.herokuapp.com/accounts.json", {
            "auth_token": creds.authToken,
            "auth_email": creds.authEmail
        }, function (data) {
        	console.log("true!");
             callback(true);
        });

        // if errors, incorrect auth_token or email, log in again
        getting.fail(function (data) {
        	console.log("false!");
            callback(false);
        });
        ////
        //// Not actually returning anything..just null
        ////
    });
}

console.log("test here");
// returning undefined before GET request even made. 
console.log(verifyAuth());

// function to send POST request to create account
function createAccount(account_attributes, field_attributes, callback) {
    getAuthCreds(function (creds) {
        $.post("https://securis-debug.herokuapp.com/accounts.json", {
                "account": {
                    "name": account_attributes['name'],
                    "account_fields_attributes": field_attributes
                },
                "auth_token": creds.authToken,
                "auth_email": creds.authEmail
            },
            function (data) {
                callback(data);
            }, "JSON");
    });
}

// function to send POST request to create autofill
function createAutofill(attributes, callback) {
    getAuthCreds(function (creds) {
        $.post("https://securis-debug.herokuapp.com/account_autofills.json", {
                "account_autofill": attributes,
                "auth_token": creds.authToken,
                "auth_email": creds.authEmail
            },
            function (data) {
                callback(data);
            }, "JSON");
    });
}

// function to retrieve auth_token and auth_email from local storage
function getAuthCreds(callback) {
    chrome.storage.local.get(['authToken', 'authEmail'], function (items) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
            return;
        }
        callback(items);
    });
}

// function to call createAccount and createAutofill with account_id
function createAutofillCombination(account_attributes, field_attributes) {
    createAccount(account_attributes, field_attributes, function (account_data) {});
}

// Message Listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action_name == "create") {
        createAutofillCombination(request.account, request.fields);
        //return true;
    }
    else if (request.action_name == "checkAuth") {
        
        verifyAuth(function(auth){
            sendResponse({verified: auth});
        });
        //sendResponse(verifyAuth());
        // return true keeps connection open for response
    	return true;
    }
    else {
    	sendResponse({});
    }
});
