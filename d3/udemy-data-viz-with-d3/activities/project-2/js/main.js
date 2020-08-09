/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*
*    References: 
*        https://www.d3indepth.com/scales/
*        https://gist.run/?id=775cf431e64b6718481c06fc45dc34f9
*/

let dataIndex = 0;

const margin = {
  left: 100,
  right: 10,
  top: 50,
  bottom: 50
};

const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('#chart-area').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom);

const chart = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

var xAxisGroup = chart.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${height})`)

var yAxisGroup = chart.append('g')
  .attr('class', 'y-axis')

// create x-axis
var x = d3.scaleLog()
  .domain([300, 150000])
  .range([0, width])
  .base(10);

// create y-axis        
var y = d3.scaleLinear()
  .domain([0, 90])
  .range([height, 0]);

// create scale for circle areas
var sqrtScale = d3.scaleSqrt()
  .range([5, 25])

// X label
var xLabel = chart.append('text')
  .attr('class', 'x-axis-label')
  .attr('x', width / 2)
  .attr('y', height + 40)
  .attr('font-size', '18px')
  .attr('text-anchor', 'middle')
  .text('GDP Per Capita ($)');
  
// Y label 
var yLabel = chart.append('text')
.attr('class', 'y-axis-label')
  .attr('x', - height/2)
  .attr('y', -40)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Life Expectancy (Years)');

// year label 
var yearLabel = chart.append('text')
.attr('class', 'y-axis-label')
  .attr('x', width - 70)
  .attr('y', height - 80)
  .attr('font-size', '30px')
  .attr('fill','#777')

// set color scheme  
const color = d3.scaleOrdinal(d3['schemeSet2'])

// load data
d3.json("data/data.json").then(function(data){
  
  // remove countries if there are any null values
  data.forEach((d) => {
    d.countries = d.countries.filter(country => country.population && country.income && country.life_exp)
  });

  d3.interval(function () {
    update(data);
  }, 100)

  update(data);
})

function update(data) {
  const currentYearData = data[dataIndex]; 
  const countries = currentYearData.countries;
  console.log(countries);

  // create x-axis call
  var xAxisCall = d3.axisBottom(x)
        .tickValues([400,4000,40000])
        .tickFormat(d => '$' + d);
  xAxisGroup.call(xAxisCall);

  // create y-axis call
  var yAxisCall = d3.axisLeft(y)
  yAxisGroup.call(yAxisCall);

  sqrtScale.domain([d3.min(countries, d => d.population), d3.max(countries, d => d.population)])

  // JOIN new data with old elements.
  var circles = chart.selectAll('circle')
    .data(countries, d => d.income);

  // EXIT old elements not present in new data.
  circles.exit()
      .attr('fill','red')
        .attr('cy', y(0))
        .remove();

  // ENTER new elements present in new data
  circles.enter()
    .append('circle')
      .attr('fill', d => color(d.continent))
      .attr('cx', d => x(d.income))
      .attr('r', d => sqrtScale(d.population))
    // AND UPDATE old elements present in new data
    .merge(circles)
      .attr('cx', d => x(d.income))
      .attr('cy', d => y(d.life_exp))
  
    yearLabel.text(currentYearData.year);
    console.log(currentYearData.year);

  if(dataIndex === (data.length - 1)) {
    dataIndex = 0
    console.log('back to start') 
  } else {
    dataIndex++
    console.log(`next: ${dataIndex}`)
  }
}
