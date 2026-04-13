import {
  differenceInCalendarDays,
  eachMonthOfInterval,
  endOfMonth,
  format,
  isWithinInterval,
  parseISO,
  startOfMonth
} from "date-fns";
import { nl } from "date-fns/locale";

const MIN_BAR_PERCENT = 0.8;

function toDate(input) {
  return parseISO(input);
}

function percentFromDate(target, start, totalDays) {
  const dayOffset = differenceInCalendarDays(target, start);
  return (dayOffset / totalDays) * 100;
}

function durationPercent(start, end, totalDays) {
  const days = differenceInCalendarDays(end, start) + 1;
  return Math.max((days / totalDays) * 100, MIN_BAR_PERCENT);
}

function formatDatumRange(start, eind) {
  const s = toDate(start);
  const e = toDate(eind);
  if (start === eind) {
    return format(s, "dd MMM yyyy", { locale: nl });
  }
  return `${format(s, "dd MMM yyyy", { locale: nl })} – ${format(e, "dd MMM yyyy", {
    locale: nl
  })}`;
}

function GanttChart({ phases, timelineStart, timelineEnd }) {
  const startDate = toDate(timelineStart);
  const endDate = toDate(timelineEnd);
  const totalDays = differenceInCalendarDays(endDate, startDate) + 1;
  const months = eachMonthOfInterval({ start: startDate, end: endDate });

  const years = [];
  let yearCursor = startDate.getFullYear();
  while (yearCursor <= endDate.getFullYear()) {
    const yearStart = yearCursor === startDate.getFullYear() ? startDate : new Date(yearCursor, 0, 1);
    const yearEnd = yearCursor === endDate.getFullYear() ? endDate : new Date(yearCursor, 11, 31);
    years.push({ year: yearCursor, yearStart, yearEnd });
    yearCursor += 1;
  }

  return (
    <section className="gantt-card">
      <div className="gantt-scroll">
        <div className="gantt-grid" style={{ minWidth: "1500px" }}>
          <div className="gantt-header-row">
            <div className="left-col header-label">Projectfase / Activiteit</div>
            <div className="timeline-col">
              <div className="years-row">
                {years.map((yearInfo) => {
                  const left = percentFromDate(yearInfo.yearStart, startDate, totalDays);
                  const width = durationPercent(yearInfo.yearStart, yearInfo.yearEnd, totalDays);
                  return (
                    <div key={yearInfo.year} className="year-block" style={{ left: `${left}%`, width: `${width}%` }}>
                      {yearInfo.year}
                    </div>
                  );
                })}
              </div>
              <div className="months-row">
                {months.map((month) => {
                  const monthStart = startOfMonth(month);
                  const monthEnd = isWithinInterval(endOfMonth(month), { start: startDate, end: endDate })
                    ? endOfMonth(month)
                    : endDate;
                  const left = percentFromDate(monthStart, startDate, totalDays);
                  const width = durationPercent(monthStart, monthEnd, totalDays);

                  return (
                    <div key={format(month, "yyyy-MM")} className="month-block" style={{ left: `${left}%`, width: `${width}%` }}>
                      {format(month, "MMM", { locale: nl })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {phases.map((phase) => (
            <div key={phase.id} className="phase-section">
              <div className="phase-row">
                <div className="left-col phase-title" style={{ color: phase.kleur }}>
                  {phase.naam}
                </div>
                <div className="timeline-col phase-timeline">
                  {months.map((month) => {
                    const left = percentFromDate(month, startDate, totalDays);
                    return <span key={`${phase.id}-${format(month, "yyyy-MM")}`} className="month-line" style={{ left: `${left}%` }} />;
                  })}
                </div>
              </div>

              {phase.taken.map((taak) => {
                const taakStart = toDate(taak.start);
                const taakEind = toDate(taak.eind);
                const left = percentFromDate(taakStart, startDate, totalDays);
                const width = durationPercent(taakStart, taakEind, totalDays);

                return (
                  <div key={taak.id} className="task-row">
                    <div className="left-col task-label">
                      <span>{taak.naam}</span>
                      <small>{formatDatumRange(taak.start, taak.eind)}</small>
                    </div>

                    <div className="timeline-col timeline-cell">
                      {months.map((month) => {
                        const lineLeft = percentFromDate(month, startDate, totalDays);
                        return <span key={`${taak.id}-${format(month, "yyyy-MM")}`} className="month-line" style={{ left: `${lineLeft}%` }} />;
                      })}

                      {taak.type === "milestone" ? (
                        <div
                          className="milestone"
                          style={{ left: `${left}%`, borderColor: phase.kleur, backgroundColor: `${phase.kleur}22` }}
                          title={`${taak.naam} · ${formatDatumRange(taak.start, taak.eind)}`}
                        />
                      ) : (
                        <div
                          className="task-bar"
                          style={{ left: `${left}%`, width: `${width}%`, backgroundColor: phase.kleur }}
                          title={`${taak.naam} · ${formatDatumRange(taak.start, taak.eind)}`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="legend">
        <span>
          <i className="legend-task" /> Activiteit
        </span>
        <span>
          <i className="legend-milestone" /> Mijlpaal
        </span>
      </div>
    </section>
  );
}

export default GanttChart;
