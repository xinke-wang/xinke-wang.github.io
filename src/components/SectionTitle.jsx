export function SectionTitle({ children, className = '' }) {
  return (
    <div className={`section-title ${className}`.trim()}>
      <h2>{children}</h2>
    </div>
  );
}
