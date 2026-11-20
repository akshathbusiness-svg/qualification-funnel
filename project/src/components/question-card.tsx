import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export type AnswerOption = { label: string; detail: string; icon?: string }
type QuestionCardProps = { step: number; total: number; eyebrow: string; question: string; description: string; options: AnswerOption[]; selected?: string; onSelect: (value: string) => void; onBack: () => void }

export function QuestionCard({ step, eyebrow, question, description, options, selected, onSelect, onBack }: QuestionCardProps) {
  return <section className="question-screen">
    <button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
    <div className="question-heading"><div className="eyebrow"><span className="eyebrow-dot" /> {eyebrow.toUpperCase()}</div><h1>{question}</h1><p>{description}</p></div>
    <div className="answer-list" role="group" aria-label={question}>{options.map((option, index) => <button key={option.label} className={`answer-option ${selected === option.label ? 'is-selected' : ''}`} onClick={() => onSelect(option.label)} aria-pressed={selected === option.label}><span className="answer-index">0{index + 1}</span><span className="answer-copy"><strong>{option.label}</strong><small>{option.detail}</small></span><span className="answer-arrow">{selected === option.label ? <Check size={19} /> : <ArrowRight size={18} />}</span></button>)}</div>
    <div className="question-note"><span className="note-lock"><Check size={13} /></span> Your responses are private and only used to personalize your experience.</div>
    <div className="mobile-step">Question {step} of 6</div>
  </section>
}
