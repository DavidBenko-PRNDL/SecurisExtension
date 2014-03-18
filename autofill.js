jQuery.fn.extend({
    getPath: function () {
        var path, node = this;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var sameTagSiblings = parent.children(name);
            if (sameTagSiblings.length > 1) { 
                allSiblings = parent.children();
                var index = allSiblings.index(realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }

            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path;
    }
});

function findForms() {
	return $('form').filter(function() {
		$(this).find('input[type=password]').length > 0;
	});
}

// function to send GET request to search for domain
function searchAcccountsForURL(searchTerm) {
    var dataArr = new Array();
    var getting = $.get("https://securis-debug.herokuapp.com/search_accounts_for_url.json", {
            "auth_token": "",
            "auth_email": "",
            "search_term": searchTerm
        }, function(data) {
            console.log(data);
            dataArr = data;
        });

    // if errors, incorrect auth_token or email, log in again
    getting.error(function (data) {
        console.log("Error: " + data);
    });
    retrn dataArr;
}

// array of password fields on website
var passField = $('input[type=password]:visible');

if (passField.length == 0) {
    // no password fields on website, do nothing
    console.log("no pw field");
}
else if (passField.length == 1) {
    // one password field, autofill
    console.log("1 pw field");
    // search accounts for domain of website
    var currentURL = document.URL;
    console.log(document.URL);
    var accountArr = searchAcccountsForURL(currentURL);
    if (accountArr.length == 0) {
    	// no account saved for URL
    }
    else if (accountArr.length == 1) {
    	// one saved account, autofill

    }
    else {
    	// more than one account, show list of available accounts to autofill in menu
    }
}
else {
    // multiple password fields, offer to generate/save password
    // in menu offer to autofill passwords saved, call searchAccountsForURL
    console.log(passField.length.toString() + " pw filds")
}