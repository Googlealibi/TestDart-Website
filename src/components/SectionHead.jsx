import useReveal from '../hooks/useReveal';

// Drop-in replacement for a plain `<div className="section-head">` — same
// markup and classes in, just wired to the shared scroll-reveal choreography
// defined in index.css (.section-head / .section-head.is-visible).
export default function SectionHead({ className = '', children }) {
  const [ref, visible] = useReveal(0.3);
  return (
    <div ref={ref} className={`section-head ${className} ${visible ? 'is-visible' : ''}`.trim()}>
      {children}
    </div>
  );
}
