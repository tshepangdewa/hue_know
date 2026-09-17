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
      .hierarchy({ children: palette })
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
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        ColorUtils.copyToClipboard(d.data.hex).then(() => {
          this.showToast(`Copied ${d.data.hex} (${d.data.name}) to clipboard!`);
        });
      });

    bubbles
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d.data.hex)
      .attr('stroke', 'rgba(0,0,0,0.08)')
      .attr('stroke-width', 2);

    bubbles
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.15em')
      .style('fill', d => ColorUtils.getContrastColor(d.data.hex))
      .style('font-weight', '600')
      .style('font-size', d => `${Math.max(10, Math.min(d.r / 2.8, 18))}px`)
      .style('pointer-events', 'none')
      .text(d => d.data.name);

    bubbles
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('fill', d => ColorUtils.getContrastColor(d.data.hex))
      .style('opacity', 0.85)
      .style('font-size', d => `${Math.max(9, Math.min(d.r / 3.5, 13))}px`)
      .style('pointer-events', 'none')
      .text(d => `${d.data.percentage.toFixed(1)}%`);
  },

  showToast(message) {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-msg';
      toast.style.cssText = `
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        background: #121212; color: #fff; padding: 10px 20px; border-radius: 999px;
        font-size: 0.88rem; font-weight: 500; z-index: 100; transition: opacity 0.2s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2200);
  }
};

window.BubbleChart = BubbleChart;