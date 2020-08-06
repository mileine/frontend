/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var margin = { left:100, right:10, top:10, bottom:150 };

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

const svg = d3.select('#chart-area')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

const g = svg.append('g')
      .attr('transform',`translate(${margin.left},${margin.top})`)

// X label
g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', width / 2)
    .attr('y', height +  140)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text("The world's tallest buildings");

// Y label
g.append('text')
  .attr('class', 'y axis-label')
  .attr('x', - (height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Height (m)');

d3.json('data/buildings.json').then(function(data) {
  
  data.forEach( d => {
    d.height = + d.height;
  });

  var rects = g.selectAll('rect')
    .data(data);

  var x = d3.scaleBand()
      .domain(data.map( d => d.name))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

  var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.height)])
      .range([height, 0]);

  var xAxisCall = d3.axisBottom(x);
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxisCall)
    .selectAll('text')
      .attr('y', 10)
      .attr('x', -5)
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-40)')

  var yAxisCall = d3.axisLeft(y)
      .ticks(3)
      .tickFormat(d => d + 'm');
  g.append('g')
    .attr('class','y-axis')
    .call(yAxisCall)

  rects.enter()
    .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.height))
      .attr('width', x.bandwidth)
      .attr('height', d => height - y(d.height))
      .attr('fill', 'gray')
})