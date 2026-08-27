import { profile, skills, experience, education, projects, certifications } from './data.js';

/**
 * Facts recruiters ask about that don't live on the resume itself.
 *
 * Anything left as `null` is simply left out of the bot's knowledge, and the bot
 * will tell the asker to email instead of guessing. Fill these in to get direct
 * answers — leaving them blank is safe, never wrong.
 */
export const recruiterFacts = {
  location: 'Dallas, TX',
  openTo: 'Full-time SDE / full-stack roles, remote or hybrid',
  relocation: 'Open to relocating for the right team',
  availability: 'Available with two weeks notice',
  workAuthorization: 'Authorized to work in the US',
  // Compensation is deliberately never answered by the bot — see COMPENSATION_KEYWORDS below.
};

/** Prompts shown as one-tap chips when the chat is empty. */
export const STARTER_QUESTIONS = [
  "What's her experience with AWS?",
  'Tell me about her projects',
  'Is she a good fit for a full-stack role?',
  'How do I get in touch?',
  'Why should we hire her?',
];

// ---------------------------------------------------------------------------
// Local matching engine — no API, no network call. Every answer is assembled
// straight from data.js and recruiterFacts above, so there's nothing for the
// bot to invent: if a topic isn't covered here, it says so and points to email.
// ---------------------------------------------------------------------------

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Single-token keywords are matched on word boundaries (so "aws" doesn't match
// inside another word, and "ui" doesn't match inside "build"). Multi-word
// phrases are matched as plain substrings, which is safe since accidental
// phrase collisions are effectively impossible.
const hasKeyword = (query, keyword) => {
  if (keyword.includes(' ')) return query.includes(keyword);
  return new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'i').test(query);
};

const skillsByCategory = (name) => skills.find((s) => s.category === name)?.items || [];

const bulletsMatching = (keywords) => {
  const lowerKeywords = keywords.map((k) => k.toLowerCase());
  const found = [];
  [...experience, ...projects].forEach((entry) => {
    entry.bullets.forEach((bullet) => {
      if (lowerKeywords.some((k) => bullet.toLowerCase().includes(k))) found.push(bullet);
    });
  });
  return [...new Set(found)];
};

const COMPENSATION_KEYWORDS = [
  'salary',
  'compensation',
  'pay',
  'wage',
  'pay rate',
  'comp package',
  'expected salary',
  'how much do you charge',
];

const compensationAnswer = () =>
  `Compensation is best discussed directly — reach out to ${profile.email} and Jahnavi can talk specifics.`;

const contactAnswer = () =>
  `You can reach Jahnavi at ${profile.email}${profile.phone ? ` or ${profile.phone}` : ''}. LinkedIn: ${profile.linkedin}${profile.github ? ` · GitHub: ${profile.github}` : ''}`;

const availabilityAnswer = () => {
  const f = recruiterFacts;
  const sentences = [];
  if (f.location) sentences.push(`She's based in ${f.location}.`);
  if (f.openTo) sentences.push(`She's open to ${f.openTo}.`);
  if (f.relocation) sentences.push(f.relocation.match(/[.!]$/) ? f.relocation : `${f.relocation}.`);
  if (f.availability) sentences.push(f.availability.match(/[.!]$/) ? f.availability : `${f.availability}.`);
  if (f.workAuthorization)
    sentences.push(f.workAuthorization.match(/[.!]$/) ? f.workAuthorization : `${f.workAuthorization}.`);
  if (sentences.length === 0) return `That's best confirmed directly — reach out to ${profile.email}.`;
  return sentences.join(' ');
};

const cloudAnswer = () => {
  const items = skillsByCategory('Cloud & DevOps');
  const bullets = bulletsMatching([
    'aws', 'lambda', 'sqs', 'dynamodb', 'cdk', 's3', 'ec2', 'docker', 'gitlab', 'azure', 'kubernetes', 'terraform',
  ]);
  let text = items.length ? `Jahnavi works extensively with: ${items.join(', ')}.` : '';
  if (bullets.length) text += ` For example — "${bullets[0]}"`;
  return text || `That's not something I have detail on — ask ${profile.email} directly.`;
};

const frontendAnswer = () => {
  const items = [
    ...skillsByCategory('Languages').filter((i) => /typescript|javascript/i.test(i)),
    ...skillsByCategory('Frontend'),
  ];
  const bullets = bulletsMatching(['react', 'typescript', 'redux', 'angular', 'ui', 'wcag', 'accessibility']);
  let text = items.length ? `On the frontend, Jahnavi uses: ${items.join(', ')}.` : '';
  if (bullets.length) text += ` For example — "${bullets[0]}"`;
  return text || `That's not something I have detail on — ask ${profile.email} directly.`;
};

