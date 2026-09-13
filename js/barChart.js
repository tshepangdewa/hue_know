const BarChart = {
  render(palette, container) {
    container.innerHTML = '';

    const width = container.clientWidth || 700;
    const height = Math.max(300, palette.length * 70);
    const margin = {
      top: 20,
      right: 30,
      bottom: 30,
      left: 150
    };

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(palette, d => d.percentage)])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleBand()
      .domain(palette.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.25);

    svg
      .selectAll('.bar')
      .data(palette)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', margin.left)
      .attr('y', d => y(d.name))
      .attr('width', d => x(d.percentage) - margin.left)
      .attr('height', y.bandwidth())
      .attr('fill', d => d.hex)
      .attr('rx', 6);

    svg
      .selectAll('.label')
      .data(palette)
      .enter()
      .append('text')
      .attr('x', d => x(d.percentage) + 8)
      .attr('y', d => y(d.name) + y.bandwidth() / 2)
      .attr('dominant-baseline', 'middle')
      .style('font-size', '13px')
      .style('font-weight', '600')
      .text(d => `${d.percentage.toFixed(1)}%`);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          .ticks(5)
          .tickFormat(d => `${d}%`)
      );

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '13px');
  }
};

window.BarChart = BarChart;