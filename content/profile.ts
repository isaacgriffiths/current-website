// Single source of truth for every fact on this site.
// Keep this file in sync with the master CV — nothing else hard-codes content.

export const person = {
  name: "Isaac Griffiths",
  initials: "IG",
  role: "AI & Agentic Engineer",
  /** How he sells himself, as distinct from what his badge says. */
  billing: "Forward deployed AI engineer",
  employer: "GSK R&D Tech",
  location: "Hertfordshire, UK",
  photo: "/isaac.jpg",
  tagline:
    "I build agentic systems that make enterprise operations ask better questions. Usually sat next to the people who have the problem.",
  email: "hello@isaacgriffiths.com",
  links: {
    linkedin: "https://www.linkedin.com/in/isaacgriffiths/",
    github: "https://github.com/isaacgriffiths",
  },
} as const;

/** The hero demonstration: a thin request becoming a routable one. Illustrative, not a real ticket. */
export const triage = {
  before: "pc in lab 4 isn't working",
  questions: [
    { key: "Instrument", value: "HPLC — bench 07" },
    { key: "On screen", value: "Acquisition service failed" },
    { key: "Blocking a run", value: "Yes — sample queue held" },
    { key: "Last worked", value: "Friday, before patching" },
  ],
  after: { queue: "Lab Systems", priority: "P2", note: "routed on submit" },
} as const;

export const stats = [
  { value: "4", suffix: "yrs", label: "at GSK, across lab engineering and R&D Tech" },
  { value: "250", suffix: "+", label: "systems restored in the first 48h of CrowdStrike" },
  { value: "50", suffix: "+", label: "legacy Windows 7 systems decommissioned to full compliance" },
  { value: "1", suffix: "st", label: "team at GSK to restore systems by offline recovery" },
] as const;

export const about = [
  "I design and build internal AI tools inside GSK R&D Tech. They have to survive real users, real compliance, and a real queue. My current work is one of the first genuinely agentic systems moving towards production in this part of the business.",
  "It started with a boring observation: generic request forms let people submit almost nothing, so engineers spend their first reply asking for what they should already have. I built a triage layer that asks context-aware follow-up questions at intake, so a ticket arrives actionable instead of arriving twice.",
  "The way I work is closer to forward deployed than to a backlog. I sit with the team that has the problem and build alongside them: something working on screen inside the session, then reshaped against what they actually do with it. It skips the round of translation where a requirement quietly turns into a different requirement.",
  "Before that I spent three years as a lab IT engineer, keeping regulated scientific environments running: incident response, decommissioning, OT network segmentation, and a lot of instruments that do not tolerate downtime. That is where I learned that the interesting part of a system is what it does on a bad day.",
] as const;

export type ExperienceRecord = {
  index: string;
  title: string;
  org: string;
  place: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
  tags: string[];
};

