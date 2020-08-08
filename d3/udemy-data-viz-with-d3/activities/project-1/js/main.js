/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

const margin = {
  left: 100,
  right: 10,
  top: 50,
  bottom: 50
};

const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

let flag = true;

const t = d3.transition().duration(750)

const canvas = d3.select('#chart-area');

const svg = canvas.append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom);

const chart = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

var x, y;

var xAxisGroup = chart.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${height})`)

var yAxisGroup = chart.append('g')
.attr('class', 'y-axis')

// create x-axis
x = d3.scaleBand()
  .range([0, width])
  .paddingInner(0.3)
  .paddingOuter(0.3);

// create y-axis        
y = d3.scaleLinear()
  .range([height, 0]);

// X label
var xLabel = chart.append('text')
  .attr('class', 'x-axis-label')
  .attr('x', width / 2)
  .attr('y', height + 50)
  .attr('font-size', '18px')
  .attr('text-anchor', 'middle')
  .text('Month');

// Y label 
var yLabel = chart.append('text')
  .attr('class', 'y-axis-label')
  .attr('x', -(height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Revenue');

// Load data 
d3.json('data/revenues.json').then(function (data) {

  // Clean data
  data.forEach(function(d) {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  })

  d3.interval(function () {
    var newData = flag ? data : data.slice(1);
    update(newData);
    flag = !flag;
  }, 1000)
  
  // Run the vis for the first time
  update(data);
})

function update(data) {
  
  var value = flag ? "revenue" : "profit";
  
  x.domain(data.map(d => d.month));
  y.domain([0, d3.max(data, d => d[value])]);

  // create x-axis call
  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.transition(t).call(xAxisCall);

  // create y-axis call
  var yAxisCall = d3.axisLeft(y)
    .tickFormat(d => '$' + d)
  yAxisGroup.transition(t).call(yAxisCall);

  // JOIN new data with old elements.
  var rects = chart.selectAll('rect')
    .data(data, d => d.month);

  // EXIT old elements not present in new data.
  rects.exit()
      .attr('fill','red')
      .transition(t)
        .attr('y', y(0))
        .attr('height', 0)
        .remove();

  // ENTER new elements present in new data
  rects.enter()
    .append('rect')
      .attr('fill', 'gray')
      .attr('y', y(0))
      .attr('height', 0)
      .attr('x', d => x(d.month))
      .attr('width', x.bandwidth)
    // AND UPDATE old elements present in new data
    .merge(rects)
    .transition(t)
      .attr('x', d => x(d.month))
      .attr('width', x.bandwidth)
      .attr('y', d => y(d[value]))
      .attr('height', d => height - y(d[value]))

  let label = flag ? "Revenue" : "Profit";
  yLabel.text(label);
}