// Single source of truth for every fact on this site.
// Keep this file in sync with the master CV; nothing else hard-codes content.

export const person = {
  name: "Isaac Griffiths",
  initials: "IG",
  role: "Data and Analytics Engineering Manager",
  /** How he sells himself, as distinct from what his badge says. */
  billing: "AI-native agentic engineer, forward deployed",
  employer: "GSK R&D Tech",
  location: "Buckinghamshire, UK",
  /** Where he will actually work, which matters more to a recruiter than where he sleeps. */
  reach: "London & the South East",
  commute: "Four years commuting to Stevenage, so the South East is well within reach.",
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
    { key: "Instrument", value: "HPLC, bench 07" },
    { key: "On screen", value: "Acquisition service failed" },
    { key: "Blocking a run", value: "Yes, sample queue held" },
    { key: "Last worked", value: "Friday, before patching" },
  ],
  after: { queue: "Lab Systems", priority: "P2", note: "routed on submit" },
} as const;

export const about = [
  {
    copy: "I am Isaac Griffiths, a Data and Analytics Engineering Manager in GSK R&D Tech. I design and build internal AI tools that have to survive real users, real compliance, and a real queue, and I am now the technical lead of an agentic product, one of the first genuinely agentic systems moving towards production in this part of the business.",
    highlights: ["Data and Analytics Engineering Manager", "GSK R&D Tech", "technical lead of an agentic product", "genuinely agentic systems"],
  },
  {
    copy: "It started with a boring observation: generic request forms let people submit almost nothing, so engineers spend their first reply asking for what they should already have. I served as technical lead for a triage layer that asks context-aware follow-up questions at intake, so a ticket arrives actionable instead of arriving twice.",
    highlights: ["context-aware follow-up questions", "actionable"],
  },
  {
    copy: "The way I work is closer to forward deployed than to a backlog. I sit with the team that has the problem and build alongside them: something working on screen inside the session, then reshaped against what they actually do with it. I am AI-native about the building itself: Claude Code writes the Python and TypeScript, and I specify the system, direct the agents, and read, review, test and debug what comes out.",
    highlights: ["forward deployed", "build alongside them", "AI-native"],
  },
  {
    copy: "Before that I spent three years as a lab IT engineer, keeping regulated scientific environments running: incident response, decommissioning, OT network segmentation, and a lot of instruments that do not tolerate downtime. That is where I learned that the interesting part of a system is what it does on a bad day.",
    highlights: ["lab IT engineer", "what it does on a bad day"],
  },
] as const;

