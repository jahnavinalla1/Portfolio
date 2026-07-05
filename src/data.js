export const profile = {
  name: "Jahnavi Nalla",
  role: "Software Development Engineer",
  email: "jnalla@asu.edu",
  phone: "(602) 706-4279",
  linkedin: "https://www.linkedin.com/in/nalla2002/",
  summary: "Software Development Engineer with experience building scalable enterprise applications, real-time telemetry services, and AI platforms. Skilled in React, Node.js, and AWS.",
};

export const skills = [
  {
    category: "Programming Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Java", "Python", "C#/.NET", "SQL", "HTML5", "CSS3", "JSON", "XML"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React 19", "Redux Toolkit", "Node.js", "Hapi.js", "Angular", "ASP.NET Core", "Tailwind CSS"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (Lambda, SQS, DynamoDB, S3, EC2, CDK)", "Docker", "GitLab CI/CD", "Vercel"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "SQL Server", "DynamoDB", "NoSQL"],
  },
  {
    category: "APIs & Security",
    items: ["RESTAPI", "Swagger / Open API", "JWT", "OAuth 2.0", "RBAC", "Joi validation"],
  },
  {
    category: "AI / ML",
    items: ["OpenAI SDK", "LLM integration", "prompt engineering", "time-series forecasting (Chronos, TimesFM)"],
  }
];

export const experience = [
  {
    company: "Arrant Technologies",
    location: "Dallas, TX",
    role: "Software Development Engineer",
    date: "December 2025 - Present",
    bullets: [
      "Design and develop a commercial clean-room management web application serving 6 enterprise clients - React 19 + TypeScript frontend against a Node.js / Hapi.js REST backend over a normalized MySQL schema",
      "Built a real-time telemetry and data-routing service streaming operational metrics across 9 endpoints using AWS Lambda, SQS, DynamoDB, and CDK, improving metric freshness by ~50%",
      "Documented every REST route in Swagger and enforced Joi schema validation at the API gateway, rejecting malformed payloads before they reached the database",
      "Hardened authentication for 60+ users with JWT, bcrypt hashing, refresh-token rotation, and rate limiting, sharply reducing successful unauthorized-access attempts",
      "Built GitLab CI/CD pipelines with automated Postman API tests gating each deployment",
      "Integrated the OpenAI SDK for in-product recommendations with prompt guardrails and response validation",
    ]
  },
  {
    company: "Arrant Technologies",
    location: "Dallas, TX",
    role: "Software Development Engineer Intern & Co-op",
    date: "May 2025 - December 2025",
    bullets: [
      "Built reusable React + TypeScript UI components styled with Tailwind CSS, with application state managed through Redux Toolkit",
      "Implemented service-layer logic converting user inputs into validated, ISO-compliant room-specification metrics feeding auto-generated BOQ Excel reports",
      "Assisted senior engineers in developing serverless AWS Lambda functions coordinated through SQS and DynamoDB, and wrote Python and Java scripts for data processing",
    ]
  }
];

export const education = [
  {
    school: "Arizona State University, Tempe, AZ",
    date: "December 2025",
    degree: "M.S. in Information Technology; GPA 3.74/4.0",
    details: "Relevant courses: Fund. SWE, web development, OOPs, adv. DBMS, data structures, Cloud Architecture, Security policies, AI in cyber security"
  },
  {
    school: "B V Raju Institute of Technology, Hyderabad, India",
    date: "May 2023",
    degree: "B.Tech in Computer Science Engineering; GPA 8.6/10",
    details: ""
  }
];

export const projects = [
  {
    name: "PRISMA — Enterprise AI Platform",
    role: "Founder",
    date: "2025 - Present",
    bullets: [
      "Building an enterprise AI platform that helps organizations forecast demand, optimize inventory, and improve supply-chain decisions using predictive analytics and machine learning",
      "Lead product strategy, architecture, and roadmap for a multi-tenant SaaS platform- C# / ASP.NET Core backend, Angular frontend, SQL Server, covering multi-tenancy, security, and cloud deployment",
      "Designing AI forecasting pipelines using time-series foundation models (Chronos, TimesFM) and ensemble learning, with real-time signal intelligence from market trends and external data sources",
      "Developed inventory-optimization and replenishment recommendation engines while driving customer discovery and market planning",
    ],
    tech: ["C#", "ASP.NET Core", "Angular", "SQL Server", "AI/ML", "Chronos", "TimesFM"]
  }
];

export const certifications = [
  "Ai fluency, Claude 101 – Anthropic Certifications",
  "Cloud operations, cloud security Foundations- AWS academy Certification",
  "Campus partner – perplexity (educated peers on advantages of using perplexity)",
  "Volunteer – Foster your future ( Maintained their webpages)",
  "Interests: Athlete, Running, strength training, reading books, Carnatic Music- singer"
];