export const experience: ExperienceRecord[] = [
  {
    index: "02",
    title: "Agentic Engineer, Apprentice",
    org: "GSK — R&D Tech",
    place: "Stevenage",
    period: "Sep 2025 — present",
    current: true,
    summary:
      "Designing and shipping AI-enabled internal tools that raise ticket quality and cut the delay between a scientist asking and an engineer acting.",
    points: [
      "Built an intelligent triage system that asks context-aware follow-up questions at intake, so requests arrive complete and route correctly the first time.",
      "Contributed to one of the first truly agentic systems progressing towards production in R&D Tech, from prototype through stakeholder review.",
      "Stood up application dashboards for stakeholders in days rather than quarters, pair-building live in the session so requirements were settled by demonstration instead of documentation.",
      "Reverse-engineered a legacy application and supported its like-for-like redevelopment, covering solution design, testing and iterative improvement.",
      "Worked directly with technical and business stakeholders on requirements, user testing, and adoption of practical AI across the function.",
    ],
    tags: [
      "Forward deployed",
      "Agentic workflows",
      "Dashboards",
      "LangGraph",
      "Python",
      "Next.js",
      "n8n",
    ],
  },
  {
    index: "01",
    title: "Laboratory IT Engineer, Degree Apprentice",
    org: "GSK — R&D",
    place: "Stevenage",
    period: "Sep 2022 — Sep 2025",
    summary:
      "Kept regulated laboratory environments running: instruments, endpoints, OT networks, and the incidents that arrive without warning.",
    points: [
      "During the CrowdStrike incident, compiled and managed BitLocker keys to restore systems ahead of schedule — the first team at GSK to recover systems through offline troubleshooting, with 250+ restored inside two days. (Gold Award)",
      "Led the decommissioning of 50+ Windows 7 systems to 100% policy compliance, closing a standing security exposure. (Silver Award)",
      "Configured and supported 250+ specialist lab devices, and resolved 20–30 ServiceNow tickets a month across software, hardware, and network access. (Multiple Bronze Awards)",
      "Worked with cybersecurity teams on network segmentation and hardware hardening in Operational Technology environments.",
      "Mentored apprentices and contractors, wrote the documentation, and ran the hands-on onboarding.",
    ],
    tags: ["Incident response", "OT security", "ServiceNow", "Windows", "Networking", "Compliance"],
  },
];

export const expertise = [
  {
    title: "Forward deployed by default",
    body: "I work next to the people who have the problem. Requirements get settled by putting something on screen in the room, not by a document that describes what everyone thought they agreed.",
    points: [
      "Embedded delivery with business and technical stakeholders",
      "Pair-building live, in the session",
      "Application dashboards standing up in days",
      "AI-assisted prototyping with the review discipline to match",
    ],
  },
  {
    title: "Agentic systems that reach users",
    body: "Designing agent workflows that hold up outside a demo: tool use, structured outputs, sensible failure behaviour, and a path from prototype to something an operations team will actually accept.",
    points: [
      "Agent workflow design with LangChain and LangGraph",
      "Context-aware intake and routing",
      "Prompt engineering with evaluation in the loop",
      "Prototype, stakeholder review, production readiness",
    ],
  },
  {
    title: "Operations, seen from the inside",
    body: "Four years on the receiving end of the queue. I pick problems by watching where work stalls, not by looking for somewhere to put an LLM.",
    points: [
      "Service operations and ticket quality",
      "Process improvement in regulated environments",
      "Requirements, user testing, and adoption",
      "Documentation people can follow under pressure",
    ],
  },
  {
    title: "Shipping the whole thing",
    body: "Full-stack enough to build the interface, the API, and the automation around it — and to know what the AI-assisted parts got wrong.",
    points: [
      "Next.js, React, TypeScript, FastAPI, Python",
      "n8n orchestration and integration design",
      "GCP and Azure, GitHub-based delivery",
      "AI-assisted development with review discipline",
    ],
  },
] as const;

