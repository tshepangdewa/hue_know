import BubbleChart from "./BubbleChart";

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

      <BubbleChart palette={palette} />
    </section>
  );
}