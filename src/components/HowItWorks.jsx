const steps = [
  {
    icon: "/icons/upload.svg",
    alt: "Upload image",
    text: "Upload an image from your device.",
  },
  {
    icon: "/icons/analyze.svg",
    alt: "Analyze colors",
    text: "We analyze and group its colors.",
  },
  {
    icon: "/icons/explore.svg",
    alt: "Explore palette",
    text: "Explore your palette as bubbles or bars.",
  },
  {
    icon: "/icons/copy.svg",
    alt: "Copy color",
    text: "Click any color to copy its HEX code.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <h2>How it works</h2>

      <ol>
        {steps.map((step) => (
          <li key={step.text}>
            <div className="how-it-works-icon-wrapper">
              <img
                src={step.icon}
                alt={step.alt}
                className="how-it-works-icon"
              />
            </div>

            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}