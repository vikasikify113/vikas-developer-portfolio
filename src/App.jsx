import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const EMAIL = "vikasv6565@gmail.com";

const projects = [
  {
    title: "AlgoQuest",
    category: "Algorithm Learning Platform",
    type: "Full-Stack",
    description:
      "A gamified platform that makes learning Data Structures and Algorithms more engaging.",
    highlights: [
      "Gamified DSA learning experience",
      "React frontend with Node.js, Express and SQL backend",
      "Code execution support using Judge0",
    ],
    technologies: ["React", "Vite", "Node.js", "Express", "SQL"],
    image: "/images/algoquest.png",
    demo: "https://algoquest.org/",
    repo: "",
    caseStudy: {
      problem:
        "Learning Data Structures and Algorithms from videos and notes can feel boring and passive, so many students lose motivation.",
      solution:
        "I built a gamified platform where students learn DSA through levels and challenges, and run real code in the browser using Judge0.",
      challenges: [
        "Integrating code execution safely through the Judge0 API",
        "Structuring the backend with Express and SQL to store progress",
      ],
      learnings: [
        "Connecting a React frontend to a Node.js and SQL backend",
        "Working with third-party APIs and handling errors",
      ],
    },
  },
  {
    title: "Chess Master",
    category: "Interactive Web Application",
    type: "Frontend",
    description:
      "An interactive chess game built while exploring modern web development.",
    highlights: [
      "Playable chess board with interactive moves",
      "Clean, responsive interface",
      "Deployed online and open source on GitHub",
    ],
    technologies: ["JavaScript", "React", "Node.js"],
    image: "/images/chess-master.png",
    demo: "https://github.com/vikasikify113/Chess-master",
    repo: "https://github.com/vikasikify113/Chess-master",
    caseStudy: {
      problem:
        "I wanted a hands-on project to practice game logic and interactive user interfaces beyond simple static pages.",
      solution:
        "I built a playable chess game with an interactive board, where pieces move according to the game rules.",
      challenges: [
        "Implementing the movement rules for each chess piece",
        "Managing board state and turns cleanly in the UI",
      ],
      learnings: [
        "Managing complex application state",
        "Breaking a big problem into small, testable functions",
      ],
    },
  },
  {
    title: "FinTax",
    category: "Financial Technology",
    type: "Full-Stack",
    description:
      "A financial and tax information platform that makes complex information easier to explore.",
    highlights: [
      "Dashboard-style layout for easy navigation",
      "Structured presentation of financial data",
      "Deployed on Vercel",
    ],
    technologies: ["HTML", "CSS", "TypeScript", "Node.js", "SQL"],
    image: "/images/fintax.png",
    demo: "https://fintax-dashboard-prototype-8-331f.vercel.app/",
    repo: "",
    caseStudy: {
      problem:
        "Financial and tax information is often confusing and scattered, which makes it hard for people to understand.",
      solution:
        "I designed a dashboard-style platform that organizes financial and tax information into a clear, easy-to-explore layout.",
      challenges: [
        "Presenting a lot of information without overwhelming the user",
        "Designing a clean dashboard layout that works on different screens",
      ],
      learnings: [
        "Designing user-friendly dashboards",
        "Deploying a project online with Vercel",
      ],
    },
  },
  {
    title: "Leaf AI",
    category: "College Codeathon / Team Project",
    type: "AI",
    description:
      "An AI-powered website for detecting crop and leaf diseases, built with a team.",
    highlights: [
      "Built as a team for a college codeathon",
      "AI-powered crop disease detection",
      "Focused on a practical, real-world problem",
    ],
    technologies: ["AI", "Web Development"],
    image: "/images/leaf-ai.png",
    demo: "https://leaf-teller-ai.lovable.app",
    repo: "https://github.com/vikasikify113/leaf-teller-ai",
    caseStudy: {
      problem:
        "Farmers often cannot identify crop diseases early, which leads to crop loss.",
      solution:
        "With my team, I built a website that uses AI to detect leaf and crop diseases from an uploaded image.",
      challenges: [
        "Building a working prototype within the codeathon time limit",
        "Coordinating work across the team",
      ],
      learnings: [
        "Teamwork and dividing tasks under a deadline",
        "Integrating AI features into a web interface",
      ],
    },
  },
  {
    title: "LuxeDining",
    category: "Restaurant Website",
    type: "Frontend",
    description:
      "A responsive restaurant website with an elegant interface and interactive user experience.",
    highlights: [
      "Fully responsive across devices",
      "Elegant, modern UI design",
      "Hosted on GitHub Pages",
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/images/luxedining.png",
    demo: "https://vikasikify113.github.io/restaurant/",
    repo: "https://github.com/vikasikify113/restaurant",
    caseStudy: {
      problem:
        "Many small restaurant websites look outdated and do not work well on phones.",
      solution:
        "I built a responsive restaurant website with an elegant design and smooth interactions that works on all screen sizes.",
      challenges: [
        "Making the layout look good on mobile, tablet and desktop",
        "Keeping the design elegant while staying fast to load",
      ],
      learnings: [
        "Responsive design with CSS Flexbox, Grid and media queries",
        "Hosting a static site on GitHub Pages",
      ],
    },
  },
];

const filters = ["All", "Full-Stack", "Frontend", "AI"];

const strengths = [
  "Problem solving through Data Structures & Algorithms",
  "Building responsive, user-friendly interfaces with React",
  "Learning full-stack development with Java, Node.js and SQL",
  "Quick learner who ships projects and deploys them online",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [selected, setSelected] = useState(null);

  const formRef = useRef();
  const [formStatus, setFormStatus] = useState(""); // "", "sending", "sent", "error"

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.type === activeFilter);

  // Scroll progress bar + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  // Case study popup: close with Esc, lock page scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = selected ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setFormStatus("sent");
        formRef.current.reset();
      })
      .catch(() => setFormStatus("error"));
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* Header */}
      <header className="site-header">
        <a href="#home" className="logo">
          VIKAS.V
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "open" : ""}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main>
        {/* Hero (text only) */}
        <section className="hero-section" id="home">
          <p className="section-label">COMPUTER SCIENCE STUDENT</p>

          <h1>
            Building digital
            <br />
            experiences with <span>code.</span>
          </h1>

          <p className="hero-description">
            I'm a Computer Science and Engineering student focused on Java,
            React, and full-stack development. I build practical projects and
            continuously explore new technologies.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-button">
              Explore My Work ↘
            </a>

            <a
              href="/documents/Vikas-Resume.pdf"
              download="Vikas-Resume.pdf"
              className="secondary-button"
            >
              Download Resume ↓
            </a>

            <a
              href="https://github.com/vikasikify113"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              GitHub ↗
            </a>
          </div>

          <div className="status-badge">
            <span className="status-dot" />
            Open to internships and entry-level web development roles
          </div>
        </section>

        {/* About (photo lives here) */}
        <section className="section about-section reveal" id="about">
          <div className="about-grid">
            <div className="about-photo">
              <img src="/images/vikas-profile.png" alt="Vikas V" />
            </div>

            <div className="about-text">
              <p className="section-label">01 / ABOUT ME</p>

              <h2>Learning by building.</h2>

              <p>
                I'm a CSE student developing my skills in Java, JavaScript,
                React, databases, and backend development. My goal is to build
                reliable, useful applications and grow into a full-stack
                developer.
              </p>

              <ul className="about-points">
                {strengths.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <p className="learning-note">
                Currently learning: React, Java OOP, and full-stack
                development.
              </p>

              <div className="about-stats">
                <div>
                  <strong>{projects.length}+</strong>
                  <span>Projects built</span>
                </div>
                <div>
                  <strong>8.11</strong>
                  <span>Current CGPA</span>
                </div>
                <div>
                  <strong>2028</strong>
                  <span>B.E. graduation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="education-card">
            <p className="section-label">EDUCATION</p>
            <h3>B.E. in Computer Science and Engineering</h3>
            <p>Sapthagiri NPS University, Bengaluru · 2024 – 2028</p>
          </div>
        </section>

        {/* Skills */}
        <section className="section skills-section reveal" id="skills">
          <p className="section-label">02 / TECHNICAL SKILLS</p>

          <h2>Technologies I work with.</h2>

          <p className="skills-description">
            Building my technical foundation through hands-on projects and
            continuous learning.
          </p>

          <div className="skills-grid">
            <div className="skill-card">
              <h3>Programming Languages</h3>
              <p>Java, Python, C++ (Basic)</p>
            </div>

            <div className="skill-card">
              <h3>Frontend Development</h3>
              <p>HTML, CSS, JavaScript, React</p>
            </div>

            <div className="skill-card">
              <h3>Backend &amp; Databases</h3>
              <p>Node.js, SQL, Backend Development (Learning)</p>
            </div>

            <div className="skill-card">
              <h3>Tools &amp; Platforms</h3>
              <p>Git, GitHub, VS Code, Netlify, Vercel</p>
            </div>

            <div className="skill-card">
              <h3>Development Concepts</h3>
              <p>
                Object-Oriented Programming, Data Structures &amp; Algorithms
                (Learning)
              </p>
            </div>

            <div className="skill-card">
              <h3>Current Focus</h3>
              <p>Core Java, Java OOP, React, Full-Stack Development</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="section projects-section" id="projects">
          <div className="projects-heading reveal">
            <div>
              <p className="section-label">03 / SELECTED WORK</p>
              <h2>Projects I've explored.</h2>
            </div>

            <p>A selection of my development journey so far.</p>
          </div>

          <div className="filter-bar reveal">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-button ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {visibleProjects.map((project, index) => (
              <article className="project-card reveal" key={project.title}>
                <div className="project-top">
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-type">{project.type}</span>
                </div>

                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="project-image"
                  loading="lazy"
                />

                <p className="project-category">{project.category}</p>

                <h3>{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <ul className="project-highlights">
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="technology-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.caseStudy && (
                    <button
                      className="project-link case-button"
                      onClick={() => setSelected(project)}
                    >
                      Case Study →
                    </button>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Live Demo ↗
                    </a>
                  )}

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="section contact-section reveal" id="contact">
          <p className="section-label">04 / GET IN TOUCH</p>

          <h2>Let's build something useful.</h2>

          <p>
            I'm open to internship opportunities, collaborations, and
            connecting with developers who enjoy building useful products.
          </p>

          <div className="email-box">
            <span>{EMAIL}</span>
            <button onClick={copyEmail}>{copied ? "Copied ✓" : "Copy"}</button>
          </div>

          <form ref={formRef} onSubmit={sendMessage} className="contact-form">
            <input type="text" name="from_name" placeholder="Your name" required />
            <input type="email" name="reply_to" placeholder="Your email" required />
            <textarea name="message" rows="5" placeholder="Your message" required />

            <button type="submit" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Sending..." : "Send Message ↗"}
            </button>

            {formStatus === "sent" && (
              <p className="form-message success">
                Message sent! I'll reply soon.
              </p>
            )}
            {formStatus === "error" && (
              <p className="form-message error">
                Something went wrong. Please email me directly.
              </p>
            )}
          </form>

          <div className="contact-links">
            <a href={`mailto:${EMAIL}`} className="project-link">
              Email Me ↗
            </a>

            <a href="tel:+916360298580" className="project-link">
              Call Me
            </a>

            <a
              href="https://www.linkedin.com/in/vikas-v-bab31038b/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Connect on LinkedIn ↗
            </a>

            <a
              href="https://github.com/vikasikify113"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Visit GitHub ↗
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-info">
          <p>© 2026 Vikas V. Built with React.</p>
          <a href={`mailto:${EMAIL}`} className="footer-email">
            ✉ {EMAIL}
          </a>
        </div>

        <a href="#home" className="project-link">
          Back to top ↑
        </a>
      </footer>

      {/* Case study popup */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close case study"
            >
              ✕
            </button>

            <p className="section-label">CASE STUDY</p>
            <h3>{selected.title}</h3>

            <div className="case-block">
              <h4>The Problem</h4>
              <p>{selected.caseStudy.problem}</p>
            </div>

            <div className="case-block">
              <h4>What I Built</h4>
              <p>{selected.caseStudy.solution}</p>
            </div>

            <div className="case-block">
              <h4>Challenges</h4>
              <ul>
                {selected.caseStudy.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="case-block">
              <h4>What I Learned</h4>
              <ul>
                {selected.caseStudy.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="technology-list">
              {selected.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTop && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;