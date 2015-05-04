// Slider area
var brush_generator = function(){
  
  // svg attributes
  var margin = {top: 10, right: 0, bottom: 20, left: 40},
        canvas_width,
        w = 510 - margin.left - margin.right;
        h = 60;
        barPadding = 1;
        // height2 = 500 - margin2.top - margin2.bottom;

  // var initCanvasSize = function(){
  //     canvas_width = +(d3.select('#brush').style('width').replace('px', ''));
  //     w = canvas_width - margin.left - margin.right;
  // };

  // parse time from format in JSON
  var parseformat = d3.time.format("%Y-%m-%d");
  var upper_time_limit = new Date(2014, 05, 01);
  var lower_time_limit = new Date(2013, 08, 22);

  var dataset = [];
  var color = d3.scale.category20();

  // function to draw the brush area
  var draw = function(dataset){
    var svg = d3.select("#brush")
                .append("svg")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  
            
    // var time_range = [d3.min(dataset, function(d){return d.time;}), 
    //                   d3.max(dataset, function(d){return d.time;}), ];

    var time_range = [lower_time_limit, upper_time_limit];
    var count_range = [d3.min(dataset, function(d) { return d.counts; }),
                        d3.max(dataset, function(d) { return d.counts; })];
    // D3 smart scale                    
    var yScale = d3.scale.linear() .domain(count_range) .range([h,0]);
    var xScale = d3.time.scale()
                    .range([0, w])
                    .domain(time_range);

    // brush
    var brush = d3.svg.brush()
        .x(xScale)
        .extent([lower_time_limit, upper_time_limit])
        .on("brushend", function() {
          // handle the period before the brush stops 
          if (!d3.event.sourceEvent) return; 

          var extent0 = brush.extent();
          var extent1 = extent0.map(d3.time.day.round);
 

          // if empty when rounded, use floor & ceil instead
          // .ceil returns the ceiling, -1 makes it the selected day
          if (extent1[0] >= extent1[1]) {
             extent1[0] = d3.time.day.offset(d3.time.day.ceil(extent0[0]), -1);
             extent1[1] = d3.time.day.offset(d3.time.day.ceil(extent0[1]), 0);
          }
          // handle extent out of range
          if (extent1[0] < lower_time_limit) {
              extent1[0] = d3.time.day.ceil(lower_time_limit);
          }
          // handle extent out of range
          if (extent1[1] > upper_time_limit) {
            extent1[1] = d3.time.day.ceil(upper_time_limit);
          }
        
          d3.select(this).transition()
              .call(brush.extent(extent1))
              .call(brush.event);
              //d3.select(this).call(brush.extent(extent1));

            update_view(extent1);

          start_time = extent1[0].getTime();
          end_time = extent1[1].getTime();
          barplot.init();

        })

    // draw chart
    var area = d3.svg.area()
                .interpolate("basis")
                .x(function(d){return xScale(d.date);})
                .y0(h)
                .y1(function(d) {return yScale(d.counts); });
    
    svg.append("path")
      .datum(dataset)
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", '#aec7e8');

     var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom');
      var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient('left')
                  .ticks(3);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var gBrush = svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.event);
     
     gBrush.selectAll("rect")
      .attr("height", h);         
     
  };
  
  var current_range;
  
  // function to update range of brush
  var update_view = function(range){
    current_range = range;   
    // update the lineplot
    lineplot.update(range);
  };

  // function to initiate 
  var init = function(){
    //initCanvasSize();
      // read in static data tables 
      var parseformat = d3.time.format("%d-%b-%y").parse;
      d3.csv("weeksum.csv", function(data){
      dataset = data.map(function(d) {
        return {
          // time: Date.parse(d['week']), 
          date: parseformat(d['week']),
          counts: +d.counts
        }
      });
      draw(dataset);
    });
  };

  // function to redraw brush
  var redraw = function(){
    d3.select("div#brush svg").remove();
    //initCanvasSize();
    draw(dataset);
    // console.log(current_range);
    update_view(current_range);
    barplot.init;
  };

  return {
    init: init,
    redraw: redraw,
    dataset: function() { return dataset; }
  };
};