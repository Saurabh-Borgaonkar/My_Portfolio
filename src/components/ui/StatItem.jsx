/**
 * StatItem
 * --------
 * Reusable hero statistic atom with large Space Grotesk numbers
 * and JetBrains Mono metadata labeling.
 */

export default function StatItem({ value, label }) {
  return (
    <div className="flex flex-col">
      <span className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-text tracking-tight">
        {value}
      </span>
      <span className="font-mono text-xs text-brand-muted mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}
