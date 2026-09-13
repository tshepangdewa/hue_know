const BubbleChart = {
  render(palette, container) {
    container.innerHTML = '';

    const width = container.clientWidth || 700;
    const height = 500;

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const root = d3
      .hierarchy({
        children: palette
      })
      .sum(d => d.percentage);

    const pack = d3
      .pack()
      .size([width, height])
      .padding(8);

    const nodes = pack(root).leaves();

    const bubbles = svg
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    bubbles
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d.data.hex)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    bubbles
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.15em')
      .style('fill', '#ffffff')
      .style('font-weight', '600')
      .style('font-size', d => `${Math.max(11, Math.min(d.r / 2.5, 20))}px`)
      .text(d => d.data.name);

    bubbles
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('fill', '#ffffff')
      .style('font-size', d => `${Math.max(9, Math.min(d.r / 3.5, 14))}px`)
      .text(d => `${d.data.percentage.toFixed(1)}%`);
  }
};

window.BubbleChart = BubbleChart;