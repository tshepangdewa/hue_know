import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BubbleChart({
  palette,
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !palette?.length) {
      return;
    }

    const width = 700;
    const height = 500;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr(
        "aria-label",
        "Dominant colors bubble chart"
      );

    const root = d3
      .hierarchy({
        children: palette,
      })
      .sum((color) => color.percentage);

    const pack = d3
      .pack()
      .size([width, height])
      .padding(12);

    const nodes = pack(root).leaves();

    const bubbles = svg
      .selectAll("g")
      .data(nodes, (node) => node.data.id)
      .join("g")
      .attr(
        "transform",
        (node) =>
          `translate(${node.x}, ${node.y})`
      );

    bubbles
      .append("circle")
      .attr("r", 0)
      .attr(
        "fill",
        (node) => node.data.hex
      )
      .attr(
        "aria-label",
        (node) =>
          `${node.data.name}, ${node.data.hex}, ${node.data.percentage}%`
      )
      .transition()
      .duration(600)
      .attr("r", (node) => node.r);

    bubbles
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", (node) =>
        getTextColor(node.data.rgb)
      )
      .style(
        "font-family",
        "Geist, Arial, sans-serif"
      )
      .style("font-weight", "600")
      .style("pointer-events", "none")
      .text((node) => node.data.name);
  }, [palette]);

  return (
    <div className="bubble-chart">
      <svg ref={svgRef} />
    </div>
  );
}

function getTextColor(rgb) {
  const brightness =
    (rgb.red * 299 +
      rgb.green * 587 +
      rgb.blue * 114) /
    1000;

  return brightness > 150
    ? "#242424"
    : "#FAF9F6";
}