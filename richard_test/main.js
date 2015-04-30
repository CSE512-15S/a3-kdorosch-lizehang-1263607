var brush;

$(document).ready(function(){
  console.log("seems ok");
  lineplot = lineplot_generator();
  brush = brush_generator();
  brush.init();
  lineplot.init();
});

$(window).resize(function(){
  brush.redraw();
});