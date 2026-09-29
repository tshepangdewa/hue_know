
const questions = [
  {
    question: "Is my image uploaded anywhere?",
    answer: "No. Image processing happens in your browser."
  },
  {
    question: "What file types are supported?",
    answer: "We'll support common browser-readable image formats."
  },
  {
    question: "How are color names decided?",
    answer: "Colors are named using their calculated color properties."
  },
  {
    question: "Can I use this for a design palette?",
    answer: "Yes. Copy the extracted HEX codes into your designs."
  }
];

export default function FAQ() {
  return (
    <section id="faq">
      <h2>Frequently asked questions</h2>

      {questions.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}