function init() {
	getstatus_lapanza();
	getstatus_lastablas();
	getstatus_arroyogrande();
}

function low(stationId) {
	$('#smokey' + stationId).attr('src', './img/low.png');
}

function moderate(stationId) {
	$('#smokey' + stationId).attr('src', './img/moderate.png');
}

function high(stationId) {
	$('#smokey' + stationId).attr('src', './img/high.png');
}

function veryhigh(stationId) {
	$('#smokey' + stationId).attr('src', './img/veryhigh.png');
}

function extreme(stationId) {
	$('#smokey' + stationId).attr('src', './img/extreme.png');
}

/*function getstatus() {
	// USE msgc=7G3A2, nfdr_type O
	jQuery.get('data.xml', function(data) {
    	var jsonified = xmlToJson(data);
    	//console.log(jsonified);
    	for (var i=0; i<jsonified.nfdrs.row.length; i++) {
    		var curEntry = jsonified.nfdrs.row[i];
    		if (curEntry.nfdr_type['#text'] == "O" && curEntry.msgc['#text'] == "7G3A2") {
    			calc_rating(curEntry.sl['#text'], curEntry.ic['#text']);
    			console.log("Smokey's Adjective Fire Danger Rating is up to date.");
    			break;
    		}
    	}
    	if (i == jsonified.nfdrs.row.length) {
    		console.log("The Adjective Fire Danger Rating has not yet been updated today.");
    	}
	});
}*/

// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function getstatus_lapanza() { //44905
	jQuery.get('./xml/lapanza.xml', function(data) {
    	var jsonified = xmlToJson(data);
    	console.log("GOT JSON! FOR LA PANZA");
    	if (jsonified.hasOwnProperty('nfdrs') && jsonified.nfdrs.hasOwnProperty('row')) {
    		for (var i=0; i<jsonified.nfdrs.row.length; i++) {
	    		var curEntry = jsonified.nfdrs.row[i];
	    		if (curEntry.nfdr_type['#text'] == "O" && curEntry.msgc['#text'] == "7G3A2") {
	    			calc_rating(curEntry.sl['#text'], curEntry.ic['#text'], 'LP');
	    			console.log("Smokey's Adjective Fire Danger Rating for La Panza is up to date.");
	    			break;
	    		}
	    	}
	    	if (i == jsonified.nfdrs.row.length) {
    			console.log("The Adjective Fire Danger Rating for La Panza has not yet been updated today.");
    			$('#ltstatus').html("*This station's rating is not up to date");
    		}
    	}    	
    	else {
    		console.log("The Adjective Fire Danger Rating for La Panza has not yet been updated today.");
    		$('#ltstatus').html("*This station's rating is not up to date");
    	}
	});
}

function getstatus_lastablas() { //44904
	jQuery.get('./xml/lastablas.xml', function(data) {
    	var jsonified = xmlToJson(data);
    	console.log("GOT JSON! FOR LAS TABLAS");
    	if (jsonified.hasOwnProperty('nfdrs') && jsonified.nfdrs.hasOwnProperty('row')) {
    		console.log("row exists");
    		for (var i=0; i<jsonified.nfdrs.row.length; i++) {
	    		var curEntry = jsonified.nfdrs.row[i];
	    		if (curEntry.nfdr_type['#text'] == "O" && curEntry.msgc['#text'] == "7G3A2") {
	    			calc_rating(curEntry.sl['#text'], curEntry.ic['#text'], 'LT');
	    			console.log("Smokey's Adjective Fire Danger Rating for Las Tablas is up to date.");
	    			break;
	    		}
	    	}
	    	if (i == jsonified.nfdrs.row.length) {
    			console.log("The Adjective Fire Danger Rating for Las Tablas has not yet been updated today.");
    			$('#ltstatus').html("*This station's rating is not up to date");
    		}
    	}
    	else {
    		console.log("The Adjective Fire Danger Rating for Las Tablas has not yet been updated today.");
    		$('#ltstatus').html("*This station's rating is not up to date");
    	}
	});
}

function getstatus_arroyogrande() { //44915
	jQuery.get('./xml/arroyogrande.xml', function(data) {
    	var jsonified = xmlToJson(data);
    	console.log("GOT JSON! FOR ARROYO GRANDE");
    	if (jsonified.hasOwnProperty('nfdrs') && jsonified.nfdrs.hasOwnProperty('row')) {
    		console.log("row exists");
    		for (var i=0; i<jsonified.nfdrs.row.length; i++) {
	    		var curEntry = jsonified.nfdrs.row[i];
	    		if (curEntry.nfdr_type['#text'] == "O" && curEntry.msgc['#text'] == "7G2A2") {
	    			calc_rating(curEntry.sl['#text'], curEntry.ic['#text'], 'AG');
	    			console.log("Smokey's Adjective Fire Danger Rating for Arroyo Grande is up to date.");
	    			break;
	    		}
	    	}
	    	if (i == jsonified.nfdrs.row.length) {
    			console.log("The Adjective Fire Danger Rating for Arroyo Grande has not yet been updated today.");
    			$('#agstatus').html("*This station's rating is not up to date");
    		}
    	}
    	else {
    		console.log("The Adjective Fire Danger Rating for Arroyo Grande has not yet been updated today.");
    		$('#ltstatus').html("*This station's rating is not up to date");
    	}
    	
	});
}

function getICIndex(ic) {
	if (ic >= 0 && ic <= 20) {
		return 0;
	}
	else if (ic >= 21 && ic <=45) {
		return 1;
	}
	else if (ic >= 46 && ic <= 65) {
		return 2;
	}
	else if (ic >= 66 && ic <= 80) {
		return 3;
	}
	else {
		return 4;
	}
}

function calc_rating(sl, ic, id) {
	var rating_matrix = [
		['L', 'L', 'L', 'M', 'M'],
		['L', 'M', 'M', 'M', 'H'],
		['M', 'M', 'H', 'H', 'V'],
		['M', 'H', 'V', 'V', 'E'],
		['H', 'V', 'V', 'E', 'E']];
	
	var ic_result = getICIndex(ic);
	var rating_result = rating_matrix[sl-1][ic_result];

	console.log("RATING BELOW for " + id + " based on sl=" + sl + " and ic=" + ic + ": ");
	console.log(rating_result);

	switch(rating_result) {
		case 'L':
			low(id);
			break;
		case 'M':
			moderate(id);
			break;
		case 'H':
			high(id);
			break;
		case 'V':
			veryhigh(id);
			break;
		case 'E':
			extreme(id);
			break;
		default:
			console.log("Something went wrong\n");
			break;
	}
}
