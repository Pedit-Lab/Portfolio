export interface Plan {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  price: number;
  days: number;
  features: string[];
  popular?: boolean;
  included?: Record<string, number>;
}

export interface Addon {
  id: string;
  name: string;
  unit: string;
  price: number;
  days: number;
}

export interface Service {
  id: string;
  name: string;
  plans: Plan[];
  addons: Addon[];
}

export interface BillLine {
  label: string;
  amount: number;
  days: number;
}

export interface Bill {
  lines: BillLine[];
  total: number;
  days: number;
}

const a = (id: string, name: string, unit: string, price: number, days: number): Addon => ({
  id,
  name,
  unit,
  price,
  days,
});

//Data
export const SERVICES: Service[] = [
  // 1. SOFTWARE PROJECTS
  {
    id: 'software',
    name: 'Software Project',
    plans: [
      { id: 'basic', name: 'Basic', price: 8000, days: 4, features: ['1 small project', 'Source code', 'Basic setup guide', '1 revision'], included: { revision: 1 } },
      { id: 'standard', name: 'Standard', price: 22000, days: 8, popular: true, features: ['Mid-size project', 'Source code + comments', 'Basic documentation', '2 revisions'], included: { revision: 2, docs: 1, readme: 1 } },
      { id: 'premium', name: 'Premium', price: 48000, days: 16, features: ['Full-stack project', 'Full documentation', 'Presentation slides', 'Viva prep', '3 revisions'], included: { revision: 3, docs: 1, readme: 1, slides: 1, viva: 1 } },
    ],
    addons: [
      a('screen', 'Extra screen / UI page', '1 screen', 1500, 1),
      a('module', 'Extra module / feature', '1 module', 2500, 2),
      a('auth', 'Login & user roles', '1 setup', 2500, 1),
      a('admin', 'Admin panel (CRUD)', '1 panel', 6500, 3),
      a('payment', 'Payment gateway integration', '1 gateway', 4000, 2),
      a('deploy', 'Deployment / hosting setup', '1 setup', 2500, 1),
      a('docs', 'Extra Documentation', '10 pages', 1500, 1),
      a('slides', 'Presentation slides', '10 slides', 2000, 1),
      a('readme', 'Code comments + README', '1 package', 1000, 1),
      a('viva', 'Viva / demo prep session', '1 hour', 2000, 0),
      a('revision', 'Extra revision round', '1 round', 1000, 1),
      a('express', 'Express delivery (Rush)', '1 day saved', 2000, -1),
    ],
  },

  // 2. AI / ML PROJECTS
  {
    id: 'aiml',
    name: 'AI / ML Project',
    plans: [
      { id: 'basic', name: 'Basic', price: 12000, days: 6, features: ['1 ML model', 'Dataset cleaning', 'Jupyter notebook', '1 revision'], included: { revision: 1 } },
      { id: 'standard', name: 'Standard', price: 30000, days: 12, popular: true, features: ['Model + evaluation', 'Simple web/API demo', 'Report', '2 revisions'], included: { revision: 2, demo: 1, docs: 1 } },
      { id: 'premium', name: 'Premium', price: 65000, days: 21, features: ['End-to-end AI system', 'Deployed demo', 'Full documentation', 'Presentation + viva prep', '3 revisions'], included: { revision: 3, demo: 1, deploy: 1, docs: 1, slides: 1, viva: 1 } },
    ],
    addons: [
      a('model', 'Extra model comparison', '1 model', 2500, 2),
      a('dataset', 'Dataset collection / labeling', '500 samples', 3500, 3),
      a('tuning', 'Hyperparameter tuning', '1 round', 2500, 2),
      a('demo', 'Web demo (Streamlit / Flask)', '1 demo', 3500, 2),
      a('deploy', 'Deployment / hosting setup', '1 setup', 2500, 1),
      a('research', 'Research / literature section', '1 section', 3500, 3),
      a('docs', 'Extra Documentation', '10 pages', 1500, 1),
      a('slides', 'Presentation slides', '10 slides', 2000, 1),
      a('readme', 'Code comments + README', '1 package', 1000, 1),
      a('viva', 'Viva / demo prep session', '1 hour', 2000, 0),
      a('revision', 'Extra revision round', '1 round', 1000, 1),
      a('express', 'Express delivery (Rush)', '1 day saved', 2000, -1),
    ],
  },

  // 3. EMBEDDED & IoT
  {
    id: 'iot',
    name: 'Embedded & IoT',
    plans: [
      { id: 'basic', name: 'Basic', price: 10000, days: 5, features: ['Single sensor project', 'Circuit diagram', 'Firmware code', 'Hardware not included', '1 revision'], included: { revision: 1, circuit: 1 } },
      { id: 'standard', name: 'Standard', price: 25000, days: 10, popular: true, features: ['Multi-sensor system', 'Mobile/web dashboard', 'Documentation', 'Hardware not included', '2 revisions'], included: { revision: 2, circuit: 1, dashboard: 1, docs: 1 } },
      { id: 'premium', name: 'Premium', price: 55000, days: 18, features: ['Full IoT system + cloud', 'Live demo support', 'Full report', 'Presentation', 'Hardware not included', '3 revisions'], included: { revision: 3, circuit: 1, dashboard: 1, cloud: 1, docs: 1, slides: 1, viva: 1 } },
    ],
    addons: [
      a('sensor', 'Extra sensor integration', '1 sensor', 2000, 1),
      a('dashboard', 'Custom Dashboard', '1 dashboard', 4000, 2),
      a('cloud', 'Cloud setup (MQTT / Firebase)', '1 setup', 2500, 1),
      a('circuit', 'Circuit / PCB diagram design', '1 design', 2500, 2),
      a('enclosure', '3D enclosure design', '1 design', 3500, 2),
      a('readme', 'Code comments + README', '1 package', 1000, 1),
      a('docs', 'Extra Documentation', '10 pages', 1500, 1),
      a('slides', 'Presentation slides', '10 slides', 2000, 1),
      a('viva', 'Viva / demo prep session', '1 hour', 2000, 0),
      a('revision', 'Extra revision round', '1 round', 1000, 1),
      a('express', 'Express delivery (Rush)', '1 day saved', 2000, -1),
    ],
  },

  // 4. DATABASE & CLOUD
  {
    id: 'dbcloud',
    name: 'Database & Cloud',
    plans: [
      { id: 'basic', name: 'Basic', price: 6000, days: 3, features: ['Database design (ER diagram)', 'SQL scripts', '1 revision'], included: { revision: 1 } },
      { id: 'standard', name: 'Standard', price: 16000, days: 7, popular: true, features: ['DB + backend integration', 'Cloud hosting setup', 'Documentation', '2 revisions'], included: { revision: 2, deploy: 1, docs: 1 } },
      { id: 'premium', name: 'Premium', price: 35000, days: 14, features: ['Scalable cloud architecture', 'AWS / Azure deployment', 'Full documentation', 'Presentation', '3 revisions'], included: { revision: 3, deploy: 1, docs: 1, slides: 1 } },
    ],
    addons: [
      a('tables', 'Extra tables design', '10 tables', 1500, 1),
      a('procs', 'Stored procedures / triggers', '5 items', 2000, 1),
      a('migrate', 'Data migration', '1 migration', 2500, 1),
      a('optimize', 'Query optimization', '1 round', 2000, 1),
      a('backup', 'Backup & security setup', '1 setup', 2000, 1),
      a('readme', 'SQL comments + README', '1 package', 1000, 1),
      a('deploy', 'Custom Deployment setup', '1 setup', 2500, 1),
      a('docs', 'Extra Documentation', '10 pages', 1500, 1),
      a('slides', 'Presentation slides', '10 slides', 2000, 1),
      a('viva', 'Viva / demo prep session', '1 hour', 2000, 0),
      a('revision', 'Extra revision round', '1 round', 1000, 1),
      a('express', 'Express delivery (Rush)', '1 day saved', 2000, -1),
    ],
  },

  // 5. DATA & AI APPLICATIONS
  {
    id: 'dataai',
    name: 'Data/AI Application',
    plans: [
      { id: 'basic', name: 'Basic', price: 9000, days: 5, features: ['Data cleaning + analysis', 'Charts', '1 revision'], included: { revision: 1 } },
      { id: 'standard', name: 'Standard', price: 24000, days: 10, popular: true, features: ['Interactive dashboard', 'Insights report', 'Automation script', '2 revisions'], included: { revision: 2, dashpage: 1, docs: 1, automate: 1 } },
      { id: 'premium', name: 'Premium', price: 52000, days: 17, features: ['Full data app + NLP', 'Deployed dashboard', 'Full documentation', 'Presentation', '3 revisions'], included: { revision: 3, dashpage: 1, nlp: 1, deploy: 1, docs: 1, slides: 1 } },
    ],
    addons: [
      a('dashpage', 'Extra dashboard page', '1 page', 2000, 1),
      a('dataset', 'Extra dataset analysis', '1 dataset', 2500, 2),
      a('nlp', 'NLP module (sentiment, etc.)', '1 module', 3500, 2),
      a('automate', 'Extra Automation script', '1 script', 2500, 1),
      a('readme', 'Code comments + README', '1 package', 1000, 1),
      a('deploy', 'Deployment / hosting setup', '1 setup', 2500, 1),
      a('docs', 'Extra Documentation', '10 pages', 1500, 1),
      a('slides', 'Presentation slides', '10 slides', 2000, 1),
      a('viva', 'Viva / demo prep session', '1 hour', 2000, 0),
      a('revision', 'Extra revision round', '1 round', 1000, 1),
      a('express', 'Express delivery (Rush)', '1 day saved', 2000, -1),
    ],
  },

  // 6. NETWORK & TECHNICAL
  {
    id: 'network',
    name: 'Network Application',
    plans: [
      { id: 'basic', name: 'Basic', price: 8000, days: 4, features: ['Network design / simulation', 'Config files', '1 revision'], included: { revision: 1 } },
      { id: 'standard', name: 'Standard', price: 20000, days: 8, popular: true, features: ['Secure network + services', 'CI/CD or API setup', 'Documentation', '2 revisions'], included: { revision: 2, docs: 1 } },
      { id: 'premium', name: 'Premium', price: 45000, days: 15, features: ['Full DevOps / security setup', 'Testing report', 'Full documentation', 'Presentation', '3 revisions'], included: { revision: 3, docs: 1, slides: 1 } },
    ],
    addons: [
      a('subnet', 'Extra subnet / device config', '1 subnet', 1500, 1),
      a('sim', 'Packet Tracer / GNS3 simulation', '1 simulation', 2500, 2),
      a('firewall', 'Firewall & security hardening', '1 setup', 3000, 2),
      a('vpn', 'VPN setup', '1 setup', 2500, 1),
      a('docker', 'Docker containerization', '1 project', 2500, 1),
      a('cicd', 'Advanced CI/CD pipeline', '1 pipeline', 3000, 2),
      a('readme', 'Scripts + README', '1 package', 1000, 1),
      a('docs', 'Extra Documentation', '10 pages', 1500, 1),
      a('slides', 'Presentation slides', '10 slides', 2000, 1),
      a('viva', 'Viva / demo prep session', '1 hour', 2000, 0),
      a('revision', 'Extra revision round', '1 round', 1000, 1),
      a('express', 'Express delivery (Rush)', '1 day saved', 2000, -1),
    ],
  },
];

