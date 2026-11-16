import React, { useEffect, useState } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    category: "OPEN SOURCE · RAG OBSERVABILITY",
    name: "Embedding Drift Detection",
    description: "A Python library that helps teams detect when the vector distributions behind a RAG system begin to change.",
    challenge: "Retrieval quality can quietly degrade as embedding distributions shift, even while the application appears healthy.",
    details: [
      "Measures distribution change with MMD² using an RBF kernel.",
      "Tracks Wasserstein distance across PCA dimensions.",
      "Uses permutation testing to assess statistical significance.",
      "Applies adaptive sampling to balance detection quality and monitoring cost."
    ],
    flow: ["Reference vectors", "Drift metrics", "Statistical test", "Diagnosis"],
    tags: ["Python", "NumPy", "SciPy", "scikit-learn", "MMD²", "Wasserstein"],
    links: [{ label: "GitHub", url: "https://github.com/sarthakpande108/embedding-drift-lib" }, { label: "PyPI", url: "https://pypi.org/project/embedding-drift-lib/" }]
  },
  {
    number: "02",
    category: "COMPLETED · FINTECH",
    name: "GenAI Trading Engine",
    description: "An AI-assisted market research and paper-trading platform with a deliberate boundary between quantitative logic and LLM interpretation.",
    challenge: "Market analysis needs reliable data and repeatable calculations. A language model should interpret structured context—not invent prices or indicators.",
    details: [
      "Fetches Indian equity market data through Angel One SmartAPI.",
      "Calculates technical indicators and risk inputs in deterministic application code.",
      "Uses Gemini for structured research commentary and directional analysis.",
      "Stores analyses and forecast outcomes in Neon PostgreSQL."
    ],
    flow: ["Angel One data", "Indicators + risk", "Gemini analysis", "Neon database"],
    tags: ["Node.js", "Gemini API", "Angel One", "PostgreSQL", "Vercel"],
    links: [{ label: "GitHub", url: "https://github.com/sarthakpande108/genai-trading-engine" }, { label: "Live app", url: "https://genai-trading-engine.vercel.app/" }],
    note: "Completed and deployed. Research and paper trading only; it does not place live broker orders."
  },
  {
    number: "03",
    category: "PERSONAL PROJECT · AGENTIC AI",
    name: "Autonomous LinkedIn Content Agent",
    description: "A human-in-the-loop workflow that separates content discovery, topic ranking and drafting into inspectable stages.",
    challenge: "Useful content needs research and prioritisation before writing. A single prompt hides those steps and makes quality harder to review.",
    details: [
      "Discovers relevant source material and candidate topics.",
      "Ranks topics using model-based and heuristic signals.",
      "Generates drafts through a dedicated writing stage.",
      "Keeps human approval before publication and traces workflow execution."
    ],
    flow: ["Discover", "Prioritise", "Draft", "Human review"],
    tags: ["Python", "LangGraph", "LangSmith", "Agentic AI"],
    links: [{ label: "GitHub", url: "https://github.com/sarthakpande108/Linkedin-Automation" }]
  }
];

const experiencePoints = [
  ["Agentic AI platform", "Built the HR-domain agent workflow within a GCP-based multi-agent system, using A2A coordination and MCP-powered enterprise retrieval. Implemented LLM-driven catalogue keyword selection and boosting, sensitive-query guardrails, localization, specialist policy/content agents, semantic reranking and conversation state."],
  ["RFP proposal intelligence", "Built asynchronous document ingestion and layered retrieval to find relevant proposal material and surface slide- and page-level evidence. Applied HyDE, multi-hop retrieval expansion, RAGAS evaluation and guardrails to support grounded RFP responses."],
  ["Client-specific RFP template generator", "Built an end-to-end generator that takes a client's website URL, extracts its brand imagery and visual theme, then uses Gemini and Claude LLMs to create a tailored RFP presentation template aligned with the client's identity."]
];

