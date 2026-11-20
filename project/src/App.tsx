import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'
import { ProgressBar } from './components/progress-bar'
import { QuestionCard, type AnswerOption } from './components/question-card'

type Answers = {
  age?: string
  employment?: string
  condition?: string
  workImpact?: string
  benefits?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  state?: string
}

const questionSteps: { key: keyof Answers; eyebrow: string; question: string; description: string; options: AnswerOption[] }[] = [
  { key: 'age', eyebrow: 'A quick starting point', question: 'Are you 40 years of age or older?', description: 'This helps us understand which information may be relevant to you.', options: [{ label: 'Yes', detail: 'I am 40 or older', icon: '✓' }, { label: 'No', detail: 'I am under 40', icon: '→' }] },
  { key: 'employment', eyebrow: 'Your work situation', question: 'Which best describes your current work status?', description: 'There is no right or wrong answer. Choose the closest fit.', options: [{ label: 'Working full time', detail: 'Currently employed 30+ hours a week' }, { label: 'Working part time', detail: 'Currently employed less than 30 hours a week' }, { label: 'Not working', detail: 'Not currently employed' }, { label: 'On leave', detail: 'Temporarily away from work' }] },
  { key: 'condition', eyebrow: 'Your health', question: 'Has a health condition affected your ability to work?', description: 'For example, a physical or mental health condition that makes working difficult.', options: [{ label: 'Yes, significantly', detail: 'It limits the kind or amount of work I can do' }, { label: 'Yes, somewhat', detail: 'It affects my work, but I can still work' }, { label: 'Not currently', detail: 'My health has not affected my work' }] },
  { key: 'workImpact', eyebrow: 'A little more context', question: 'Have you had to reduce or stop working because of your health?', description: 'Select the answer that best reflects your recent experience.', options: [{ label: 'Yes, I stopped working', detail: 'My health led me to stop working' }, { label: 'Yes, I reduced my hours', detail: 'I work less than I used to' }, { label: 'No', detail: 'I have not reduced or stopped work' }] },
  { key: 'benefits', eyebrow: 'Next steps', question: 'Are you currently receiving disability benefits?', description: 'This is a preliminary information check, not an official determination.', options: [{ label: 'Yes', detail: 'I currently receive disability benefits' }, { label: 'No', detail: 'I do not currently receive benefits' }, { label: 'I am not sure', detail: 'I would like help understanding my options' }] },
]

