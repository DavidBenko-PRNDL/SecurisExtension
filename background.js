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
                "account": {
                    "name": document.title,
                    "account_fields_attributes": attributes
                },
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
        return true;
    }
});