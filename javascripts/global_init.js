var currJSON;
var category_domain;
var dimension;
var barplot;
var barplot_svg;

var start_time = new Date(2013, 06 - 1, 01).getTime();
var end_time = new Date(2014, 09 - 1, 22).getTime();
var color = d3.scale.category20c();

function SelectDimension() {
	// dimension could be "subject", "s1_gender", "class", "location", "spcl_prog_text" and "resident"

	// TODO remove "anything goes" and "writing center" from subject
	//      remove large class year? (numbers > 10 break the order of levels)
	if (document.getElementById("dimensions")) {
		dimension = document.getElementById("dimensions").value;	
	} else {
		dimension = "subject";
	}
	
	// Talk to the JSON server
	var remote = "http://192.241.216.102/CSE512/left_graph.php?q=" + dimension;
	var request = new XMLHttpRequest();
	request.open("GET", remote, false);
	request.onload = processData;
	request.onerror = function() { console.log("There is an error");};
	request.send();
}

	// function to be fired when we fetched the data.
function processData() {
	if (this.status == 200) {   // 200 stands for we received a file
		currJSON = JSON.parse(this.responseText);
		// add vector for all category names (before filtering)
        
        var category_list = d3.set();
        for (var i=0; i<currJSON.length; i++) {
			    category_list.add(currJSON[i].category);
		}
        
       	if(dimension == "class"){
			category_domain = ['other','Non-Matriculated', 'Grad', '5th year', 'Senior', 'Junior', 'Sophomore', 'Freshman'];
			console.log(category_domain);
       		color.domain(category_domain);
       	}
		else if (dimension == "spcl_prog_text"){
			category_domain = ["None", "ADM SAI", "ATHLETICS", "ATHLETICS-EOP", "EOP", "EOP Special Programs", "INTL/RES.TUIT.ELIG", "RESTRICTED ELIGIBLTY", "SP ATHLETICS", "STAFF/FAC EXEMPT", "UNDERGRAD EXCHANGE", "UNIV EXT", "WA ST CLASS EMPT", "WWAMI"];
			color.domain(category_domain);
		}
        else if (dimension=="subject"){
        	// hacky sort to intelligently group categories together
        	// category_domain = category_list.values().sort();
        	var languages = [];
        	var stem = [];
        	var other = [];
        	for (var i = 0; i < category_list.values().length; i++) {
        		var category = category_list.values()[i];
        	
        	

        		//Languages

        		if (   category == "Arabic" 
        			|| category == "Chinese" 
        			|| category == "French"
        			|| category == "Japanese"
        			|| category == "Korean"
        			|| category == "Spanish"
        			|| category == "Swedish") {
        			
        			languages.push(category);
        		}

        		//STEM
        		else if(category == "Bio" 
        			|| category == "CSE" 
        			|| category == "Chem"
        			|| category == "Math"
        			|| category == "Physics"
        			|| category == "Stats") {
        			stem.push(category);
        		}

        		//other
        		else {
        			other.push(category);
        			//alert(other);
        		}
        	};
        	// category_domain = [];
        	// category_domain = category_domain.concat(languages.sort());
        	// category_domain = category_domain.concat(stem.sort());
        	// category_domain = category_domain.concat(other.sort());
        	// console.log(category_domain);
			category_domain = ["Arabic", "French", "Spanish",
						    	     "Chinese", "Korean", "Japanese", 
						    	     "Bio", "Chem", "Physics", 
						    	     "CSE",  "Math", "Stats", "ECON"].reverse();
        	// manually control the colors
        	color = d3.scale.ordinal()
						    .domain(["Arabic", "French", "Spanish",
						    	     "Chinese", "Korean", "Japanese",
						    	     "Bio", "Chem", "Physics", 
						    	     "CSE",  "Math", "Stats", "ECON"])
						    .range(['#3182bd', '#6baed6', '#9ecae1',  
						    	    '#756bb1', '#9e9ac8', '#bcbddc',
						    	    '#31a354', '#74c476', '#a1d99b', 
						    	    '#e6550d', '#fd8d3c', '#fdae6b','#fdd0a2']);
        	
        }
        else {
        	 // handle the numerical category
	   //      if(dimension == 'class'){
				// category_domain = category_list.values().sort(
				// 	function(a, b) {
				// 	  return b - a;
				// 	});
	   //      }else{
	        	category_domain = category_list.values().sort();
	   //      }
        	color.domain(category_domain);
        }
        
        
	}
	// handle redrawing of existing bar chart
	if (document.getElementById("barplot_svg")) {
		//TODO is this actually doing anything? - kd
		barplot.init();
		lineplot.init(7);
	}
}

