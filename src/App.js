import React, { useEffect, useState } from "react";
import "./App.css";

const projects = [
  {
    id:"01", type:"PERSONAL / OPEN SOURCE", title:"Embedding Drift Detection",
    intro:"An open-source Python library that monitors whether the embedding distribution behind a RAG system is changing over time.",
    problem:"A retrieval system can keep running while its vector distribution drifts, quietly weakening retrieval quality before teams notice a problem.",
    approach:["Compare reference and current embeddings using Maximum Mean Discrepancy (MMD²) with an RBF kernel.","Measure Wasserstein distance across PCA dimensions to inspect distribution movement.","Apply permutation testing to assess whether observed drift is statistically significant.","Use adaptive sampling to balance monitoring cost and detection sensitivity."],
    architecture:["Reference vectors","Current vectors","Drift statistics","Significance test","Drift diagnosis"],
    outcome:"A reusable library for identifying and diagnosing embedding drift, query shift and data staleness in vector-based retrieval systems.",
    stack:["Python","NumPy","SciPy","scikit-learn","PCA","MMD²","Wasserstein"],
    repo:"https://github.com/sarthakpande108/embedding-drift-lib", extra:"https://pypi.org/project/embedding-drift-lib/", extraLabel:"PyPI package",
    note:"Installable Python package. Runs locally without an external service or API key.", visual:"drift"
  },
  {
    id:"02", type:"PERSONAL / FLAGSHIP", title:"GenAI Trading Engine",
    intro:"An AI-assisted market research and paper-trading system that keeps quantitative calculations separate from LLM-generated interpretation.",
    problem:"Market analysis needs current data and repeatable calculations. A language model should interpret structured market context, not invent prices or calculate core indicators.",
    approach:["Fetch Indian equity market data through Angel One SmartAPI.","Calculate technical indicators and risk inputs deterministically in application code.","Pass structured market context to Gemini for constrained research commentary and a directional outlook.","Persist analyses and forecast outcomes in Neon PostgreSQL and support paper-portfolio workflows."],
    architecture:["Angel One market data","Indicators + risk logic","Gemini structured analysis","Neon persistence","Paper portfolio"],
    outcome:"A full-stack research workflow with a clear boundary between deterministic market calculations and probabilistic LLM interpretation.",
    stack:["Node.js","Gemini API","Angel One SmartAPI","Neon PostgreSQL","Vercel"],
    repo:"https://github.com/sarthakpande108/genai-trading-engine", extra:"https://genai-trading-engine.vercel.app/", extraLabel:"Live application",
    note:"Research and paper trading only; it does not place live broker orders. The hosted analysis flow requires runtime credentials.", visual:"market"
  },
  {
    id:"03", type:"PERSONAL / AGENTIC AI", title:"Autonomous LinkedIn Content Agent",
    intro:"A human-in-the-loop agentic workflow that separates content discovery, topic prioritisation and writing into inspectable stages.",
    problem:"Researching a topic, deciding whether it is worth sharing and drafting a useful post are distinct tasks that benefit from specialised steps and human review.",
    approach:["Discover relevant source material and candidate topics.","Rank topics using language-model and heuristic signals.","Generate a draft through a dedicated writing stage.","Keep human approval before publishing and trace workflow execution."],
    architecture:["Discover","Rank","Draft","Human approval"],
    outcome:"A staged content-creation agent where research, prioritisation and drafting can be inspected independently before a person approves publication.",
    stack:["Python","LangGraph","LangSmith","Agentic AI"],
    repo:"https://github.com/sarthakpande108/Linkedin-Automation", visual:"agent"
  }
];

