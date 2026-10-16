import {
  ArrowRight, BarChart3, Box, ChevronDown, Code2, FileSearch, FileUp,
  HelpCircle, Lightbulb, LockKeyhole, Menu, PencilLine, Play,
  ShieldCheck, Sparkles, Terminal, X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroIllustration from '../../assets/ats-match-illustration.png'

const scannerPath = '/resume-scanner'
const processSteps = [
  { icon: FileUp, title: 'Upload or Paste', description: 'Upload your resume and paste the target job description.' },
  { icon: BarChart3, title: 'Analyze Your Match', description: 'Get an estimated ATS score and a breakdown of matched and missing skills.' },
  { icon: PencilLine, title: 'Improve and Apply', description: 'Use tailored recommendations to strengthen your resume.' },
]
const features = [
  { icon: BarChart3, title: 'Accurate ATS Analysis', description: 'See how well your resume matches a role with structured compatibility analysis.' },
  { icon: FileSearch, title: 'Skill Gap Identification', description: 'Find matched skills, missing skills, and important job requirements.' },
  { icon: Lightbulb, title: 'Actionable Suggestions', description: 'Get focused recommendations to improve your resume for the specific role.' },
  { icon: LockKeyhole, title: 'Privacy by Design', description: 'Files are processed for your scan; the app does not persist uploaded documents.' },
  { icon: ShieldCheck, title: 'Free Forever', description: 'Use every available feature without subscriptions, trials, upgrades, or paywalls.' },
]
const faqs = [
  { question: 'How does ATS Optimizer work?', answer: 'ATS Optimizer compares your resume with a target job description, identifies matching and missing skills, highlights important keywords, and provides a compatibility analysis with practical recommendations.' },
  { question: 'Is my data safe and private?', answer: 'Uploaded files are converted to text in your browser, then the resume and job description are sent to the configured analysis service for processing. This web app does not persist uploaded documents. Processing and retention by the configured API should be confirmed in its deployment policy before sharing sensitive information.' },
  { question: 'Is ATS Optimizer really free?', answer: 'Yes. Every available feature is free to use forever, with no subscription, trial, upgrade, or credit card required.' },
  { question: 'What is included?', answer: 'You can scan your resume, review your compatibility score, compare matched and missing skills, inspect important keywords, and build a tailored improvement prompt.' },
]

function Logo() {
  return <Link className="brand" to="/" aria-label="ATS Optimizer home"><img src={`${import.meta.env.BASE_URL}ats-optimizer-logo.svg`} width="2090" height="325" alt="" /></Link>
}

function NavigationContent({ onNavigate }: { onNavigate?: () => void }) {
  return <>
    <div className="site-nav__links">
      <a href="#how-it-works" onClick={onNavigate}>How It Works</a><a href="#features" onClick={onNavigate}>Features</a><a href="#developers" onClick={onNavigate}>Developers</a><Link to="/docs" onClick={onNavigate}>Docs</Link><a href="#faq" onClick={onNavigate}>FAQ</a>
    </div>
    <div className="site-nav__actions">
      <Link className="landing-button landing-button--primary" to={scannerPath} onClick={onNavigate}>Scan My Resume <ArrowRight aria-hidden="true" /></Link>
    </div>
  </>
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeMenu = () => setIsOpen(false)
  const closeDrawer = () => {
    setIsOpen(false)
    menuButtonRef.current?.focus()
  }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  return <>
    <header className="site-header">
      <div className="landing-container site-header__inner">
        <Logo />
        <button ref={menuButtonRef} className="mobile-menu-button" type="button" aria-label="Open navigation" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(true)}>
          <Menu aria-hidden="true" />
        </button>
        <nav className="site-nav site-nav--desktop" aria-label="Primary navigation">
          <NavigationContent />
        </nav>
      </div>
    </header>
    <div className={`mobile-nav-layer${isOpen ? ' mobile-nav-layer--open' : ''}`} aria-hidden={!isOpen}>
      <button className="mobile-nav-backdrop" type="button" aria-label="Close navigation" tabIndex={isOpen ? 0 : -1} onClick={closeDrawer} />
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-nav__header">
          <Logo />
          <button ref={closeButtonRef} className="mobile-nav__close" type="button" aria-label="Close navigation" onClick={closeDrawer}>
            <X aria-hidden="true" />
          </button>
        </div>
        <NavigationContent onNavigate={closeMenu} />
      </nav>
    </div>
  </>
}

function SectionHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><p className="section-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2>{description ? <p className="section-description">{description}</p> : null}</div>
}

function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title"><div className="landing-container hero__grid">
      <div className="hero__content">
        <p className="hero__eyebrow"><Sparkles size={16} aria-hidden="true" /> Resume-to-job match intelligence</p>
        <h1 id="hero-title">Match Your Resume<br />to the Job<br /><span>Before You Apply</span></h1>
        <p className="hero__description">Compare your resume with any job description, uncover missing skills, identify important keywords, and get clear recommendations to improve your chances.</p>
        <div className="hero__actions">
          <Link className="landing-button landing-button--primary landing-button--large" to={scannerPath}>Scan My Resume Free <ArrowRight aria-hidden="true" /></Link>
          <a className="landing-button landing-button--outline landing-button--large" href="#how-it-works"><Play aria-hidden="true" /> See How It Works</a>
        </div>
      </div>
      <figure className="hero__visual"><img src={heroIllustration} width="1365" height="1126" alt="Resume matched against a job description with an illustrative 86 percent score" fetchPriority="high" /><figcaption>Sample score shown for illustration only. Results vary by resume and role.</figcaption></figure>
    </div></section>
  )
}

function HowItWorksSection() {
  return <section id="how-it-works" className="landing-section how-it-works" aria-labelledby="how-title"><div className="landing-container">
    <SectionHeading id="how-title" eyebrow="How it works" title="From Job Description to Stronger Resume in Minutes." description="A simple 3-step process to analyze, understand, and improve your resume." />
    <div className="process-grid">{processSteps.map((step, index) => { const Icon = step.icon; return <div className="process-wrap" key={step.title}><article className="process-card"><span className="process-card__number" aria-hidden="true">{index + 1}</span><span className="icon-tile"><Icon aria-hidden="true" /></span><h3>{step.title}</h3><p>{step.description}</p></article>{index < 2 ? <ArrowRight className="process-arrow" aria-hidden="true" /> : null}</div> })}</div>
  </div></section>
}

function FeaturesSection() {
  return <section id="features" className="landing-section features" aria-labelledby="features-title"><div className="landing-container"><SectionHeading id="features-title" eyebrow="Key features" title="Everything You Need to Land More Interviews." /><div className="features-grid">{features.map((feature) => { const Icon = feature.icon; return <article className="feature-item" key={feature.title}><span className="icon-tile"><Icon aria-hidden="true" /></span><h3>{feature.title}</h3><p>{feature.description}</p></article> })}</div></div></section>
}

