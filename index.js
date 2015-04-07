function low() {
	$('#smokey').attr('src', './img/low.png');
}

function moderate() {
	$('#smokey').attr('src', './img/moderate.png');
}

function high() {
	$('#smokey').attr('src', './img/high.png');
}

function veryhigh() {
	$('#smokey').attr('src', './img/veryhigh.png');
}

function extreme() {
	$('#smokey').attr('src', './img/extreme.png');
}

function getTodaysDate() {
	var today = new Date();

	// get the 2-character date
	var today_day = today.getDate();
	if (today_day < 10) {
		today_day = '0' + today_day;
	}

	// get the 3-character month
	var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	var today_month = months[today.getMonth()];

	var today_year = today.getFullYear().toString().substring(2, 4);

	return today_day + "-" + today_month + "-" + today_year;
}

function getstatus_lapanza() { //44905
	var stn = "44905";
}

function getstatus_lastablas() { //44904
	//sample site that returns xml
	var myXML = ""
	document.domain="https://fam.nwcg.gov";
	var request = new XMLHttpRequest();
	request.open("GET", "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44904&sig=&type=&start=18-MAR-15&end=18-MAR-15&time=&user=4e1&priority=", true);
	request.onreadystatechange = function(){
	    if (request.readyState == 4) {
	        if (request.status == 200 || request.status == 0) {
	            myXML = request.responseXML;
	        }
	    }
	}
	request.send();

	console.log(myXML);
	/*$.ajax({
		  url: './proxy2.php',
		  success: function(data) {
		    $('#data').html(data);
		  }
	});*/
	/*$("#data").load("./proxy2.php", function(){
	  // Some callback functions
	  
	});*/
	/*var today = getTodaysDate();
	var stn = "44904";

	var site = 'https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn='+ stn + '&start=' + today + '&end=' + today + '';
	//var yql = 'http://query.yahooapis.com/v1/public/yql?callback=?';

	$.ajax({
	  crossOrigin: true,
	  url: site,
	  proxy: "http://smokeyproxyserver.appspot.com/",
	  context: {},
	  success: function(data) {
	  	console.log("SUCCESS");
		console.log(data);
	  },
	  failure: function(data) {
	  	console.log("FAILURE");
	  	console.log(data);
	  }
	});
	console.log("finished getting status. now what?");*/
}

function getstatus_arroyogrande() { //44915
	var stn = "44915";
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

function calc_rating(sl, ic) {
	var rating_matrix = [
		['L', 'L', 'L', 'M', 'M'],
		['L', 'M', 'M', 'M', 'H'],
		['M', 'M', 'H', 'H', 'V'],
		['M', 'H', 'V', 'V', 'E'],
		['H', 'V', 'V', 'E', 'E']];
	
	var ic_result = getICIndex(ic);
	var rating_result = rating_matrix[sl-1][ic_result];

	console.log("RATING BELOW:");
	console.log(rating_result);

	switch(rating_result) {
		case 'L':
			low();
			break;
		case 'M':
			moderate();
			break;
		case 'H':
			high();
			break;
		case 'V':
			veryhigh();
			break;
		case 'E':
			extreme();
			break;
		default:
			console.log("Something went wrong\n");
			break;
	}
}
