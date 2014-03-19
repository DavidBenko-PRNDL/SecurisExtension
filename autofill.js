jQuery.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) { 
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }

    return path;
};
function findForms() {
	return $('form').filter(function() {
		return $(this).find('input[type=password]').length > 0;
	});
}
function getPasswordFields(form){
	return $(form).find('input[type=password]');
}

// function to send GET request to search for domain
function searchAcccountsForURL(searchTerm) {
    var dataArr = new Array();
    var getting = $.get("https://securis-debug.herokuapp.com/search_accounts_for_url.json", {
            "search_term": searchTerm
        }, function(data) {
            console.log(data);
            dataArr = data;
        });

    // if errors, incorrect auth_token or email, log in again
    getting.error(function (data) {
        console.log("Error: " + data);
    });
    return dataArr;
}

// function to send POST request to create account
function createAccount(attributes) {
	$.post( "http://10.0.0.3:3000/accounts.json", {
 		"account": {
 			"name":document.title,
 			"account_fields_attributes":attributes
 		},
 		"auth_token":"",
 		"auth_email":""
 	}, 
 	function(data) {
 		
 	},"JSON");
}

// function to send POST request to create autofill
function createAutofill(attributes) {
	$.post( "https://securis-debug.herokuapp.com/account_autofills.json", {
 		"account": {
 			"name":document.title,
 			"account_fields_attributes":attributes
 		},
 		"auth_token":"",
 		"auth_email":""
 	}, 
 	function(data) {
 		console.log(data);
 	},"JSON");
}

function fillPathWithValue(path,val){
	$(path).val(val);
}

findForms().submit(function(event) {
  var formAttributes = [];
  if(confirm("Do you want to save this password in Securis?")) {
  	findForms().find('input[type!=hidden],select').each(function(){
  		formAttributes.push({"autofill_path":$(this).getPath(),"value":$(this).val(),"name":$(this).prop("name")});
	});
	formAttributes.push({"name":"Website","value":document.URL, "is_url":true});
	createAccount(formAttributes);
	//searchAcccountsForURL("pbn");
  }
    event.preventDefault();

});
//fillPathWithValue("html>body>div:eq(0)>div:eq(0)>div:eq(0)>div:eq(1)>div:eq(1)>form>fieldset>div:eq(0)>input ","Hello Fucking World");