function DevelopersSection() {
  return <section id="developers" className="landing-section developers" aria-labelledby="developers-title"><div className="landing-container developers__grid">
    <div className="developers__content">
      <p className="section-eyebrow">Open Python library</p>
      <h2 id="developers-title">Bring ATS skill matching into any project.</h2>
      <p>Use the same deterministic skill-coverage engine in scripts, APIs, internal tools, or recruiting products. It runs locally with no API key, database, or AI model.</p>
      <div className="developers__facts">
        <span><Box aria-hidden="true" /> v0.1.0</span>
        <span><Code2 aria-hidden="true" /> Python 3.10+</span>
        <span><ShieldCheck aria-hidden="true" /> Unlicense</span>
      </div>
      <div className="developers__actions">
        <Link className="landing-button landing-button--primary" to="/docs">Read the documentation <ArrowRight aria-hidden="true" /></Link>
        <a className="landing-button landing-button--outline" href="https://test.pypi.org/project/ats-optimizer/" target="_blank" rel="noreferrer">View on TestPyPI</a>
      </div>
    </div>
    <div className="developers__terminal" aria-label="Installation and Python usage example">
      <div className="developers__terminal-bar"><span /><span /><span /><p><Terminal aria-hidden="true" /> Quick start</p></div>
      <pre><code><span className="code-comment"># Install from TestPyPI</span>{'\n'}<span className="code-command">pip install --index-url https://test.pypi.org/simple/ ats-optimizer</span>{'\n\n'}<span className="code-keyword">from</span> ats_optimizer <span className="code-keyword">import</span> ATSOptimizer{'\n\n'}result = ATSOptimizer().analyze({'\n'}    resume=<span className="code-string">"""Backend developer with three years of experience building Python and FastAPI services.</span>{'\n'}    <span className="code-string">Skilled in PostgreSQL, REST APIs, Docker, Git, and automated testing."""</span>,{'\n'}    job_description=<span className="code-string">"""Seeking a Python Developer with experience in Python,</span>{'\n'}    <span className="code-string">FastAPI, SQL, and REST APIs. Build backend services and</span>{'\n'}    <span className="code-string">integrate databases. Docker, Git, and testing preferred."""</span>,{'\n'}){'\n\n'}<span className="code-keyword">print</span>(result.score)</code></pre>
    </div>
  </div></section>
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const id = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return <article className={`faq-item${isOpen ? ' faq-item--open' : ''}`}><h3><button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setIsOpen((value) => !value)}><span className="faq-item__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className="faq-item__question">{question}</span><span className="faq-item__toggle"><ChevronDown aria-hidden="true" /></span></button></h3><div id={id} className="faq-item__answer" hidden={!isOpen}><p>{answer}</p></div></article>
}
function FAQSection() {
  return <section id="faq" className="landing-section faq" aria-labelledby="faq-title"><div className="landing-container faq__layout"><div className="faq__intro"><p className="section-eyebrow">Questions, answered</p><h2 id="faq-title">Everything you need to know.</h2><p className="faq__description">Clear answers about resume scanning, privacy, plans, and the features we are building next.</p><div className="faq__support"><span><HelpCircle aria-hidden="true" /></span><div><strong>Not sure where to begin?</strong><p>Start with a free resume scan. No account or credit card required.</p></div></div></div><div className="faq-list">{faqs.map((item, index) => <FAQItem key={item.question} {...item} index={index} />)}</div></div></section>
}
function CTASection() {
  return <section className="bottom-cta" aria-labelledby="cta-title"><div className="landing-container bottom-cta__inner"><span className="bottom-cta__icon"><ShieldCheck aria-hidden="true" /></span><div><h2 id="cta-title">Ready to improve your next application?</h2><p>Get an instant ATS analysis and personalized recommendations to stand out.</p></div><Link className="landing-button landing-button--primary landing-button--large" to={scannerPath}>Scan My Resume Free <ArrowRight aria-hidden="true" /></Link></div></section>
}
function Footer() {
  return <footer className="site-footer"><div className="landing-container site-footer__grid">
    <div className="footer-brand"><Logo /><p>Build a stronger resume and land more interviews.</p></div>
    <div className="footer-group"><h3>Product</h3><a href="#how-it-works">How It Works</a><a href="#features">Features</a><Link to="/docs">Python Docs</Link><a href="#faq">FAQ</a></div>
  </div><div className="landing-container site-footer__bottom"><p>© {new Date().getFullYear()} ATS Optimizer. All rights reserved.</p></div></footer>
}

export function LandingPage() {
  return <div className="landing-page"><Header /><main><HeroSection /><HowItWorksSection /><FeaturesSection /><DevelopersSection /><FAQSection /><CTASection /></main><Footer /></div>
}
