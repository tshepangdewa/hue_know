
const features = [
  {
    title: "Private by design",
    description: "Your images stay in your browser."
  },
  {
    title: "Instant results",
    description: "Analyze colors without waiting for a server."
  },
  {
    title: "No sign-up",
    description: "Start exploring without an account."
  },
  {
    title: "Two visualizations",
    description: "Explore your palette as bubbles or bars."
  }
];

export default function Features() {
  return (
    <section id="features">
      <h2>Why hue_know?</h2>

      <div>
        {features.map((feature) => (
          <article key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}