import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { copyToClipboard } from "../utils/clipboard";

export default function BarChart({
  palette,
}) {
  const svgRef = useRef(null);
  const [copiedHex, setCopiedHex] = useState("");

  useEffect(() => {
    if (!svgRef.current || !palette?.length) {
      return;
    }

    const width = 700;
    const barHeight = 64;
    const gap = 24;

    const height =
      palette.length * barHeight +
      (palette.length - 1) * gap;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg
      .attr(
        "viewBox",
        `0 0 ${width} ${height}`
      )
      .attr("role", "img")
      .attr(
        "aria-label",
        "Dominant colors bar chart"
      );

    const groups = svg
      .selectAll("g")
      .data(
        palette,
        (color) => color.id
      )
      .join("g")
      .attr(
        "transform",
        (_, index) =>
          `translate(0, ${
            index * (barHeight + gap)
          })`
      );

    groups
      .append("rect")
      .attr("width", width)
      .attr("height", barHeight)
      .attr("rx", 12)
      .attr("fill", "#F2F1ED");

    groups
      .append("rect")
      .attr("width", 0)
      .attr("height", barHeight)
      .attr("rx", 12)
      .attr(
        "fill",
        (color) => color.hex
      )
      .style("cursor", "pointer")
      .on("click", async (_, color) => {
        const copied = await copyToClipboard(
          color.hex
        );

        if (copied) {
          setCopiedHex(color.hex);

          setTimeout(() => {
            setCopiedHex("");
          }, 1500);
        }
      })
      .transition()
      .delay((_, index) => index * 100)
      .duration(700)
      .ease(d3.easeCubicOut)
      .attr(
        "width",
        (color) =>
          (color.percentage / 100) *
          width
      );

    groups
      .append("text")
      .attr("x", 20)
      .attr("y", barHeight / 2)
      .attr(
        "dominant-baseline",
        "middle"
      )
      .attr("fill", (color) =>
        getTextColor(color.rgb)
      )
      .style(
        "font-family",
        "Geist, Arial, sans-serif"
      )
      .style("font-weight", "600")
      .style("pointer-events", "none")
      .text(
        (color) =>
          `${color.name} · ${color.percentage}%`
      );
  }, [palette]);

  return (
    <div className="bar-chart">
      <svg ref={svgRef} />

      {copiedHex && (
        <p className="copy-feedback">
          Copied {copiedHex}
        </p>
      )}
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