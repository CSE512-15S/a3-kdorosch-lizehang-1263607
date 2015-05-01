var brush;

$(document).ready(function(){
  // Fetch the current JSON we will work on;


  SelectDimension();
  // SelectDimension();
  lineplot = lineplot_generator();
  brush = brush_generator();
  barplot = barplot_generator();
  
  lineplot.init();
  brush.init();
  barplot.init();

  console.log(barplot);
});

$(window).resize(function(){
  lineplot.initCanvasSize();
  brush.redraw();
});

