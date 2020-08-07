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

const canvas = d3.select('#chart-area');

const svg = canvas.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

const chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

// Load data 
d3.json('data/revenues.json').then(function (data) {
        
        // create x-axis
        var x = d3.scaleBand()
                .domain(data.map(d => d.month))
                .range([0, width])
                .paddingInner(0.3)
                .paddingOuter(0.3);
        
        // create y-axis        
        var y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.revenue)])
                .range([height, 0]);

        // create x-axis call
        var xAxisCall = d3.axisBottom(x);
        chart.append('g')
                .attr('class', 'x-axis')
                .attr('transform',`translate(0, ${height})`)
                .call(xAxisCall);

        // create y-axis call
        var yAxisCall = d3.axisLeft(y)
                .tickFormat(d => '$' + d)
        chart.append('g')
                .attr('class','y-axis')
                .call(yAxisCall);
                        
        // X label
        chart.append('text')
                .attr('class','x-axis-label')
                .attr('x', width / 2)
                .attr('y', height + 50)
                .attr('font-size','18px')
                .attr('text-anchor','middle')
                .text('Month');

        // Y label 
        chart.append('text')
                .attr('class','y-axis-label')
                .attr('x', - (height / 2))
                .attr('y', -60)
                .attr('font-size','20px')
                .attr('text-anchor','middle')
                .attr('transform','rotate(-90)')
                .text('Revenue');


        // draw rects
        var rects = chart.selectAll('rect')
                .data(data);
        
        rects.enter()
                .append('rect')
                        .attr('x', d => x(d.month))
                        .attr('y', d => y(d.revenue))
                        .attr('width', x.bandwidth)
                        .attr('height', d => height - y(d.revenue))
                        .attr('fill','gray')
})