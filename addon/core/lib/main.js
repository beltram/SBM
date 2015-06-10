/**
 * Constant for all pages recommendation
 */
const ALL_PAGES_RECOMMENDATION = 0;
/**
 * Constant for all pages recommendation
 */
const SINGLE_PAGE_RECOMMENDATION = 1;
/**
 * Maximum pages stored in the addon storage
 */
const MAX_PAGES_STORED = 10;
/**
 * Url of the Symfony WebServer
 */
const WEBSERVER_URL = "http://localhost:1337/";
/**
 * Url of the getIp web service
 */
const GET_IP_URL = "http://www.realip.info/api/p/realip.php";




function SBMaddon() {
	const t = this;
	var {Cc, Ci} = require("chrome");
	const {ToggleButton} = require('sdk/ui/button/toggle');
	const {Panel} = require("sdk/panel");
	const self = require("sdk/self");
	this.SBMWindow = require('sdk/window/utils');
	this.request = require("sdk/request");

	this.worker = require("sdk/content/worker");
	this.passwordManager = require("sdk/passwords");
	// test if a password has already been set by the user
	var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
	var me = mediator.getMostRecentWindow(null);
	var tokenDB = Cc['@mozilla.org/security/pk11tokendb;1'].getService(Ci.nsIPK11TokenDB);
	var master_password = tokenDB.getInternalKeyToken();

	var master_password_authenticated;
	try {
		master_password_authenticated = require("chrome").components.isSuccessCode(token.login(false));
	} catch (ex) {
		master_password_authenticated = false;
	}

	this.responseToRequest = "";
	this.isSidebarReady = false;
	this.php_sessid = "";

	this.sidebar = require("sdk/ui/sidebar").Sidebar({
		id: 'SBM-sidebar',
		title: 'Recommendations',
		url: self.data.url("SBM-interface/SBM-sidebar/SBM-sidebar.html"),
		onReady: function (worker) {
			if(isSidebarReady) {
				worker.port.emit("ping",responseToRequest.text);
				worker.port.on("SBM-update", function (text) {
					t.update(text);
				});
			}
		}
	});

	// at start, get the user's wan IPv4 from an external webService
	this.myWanIp = null;
	let req = this.request.Request({
		url: GET_IP_URL,
		overrideMimeType: "application/json",
		anonymous:true
	});
	req.get();
	req.on('complete',function(response){
		myWanIp = JSON.parse(response.text).IP;
	});


	const tabs = require("sdk/tabs");
	/**
	 * Persistent storage for the addon (up to 5Mo)
	 */
	this.storage = require("sdk/simple-storage").storage;
	if (!this.storage.pages) this.storage.pages = [];
	/**
	 * The number of tabs stored
	 */
	this.nbTabs = this.storage.pages.length;
	/**
	 * The currently active tab
	 */
	this.activeTab = tabs.activeTab;
	/**
	 * The mode of the addon
	 */
	this.activeMode = true;
	/**
	 * The number of requests emitted
	 */
	this.nbRequests = 0;
	/**
	 * The button on the addon-bar
	 */
	this.button = ToggleButton({
		id: "SBM-addon-Button",
		label: "Click to expand",
		icon: {
			"16": "./assets/SBM-logo-64.ico",
			"32": "./assets/SBM-logo-64.ico",
			"64": "./assets/SBM-logo-64.ico"
		},
		onChange: handleChange
	});

	this.panelContentUrl = "";
	if(!master_password_authenticated) {
		this.panelContentUrl = self.data.url("SBM-interface/SBM-panel/sbm_panel_sign_in_up.html");
		//this.panelContentUrl = WEBSERVER_URL;
	} else {
		this.panelContentUrl = self.data.url("SBM-interface/SBM-panel/SBM-panel.html");
	}
	/**
	 * The panel displayed once the addon-button is clicked
	 */
	this.panel = Panel({
		contentURL: panelContentUrl,
		contentScriptFile:
			[self.data.url("SBM-interface/lib/js/jquery.min.js"),
			 self.data.url("SBM-interface/lib/js/bootstrap-switch.min.js"),
			 self.data.url("SBM-interface/SBM-panel/SBM-panel.js")],
			 onHide: handleHide
	});
	if(!master_password_authenticated) {
//		panel.show({
//		position: button
//		});
	}

	function handleChange(state) {
		if (state.checked) {
			panel.show({
				position: button
			});
		}
	}
	function handleHide() {
		button.state('window', {checked: false});
	}
	//listens to the active mode event
	this.panel.port.on("SBM-ActiveMode-event", function (text) {
		t.switchMode(text);
	});
	//listens to the all pages recommendation event
	this.panel.port.on("SBM-All-Pages-Recommendation-event", function (text) {
		php_sessid = "PHPSESSID="+text+"";
		t.getRecommandation(ALL_PAGES_RECOMMENDATION);
	});
	//listens to the single page recommendation event
	this.panel.port.on("SBM-Single-Page-Recommendation-event", function (text) {
		php_sessid = "PHPSESSID="+text+"";
		t.getRecommandation(SINGLE_PAGE_RECOMMENDATION);
	});
	tabs.on('ready', function(tab) {
		t.onTabOpened(tab);
	});
	return this;
};