const experience = [
 {date:"FEB 2025 — PRESENT",role:"AI / GenAI Engineer",company:"Cognizant Technology Solutions",kind:"Enterprise GenAI",summary:"Building enterprise-grade GenAI solutions across multi-agent orchestration, retrieval-augmented generation, document intelligence and workflow automation.",points:[
  "Enterprise agentic AI platform: Designed a GCP-based agent workflow with a root orchestrator and specialised domain agents, using A2A for agent coordination and MCP for enterprise tool access.",
  "HR and policy assistant: Implemented domain-aware keyword selection with BM25 retrieval, limiting search to the most relevant terms and supporting contextual multi-turn conversations through session and event state.",
  "RFP and proposal intelligence: Built an asynchronous document-ingestion and retrieval workflow with document-level discovery followed by slide/page-level evidence retrieval; applied HyDE and multi-hop expansion, with RAGAS evaluation and guardrails.",
  "GenAI PowerPoint automation: Contributed to a workflow that retrieves relevant corporate presentations, matches source material to user-provided documents using RAG, and generates tailored proposal presentations—helping reduce RFP preparation time by up to 80%.",
  "Enterprise data migration: Supported a large US airline migration from Teradata to Amazon Redshift, validating downstream Tableau and Alteryx data pipelines."
 ]}
];

const stack = [
 ["LLM & retrieval","RAG","Embeddings","HyDE","Multi-hop retrieval","LangChain","LlamaIndex","RAGAS"],
 ["Agentic systems","Multi-agent orchestration","A2A","MCP","Tool calling","BM25","Session state","Human-in-the-loop"],
 ["ML & data","Python","SQL","Pandas","NumPy","scikit-learn","Transformers","PCA"],
 ["Cloud & engineering","GCP","Azure OpenAI","Azure AI Search","AWS SageMaker","FastAPI","Node.js","Docker","Git"]
];

function SectionLabel({n,children}) { return <div className="section-label"><span>{n}</span><i/><b>{children}</b></div>; }
function Diagram({kind,items}) {
 return <div className={"diagram "+kind} role="img" aria-label={"Animated conceptual architecture: "+items.join(" flows to ")}>
   <div className="diagram-caption"><span className="diagram-live-dot"/> LIVE SYSTEM FLOW <span> / CONCEPTUAL ARCHITECTURE</span></div>
   <div className="diagram-flow">{items.map((item,i)=><React.Fragment key={item}><div className={"diagram-node "+(i===Math.floor(items.length/2)?"active":"")} style={{"--node-index":i}}><small>0{i+1} <span> / {i===0?"INPUT":i===items.length-1?"OUTPUT":"PROCESS"}</span></small><b>{item}</b><i className="node-status"/></div>{i<items.length-1&&<span className="diagram-arrow" aria-hidden="true"><i/></span>}</React.Fragment>)}</div>
   <div className="diagram-foot"><span className="signal"/> <span>Data moves left to right</span><span className="diagram-foot-note">Illustrative architecture · not a live telemetry feed</span></div>
 </div>;
}
function Project({project}) {
 const [open,setOpen]=useState(project.id==="01");
 return <article className="case-study" id={"project-"+project.id}>
   <div className="case-top"><span>{project.id} / {project.type}</span><span className="case-mark">{project.visual==="drift"?"RAG OBSERVABILITY":project.visual==="market"?"QUANT + GENAI":"SYSTEM DESIGN"}</span></div>
   <div className="case-intro"><div><h3>{project.title}<span>.</span></h3><p>{project.intro}</p></div><div className={"case-art "+project.visual}><div className="art-orbit"/><div className="art-core">{project.visual==="drift"?"Δ":project.visual==="market"?"↗":project.visual==="agents"?"A2A":project.visual==="rfp"?"RAG":project.visual==="agent"?"↳":"K"}</div><div className="art-caption">{project.visual==="drift"?"VECTOR SPACE":project.visual==="market"?"MARKET SIGNAL":project.visual==="agents"?"AGENT ROUTING":project.visual==="rfp"?"RETRIEVAL PIPELINE":project.visual==="agent"?"WORKFLOW":"KNOWLEDGE"}</div></div></div>
   <Diagram kind={project.visual} items={project.architecture}/>
   <div className="case-summary"><div><small>THE PROBLEM</small><p>{project.problem}</p></div><div><small>WHAT I BUILT</small><p>{project.outcome}</p></div></div>
   <button className="expand-button" onClick={()=>setOpen(!open)} aria-expanded={open}><span>{open?"Close technical breakdown":"Explore technical breakdown"}</span><b>{open?"−":"+"}</b></button>
   {open&&<div className="case-details"><div><small>ENGINEERING APPROACH</small><ol>{project.approach.map((item,i)=><li key={item}><span>0{i+1}</span>{item}</li>)}</ol></div><div className="case-stack"><small>TECHNOLOGIES</small><div>{project.stack.map(s=><span key={s}>{s}</span>)}</div>{project.note&&<p className="project-note">{project.note}</p>}</div></div>}
   <div className="case-links">{project.repo&&<a href={project.repo} target="_blank" rel="noreferrer">Source code ↗</a>}{project.extra&&<a href={project.extra} target="_blank" rel="noreferrer">{project.extraLabel} ↗</a>}{project.href&&<a href={project.href} target="_blank" rel="noreferrer">Open project ↗</a>}</div>
 </article>;
}

