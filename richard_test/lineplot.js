var lineplot_generator = function(){
  var margin = {top: 50, right: 10, bottom: 100, left: 40},
      height = 500 - margin.top - margin.bottom,
      cell_height = 40,
      canvas_width,
      width = 960 - margin.left - margin.right;
  
  var initCanvasSize = function(){
      canvas_width = +(d3.select('#lineplot').style('width').replace('px', ''));
      width = canvas_width - margin.left - margin.right;
  };

  var upper_time_limit = new Date(2014, 06, 01);
  var lower_time_limit = new Date(2013, 09, 22);
  var current_range = [lower_time_limit, upper_time_limit];

  var dateDiff = function(from, to) {
      var milliseconds = to - from;
      return milliseconds / 86400000;
    };

  
  
  
  var update_view = function(time_range){
    
    // if not called with a time range
    if(typeof time_range !== 'undefined'){
      current_range = time_range;
      console.log(time_range);
    }
    //TODO update stack area
     d3.select("div#lineplot svg").remove();
     var xScale = d3.time.scale()
      .range([0, width])
      .domain(current_range);

      // create scale function
      var x = d3.time.scale().range([0, width]),
          y = d3.scale.linear().range([height, 0]);  
      // tell scale function the domain    
       // x.domain(d3.extent(data.map(function(d) { return d.date; })));
       x.domain(current_range);
       y.domain([0, d3.max(data.map(function(d) { return d.counts; }))]);

      // create a area
       var area = d3.svg.area()
            // .interpolate("monotone")
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) {console.log(y(d.counts));return y(d.counts); });

      var svg = d3.select("#lineplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      svg.append("defs").append("clipPath")
          .attr("id", "clip")
          .append("rect")
          .attr("width", width)
          .attr("height", height);

      var focus = svg.append("g")
          .attr("class", "focus")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Draw the xAxis text
      var days = dateDiff(current_range[0], current_range[1])
      var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient('bottom');

      // TODO: smart axis depending on the range of days    
      if( days < 1000)
       xAxis.ticks(d3.time.month, 1)
            .tickFormat(d3.time.format('%b-%y'));

      svg.append("g")
          .attr("class", "x grid")
          .call(xAxis);

     
       focus.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

      focus.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

            
  }; 

  var init = function(){
        var that = this;
        initCanvasSize();
        svg = d3.select("div#lineplot"); 

       var parseformat = d3.time.format("%d-%b-%y").parse;
      
      d3.csv("students_data_v2.csv", function(error, csv_data) {
       var data = d3.nest()
        .key(function(d) { return d['checkin date'];})
        .rollup(function(leaves) { return leaves.length; }).entries(csv_data);
        // .rollup(function(d) { 
        //  return d3.sum(d, function(g) {return g.value; });
        // }).entries(csv_data);

        data.forEach(function(d) {
           d.date = parseformat(d.key);
           d.counts = d.values;
          });

        // sort date
        function sortByDateAscending(a, b) {
            // Dates will be cast to numbers automagically:
            return a.date - b.date;
        }

        data = data.sort(sortByDateAscending);

        this.data = data;
        update_view();
      });
        // d3.csv("daysum.csv", function(error, data) {
        //   if (error) return console.warn(error);
        //   this.data = data;
        //   console.log(data);
        //   for(var i=0; i<data.length; i++) {
        //     // data[i].subject = data[i].subject;
        //     data[i].date = parseformat(data[i].date);
        //     data[i].counts = +data[i].counts;
        //   }

        //   update_view();
        // }); 
  }; 

  return {
    init: init,
    initCanvasSize: initCanvasSize,
    update: update_view
  }; 
};