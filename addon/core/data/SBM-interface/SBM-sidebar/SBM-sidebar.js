addon.port.on("ping", function(message) {
	document.body.innerHTML += message;
});
$('.dropdown-toggle').dropdown();

function onButtonClick (e){
	var url = $($(e)[0]).attr("value");
	addon.port.emit("SBM-update",url);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}