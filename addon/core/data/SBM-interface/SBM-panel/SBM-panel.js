/**
 * Activate all the switch buttons on the panel
 */
$("[name='my-checkbox']").bootstrapSwitch();
/**
 * For the active mode button
 */
const activeModeSwitchButton = $("#SBM-ActiveMode-switch-button");

activeModeSwitchButton.on("switchChange.bootstrapSwitch",
		function(event,state) {
	if(state===false)
		allPagesRecommendationButton.css("display","none");
	else
		allPagesRecommendationButton.css("display","inline");
	self.port.emit("SBM-ActiveMode-event", state);
});

/**
 * For the all pages recommendation
 */
const allPagesRecommendationButton = $("#SBM-recommendation-all-button");

allPagesRecommendationButton.on("click",
		function(event,state) {
	self.port.emit("SBM-All-Pages-Recommendation-event",getCookie("PHPSESSID"));
});

/**
 * For the single page recommendation
 */
const singlePageRecommendationButton = $("#SBM-recommendation-single-page-button");

singlePageRecommendationButton.on("click",
		function(event,state) {
	self.port.emit("SBM-Single-Page-Recommendation-event");
});

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


