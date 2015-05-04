var lineplot_generator = function(){
  var margin = {top: 20, right: 0, bottom: 20, left: 40},
      height = 500 - margin.top - margin.bottom,
      cell_height = 40,
      canvas_width,
      width = 550 - margin.left - margin.right
      width_legend = 200;


  // month number start from 0!!!
  var upper_time_limit = new Date(2014, 06 - 1, 01);
  var lower_time_limit = new Date(2013, 09 - 1, 22);
  var current_range = [lower_time_limit, upper_time_limit];
  var dateDiff = function(from, to) {
      var milliseconds = to - from;
      return milliseconds / 86400000;
    };

 
    // color.domain(category_domain.reverse());
 var update_view = function(time_range){
    // color.domain(category_domain);
    
    // if not called with a time range
    if(typeof time_range !== 'undefined'){
      current_range = time_range;
    }
    var days = dateDiff(current_range[0], current_range[1]);
    if( days < 60){
      update_data(1);
    }else{
      update_data(7);
    }
     d3.select("div#lineplot svg").remove();       
      // tell scale function the domain         
      var x = d3.time.scale().range([0, width]),
          y = d3.scale.linear().range([height, 0]);  
      x.domain(current_range);

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
                .attr("width", width )
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
                       .attr("class", "stackarea")
                       .attr("width", width);

      stackarea.append("path")
          .attr("class", "area")
          .attr("width", width)
          .attr("d", function(d) { return area(d.values); })
          .style("fill", function(d) { return color(d.key); })
          
          .on("mouseover", function(d) {
            d3.select("#tooltip")
              .select("#value")
              .text(d.key)
              .style("left", d3.event.pageX)
              .style("top", d3.event.pageY)
              .style("color", this.style.fill)
              .style("opacity", 0.9);
            d3.select("#tooltip").classed("hidden", false);

          })

          .on("mousemove", function(d) {

            var SVGmouseTip = d3.select("#tooltip");
            // get mouse position
            var mouseCoords = d3.mouse(
                 SVGmouseTip.node().parentElement);
            // get absolute mouth position
            SVGmouseTip.attr("transform", "translate("
                              + (mouseCoords[0] - 10) + "," 
                              + (mouseCoords[1] + 10) + ")");
            d3.select("#tooltip")
            .style("left", Math.max(0, d3.event.pageX - 150) + "px")
            .style("top", (d3.event.pageY + 20) + "px");
                   
            d3.select("#tooltip")
              .select("#value")
              .text(d.key)
              .style("font-size", "20px")
              .style("left", d3.event.pageX)
              .style("top", d3.event.pageY);
               //return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");

            // add stroke and highlight
            d3.select("#tooltip").classed("hidden", false);
            var curColor = this.style.fill;
            var newColor = Darken(curColor,0.4);
            d3.select(this)
              .attr("stroke", "black")
              .attr("stroke-width", 1)
              .style("fill", newColor);
        
         })

          .on("mouseout", function(d) {
            d3.select("#tooltip").classed("hidden", true);
            d3.select(this)
              .transition()
              .duration(250)
              .attr("stroke", "none")
              .style("fill", color(d.key));
          })

      // });

      // Draw the xAxis text
      var days = dateDiff(current_range[0], current_range[1])
      var xAxis = d3.svg.axis()
                  .scale(x)
                  .ticks(6)
                  .orient('bottom');
      var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient('left');

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("count");

      // define number of levels
      var nlevel = data.length;  
      // define maximum legend height
      var maxBlockheight = height/14;
      // define all categories in reverse order
      var categories = [];
      // data.forEach(function(d){categories.push(d.key)});
      // categories.reverse();
      categories = category_domain.slice(0);

      categories.reverse();

      // new svg for legend
      var legend_svg = d3.select("#lineplot")
                   .append("svg")
                   .attr("width", width_legend )
                   .attr("height", height + margin.top + margin.bottom)
                   .append("g")
                   // .attr("transform", "translate(0," + margin.top + ")");
                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    "translate(" + margin.left + "," + margin.top + ")"

      var legend = legend_svg.selectAll(".legend")
                      .data(categories)
                      .enter().append("g")
                      .attr("class", "legend")
                      .attr("transform", function(d, i) { return "translate(0," + i * Math.min(height / nlevel, maxBlockheight) + ")"; });
      

      legend.append("rect")
          .attr("x", 0)
          .attr("width", Math.min(height / nlevel, maxBlockheight))
          .attr("height", Math.min(height / nlevel, maxBlockheight))
          .style("fill", function(d) { return color(d); });

      var totalY = nlevel * Math.min(height / nlevel, maxBlockheight);

      legend.append("text")
          .attr("x", 0)
          .attr("dx", Math.min(height / nlevel, maxBlockheight))
          .attr("y", Math.min(height / nlevel, maxBlockheight))
          .attr("dy", -7)
          .attr("font-family", "sans-serif")
          .attr("font-size", "13px")
          .style("text-anchor", "start")
          .text(function(d) { return d; });  

            
  };  
  var update_data = function(nday){
      // var that = this;
      $("#lineplot").empty();
      //initCanvasSize();
      svg = d3.select("div#lineplot"); 


      var parseformat = d3.time.format("%Y-%m-%d").parse;


      // function to return to closest bin start value
      var binTime = function(time, nday){
        return lower_time_limit.getTime() + Math.floor(((time.getTime() - lower_time_limit.getTime()) / (nday*86400000))) * (nday*86400000);
      }

       
      // data structure:
      // {key: math, 
      //  value: [{key: some_date, value: counts}, {...}, {...}]}
       data = d3.nest()
                .key(function(d) { return d.category;})
                .sortKeys(function(a,b) { return category_domain.indexOf(a) - category_domain.indexOf(b);})
                  .key(function(d) { return binTime(parseformat(d.check_in_date), nday);}) 
                  .sortKeys(d3.ascending)
                  .rollup(function(leaves) { return leaves.length; })
                  .entries(currJSON);

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

        // find all dates
        var allDates = makeAllKeys(nday);

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


        data.forEach(function(d) {
           d.subject = d.key;
           d.values.forEach(function(c){
            c.date = new Date;
            c.date.setTime(+c.key);
            c.counts = c.values;
           })
          });


        this.data = data;
        
  }; 

function Darken(hexColor, factor){ 
        if ( factor < 0 ) factor = 0;

        var c = hexColor;
        if ( c.substr(0,1) == "#" )
        {
            c = c.substring(1);
        }

        if ( c.length == 3 || c.length == 6 )
        {
            var i = c.length / 3;

            var f;  // the relative distance from white

            var r = parseInt( c.substr(0, i ), 16 );
            f = ( factor * r / (256-r) );
            r = Math.floor((256 * f) / (f+1));

            r = r.toString(16);
            if ( r.length == 1 ) r = "0" + r;

            var g = parseInt( c.substr(i, i), 16);
            f = ( factor * g / (256-g) );
            g = Math.floor((256 * f) / (f+1));
            g = g.toString(16);
            if ( g.length == 1 ) g = "0" + g;

            var b = parseInt( c.substr( 2*i, i),16 );
            f = ( factor * b / (256-b) );
            b = Math.floor((256 * f) / (f+1));
            b = b.toString(16);
            if ( b.length == 1 ) b = "0" + b;

            c =  r+g+b;
         }   

         return "#" + c;
}


  var init = function(nday){
        update_data(7);
        update_view();
        
  }; 

  return {
    init: init,
    update: update_view
  }; 
};