const studentPlans = (
  basicPrice: number,
  standardPrice: number,
  premiumPrice: number,
  focus: string,
): Plan[] => [
  {
    id: 'basic', name: 'Guided Start', price: basicPrice, days: 3,
    features: [`${focus} scope review`, 'One-to-one guidance session', 'Action plan and references', '1 revision'],
    included: { revision: 1, mentoring: 1 },
  },
  {
    id: 'standard', name: 'Project Support', price: standardPrice, days: 7, popular: true,
    features: [`Hands-on ${focus.toLowerCase()} support`, 'Milestone reviews', 'Testing and feedback', 'Documentation guidance', '2 revisions'],
    included: { revision: 2, mentoring: 2, review: 2 },
  },
  {
    id: 'premium', name: 'Final-Year Plus', price: premiumPrice, days: 14,
    features: [`End-to-end ${focus.toLowerCase()} mentoring`, 'Weekly progress reviews', 'Report and presentation guidance', 'Demo and viva preparation', '3 revisions'],
    included: { revision: 3, mentoring: 4, review: 4, viva: 1 },
  },
];

const studentAddons = (special: Addon[]): Addon[] => [
  ...special,
  a('mentoring', 'Extra mentoring session', '1 hour', 1500, 0),
  a('review', 'Extra milestone review', '1 review', 1000, 1),
  a('slides', 'Presentation slide guidance', '10 slides', 1500, 1),
  a('viva', 'Mock viva / demo session', '1 hour', 1800, 0),
  a('revision', 'Extra feedback round', '1 round', 900, 1),
  a('express', 'Priority review', '1 day saved', 1500, -1),
];

