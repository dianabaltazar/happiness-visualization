// set the dimensions and margins of the graph
var margin = {top: 60, right: 15, bottom: 50, left: 55},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#map")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data2.csv", function(data) {
  // group the data: one array for each value of the X axis.
  var sumstat = d3.nest()
    .key(function(d) { return d.date2;})
    .entries(data);

  // Stack the data: each group will be represented on top of each other
  var mygroups = ["No measures", "Recommended", "Required (only at some levels)", "Required (all levels)"] // list of group names
  var mygroup = [0,1,2,3] // list of group names
  var stackedData = d3.stack()
    .keys(mygroup)
    .value(function(d, key){
      return d.values[key].total_cases
    })
    (sumstat)
   

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.date2; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

    // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height+40 )
    .text("Fist 100 days");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.total_cases; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

    // Add Y axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", -20 )
    .text("Covid cases")
    .attr("text-anchor", "start")

  // color palette
  var color = d3.scaleOrdinal()
    .domain(mygroups)
    .range(['#4059AD','#6B9AC4','#97D8C4','#EFF2F1','#F4B942'])

//   // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .style("fill", function(d) { name = mygroups[d.key-1] ;  return color(name); })
      .attr("d", d3.area()
        .x(function(d, i) { return x(d.data.key); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )


  // Add one dot in the legend for each name.
  // List of groups = header of the csv files
  var keys = data.school_closures.slice(1)
  var size = 20
  svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
      .attr("x", 600 + size*1.2)
      .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){ return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "left")
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)



})
