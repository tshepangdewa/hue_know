import BubbleChart from "./BubbleChart";
import BarChart from "./BarChart";

export default function Results({
  palette,
}) {
  if (!palette?.length) {
    return (
      <section
        id="results"
        aria-live="polite"
      >
        <h2>Your color palette</h2>

        <p>
          Upload an image to discover its
          three dominant colors.
        </p>
      </section>
    );
  }

  return (
    <section
      id="results"
      aria-live="polite"
    >
      <h2>Your color palette</h2>

      <div className="results-views">
        <div className="results-view">
          <h3>Bubbles</h3>
          <BubbleChart palette={palette} />
        </div>

        <div className="results-view">
          <h3>Bars</h3>
          <BarChart palette={palette} />
        </div>
      </div>
    </section>
  );
}