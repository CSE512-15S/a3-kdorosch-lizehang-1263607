
// These variable definitions are based off of Bostock's brushing tutorial: http://bl.ocks.org/mbostock/1667367
// {var}2, etc. are used for the brush
var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%b %Y").parse;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");
// TODO Note that the above has not been changed from his example, we should tweak it

// TODO define variables for the area plot generation here
var canvas = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

canvas.append("labels")
	.append("clipPath") // make sure the content stays in its box
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

// TODO replace with the method to draw the initial graph
// this is just a test to make sure it's being initialized at all
canvas.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill","#ddd");    

function SelectCheckbox() {
    // display = this.checked ? "inline" : "none";
    if (document.getElementById("uniqueCheckbox").checked){
        alert("checked, kick off some kind of function to update the graphic here");
        //TODO
    }
    else {
        alert("unchecked");  
        //TODO
    }
}

function SelectDimension() {
    var temp = document.getElementById("dimensions");
    var dim = temp.options[temp.selectedIndex].value;
    alert("Dimension selected: " + dim);
    //TODO implement call to the web service
}


var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

function brushed() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  xAxis.scale(x);

  fcs.select(".axis").call(xAxis);

  fcs.selectAll(".subject").select("path.area")
      .attr("d", function(d) { return area(d.values); });
}

var currentDimensionSelection = "subject",
    boxChecked = true,
    minTime,
    maxTime;

// Read in the data produced by the database
// TODO this is a hack until we know what the function calls look like
