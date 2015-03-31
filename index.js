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

function getstatus_lapanza() { //44905
}

function getstatus_lastablas() { //44904
	site = 'https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44904&start=18-MAR-15&end=18-MAR-15';
	var yql = 'http://query.yahooapis.com/v1/public/yql?callback=?';
	console.log("about to call...");

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
	  	console.log("FAILED");
	  	console.log(data);
	  }
	});
	console.log("finished getting status. now what?");
}

function getstatus_arroyogrande() { //44915

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
