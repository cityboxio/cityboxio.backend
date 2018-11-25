/*** tinytoggle ***/
// Customize default options
$.fn.TinyToggle.defaults.type = "square";

// Define your custom size and use it
$.fn.TinyToggle.sizes["mysize"] = "36px";
$.fn.TinyToggle.defaults.size = "mysize";

// Initialize plug-in    
$("#datasource_c").tinyToggle({
	type:    "circle",
	//palette: "red", 
	//size:    "huge", // you can also specify defined custom sizes Ex. "mysize"
	onReady: function() { 
		/* do something... 
	alert("hellotiny")
		 * */ 
	},
	onClick: function() { /* do something */ },
	onChange: function() { /* do something... */ },
	onCheck: function() { /* do something... */ },
	onUncheck: function() { /* do something... */ },
	onDisabled: function() { /* do something... */ },
	onEnabled: function() { /* do something... */ }
});    
/*** end of tinytoggle ***/


$( document ).ready(function() {
	//console.log( "ready!" );
	console.log('%c ####################################', 'background: black; color: lightgreen');
	console.log('%c ###### welcome to citybox.io! ######', 'background: black; color: lightgreen');
	console.log('%c ####################################', 'background: black; color: lightgreen');
	console.log('%c ####### ┌─┐┬┌┬┐┬ ┬┌┐ ┌─┐─┐ ┬ #######', 'background: black; color: lightgreen');

	console.log('%c ####### │  │ │ └┬┘├┴┐│ │┌┴┬┘ #######', 'background: black; color: lightgreen');

	console.log('%c ####### └─┘┴ ┴  ┴ └─┘└─┘┴ └─ #######', 'background: black; color: lightgreen');
	console.log('%c ####################################', 'background: black; color: lightgreen');
	console.log('%c ####################################', 'background: black; color: lightgreen');
	console.log('%c ##### we are hiring unix 1337z #####', 'background: black; color: lightgreen');
	console.log('%c ####################################', 'background: black; color: lightgreen');
	

	//console.log('%c 
	//	
	//	', 'background: black; color: lightgreen');


	
	/*************************/
	/*** start of typed.js ***/
	/*************************/
	var typed = new Typed('#typed', {
		stringsElement: '#typed-strings',
		backDelay: 2000,
		showCursor: false,
		//loop: true,
		typeSpeed: 1
	});
	/***********************/
	/*** end of typed.js ***/
	/***********************/

	/********************/
	/*** start of map ***/
	/********************/

	//var map = L.map('map', {drawControl: true}).setView(
	var map = L.map('map',{
		zoomControl: false,
		dragging: true,
		//dragging: false,
		doubleClickZoom:true 
		//doubleClickZoom: false
	}).setView(
		//[31.205753, 29.924526], 
		//[30.0444, 31.2357], //cairo
		[30.044, 31.235], 
		12); // alexandria

	//var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	//var osmAttrib='Map data &copy; OpenStreetMap contributors';
	//var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 18, attribution: osmAttrib});
	//map.addLayer(osm);
	//map.setView(new L.LatLng(59.92448055859924, 10.758276373601069),10);
	//Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
	//var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib });
	//var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);


	//var myLayer = L.geoJSON().addTo(map);
	//myLayer.addData(geojsonFeature);

	//var geojsonLayer = new L.geoJSON.AJAX("./DATA/cities.geojson");       
	//geojsonLayer.addTo(map);
	var geocities = JSON.parse($.ajax({'url': "./DATA/samples/cities.small.geojson", 'async': false}).responseText); 
	var citiesLayer = new L.geoJSON().addTo(map);
	citiesLayer.addData(geocities);


	mapLink='<a href="https://www.citybox.io/copyright">citybox.io</a>';
	wholink='';
	//L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);
	//L.tileLayer('http://a.tile.stamen.com/toner/${z}/${x}/${y}', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);
	//L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);
	//L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);
	//L.tileLayer('http://b.tile.stamen.com/toner-hybrid/{z}/{x}/{y}.png', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);
	//L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);
	blackwhite='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png';
	osm=L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);
	//L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {attribution: '&copy; '+mapLink+', '+wholink,maxZoom: 18,}).addTo(map);

	//var osm2 = new L.TileLayer(blackwhite, {minZoom: 0, maxZoom: 13, attribution: "blah"}).addTo(map);
	//var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);

	var osmAttrib='Map data &copy; OpenStreetMap contributors';
	//var osm2 = new L.TileLayer(blackwhite, {minZoom: 0, maxZoom: 13, attribution: osmAttrib });
	var osm2 = new L.TileLayer(blackwhite, {minZoom: 1, maxZoom: 13, attribution: osmAttrib });
	//var miniMap= new L.Control.MiniMap(osm2, { toggleDisplay: true, position: 'topleft' }).addTo(map);
	var rect1 = {color: "grey", weight: 1};
	var rect2 = {color: "grey", weight: 1, opacity:0, fillOpacity:0};
	var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, aimingRectOptions : rect1, shadowRectOptions: rect2, position: 'bottomright'}).addTo(map);

	L.control.zoom({
		position:'bottomright'
	}).addTo(map);

	// 
	// mapLink = 
	// '<a href="http://www.esri.com/">Esri</a>';
	// wholink = 
	// 	'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

	//
	// datasource navigation control
	//
	L.Control.DatasourceNav = L.Control.extend({
		onAdd: function(map) {
			//var img = L.DomUtil.create('img');
			//var img = L.DomUtil.get('logo');
			var nav = L.DomUtil.get('citybox-datasource-nav');

			//img.src = '../../docs/images/logo.png';
			//img.style.width = '200px';

			return nav;
		},

		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.datasourcenav = function(opts) {
		return new L.Control.DatasourceNav(opts);
	}
	//L.control.datasourcenav({ position: 'bottomleft' }).addTo(map);
	//L.control.datasourcenav({ position: 'bottomleft' }).addTo(map);
	L.control.datasourcenav({ position: 'topleft' }).addTo(map);


	//
	// timeline control
	//
	L.Control.DatasourceTimeline = L.Control.extend({
		onAdd: function(map) {
			var timeline = L.DomUtil.get('timeline');
			return timeline;
		},
		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.datasourcetimeline = function(opts) {
		return new L.Control.DatasourceTimeline(opts);
	}
	//L.control.datasourcenav({ position: 'bottomleft' }).addTo(map);
	L.control.datasourcetimeline({ position: 'topright' }).addTo(map);
	//TODO checkout for all neighbouerhoods in one dataset
	//TODO https://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/
	//TODO https://gadm.org/maps/EGY/alqahirah_2.html
	var myIcon = L.icon({
		iconUrl: './img/icon.gif',
		iconSize: [20, 20],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76]
		//shadowUrl: 'my-icon-shadow.png',
		//shadowSize: [68, 95],
		//shadowAnchor: [22, 94]
	});
	//L.marker([29.9627, 31.2769], {icon: myIcon}).addTo(map);


	L.marker([29.9627, 31.2769],{icon: myIcon}).bindPopup( 'Maadi Avg. Price per m2</br> <b>6,500 EGP</b> (Apartment)</br> <b>16,000 EGP</b> (Villa)' ).addTo( map );


	//
	// city searchbar control
	//
	//L.Control.SandboxCitySearch = L.Control.extend({
	//	onAdd: function(map) {
	//		var nav = L.DomUtil.get('citybox-sandbox-searchbar');
	//		return nav;
	//	},
	//
	//		onRemove: function(map) {
	//			// Nothing to do here
	//		}
	//	});
	//	L.control.sandboxcitysearch = function(opts) {
	//		return new L.Control.SandboxCitySearch(opts);
	//	}
	//	L.control.sandboxcitysearch({ position: 'topright' }).addTo(map);


	/******************/
	/*** end of map ***/
	/******************/


	/****************************/
	/*** start of autosuggest ***/
	/****************************/

	function findFlag(country){

		var flags={"Andorra":"AD","United Arab Emirates":"AE","Afghanistan":"AF","Antigua and Barbuda":"AG","Anguilla":"AI","Albania":"AL","Armenia":"AM","Netherlands Antilles":"AN","Angola":"AO","Antarctica":"AQ","Argentina":"AR","American Samoa":"AS","Austria":"AT","Australia":"AU","Aruba":"AW","Åland Islands":"AX","Azerbaijan":"AZ","Bosnia and Herzegovina":"BA","Barbados":"BB","Bangladesh":"BD","Belgium":"BE","Burkina Faso":"BF","Bulgaria":"BG","Bahrain":"BH","Burundi":"BI","Benin":"BJ","Saint Barthélemy":"BL","Bermuda":"BM","Brunei Darussalam":"BN","Bolivia, Plurinational State of":"BO","Caribbean Netherlands":"BQ","Brazil":"BR","Bahamas":"BS","Bhutan":"BT","Bouvet Island":"BV","Botswana":"BW","Belarus":"BY","Belize":"BZ","Canada":"CA","Cocos (Keeling) Islands":"CC","Congo, the Democratic Republic of the":"CD","Central African Republic":"CF","Congo":"CG","Switzerland":"CH","Côte d'Ivoire":"CI","Cook Islands":"CK","Chile":"CL","Cameroon":"CM","China":"CN","Colombia":"CO","Costa Rica":"CR","Cuba":"CU","Cape Verde":"CV","Curaçao":"CW","Christmas Island":"CX","Cyprus":"CY","Czech Republic":"CZ","Germany":"DE","Djibouti":"DJ","Denmark":"DK","Dominica":"DM","Dominican Republic":"DO","Algeria":"DZ","Ecuador":"EC","Estonia":"EE","Egypt":"EG","Western Sahara":"EH","Eritrea":"ER","Spain":"ES","Ethiopia":"ET","Europe":"EU","Finland":"FI","Fiji":"FJ","Falkland Islands (Malvinas)":"FK","Micronesia, Federated States of":"FM","Faroe Islands":"FO","France":"FR","Gabon":"GA","England":"GB-ENG","Northern Ireland":"GB-NIR","Scotland":"GB-SCT","Wales":"GB-WLS","United Kingdom":"GB","Grenada":"GD","Georgia":"GE","French Guiana":"GF","Guernsey":"GG","Ghana":"GH","Gibraltar":"GI","Greenland":"GL","Gambia":"GM","Guinea":"GN","Guadeloupe":"GP","Equatorial Guinea":"GQ","Greece":"GR","South Georgia and the South Sandwich Islands":"GS","Guatemala":"GT","Guam":"GU","Guinea-Bissau":"GW","Guyana":"GY","Hong Kong":"HK","Heard Island and McDonald Islands":"HM","Honduras":"HN","Croatia":"HR","Haiti":"HT","Hungary":"HU","Indonesia":"ID","Ireland":"IE","Israel":"IL","Isle of Man":"IM","India":"IN","British Indian Ocean Territory":"IO","Iraq":"IQ","Iran, Islamic Republic of":"IR","Iceland":"IS","Italy":"IT","Jersey":"JE","Jamaica":"JM","Jordan":"JO","Japan":"JP","Kenya":"KE","Kyrgyzstan":"KG","Cambodia":"KH","Kiribati":"KI","Comoros":"KM","Saint Kitts and Nevis":"KN","Korea, Democratic People's Republic of":"KP","Korea, Republic of":"KR","Kuwait":"KW","Cayman Islands":"KY","Kazakhstan":"KZ","Lao People's Democratic Republic":"LA","Lebanon":"LB","Saint Lucia":"LC","Liechtenstein":"LI","Sri Lanka":"LK","Liberia":"LR","Lesotho":"LS","Lithuania":"LT","Luxembourg":"LU","Latvia":"LV","Libya":"LY","Morocco":"MA","Monaco":"MC","Moldova, Republic of":"MD","Montenegro":"ME","Saint Martin":"MF","Madagascar":"MG","Marshall Islands":"MH","Macedonia, the former Yugoslav Republic of":"MK","Mali":"ML","Myanmar":"MM","Mongolia":"MN","Macao":"MO","Northern Mariana Islands":"MP","Martinique":"MQ","Mauritania":"MR","Montserrat":"MS","Malta":"MT","Mauritius":"MU","Maldives":"MV","Malawi":"MW","Mexico":"MX","Malaysia":"MY","Mozambique":"MZ","Namibia":"NA","New Caledonia":"NC","Niger":"NE","Norfolk Island":"NF","Nigeria":"NG","Nicaragua":"NI","Netherlands":"NL","Norway":"NO","Nepal":"NP","Nauru":"NR","Niue":"NU","New Zealand":"NZ","Oman":"OM","Panama":"PA","Peru":"PE","French Polynesia":"PF","Papua New Guinea":"PG","Philippines":"PH","Pakistan":"PK","Poland":"PL","Saint Pierre and Miquelon":"PM","Pitcairn":"PN","Puerto Rico":"PR","Palestine":"PS","Portugal":"PT","Palau":"PW","Paraguay":"PY","Qatar":"QA","Réunion":"RE","Romania":"RO","Serbia":"RS","Russian Federation":"RU","Rwanda":"RW","Saudi Arabia":"SA","Solomon Islands":"SB","Seychelles":"SC","Sudan":"SD","Sweden":"SE","Singapore":"SG","Saint Helena, Ascension and Tristan da Cunha":"SH","Slovenia":"SI","Svalbard and Jan Mayen Islands":"SJ","Slovakia":"SK","Sierra Leone":"SL","San Marino":"SM","Senegal":"SN","Somalia":"SO","Suriname":"SR","South Sudan":"SS","Sao Tome and Principe":"ST","El Salvador":"SV","Sint Maarten (Dutch part)":"SX","Syrian Arab Republic":"SY","Swaziland":"SZ","Turks and Caicos Islands":"TC","Chad":"TD","French Southern Territories":"TF","Togo":"TG","Thailand":"TH","Tajikistan":"TJ","Tokelau":"TK","Timor-Leste":"TL","Turkmenistan":"TM","Tunisia":"TN","Tonga":"TO","Turkey":"TR","Trinidad and Tobago":"TT","Tuvalu":"TV","Taiwan":"TW","Tanzania, United Republic of":"TZ","Ukraine":"UA","Uganda":"UG","US Minor Outlying Islands":"UM","United States":"US","Uruguay":"UY","Uzbekistan":"UZ","Holy See (Vatican City State)":"VA","Saint Vincent and the Grenadines":"VC","Venezuela, Bolivarian Republic of":"VE","Virgin Islands, British":"VG","Virgin Islands, U.S.":"VI","Viet Nam":"VN","Vanuatu":"VU","Wallis and Futuna Islands":"WF","Kosovo":"XK","Samoa":"WS","Yemen":"YE","Mayotte":"YT","South Africa":"ZA","Zambia":"ZM","Zimbabwe":"ZW"};

		var flag=flags[country];
		if (typeof(flag) == 'undefined') {
			flag="error";	
		}
console.log("found flag: " + flag);
return flag;
};

var options = {
	//url: "./../DATA/cities.json",
	//url: "./DATA/cities.small.json",
	url: "./DATA/world-cities_json.json",
	placeholder: "sandbox a city",
	//adjustWidth: true,	
	getValue: function(element) {
		//return $(element).find("name").text();	
		return element.name;
	},
	list: {
		match: {
			enabled: true
		},
		sort: {
			enabled: true 
		},
		maxNumberOfElements: 10,

		showAnimation: {
			type: "slide",
			time: 300
		},
		hideAnimation: {
			type: "slide",
			time: 300
		},
		onChooseEvent: function(value, item) {
			var value = $("#categories-basic").getSelectedItemData().name;
			var all = $("#categories-basic").getSelectedItemData();
			//alert(value);
			//alert(all.toSource());
			//alert(all.country);
			//$("#data-holder").val(value).trigger("change");
		}
	},
	template: {
		type: "custom",
		method: function(value, item) {
			//return "<img src='" + item.icon + "' /> | " + item.type + " | " + value;

			return "<b>" + value + 
				'<img src="img/flags/'+ 
				findFlag(item.country).toLowerCase() +
				'.svg" alt="" style="width: 40px; height: 20; float: right;" class="flag">'+
				"</b>" + 
				", </br>" + 
				item.subcountry + 
				", " +
				item.country 
			;
		}
	}
	//template: {
	//	type: "iconRight",
	////	fields: {
	//		iconSrc: "icon"
	//	}
	//}
};

$("#categories-basic").easyAutocomplete(options);
$('#categories-basic').focus();
/**************************/
/*** end of autosuggest ***/
/**************************/

/**************************/
/***** start of nav *******/
/**************************/

//var vex = require('vex-js');
//vex.registerPlugin(require('vex-dialog'));
//vex.defaultOptions.className = 'vex-theme-top';
vex.defaultOptions.className = 'vex-theme-wireframe';

//vex.dialog.confirm({
//	message: 'Are you absolutely sure you want to destroy the alien planet?',
//	callback: function (value) {
//		if (value) {
//			console.log('Successfully destroyed the planet.')
//		} else {
//			console.log('Chicken.')
//		}
//	}
//})

//$('.btn').on('click',function(){
$('.icon').on('click',function(){
	if($(this).attr('data-click-state') == 1) {
		var color='#001f3f';
		$(this).attr('data-click-state', 0)
		$(this).css('color', color)
		$(this).css('text-shadow', '3px 3px 16px ' + color)
	} else if ($(this).attr('data-click-state') == 2) {
		var color='#0074D9';
		$(this).attr('data-click-state', 1)
		$(this).css('color', color)
		$(this).css('text-shadow', '3px 3px 16px ' + color)
	} else if ($(this).attr('data-click-state') == 3) {
		var color='#7FDBFF';
		$(this).attr('data-click-state', 2)
		$(this).css('color', color)
		$(this).css('text-shadow', '3px 3px 16px ' + color)
	} else {
		var color=' #F012BE ';
		$(this).attr('data-click-state', 3)
		$(this).css('color', color)
		$(this).css('text-shadow', '3px 3px 16px ' + color)
	}
});

// color schme https://clrs.cc/
//$('.icon').on('click',function(){
//$('.btn').on('click',function(){
$('.citybox-datasource').on('click',function(){
	//vex.dialog.alert('Thanks for checking out </br>vex!')
	//showDialog(function(notes) {
	//	$('#notes').text(notes);
	//})
	var cityboxdatasource = $(this).find('a').text();
	vex.dialog.open({
		unsafeMessage: '<b>' + cityboxdatasource + '</b> data for city, country',
		input: [
			'<hr>', 
			'icons here for updating the map', 
			'<hr>', 
			'icons here for downloads', 
			//'<i class="fas fa-flask icon"></i>',
			'<i class="far fa-file-excel icon"></i>',
			'<i class="far fa-file-pdf icon"></i>',
			'<div>',
			//'download in pdf, csv, blahblah',
			'</div>'
		].join(''),
		callback: function (data) {
			if (!data) {
				return console.log('Cancelled')
			}
			console.log('somthing');
			//TODO update map panel of the selected things	
			$('.demo-result-custom-vex-dialog').show().html([
				'<h4>Result</h4>',
				'<p>',
				'Date: <b>' + data.date + '</b><br/>',
				'Color: <input type="color" value="' + data.color + '" readonly />',
				'</p>'
			].join(''))
		}
	})
	//var color='white';
	//$(this).css('color', color)
	//$(this).css('background-color', "black")
	//$(this).css('text-shadow', '3px 3px 16px ' + color)
});

/* can be used to show info about the icon */
$( ".icon" ).hover(
	function() {
		//vex.dialog.alert('Thanks for checking out vex!')
		//TODO open modal 
		//$( this ).find("span").css( "margin", "12px" );	
	}, function() {
		//TODO close modal 
		//$( "p" ).remove( ":contains('Hello')" );
	}
);


$('.slider1').slick({
	prevArrow: $("#slider1up"),
	nextArrow: $("#slider1down"),
	infinite: true,
	slidesToShow: 3,
	adaptiveHeight: true,
	slidesToScroll: 2,
	speed: 1000,
	//rows: 3,
	autoplaySpeed: 3000,
	autoplay: true,
	//fade: true,
	//centerMode: true,	
	focusOnSelect: true,
	vertical: true,
	verticalSwiping: true,
	waitForAnimate: false,
	useCSS: true, //Enable/Disable CSS Transitions
	//appendArrows: $(".arrows"),
	//cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
	cssEase: 'linear',
	touchThreshold: 100
});
/**************************/
/****** end of nav ********/
/**************************/

/***************************************/
/****** start of cityboxhackathon ********/
/***************************************/
$('#citybox-hackathon').slick({
	//dots: true,
	//adaptiveHeight: true,
	//variableWidth: true,	
	infinite: true,
	speed: 500,
	fade: true,
	autoplaySpeed: 3000,
	autoplay: true,
	cssEase: 'linear'
});
/***************************************/
/****** end of cityboxhackathon ********/
/***************************************/

/***************************************/
/********** start of niceScroll ********/
/***************************************/
$("body").niceScroll({
	cursorwidth:7,
	cursoropacitymin:0.05,
	//cursorcolor:'#6e8cb6',
	//cursorborder:'none',
	//cursorborderradius:0,
	cursorminheight: 140,
	railpadding: { top: 10, right: 20, left: 0, bottom: 10 }, // set padding for rail bar
	//scrollspeed: 100,
	smoothscroll: true,
	autohidemode:'leave'
});
/***************************************/
/********** end of nicScroll************/
/***************************************/

/***************************************/
/********** start of timeline ************/
/***************************************/
$("#timelineContainer").niceScroll({
	//cursorwidth:3,
	cursorwidth: "7px", // cursor width in pixel (you can also write "5px")
	cursoropacitymin:0.05,
	cursorheight: "140px", // cursor width in pixel (you can also write "5px")
	boxzoom: false, // enable zoom for box content	
	//cursorcolor:'#6e8cb6',
	//cursorborder:'none',
	//cursorborderradius:0,
	//cursorminheight: 10,
	//cursorminwidth: 10,
	cursorfixedheight: false, // set fixed height for cursor in pixel	
	railpadding: { top: 0, right: 0, left: 0, bottom: -40 }, // set padding for rail bar
	//scrollspeed: 100,
	smoothscroll: true,
	autohidemode:'leave'
});

//console.log('hmm', d3KitTimeline);
console.log('loading map timeline');

var data = [
	{time: new Date(2012, 4,25), episode: 4, name: 'datasourceA:datasetC'},
	{time: new Date(2016, 4,25), episode: 4, name: 'datasourceB:datasetC'},
	{time: new Date(2015, 4,1), episode: 4, name: 'datasourceC:datasetA'},
	{time: new Date(2018, 4,2), episode: 4, name: 'datasourceC:datasetB'},
	{time: new Date(2013, 4,2), episode: 4, name: 'datasourceC:datasetC'},
	{time: new Date(2016, 4,9), episode: 4, name: 'datasourceD:datasetA'},
	{time: new Date(2016, 4,27), episode: 4, name: 'datasourceE:datasetE'},
	{time: new Date(2016, 4,26), name: 'transport4cairo:maadi'},
	{time: new Date(2017, 4,26), name: 'transport4cairo:maadi'},
	{time: new Date(2018, 4,26), name: 'transport4cairo:maadi'},
	{time: new Date(2019, 4,26), name: 'predicted transport4cairo:maadi'},
	//{time: new Date(1980, 4,17), episode: 5, name: 'The Empire Strikes Back'},
	//{time: new Date(1984, 4,25), episode: 6, name: 'Return of the Jedi'},
	//{time: new Date(1999, 4,19), episode: 1, name: 'The Phantom Menace'},
	//{time: new Date(2002, 4,16), episode: 2, name: 'Attack of the Clones'},
	//{time: new Date(2005, 4,19), episode: 3, name: 'Revenge of the Sith'},
	//{time: new Date(2015,11,18), episode: 7, name: 'The Force Awakens'},
];

//var initialWidth= 800;
//var initialHeight=220;
//var margin= {left: 20, right: 20, top: 20, bottom: 20};
//var innerWidth =  initialWidth - margin.left - margin.right;
var chart = new d3KitTimeline('#timeline', {
	//direction: 'up',
	//direction: 'right',
	direction: 'left',
	margin:{left: 40, right: 40, top: 10, bottom: 20}, 
	initialWidth: 1200,
	//initialHeight: 200,
	//labelBgColor: "#777",
	//amount: 20,
	//minWidth: 40,
	//maxWidth: 60,
	//algorithm: 'overlap',
	labelBgColor: "black",
	//labella: {maxPos: 500, algorithm: 'overlap'},
	//labella: {maxPos: 700, algorithm: 'simple', density: 1, lineSpacing: 2, nodeSpacing: 2},
	//labella: {minPos: 300, maxPos: 600, algorithm: 'overlap', density: 1, lineSpacing: 2, nodeSpacing: 2},
	//labella: {minPos: 300, maxPos: 600, algorithm: 'simple', density: 1, lineSpacing: 2, nodeSpacing: 2},
	//labella: {minPos: 200, maxPos: 1000, algorithm: 'simple', density: 1, lineSpacing: 2, nodeSpacing: 8},
	labella: {algorithm: 'simple', density: 1, lineSpacing: 2, nodeSpacing: 8},
	//textFn: function(d){ return d.time.getFullYear() + " </br> " + d.name;}
	textFn: function(d){ return d.time.getFullYear() + " - " + d.name;}
});


//var setdata = function(d,i){
//	var cdata = d3.select("#crisprdata");
//	cdata.selectAll("*").remove()		
//	cdata.data([d]).append("h3").text(function(d){return d.title});
//	cdata.data([d]).append("hr");
//	cdata.data([d]).append("h4").text(function(d){return d.person + " - " + d.institute});
//	cdata.data([d]).append("h4").text(function(d){return d.date});
//	cdata.data([d]).append("p").text(function(d){return d.discovery});
//};
//chart.data(data);
//chart.on("labelMouseover", function(d,i){setdata(d,i)} );
//

chart.data(data);
//chart.on("labelMouseover", function(d,i){
chart.on("labelClick", function(d,i){
	alert("map updated with ");	
	//setdata(d,i);
});
chart.visualize().resizeToFit();
//chart.updateDimensionNow();
/***************************************/
/********** end of timeline ************/
/***************************************/

/********************************************************/
/********** start of opendatahub ************/
/********************************************************/
$("#range").ionRangeSlider({
	//hide_min_max: true,
	//keyboard: true,
	min: 0,
	max: 100,
	from: 0,
	//to: 4000,
	//type: 'double',
	step: 5,
	prefix: "US$",
	grid: true,
	//force_edges: true,
	from_shadow: true,
	//from_fixed: true, // set minimum amount to pay
	grid_snap: true,
	//min_postfix: "FREE ", 
	//max_postfix: "&nbsp;&nbsp;<i class='fas fa-heart'></i>",
	//max_postfix: "</br>&nbsp;&nbsp;<i class='fas fa-heart'></i>",
	onStart: function (data) {
		console.log(data);
	},
	onChange: function (data) {
		console.log(data);
	},
	onFinish: function (data) {
		console.log(data);
	},
	onUpdate: function (data) {
		console.log(data);
	}
});


/********************************************************/
/********** end of opendatahub ************/
/********************************************************/

/********************************************************/
/********** start of notify ************/
/********************************************************/

$(".acezero").notify(
	"I'm to the right of this box", 
	{
		// whether to hide the notification on click
		clickToHide: true,
		// whether to auto-hide the notification
		autoHide: true,
		// if autoHide, hide after milliseconds
		autoHideDelay: 5000,
		// show the arrow pointing at the element
		arrowShow: true,
		// arrow size in pixels
		arrowSize: 5,
		// position defines the notification position though uses the defaults below
		position: '...',
		// default positions
		elementPosition: 'bottom left',
		globalPosition: 'top right',
		// default style
		style: 'metro',
		// default class (string or [string])
		className: 'error',
		// show animation
		showAnimation: 'slideDown',
		// show animation duration
		showDuration: 400,
		// hide animation
		hideAnimation: 'slideUp',
		// hide animation duration
		hideDuration: 200,
		// padding between element and notification
		gap: 2
	}
);
/********************************************************/
/********** end of notify ************/
/********************************************************/

/********************************************************/
/********** start of gridstacks ************/
/********************************************************/

// gridstacks
/*
 * $(function () {
	var options = {
	};
	$('.grid-stack').gridstack(options);

	new function () {
		this.serializedData = [
			{x: 0, y: 0, width: 2, height: 2},
			{x: 3, y: 1, width: 1, height: 2},
			{x: 4, y: 1, width: 1, height: 1},
			{x: 2, y: 3, width: 3, height: 1},
			{x: 1, y: 4, width: 1, height: 1},
			{x: 1, y: 3, width: 1, height: 1},
			{x: 2, y: 4, width: 1, height: 1},
			{x: 2, y: 5, width: 1, height: 1}
		];

		this.grid = $('.grid-stack').data('gridstack');

		this.loadGrid = function () {
			this.grid.removeAll();
			var items = GridStackUI.Utils.sort(this.serializedData);
			_.each(items, function (node) {
				this.grid.addWidget($('<div><div class="grid-stack-item-content" /></div>'),
					node.x, node.y, node.width, node.height);
			}.bind(this));
			return false;
		}.bind(this);

		this.saveGrid = function () {
			this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
				el = $(el);
				var node = el.data('_gridstack_node');
				return {
					x: node.x,
					y: node.y,
					width: node.width,
					height: node.height
				};
			});
			$('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
			return false;
		}.bind(this);

		this.clearGrid = function () {
			this.grid.removeAll();
			return false;
		}.bind(this);

		$('#save-grid').click(this.saveGrid);
		$('#load-grid').click(this.loadGrid);
		$('#clear-grid').click(this.clearGrid);

		this.loadGrid();
	};
	$("body").getNiceScroll().resize();	
});
*/
/********************************************************/
/********** end of gridstacks ************/
/********************************************************/


});


$(window).on('load', function() { // makes sure the whole site is loaded 
	$('#status').fadeOut(); // will first fade out the loading animation 
	//sleep(2000);	
	$('#preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website. 
	$('body').delay(350); //.css({'overflow':'visible'});
	//$('html').css({'overflow-x':'hidden'});
})
