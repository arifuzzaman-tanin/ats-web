import { ArrowLeft, ArrowUpRight, Check, Clipboard, Code2, Menu, Package, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const testPypiUrl = 'https://test.pypi.org/project/ats-optimizer/'
const githubUrl = 'https://github.com/arifuzzaman-tanin/ats-optimizer-backend'

const sections = [
  ['overview', 'Overview'],
  ['installation', 'Installation'],
  ['quick-start', 'Quick start'],
  ['file-inputs', 'File inputs'],
  ['result-object', 'Result object'],
  ['error-handling', 'Error handling'],
  ['web-frameworks', 'Web frameworks'],
  ['limitations', 'Limitations'],
] as const

function Logo() {
  return <Link className="brand" to="/" aria-label="ATS Optimizer home"><img src={`${import.meta.env.BASE_URL}ats-optimizer-logo.svg`} width="2090" height="325" alt="" /></Link>
}

function CopyButton({ value, label = 'Copy code' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  return <button className="code-copy" type="button" onClick={copy} aria-label={copied ? 'Copied' : label}>{copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}<span>{copied ? 'Copied' : 'Copy'}</span></button>
}

function CodeBlock({ children, copyValue, language = 'python' }: { children: string; copyValue?: string; language?: string }) {
  return <div className="docs-code"><div className="docs-code__bar"><span>{language}</span><CopyButton value={copyValue ?? children} /></div><pre><code>{children}</code></pre></div>
}

export function DocumentationPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.title = 'Python Library Documentation | ATS Optimizer'
    return () => { document.title = 'ATS Optimizer' }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    closeRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const installCommand = 'pip install --index-url https://test.pypi.org/simple/ ats-optimizer'
  const pdfInstallCommand = 'pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ "ats-optimizer[pdf]"'

  return <div className="docs-page">
    <header className="docs-header"><div className="docs-container docs-header__inner">
      <Logo /><span className="docs-header__divider" /><span className="docs-header__label">Documentation</span>
      <nav className="docs-header__links" aria-label="Documentation links"><Link to="/"><ArrowLeft aria-hidden="true" /> Website</Link><a href={githubUrl} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /> GitHub</a><a className="docs-header__package" href={testPypiUrl} target="_blank" rel="noreferrer"><Package aria-hidden="true" /> TestPyPI <ArrowUpRight aria-hidden="true" /></a></nav>
      <button className="docs-menu-button" type="button" aria-label="Open documentation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu aria-hidden="true" /></button>
    </div></header>

    <div className="docs-container docs-layout">
      <aside className={`docs-sidebar${menuOpen ? ' docs-sidebar--open' : ''}`} aria-label="Documentation navigation">
        <div className="docs-sidebar__mobile-head"><strong>On this page</strong><button ref={closeRef} type="button" aria-label="Close documentation menu" onClick={() => setMenuOpen(false)}><X aria-hidden="true" /></button></div>
        <p>Getting started</p>
        <nav>{sections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
        <div className="docs-sidebar__meta"><span>Current release</span><strong>v0.1.0</strong><small>Python 3.10+</small></div>
      </aside>
      {menuOpen ? <button className="docs-sidebar-backdrop" type="button" aria-label="Close documentation menu" onClick={() => setMenuOpen(false)} /> : null}

      <main className="docs-content">
        <section id="overview" className="docs-hero">
          <div className="docs-badge"><Package aria-hidden="true" /> ats-optimizer <span>v0.1.0</span></div>
          <h1 aria-label="ATS Optimizer Python library">ATS Optimizer<br /><span>Python library</span></h1>
          <p className="docs-lead">Deterministic resume-to-job skill coverage for any Python project. Analyze text or documents locally—without an API key, database, or AI model.</p>
          <div className="docs-callout docs-callout--info"><strong>What the score means</strong><p>The score measures recognized job skills that also appear in the resume. It is skill coverage, not a real ATS hiring score or a judgment of candidate quality.</p></div>
        </section>

        <section id="installation" className="docs-section"><p className="docs-kicker">01 — Installation</p><h2>Install the package</h2><p>This alpha release is currently published on TestPyPI. Install the base package for text and Markdown inputs:</p><CodeBlock language="terminal">{installCommand}</CodeBlock><p>To analyze text-based PDF files, install the optional PDF dependency:</p><CodeBlock language="terminal">{pdfInstallCommand}</CodeBlock><p className="docs-note">Python 3.10 or newer is required. Scanned PDFs must be processed with OCR before analysis.</p></section>

        <section id="quick-start" className="docs-section"><p className="docs-kicker">02 — Quick start</p><h2>Analyze two strings</h2><p>Create an optimizer and pass resume text plus a job description to <code>analyze()</code>.</p><CodeBlock>{`from ats_optimizer import ATSOptimizer

optimizer = ATSOptimizer()

result = optimizer.analyze(
    resume="Python developer with PostgreSQL experience",
    job_description="Python, SQL, PostgreSQL, and Docker required",
)

print(result.score)           # 50
print(result.matched_skills)  # ('postgresql', 'python')
print(result.missing_skills)  # ('docker', 'sql')`}</CodeBlock><p>The library uses a curated skill catalogue with aliases and contextual matching. Analysis is local and deterministic: the same inputs and package version produce the same result.</p></section>

        <section id="file-inputs" className="docs-section"><p className="docs-kicker">03 — File inputs</p><h2>Analyze local documents</h2><p>Pass <code>pathlib.Path</code> objects when your inputs are files. Plain strings are always interpreted as document text, not filenames.</p><CodeBlock>{`from pathlib import Path
from ats_optimizer import ATSOptimizer

result = ATSOptimizer().analyze(
    resume=Path("resume.pdf"),
    job_description=Path("job-description.txt"),
)`}</CodeBlock><div className="docs-support-grid"><div><strong>.txt</strong><span>Built in</span></div><div><strong>.md</strong><span>Built in</span></div><div><strong>.pdf</strong><span>Requires [pdf]</span></div><div className="docs-support-grid__muted"><strong>.docx</strong><span>Not supported yet</span></div></div></section>

        <section id="result-object" className="docs-section"><p className="docs-kicker">04 — Result object</p><h2>Work with structured results</h2><p><code>analyze()</code> returns an immutable <code>AnalysisResult</code>. Its main properties are:</p><div className="docs-table-wrap"><table><thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>score</code></td><td><code>int</code></td><td>Recognized skill coverage from 0–100</td></tr><tr><td><code>status</code></td><td><code>str</code></td><td>Display band for the coverage score</td></tr><tr><td><code>skills</code></td><td><code>tuple[SkillMatch, ...]</code></td><td>Detailed evidence for every recognized job skill</td></tr><tr><td><code>matched_skills</code></td><td><code>tuple[str, ...]</code></td><td>Canonical skills evidenced in both inputs</td></tr><tr><td><code>missing_skills</code></td><td><code>tuple[str, ...]</code></td><td>Job skills without resume evidence</td></tr><tr><td><code>warning</code></td><td><code>str | None</code></td><td>Present when no recognized job skills were found</td></tr></tbody></table></div><h3>Serialize to JSON</h3><CodeBlock>{`import json

payload = result.to_dict()
print(json.dumps(payload, indent=2))`}</CodeBlock></section>

        <section id="error-handling" className="docs-section"><p className="docs-kicker">05 — Error handling</p><h2>Catch package errors</h2><p>Catch <code>ATSOptimizerError</code> for any package-specific failure, or import a narrower exception when your application needs different recovery behavior.</p><CodeBlock>{`from ats_optimizer import ATSOptimizer, ATSOptimizerError

try:
    result = ATSOptimizer().analyze("My resume", "The job description")
except ATSOptimizerError as error:
    print(f"Analysis failed: {error}")`}</CodeBlock><p className="docs-note">Specific exceptions include <code>InvalidInputError</code>, <code>UnsupportedFileTypeError</code>, <code>MissingOptionalDependencyError</code>, and <code>DocumentReadError</code>.</p></section>

        <section id="web-frameworks" className="docs-section"><p className="docs-kicker">06 — Integration</p><h2>Use it in a web API</h2><p>Call the analyzer inside a Flask, FastAPI, or Django route and return <code>result.to_dict()</code> as JSON.</p><CodeBlock>{`from fastapi import FastAPI
from pydantic import BaseModel
from ats_optimizer import ATSOptimizer

app = FastAPI()
optimizer = ATSOptimizer()

class AnalysisRequest(BaseModel):
    resume: str
    job_description: str

@app.post("/analyze")
def analyze(payload: AnalysisRequest):
    result = optimizer.analyze(
        payload.resume,
        payload.job_description,
    )
    return result.to_dict()`}</CodeBlock></section>

        <section id="limitations" className="docs-section"><p className="docs-kicker">07 — Know the boundaries</p><h2>Important limitations</h2><ul className="docs-limitations"><li>Unknown skills are ignored until they are added to the catalogue.</li><li>A missing skill means it was not recognized in the resume text.</li><li>The package does not judge candidate quality or predict hiring outcomes.</li><li>It does not generate resume rewrites or recommendations.</li><li>DOCX and OCR for scanned PDFs are not currently supported.</li></ul><div className="docs-callout"><strong>Free for any project</strong><p>The package is released into the public domain under the Unlicense. You may use, copy, modify, publish, sell, or distribute it for any purpose, without warranty.</p></div></section>

        <footer className="docs-footer"><div><strong>Ready to integrate?</strong><p>Start with the quick-start example or inspect the source on GitHub.</p></div><a href={testPypiUrl} target="_blank" rel="noreferrer">Open TestPyPI <ArrowUpRight aria-hidden="true" /></a></footer>
      </main>
    </div>
  </div>
}
