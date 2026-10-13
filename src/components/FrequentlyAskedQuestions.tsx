import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { useTheme } from '../context/ThemeContext';

const questions = [
  {
    question: 'What types of projects does PEDIT Lab build?',
    answer: 'We build web and mobile applications, business software, AI and data solutions, cloud platforms, IoT systems, and user-focused digital experiences. Every project is scoped around the actual problem, timeline, and growth plan.',
  },
  {
    question: 'How is the final project price decided?',
    answer: 'Pricing depends on the selected service, package, features, integrations, delivery time, and support requirements. Our pricing builder gives an initial transparent estimate before we confirm the final scope with you.',
  },
  {
    question: 'Can you support university and final-year projects?',
    answer: 'Yes. Our student service covers topic planning, software, AI and data, embedded and IoT, cloud, documentation, presentations, research guidance, and viva preparation. We mentor students so they understand and submit their own academic work.',
  },
  {
    question: 'Will I own the source code and project files?',
    answer: 'Yes. The agreed source code, designs, documentation, and project deliverables are handed over according to your package and proposal. Any third-party licences or recurring platform costs are clearly identified separately.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Small tasks can take a few days, while complete products may take several weeks. After reviewing the scope, we provide milestones and an estimated delivery schedule. Priority delivery can be discussed when capacity allows.',
  },
  {
    question: 'Do you provide deployment and post-launch support?',
    answer: 'Yes. We can help with domains, hosting, cloud deployment, databases, monitoring, backups, maintenance, and future improvements. The exact support period and services are confirmed in the selected package.',
  },
  {
    question: 'Can an existing system be improved instead of rebuilt?',
    answer: 'Absolutely. We can review an existing product, identify performance, usability, security, or architecture issues, and propose a practical improvement plan without replacing parts that already work well.',
  },
  {
    question: 'How do I start a project with PEDIT Lab?',
    answer: 'Choose a service or student package, share your requirements through the contact form or WhatsApp, and we will arrange a short discovery discussion. You will then receive a recommended scope, timeline, and next steps.',
  },
];

export function FrequentlyAskedQuestions() {
  const { colors } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="premium-section faq-section" style={{ background: colors.bgPrimary }}>
      <AnimatedBackground />
      <div className="container-custom">
        <div className="faq-layout">
          <div className="faq-intro">
            <div className="faq-kicker"><HelpCircle size={15} /><span>QUESTIONS &amp; ANSWERS</span></div>
            <h2 className="flow-heading">
              <span className="flow-heading-line">Answers Before</span>
              <span className="flow-heading-line">You Get Started</span>
            </h2>
            <p>Clear answers about our process, pricing, delivery, ownership, and student project support.</p>
            <a className="faq-contact-link" href="#contact">
              <MessageCircleQuestion size={18} />
              <span>Still have a question? Talk to us</span>
            </a>
          </div>

          <div className="faq-list">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item.question}</span>
                    <ChevronDown className="faq-chevron" size={20} />
                  </button>
                  <div className="faq-answer-wrap" id={`faq-answer-${index}`}>
                    <div className="faq-answer"><p>{item.answer}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