export type ExperienceRecord = {
  index: string;
  title: string;
  url: string;
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
    index: "03",
    title: "Data and Analytics Engineering Manager",
    url: "https://www.gsk.com/",
    org: "GSK R&D Tech",
    place: "Stevenage",
    period: "Aug 2026 – present",
    current: true,
    summary:
      "Technical lead of an agentic product in Scientific Data Engineering, promoted from the apprenticeship to a manager-grade role four years after joining GSK. I own the product's path from working prototype through stakeholder review into production, and I still build hands-on, sat with the people who use it.",
    points: [
      "Technical lead of an agentic product in R&D Tech, one of the function's first genuinely agentic systems progressing towards production.",
      "Own delivery end to end: prototype, stakeholder review, production readiness, and the conversations in between.",
      "Promoted from apprentice to a manager-grade position within four years of joining GSK.",
    ],
    tags: ["Agentic systems", "Tech lead", "AI-native", "Python", "TypeScript"],
  },
  {
    index: "02",
    title: "Agentic Engineer, Apprentice",
    url: "https://www.gsk.com/",
    org: "GSK R&D Tech",
    place: "Stevenage",
    period: "Sep 2025 – Aug 2026",
    summary:
      "Designed and shipped AI-enabled tools that improve ticket quality and reduce delays between scientists and engineers. I served as technical lead for a context-aware ticket-triage system that captures complete requests at intake, contributed to one of R&D Tech's first agentic systems moving towards production, and prototyped an agentic booking system with dashboards for resource-owning teams. I also reverse-engineered and rebuilt a compliant replacement for an internal application whose source code had been lost, verifying its behaviour directly with the scientists who use it. On the triage platform I co-authored and presented the architecture, then ran the testing cycle to production readiness: 50+ structured test cases including adversarial inputs, API test suites, trace-identifier logging and peer review on every change.",
    points: [
      "Served as technical lead for an intelligent ticket-triage system that asks context-aware follow-up questions at intake, so requests arrive complete and route correctly the first time.",
      "Co-authored and formally presented the platform architecture (an orchestrator with five specialised sub-agents, an MCP layer into ServiceNow), then ran the testing cycle to production readiness: 50+ structured test cases including adversarial inputs, Postman API suites, trace-identifier logging across agent boundaries, confidence thresholds as a quality gate, and peer review on every change.",
      "Prototyped and piloted an agentic booking system with dashboards for the teams who own the resources, pair-building with stakeholders so requirements were settled by demonstration rather than documentation.",
      "Reverse-engineered an internal application written in a language GSK no longer supported, with no source code, from the running system and the scientists' own documentation, then rebuilt a compliant replacement in Next.js and TypeScript.",
      "Worked directly with technical and business stakeholders on requirements, user testing, and adoption of practical AI across the function.",
    ],
    tags: ["Agentic workflows", "LangGraph", "FastAPI", "Next.js", "Google Cloud Run"],
  },
  {
    index: "01",
    title: "Laboratory IT Engineer, Degree Apprentice",
    url: "https://www.gsk.com/",
    org: "GSK R&D",
    place: "Stevenage",
    period: "Sep 2022 – Sep 2025",
    summary:
      "Kept regulated laboratory environments running across specialist instruments, endpoints, and OT networks. During the CrowdStrike incident I was the first at GSK Stevenage to restore an affected lab PC, and the BitLocker approach I worked out became the site's remediation procedure, with 250+ systems restored inside two days. I led the removal of 50+ Windows 7 systems within the GSK Legacy Programme, automated the lab PC build process, supported 250+ specialist lab devices, and worked with cybersecurity teams on OT network segmentation. Eleven GSK recognitions over the three years: one Gold, one Silver, five Bronze and four peer awards.",
    points: [
      "During the CrowdStrike incident, first at GSK Stevenage to restore an affected lab PC; defined the BitLocker recovery approach the site adopted, worked the weekend, and helped restore 250+ systems inside two days, then wrote the rebuild SOPs. (Gold Award)",
      "Led the decommissioning of 50+ Windows 7 systems within the GSK Legacy Programme, helping close a 'very high' compliance-board risk at 100% policy compliance. (Silver Award)",
      "Analysed and automated the lab PC build process across four teams: swim-lane mapping, WDS/MDT imaging, PowerShell for software, domain join and hardening, cutting build time and error rates. Also delivered a 50+ slim-client rollout and a 20-iPad pilot for logging lab issues.",
      "Configured and supported 250+ specialist lab devices, resolved 20–30 ServiceNow tickets a month, and fixed instrument connectivity layer by layer across ports, VLANs, firewall policy and OS. (Multiple Bronze Awards)",
      "Worked with cybersecurity teams on network segmentation and hardware hardening in Operational Technology environments.",
      "Mentored apprentices and contractors, educated lab teams so they depended less on IT, wrote the documentation, and ran the hands-on onboarding.",
    ],
    tags: ["Incident response", "OT security", "PowerShell", "ServiceNow", "Compliance"],
  },
];