const states = ['Select a state', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia']

export default function App() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const totalSteps = 6
  const isQuestion = step >= 1 && step <= questionSteps.length
  const progressStep = Math.min(step, totalSteps)

  const update = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
  }

  const selectAnswer = (key: keyof Answers, value: string) => {
    update(key, value)
    window.setTimeout(() => setStep((current) => current + 1), 220)
  }

  const validateContact = () => {
    const next: Record<string, string> = {}
    if (!answers.firstName?.trim()) next.firstName = 'Enter your first name.'
    if (!answers.lastName?.trim()) next.lastName = 'Enter your last name.'
    if (!answers.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) next.email = 'Enter a valid email address.'
    if (!answers.phone?.replace(/\D/g, '').match(/^\d{10,}$/)) next.phone = 'Enter a valid phone number.'
    if (!answers.state) next.state = 'Choose your state.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const continueContact = () => { if (validateContact()) setStep(7) }
  const goBack = () => { setErrors({}); setStep((current) => Math.max(0, current - 1)) }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); setStep(0) }} aria-label="ClearPath home">
          <span className="brand-mark"><Sparkles size={18} strokeWidth={2.2} /></span>
          <span>clearpath<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-trust"><LockKeyhole size={14} /> Your information is private</div>
      </header>

      <main className="main-wrap">
        {step > 0 && step < 7 && <ProgressBar current={progressStep} total={totalSteps} />}
        <div className="journey" key={step}>
          {step === 0 && <section className="intro-screen">
            <div className="intro-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> PERSONALIZED BENEFITS GUIDANCE</div>
              <h1>Find a clearer path<br className="desktop-break" /> forward.</h1>
              <p className="intro-lead">A few simple questions can help you explore whether disability benefits information may be relevant to your situation.</p>
              <div className="intro-points">
                <div><span className="point-icon"><ShieldCheck size={18} /></span><span><strong>Private & secure</strong><small>Your answers stay confidential</small></span></div>
                <div><span className="point-icon"><CheckCircle2 size={18} /></span><span><strong>About 2 minutes</strong><small>Quick questions, clear next steps</small></span></div>
              </div>
              <button className="primary-button intro-cta" onClick={() => setStep(1)}>Get started <ArrowRight size={18} /></button>
              <p className="disclaimer">This free questionnaire is for informational purposes only and does not guarantee eligibility or benefits. ClearPath is not affiliated with or endorsed by the Social Security Administration.</p>
            </div>
            <div className="visual-panel" aria-hidden="true">
              <div className="sun-disc" />
              <div className="path-line path-one" /><div className="path-line path-two" />
              <div className="floating-card card-top"><span className="card-icon"><ShieldCheck size={17} /></span><span><strong>A more informed next step</strong><small>Guidance, at your pace</small></span></div>
              <div className="landscape"><div className="hill hill-back" /><div className="hill hill-front" /><div className="trail" /><div className="trail-dot dot-one" /><div className="trail-dot dot-two" /><div className="trail-dot dot-three" /><div className="trail-end"><Check size={16} /></div></div>
              <div className="floating-card card-bottom"><span className="mini-avatars"><i>J</i><i>M</i><i>A</i></span><span><strong>Support starts with clarity</strong><small>One question at a time</small></span></div>
              <div className="panel-caption">A thoughtful first step <span>01 / 06</span></div>
            </div>
          </section>}

          {isQuestion && <QuestionCard step={step} total={totalSteps} eyebrow={questionSteps[step - 1].eyebrow} question={questionSteps[step - 1].question} description={questionSteps[step - 1].description} options={questionSteps[step - 1].options} selected={answers[questionSteps[step - 1].key]} onSelect={(value) => selectAnswer(questionSteps[step - 1].key, value)} onBack={goBack} />}

          {step === 6 && <section className="contact-screen">
            <button className="back-button" onClick={goBack}><ArrowLeft size={16} /> Back</button>
            <div className="question-heading"><div className="eyebrow"><span className="eyebrow-dot" /> ALMOST THERE</div><h1>Where can we share<br className="desktop-break" /> your next steps?</h1><p>Leave your details and we&apos;ll help you understand what options may be worth exploring.</p></div>
            <form className="contact-form" onSubmit={(event) => { event.preventDefault(); continueContact() }} noValidate>
              <div className="field-row">
                <Field label="First name" name="firstName" value={answers.firstName} error={errors.firstName} onChange={update} autoComplete="given-name" />
                <Field label="Last name" name="lastName" value={answers.lastName} error={errors.lastName} onChange={update} autoComplete="family-name" />
              </div>
              <Field label="Email address" name="email" type="email" value={answers.email} error={errors.email} onChange={update} autoComplete="email" placeholder="you@example.com" />
              <div className="field-row">
                <Field label="Phone number" name="phone" type="tel" value={answers.phone} error={errors.phone} onChange={update} autoComplete="tel" placeholder="(555) 555-5555" />
                <div className="field"><label htmlFor="state">State</label><select id="state" value={answers.state ?? ''} onChange={(event) => update('state', event.target.value)} aria-invalid={!!errors.state}><option value="">Select a state</option>{states.slice(1).map((state) => <option key={state}>{state}</option>)}</select>{errors.state && <span className="field-error">{errors.state}</span>}</div>
              </div>
              <button className="primary-button form-submit" type="submit">See my next steps <ArrowRight size={18} /></button>
              <p className="form-privacy"><LockKeyhole size={13} /> Your information is kept private and secure.</p>
              <p className="consent-copy">By submitting, you agree that ClearPath may contact you about your inquiry. This is not an application for benefits or legal advice.</p>
            </form>
          </section>}

          {step === 7 && <section className="thanks-screen"><div className="thanks-icon"><CheckCircle2 size={34} /></div><div className="eyebrow"><span className="eyebrow-dot" /> YOU&apos;RE ALL SET</div><h1>Thank you, {answers.firstName}.</h1><p>Your information has been recorded for this session. You can now explore your answers and take your next step with more clarity.</p><div className="next-card"><span className="next-card-icon"><ShieldCheck size={21} /></span><div><strong>What happens next</strong><p>A benefits specialist can help you understand your options and answer your questions.</p></div><ChevronRight size={18} /></div><p className="disclaimer">This questionnaire is informational only. It is not an official eligibility decision, benefits application, or promise of benefits.</p><button className="text-button" onClick={() => { setStep(0); setAnswers({}); setErrors({}) }}>Return to home <ArrowRight size={16} /></button></section>}
        </div>
      </main>
      <footer className="site-footer"><span>© 2026 ClearPath. All rights reserved.</span><span><LockKeyhole size={12} /> Secure, confidential questionnaire</span></footer>
    </div>
  )
}

type FieldProps = { label: string; name: keyof Answers; value?: string; error?: string; onChange: (name: keyof Answers, value: string) => void; type?: string; autoComplete?: string; placeholder?: string }
function Field({ label, name, value, error, onChange, type = 'text', autoComplete, placeholder }: FieldProps) {
  return <div className="field"><label htmlFor={name}>{label}</label><input id={name} type={type} value={value ?? ''} onChange={(event) => onChange(name, event.target.value)} autoComplete={autoComplete} placeholder={placeholder} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} />{error && <span className="field-error" id={`${name}-error`}>{error}</span>}</div>
}