export default function App() {
 const [menu,setMenu]=useState(false);
 useEffect(() => {
   const selector = [
     ".hero-status", ".hero h1", ".hero-statement", ".hero-bottom",
     ".section-label", ".about-copy > *", ".about-facts > div",
     ".section-heading > *", ".experience-item", ".case-study",
     ".case-intro > *", ".diagram", ".case-summary > div",
     ".expand-button", ".case-details > div", ".case-links > a",
     ".stack-grid article", ".principle-grid article", ".contact > *"
   ].join(",");
   const targets = Array.from(document.querySelectorAll(selector));
   if (!targets.length) return;
   if (!("IntersectionObserver" in window)) {
     targets.forEach(el => el.classList.add("scroll-revealed"));
     return;
   }

   const observer = new IntersectionObserver(entries => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add("scroll-revealed");
         observer.unobserve(entry.target);
       }
     });
   }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

   targets.forEach((el, index) => {
     el.classList.add("scroll-reveal");
     // Small stagger within groups; cap it so large sections don't feel sluggish.
     const siblingIndex = Array.from(el.parentElement?.children || []).indexOf(el);
     el.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 4) * 85}ms`);
     observer.observe(el);
   });

   return () => observer.disconnect();
 }, []);
 return <div className="portfolio">
  <header className="site-header"><a className="monogram" href="#home">SP<span>.</span></a><nav className={menu?"nav-open":""}>{[["About","#about"],["Experience","#experience"],["Projects","#projects"],["Stack","#stack"]].map(([label,href])=><a href={href} key={href} onClick={()=>setMenu(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={()=>setMenu(false)}>Let's talk ↗</a></nav><button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?"×":"☰"}</button></header>
  <main id="home">
   <section className="hero">
    <div className="hero-status"><i/> AI / GENAI ENGINEER <span>BASED IN PUNE, INDIA</span></div>
    <h1>Sarthak<br/><em>Pande</em><span className="period">.</span></h1>
    <p className="hero-statement">I build <strong>AI systems</strong> that retrieve, reason and operate — from RAG reliability tooling to agentic enterprise workflows.</p>
    <div className="hero-bottom"><div className="hero-location"><span className="avatar-mark">SP</span><div><b>GenAI Engineer</b><small>Cognizant Technology Solutions</small></div></div><a href="#projects" className="scroll-link">SCROLL TO EXPLORE ↓</a></div>
    <div className="hero-index">PORTFOLIO / 2026</div>
   </section>
   <section id="about" className="section about"><SectionLabel n="01">WHO I AM</SectionLabel><div className="about-copy"><h2>I’m an AI engineer focused on making intelligent systems <em>useful, measurable and dependable.</em></h2><p>My work sits across retrieval-augmented generation, multi-agent systems and applied machine learning. I care about the engineering beneath the interface: how information is indexed, how an agent chooses a tool, how an answer is grounded, and how we know a system is behaving correctly.</p><p>At Cognizant, I work on enterprise GenAI workflows. Outside that work, I build and publish tools such as Embedding Drift Detection and experiment with AI-assisted financial research systems.</p><div className="about-facts"><div><small>NOW</small><b>AI / GenAI Engineer</b><span>Cognizant · Feb 2025 — Present</span></div><div><small>BASED IN</small><b>Pune</b><span>Maharashtra, India</span></div><div><small>EDUCATION</small><b>B.E. — AI & Data Science</b><span>Savitribai Phule Pune University</span></div></div></div></section>
   <section id="experience" className="section experience"><SectionLabel n="02">EXPERIENCE</SectionLabel><div className="section-heading"><h2>Work I’ve been<br/><em>trusted to build.</em></h2><p>Selected enterprise GenAI and data-engineering initiatives delivered at Cognizant.</p></div><div className="experience-list">{experience.map((e,i)=><article className="experience-item" key={e.company}><div className="experience-date">{e.date}<span>0{i+1}</span></div><div className="experience-main"><div className="experience-heading"><div><h3>{e.company}</h3><b>{e.role}</b></div><span>{e.kind}</span></div><p className="experience-summary">{e.summary}</p><ul>{e.points.map(p=><li key={p}>{p}</li>)}</ul></div></article>)}</div></section>
   <section id="projects" className="section projects"><SectionLabel n="03">SELECTED PROJECTS</SectionLabel><div className="section-heading"><h2>Built from the<br/><em>problem outward.</em></h2><p>Each project starts with a concrete engineering problem, then makes the architecture and trade-offs visible.</p></div><div className="project-list">{projects.map(p=><Project key={p.id} project={p}/>)}</div></section>
   <section id="stack" className="section stack-section"><SectionLabel n="04">TOOLS & CAPABILITIES</SectionLabel><div className="section-heading"><h2>The tools behind<br/><em>the systems.</em></h2><p>A practical toolkit across retrieval, agent orchestration, data science and backend engineering.</p></div><div className="stack-grid">{stack.map(([name,...items],i)=><article key={name}><small>0{i+1} / CAPABILITY</small><h3>{name}</h3><div>{items.map(s=><span key={s}>{s}</span>)}</div></article>)}</div></section>
   <section className="section principles"><SectionLabel n="05">ENGINEERING PRINCIPLES</SectionLabel><div className="principle-grid"><article><b>01</b><h3>Deterministic where it matters.</h3><p>Keep calculations, constraints and validation in code. Use models for interpretation and synthesis where they add value.</p></article><article><b>02</b><h3>Retrieval is a product decision.</h3><p>Search quality, context selection and evidence traceability shape the quality of every downstream answer.</p></article><article><b>03</b><h3>Observe before it breaks.</h3><p>Evaluate outputs and monitor system behaviour instead of treating a successful response as proof of reliability.</p></article></div></section>
   <section id="contact" className="section contact"><SectionLabel n="06">GET IN TOUCH</SectionLabel><h2>Let’s build something<br/><em>that matters.</em></h2><p>Open to conversations about AI / GenAI engineering roles, RAG systems, agentic applications and applied ML.</p><a className="email-link" href="mailto:sarthakpande1008@gmail.com">sarthakpande1008@gmail.com ↗</a><div className="social-links"><a href="https://www.linkedin.com/in/sarthakpande108/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/sarthakpande108" target="_blank" rel="noreferrer">GitHub ↗</a><a href="/Sarthak_Pande_GenAI_Resume.pdf" target="_blank" rel="noreferrer">Resume PDF ↗</a></div></section>
  </main><footer><span>© {new Date().getFullYear()} SARTHAK PANDE</span><span>BUILT AROUND THE WORK.</span><a href="#home">BACK TO TOP ↑</a></footer>
 </div>;
}
