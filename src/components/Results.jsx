import { useState } from "react";
import BubbleChart from "./BubbleChart";
import BarChart from "./BarChart";
import ColorDetails from "./ColorDetails";

export default function Results({
  palette,
}) {
  const [view, setView] = useState("bubbles");

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

      <div
        className="view-toggle"
        role="group"
        aria-label="Choose palette view"
      >
        <button
          type="button"
          className={
            view === "bubbles"
              ? "is-active"
              : ""
          }
          onClick={() =>
            setView("bubbles")
          }
          aria-pressed={
            view === "bubbles"
          }
        >
          Bubbles
        </button>

        <button
          type="button"
          className={
            view === "bars"
              ? "is-active"
              : ""
          }
          onClick={() =>
            setView("bars")
          }
          aria-pressed={view === "bars"}
        >
          Bars
        </button>
      </div>

      <div className="results-view">
        {view === "bubbles" ? (
          <BubbleChart
            palette={palette}
          />
        ) : (
          <BarChart
            palette={palette}
          />
        )}
      </div>

      <ColorDetails palette={palette} />
    </section>
  );
}