/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select('#chart-area')
    .append('svg')
        .attr('width', 500)
        .attr('height', 400);

svg.append('circle')
  .attr('r',25)
  .attr('cx',50)
  .attr('cy',50)
  .attr('fill','purple')

svg.append('rect')
  .attr('height', 100)
  .attr('width', 200)
  .attr('x', 200)
  .attr('y', 250)
  .attr('fill', 'orange')

svg.append('line')
  .attr('x1', 190)
  .attr('y1', 60)
  .attr('x2', 90)
  .attr('y2', 180)
  .attr('stroke', 'pink')
  .attr('stroke-width', 10)

svg.append('ellipse')
  .attr('cx', 380)
  .attr('cy',150)
  .attr('rx', 80)
  .attr('ry', 50)
  .attr('fill', 'teal')