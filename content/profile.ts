// Single source of truth for every fact on this site.
// Keep this file in sync with the master CV; nothing else hard-codes content.

export const person = {
  name: "Isaac Griffiths",
  initials: "IG",
  role: "AI Engineer",
  /** How he sells himself, as distinct from what his badge says. */
  billing: "AI engineer building agentic systems in Python, forward deployed",
  employer: "GSK R&D Tech (Pharmaceuticals)",
  location: "London, UK",
  /** Where he will actually work, which matters more to a recruiter than where he sleeps. */
  reach: "London and around it",
  commute: "Based in London; four years commuting to Stevenage, so anywhere in and around London is well within reach.",
  photo: "/isaac.jpg",
  tagline:
    "I build agentic systems that make enterprise operations ask better questions. Usually sat next to the people who have the problem.",
  email: "isaacgriffiths001@gmail.com",
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
    copy: "I am Isaac Griffiths, an AI Engineer in GSK R&D Tech and the technical lead of an agentic product, one of the first genuinely agentic systems in this part of the business. The tools I build are internal, which means they have to survive real users, real compliance and a real queue. I joined as a degree apprentice in 2022. In August 2026 I was promoted to manager grade.",
    highlights: ["AI Engineer", "GSK R&D Tech", "technical lead of an agentic product", "manager grade"],
  },
  {
    copy: "It started with a dull observation. Generic request forms let people submit almost nothing, so an engineer's first reply is spent asking for what should have arrived with the ticket. I built a triage layer end to end, as the only person who wrote code for it, that asks context-aware follow-up questions at intake, so the ticket arrives actionable instead of arriving twice. LangGraph, FastAPI and Next.js on Google Cloud Run, an MCP tool server on the live ServiceNow API, and the pipeline that ships it, all mine.",
    highlights: ["end to end", "context-aware follow-up questions", "actionable"],
  },
  {
    copy: "The way I work is closer to forward deployed than to a backlog. I sit with the team that has the problem and build alongside them: something working on screen inside the session, then reshaped around what they actually do with it. I build with Claude Code as my primary tool. It writes most of the Python and TypeScript; I specify the system, direct it, then read, review, test and debug whatever comes out. That second half decides whether anything ships. About 70% of my work is backend and cloud, 30% front end.",
    highlights: ["forward deployed", "build alongside them", "Claude Code as my primary tool", "70% of my work is backend and cloud"],
  },
  {
    copy: "Before that I spent three years as a lab IT engineer, keeping regulated scientific environments running: incident response, decommissioning, OT network segmentation and a lot of instruments that do not tolerate downtime. Three years of that teaches you something. The interesting part of a system is what it does on a bad day.",
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
    title: "AI Engineer",
    url: "https://www.gsk.com/",
    org: "GSK R&D Tech (Pharmaceuticals)",
    place: "Stevenage and London",
    period: "Aug 2026 – present",
    current: true,
    summary:
      "Technical lead of an agentic product in Scientific Data Engineering, on the Data and Analytics Engineering Manager job profile. I own the architecture, the delivery plan and the route from working prototype through architecture review to production, and I run the Google Cloud side end to end: Cloud Run, the GitHub Actions pipeline into Artifact Registry, Secret Manager and Cloud Monitoring. About 70% of my time goes on the backend and cloud, 30% on the front end. I communicate with principal data scientists, lab researchers and IT compliance, bring them to the same architecture approvals, and mentor apprentices on prompt evaluation, structured outputs and secure API design.",
    points: [
      "Technical lead for the team's first agentic product. I own the architecture, the delivery plan and the route from working prototype through architecture review to production, with the scientists who will use it in the room.",
      "Orchestration layer. I design the layer (Python, FastAPI, LangGraph) between foundation models and internal scientific data stores. Every automated action is audit-logged, confidence thresholds gate the output, and the agent hands off to a person whenever it is unsure.",
      "System boundaries. I define the API contracts (Pydantic, OpenAPI) and the fallback paths, so the agent fails safely rather than guessing. About 70% of my time goes on the backend and cloud, 30% on the front end.",
      "Google Cloud, end to end. I run the Cloud Run services, the GitHub Actions pipeline that builds Docker images into Artifact Registry, Secret Manager, Cloud Monitoring, and model access to Azure OpenAI and Gemini through GSK's Kong gateway. The triage agent is still mine from first line of code to the pipeline that ships it.",
      "Prototyping. Leadership now sees working software within days rather than months. I replaced discovery documents with live prototypes in front of scientific users, which catches feedback early and stops scope drift.",
      "Stakeholders. I communicate with principal data scientists, lab researchers and IT compliance and bring them to the same architecture approvals in a GxP-adjacent environment. I mentor apprentices on prompt evaluation, structured outputs and secure API design.",
    ],
    tags: ["Python", "FastAPI", "LangGraph", "Pydantic", "Azure OpenAI", "Gemini", "Google Cloud Run", "Artifact Registry", "GitHub Actions", "Claude Code"],
  },
  {
    index: "02",
    title: "AI Engineer, Degree Apprentice",
    url: "https://www.gsk.com/",
    org: "GSK R&D Tech (Pharmaceuticals)",
    place: "Stevenage",
    period: "Sep 2025 – Aug 2026",
    summary:
      "I built the intake and triage agent end to end, as the only person who wrote code for it: it turns incomplete lab support requests into tickets an engineer can act on. LangGraph, FastAPI and Next.js on Google Cloud Run, an MCP tool server on the live ServiceNow API, and the infrastructure as code through GitHub Actions and Artifact Registry. I co-authored and presented the architecture, then ran the testing cycle: 50+ structured cases including adversarial inputs, pytest and Jest in CI, Postman suites, trace-identifier logging across agent boundaries and peer review on every change. I rebuilt a compliant replacement for an internal application whose source code had been lost, verifying its behaviour with the scientists who use it, and prototyped an agentic instrument booking flow that I am improving with those same scientists.",
    points: [
      "Intake and triage agent. Every lab support ticket was raised by hand, and most arrived incomplete. I designed and built an agentic intake that validates each request against a dynamic schema and, where details are missing, opens a targeted dialogue to collect error codes, instrument IDs, logs and urgency before raising a ticket the right team can act on. I was the only person who wrote code for it: a LangGraph state machine (planner, gather, supervisor, executor), the FastAPI backend, a Next.js UI with schema-driven forms, and an MCP tool server on the live ServiceNow API. The infrastructure is code as well: GitHub Actions builds the Docker image, pushes it to Artifact Registry and deploys it to Cloud Run.",
      "Architecture and QA to production readiness. I co-authored and formally presented the platform design (orchestrator and supervisor pattern with five specialised sub-agents, session state and audit history defined in the data layer). Then I ran the testing cycle: 50+ structured cases including adversarial inputs, pytest and Jest in CI, Postman API suites, trace-identifier logging across agent boundaries, LLM confidence thresholds as a quality gate, peer review on every change and a SonarQube gate.",
      "Legacy rebuild with no source code. A tool scientists relied on was written in a language GSK no longer supported. No source, no maintainers. I reverse-engineered its behaviour from the running system and the scientists' own documentation, verified each rule with the people who used it daily, and rebuilt a compliant like-for-like replacement in Next.js and TypeScript with Claude Code. Then I tested it, documented it and took it through UAT and sign-off.",
      "Instrument booking agent. I prototyped a conversational booking flow (LangGraph, FastAPI, Next.js dashboards) that parses a natural-language request, picks the matching instrument from the experimental parameters, checks availability and syncs allocations to dashboards where the owning teams can see and override what the agent chose. It is a working prototype that I am improving with the scientists who will use it. It plugs into the other agentic products, so agents book instruments out through MCP, and the plan is to roll it out across GSK R&D.",
      "Requirements by demonstration. I sat with bench scientists in the Stevenage labs to see their daily constraints first-hand, so new software fitted the routines they already had. Live prototypes in front of them, then UAT, compliance sign-off and training.",
    ],
    tags: ["Python", "LangGraph", "MCP", "FastAPI", "Next.js", "TypeScript", "Docker", "Google Cloud Run", "Artifact Registry", "GitHub Actions", "pytest", "SonarQube"],
  },
  {
    index: "01",
    title: "Laboratory IT Engineer, Degree Apprentice",
    url: "https://www.gsk.com/",
    org: "GSK R&D (Pharmaceuticals)",
    place: "Stevenage",
    period: "Sep 2022 – Sep 2025",
    summary:
      "I kept regulated laboratory environments running across specialist instruments, endpoints and OT networks. When CrowdStrike took the site down I was the first at GSK Stevenage to restore an affected lab PC, and the BitLocker approach I worked out became the site's remediation procedure: 250+ systems back inside two days. I led the removal of 50+ Windows 7 systems under the GSK Legacy Programme, automated the lab PC build, supported 250+ specialist lab devices and worked with cybersecurity on OT network segmentation. Eleven GSK recognitions in three years: one Gold, one Silver, five Bronze and four peer awards.",
    points: [
      "CrowdStrike recovery. I was first at GSK Stevenage to restore an affected lab PC in the global outage. I worked out the BitLocker recovery approach the site adopted, worked the weekend to help restore 250+ systems within two days, then wrote the rebuild SOPs. GSK Gold Recognition.",
      "Windows 7 Legacy Programme. I led the decommissioning of 50+ end-of-life systems, which helped close a compliance-board risk rated very high. GSK Silver Recognition.",
      "PC build automation. I analysed and automated the lab PC build across four teams (swim-lane mapping, WDS/MDT imaging, PowerShell for software, domain join and hardening), cutting build time and error rates. I also delivered a 50+ slim-client rollout and a 20-iPad issue-logging pilot.",
      "I owned the availability of 250+ specialist laboratory computers and OT assets, and worked with cybersecurity on OT segmentation and hardware hardening without disturbing live experiments.",
      "I fixed instrument connectivity faults layer by layer (ports, VLANs, firewall policy, OS): six instrument PCs, a networked 3D printer, a Tecan liquid handler. I mentored apprentices, technicians and contractors, and taught lab teams enough that they needed IT less. Five Bronze Recognitions.",
    ],
    tags: ["Windows", "PowerShell", "WDS/MDT", "Active Directory", "BitLocker", "VLANs and firewall policy", "OT segmentation", "ServiceNow"],
  },
];

