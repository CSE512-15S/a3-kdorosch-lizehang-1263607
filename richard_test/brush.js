// Slider area
var brush_generator = function(){
  
  // svg attributes
  var margin = {top: 20, right: 10, bottom: 20, left: 40},
        canvas_width,
        w,
        h = 60;
        barPadding = 1;
        // height2 = 500 - margin2.top - margin2.bottom;

  var initCanvasSize = function(){
      canvas_width = +(d3.select('#brush').style('width').replace('px', ''));
      w = canvas_width - margin.left - margin.right;
  };

  // parse time from format in JSON
  var parseformat = d3.time.format("%Y-%m-%d");
  var upper_time_limit = new Date(2014, 06, 01);
  var lower_time_limit = new Date(2013, 08, 22);

  var dataset = [];

  // function to draw the brush area
  var draw = function(dataset){
    var svg = d3.select("#brush")
                .append("svg")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  
            
    var time_range = [d3.min(dataset, function(d){return d.time;}), 
                      d3.max(dataset, function(d){return d.time;}), ];

    var count_range = [d3.min(dataset, function(d) { return d.counts; }),
                        d3.max(dataset, function(d) { return d.counts; })];
    // D3 smart scale                    
    var yScale = d3.scale.linear()
                         .domain(count_range)
                         .range([0.05*h,h])
                         .nice();
    var tScale = d3.time.scale()
                        .domain(time_range)
                        // .nice()
                        .range([0,w]);
    // brush
    var brush = d3.svg.brush()
        .x(tScale)
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
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr({
          x: function(d, i) { return i* (w/dataset.length);},
          y: function(d) { return h - yScale(d.counts);},
          width: w / dataset.length - barPadding,
          height: function(d) { return yScale(d.counts);},
          fill: "royalblue"
      })   
     
     //TODO grid etc.


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
    initCanvasSize();
      // read in static data tables 
      var parseformat = d3.time.format("%d-%b-%y").parse;
      d3.csv("weeksum.csv", function(data){
      dataset = data.map(function(d) {
        return {
          // time: Date.parse(d['week']), 
          time: parseformat(d['week']),
          counts: +d.counts
        }
      });
      // console.log(dataset);
      draw(dataset);
    });

    // read data
    // TODO: finish here
    // d3.csv() or d3.json()
  };

  // function to redraw brush
  var redraw = function(){
    d3.select("div#brush svg").remove();
    initCanvasSize();
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