import {
  ArrowRight, BarChart3, ChevronDown, CircleCheck, FileSearch, FileUp,
  HelpCircle, Lightbulb, LockKeyhole, Menu, PencilLine, Play, ScanSearch,
  ShieldCheck, Sparkles, Video, X,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
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
  { icon: ScanSearch, title: 'Deep Resume X-Ray Scan', description: 'Premium feature that reveals keywords, evidence gaps, equivalent skills, and partial requirement matches.' },
  { icon: Video, title: 'AI Mock Interviews with Jack', description: 'Premium practice for leadership, ownership, behavioral, technical, and role-specific interviews, with realistic follow-ups and actionable feedback.' },
]
const plans = [
  {
    name: 'Free', eyebrow: 'Start here', price: '$0', cadence: 'Free forever', available: true,
    description: 'Everything you need to understand your resume match and make your next application stronger.', action: 'Start scanning for free',
    groups: [
      { title: 'Resume analysis', features: ['Unlimited resume analysis', 'Matched and missing skills', 'ATS keyword highlighting', 'Resume compatibility score'] },
      { title: 'Clear next steps', features: ['Skill gap and mismatch analysis', 'AI-ready optimization prompt', 'Resume comparison summary'] },
    ],
  },
  {
    name: 'Premium', eyebrow: 'For active job seekers', price: '$50 USD', cadence: 'per month', available: true,
    trial: '7 days free',
    description: 'Try the complete toolkit free for 7 days, then continue for $50 USD per month.', action: 'Start 7-day free trial',
    groups: [
      { title: 'Tailored applications', features: ['Deep X-Ray analysis of your resume and job description', 'A tailored resume and cover letter for every application', 'AI-assisted rewriting based on your real experience', 'Clear recommendations for missing skills and keywords', 'One-click resume optimization'] },
      { title: 'Smarter job search', features: ['Automatic job discovery across multiple trusted sources', 'Best-fit opportunities ranked by your skills and preferences', 'Duplicate, expired, and suspicious job detection', 'Browser extension for supported job sites', 'Form autofill with a review step before submission', 'Quick Apply on supported job sites'] },
      { title: 'Interview support', features: ['AI video mock interviews with Jack, tailored to the job description', 'Leadership and people-management interview practice', 'Ownership and accountability interview practice', 'Technical and role-specific interview practice', 'Behavioral and situational interview practice', 'Realistic follow-up questions and post-interview feedback', 'Multilingual interview practice', 'Priority customer support'] },
    ],
  },
]
const faqs = [
  { question: 'How does ATS Optimizer work?', answer: 'ATS Optimizer compares your resume with a target job description, identifies matching and missing skills, highlights important keywords, and provides a compatibility analysis with practical recommendations.' },
  { question: 'Is my data safe and private?', answer: 'Uploaded files are converted to text in your browser, then the resume and job description are sent to the configured analysis service for processing. This web app does not persist uploaded documents. Processing and retention by the configured API should be confirmed in its deployment policy before sharing sensitive information.' },
  { question: 'What is included in the Free plan?', answer: 'The Free plan includes unlimited analysis, keyword matching, missing-skill identification, compatibility scoring, and prompts that help you improve your resume.' },
  { question: 'What extra features come with Premium?', answer: 'Premium starts with a 7-day free trial and is $50 USD per month after the trial. It provides deeper resume and job-description analysis, tailored resumes, AI-assisted rewriting based on your real experience, automatic job discovery across multiple sites, shortlisting of the opportunities that best match your skills, AI video mock interviews with Jack, and faster applications on supported job sites.' },
  { question: 'How does the Premium free trial work?', answer: 'You can try Premium features free for 7 days. After the trial, Premium costs $50 USD per month.' },
  { question: 'How do AI mock interviews with Jack work?', answer: 'This planned Premium feature will let you choose a leadership, ownership, behavioral, technical, or role-specific interview track. Jack will use the target job description to ask relevant questions and realistic follow-ups, then provide actionable feedback after the session. You will also be able to practice in a supported language. AI mock interviews are not currently active in this application.' },
  { question: 'Does the browser extension support Quick Apply?', answer: 'The planned extension will help fill supported forms and attach an optimized resume, with a review step before submission. Availability will depend on each supported website; the extension is not yet connected.' },
  { question: 'Can ATS Optimizer create a tailored resume for each job?', answer: 'The free workflow creates an AI-ready prompt grounded in your resume and target role. Direct, job-specific resume generation is a planned Premium feature and will use only verified experience, skills, and qualifications.' },
  { question: 'How does the Deep X-Ray Scan work?', answer: 'It examines the resume and job description for relevant skills, important keywords, gaps, evidence mismatches, related terminology, and concrete improvement opportunities.' },
  { question: 'Can I schedule automated job searches?', answer: 'Scheduled searches and qualification-based shortlisting are planned Premium capabilities. Automated job search is not currently active in this application.' },
]

