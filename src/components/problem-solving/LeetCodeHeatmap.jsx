/**
 * LeetCodeHeatmap.jsx
 * -------------------
 * Replicates the exact information hierarchy from the official LeetCode submission calendar:
 *
 * Header:
 *   - Prominent headline: "{totalSubmissions} submissions in the past year"
 *   - Metrics row: "Total active days: {activeDays}" | "Max streak: {maxStreak}"
 *   - Time-range selector pill (Current)
 *
 * Calendar:
 *   - 7 weekday rows with GitHub/LeetCode grid layout
 *   - Hover tooltips showing exact date and submission count (e.g. "3 submissions on Oct 14, 2026" / "No submissions")
 *   - Month labels positioned along the bottom
 *   - Emerald intensity scale based on daily submission counts
 *   - Less-to-More activity legend with subtle cell indicators
 *   - Full responsiveness with horizontal scroll container on mobile
 */

import { useState, useEffect, useMemo, useRef } from 'react'
import { Calendar, AlertCircle, RefreshCw, Info, ChevronDown } from 'lucide-react'
import { getLeetCodeCalendar, VERIFIED_SNAPSHOT } from '../../services/leetcode.service.js'

// Midnight Emerald theme levels (0, 1–2, 3–4, 5+)
const COLOR_LEVELS = [
  'bg-brand-surface/90 border-brand-border/40', // 0 submissions
  'bg-[#064e3b] border-[#065f46]', // 1-2 submissions
  'bg-[#047857] border-[#059669]', // 3-4 submissions
  'bg-[#10b981] border-[#34d399]', // 5-6 submissions
  'bg-[#34d399] border-[#6ee7b7] shadow-[0_0_8px_rgba(52,211,153,0.4)]', // 7+ submissions
]

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