const backendAnswer = () => {
  const items = [
    ...skillsByCategory('Languages').filter((i) => /\bpython\b|\bjava\b|c#/i.test(i)),
    ...skillsByCategory('Backend & APIs'),
    ...skillsByCategory('Databases'),
  ];
  const bullets = bulletsMatching([
    'node', 'hapi', 'rest api', 'database', 'authentication', 'jwt', 'oauth', 'python', 'java', 'graphql', 'soap', 'spring',
  ]);
  let text = items.length ? `On the backend, Jahnavi works with: ${items.join(', ')}.` : '';
  if (bullets.length) text += ` For example — "${bullets[0]}"`;
  return text || `That's not something I have detail on — ask ${profile.email} directly.`;
};

const skillsOverviewAnswer = () =>
  skills.map((s) => `${s.category}: ${s.items.join(', ')}`).join('\n');

const aiMlAnswer = () => {
  const items = skillsByCategory('AI Automation');
  const bullets = bulletsMatching([
    'openai', 'ai forecasting', 'chronos', 'timesfm', 'prompt', 'machine learning', 'ai platform',
    'langgraph', 'copilot', 'multi-agent', 'claude', 'gpt',
  ]);
  let text = items.length ? `On AI/ML, Jahnavi's background includes: ${items.join(', ')}.` : '';
  if (bullets.length) text += ` For example — "${bullets[0]}"`;
  return text || `That's not something I have detail on — ask ${profile.email} directly.`;
};

const formatExperience = (e, { full } = {}) =>
  `${e.role} at ${e.company}${e.location ? `, ${e.location}` : ''} (${e.date}) — ${(full ? e.bullets : [e.bullets[0]]).join(' ')}`;

// A bare company-name match ("arrant") can't tell the two Arrant entries apart,
// so only GVR — the one uniquely-named company — gets the single-entry, full-detail
// treatment; anything else falls back to the one-line-per-role overview.
const experienceAnswer = (query = '') => {
  if (query.includes('gvr')) {
    const gvr = experience.find((e) => e.company === 'GVR info Systems');
    if (gvr) return formatExperience(gvr, { full: true });
  }
  return experience.map((e) => formatExperience(e)).join('\n\n');
};

const formatProject = (p, { full } = {}) =>
  `${p.name} — ${p.role}${p.date ? ` (${p.date})` : ''}. ${(full ? p.bullets : [p.bullets[0]]).join(' ')} Tech: ${p.tech.join(', ')}.`;

// Keywords distinctive enough to identify a single project, so a question about
// one specific project gets that project's full detail instead of all five at once.
const PROJECT_KEYWORDS = {
  'PRISMA — Demand Forecasting & Supply-Chain Intelligence': ['prisma'],
  'CHIRP — Full-Stack Social Media Platform': ['chirp'],
  'Medicare AI Chatbot': ['medicare'],
  'IT Asset Management System — IniTech Solutions': ['asset management', 'initech'],
  'Cybersecurity Incident Management System': ['incident management', 'cybersecurity'],
};

const projectsAnswer = (query = '') => {
  for (const p of projects) {
    const kws = PROJECT_KEYWORDS[p.name] || [];
    if (kws.some((k) => query.includes(k))) return formatProject(p, { full: true });
  }
  return projects.map((p) => formatProject(p)).join('\n\n');
};

const educationAnswer = () =>
  education.map((e) => `${e.degree}, ${e.school} (${e.date})`).join('\n');

const certificationsAnswer = (query = '') => {
  if (query.includes('superpower') || query.includes('super power')) {
    return certifications.find((c) => c.toLowerCase().startsWith('superpower')) || certifications.join('\n');
  }
  if (query.includes('fun fact') || query.includes('interesting fact')) {
    return certifications.find((c) => c.toLowerCase().startsWith('fun fact')) || certifications.join('\n');
  }
  return certifications.join('\n');
};

const fitAnswer = () =>
  `${profile.summary} She's grounded through hands-on production work at Arrant Technologies — real-time sensor ingestion pipelines on AWS, contract-first API design, and OpenAI integration — plus personal projects spanning AI-driven demand forecasting (PRISMA) and a full-stack gRPC/REST platform (CHIRP). If a role needs full-stack ownership from React through AWS infra, that's squarely her lane.`;

const summaryAnswer = () =>
  `${profile.name} is a ${profile.role}${recruiterFacts.location ? ` based in ${recruiterFacts.location}` : ''}. ${profile.summary}`;

const greetingAnswer = () =>
  "Hi! Ask me anything about Jahnavi's experience, skills, or projects — or tap one of the suggestions above.";

const fallbackAnswer = () =>
  `I don't have information on that — for anything not covered here, the best way to get an answer is directly from Jahnavi at ${profile.email}.`;

// Order matters for ties: when two topics score equally, whichever is listed
// first wins. More specific topics (aws-cloud) are listed ahead of broader
// ones (experience) so e.g. "her AWS experience" resolves to the AWS answer.
// "greeting" is last so a lone "hi" doesn't hijack a real question that also
// happens to start with a greeting.
const TOPICS = [
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'in touch', 'linkedin', 'connect', 'github'],
    answer: contactAnswer,
  },
  {
    id: 'availability',
    keywords: [
      'available',
      'availability',
      'notice',
      'start',
      'start date',
      'relocate',
      'relocation',
      'remote',
      'sponsor',
      'sponsorship',
      'work authorization',
      'authorized',
      'authorization',
      'visa',
    ],
    answer: availabilityAnswer,
  },
  {
    id: 'cloud',
    keywords: ['aws', 'cloud', 'lambda', 'dynamodb', 'sqs', 's3', 'ec2', 'cdk', 'devops', 'docker', 'gitlab', 'ci/cd', 'azure', 'kubernetes', 'terraform'],
    answer: cloudAnswer,
  },
  {
    id: 'frontend',
    keywords: ['react', 'frontend', 'front-end', 'ui', 'javascript', 'typescript', 'redux', 'angular', 'css', 'html'],
    answer: frontendAnswer,
  },
  {
    id: 'backend',
    keywords: ['backend', 'back-end', 'node', 'hapi', 'api', 'rest', 'database', 'sql', 'mysql', 'postgres', 'security', 'jwt', 'oauth', 'authentication', 'python', 'java', 'graphql', 'soap', 'spring'],
    answer: backendAnswer,
  },
  {
    id: 'ai-ml',
    keywords: ['ai', 'ml', 'llm', 'openai', 'forecast', 'forecasting', 'chronos', 'timesfm', 'prompt', 'langgraph', 'copilot', 'multi-agent', 'claude', 'gpt'],
    answer: aiMlAnswer,
  },
  {
    id: 'skills-overview',
    keywords: ['framework', 'frameworks', 'tech stack', 'technologies', 'programming language', 'programming languages', 'skill', 'skills', 'language', 'languages'],
    answer: skillsOverviewAnswer,
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'prisma', 'chirp', 'medicare', 'asset management', 'incident management', 'initech', 'cybersecurity', 'capstone', 'startup'],
    answer: projectsAnswer,
  },
  {
    id: 'experience',
    keywords: ['experience', 'work history', 'job', 'career', 'employer', 'role', 'background', 'arrant', 'gvr', 'internship'],
    answer: experienceAnswer,
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'school', 'university', 'college', 'gpa', 'asu', 'masters', 'bachelor', 'study', 'studied'],
    answer: educationAnswer,
  },
  {
    id: 'certifications',
    keywords: ['certification', 'certificate', 'cert', 'interest', 'interests', 'hobby', 'hobbies', 'volunteer', 'fun fact', 'interesting fact', 'superpower', 'super power'],
    answer: certificationsAnswer,
  },
  {
    id: 'fit',
    keywords: ['good fit', 'why hire', 'why should', 'suitable', 'strengths', 'qualified'],
    answer: fitAnswer,
  },
  {
    id: 'summary',
    keywords: ['who is', 'about jahnavi', 'tell me about her', 'overview', 'introduce', 'summary'],
    answer: summaryAnswer,
  },
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer: greetingAnswer,
  },
];

/** Answers a visitor's question using only the resume data above — no network call. */
export const answerQuestion = (rawQuery) => {
  const query = rawQuery.toLowerCase();

  if (COMPENSATION_KEYWORDS.some((k) => hasKeyword(query, k))) {
    return compensationAnswer();
  }

  let best = null;
  let bestScore = 0;
  for (const topic of TOPICS) {
    const score = topic.keywords.reduce((n, k) => n + (hasKeyword(query, k) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }

  return best ? best.answer(query) : fallbackAnswer();
};
