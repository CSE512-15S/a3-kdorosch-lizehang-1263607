var barplot_generator = function() {
    var init_funtion = function init() {
        var dimension = Object.keys(currJSON[0])[0];

        var filtered_data = [];
        // TODO, select according to time
        for (var i=0; i<currJSON.length; i++) {
            var currTime = new Date(currJSON[i].check_in_date).getTime();
            if (currTime<=end_time && currTime>=start_time) {
                filtered_data.push(currJSON[i]);
            }
        }

        // console.log(start_time);
        // console.log(end_time);        
        // nesting the data
        var nested_data = d3.nest()
            .key(function(d) { return d.category; })
            .entries(filtered_data);

        // console.log(nested_data);

        var aggregated_data = [];
        for (var i=0; i<nested_data.length;i++) {
            var currCate = nested_data[i].key;
            var currCount = nested_data[i].values.length;
            aggregated_data.push({category: currCate, count: currCount});
        }

        // console.log(aggregated_data);

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

        document.getElementById("barplot_svg").innerHTML = "";
        barplot_svg = d3.select("#barplot_svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(aggregated_data.map(function(d) { return d.category; }));
        y.domain([0, 7000]);
        // d3.max(aggregated_data, function(d) { return d.count; })

        barplot_svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        barplot_svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("count");

        barplot_svg.selectAll(".bar")
            .data(aggregated_data)
            .enter().append("rect")
            .attr("fill", "teal")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.category); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); })
            .text(function(d) { return d.count; });
    };

    var barplot_update_funtion = function() {

    };
    return {
        init: init_funtion,
        update: barplot_update_funtion
    };
};
