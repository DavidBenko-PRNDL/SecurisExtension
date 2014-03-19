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
    return dataArr;
}
function fillPathWithValue(path,val){
	$(path).val(val);
}
findForms().find('input[type!=hidden],select').each(function(){
	console.log("Path: " + $(this).getPath());
	console.log("Value: " + $(this).val());
});
findForms().submit(function( event ) {
  //event.preventDefault();
});
fillPathWithValue("html>body>div:eq(0)>div:eq(0)>div:eq(0)>div:eq(1)>div:eq(1)>form>fieldset>div:eq(0)>input ","Hello Fucking World");