export const expertise = [
  {
    title: "Agentic systems, every day",
    body: "This is the centre of what I do. Agent workflows that hold up outside a demo: tool use, structured outputs, sensible behaviour when something fails and a route from prototype to something an operations team will actually accept.",
    points: [
      "Agent workflow design with LangChain and LangGraph",
      "Context-aware intake, interpretation and routing",
      "Prompt engineering with evaluation in the loop",
      "Prototype, stakeholder review, production readiness",
    ],
  },
  {
    title: "AI-native engineering, with the review to match",
    body: "I build with Claude Code as my primary tool. At work it writes most of the code (Cursor at the very start, then the GitHub Copilot coding agent); at home it is Claude Code, Cursor, Codex and a small self-hosted model on an old gaming GPU. I specify the system, direct it, then read, review, test and debug everything it produces. That second half decides whether any of it ships.",
    points: [
      "Claude Code as the daily toolchain at work; Cursor, Codex, Ollama and OpenCode at home",
      "Python and TypeScript read, reviewed, tested and debugged, every line",
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
    body: "Four years on the receiving end of the queue. I pick problems by watching where work stalls, not by looking for somewhere to put an LLM. The difference shows.",
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
      "Generic request forms let users submit the bare minimum. Every ticket started with a round trip before any work could begin.",
    approach:
      "I built the agentic intake layer end to end as the only person who wrote code for it: LangGraph, FastAPI and Next.js on Google Cloud Run, an MCP tool server on ServiceNow, and the pipeline that ships it through GitHub Actions and Artifact Registry. It asks context-aware follow-up questions, captures the detail up front and routes on submit.",
    result:
      "Tickets arrive actionable rather than arriving twice, cutting the delay between a scientist asking and an engineer starting.",
    tags: ["Agentic", "Triage", "Service operations"],
  },
  {
    title: "Rebuilding an application with no source code",
    context: "GSK R&D Tech",
    problem:
      "An internal application scientists relied on was falling out of policy, and its source code no longer existed. No repository, no specification, no option to leave it running.",
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
      "Built an agentic flow (LangGraph, FastAPI, Next.js dashboards) that interprets the request and handles the booking, with dashboards over the top for the people who own the resources.",
    result: "A working prototype that I am improving with the scientists who will use it. It plugs into the other agentic products, so agents book instruments out through MCP, and the plan is to roll it out across GSK R&D.",
    tags: ["Agentic", "Booking", "MCP", "Dashboards", "Prototype"],
  },
  {
    title: "ShipStamp",
    featured: true,
    url: "https://shipstamp.co.uk",
    context: "Personal project",
    problem:
      "Marketplace sellers print every courier label by hand: find the email, open the PDF, print, repeat. Each courier sends a different layout. They change without warning.",
    approach:
      "A Windows desktop app in Electron, React and TypeScript, built end to end. It pulls courier label PDFs from a Gmail or Microsoft inbox, fingerprints each layout to discover new courier variants on its own, and prints straight to a thermal label printer. Licensing and entitlements run on a Cloudflare Worker with D1 and RevenueCat.",
    result: "Built for my own reselling first. The site and waitlist are live at shipstamp.co.uk; mailbox access is in review with Google and Microsoft.",
    tags: ["Electron", "React", "TypeScript", "Gmail API", "Microsoft Graph", "Cloudflare Workers + D1", "End to end"],
  },
  {
    title: "TwinList",
    featured: true,
    context: "Personal project",
    problem:
      "Listing stock on Vinted and eBay means describing, pricing and form-filling every item by hand, twice.",
    approach:
      "A Next.js and Electron app, built end to end for my own reselling and used on real listings. Product photos go in, vision models draft the listing details, I approve them in a review deck, and a Chrome extension posts them to the live marketplace forms, escalating any field it cannot fill with confidence. Corrections feed a pgvector example bank, so it learns my judgement.",
    result: "Photos become posted listings, with me editing rather than typing.",
    tags: ["Next.js", "Electron", "Vercel AI SDK", "PostgreSQL + pgvector", "Chrome extension", "eBay Sell API"],
  },
  {
    title: "SMBDrop",
    featured: true,
    url: "https://github.com/isaacgriffiths/SMBDrop",
    context: "Personal project · open source",
    problem:
      "Getting photos, videos and files off an iPhone and onto a home server should not need a cloud account in the middle.",
    approach:
      "A free, open-source iOS app that sends photos, videos and files from an iPhone to an SMB share and pulls them back. Built end to end from a Windows machine: SwiftUI app, Share Extension, Keychain, and a fastlane pipeline on GitHub-hosted macOS runners to TestFlight.",
    result: "Public on GitHub. App Store release in progress.",
    tags: ["Swift", "SwiftUI", "SMB", "Share Extension", "fastlane", "GitHub Actions"],
  },
  {
    title: "AI news digest pipeline",
    context: "Personal",
    problem: "Keeping up with AI releases is a full-time reading job. Most of it does not matter.",
    approach: "n8n workflows that pull sources, summarise with LLMs, and produce something readable on a schedule.",
    result: "A daily digest that feeds the educational content I publish across LinkedIn, YouTube, TikTok and Instagram.",
    tags: ["n8n", "LLM pipelines", "Automation"],
  },
] as const;

export const skills = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    where: "Python on the GSK triage and booking backends; TypeScript across the triage UI, the legacy rebuild, TwinList, ShipStamp and this site.",
  },
  {
    group: "AI & agentic",
    items: ["LangChain", "LangGraph", "Prompt engineering", "Structured outputs", "Tool calling", "OpenAI", "Anthropic", "Gemini"],
    where: "LangGraph state machines on the GSK triage agent (2025) and booking agent (2026), with an MCP server into ServiceNow. GPT-4o via Azure and Gemini at GSK; Claude in TwinList.",
  },
  {
    group: "Web & APIs",
    items: ["Next.js", "React", "FastAPI", "PostgreSQL", "REST APIs", "Electron", "Integration design"],
    where: "FastAPI behind the triage and booking agents; Next.js on the triage UI, booking dashboards and the legacy rebuild; PostgreSQL with pgvector and Electron in TwinList and ShipStamp; Swift and SwiftUI in SMBDrop.",
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
    where: "GSK builds since 2025 shaped with scientists in the room and tested with them in UAT. The legacy rebuild is signed off, the booking platform is in production and the triage agent is in UAT across five labs.",
  },
  {
    group: "Automation",
    items: ["n8n", "Workflow orchestration", "Process automation", "ServiceNow"],
    where: "ServiceNow through the triage agent at GSK; n8n at home for the AI news digest that feeds my content.",
  },
  {
    group: "Cloud & delivery",
    items: ["Google Cloud Platform", "Microsoft Azure", "GitHub", "Cloudflare", "Docker"],
    where: "Triage agent in Docker on Cloud Run via GitHub Actions and Artifact Registry, all of it mine; Azure OpenAI through GSK's Kong gateway. Cloudflare Workers, D1, Pages and R2 for licensing and this site.",
  },
  {
    group: "AI-native development",
    items: ["Claude Code", "GitHub Copilot agent", "Cursor", "Codex", "Ollama", "Open WebUI", "Rapid prototyping", "Review, testing and debugging of generated code"],
    where: "At GSK: Cursor at the start in 2025, then the Copilot coding agent, now Claude Code only. At home: Claude Code, Cursor, Codex and a self-hosted model on an old gaming GPU. Claude Code writes most of the code. I specify, review, test and debug it: pytest and Jest in CI, Postman, SonarQube, Playwright end to end on the products.",
  },
  {
    group: "Infrastructure",
    items: ["Windows & Linux", "Networking & VLANs", "Active Directory", "WDS/MDT imaging", "PowerShell", "OT segmentation", "Proxmox", "Unraid"],
    where: "Three years in GSK's Stevenage labs: PC build automation, instrument networking, OT segmentation, the CrowdStrike recovery. Proxmox and Unraid at home.",
  },
] as const;

export const education = {
  degree: {
    title: "BSc (Hons) Digital and Technology Solutions (Software Development)",
    specialism: "Degree apprenticeship",
    school: "Anglia Ruskin University, Peterborough",
    detail: "Completed alongside full-time delivery at GSK.",
    period: "2022 – 2026",
    /** Predicted, not conferred. Classification is confirmed on 10 September 2026. */
    status: "Predicted First",
    statusDetail: "330 of 360 credits complete, seven modules at First. Result due 10 September 2026.",
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
  { title: "Car boot reselling", body: "Most weekends, buying stock for the reselling side business and testing ShipStamp and TwinList on real orders." },
  { title: "Self-hosting", body: "Unraid and Proxmox at home, mostly so I break deployment in private first." },
  { title: "Photography & video", body: "Shooting and editing in the Adobe suite, which is where the content habit started." },
  { title: "Gym", body: "The one part of the week that does not need a changelog." },
] as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