function Logo() {
  return <Link className="brand" to="/" aria-label="ATS Optimizer home"><img src={`${import.meta.env.BASE_URL}ats-optimizer-logo.svg`} width="2090" height="325" alt="" /></Link>
}

function NavigationContent({ onNavigate }: { onNavigate?: () => void }) {
  return <>
    <div className="site-nav__links">
      <a href="#how-it-works" onClick={onNavigate}>How It Works</a><a href="#features" onClick={onNavigate}>Features</a><a href="#pricing" onClick={onNavigate}>Pricing</a><a href="#faq" onClick={onNavigate}>FAQ</a>
    </div>
    <div className="site-nav__actions">
      <button className="nav-sign-in" type="button" disabled title="Sign in is not available yet">Sign In</button>
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

function PricingSection() {
  return <section id="pricing" className="landing-section pricing" aria-labelledby="pricing-title"><div className="landing-container">
    <SectionHeading id="pricing-title" eyebrow="Simple pricing" title="Start free. Go further when you’re ready." description="Get the essentials at no cost, or unlock a complete toolkit for tailoring, finding, and winning the right roles." />
    <div className="pricing-grid">{plans.map((plan) => {
      const isPremium = plan.name === 'Premium'
      return <article className={`pricing-card${isPremium ? ' pricing-card--featured' : ''}`} key={plan.name}>
        {isPremium ? <span className="pricing-card__badge"><Sparkles aria-hidden="true" /> 7 days free</span> : null}
        <div className="pricing-card__top">
          <div className="pricing-card__header"><p className="pricing-card__eyebrow">{plan.eyebrow}</p><h3>{plan.name}</h3><p>{plan.description}</p></div>
          <div className="pricing-card__price-wrap">{plan.trial ? <><p className="pricing-card__trial-price"><span>$0</span><small>for 7 days</small></p><p className="pricing-card__renewal">Then {plan.price} {plan.cadence}</p></> : <p className="pricing-card__price"><span>{plan.price}</span><small>{plan.cadence}</small></p>}</div>
        </div>
        <div className="pricing-card__divider" />
        <div className="pricing-card__features">
          {plan.groups.map((group) => <div className="pricing-card__group" key={group.title}><h4>{group.title}</h4><ul>{group.features.map((feature) => <li key={feature}><CircleCheck aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>)}
        </div>
        {plan.available ? <Link className={`landing-button pricing-card__action${isPremium ? ' landing-button--primary' : ' landing-button--outline'}`} to={scannerPath}>{plan.action} <ArrowRight aria-hidden="true" /></Link> : <button className="landing-button landing-button--outline pricing-card__action" type="button" disabled>{plan.action}</button>}
      </article>
    })}</div>
    <p className="pricing-footnote"><ShieldCheck aria-hidden="true" /> Try Premium free for 7 days, then continue for $50 USD per month.</p>
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
function FooterLinkGroup({ title, children }: { title: string; children: ReactNode }) { return <div className="footer-group"><h3>{title}</h3>{children}</div> }
function Footer() {
  return <footer className="site-footer"><div className="landing-container site-footer__grid">
    <div className="footer-brand"><Logo /><p>Build a stronger resume and land more interviews.</p></div>
    <FooterLinkGroup title="Product"><a href="#how-it-works">How It Works</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></FooterLinkGroup>
    <FooterLinkGroup title="Resources"><span>Resume Tips</span><span>Interview Guides</span><span>Career Advice</span><span>Blog</span></FooterLinkGroup>
    <FooterLinkGroup title="Company"><span>Contact</span><span>Privacy Policy</span><span>Terms of Service</span></FooterLinkGroup>
    <div className="footer-newsletter"><h3>Stay Updated</h3><p>Get career tips and product updates.</p><div className="footer-newsletter__action"><button type="button" disabled title="Newsletter subscriptions are coming soon">Subscribe <ArrowRight aria-hidden="true" /></button></div></div>
  </div><div className="landing-container site-footer__bottom"><p>© {new Date().getFullYear()} ATS Optimizer. All rights reserved.</p><p><span>Privacy</span><span>Terms</span><span>Cookies</span></p></div></footer>
}

export function LandingPage() {
  return <div className="landing-page"><Header /><main><HeroSection /><HowItWorksSection /><FeaturesSection /><PricingSection /><FAQSection /><CTASection /></main><Footer /></div>
}
