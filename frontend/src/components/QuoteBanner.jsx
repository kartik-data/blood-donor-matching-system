import { useEffect, useState } from "react";

const quotes = [
  "One donation can save up to three lives.",
  "Every 2 seconds, someone needs blood.",
  "You don't need a reason to donate blood. You need a reason not to.",
  "Be the reason someone gets to see tomorrow.",
  "Blood cannot be manufactured — it can only come from generous people like you.",
  "A small prick of a needle, a lifetime of gratitude.",
];

export default function QuoteBanner() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote-banner">
      <span className={`quote-text ${visible ? "quote-visible" : "quote-hidden"}`}>
        🩸 {quotes[index]}
      </span>
    </div>
  );
}
