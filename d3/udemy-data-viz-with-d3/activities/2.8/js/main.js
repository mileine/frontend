/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/


d3.json('data/buildings.json').then(function(data) {
  
  data.forEach( d => {
    d.height = + d.height;
  });

  const svg = d3.select('#chart-area').append('svg')
          .attr('width', 500)
          .attr('height', 500);

  var rects = svg.selectAll('rect')
    .data(data);

  rects.enter()
    .append('rect')
      .attr('x', (d,i) => i * 70)
      .attr('y', 0)
      .attr('width', 50)
      .attr('height', d => d.height)
      .attr('fill', 'gray')
})