SBMaddon.prototype = SBMaddon();

/**
 * @function
 * @desc Switch between active and passive mode
 * @param {state} state of the SBM-ActiveMode-switch-button on the panel 
 */
SBMaddon.prototype.switchMode = function(state) {
	if(state) {
		this.activeMode = true;
	} else {
		this.activeMode = false;
	}
	console.log("Addon is active ? "+this.activeMode);
};
/**
 * @function
 * @desc make an update request
 */
SBMaddon.prototype.update = function(url) {
	let request = createSymfonyRequest(url);
	request.post();
	request.on('complete',function(response){
		responseToRequest = response;
		sidebar.hide();
		isSidebarReady=true;
		sidebar.show();
	});
};
/**
 * @function
 * @desc make a request to the server to ave a list of recommendations
 * @param {type} type of recommandation (on all pages or on a single page)
 */
SBMaddon.prototype.getRecommandation = function(type) {
	let request = new Object();
	let content = {};
	content.itemList=[];
	if(type===ALL_PAGES_RECOMMENDATION) {
		request = createSymfonyRequest(WEBSERVER_URL+'fetch/all');
		
		for(i=0,l=this.storage.pages.length;i<l;i++){
			let s = this.storage.pages[i];
			let record = {
					"title" : s.title,
					"url" : s.url,
					"timestamp" : s.timestamp,
					"ip" : s.ip
			}
			content.itemList.push(record);
		}
	} else if(type===SINGLE_PAGE_RECOMMENDATION){
		let currentTab = require("sdk/tabs").activeTab;
		let record= {
				"title" : currentTab.title,
				"url" : currentTab.url,
				"timestamp" : this.getDate(),
				"ip" : myWanIp
		}
		content.itemList.push(record);
		request = createSymfonyRequest(WEBSERVER_URL+'fetch/single');
	}
	console.log(content);
	request.content = content;
	request.post();
	request.on('complete',function(response){
		responseToRequest = response;
		//to fire a new onAttach event
		sidebar.hide();
		isSidebarReady=true;
		sidebar.show();
		if(type===ALL_PAGES_RECOMMENDATION) {
			delete storage.pages;
			storage.pages = [];
			nbTabs=0;
		}
		//SBMWindow.getMostRecentBrowserWindow().document.getElementById('sidebar').style.width = "800px";
	});
	isSidebarReady=false;
};

/**
 * @function
 * @param {tab} the tab opened
 * @desc fired when a tab is opened and its content loaded
 */
SBMaddon.prototype.onTabOpened = function(tab) {
	if(tab.url != "about:newtab" && tab.contentType === "text/html" && this.activeMode) {
		if(this.storage.pages.length >= MAX_PAGES_STORED) {
			let request = createSymfonyRequest(WEBSERVER_URL+'/add');
			let content = '{"content":[';
			for(i=0,l=this.storage.pages.length;i<l;i++){
				let s = this.storage.pages[i];
				content += '{"title":"'+ s.title +'","timestamp":"'+ s.timestamp+'","url":"'+ s.url +'","ip":"'+ s.ip+'"}';
				if(i!=l-1) {
					content += ',';
				}
			}
			content += ']}';
			request.content = content;
			request.post();
			request.on('complete',function(response){
				console.log(response.text);
				delete storage.pages;
				storage.pages = [];
				nbTabs=0;
			});
		}
		this.activeTab = tab;
		this.nbTabs++;
		let record = {
				"id" : this.nbTabs,
				"title" : this.activeTab.title,
				"url" : this.activeTab.url,
				"timestamp" : this.getDate(),
				"ip" : this.myWanIp
		}
		this.storage.pages.push(record);
	}
};

/**
 * @function
 * @desc get the current tab url
 * @return an url
 */
SBMaddon.prototype.getCurrentTabUrl = function() {
	return this.activeTab.url;
};

/**
 * @function
 * @param {_url} url of the SmartBrowserMotionner Symfony server
 * @desc creates an instance of a request object
 * @return a request object
 */
SBMaddon.prototype.createSymfonyRequest = function(_url) {
	return this.request.Request({
		url: _url,
		overrideMimeType: "application/json",
		headers: {
			"Cookie": php_sessid,
		},
		anonymous:false
	});
};

/**
 * @function
 * @param {_url} url of the SmartBrowserMotionner Symfony server
 * @desc creates an instance of a request object
 * @return a request object
 */
SBMaddon.prototype.createGetIpRequest = function() {
	return this.request.Request({
		url: GET_IP_URL,
		overrideMimeType: "application/json",
		anonymous:false
	});
};

/**
 * @function
 * @desc formats a new date
 * @return a string date
 */
SBMaddon.prototype.getDate = function() {
	let d = new Date();
	return ""+d.getUTCFullYear()+"-"+d.getUTCMonth()+"-"+d.getUTCDate()+" "+
	d.getUTCHours()+":"+d.getUTCMinutes()+":"+d.getUTCSeconds()+"";
};