export const projects = [
  {
    title: "Dashboards built in the room",
    context: "GSK R&D Tech",
    problem:
      "Teams described what they needed in a meeting, then waited weeks to discover it was not what they meant.",
    approach:
      "Sat with the stakeholders and built alongside them — AI-assisted prototyping to get a working dashboard on screen inside the session, then reshaped it against their reaction.",
    result:
      "Requirements settled by demonstration, and working dashboards in days rather than a specification cycle.",
    tags: ["Forward deployed", "Dashboards", "Rapid prototyping"],
  },
  {
    title: "Intelligent intake and triage",
    context: "GSK R&D Tech",
    problem:
      "Generic request forms let users submit the bare minimum, so every ticket started with a round trip before any work could begin.",
    approach:
      "Designed and built an agentic intake layer that asks context-aware follow-up questions, captures the detail up front, and routes on submit.",
    result:
      "Tickets arrive actionable rather than arriving twice, cutting the delay between a scientist asking and an engineer starting.",
    tags: ["Agentic", "Triage", "Service operations"],
  },
  {
    title: "Legacy application rebuild",
    context: "GSK R&D Tech",
    problem:
      "A legacy application still carried real business process, with no current specification for what it actually did.",
    approach:
      "Reverse-engineered the behaviour, worked with technical and business stakeholders to confirm it, and supported a like-for-like redevelopment.",
    result: "A modern replacement with documented behaviour, tested against the original rather than against assumptions.",
    tags: ["Reverse engineering", "Stakeholders", "Testing"],
  },
  {
    title: "Beehive monitoring, IoT",
    context: "Personal — GSK Stevenage apiary",
    problem:
      "Opening a hive to check it is disruptive, and by the time a problem is visible from the outside it is usually late.",
    approach:
      "Building sensing around hive weight, temperature, and activity with a colleague, as a volunteer beekeeper on site.",
    result: "In progress — trend data that answers “is this colony fine?” without lifting the lid.",
    tags: ["IoT", "Sensors", "Side project"],
  },
  {
    title: "AI news digest pipeline",
    context: "Personal",
    problem: "Keeping current with AI releases is a full-time reading job, and most of it does not matter.",
    approach: "n8n workflows that pull sources, summarise with LLMs, and produce something readable on a schedule.",
    result: "A daily digest that feeds the educational content I publish across LinkedIn, YouTube, TikTok, and Instagram.",
    tags: ["n8n", "LLM pipelines", "Automation"],
  },
] as const;

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  {
    group: "AI & agentic",
    items: ["LangChain", "LangGraph", "Prompt engineering", "Structured outputs", "Tool calling", "OpenAI", "Anthropic", "Gemini"],
  },
  {
    group: "Web & APIs",
    items: ["Next.js", "React", "FastAPI", "REST APIs", "Dashboard development", "Integration design"],
  },
  {
    group: "Working with stakeholders",
    items: [
      "Embedded delivery",
      "Pair-building",
      "Requirements by demonstration",
      "User testing",
      "Adoption & handover",
    ],
  },
  { group: "Automation", items: ["n8n", "Workflow orchestration", "Process automation", "ServiceNow"] },
  { group: "Cloud & delivery", items: ["Google Cloud Platform", "Microsoft Azure", "GitHub", "Cloudflare", "Docker"] },
  {
    group: "AI-assisted development",
    items: ["Cursor", "Claude Code", "Codex", "Rapid prototyping", "Review of generated code"],
  },
  {
    group: "Infrastructure",
    items: ["Windows & Linux", "Networking & VLANs", "Active Directory", "OT segmentation", "Proxmox", "Unraid"],
  },
] as const;

export const education = {
  degree: {
    title: "BSc (Hons) Digital and Technology Solutions",
    specialism: "Software Development specialism",
    school: "Anglia Ruskin University, Peterborough",
    detail: "Degree apprenticeship, completed alongside full-time delivery at GSK.",
    period: "2022 — 2026",
    /** Predicted, not conferred. Classification is confirmed on 10 September 2026. */
    status: "Predicted First",
    statusDetail: "330 of 360 credits complete, seven modules at First. Final classification confirmed 10 September 2026.",
    highlights: [
      "Programming and Networking IoT Project — 83%",
      "Computer and Network Technologies — 83%",
      "Information Security Management and Governance — 81%",
      "Object Orientated Modelling and Data Design — 76%",
      "Enterprise Analytics — 75%",
    ],
  },
  earlier: [
    { title: "BTEC ICT — Distinction*", detail: "Claires Court School, 2022" },
    { title: "A Level Geography — B", detail: "Claires Court School, 2022" },
    { title: "10 GCSEs, grades 5–8", detail: "including Maths (8) and ICT (8)" },
  ],
} as const;

export const interests = [
  { title: "Volunteer beekeeper", body: "On the GSK Stevenage apiary, which is also where the IoT project came from." },
  { title: "Self-hosting", body: "Unraid and Proxmox at home, mostly so I break deployment in private first." },
  { title: "Photography & video", body: "Shooting and editing in the Adobe suite, which is where the content habit started." },
  { title: "Gym", body: "The one part of the week that does not need a changelog." },
] as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