/** Student-only catalogue selected from the University Project Support section. */
export const STUDENT_SERVICES: Service[] = [
  {
    id: 'student-planning', name: 'Topic & Project Planning',
    plans: studentPlans(3500, 8000, 15000, 'Project planning'),
    addons: studentAddons([
      a('proposal', 'Proposal structure review', '1 proposal', 1800, 1),
      a('roadmap', 'Detailed milestone roadmap', '1 roadmap', 1500, 1),
    ]),
  },
  {
    id: 'student-software', name: 'Software Development Support',
    plans: studentPlans(6000, 16000, 32000, 'Software development'),
    addons: studentAddons([
      a('module', 'Additional feature guidance', '1 module', 2200, 2),
      a('debug', 'Debugging support session', '1 session', 1800, 1),
      a('deploy', 'Deployment guidance', '1 setup', 2200, 1),
    ]),
  },
  {
    id: 'student-ai', name: 'AI & Data Project Support',
    plans: studentPlans(7500, 20000, 40000, 'AI and data project'),
    addons: studentAddons([
      a('dataset', 'Dataset review and preparation', '1 dataset', 2500, 2),
      a('model', 'Extra model evaluation', '1 model', 2200, 2),
      a('notebook', 'Notebook review', '1 notebook', 1500, 1),
    ]),
  },
  {
    id: 'student-iot', name: 'Embedded & IoT Support',
    plans: studentPlans(6500, 18000, 36000, 'Embedded and IoT project'),
    addons: studentAddons([
      a('sensor', 'Extra sensor integration guidance', '1 sensor', 1800, 1),
      a('circuit', 'Circuit review', '1 design', 2000, 1),
      a('cloud', 'IoT cloud connection guidance', '1 setup', 2200, 2),
    ]),
  },
  {
    id: 'student-cloud', name: 'Cloud & Database Support',
    plans: studentPlans(5000, 14000, 28000, 'Cloud and database project'),
    addons: studentAddons([
      a('schema', 'Database schema review', '1 schema', 1600, 1),
      a('api', 'API integration guidance', '1 API', 2200, 2),
      a('hosting', 'Hosting setup guidance', '1 setup', 2000, 1),
    ]),
  },
  {
    id: 'student-documentation', name: 'Documentation & Presentation',
    plans: studentPlans(3000, 7500, 14000, 'Academic documentation'),
    addons: studentAddons([
      a('chapter', 'Additional chapter review', '1 chapter', 1400, 1),
      a('format', 'University format compliance review', '1 report', 1800, 1),
      a('poster', 'Research poster guidance', '1 poster', 1500, 1),
    ]),
  },
  {
    id: 'student-research', name: 'Research Support',
    plans: studentPlans(4500, 12000, 24000, 'Research'),
    addons: studentAddons([
      a('literature', 'Literature review guidance', '1 section', 2200, 2),
      a('methodology', 'Methodology review', '1 section', 2200, 2),
      a('analysis', 'Results and analysis guidance', '1 dataset', 2500, 2),
      a('citation', 'Citation and reference audit', '1 document', 1500, 1),
    ]),
  },
];

