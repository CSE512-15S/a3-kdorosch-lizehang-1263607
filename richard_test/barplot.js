var barplot_generator = function() {
    var init_funtion = function init() {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width], 0.1);

        var y = d3.scale.linear()
                  .range([height, 0]);

        var xAxis = d3.svg.axis()
                      .scale(x)
                      .orient("bottom");

        var yAxis = d3.svg.axis()
                      .scale(y)
                      .orient("left")
                      .ticks(10, "");

        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    };

    var update_funtion = function() {

    };
    return {
        init: init_funtion,
        update: update_funtion
    };
};
