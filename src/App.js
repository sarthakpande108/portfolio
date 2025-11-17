import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- DATA STRUCTURES (PROFILE, SKILLS, PROJECTS, EXPERIENCE) ---

const profileData = {
  name: "Sarthak Pande",
  title: "AI/ML Engineer | Generative AI Enthusiast",
  summary:
    "Building end-to-end Generative AI solutions and autonomous Agentic AI workflows using LLMs, RAG, NLP, and computer vision. Skilled in predictive analytics, feature engineering, model optimization, and deploying models on AWS and Azure.",
  contact: {
    email: "sarthakpande1008@gmail.com",
    linkedin: "linkedin.com/in/sarthakpande108",
    github: "github.com/sarthakpande108",
  },
  photoUrl: "",
  resumeUrl: "#",
};

const skills = [
  {
    category: "GenAI & LLM",
    list: [
      "LLMs",
      "RAG",
      "Prompt Engineering",
      "Agentic AI",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Ollama",
      "Vector Databases",
    ],
  },
  {
    category: "ML & NLP",
    list: ["Deep Learning", "Transformers", "TensorFlow", "scikit-learn", "Hugging Face"],
  },
  {
    category: "Cloud & Data",
    list: [
      "AWS SageMaker",
      "Google Vertex AI",
      "Microsoft Azure",
      "SQL",
      "Snowflake",
      "Power BI",
      "Tableau",
    ],
  },
  { category: "Languages", list: ["Python", "SQL"] },
];

