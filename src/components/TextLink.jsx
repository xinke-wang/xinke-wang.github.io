// Inline accent link with the design system's animated slide-in underline.
export function TextLink({ href, children }) {
  return (
    <a className="text-link" href={href}>
      {children}
    </a>
  );
}
