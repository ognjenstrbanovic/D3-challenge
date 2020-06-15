// Setting the SVG width and height in pixels
var svgWidth = 850;
var svgHeight = 500;

// 50 pixel margins all around
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Standard convention for calculating width and height of the plot area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(myData) {

    // Step 1: Parse Data/Cast as numbers; + is the same as parseInt()
    // ==============================
    myData.forEach(function(data) {
      data.smokes = +data.smokes;
      data.age = +data.age;
    });

    // Step 2: Create scale functions using es6
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(myData, d => d.smokes)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(myData, d => d.age)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles - for scatter plot points
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(myData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.age))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5")
    .select("text")
    .data(myData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.smokes))
    .attr("y", d => yLinearScale(d.age) + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .text(function(d) {
        return d.abbr
    });
});