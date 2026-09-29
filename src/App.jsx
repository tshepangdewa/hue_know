
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Results from "./components/Results";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Results />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}