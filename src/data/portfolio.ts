export type Discipline = 'Software' | 'Design' | 'Cloud' | 'IoT' | 'AI';

export interface Capability {
  id: string;
  category: Discipline;
  weight: number;
  title: string;
  summary: string;
  deliverables: string[];
  tools: string[];
}

export const capabilities: Capability[] = [
  {
    id: 'software', category: 'Software', weight: 30,
    title: 'Software made for your business.',
    summary: 'From a customer-facing web app to the tools your team uses every day. We turn complex requirements into clear, dependable software.',
    deliverables: ['Custom web applications & SaaS platforms', 'Customer portals & internal business tools', 'API integrations & workflow automation', 'Testing, release planning & ongoing improvements'],
    tools: ['React', 'TypeScript', 'Next.js', 'Node.js'],
  },
  {
    id: 'design', category: 'Design', weight: 10,
    title: 'Good ideas. Beautifully clear.',
    summary: 'UI/UX and graphic design that give your product a consistent identity and make every interaction feel considered.',
    deliverables: ['User journeys & interface design', 'Interactive prototypes & design systems', 'Brand identity & graphic assets'],
    tools: ['Figma', 'UI/UX', 'Brand design'],
  },
  {
    id: 'cloud', category: 'Cloud', weight: 20,
    title: 'A foundation built to grow.',
    summary: 'Reliable infrastructure, secure backends, and sensible deployment pipelines that keep your software moving.',
    deliverables: ['Cloud architecture & application hosting', 'Managed databases & secure APIs', 'CI/CD, observability & infrastructure automation'],
    tools: ['AWS', 'GCP', 'Docker', 'MongoDB'],
  },
  {
    id: 'iot', category: 'IoT', weight: 20,
    title: 'Connect the physical world.',
    summary: 'Purpose-built devices and embedded systems that bring live data, remote control, and useful automation into your applications.',
    deliverables: ['Embedded firmware & device prototypes', 'Sensor integrations & remote monitoring', 'Device-to-cloud connectivity & control'],
    tools: ['ESP32', 'STM32', 'MQTT', 'C/C++'],
  },
  {
    id: 'ai', category: 'AI', weight: 20,
    title: 'Intelligence with a purpose.',
    summary: 'AI features built around real tasks: finding answers, processing documents, discovering patterns, and reducing repetitive work.',
    deliverables: ['AI assistants & knowledge search', 'Document processing & workflow automation', 'Predictive analytics & computer vision'],
    tools: ['Python', 'LLM APIs', 'PyTorch', 'RAG'],
  },
];
