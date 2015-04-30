var currJSON;

function SelectDimension() {
	// dimension could be "subject", "s1_gender", "class", "location", "spcl_prog_text" and "resident"
	var dimension;
	if (document.getElementById("dimensions")) {
		dimension = document.getElementById("dimensions").value;	
	} else {
		dimension = "subject";
	}
	
	// That's the JSON server I set up	
	var remote = "http://107.170.209.163/CSE512/left_graph.php?q=" + dimension;
	var request = new XMLHttpRequest();
	request.open("GET", remote, true);
	request.onload = processData;
	request.onerror = function() { console.log("There is an error");};
	request.send();
}

	// function to be fired when we fetched the data.
function processData() {
	if (this.status == 200) {   // 200 stands for we received a file
		// response here will be a JSON object
		currJSON = JSON.parse(this.responseText);		
		// .......Do something with response..........
	}
}

SelectDimension();