//Helpers
export const formatLKR = (n: number): string => 'LKR ' + n.toLocaleString('en-LK');

export const formatDays = (n: number): string => `${n} day${Math.abs(n) === 1 ? '' : 's'}`;

export const formatAddonDays = (d: number): string =>
  d === 0 ? '0 extra days' : d < 0 ? `${d} day (faster)` : `+${d} day${d === 1 ? '' : 's'}`;

export function getIncludedQty(plan: Plan | null | undefined, addonId: string): number {
  if (!plan || !plan.included) return 0;
  return plan.included[addonId] || 0;
}

// Bill: selected service + plan + addon quantities
export function calcBill(service: Service, plan: Plan, qtyMap: Record<string, number>): Bill {
  let total = plan.price;
  let days = plan.days;
  const lines: BillLine[] = [{ label: `${plan.name} plan`, amount: plan.price, days: plan.days }];

  service.addons.forEach((addon) => {
    const included = getIncludedQty(plan, addon.id);
    const q = qtyMap[addon.id] !== undefined ? qtyMap[addon.id] : included;
    const extra = Math.max(0, q - included);
    if (extra > 0) {
      total += addon.price * extra;
      days += addon.days * extra;
      lines.push({
        label: `${addon.name} (+${extra} extra)`,
        amount: addon.price * extra,
        days: addon.days * extra,
      });
    }
  });

  return { lines, total, days: Math.max(days, 1) };
}
export interface Category {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export const CATEGORIES: Record<string, Category[]> = {
  software: [
    { id: 'web', name: 'Web Development', desc: 'Websites and web applications', icon: '🌐' },
    { id: 'mobile', name: 'Mobile App Development', desc: 'Android, iOS and cross-platform apps', icon: '📱' },
    { id: 'software', name: 'Software Development', desc: 'Desktop and general-purpose software', icon: '🖥️' },
    { id: 'frontend', name: 'Frontend Development', desc: 'UI, responsive design, React / Angular', icon: '🎨' },
    { id: 'backend', name: 'Backend Development', desc: 'Server logic, APIs and databases', icon: '⚙️' },
  ],
  aiml: [
    { id: 'ml', name: 'Machine Learning', desc: 'Classification, regression, clustering', icon: '📈' },
    { id: 'dl', name: 'Deep Learning', desc: 'Neural networks, CNN, RNN, LSTM', icon: '🧠' },
    { id: 'cv', name: 'Computer Vision', desc: 'Image / video detection and recognition', icon: '👁️' },
    { id: 'nlp', name: 'Natural Language Processing', desc: 'Text analysis, chatbots, sentiment', icon: '💬' },
    { id: 'genai', name: 'Generative AI', desc: 'LLM apps, RAG, prompt engineering', icon: '✨' },
  ],
  iot: [
    { id: 'arduino', name: 'Arduino Projects', desc: 'Arduino-based circuits and control', icon: '🔧' },
    { id: 'esp32', name: 'ESP32 Projects', desc: 'WiFi / Bluetooth connected devices', icon: '📡' },
    { id: 'sensors', name: 'Sensor-based Systems', desc: 'Monitoring and data collection', icon: '🌡️' },
    { id: 'smarthome', name: 'Smart Home & Automation', desc: 'Remote control and automation', icon: '🏠' },
    { id: 'rpi', name: 'Raspberry Pi-Microcontrollers', desc: 'Raspberry Pi, STM32, PIC projects', icon: '🍓' },
  ],
  dbcloud: [
    { id: 'dbdesign', name: 'Database Design', desc: 'ER design, SQL / NoSQL databases', icon: '🗄️' },
    { id: 'cloudsetup', name: 'Cloud Setup & Hosting', desc: 'Server setup, hosting, domains', icon: '☁️' },
    { id: 'aws', name: 'AWS Projects', desc: 'EC2, S3, Lambda, RDS', icon: '🟠' },
    { id: 'azure', name: 'Azure Projects', desc: 'Azure VMs, App Service, SQL', icon: '🔷' },
    { id: 'migration', name: 'Migration & Administration', desc: 'Data migration, backup, tuning', icon: '🔄' },
  ],
  dataai: [
    { id: 'datascience', name: 'Data Science', desc: 'Modeling, prediction, experiments', icon: '🔬' },
    { id: 'analysis', name: 'Data Analysis', desc: 'Cleaning, statistics, insights', icon: '🧮' },
    { id: 'dashboards', name: 'Dashboards & Visualization', desc: 'Power BI, Tableau, Plotly', icon: '📊' },
    { id: 'nlpapps', name: 'NLP Applications', desc: 'Text mining and language apps', icon: '📝' },
    { id: 'automation', name: 'Automation', desc: 'Scripts, scraping, workflow automation', icon: '🤖' },
  ],
  network: [
    { id: 'networking', name: 'Networking', desc: 'LAN / WAN design, routing, simulation', icon: '🔗' },
    { id: 'sysadmin', name: 'Systems Administration', desc: 'Linux / Windows server setup', icon: '🗂️' },
    { id: 'api', name: 'API Development', desc: 'REST APIs, third-party integration', icon: '🔌' },
    { id: 'security', name: 'Cyber Security', desc: 'Hardening, pen-testing basics, firewalls', icon: '🔒' },
    { id: 'devops', name: 'DevOps', desc: 'Docker, CI/CD, deployment pipelines', icon: '🚀' },
  ],
};

export const STUDENT_CATEGORIES: Record<string, Category[]> = {
  'student-planning': [
    { id: 'topic', name: 'Topic validation', desc: 'Refine a feasible project topic', icon: '🎯' },
    { id: 'scope', name: 'Scope definition', desc: 'Clear objectives and boundaries', icon: '🧭' },
    { id: 'proposal', name: 'Proposal guidance', desc: 'Structure and review support', icon: '📋' },
    { id: 'roadmap', name: 'Milestone roadmap', desc: 'A practical delivery plan', icon: '🗓️' },
  ],
  'student-software': [
    { id: 'web', name: 'Web & mobile apps', desc: 'Implementation guidance', icon: '💻' },
    { id: 'api', name: 'APIs & backend', desc: 'Architecture and debugging', icon: '⚙️' },
    { id: 'test', name: 'Testing', desc: 'Test planning and review', icon: '🧪' },
    { id: 'deploy', name: 'Deployment', desc: 'Hosting guidance', icon: '🚀' },
  ],
  'student-ai': [
    { id: 'ml', name: 'Machine learning', desc: 'Model selection and evaluation', icon: '🧠' },
    { id: 'genai', name: 'Generative AI', desc: 'LLM and RAG guidance', icon: '✨' },
    { id: 'data', name: 'Data analysis', desc: 'Cleaning and visualization', icon: '📊' },
    { id: 'demo', name: 'Demo preparation', desc: 'Present results clearly', icon: '🎬' },
  ],
  'student-iot': [
    { id: 'embedded', name: 'Arduino & ESP32', desc: 'Firmware guidance', icon: '🔧' },
    { id: 'sensor', name: 'Sensors', desc: 'Integration and testing', icon: '🌡️' },
    { id: 'connect', name: 'Connectivity', desc: 'WiFi, BLE and MQTT', icon: '📡' },
    { id: 'circuit', name: 'Circuit review', desc: 'Safer, clearer designs', icon: '🔌' },
  ],
  'student-cloud': [
    { id: 'db', name: 'Database design', desc: 'SQL and NoSQL guidance', icon: '🗄️' },
    { id: 'cloud', name: 'Cloud architecture', desc: 'AWS, Azure and Firebase', icon: '☁️' },
    { id: 'hosting', name: 'Hosting', desc: 'Deployment walkthrough', icon: '🌐' },
    { id: 'security', name: 'Security review', desc: 'Access and backup basics', icon: '🔐' },
  ],
  'student-documentation': [
    { id: 'report', name: 'Report structure', desc: 'Clear academic writing', icon: '📄' },
    { id: 'slides', name: 'Presentation', desc: 'Slides and storytelling', icon: '🖼️' },
    { id: 'demo', name: 'Demo coaching', desc: 'Confident project walkthrough', icon: '🎤' },
    { id: 'viva', name: 'Viva preparation', desc: 'Practice questions', icon: '🎓' },
  ],
  'student-research': [
    { id: 'literature', name: 'Literature review', desc: 'Search and synthesis guidance', icon: '📚' },
    { id: 'method', name: 'Methodology', desc: 'Research design feedback', icon: '🔬' },
    { id: 'analysis', name: 'Results analysis', desc: 'Interpretation guidance', icon: '📈' },
    { id: 'citation', name: 'References', desc: 'Citation quality review', icon: '🔖' },
  ],
};