const projects = [
  {
    title: "Market Wings | AI Stock Insight Analyzer",
    description: [
      "Smart Chart Analytics: Converts uploaded stock charts into actionable insights with AI-driven technical analysis.",
      "Pattern & Trend Detection: Identifies key formations and interprets price movement to forecast market direction.",
      "Sentiment Backed Signals: Combines news sentiment with prediction confidence to suggest Buy, Sell, or Hold actions.",
    ],
    tech: ["Vertex AI","Gemini API", "Sentiment Analysis", "React","Market Analysis"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUqoRmaFWtsXcROjNHAOHvWunkTaWAQgK_VQ&s",
    link: "https://market-wings.vercel.app/"
  },
  {
    title: "GenAI-powered Financial Advisor",
    description: [
      "Fine-Tuning: Fine-tuned LLAMA 2 using QLORA to generate customized financial investment plans.",
      "Full-Stack Development: Developed a React.js frontend integrated with REST APIs for real-time recommendations.",
      "RAG Chatbot: Implemented an RAG-based chatbot for investment projections, improving decision accuracy by 30%.",
    ],
    tech: ["LLAMA 2 (QLORA)", "RAG", "React.js", "Flask/Node.js", "SQL"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBovNm2y50akepq3OlopW25yI_Km0FrgnPQ&s",
    link:"https://final-year-project-frontend-b1n7.onrender.com/"
  },
  {
    title: "Agentic AI LinkedIn Automation",
    description: [
      "Autonomous Content Engine: Automates LinkedIn posting using a multi-agent workflow with contextual intelligence.",
      "News Intelligence: Fetches niche-specific tech news via Tribo API and ranks relevance using custom scoring.",
      "Growth Impact: Increased engagement by 200% through AI-generated posts and user approval feedback-loop.",
    ],
    tech: ["Agentic AI", "LangChain", "Custom LLM", "Tribo API", "Automation"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3pThtHrNHUyYKC6DQ1Q6tH1tnUk1lezwDA&s",
    link: "https://github.com/sarthakpande108/Linkedin-Automation",
  },
  {
    title: "KTMantra | AI Knowledge Assistant",
    description: [
      "Smart KT Automation: Delivers interactive, step-by-step project knowledge through an AI-guided teacher experience.",
      "Document Intelligence: Ensures accurate answers using RAG over PDFs, DOCX, and proprietary internal documents.",
      "Faster Onboarding: Cuts KT dependency and reduces learning time by up to 70% for new team members.",
    ],
    tech: ["RAG System", "Gemini API", "Knowledge Transfer", "Conversational AI","Chatbot"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbEf7ZIcCp0yVN_AcmDL64uSIwuolb3YhmBA&s",
    link: "https://ktmantra.vercel.app/"
  },
  {
    title: "AI ATS Resume Matcher",
    description: [
      "Smart Resume Scoring: Compares candidate resumes with job descriptions using AI-driven relevance algorithms.",
      "Skill Gap Insights: Highlights missing skills and generates interview-style questions to improve match rate.",
      "Instant Fit Percentage: Displays ATS compatibility score and recommendations for resume optimization.",
    ],
    tech: ["Streamlit", "PyPDF2", "Google Gemini API", "Resume Parsing", "NLP"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41gEMf9AL4EvOUZUDUp4vLn-j5Ss-VVh-aQ&s",
    link: "https://github.com/sarthakpande108/ATS-Tracking",
  }
];

const experience = [
  {
    role: "AI/ML Engineer",
    company: "Cognizant Technology Solutions",
    duration: "Feb 2025 - Present",
    description: [
      "Data Integration: Focused on data integration and management, ensuring seamless migration and transformation of large-scale datasets.",
      "ETL & Automation: Leveraged Alteryx for data preparation, ETL automation, and process optimization.",
      "Cloud/Platform: Executed complex data migration from Amazon Redshift and Teradata platforms.",
    ],
  },
  {
    role: "Generative AI Engnieer",
    company: "AlgoArtha Pvt. Ltd., Pune",
    duration: "Sep 2024 - Dec 2024",
    description: [
      "RAG Development: Contributed to a production RAG system using LangChain, resulting in a 40% accuracy improvement in search.",
      "LLM Training: Fine-tuned a pre-trained LLM on 10,000 proprietary documents, achieving a 20% reduction in factual errors.",
      "Model Evaluation: Evaluated transformer models for text summarization, recording an F1-score of 0.85.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Productry",
    duration: "Dec 2023 - May 2024",
    description: [
      "SQL/ETL: Developed and maintained SQL queries for ETL processes, improving data warehousing efficiency by 30%.",
      "Dashboarding: Created over 10 dashboards (Tableau/Power BI) that guided strategic product decisions.",
      "Impact Analysis: Identified key performance indicators (KPIs), leading to a 15% increase in user engagement.",
    ],
  },
];

// --- HOOKS ---

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState({});
  const elementIdsRef = useRef(new Set());
  const observerRef = useRef(null);

  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        if (observerRef.current && entry.target) {
          observerRef.current.unobserve(entry.target);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(observerCallback, { threshold });
    observerRef.current = observer;

    elementIdsRef.current.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [threshold, observerCallback]);

  const getRevealProps = (id) => {
    elementIdsRef.current.add(id);
    const revealClassName = `transition-all duration-1000 ease-out ${
      isVisible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;
    return { id, className: revealClassName };
  };

  return getRevealProps;
};

const useNotification = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showNotification = (msg) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  const NotificationComponent = () => (
    <div
      className={`fixed bottom-5 right-5 z-[100] p-4 rounded-lg bg-pink-600 text-white shadow-xl transition-opacity duration-300 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      {message}
    </div>
  );

  return { showNotification, NotificationComponent };
};

// --- COMPONENTS (Header, Hero, Skills, Experience, Projects, Footer) ---

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['Skills', 'Experience', 'Projects', 'Contact'];

  return (
<header className="sticky top-0 z-50 p-4 bg-white/90 backdrop-blur-md border-b border-gray-300">
  	  <div className="container mx-auto flex justify-between items-center max-w-5xl px-4">
  	 	<h1 className="text-xl font-extrabold tracking-widest text-black uppercase">
  	 	  S.Pande <span className="text-pink-600 hidden sm:inline">AI</span>
  	 	</h1>
  	 	
  	 	{/* Desktop Nav */}
  	 	<nav className="hidden md:flex space-x-4">
  	 	  {navItems.map((item) => (
  	 	 	<a
  	 	 	  key={item}
  	 	 	  href={`#${item.toLowerCase()}`}
  	 	 	  className="text-gray-700 hover:text-pink-600 transition-colors text-sm uppercase tracking-wider font-medium"
  	 	 	>
  	 	 	  {item}
  	 	 	</a>
  	 	  ))}
  	 	</nav>

  	 	{/* Mobile Menu Button */}
  	 	<button
  	 	  className="md:hidden text-gray-700 hover:text-pink-600"
  	 	  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  	 	  aria-label="Toggle menu"
  	 	>
  	 	  {/* Hamburger Icon */}
  	 	  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  	 	 	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
  	 	  </svg>
  	 	</button>
  	  </div>
  	  
  	  {/* Mobile Menu Dropdown */}
  	  {isMobileMenuOpen && (
  	 	<div className="md:hidden absolute top-full left-0 right-0 bg-white/95 border-b border-gray-300 shadow-lg">
  	 	  <nav className="flex flex-col items-center space-y-4 py-4">
  	 	 	{navItems.map((item) => (
  	 	 	  <a
  	 	 	 	key={item}
  	 	 	 	href={`#${item.toLowerCase()}`}
  	 	 	 	onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
  	 	 	 	className="text-gray-700 hover:text-pink-600 transition-colors text-lg uppercase tracking-wider font-medium"
  	 	 	  >
  	 	 	 	{item}
  	 	 	  </a>
  	 	 	))}
  	 	  </nav>
  	 	</div>
  	  )}
  	</header>
  );
};

const HeroSection = ({ getRevealProps, showNotification }) => (
  <section className="min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 bg-white" id="home">
    <div className="container mx-auto text-center z-10 max-w-5xl">
      <p {...getRevealProps('hero-p')} className={`text-base sm:text-xl md:text-2xl font-mono text-pink-600 mb-4 sm:mb-6 tracking-wide ${getRevealProps('hero-p').className}`}>
        $ ./run_profile --load-sarthak
      </p>
      <h2 {...getRevealProps('hero-h2')} className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-black mb-4 sm:mb-6 leading-tight px-2 ${getRevealProps('hero-h2').className}`}>
        {profileData.name}
      </h2>
      <h3 {...getRevealProps('hero-h3')} className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 font-normal mb-8 sm:mb-10 px-4 ${getRevealProps('hero-h3').className}`}>
        {profileData.title}
      </h3>
      <div {...getRevealProps('hero-buttons')} className={`flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center items-center px-4 ${getRevealProps('hero-buttons').className}`}>
        <a href="#projects" className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 text-center shadow-lg">
          View Projects
        </a>
        <a
          href={profileData.resumeUrl}
          download="Sarthak_Pande_Resume.pdf"
          className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-pink-600 border-2 border-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 text-center"
        >
          Download Resume
        </a>
      </div>
    </div>
  </section>
);

const SkillsSection = ({ getRevealProps }) => {
  const [activeCategory, setActiveCategory] = useState(skills[0].category);
  const activeSkillList = skills.find((s) => s.category === activeCategory)?.list || [];
  return (
    <section id="skills" className="py-12 sm:py-20 bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        
        {/* Left Column: Title + Summary */}
        <div className="md:col-span-1">
          <h2 {...getRevealProps('section-skills-title')} className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4 sm:mb-6 ${getRevealProps('section-skills-title').className}`}>
            AI <span className="text-pink-600">Skill Tree</span>
          </h2>
          <div {...getRevealProps('skills-summary')} className={`p-4 sm:p-6 bg-white rounded-xl border border-gray-200 ${getRevealProps('skills-summary').className}`}>
            <p className="text-gray-600 text-sm sm:text-base italic leading-relaxed">{profileData.summary}</p>
          </div>
        </div>

        {/* Right Column: Tabbed Skills */}
        <div className="md:col-span-2">
          <div {...getRevealProps('skills-tab-container')} className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-6 ${getRevealProps('skills-tab-container').className}`}>
            <div className="flex flex-wrap justify-start sm:justify-center mb-6 border-b border-gray-200 gap-1">
              {skills.map((skill) => (
                <button key={skill.category} onClick={() => setActiveCategory(skill.category)} className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-semibold border-b-2 transition-all duration-300 ${activeCategory === skill.category ? 'text-pink-600 border-pink-600' : 'text-gray-500 border-transparent hover:text-pink-600 hover:border-pink-600'}`}>
                  {skill.category}
                </button>
              ))}
            </div>
            <div className="p-2 sm:p-4 min-h-[150px]">
              <h3 className="text-lg sm:text-xl font-bold text-pink-600 mb-3 sm:mb-4">{activeCategory} Stack:</h3>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {activeSkillList.map((item, i) => (
                  <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-mono text-gray-800 bg-gray-200 rounded-full shadow-sm transition-all duration-300 transform hover:bg-pink-600 hover:text-white hover:scale-105">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceTimeline = ({ getRevealProps }) => (
  <section id="experience" className="py-12 sm:py-20 bg-white">
    <div className="container mx-auto px-4 sm:px-6 max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      
      {/* Left Column: Title */}
      <div className="md:col-span-1">
        <h2 {...getRevealProps('section-exp-title')} className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-black ${getRevealProps('section-exp-title').className}`}>
          Professional <span className="text-pink-600">Log</span>
        </h2>
      </div>

      {/* Right Column: Timeline */}
      <div className="md:col-span-2 space-y-6 sm:space-y-8">
        {experience.map((item, index) => (
          <div key={index} {...getRevealProps(`exp-${index}`)} className={`relative pl-6 sm:pl-8 pb-8 sm:pb-12 last:pb-0 ${getRevealProps(`exp-${index}`).className}`}>
            <div className="absolute top-0 left-1.5 sm:left-2 w-0.5 bg-pink-200 h-full"></div>
            <div className="absolute top-1 -left-1 sm:-left-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-pink-500 border-2 border-white"></div>
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:bg-gray-50/50 hover:border-gray-300 hover:shadow-md">
              <div className="flex flex-col mb-2">
                <h4 className="text-lg sm:text-xl font-semibold text-black mb-1">{item.role}</h4>
                <p className="text-gray-500 text-xs sm:text-sm">{item.duration}</p>
              </div>
              <p className="text-pink-600 text-sm sm:text-base mb-3 font-medium">{item.company}</p>
              <ul className="text-gray-600 space-y-1.5 sm:space-y-2 list-disc list-inside marker:text-pink-600">
                {item.description.map((desc, i) => (
                  <li key={i} className="text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSection = ({ getRevealProps }) => (
  <section id="projects" className="py-12 sm:py-20 bg-gray-50 border-t border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
      <h2 {...getRevealProps('section-projects-title')} className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-10 sm:mb-16 text-black ${getRevealProps(`section-projects-title`).className}`}>
        <span className="text-pink-600">Project</span> Files
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {projects.map((project, index) => (
          <div key={index} {...getRevealProps(`project-card-${index}`)} className={`group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-pink-300/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl ${getRevealProps(`project-card-${index}`).className}`}>
            {/* Project Image */}
            <div className="relative w-full h-40 sm:h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                onError={(e) => (e.target.src = 'https://placehold.co/800x450/F0F0F0/333333?text=Project+Image')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-70"></div>
            </div>

            {/* Project Details */}
            <div className="flex flex-col flex-grow p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-pink-600 mb-2 group-hover:text-pink-700 transition-colors">{project.title}</h3>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs font-mono text-pink-800 bg-pink-100 px-2 py-1 rounded-full border border-pink-200">{tech}</span>
                ))}
              </div>

              {/* Description */}
              <ul className="text-gray-600 text-xs sm:text-sm space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 list-disc list-inside marker:text-pink-600">
                {project.description.map((item, i) => (
                  <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>

              {/* Button */}
              <div className="mt-auto pt-2 sm:pt-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block py-2 sm:py-2.5 text-sm font-semibold text-white text-center bg-pink-600 rounded-lg hover:bg-pink-700 hover:scale-[1.02] transition-all duration-300"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const getRevealProps = useScrollReveal();
  const { showNotification, NotificationComponent } = useNotification();

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <style>{`
        /* Subtle animation for the hero section */
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: rgb(219, 39, 119) } /* Pink-600 */
        }
        #hero-p {
          overflow: hidden; 
          white-space: nowrap; 
          border-right: .15em solid rgb(219, 39, 119); /* Pink-600 */
          animation: 
            typing 3s steps(40, end),
            blink-caret .75s step-end infinite;
        }
      `}</style>
      <Header />

      <main>
        {/* 1. HERO SECTION (TERMINAL STYLE) */}
        <HeroSection getRevealProps={getRevealProps} showNotification={showNotification} />

        {/* 2. SKILLS SECTION (TABBED INTERFACE) */}
        <SkillsSection getRevealProps={getRevealProps} />

        {/* 3. EXPERIENCE SECTION (TIMELINE) */}
        <ExperienceTimeline getRevealProps={getRevealProps} />

        {/* 4. PROJECTS SECTION (DYNAMIC GRID) */}
        <ProjectsSection getRevealProps={getRevealProps} />
      </main>

      {/* 5. FOOTER / CONTACT */}
      <footer id="contact" className="py-10 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <p className="text-gray-600 mb-4">Let's build the future of AI together.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center mb-6">
            <a href={`mailto:${profileData.contact.email}`} className="text-pink-600 hover:text-pink-700 transition-colors font-medium">
              {profileData.contact.email}
            </a>
            <a href={`https://${profileData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors font-medium">
              LinkedIn
            </a>
            <a href={`https://${profileData.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors font-medium">
              GitHub
            </a>
          </div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Sarthak Pande Portfolio. Built with React & Tailwind.</p>
        </div>
      </footer>
      <NotificationComponent />
    </div>
  );
};

export default App;