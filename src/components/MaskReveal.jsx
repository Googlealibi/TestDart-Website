// Splits `text` into words, each clipped behind its own overflow-hidden
// mask (see .mask-reveal__mask/.mask-reveal__word in index.css). Reveal is
// driven by an ancestor's .is-visible class — this component stays a pure
// text-in/markup-out wrapper, no observer of its own.
export default function MaskReveal({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`mask-reveal ${className}`.trim()}>
      {words.map((word, i) => (
        <span className="mask-reveal__mask" key={`${word}-${i}`}>
          <span className="mask-reveal__word" style={{ '--i': i }}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}
