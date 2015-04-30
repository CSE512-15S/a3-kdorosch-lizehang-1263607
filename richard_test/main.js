var brush;

$(document).ready(function(){
  // Fetch the current JSON we will work on;

  // SelectDimension();
  lineplot = lineplot_generator();
  brush = brush_generator();
  var barplot = barplot_generator();
  lineplot.init();
  brush.init();
  barplot.init();
});

$(window).resize(function(){
  brush.redraw();
});

