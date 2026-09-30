import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  const [palette, setPalette] = useState([]);

  return (
    <>
      <Header />

      <main>
        <Hero
          palette={palette}
          onPaletteReady={setPalette}
        />

        <HowItWorks />

        <Features />

        <FAQ />
      </main>

      <Footer />
    </>
  );
}