const skills = [
  { title: "LLM applications", items: ["LLMs", "RAG", "Embeddings", "Vector databases", "LangChain", "LlamaIndex", "HyDE", "RAGAS", "BM25"] },
  { title: "Agentic systems", items: ["LangGraph", "Multi-agent orchestration", "A2A", "MCP", "Tool calling", "Human-in-the-loop", "Session state"] },
  { title: "Backend engineering", items: ["Python", "FastAPI", "Node.js", "REST APIs", "SQL", "PostgreSQL", "Async processing", "Docker", "Git"] },
  { title: "ML & infrastructure", items: ["Transformers", "scikit-learn", "Pandas", "NumPy", "PCA", "Google Cloud", "Vertex AI", "Azure AI", "AWS SageMaker"] }
];

function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>;
}

function AgenticCaseStudy() {
  const node = (number, title, detail, tone = "") => (
    <article className={`hr-flow-node ${tone}`}>
      <span>{number}</span><h4>{title}</h4><p>{detail}</p>
    </article>
  );
  return <section className="agentic-case-study" aria-labelledby="hr-case-title">
    <div className="case-study-heading">
      <div><span className="case-study-kicker">FEATURED SYSTEM · AGENTIC AI</span><h3 id="hr-case-title">Enterprise HR intelligence</h3></div>
      <span className="case-study-mark">A2A <i>×</i> MCP</span>
    </div>
    <p className="case-study-lede">A compact view of the HR workflow I engineered: LLM-guided query understanding, specialist retrieval, semantic relevance checks and grounded responses.</p>

    <div className="hr-flowchart compact-flowchart" role="img" aria-label="Six-stage HR agent workflow: user question, HR domain orchestration, query intelligence and guardrails, specialist agents and Liferay MCP search, semantic reranking and relevance-based response.">
      <div className="hr-flow-row single">{node("01", "User question", "HR policy or employee query", "user-node")}</div>
      <div className="hr-flow-down"><i /></div>
      <div className="hr-flow-row single">{node("02", "HR domain orchestration", "A2A session routes the request into my domain workflow", "core-node")}</div>
      <div className="hr-flow-down"><i /></div>
      <div className="hr-flow-row single"><div className="hr-flow-panel"><span className="hr-flow-panel-label">03 / QUERY INTELLIGENCE & GUARDRAILS</span><div className="hr-flow-columns"><div className="hr-flow-subnode"><b>Keyword selection</b><p>LLM selects up to 3 catalogue terms</p></div><div className="hr-flow-subnode"><b>Safety checks</b><p>Sensitive topics route to fallback</p></div><div className="hr-flow-subnode"><b>Localization</b><p>Adds location-aware context</p></div></div><div className="hr-flow-inline-down"><i /></div><div className="hr-flow-boost"><b>LLM keyword boosting</b><span>Topic, intent and knowledge context refine retrieval</span></div></div></div>
      <div className="hr-flow-down"><i /><small>RETRIEVAL</small></div>
      <div className="hr-flow-row single"><div className="hr-flow-panel"><span className="hr-flow-panel-label">04 / SPECIALIST AGENTS + ENTERPRISE SEARCH</span><div className="hr-flow-columns two"><div className="hr-flow-subnode agent-tool"><b>Policy agent</b><p>Policy-focused lookup</p></div><div className="hr-flow-subnode agent-tool"><b>HR content agent</b><p>Knowledge lookup via Liferay MCP</p></div></div><p className="hr-flow-search-note">Lucene search on Elasticsearch · top 5 documents</p></div></div>
      <div className="hr-flow-down"><i /></div>
      <div className="hr-flow-row single">{node("05", "Google Semantic Reranker", "Scores retrieved evidence for semantic relevance", "rerank-node")}</div>
      <div className="hr-flow-down"><i /></div>
      <div className="hr-flow-row single"><div className="hr-flow-decision"><span>06</span><b>Relevance check</b><small>Does the evidence meet the quality threshold?</small></div></div>
      <div className="hr-flow-outcomes"><div className="hr-flow-outcome full"><b>Grounded answer</b><span>Strong evidence</span></div><div className="hr-flow-outcome partial"><b>Partial answer</b><span>Limited evidence</span></div><div className="hr-flow-outcome fallback"><b>Fallback</b><span>Low relevance / sensitive</span></div></div>
      <div className="hr-flow-state"><span>STATE ACROSS TURNS</span> Session · conversation context · localization · selected keywords</div>
    </div>

    <div className="case-study-contribution"><span>MY ENGINEERING CONTRIBUTION</span><p>Implemented the HR-domain orchestration, LLM-based keyword selection and boosting, semantic-catalogue guardrails, localization handling, specialist-agent/MCP retrieval integration, reranker-based relevance handling and conversation state. The upstream root orchestrator was implemented by another team member.</p></div>
    <div className="case-study-footnote">Architecture shown at a system level; internal prompts, thresholds and enterprise implementation details are intentionally not disclosed.</div>
  </section>;
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="project-card">
      <div className="project-card-top"><span>{project.number}</span><span>{project.category}</span></div>
      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-flow" aria-label={`Workflow: ${project.flow.join(" to ")}`}>
        <div className="flow-track">
          {project.flow.map((step, index) => <React.Fragment key={step}>
            <div className={`flow-node flow-node-${index + 1}`}>
              <span className="flow-node-index">0{index + 1}</span>
              <span className="flow-step">{step}</span>
            </div>
            {index < project.flow.length - 1 && <span className="flow-connector" aria-hidden="true"><i /></span>}
          </React.Fragment>)}
        </div>
        <span className="flow-caption">ENGINEERING FLOW</span>
      </div>
      <div className="project-challenge"><b>THE PROBLEM</b><p>{project.challenge}</p></div>
      {expanded && <div className="project-details">
        <b>ENGINEERING NOTES</b>
        <ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        {project.note && <p className="project-note">{project.note}</p>}
      </div>}
      <div className="project-bottom">
        <button className="text-button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? "Hide technical details" : "View technical details"} <span>{expanded ? "−" : "+"}</span>
        </button>
        <div className="project-links">{project.links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
      </div>
      <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [["About", "#about"], ["Experience", "#experience"], ["Projects", "#projects"], ["Skills", "#skills"]];
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const selector = ".about, .experience-card, .section-heading, .project-card, .skill-group, .contact-main, .contact-links";
    const elements = Array.from(document.querySelectorAll(selector));
    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });

    elements.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Sarthak Pande home">SP<span>.</span></a>
        <nav className={menuOpen ? "main-nav nav-visible" : "main-nav"}>
          {nav.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Contact <span>↗</span></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "✕" : "☰"}</button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="availability-dot" /> BACKEND AI ENGINEER <i /> PUNE, INDIA</div>
            <h1>Hi, I’m <span>Sarthak.</span><br/>Backend AI<br/><span>/ GenAI Engineer.</span></h1>
            <p className="hero-lede">I build production-minded AI backends with <strong>Python, APIs, RAG pipelines, LLM applications and multi-agent orchestration</strong> — from data ingestion to reliable retrieval and response handling.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#projects">Explore my work <span>↘</span></a>
              <a className="button-secondary" href="mailto:sarthakpande1008@gmail.com">Get in touch <span>↗</span></a>
            </div>
            <div className="hero-meta"><span>AI / GENAI ENGINEER</span><i /> <span>COGNIZANT · FEB 2025—PRESENT</span></div>
          </div>
          <aside className="hero-aside">
            <div className="aside-label">WHAT I WORK ON</div>
            <div className="focus-list">
              <div><span>01</span><b>RAG & retrieval</b><small>Ingestion · embeddings · ranking · evaluation</small></div>
              <div><span>02</span><b>Agentic AI</b><small>LangGraph · A2A · MCP · tool orchestration</small></div>
              <div><span>03</span><b>Backend engineering</b><small>Python · FastAPI · Node.js · APIs · SQL</small></div>
            </div>
            <div className="aside-foot"><span>BACKEND · RAG · AGENTS · ML</span><span className="tiny-spark">✳</span></div>
          </aside>
          <div className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="section-intro"><Eyebrow>01 / ABOUT</Eyebrow><h2>Engineering first.<br/><em>AI where it helps.</em></h2></div>
          <div className="about-body">
            <p className="about-lead">I'm a backend-focused AI engineer interested in making intelligent systems useful, measurable and dependable.</p>
            <p>My work spans retrieval-augmented generation, multi-agent systems and applied machine learning. I enjoy solving the engineering problems underneath an AI product: selecting the right context, choosing tools, managing state, grounding responses and evaluating whether the system is actually working.</p>
            <div className="about-facts">
              <div><span>EDUCATION</span><b>B.E. · AI & Data Science</b><small>Savitribai Phule Pune University</small></div>
              <div><span>LOCATION</span><b>Pune, Maharashtra</b><small>India</small></div>
              <div><span>FOCUS</span><b>Backend AI / GenAI</b><small>RAG · Agents · AI infrastructure</small></div>
            </div>
          </div>
        </section>

        <section className="experience section-wrap" id="experience">
          <div className="section-heading"><div><Eyebrow>02 / EXPERIENCE</Eyebrow><h2>Where I work<span>.</span></h2></div><p>Enterprise AI engineering at scale, with a focus on retrieval, orchestration and workflow automation.</p></div>
          <article className="experience-card">
            <div className="experience-company">
              <div className="company-mark">C</div>
              <div><h3>Cognizant</h3><p>Technology Solutions</p></div>
              <span className="experience-period">FEB 2025 — PRESENT</span>
            </div>
            <div className="experience-content">
              <div className="role-line"><b>AI / GenAI Engineer</b><span>Enterprise GenAI</span></div>
              <p className="experience-intro">Building enterprise-grade GenAI solutions across multi-agent orchestration, retrieval-augmented generation, document intelligence and workflow automation.</p>
              <div className="work-list">{experiencePoints.map(([title, description], index) => <div className="work-item" key={title}><span>0{index + 1}</span><div><b>{title}</b><p>{description}</p></div></div>)}</div>\n              <AgenticCaseStudy />
            </div>
          </article>
        </section>

        <section className="projects section-wrap" id="projects">
          <div className="section-heading"><div><Eyebrow>03 / SELECTED WORK</Eyebrow><h2>Things I've built<span>.</span></h2></div><p>Personal projects and open-source work. Each one starts with a real engineering problem.</p></div>
          <div className="project-grid">{projects.map(project => <ProjectCard key={project.number} project={project}/>)}</div>
        </section>

        <section className="skills section-wrap" id="skills">
          <div className="section-heading"><div><Eyebrow>04 / TOOLKIT</Eyebrow><h2>How I build<span>.</span></h2></div><p>A practical toolkit for designing and shipping AI-powered backend systems.</p></div>
          <div className="skills-grid">{skills.map((group, index) => <article className="skill-group" key={group.title}><span className="skill-number">0{index + 1}</span><h3>{group.title}</h3><div className="tag-list">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div>
        </section>

        <section className="contact section-wrap" id="contact">
          <Eyebrow>05 / CONTACT</Eyebrow>
          <div className="contact-main"><h2>Have a good<br/><em>problem to solve?</em></h2><div><p>I'm open to Backend AI Engineer opportunities involving Python services, LLM applications, RAG systems, agentic workflows and AI infrastructure.</p><a className="contact-email" href="mailto:sarthakpande1008@gmail.com">sarthakpande1008@gmail.com ↗</a></div></div>
          <div className="contact-links"><a href="https://www.linkedin.com/in/sarthakpande108/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/sarthakpande108" target="_blank" rel="noreferrer">GitHub ↗</a><a href="/Sarthak_Pande_GenAI_Resume.pdf" target="_blank" rel="noreferrer">Resume PDF ↗</a></div>
        </section>
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} SARTHAK PANDE</span><span>DESIGNED & BUILT WITH CARE</span><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
  );
}
