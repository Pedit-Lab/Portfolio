import React from 'react';
import { ArrowRight, Brain, CheckCircle2, Cloud, Code2, Cpu, FileText, GraduationCap, Microscope, Tag } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { useTheme } from '../context/ThemeContext';

export const StudentProjectSupport: React.FC = () => {
  const { colors } = useTheme();
  const supportAreas = [
    { icon: <GraduationCap size={20} />, title: 'Topic & Project Planning', text: 'Scope, milestones, and a practical roadmap.' },
    { icon: <Code2 size={20} />, title: 'Software Development', text: 'Web, mobile, APIs, testing, and debugging.' },
    { icon: <Brain size={20} />, title: 'AI & Data Projects', text: 'ML, GenAI, analytics, and model guidance.' },
    { icon: <Cpu size={20} />, title: 'Embedded & IoT', text: 'Arduino, ESP32, sensors, and connectivity.' },
    { icon: <Cloud size={20} />, title: 'Cloud & Databases', text: 'Architecture, hosting, data, and deployment.' },
    { icon: <FileText size={20} />, title: 'Documentation & Presentation', text: 'Clear reports, demos, and presentation coaching.' },
    { icon: <Microscope size={20} />, title: 'Research Support', text: 'Literature, methodology, analysis, citations, and research guidance.' },
  ];

  return (
    <section id="student-support" className="premium-section student-support-section" style={{ background: colors.bgSecondary }}>
      <AnimatedBackground />
      <div className="container-custom">
        <div className="student-support-layout">
          <div className="student-support-visual">
            <img
              src="/visuals/university-project-support.png"
              alt="University student developing a software and IoT project in an innovation lab"
              loading="lazy"
              width="1152"
              height="1440"
            />
            <div className="student-visual-caption">
              <span><CheckCircle2 size={16} /> Student-friendly guidance</span>
              <strong>Learn it. Build it. Present it.</strong>
            </div>
          </div>

          <div className="student-support-panel glass-card">
            <div className="student-support-kicker">
              <GraduationCap size={16} />
              <span>UNIVERSITY PROJECT SUPPORT</span>
            </div>
            <h2 className="flow-heading">
              <span className="flow-heading-line">Build Your Project</span>
              <span className="flow-heading-line">With Confidence</span>
            </h2>
            <p className="student-support-intro">
              Expert guidance for planning, development, testing, documentation, and presentation.
            </p>

            <div className="student-support-grid">
              {supportAreas.map(area => (
                <div className="student-support-item" key={area.title}>
                  <span className="student-support-icon">{area.icon}</span>
                  <div><h3>{area.title}</h3><p>{area.text}</p></div>
                </div>
              ))}
            </div>

            <div className="student-support-note">
              <CheckCircle2 size={17} />
              <span>We mentor and guide. Students understand and submit their own academic work.</span>
            </div>

            <div className="student-support-actions">
              <a href="#contact" className="btn-primary student-support-cta">
                <span>Discuss Your Project</span><ArrowRight size={18} />
              </a>
              <a href="/pricing?audience=student" className="btn-secondary student-support-cta">
                <Tag size={17} /><span>Student Pricing</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
