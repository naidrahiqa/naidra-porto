import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiCpu, FiActivity, FiTerminal } from 'react-icons/fi';

const InteractiveCard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="interactive-card-container"
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="interactive-card-content glass-effect"
      >
        <div className="card-header">
           <div className="icon-wrapper">
              <FiTerminal className="card-main-icon" />
           </div>
           
           <div className="card-title-group">
             <h3 className="card-title">System Status</h3>
             <p className="card-subtitle">
               <span className="pulse-dot"></span>
               Operational
             </p>
           </div>
        </div>

           <div className="stats-grid">
              <div className="stat-item">
                 <FiGithub className="stat-icon" />
                 <span className="stat-label">Commits</span>
                 <span className="stat-value">500+</span>
              </div>
              <div className="stat-item">
                 <FiCpu className="stat-icon" />
                 <span className="stat-label">CPU</span>
                 <span className="stat-value">12%</span>
              </div>
              <div className="stat-item">
                 <FiActivity className="stat-icon" />
                 <span className="stat-label">Uptime</span>
                 <span className="stat-value">99.9%</span>
              </div>
           </div>
           
           <div className="visual-code">
              <div className="code-line"><span className="c-pink">const</span> <span className="c-blue">dev</span> = <span className="c-green">"Active"</span>;</div>
              <div className="code-line"><span className="c-purple">while</span>(<span className="c-blue">alive</span>) {"{"}</div>
              <div className="code-line indent"><span className="c-yellow">code</span>();</div>
              <div className="code-line indent"><span className="c-yellow">coffee</span>();</div>
              <div className="code-line">{"}"}</div>
           </div>
      </div>
    </motion.div>
  );
};

export default InteractiveCard;
