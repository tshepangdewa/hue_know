export default function Header() {
  return (
    <header>
      <a
        href="/"
        className="brand"
        aria-label="hue_know home"
      >
        <img
          src="/favicon.svg"
          alt=""
          className="brand-icon"
          width="36"
          height="36"
        />

        <span>HueKnow</span>
      </a>

      <nav aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#features">Why HueKnow?</a>
        <a href="#faq">FAQ</a>
      </nav>
    </header>
  );
}