export default function LeetCodeHeatmap() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTimeRange, setActiveTimeRange] = useState('Current')

  // Tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: '',
    date: '',
    x: 0,
    y: 0,
  })

  const containerRef = useRef(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getLeetCodeCalendar()
      setData(res)
    } catch {
      setError('Unable to load submission calendar.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  /**
   * Constructs exactly 53 weeks of daily cells up to today, aligned Sunday-Saturday.
   */
  const { weeks, monthHeaders } = useMemo(() => {
    const calendarMap = data?.calendar || {}
    const weeksList = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Calculate start date: 52 weeks ago, aligned to the previous Sunday
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 364)
    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1)
    }

    const curr = new Date(startDate)
    let currentWeek = []
    const headers = []
    let lastMonth = -1

    while (curr <= today || currentWeek.length > 0) {
      const dayOfWeek = curr.getDay()
      const month = curr.getMonth()
      const dateStr = curr.toISOString().split('T')[0]
      const unixSec = Math.floor(curr.getTime() / 1000)

      // Record month label at the start of a new month in week columns
      if (dayOfWeek === 0 && month !== lastMonth && curr <= today) {
        headers.push({
          weekIndex: weeksList.length,
          name: MONTH_NAMES[month],
        })
        lastMonth = month
      }

      // Check submission count for this day
      const count = calendarMap[unixSec] || calendarMap[unixSec - (unixSec % 86400)] || 0

      currentWeek.push({
        date: new Date(curr),
        dateStr,
        count,
        isFuture: curr > today,
      })

      if (currentWeek.length === 7) {
        weeksList.push(currentWeek)
        currentWeek = []
      }

      curr.setDate(curr.getDate() + 1)
      if (curr > today && currentWeek.length === 0) break
    }

    // Fill last week if incomplete
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: new Date(curr),
          dateStr: curr.toISOString().split('T')[0],
          count: 0,
          isFuture: true,
        })
        curr.setDate(curr.getDate() + 1)
      }
      weeksList.push(currentWeek)
    }

    return { weeks: weeksList, monthHeaders: headers }
  }, [data])

  // Mouse move handler for floating tooltip
  const handleMouseEnter = (day, e) => {
    if (day.isFuture) return
    const rect = e.currentTarget.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 }

    const formattedDate = day.date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

    const countText =
      day.count === 0
        ? 'No submissions'
        : `${day.count} ${day.count === 1 ? 'submission' : 'submissions'}`

    setTooltip({
      visible: true,
      text: countText,
      date: formattedDate,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top - 8,
    })
  }

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }

  const getCellColorClass = (count, isFuture) => {
    if (isFuture) return 'opacity-0 pointer-events-none'
    if (count === 0) return COLOR_LEVELS[0]
    if (count <= 2) return COLOR_LEVELS[1]
    if (count <= 4) return COLOR_LEVELS[2]
    if (count <= 6) return COLOR_LEVELS[3]
    return COLOR_LEVELS[4]
  }

  const totalSubmissions = data?.totalSubmissions ?? VERIFIED_SNAPSHOT.totalSubmissions
  const activeDays = data?.activeDays ?? VERIFIED_SNAPSHOT.activeDays
  const maxStreak = data?.maxStreak ?? VERIFIED_SNAPSHOT.maxStreak

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-brand-surface/70 border border-brand-border/80 hover:border-brand-accent/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-card transition-all duration-300"
    >
      {/* ── Top Header Hierarchy Matching LeetCode Screenshot ──────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-brand-border/50">
        <div>
          {/* Prominent Past-Year Submissions Heading */}
          <div className="flex items-baseline gap-2">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-text tracking-tight">
              <span className="text-brand-accent drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                {totalSubmissions.toLocaleString()}
              </span>{' '}
              submissions in the past year
            </h3>
          </div>

          {/* Sub-Metrics: Total Active Days & Max Streak */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2 text-xs sm:text-sm font-mono text-brand-muted">
            <div className="flex items-center gap-1.5">
              <span>Total active days:</span>
              <span className="text-brand-text font-semibold">{activeDays}</span>
            </div>
            <span className="hidden sm:inline text-brand-border">|</span>
            <div className="flex items-center gap-1.5">
              <span>Max streak:</span>
              <span className="text-brand-text font-semibold">{maxStreak}</span>
            </div>
          </div>
        </div>

        {/* Time-Range Selector Pill & Mode Badges */}
        <div className="flex items-center gap-3">
          {data?.isMock && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-brand-accent/10 text-brand-accent border border-brand-accent/30"
              title="Verified initial snapshot values from LeetCode profile. Pre-configured for GET /api/leetcode/calendar."
            >
              <Info size={12} />
              <span>Verified Snapshot</span>
            </span>
          )}

          {data?.isFromCache && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono bg-brand-surface text-brand-muted border border-brand-border">
              <span>Cached Data</span>
            </span>
          )}

          {/* Time-Range Selector Button */}
          <div className="relative inline-block">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border hover:border-brand-accent/40 font-mono text-xs text-brand-text transition-colors"
              title="Time-range filtering. 'Current' covers rolling 12 months."
            >
              <span>{activeTimeRange}</span>
              <ChevronDown size={14} className="text-brand-muted" />
            </button>
          </div>

          {loading && (
            <RefreshCw size={14} className="animate-spin text-brand-accent" />
          )}
        </div>
      </div>

      {/* ── Error State ───────────────────────────────────────────── */}
      {error && !loading && (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <AlertCircle size={28} className="text-amber-400 mb-2" />
          <p className="font-mono text-sm text-brand-muted mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-lg bg-brand-surface border border-brand-border text-xs font-mono text-brand-text hover:text-brand-accent transition-colors"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* ── Contribution Grid (7 Weekday Rows x 53 Weeks) ─────────── */}
      {!error && (
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand-border/60 scrollbar-track-transparent">
          <div className="min-w-[760px] select-none pt-2">
            <div className="flex gap-2">
              {/* Day of Week Labels (Mon, Wed, Fri) */}
              <div className="flex flex-col justify-between text-[10px] font-mono text-brand-muted/70 pr-2 py-[2px] h-[98px]">
                {DAY_LABELS.map((day, idx) => (
                  <span key={idx} className="h-[11px] leading-[11px]">
                    {day}
                  </span>
                ))}
              </div>

              {/* 53 Columns of 7-day Weeks */}
              <div className="flex gap-[3.5px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3.5px]">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                        onMouseLeave={handleMouseLeave}
                        className={`w-[11.5px] h-[11.5px] rounded-[2.5px] border transition-transform duration-150 hover:scale-125 hover:z-20 cursor-pointer ${getCellColorClass(
                          day.count,
                          day.isFuture
                        )}`}
                        aria-label={
                          day.isFuture
                            ? ''
                            : `${day.dateStr}: ${day.count} submissions`
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Month labels along bottom matching LeetCode screenshot */}
            <div className="flex text-[11px] font-mono text-brand-muted/80 mt-3 pl-8">
              {monthHeaders.map((m, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    left: `${m.weekIndex * 15}px`,
                    width: '0px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.name}
                </div>
              ))}
            </div>

            {/* Bottom Row: Metadata & Less-to-More Activity Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-brand-border/40 text-xs font-mono text-brand-muted">
              <div>
                <span>Candidate Profile: </span>
                <a
                  href={VERIFIED_SNAPSHOT.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:underline font-medium"
                >
                  @{data?.username || VERIFIED_SNAPSHOT.username}
                </a>
              </div>

              {/* Less to More Intensity Legend */}
              <div className="flex items-center gap-2">
                <span className="text-[11px]">Less</span>
                <div className="flex items-center gap-1">
                  {COLOR_LEVELS.map((cls, idx) => (
                    <div
                      key={idx}
                      className={`w-[11px] h-[11px] rounded-[2.5px] border ${cls}`}
                    />
                  ))}
                </div>
                <span className="text-[11px]">More</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Tooltip ───────────────────────────────────────── */}
      {tooltip.visible && (
        <div
          className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full px-3 py-1.5 rounded-lg bg-brand-surface/95 border border-brand-accent/40 shadow-xl backdrop-blur-md text-center transition-all duration-75"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <p className="font-mono text-xs font-semibold text-brand-accent leading-tight">
            {tooltip.text}
          </p>
          <p className="font-sans text-[10px] text-brand-muted leading-tight mt-0.5 whitespace-nowrap">
            {tooltip.date}
          </p>
        </div>
      )}
    </div>
  )
}
