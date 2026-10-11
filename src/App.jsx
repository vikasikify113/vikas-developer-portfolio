

import "./App.css";

const projects = [
  {
    title: "LuxeDining",
    category: "Restaurant Website",
    description:
      "A responsive restaurant website with an elegant interface and interactive user experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/images/luxedining.png",
    demo: "https://vikasikify113.github.io/restaurant/",
    repo: "https://github.com/vikasikify113/restaurant",
  },
  {
    title: "AlgoQuest",
    category: "Algorithm Learning Platform",
    description:
      "An algorithm-focused project exploring frontend development and algorithm learning.",
    technologies: ["React", "JavaScript", "Node.js"],
    image: "/images/algoquest.png",
    demo: "https://algoquest.org/",
    repo: "",
  },
  {
    title: "FinTax",
    category: "Financial Technology",
    description:
      "A financial and tax information platform designed to make financial information easier to explore.",
    technologies: ["HTML", "CSS", "TypeScript", "Node.js", "SQL"],
    image: "/images/fintax.png",
    demo: "https://fintax-dashboard-prototype-8-331f.vercel.app/",
    repo: "",
  },
  {
    title: "Chess Master",
    category: "Interactive Web Application",
    description:
      "An interactive chess project built while exploring modern web development technologies.",
    technologies: ["JavaScript", "React", "Node.js"],
    image: "/images/chess-master.png",
    demo: "",
    repo: "https://github.com/vikasikify113/Chess-master",
  },
  {
    title: "Leaf AI",
    category: "College Coding / Team Project",
    description:
      "A collaborative project exploring AI-powered features and practical application development.",
    technologies: ["AI", "Web Development"],
    image: "/images/leaf-ai.png",
    demo: "",
    repo: "",
  },
];

function App() {
  return (
    <div className="portfolio">
      {/* Header */}
      <header className="site-header">
        <a className="brand" href="#home">
          VIKAS<span>.</span>
        </a>

        <nav className="navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero section" id="home">
          <p className="section-label">COMPUTER SCIENCE STUDENT</p>

          <h1>
            Building digital
            <br />
            experiences with <span>code.</span>
          </h1>

          <p className="hero-description">
            I'm a Computer Science and Engineering student learning React,
            Java, and full-stack development. I enjoy building practical
            projects and exploring new technologies.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-button">
              Explore my work ↘
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
        </section>

        {/* About */}
        <section className="section about-section" id="about">
          <p className="section-label">01 / ABOUT ME</p>

          <h2>Learning by building.</h2>

          <p>
            I'm a CSE student developing my skills in Java, JavaScript,
            React, databases, and backend development. My goal is to build
            reliable, useful applications and grow into a full-stack
            developer.
          </p>

          <p className="learning-note">
            Currently learning: React, Java OOP, and full-stack development.
          </p>
        </section>

        {/* Projects */}
        <section className="section projects-section" id="projects">
          <div className="projects-heading">
            <div>
              <p className="section-label">02 / SELECTED WORK</p>
              <h2>Projects I've explored.</h2>
            </div>

            <p>A selection of my development journey so far.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-top">
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-arrow">↗</span>
                </div>

                <img
                  className="project-image"
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <p className="project-category">{project.category}</p>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="technology-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-actions">
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
        <section className="section contact-section" id="contact">
          <p className="section-label">03 / GET IN TOUCH</p>

          <h2>Let's connect and build.</h2>

          <p>
            Interested in technology, collaboration, and opportunities to
            learn and grow as a developer.
          </p>

          <div className="contact-links">
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
        <p>© 2026 Vikas V. Built with React.</p>

        <a href="#home" className="project-link">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}

export default App;