export const expertise = [
  {
    title: "Agentic systems, every day",
    body: "This is the centre of what I do. Agent workflows that hold up outside a demo: tool use, structured outputs, sensible behaviour when something fails, and a route from prototype to something an operations team will actually accept.",
    points: [
      "Agent workflow design with LangChain and LangGraph",
      "Context-aware intake, interpretation and routing",
      "Prompt engineering with evaluation in the loop",
      "Prototype, stakeholder review, production readiness",
    ],
  },
  {
    title: "AI-native engineering, with the review to match",
    body: "I do not hand-write Python or TypeScript any more. At work Claude Code writes the code (Cursor at the very start, then the GitHub Copilot coding agent); at home it is Claude Code, Cursor, Codex and a small self-hosted model on an old gaming GPU. I specify the system, direct the agents, and read, review, test and debug everything that comes out. That second half is the part that decides whether any of it ships.",
    points: [
      "Claude Code as the daily toolchain at work; Cursor, Codex, Ollama and OpenCode at home",
      "Python and TypeScript read, reviewed and debugged, never typed by hand",
      "Tested like it matters: adversarial cases, API suites, trace logging, peer review",
      "Reverse engineering when there is no source to work from",
    ],
  },
  {
    title: "Forward deployed by default",
    body: "I work next to the people who have the problem. Requirements get settled by putting something on screen in the room, not by a document describing what everyone thought they agreed.",
    points: [
      "Embedded delivery with business and technical stakeholders",
      "Pair-building live, in the session",
      "Dashboards for the teams who own the process",
      "Behaviour verified by the people who rely on it",
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
] as const;

export const projects = [
  {
    title: "Intelligent intake and triage",
    context: "Technical lead · GSK R&D Tech",
    problem:
      "Generic request forms let users submit the bare minimum, so every ticket started with a round trip before any work could begin.",
    approach:
      "Led the design and build of an agentic intake layer that asks context-aware follow-up questions, captures the detail up front, and routes on submit.",
    result:
      "Tickets arrive actionable rather than arriving twice, cutting the delay between a scientist asking and an engineer starting.",
    tags: ["Agentic", "Triage", "Service operations"],
  },
  {
    title: "Rebuilding an application with no source code",
    context: "GSK R&D Tech",
    problem:
      "An internal application scientists relied on was falling out of policy, and its source code no longer existed. No repository, no specification, and no option to simply leave it running.",
    approach:
      "Reverse-engineered the behaviour from the running system and whatever documentation survived, then confirmed it rule by rule with the scientists who used it daily. Rebuilt a compliant replacement in Next.js and TypeScript from that verified picture.",
    result:
      "A like-for-like replacement inside policy, with the application's behaviour written down for the first time and checked against the original by the people who depend on it.",
    tags: ["Reverse engineering", "Legacy replacement", "Compliance", "Scientist-verified"],
  },
  {
    title: "Agentic booking system",
    context: "GSK R&D Tech",
    problem:
      "Booking requests arrive as plain description and have to become a real reservation against the right resource, held by the right team.",
    approach:
      "Building an agentic flow that interprets the request and handles the booking, with dashboards over the top for the people who own the resources.",
    result: "In progress: my current build, and where most of the day-to-day agentic work sits.",
    tags: ["Agentic", "Booking", "Dashboards", "In progress"],
  },
  {
    title: "ShipStamp",
    context: "Personal · shipped product",
    problem:
      "Marketplace sellers print every courier label by hand: find the email, open the PDF, print, repeat. Each courier sends a different layout, and they change without warning.",
    approach:
      "A Windows desktop app in Electron, React and TypeScript that reads label PDFs from a Gmail or Microsoft inbox, fingerprints each layout to discover new courier variants on its own, and prints straight to a thermal label printer. Licensing runs on Cloudflare Workers and D1 with RevenueCat entitlements.",
    result: "Live at shipstamp.co.uk, built for my own reselling side business first and then packaged for other sellers.",
    tags: ["Electron", "TypeScript", "Cloudflare Workers", "Shipped"],
  },
  {
    title: "TwinList",
    context: "Personal · shipped product",
    problem:
      "Listing stock on Vinted and eBay means describing, pricing and form-filling every item by hand, twice.",
    approach:
      "A Next.js and Electron app: product photos go in, vision models draft the listing details, the seller edits and approves them in a review deck, and a Chrome extension posts them to the live marketplace forms, escalating any field it cannot fill with confidence. Corrections feed a pgvector example bank so it learns the seller's judgement.",
    result: "Photos become posted listings, with the seller editing rather than typing.",
    tags: ["Next.js", "AI SDK", "PostgreSQL", "Chrome extension"],
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
    items: ["Next.js", "React", "FastAPI", "PostgreSQL", "REST APIs", "Electron", "Integration design"],
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
    group: "AI-native development",
    items: ["Claude Code", "GitHub Copilot agent", "Cursor", "Codex", "Ollama", "Open WebUI", "Rapid prototyping", "Review, testing and debugging of generated code"],
  },
  {
    group: "Infrastructure",
    items: ["Windows & Linux", "Networking & VLANs", "Active Directory", "WDS/MDT imaging", "PowerShell", "OT segmentation", "Proxmox", "Unraid"],
  },
] as const;

export const education = {
  degree: {
    title: "BSc (Hons) Digital and Technology Solutions",
    specialism: "Software Development specialism",
    school: "Anglia Ruskin University, Peterborough",
    detail: "Degree apprenticeship, completed alongside full-time delivery at GSK.",
    period: "2022 – 2026",
    /** Predicted, not conferred. Classification is confirmed on 10 September 2026. */
    status: "Predicted First",
    statusDetail: "330 of 360 credits complete, seven modules at First. Final classification confirmed 10 September 2026.",
    highlights: [
      "Programming and Networking IoT Project | 83%",
      "Computer and Network Technologies | 83%",
      "Information Security Management and Governance | 81%",
      "Object Orientated Modelling and Data Design | 76%",
      "Enterprise Analytics | 75%",
    ],
  },
  earlier: [
    { title: "BTEC ICT: Distinction*", detail: "Claires Court School, 2022" },
    { title: "A Level Geography: B", detail: "Claires Court School, 2022" },
    { title: "10 GCSEs, grades 5–8", detail: "including Maths (8) and ICT (8)" },
  ],
} as const;

export const interests = [
  { title: "AI content creation", body: "Short educational pieces on LinkedIn, YouTube, TikTok and Instagram, fed by my own news digest pipeline." },
  { title: "Car boots", body: "Most weekends, buying stock for the reselling side business and testing ShipStamp and TwinList on real orders." },
  { title: "Self-hosting", body: "Unraid and Proxmox at home, mostly so I break deployment in private first." },
  { title: "Photography & video", body: "Shooting and editing in the Adobe suite, which is where the content habit started." },
  { title: "Gym", body: "The one part of the week that does not need a changelog." },
] as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
