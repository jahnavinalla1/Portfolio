export const profile = {
  name: "Jahnavi Nalla",
  role: "Software Development Engineer",
  email: "Jahnavinalla01@gmail.com",
  phone: "(602) 706-4279",
  linkedin: "https://www.linkedin.com/in/nalla2002/",
  github: "https://github.com/jahnavinalla1",
  summary: "Software Development Engineer with experience building scalable enterprise applications, real-time telemetry services, and AI platforms. Skilled in React, Node.js, and AWS.",
};

export const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "C#", "Java", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React 19", "Angular", "HTML5", "CSS3"],
  },
  {
    category: "Backend & APIs",
    items: [".NET", "Node.js", "Hapi.js", "REST APIs", "GraphQL", "SOAP", "OAuth 2.0", "JWT", "RBAC", "Swagger / Open API", "Joi", "Spring Boot"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (Lambda, S3, DynamoDB, SQS, EC2, CDK)", "Azure", "Docker", "Kubernetes", "Terraform", "GitLab CI/CD", "Git"],
  },
  {
    category: "Databases",
    items: ["Microsoft SQL Server", "PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  },
  {
    category: "AI Automation",
    items: ["OpenAI SDK", "LangGraph", "LLM integration (Claude, GPT)", "Copilot", "Multi-agent AI systems", "Prompt optimization"],
  },
  {
    category: "Testing & Practices",
    items: ["Vitest", "Jest", "Postman", "Agile/Scrum", "Code reviews", "JIRA"],
  },
];

export const experience = [
  {
    company: "Arrant Technologies",
    location: "Dallas, TX",
    role: "Software Development Engineer",
    date: "January 2026 - Present",
    bullets: [
      "Contributed to the design and development of a cleanroom monitoring platform used by an industrial environmental-monitoring client to track environmental conditions like differential pressure, temperature, and humidity against ISO standards, with a React 19 + TypeScript + Redux front end and a Node.js (Hapi.js) REST API backend",
      "Built the ingestion pipeline streaming sensor readings from client facilities through AWS Lambda and SQS into DynamoDB, batching SQS consumption to raise consumer throughput and keep compliance dashboards near-real-time",
      "Wrote contract-first OpenAPI specifications with Joi schemas enforced on Hapi routes, rejecting malformed requests at the handler and giving client and server teams a single source of truth",
      "Built Postman integration and regression suites that run in GitLab CI on every merge request, cutting manual pre-release API testing from 4 hours to 30 minutes",
      "Wrote unit tests in Jest for shared UI components and API service handlers, covering error paths and schema edge cases",
      "Integrated the OpenAI SDK to power in-product recommendations, adding prompt guardrails and response validation so model output is checked before it reaches users",
    ],
    tech: ["React 19", "TypeScript", "Redux", "Node.js", "Hapi.js", "AWS Lambda", "SQS", "DynamoDB", "OpenAI SDK", "Jest"],
  },
  {
    company: "Arrant Technologies",
    location: "Dallas, TX",
    role: "Software Development Engineer Intern",
    date: "May 2025 - August 2025",
    bullets: [
      "Built reusable React + TypeScript UI components on an Agile team, incorporating feedback from code reviews with senior engineers",
      "Fixed bugs in backend REST endpoints, wrote endpoint documentation, and built Postman suites validating server responses against expected schemas and status codes",
      "Implemented Redux Toolkit state management for dashboard and result pages, mapping backend data models to frontend state",
      "Applied WCAG accessibility guidelines — keyboard navigation, ARIA labels, color contrast — to shipped UI components",
    ],
    tech: ["React", "TypeScript", "Redux Toolkit", "REST APIs", "Postman", "WCAG"],
  },
  {
    company: "GVR info Systems",
    location: "",
    role: "Software Engineer Intern",
    date: "May 2023 - December 2023",
    bullets: [
      "Spearheaded the development and launch of a feature that optimized the submission process for store-hours change requests by club associates, achieving a 40% increase in operational efficiency",
      "Pioneered a streamlined mobile interface using React Native for iOS, reducing request submission time by 80%",
      "Engineered RESTful APIs using Spring MVC to handle requests and approvals, and optimized database interactions with Spring Data JPA, improving data retrieval efficiency; collaborated with UX designers to incorporate feedback",
    ],
    tech: ["React Native", "Spring MVC", "Spring Data JPA", "REST APIs"],
  },
];

export const education = [
  {
    school: "Arizona State University, Tempe, AZ",
    date: "January 2024 - December 2025",
    degree: "Master of Science in Information Technology Engineering; GPA 4.00/4.00",
    details: "Relevant courses: Data Structures, System Design, Adv. Database Management, Cloud Architecture, AI in Cybersecurity, Cloud Security and Ops, Network Forensics, Security Compliance for IT",
  },
  {
    school: "B V Raju University, Hyderabad, India",
    date: "August 2019 - May 2023",
    degree: "Bachelor of Science in Computer Science; GPA 8.91/10.00",
    details: "",
  },
];

export const projects = [
  {
    name: "SCMA — Demand Forecasting & Supply-Chain Intelligence",
    role: "Solo build — backend and modelling",
    problem: "Factories commit inventory capital weeks before demand actually appears, and the seasonal rules of thumb they fall back on break down on irregular history.",
    outcome: "40% MAPE improvement over a seasonal-naive baseline.",
    date: "August 2025 - December 2025",
    status: "Completed",
    bullets: [
      "Built the backend in C#/.NET — a REST API over Microsoft SQL Server handling inventory data ingestion, validation, and transactional logic for factory supply-chain records",
      "Integrated time-series foundation models (Chronos, TimesFM) with ensemble learning for demand forecasting on historical factory supply-chain metrics, improving MAPE by 40% over a seasonal-naive baseline",
    ],
    tech: ["C#/.NET", "SQL Server", "Chronos", "TimesFM", "Ensemble Learning"],
  },
  {
    name: "CHIRP — Full-Stack Social Media Platform",
    role: "Solo build — full stack",
    problem: "Service-to-service calls and browser-facing endpoints have different needs, and hand-written types on either side drift apart the moment one of them changes.",
    outcome: "End-to-end type safety from generated contracts, with handlers covered by Vitest and Supertest in CI.",
    date: "December 2025",
    status: "Completed",
    bullets: [
      "Built a Twitter-style social platform as a pnpm monorepo, using gRPC with Protocol Buffers for service-to-service communication between backend microservices, and JSON REST endpoints for the browser-facing admin dashboard",
      "Designed the API layer around Protocol Buffers with code-generated gRPC contracts shared across frontend and backend for end-to-end type safety, plus database migration and seeding workflows for reproducible local setup",
      "Unit-tested gRPC service handlers with Vitest and integration-tested REST endpoints with Supertest in CI",
    ],
    tech: ["gRPC", "Protocol Buffers", "REST", "Vitest", "Supertest", "pnpm"],
  },
  {
    name: "Medicare AI Chatbot",
    role: "Internship project",
    problem: "Medicare policy details, coverage rules and claims processes are spread across documents a person has to already know how to search before they can get an answer.",
    outcome: "35% improvement in response accuracy, with a feedback loop feeding later iterations.",
    date: "",
    status: "Completed",
    bullets: [
      "Developed an intelligent Medicare assistance chatbot using Python, NLP, and API integration, enabling users to retrieve policy details, coverage information, and claims assistance through conversational interaction",
      "Implemented intent classification and entity recognition models to improve response accuracy by 35%, and integrated a user feedback loop to enhance chatbot performance over time",
    ],
    tech: ["Python", "NLP", "Intent Classification", "Entity Recognition", "API Integration"],
  },
  {
    name: "IT Asset Management System — IniTech Solutions",
    role: "Capstone project — architecture and security design",
    problem: "Asset lifecycle tracking spread across teams leaves no single record of what exists, who holds it, or who is permitted to see it.",
    outcome: "A cloud architecture, database schema and security plan meeting the regulatory requirements set for the brief.",
    date: "",
    status: "Completed",
    bullets: [
      "Designed a secure cloud-hosted IT asset management solution on AWS, implementing multi-factor authentication, encryption, and role-based access",
      "Created database schemas, network architecture diagrams, and security plans addressing regulatory compliance and operational efficiency",
      "Facilitated cross-team collaboration integrating UI wireframes, backend, and network infrastructure for seamless asset lifecycle tracking",
    ],
    tech: ["AWS", "MFA", "Encryption", "RBAC", "Network Architecture"],
  },
  {
    name: "Cybersecurity Incident Management System",
    role: "Capstone project — data modelling",
    problem: "Incident records scattered across tools make it slow to answer what happened, when, and what changed — the questions an audit asks first.",
    outcome: "Transparent audit trails and reliable incident data for faster security-team decisions.",
    date: "",
    status: "Completed",
    bullets: [
      "Developed a dimensional data warehouse in Microsoft SQL Server to track cybersecurity incidents efficiently",
      "Designed normalized dimension and fact tables with triggers, audit logs, and stored procedures automating incident status tracking",
      "Enabled transparent audit trails and reliable data for faster security team decisions, mirroring real-world enterprise practices",
    ],
    tech: ["Microsoft SQL Server", "Data Warehousing", "T-SQL", "Stored Procedures", "Audit Logging"],
  },
];

export const certifications = [
  "Ai fluency, Claude 101 – Anthropic Certifications",
  "Cloud operations, cloud security Foundations- AWS academy Certification",
  "Campus partner – perplexity (educated peers on advantages of using perplexity)",
  "Volunteer – Foster your future ( Maintained their webpages)",
  "Interests: Athlete, Running, strength training, reading books, Carnatic Music- singer",
  "Fun fact: She can cook and code simultaneously.",
  "Superpower: Can shop for 10 hours straight without water or food.",
];

// ---------------------------------------------------------------------------
// Editorial content for the site. Everything here is drawn from the same
// résumé material above, written out for reading rather than for scanning.
// ---------------------------------------------------------------------------

export const approach = [
  {
    title: "Make the contract the source of truth",
    body: "An API that is documented after it ships is documented wrong. I write the OpenAPI spec first and enforce it with Joi schemas on the route, so a malformed request is rejected at the handler and client and server teams argue with the spec instead of with each other.",
  },
  {
    title: "Design for the reading you cannot lose",
    body: "Sensor data arrives whether or not the consumer is ready for it. Batching SQS consumption instead of pulling one message at a time is what keeps a compliance dashboard near-real-time when a facility streams faster than expected.",
  },
  {
    title: "Test the paths that actually fail",
    body: "Happy-path coverage tells you very little. The tests worth writing cover error branches and schema edge cases — and they belong in CI on every merge request, which is how four hours of manual pre-release API checking became thirty minutes.",
  },
  {
    title: "Put guardrails in front of the model",
    body: "Shipping an LLM feature is mostly the work that happens around the model: prompt constraints going in, response validation coming out, and a clear decision about what the system does when the model returns something it should not.",
  },
];

export const operatingRange = [
  {
    title: "Frontend",
    body: "React 19 and TypeScript with Redux state, built as reusable components and held to WCAG basics — keyboard paths, ARIA labels, contrast — before handoff, not after.",
  },
  {
    title: "Backend & APIs",
    body: "Node.js with Hapi and C#/.NET services behind contract-first REST, with validation, auth and error semantics decided at design time rather than patched in later.",
  },
  {
    title: "Cloud & data",
    body: "AWS event pipelines — Lambda, SQS, DynamoDB — alongside relational modelling in SQL Server and PostgreSQL, including the warehouse and audit-trail side of it.",
  },
  {
    title: "AI systems",
    body: "LLM features built with the OpenAI SDK and LangGraph: prompt design, multi-agent orchestration, and the validation layer that decides what reaches the user.",
  },
  {
    title: "Quality",
    body: "Jest, Vitest, Supertest and Postman suites wired into GitLab CI, plus the review habits that catch a problem while it is still cheap to fix.",
  },
];

export const stats = [
  { value: "4.00", label: "GPA, M.S. Information Technology, Arizona State" },
  { value: "4h → 30m", label: "Manual pre-release API testing, after CI regression suites" },
  { value: "40%", label: "MAPE improvement over a seasonal-naive forecasting baseline" },
  { value: "80%", label: "Faster request submission on the React Native interface" },
];

export const about = {
  location: "Dallas, Texas",
  paragraphs: [
    "I am a software development engineer working on a cleanroom monitoring platform used by an industrial environmental-monitoring client — the system that tells a regulated facility whether its differential pressure, temperature and humidity are still inside ISO limits.",
    "That work sits across the whole stack: a React 19 and TypeScript front end, a Node.js and Hapi REST API, and an AWS ingestion pipeline moving sensor readings from facility hardware through Lambda and SQS into DynamoDB. It is a good teacher, because in a compliance product the failure mode is not a broken page — it is a gap in the record.",
    "Before that I built REST services and mobile interfaces at GVR Info Systems, and finished an M.S. in Information Technology at Arizona State with a 4.00. Outside work I run, lift, read, and sing Carnatic music.",
  ],
  now: "Building the AI layer of the monitoring platform — in-product recommendations with the prompt guardrails and response validation that make model output safe to show a regulated customer.",
};
