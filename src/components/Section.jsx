export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
