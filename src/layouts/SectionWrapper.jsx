/**
 * SectionWrapper
 * --------------
 * Consistent semantic wrapper for every portfolio section.
 * Provides:
 *  - id anchor for navigation scrolling
 *  - aria-label for accessibility
 *  - Uniform vertical padding (responsive)
 *  - Optional top border for section separation
 *  - section-container class for horizontal padding
 *
 * Usage:
 *   <SectionWrapper id="about" label="About Saurabh">
 *     <AboutContent />
 *   </SectionWrapper>
 */

export default function SectionWrapper({
  children,
  id,
  label,
  className = '',
  withBorder = false,
  fullWidth = false,
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={[
        'relative w-full',
        'py-section-sm md:py-section',
        withBorder ? 'border-t border-brand-border' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {fullWidth ? children : <div className="section-container">{children}</div>}
    </section>
  )
}
