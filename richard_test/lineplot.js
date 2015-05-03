var lineplot_generator = function(){
  var margin = {top: 0, right: 10, bottom: 0, left: 40},
      height = 500 - margin.top - margin.bottom,
      cell_height = 40,
      canvas_width,
      width = 550 - margin.left - margin.right;
  
  // var initCanvasSize = function(){
  //     canvas_width = +(d3.select('#lineplot').style('width').replace('px', ''));
  //     width = canvas_width - margin.left - margin.right;
  // };
  var color = d3.scale.category20();

  // month number start from 0!!!
  var upper_time_limit = new Date(2014, 06 - 1, 01);
  var lower_time_limit = new Date(2013, 09 - 1, 22);
  var current_range = [lower_time_limit, upper_time_limit];
  var dateDiff = function(from, to) {
      var milliseconds = to - from;
      return milliseconds / 86400000;
    };


 var update_view = function(time_range){
    
    // if not called with a time range
    if(typeof time_range !== 'undefined'){
      current_range = time_range;
    }
    //TODO update stack area
     d3.select("div#lineplot svg").remove();
     var xScale = d3.time.scale()
                    .range([0, width])
                    .domain(current_range);
     // var yScale = d3.scale.linear()
     //                .domain([0, d3.max(data.map(function(d) { return d.counts; }))]) 
     //                .nice();
       
      // tell scale function the domain         
      var x = d3.time.scale().range([0, width]),
          y = d3.scale.linear().range([height, 0]);  
      x.domain(current_range);
      // y.domain([0, d3.max(data.map(function(d) { return d.counts; }))]);

      // create a area
      var area = d3.svg.area()
                    .interpolate("basis")
                    .x(function(d) { return x(d.date); })
                    .y0(function(d) { return y(d.y0); })
                    .y1(function(d) { return y(d.y0 + d.y); });

      // create SVG 
      var stack = d3.layout.stack()
                    // .offset("expand")
                    .values(function(d) { return d.values; })
                    // .x(function(d) { return +d.key; })
                    .y(function(d) { return d.counts; });

      var svg = d3.select("#lineplot")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      // update the stack position for the data
      stack(data);
      // update Y axis
      maxY = d3.max(data, function(g) {
            return d3.max(g.values, function(y) { return y.y + y.y0; });
        });
      y.domain([0, maxY]);
      
      var stackarea = svg.selectAll(".stackarea")
                       .data(data)
                       .enter().append("g")
                       .attr("class", "stackarea");

      stackarea.append("path")
          .attr("class", "area")
          .attr("d", function(d) { return area(d.values); })
          .style("fill", function(d) { return color(d.key); });

     // svg.selectAll("path")
     //    .data(stack(data))
     //    .append("path")
     //    .attr("d", function(d) { return area(d.values); })
     //    .append("title")
     //    .text(function(d) { return d.subject; });

      // Draw the xAxis text
      var days = dateDiff(current_range[0], current_range[1])
      var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom');
      // var yAxis = d3.svg.axis()
      //             .scale(yScale)
      //             .orient('left');

      // smart axis depending on the range of days    
      // if( days < 1000)
      //  xAxis.ticks(d3.time.month, 1)
      //       .tickFormat(d3.time.format('%b-%Y'));
      // if( days < 90)
      //  xAxis.ticks(d3.time.week, 1)
      //       .tickFormat(d3.time.format('%d-%b'));
      // if( days < 14)
      //  xAxis.ticks(d3.time.day, 1)
      //       .tickFormat(d3.time.format('%d-%b'));

      svg.append("g")
          .attr("class", "x grid")

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

            
  };  

  var init = function(nday){
// <<<<<<< HEAD
//         var that = this;
//         //initCanvasSize();
//         svg = d3.select("div#lineplot"); 
// =======
      // var that = this;
      $("#lineplot").empty();
      //initCanvasSize();
      svg = d3.select("div#lineplot"); 


      var parseformat = d3.time.format("%Y-%m-%d").parse;


      // function to return to closest bin start value
      var binTime = function(time, nday){
        return lower_time_limit.getTime() + Math.floor(((time.getTime() - lower_time_limit.getTime()) / (nday*86400000))) * (nday*86400000);
      }
      // d3.csv("students_data_v4.csv", function(error, csv_data) {
       
      // data structure:
      // {key: math, 
      //  value: [{key: some_date, value: counts}, {...}, {...}]}
       data = d3.nest()
                .key(function(d) { return d.category;})
                .sortKeys(d3.ascending)
                .key(function(d) { return binTime(parseformat(d.check_in_date), nday);}) 
                .sortKeys(d3.ascending)
                .rollup(function(leaves) { return leaves.length; })
                .entries(currJSON);
                // .entries(csv_data);
        console.log(data);
        // for stack area plot, need all keys present in data
        // not sure what best practice to do this, make use of the time limit now
        // para: number of days as minimum interval (only integer days now)
        // return: numeric format, for easy comparison later
        makeAllKeys = function(nday) {
            allKeys = [];
            var time_diff = (upper_time_limit - lower_time_limit) 
            var n = time_diff / (nday * 86400000)
            for(var i = 0; i<n;i++) {  
                var d = new Date(lower_time_limit);
                d.setTime(lower_time_limit.getTime() + i * nday * 86400000)
                allKeys.push(d.getTime());
            }
            return allKeys;
        }
        // var test = makeAllKeys(1);
        // console.log(test);

        // find all dates
        var allDates = makeAllKeys(nday);
        //console.log(allDates);

        // out loop: for all subject, apply the function
        data = data.map(function(subjObj){
          return{
              key: subjObj.key,
              // inner loop: for all dates, find if in key set
              values: allDates.map(function(m){
                 var value = subjObj.values.filter(function(n){
                  return (m <= n.key && m + nday * 86400000 > n.key);
                })[0];
                 return value || ({key: m, values: 0});
              })
            };
        });

        //console.log(data);  

        // // Sort date
        // function sortByDateAscending(a, b) {
        //     return a.date - b.date;
        // }

        data.forEach(function(d) {
           d.subject = d.key;
           d.values.forEach(function(c){
            c.date = new Date;
            c.date.setTime(+c.key);
            c.counts = c.values;
           })
          });

       // console.log(data[1].values[0]);
       // console.log(data[2].values[0]);
       // console.log(data[3].values[0]);
       // console.log(data[4].values[0]);
       // console.log("first day should be:" + lower_time_limit);

        this.data = data;
        update_view();
      // });
        
  }; 

  return {
    init: init,
    // initCanvasSize: initCanvasSize,
    update: update_view
  }; 
};