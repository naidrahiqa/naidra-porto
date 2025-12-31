import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { TypeAnimation } from 'react-type-animation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import type { Project, PortfolioSettings } from '../types';
import { fetchProjects, fetchSettings } from '../services/db';
import { getSettings as getLocalSettings } from '../utils/storage'; 
import ParticlesBackground from './ParticlesBackground';

import InteractiveCard from './InteractiveCard';
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
      <section className="hero">
        <div className="container hero-container">
          {/* Left Column: Text & Content */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title with Greetings */}
            <div className="hero-title-wrapper">
              <TypeAnimation
                sequence={
                  settings.greetings && settings.greetings.length > 0 
                  ? settings.greetings.flatMap(g => [g, 2000]) 
                  : [
                  'Halo',
                  2000,
                  'Hello',
                  2000,
                  'こんにちは',
                  2000,
                  'ꦱꦸꦒꦺꦁꦫꦮꦸꦃ',
                  2000,
                ]}
                wrapper="h1"
                speed={50}
                className="hero-title text-white"
                repeat={Infinity}
              />
            </div>
            
            {/* Description */}
            <div className="hero-description-wrapper">
              <span className="static-text">I am <span className="highlight-text">{settings.name}</span>. I am ₐₜₒₘᵢ𝒸~.</span>
            </div>
          </motion.div>

          {/* Right Column: Image & Chat Widget */}
          <motion.div 
            className="hero-visuals"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             {/* Interactive Dev Card integrated into the layout */}
            <div className="hero-chat-container" style={{maxWidth: '350px'}}>
               <InteractiveCard />
            </div>

            {/* Background Illustration/Image (Placeholder for now based on image) */}
            <div className="hero-illustration">
              {/* You can replace this with an actual img tag if you have the asset */}
              <div className="illustration-placeholder"></div> 
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-medium">
        <div className="container">
           <h2 className="section-title text-center">About Me</h2>
             <div className="about-content text-center max-w-2xl mx-auto">
               <p className="about-text" style={{whiteSpace: 'pre-line'}}>
                 {settings.aboutDescription || 
                  `${settings.bio}\n\nI am passionate about building scalable software solutions and exploring the depths of cybersecurity. Currently navigating through my freshman year in Software Engineering, constantly learning and applying new technologies.`
                 }
               </p>
             </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
           <h2 className="section-title text-center">Skills</h2>
           <div className="skills-grid">
              {(settings.skills && settings.skills.length > 0 ? settings.skills : [
                { title: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'] },
                { title: 'Backend', skills: ['Node.js', 'Python', 'Go', 'Supabase'] },
                { title: 'Database', skills: ['PostgreSQL', 'MySQL', 'MongoDB'] },
                { title: 'Tools', skills: ['Git', 'Docker', 'VS Code', 'Figma'] }
              ]).map(category => (
                <div key={category.title} className="skill-card card">
                  <h3 className="text-xl font-bold mb-4 gradient-text">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section bg-medium">
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

      {/* Contact Section */}
      <section id="contact" className="section">
         <div className="container text-center">
            <h2 className="section-title">Contact Me</h2>
            <p className="mb-8 text-neutral-400">Feel free to reach out through any of these platforms:</p>
            
            <div className="contact-links flex flex-wrap justify-center gap-4">
              {(settings.socialLinks && settings.socialLinks.length > 0 ? settings.socialLinks : [
                { platform: 'Instagram', url: '#', color: '#E1306C' },
                { platform: 'GitHub', url: settings.github || '#', color: '#333' },
                { platform: 'LinkedIn', url: settings.linkedin || '#', color: '#0077B5' },
                { platform: 'Twitter', url: settings.twitter || '#', color: '#000000' }
              ]).map((social) => (
                 <a 
                   key={social.platform} 
                   href={social.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="btn btn-outline"
                   style={{ borderColor: social.color || '#fff' }}
                 >
                   {social.platform}
                 </a>
              ))}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-medium">
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
