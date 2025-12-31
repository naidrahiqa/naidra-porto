import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiMail, FiDownload, FiGithub, FiLinkedin, FiTwitter, FiStar, FiCode, FiZap } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import type { Project, PortfolioSettings } from '../types';
import { fetchProjects, fetchSettings } from '../services/db';
import { getSettings as getLocalSettings } from '../utils/storage'; 
import ParticlesBackground from './ParticlesBackground';
import './Portfolio.css';
import './Portfolio-premium.css';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings>(getLocalSettings());
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projData, settData] = await Promise.all([
          fetchProjects(),
          fetchSettings()
        ]);
        setProjects(projData);
        setSettings(settData);
      } catch (error) {
        console.error("Failed to fetch cloud data, using fallback", error);
      }
    };

    fetchData();
    
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const featuredMatch = filter === 'all' || project.featured;
    return categoryMatch && featuredMatch;
  });

  return (
    <div className="portfolio">
      {/* Animated Particles Background */}
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="hero wave-pattern">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative floating elements */}
            <motion.div
              className="floating-icon floating-icon-1"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiCode className="icon-glow" />
            </motion.div>
            
            <motion.div
              className="floating-icon floating-icon-2"
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <FiZap className="icon-glow" />
            </motion.div>

            {/* Greeting badge */}
            <motion.div 
              className="greeting-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <FiStar /> Portfolio Showcase
            </motion.div>

            {/* Animated Hero Title */}
            <h1 className="hero-title">
              <TypeAnimation
                sequence={[
                  settings.name,
                  3000,
                  'Network Engineer',
                  2000,
                  'Cybersecurity',
                  2000,
                  'Full Stack Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {settings.title}
            </motion.p>
            
            <motion.p 
              className="hero-bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {settings.bio}
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a 
                href={`mailto:${settings.email}`} 
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail /> Contact Me
              </motion.a>
              {settings.resumeUrl && (
                <motion.a 
                  href={settings.resumeUrl} 
                  className="btn btn-secondary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload /> Download Resume
                </motion.a>
              )}
            </motion.div>

            {/* Social Links with Icons */}
            <motion.div 
              className="social-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {settings.github && (
                <motion.a 
                  href={settings.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  title="GitHub"
                >
                  <FiGithub size={24} />
                  <span className="sr-only">GitHub</span>
                </motion.a>
              )}
              {settings.linkedin && (
                <motion.a 
                  href={settings.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  title="LinkedIn"
                >
                  <FiLinkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </motion.a>
              )}
              {settings.twitter && (
                <motion.a 
                  href={settings.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  title="Twitter"
                >
                  <FiTwitter size={24} />
                  <span className="sr-only">Twitter</span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            
            {/* Filters */}
            <div className="filters">
              <div className="filter-group">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Projects
                </button>
                <button
                  className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
                  onClick={() => setFilter('featured')}
                >
                  Featured
                </button>
              </div>

              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.length === 0 ? (
              <div className="no-projects">
                <p>No projects found. Add some projects in the dashboard!</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              © {new Date().getFullYear()} {settings.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="project-card card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Project Image */}
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} className="project-image" />
        {project.featured && (
          <span className="featured-badge">Featured</span>
        )}
        <div className="project-overlay">
          <div className="project-links">
            {project.liveDemoUrl && (
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="project-info">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
            {project.status}
          </span>
        </div>
        
        <p className="project-category">{project.category}</p>
        
        <p className="project-description">
          {isExpanded ? (project.longDescription || project.description) : project.description}
        </p>

        {project.longDescription && (
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}

        {/* Tags */}
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {project.completedDate && (
          <p className="project-date">
            Completed: {new Date(project.completedDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
