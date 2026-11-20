type ProgressBarProps = { current: number; total: number }

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)
  return <div className="progress-wrap" aria-label={`Step ${current} of ${total}`}>
    <div className="progress-meta"><span>YOUR PERSONALIZED CHECK-IN</span><span>STEP {current} <i>OF</i> {total}</span></div>
    <div className="progress-track" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label="Questionnaire progress"><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
  </div>
}
