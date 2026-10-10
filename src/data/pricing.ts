// ───────────── Types ─────────────
export interface Plan {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  price: number; // LKR
  days: number;
  features: string[];
  popular?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  unit: string;
  price: number; // LKR per unit
  days: number; // extra days per unit (negative = faster)
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

// Helper: addon ekak hadanna short way ekak
const a = (id: string, name: string, unit: string, price: number, days: number): Addon => ({
  id,
  name,
  unit,
  price,
  days,
});

// ───────────── Data ─────────────
export const SERVICES: Service[] = [
  // 1. SOFTWARE PROJECTS
  {
    id: 'software',
    name: 'Software Project',
      plans: [
      { id: 'basic', name: 'Basic', price: 15000, days: 4,
        features: ['1 small project', 'Source code', 'Basic setup guide', '1 revision'] },
      { id: 'standard', name: 'Standard', price: 35000, days: 8, popular: true,
        features: ['Mid-size project', 'Source code + comments', 'Basic documentation', '2 revisions'] },
      { id: 'premium', name: 'Premium', price: 75000, days: 16,
        features: ['Full-stack project', 'Full documentation', 'Presentation slides', 'Viva prep', '3 revisions'] },
    ],
    addons: [
      a('screen', 'Extra screen / page', '1 screen', 2500, 1),
      a('module', 'Extra module / feature', '1 module', 4000, 2),
      a('auth', 'Login & user roles', '1 setup', 4000, 2),
      a('admin', 'Admin panel', '1 panel', 8000, 3),
      a('payment', 'Payment gateway (PayHere etc.)', '1 gateway', 6000, 2),
      a('deploy', 'Deployment / hosting setup', '1 setup', 4000, 1),
      a('docs', 'Documentation', '10 pages', 2000, 1),
      a('slides', 'Presentation slides', '10 slides', 3500, 2),
      a('revision', 'Extra revision round', '1 round', 1500, 1),
      a('express', 'Express delivery', '1 day saved', 2500, -1),
    ],
  },

  // 2. AI / ML PROJECTS
  {
    id: 'aiml',
    name: 'AI / ML Project',
      plans: [
      { id: 'basic', name: 'Basic', price: 25000, days: 6,
        features: ['1 ML model', 'Dataset cleaning', 'Jupyter notebook', '1 revision'] },
      { id: 'standard', name: 'Standard', price: 55000, days: 12, popular: true,
        features: ['Model + evaluation', 'Simple web/API demo', 'Report', '2 revisions'] },
      { id: 'premium', name: 'Premium', price: 110000, days: 21,
        features: ['End-to-end AI system', 'Deployed demo', 'Full documentation', 'Presentation + viva prep', '3 revisions'] },
    ],
    addons: [
      a('model', 'Extra model comparison', '1 model', 4000, 2),
      a('dataset', 'Dataset collection / labeling', '500 samples', 6000, 3),
      a('tuning', 'Hyperparameter tuning', '1 round', 5000, 2),
      a('demo', 'Web demo (Streamlit / Flask)', '1 demo', 7000, 3),
      a('deploy', 'Model deployment (API)', '1 setup', 6000, 2),
      a('research', 'Literature review section', '1 section', 5000, 3),
      a('docs', 'Documentation', '10 pages', 2000, 1),
      a('viva', 'Viva / demo prep session', '1 hour', 3000, 1),
      a('revision', 'Extra revision round', '1 round', 1500, 1),
      a('express', 'Express delivery', '1 day saved', 2500, -1),
    ],
  },

  // 3. EMBEDDED & IoT
  {
    id: 'iot',
    name: 'Embedded & IoT',
      plans: [
      { id: 'basic', name: 'Basic', price: 20000, days: 5,
        features: ['Single sensor project', 'Circuit diagram', 'Firmware code', '1 revision'] },
      { id: 'standard', name: 'Standard', price: 45000, days: 10, popular: true,
        features: ['Multi-sensor system', 'Mobile/web dashboard', 'Documentation', '2 revisions'] },
      { id: 'premium', name: 'Premium', price: 95000, days: 18,
        features: ['Full IoT system + cloud', 'Live demo support', 'Full report', 'Presentation', '3 revisions'] },
    ],
    addons: [
      a('sensor', 'Extra sensor integration', '1 sensor', 3000, 1),
      a('dashboard', 'Mobile / web dashboard', '1 dashboard', 8000, 3),
      a('cloud', 'Cloud setup (MQTT / Firebase)', '1 setup', 5000, 2),
      a('circuit', 'Circuit / PCB diagram design', '1 design', 4000, 2),
      a('enclosure', '3D enclosure design', '1 design', 6000, 3),
      a('docs', 'Documentation', '10 pages', 2000, 1),
      a('demo', 'Live demo prep session', '1 hour', 3000, 1),
      a('revision', 'Extra revision round', '1 round', 1500, 1),
      a('express', 'Express delivery', '1 day saved', 2500, -1),
    ],
  },

  // 4. DATABASE & CLOUD
  {
    id: 'dbcloud',
    name: 'Database & Cloud',
      plans: [
      { id: 'basic', name: 'Basic', price: 12000, days: 3,
        features: ['Database design (ER diagram)', 'SQL scripts', '1 revision'] },
      { id: 'standard', name: 'Standard', price: 30000, days: 7, popular: true,
        features: ['DB + backend integration', 'Cloud hosting setup', 'Documentation', '2 revisions'] },
      { id: 'premium', name: 'Premium', price: 65000, days: 14,
        features: ['Scalable cloud architecture', 'AWS / Azure deployment', 'Full documentation', 'Presentation', '3 revisions'] },
    ],
    addons: [
      a('tables', 'Extra tables design', '10 tables', 2500, 1),
      a('procs', 'Stored procedures / triggers', '5 items', 3000, 1),
      a('migrate', 'Data migration', '1 migration', 5000, 2),
      a('optimize', 'Query optimization', '1 round', 3500, 1),
      a('backup', 'Backup & security setup', '1 setup', 4000, 1),
      a('cloud', 'AWS / Azure deployment', '1 deployment', 6000, 2),
      a('docs', 'Documentation', '10 pages', 2000, 1),
      a('slides', 'Presentation slides', '10 slides', 3500, 2),
      a('revision', 'Extra revision round', '1 round', 1500, 1),
      a('express', 'Express delivery', '1 day saved', 2500, -1),
    ],
  },

  // 5. DATA & AI APPLICATIONS
  {
    id: 'dataai',
    name: 'Data/AI Application',
      plans: [
      { id: 'basic', name: 'Basic', price: 18000, days: 5,
        features: ['Data cleaning + analysis', 'Charts', '1 revision'] },
      { id: 'standard', name: 'Standard', price: 40000, days: 10, popular: true,
        features: ['Interactive dashboard', 'Insights report', 'Automation script', '2 revisions'] },
      { id: 'premium', name: 'Premium', price: 85000, days: 17,
        features: ['Full data app + NLP', 'Deployed dashboard', 'Full documentation', 'Presentation', '3 revisions'] },
    ],
    addons: [
      a('dashpage', 'Extra dashboard page', '1 page', 3500, 1),
      a('dataset', 'Extra dataset analysis', '1 dataset', 4500, 2),
      a('nlp', 'NLP module (sentiment, etc.)', '1 module', 7000, 3),
      a('automate', 'Automation script', '1 script', 4000, 2),
      a('hosting', 'Dashboard hosting setup', '1 setup', 4000, 1),
      a('report', 'Insights report', '10 pages', 2500, 1),
      a('slides', 'Presentation slides', '10 slides', 3500, 2),
      a('revision', 'Extra revision round', '1 round', 1500, 1),
      a('express', 'Express delivery', '1 day saved', 2500, -1),
    ],
  },

  // 6. NETWORK & TECHNICAL
  {
    id: 'network',
    name: 'Network Application',
      plans: [
      { id: 'basic', name: 'Basic', price: 15000, days: 4,
        features: ['Network design / simulation', 'Config files', '1 revision'] },
      { id: 'standard', name: 'Standard', price: 35000, days: 8, popular: true,
        features: ['Secure network + services', 'CI/CD or API setup', 'Documentation', '2 revisions'] },
      { id: 'premium', name: 'Premium', price: 70000, days: 15,
        features: ['Full DevOps / security setup', 'Testing report', 'Full documentation', 'Presentation', '3 revisions'] },
    ],
    addons: [
      a('subnet', 'Extra subnet / device config', '1 subnet', 2500, 1),
      a('sim', 'Packet Tracer / GNS3 simulation', '1 simulation', 4500, 2),
      a('firewall', 'Firewall & security hardening', '1 setup', 6000, 2),
      a('vpn', 'VPN setup', '1 setup', 5000, 2),
      a('docker', 'Docker containerization', '1 project', 5000, 2),
      a('cicd', 'CI/CD pipeline', '1 pipeline', 6000, 3),
      a('docs', 'Documentation', '10 pages', 2000, 1),
      a('slides', 'Presentation slides', '10 slides', 3500, 2),
      a('revision', 'Extra revision round', '1 round', 1500, 1),
      a('express', 'Express delivery', '1 day saved', 2500, -1),
    ],
  },
];

// ───────────── Helpers ─────────────
export const formatLKR = (n: number): string => 'LKR ' + n.toLocaleString('en-LK');

export const formatDays = (n: number): string => `${n} day${Math.abs(n) === 1 ? '' : 's'}`;

export const formatAddonDays = (d: number): string =>
  d < 0 ? `${d} day (faster)` : `+${d} day${d === 1 ? '' : 's'}`;

// Bill: selected service + plan + addon quantities ({ revision: 2, docs: 1 })
export function calcBill(service: Service, plan: Plan, qtyMap: Record<string, number>): Bill {
  let total = plan.price;
  let days = plan.days;
  const lines: BillLine[] = [{ label: `${plan.name} plan`, amount: plan.price, days: plan.days }];

  service.addons.forEach((addon) => {
    const q = qtyMap[addon.id] || 0;
    if (q > 0) {
      total += addon.price * q;
      days += addon.days * q;
      lines.push({ label: `${addon.name} × ${q}`, amount: addon.price * q, days: addon.days * q });
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

// key = service id (src/data/pricing.ts eke SERVICES[i].id walata samanai)
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
