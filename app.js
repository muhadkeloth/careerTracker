(function(){
  const STORAGE_KEY = 'career_tracker_v2';
  const CATS = ['backend','ai','cloud','dsa','project','applications'];
  const CAT_LABEL = {backend:'Backend', ai:'AI', cloud:'Cloud', dsa:'DSA', project:'Project', applications:'Apps'};
  const COUNTERS = ['apps','referrals','messages','mocks'];
  const COUNTER_LABEL = {apps:'Apps sent', referrals:'Referrals', messages:'Recruiter msgs', mocks:'Mock ints'};

  const MONTH_TITLE = {
    1:'Foundation + Market Testing',
    2:'Production Backend + System Design',
    3:'Cloud + Deployment',
    4:'AI Engineering + Interview Loop',
    5:'Interview Mode',
    6:'Offer Conversion'
  };

  // deterministic generator so recurring-task checklist keys stay stable week to week
  function buildWeekTasks(w){
    const t = w.core.map(c => ({t:c.t, p:c.p}));
    t.push({t:'DSA track (' + w.dsaCount + ' work items — new problems + revision): ' + w.dsa + '. Log every problem; aim for ~100 solid problems by Month 5. 8-10 quality items weekly.', p:'M'});
    t.push({t:'Targeted applications: send ' + w.apps + ' fit-first applications (title, company, source, stack); test ATS, note required skills. Quality over volume.', p:'M'});
    t.push({t:'Weekly Job Market Analysis: log applications, recruiter replies, HR screens, tech/final interviews, offers, rejections (incl. ATS + reasons) in Metrics; apply the interpretation rules.', p:'M'});
    t.push({t:'Production Story Bank: draft/refine one STAR story — ' + w.star + '. Situation → Task → Action → Result, with a measurable result.', p:'S'});
    t.push({t:'Weekly Mock Interview Day (2 hrs): 30m DSA · 30m Node/TS/backend · 30m PostgreSQL/Redis/AWS · 30m system design / project / behavioral. Log scores, weak areas, confidence.', p:'M'});
    if(w.month >= 2){
      t.push({t:'System Design track: ' + w.design, p:'M'});
    }
    return t;
  }

  const WEEKS = [
    // ---------------- MONTH 1 — FOUNDATION + MARKET TESTING ----------------
    {id:1, month:1, title:'Positioning & TypeScript Depth',
      objective:'Positioning is the deliverable, not code. Reset your identity as a backend engineer and start testing the market immediately.',
      core:[
        {t:'Rewrite resume + LinkedIn around backend ownership; headline: Software Developer | Node.js | TypeScript | Backend APIs | PostgreSQL | AWS | AI Integrations', p:'M'},
        {t:'Advanced TypeScript: generics, narrowing, utility types, error modeling, clean interfaces', p:'M'},
        {t:'NestJS foundation: modules, DI, controllers, providers, lifecycle — scaffold one minimal API', p:'M'},
        {t:'GitHub: polish repo layout, READMEs and a short deploy description for past work', p:'S'}
      ],
      dsa:'Arrays + Hash Maps', dsaCount:8, apps:5, star:'Feature ownership & collaboration',
      deliverable:'Backend-positioned resume/LinkedIn + TypeScript audit + NestJS scaffold.',
      target:{backend:5, ai:1, cloud:0, dsa:3, project:1, applications:2}, quotas:{apps:5, referrals:0, messages:0, mocks:1}},
    {id:2, month:1, title:'Node Internals & Backend Foundations',
      objective:'Sound like an engineer who owns production — event loop, async, streams, memory.',
      core:[
        {t:'Node internals: event loop, async patterns, streams, worker threads at a conceptual level, memory/performance troubleshooting', p:'M'},
        {t:'Backend architecture: modular monolith first, service boundaries, retries, idempotency, eventual consistency, API security', p:'M'},
        {t:'API design: REST contracts, validation, error handling, pagination, versioning', p:'M'},
        {t:'Practice explaining lifecycle and error paths out loud for real projects', p:'S'}
      ],
      dsa:'Strings + Two Pointers', dsaCount:8, apps:5, star:'Difficult bug / production issue',
      deliverable:'Node-internals notes you can explain without notes.',
      target:{backend:5, ai:1, cloud:0, dsa:3, project:1, applications:2}, quotas:{apps:5, referrals:0, messages:0, mocks:1}},
    {id:3, month:1, title:'PostgreSQL Depth + Backend Security',
      objective:'SQL and API security are headline skills now — stop at "I can write a query."',
      core:[
        {t:'PostgreSQL: joins, indexes, transactions/isolation, normalization, query plans, locking, practical optimization', p:'M'},
        {t:'Learn EXPLAIN + keyset vs offset pagination on a real dataset; design a normalized schema with indexes', p:'M'},
        {t:'Backend Security MUST KNOW: password hashing, JWT + refresh tokens, RBAC, input validation, rate limiting, secure headers, secrets management', p:'M'},
        {t:'Backend Security OPTIONAL: SQL/NoSQL injection, XSS, CSRF, CORS, OWASP API Security basics', p:'O'}
      ],
      dsa:'Sliding Window + Stack / Queue', dsaCount:8, apps:5, star:'Performance optimization / API optimization',
      deliverable:'A schema + index design doc + security checklist covered.',
      target:{backend:5, ai:0, cloud:0, dsa:3, project:1, applications:2}, quotas:{apps:5, referrals:0, messages:0, mocks:1}},
    {id:4, month:1, title:'API Design, Auth & Project MVP Start',
      objective:'Design and start Project 1 properly — a phased MVP, not a CRUD clone.',
      core:[
        {t:'Project Phase 1 (MVP) starts: NestJS + TypeScript under a clean controller → service → repository structure; REST APIs, validation, error handling', p:'M'},
        {t:'Authentication: JWT + refresh tokens, RBAC, secure cookie/storage handling', p:'M'},
        {t:'System Design fundamentals: client/server, REST, HTTP, API design, authentication/authorization', p:'M'},
        {t:'Jest: first unit + integration tests on the app skeleton', p:'S'}
      ],
      dsa:'Binary Search + Linked List', dsaCount:8, apps:8, star:'Tight deadline / failure and lesson',
      deliverable:'Project MVP skeleton with auth + first system-design notes.',
      target:{backend:4, ai:0, cloud:0, dsa:3, project:3, applications:1}, quotas:{apps:8, referrals:0, messages:0, mocks:1}},

    // ---------------- MONTH 2 — PRODUCTION BACKEND + SYSTEM DESIGN ----------------
    {id:5, month:2, title:'Redis & Caching',
      objective:'Caching, rate limiting, job state — Redis shows up in nearly every Node backend listing.',
      core:[
        {t:'Redis: caching, TTL, cache invalidation, rate limiting, distributed-lock concept, session-store concept', p:'M'},
        {t:'Add a Redis cache + rate limiting to a hot read path in Project 1', p:'M'},
        {t:'Caching strategies: write-through, invalidation, stampede protection', p:'M'}
      ],
      dsa:'Trees', dsaCount:9, apps:15, star:'Database problem / architecture decision',
      design:'URL shortener (design in 10 min on paper)',
      deliverable:'Project 1 running with a real Redis cache layer + rate-limited path.',
      target:{backend:5, ai:1, cloud:0, dsa:3, project:2, applications:1}, quotas:{apps:15, referrals:1, messages:0, mocks:1}},
    {id:6, month:2, title:'Queues & Background Jobs',
      objective:'Background processing is the junior gap that screens for.',
      core:[
        {t:'Queues with BullMQ + Redis: retries, dead-letter queue, idempotency, scheduled/cron jobs', p:'M'},
        {t:'Build a queue feature in Project 1 (bulk import → worker → notify)', p:'M'},
        {t:'Project Phase 2: notifications, S3/file storage, audit logs, rate limiting, idempotent webhook processing', p:'M'}
      ],
      dsa:'Heap / Priority Queue', dsaCount:9, apps:15, star:'Technical trade-off / deployment issue',
      design:'Notification system',
      deliverable:'A real async pipeline in Project 1, not just request/response.',
      target:{backend:5, ai:1, cloud:1, dsa:3, project:3, applications:1}, quotas:{apps:15, referrals:2, messages:0, mocks:1}},
    {id:7, month:2, title:'PostgreSQL Deep + Prisma',
      objective:'Deepen the data layer so every join, index and migration is defensible.',
      core:[
        {t:'PostgreSQL deeper: B-tree/partial/covering indexes, isolation levels, locking, keyset pagination, query-plan reading', p:'M'},
        {t:'Prisma: schema design, migrations, relations, transactions, raw vs ORM performance', p:'M'},
        {t:'System Design — Data: SQL vs NoSQL, database indexing, transactions, normalization, replication, partitioning basics', p:'M'}
      ],
      dsa:'Intervals + Graph basics', dsaCount:9, apps:18, star:'Client requirement / team disagreement',
      design:'File upload service (S3 presigned URLs + async processing)',
      deliverable:'A migration + index plan for the Project 1 data layer.',
      target:{backend:5, ai:1, cloud:0, dsa:3, project:2, applications:1}, quotas:{apps:18, referrals:2, messages:0, mocks:1}},
    {id:8, month:2, title:'Project MVP + Jest',
      objective:'Finish the MVP and prove it with tests by the end of Month 2.',
      core:[
        {t:'Complete Project 1 MVP: authentication, RBAC, validation, error handling, rate limiting, idempotency, audit logs', p:'M'},
        {t:'Jest + Supertest: unit, integration and e2e tests for API boundaries and critical business workflows', p:'M'},
        {t:'System Design — Distributed systems: message queues, background jobs, event-driven architecture, idempotency, retries, failure handling', p:'M'}
      ],
      dsa:'Recursion / Backtracking', dsaCount:9, apps:20, star:'Failure and lesson / performance optimization',
      design:'Booking system (queues + idempotency)',
      deliverable:'Tested, complete Project 1 MVP with a resume proof line.',
      target:{backend:4, ai:1, cloud:0, dsa:3, project:4, applications:1}, quotas:{apps:20, referrals:3, messages:0, mocks:1}},

    // ---------------- MONTH 3 — CLOUD + DEPLOYMENT ----------------
    {id:9, month:3, title:'Docker & Delivery',
      objective:'Containerize once, ship twice — make delivery routine.',
      core:[
        {t:'Docker: multi-stage builds, volumes, compose, health checks, image size, security', p:'M'},
        {t:'CI/CD: test → build → image → deploy pipeline; secrets and environment management', p:'M'},
        {t:'System Design — Performance: caching, CDN, pagination, rate limiting, Redis', p:'M'}
      ],
      dsa:'Basic Dynamic Programming', dsaCount:9, apps:20, star:'Collaboration / tight deadline',
      design:'Chat system (real-time + horizontal scaling)',
      deliverable:'Containerized Project 1 with an automated CI pipeline.',
      target:{backend:3, ai:1, cloud:4, dsa:3, project:2, applications:1}, quotas:{apps:20, referrals:3, messages:0, mocks:1}},
    {id:10, month:3, title:'AWS Core + Deploy',
      objective:'Learn what each AWS service is for, then put Project 1 on real AWS.',
      core:[
        {t:'AWS MUST KNOW: EC2, S3, RDS, IAM, CloudWatch, ECR, ECS', p:'M'},
        {t:'Deploy Project 1 on AWS: ECR image, ECS/EC2, RDS, S3, IAM least privilege, CloudWatch logs', p:'M'},
        {t:'AWS SHOULD UNDERSTAND: SQS, Load Balancer, VPC basics, Auto Scaling', p:'S'}
      ],
      dsa:'DSA revision + timed sets (arrays, strings, two pointers, sliding window)', dsaCount:9, apps:20, star:'Production issue / performance at work',
      design:'Payment/webhook system (idempotency + retries + webhooks)',
      deliverable:'Project 1 live on AWS with RDS + S3 + CloudWatch.',
      target:{backend:2, ai:1, cloud:6, dsa:3, project:2, applications:1}, quotas:{apps:22, referrals:3, messages:0, mocks:1}},
    {id:11, month:3, title:'Observability + System Design Drills',
      objective:'Logs, metrics, alarms — plus the design vocabulary to talk about scale.',
      core:[
        {t:'Observability: structured logs, metrics, basic tracing; CloudWatch alarms on deployed services', p:'M'},
        {t:'System Design — Infrastructure + Observability: load balancing, horizontal scaling, Docker, AWS deployment, logging, metrics, monitoring, error tracking', p:'M'},
        {t:'Design practice: CRM, job queue, notification system on paper (10 min each)', p:'S'}
      ],
      dsa:'DSA: heaps, backtracking, binary search timed sets', dsaCount:9, apps:22, star:'Feature ownership / refactoring',
      design:'AI/RAG application design (retrieval, streaming, cost/latency)',
      deliverable:'Observable Project 1 + three defendable system designs.',
      target:{backend:2, ai:1, cloud:5, dsa:3, project:2, applications:1}, quotas:{apps:22, referrals:4, messages:0, mocks:1}},
    {id:12, month:3, title:'Deployment Complete + Engineering Docs',
      objective:'Deployment is only complete when the engineering story is written down.',
      core:[
        {t:'Complete Phase 3: project live on ECS with RDS, S3, IAM, CloudWatch, CI/CD; verify health + alarms', p:'M'},
        {t:'Phase 4 — Engineering docs: architecture diagram, ER diagram, API docs, ADRs, performance + security notes, deployment README', p:'M'},
        {t:'Resume proof line: "Designed and deployed a production Node/TypeScript backend on AWS with PostgreSQL, Redis, background jobs, RBAC and CI/CD."', p:'M'}
      ],
      dsa:'DSA: intervals, graphs, recursion timed sets + revise mistakes', dsaCount:9, apps:22, star:'Architecture decision / technical trade-off',
      design:'Design a multi-tenant SaaS backend (45 min)',
      deliverable:'Deployed + documented Project 1 with a resume proof line.',
      target:{backend:1, ai:1, cloud:5, dsa:3, project:3, applications:1}, quotas:{apps:22, referrals:4, messages:0, mocks:1}},

    // ---------------- MONTH 4 — AI ENGINEERING + INTERVIEW LOOP ----------------
    {id:13, month:4, title:'AI Integration + pgvector',
      objective:'AI integration is the differentiator — and the backend is still the hard part.',
      core:[
        {t:'LLM APIs, prompt design, embeddings, vector search, pgvector — practical backend use', p:'M'},
        {t:'Start AI project: ingest → chunk → embed → store in pgvector; retrieval with filters', p:'M'},
        {t:'Streaming responses with citations; per-tenant isolation from day one', p:'M'}
      ],
      dsa:'DP basics + timed revision of weak topics', dsaCount:9, apps:22, star:'Difficult bug / production issue (AI-adjacent)',
      design:'Design the AI/RAG backend: retrieval, reranking, citations, cost/latency',
      deliverable:'AI project scaffold with ingestion + embeddings working.',
      target:{backend:2, ai:5, cloud:2, dsa:3, project:2, applications:1}, quotas:{apps:22, referrals:4, messages:0, mocks:2}},
    {id:14, month:4, title:'Tool Calling, Cost & Latency, RAG Quality',
      objective:'Make the AI act — and keep token bills and latency sane.',
      core:[
        {t:'Tool/function calling: define tools, guardrails, human approval for risky actions', p:'M'},
        {t:'Token usage, cost optimization, latency budgets; streaming first-chunk time', p:'M'},
        {t:'Basic RAG evaluation: eval set, hit rate / relevancy; retrieval filtering + reranking basics', p:'M'}
      ],
      dsa:'DSA: full timed 2-problem set (45 min)', dsaCount:9, apps:22, star:'Performance optimization / API optimization (AI)',
      design:'Payment/webhook system re-design with idempotency + retries',
      deliverable:'AI project with tool calling, telemetry, and measured retrieval quality.',
      target:{backend:2, ai:6, cloud:1, dsa:3, project:2, applications:1}, quotas:{apps:22, referrals:5, messages:0, mocks:2}},
    {id:15, month:4, title:'AI Project Complete + Interview Loop I',
      objective:'Finish the AI project; start converting recruiter screens into coding-round passes.',
      core:[
        {t:'Complete AI project: evals, per-tenant access control, cost/latency telemetry, docs, resume proof line', p:'M'},
        {t:'Interview Loop I — timed DSA sets: arrays, strings, trees, graphs, heaps, recursion', p:'M'},
        {t:'Backend interview drills: API/data-model/caching/queues/scaling; project deep-dive narratives', p:'M'}
      ],
      dsa:'Revise the 100-problem log; targeted fixes', dsaCount:9, apps:25, star:'Refactoring + feature ownership',
      design:'Design a notification or chat system from scratch (45 min)',
      deliverable:'Finished, tested AI project + running 100-problem DSA log.',
      target:{backend:2, ai:4, cloud:1, dsa:4, project:3, applications:2}, quotas:{apps:25, referrals:5, messages:0, mocks:2}},
    {id:16, month:4, title:'Interview Loop II + Salary Strategy',
      objective:'Negotiate against scope and the market band, not the 3 LPA anchor.',
      core:[
        {t:'Study salary bands — min ₹8-10 LPA, target ₹10-15 LPA, stretch ₹15-18+ — and rehearse the negotiation script out loud', p:'M'},
        {t:'Measure funnel ratios: application→response, response→interview, interview→offer; adjust channels', p:'M'},
        {t:'Referral + recruiter outreach: ask for intros at target companies; 25 targeted applications', p:'M'}
      ],
      dsa:'DSA: 2 timed problems + revision', dsaCount:9, apps:25, star:'Collaboration / delegation',
      design:'Security-focused design: auth, secrets, rate limits, RBAC',
      deliverable:'Memorized negotiation script + measured funnel ratios.',
      target:{backend:1, ai:1, cloud:1, dsa:3, project:1, applications:5}, quotas:{apps:25, referrals:5, messages:5, mocks:2}},

    // ---------------- MONTH 5 — INTERVIEW MODE ----------------
    {id:17, month:5, title:'Timed DSA Mastery + Design Drills',
      objective:'Build speed without losing correctness — ~70% of the week is interview prep now.',
      core:[
        {t:'Timed DSA: binary search, heaps, backtracking, basic DP, intervals; re-solve every mistake from prior mocks', p:'M'},
        {t:'Backend design drills: microservices, queues, idempotency, scaling databases', p:'M'},
        {t:'Deep-dive rehearsal: Project 1 + AI project — trade-offs, bugs, architecture, database choices, performance fixes', p:'M'}
      ],
      dsa:'Daily 1-2 problems + weekly timed set', dsaCount:9, apps:25, star:'Failure and lesson (refine)',
      design:'Full 45-min design from the exercise bank, timed',
      deliverable:'100-problem log closed + two rehearsed project narratives.',
      target:{backend:2, ai:1, cloud:1, dsa:6, project:2, applications:2}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},
    {id:18, month:5, title:'Behavioral + STAR Polish + Question Bank',
      objective:'Ownership, conflict, failure, optimization, collaboration — STAR-clean.',
      core:[
        {t:'Rehearse every STAR story out loud (record + critique delivery)', p:'M'},
        {t:'Complete the 15-story Production Story Bank with measurable outcomes', p:'M'},
        {t:'Backend question bank: Node, TypeScript, PostgreSQL, Redis, AWS, Security, System Design — answer in writing', p:'M'}
      ],
      dsa:'Timed sets + revision', dsaCount:9, apps:25, star:'Client requirement / team disagreement (refine)',
      design:'Design a multi-tenant database schema with indexes + caching',
      deliverable:'15 polished STAR stories + written backend question-answer bank.',
      target:{backend:2, ai:0, cloud:0, dsa:4, project:1, applications:3}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},
    {id:19, month:5, title:'Aggressive Targeting',
      objective:'Prioritize product/GCC/Gulf roles and double down on channels that respond.',
      core:[
        {t:'Aggressive targeting: product/GCC/Gulf with a two-sentence pitch + one proof project', p:'M'},
        {t:'10 recruiter/hiring-manager messages/week + referral asks', p:'M'},
        {t:'Log ATS rejections + reasons; tune resume keywords per target title', p:'M'}
      ],
      dsa:'Timed sets + revision', dsaCount:9, apps:25, star:'Technical trade-off (refine)',
      design:'Rate limiting + caching + queue for a high-traffic endpoint',
      deliverable:'A channel-efficiency ranking acted on weekly.',
      target:{backend:1, ai:0, cloud:0, dsa:4, project:1, applications:6}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},
    {id:20, month:5, title:'Mock Interview Week + Gap Closure',
      objective:'Mock interviews reveal the gaps — go fix them.',
      core:[
        {t:'2 full mock interview days (4×30m each); log scores, weak areas, missed questions', p:'M'},
        {t:'Close the top 3 gaps from mock logs (DSA topic / design / behavioral)', p:'M'},
        {t:'Keep 25 applications + 5 referrals + 10 recruiter messages', p:'M'}
      ],
      dsa:'Focus on your weakest DSA topic from mock logs', dsaCount:9, apps:25, star:'Deployment issue / collaboration (refine)',
      design:'AI/RAG backend end-to-end design (45 min, timed)',
      deliverable:'Mock-derived gap list with three concrete closures.',
      target:{backend:1, ai:0, cloud:0, dsa:5, project:1, applications:6}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},

    // ---------------- MONTH 6 — OFFER CONVERSION ----------------
    {id:21, month:6, title:'Response-Channel Focus',
      objective:'Double down on channels that respond; pause the rest.',
      core:[
        {t:'Double down on highest-response channels; pause low-fidelity ones', p:'M'},
        {t:'Compare India vs UAE vs remote packages from real data; refine bands', p:'M'},
        {t:'Keep DSA revision (1-2 problems/day) + weekly mock interviews', p:'M'}
      ],
      dsa:'Daily 1-2 problems + weekly timed set', dsaCount:8, apps:25, star:'Failure and lesson (refine)',
      design:'Open-ended design review — your best design, 45 min',
      deliverable:'A channel-efficiency ranking + improving mock scores.',
      target:{backend:1, ai:0, cloud:0, dsa:4, project:1, applications:5}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},
    {id:22, month:6, title:'Negotiation Cluster',
      objective:'Negotiate from data, not hope.',
      core:[
        {t:'Negotiation drills: scope/skills/evidence language; handle "current salary" with the script', p:'M'},
        {t:'Onboarding + notice planning for likely start windows', p:'M'},
        {t:'Offer scorecard: role scope, growth, comp, location vs your targets', p:'M'}
      ],
      dsa:'DSA revision only (no new topics)', dsaCount:8, apps:22, star:'Client requirement (refine)',
      design:'Project deep-dive rehearsal (20 min each project)',
      deliverable:'A live negotiation run from the script + verified offer scorecard.',
      target:{backend:1, ai:0, cloud:0, dsa:2, project:1, applications:6}, quotas:{apps:22, referrals:5, messages:10, mocks:1}},
    {id:23, month:6, title:'Interview Practice While Onboarding',
      objective:'Keep improving even after a yes.',
      core:[
        {t:'1-2 DSA problems/day so you do not go rusty', p:'M'},
        {t:'Evaluate any new offer against role scope + growth', p:'M'},
        {t:'CarCare enhancement (OPTIONAL): PostgreSQL reporting path, Redis caching, background jobs, tests, CI/CD, structured logging, Docker — after the primary project', p:'O'}
      ],
      dsa:'Daily problems + weekly timed set', dsaCount:8, apps:20, star:'Any unwritten story — finish the bank',
      design:'Mock project deep-dive for final interviews',
      deliverable:'Sharp practice maintained through the transition.',
      target:{backend:0, ai:1, cloud:0, dsa:3, project:1, applications:4}, quotas:{apps:20, referrals:5, messages:5, mocks:1}},
    {id:24, month:6, title:'Close / Recalibrate',
      objective:'Decide deliberately; recalibrate if no offer.',
      core:[
        {t:'Set walk-away criteria before any live negotiation', p:'M'},
        {t:'Compare packages: India vs UAE vs remote; pick by scope + growth', p:'M'},
        {t:'If no offer yet: raise/narrow salary bands from response data and extend the plan', p:'M'}
      ],
      dsa:'Maintain sharpness; keep the daily problem habit', dsaCount:8, apps:20, star:'Final review of the story bank',
      design:'Final 45-min design mock',
      deliverable:'A deliberately evaluated decision or a recalibrated plan.',
      target:{backend:0, ai:1, cloud:0, dsa:2, project:0, applications:6}, quotas:{apps:20, referrals:5, messages:5, mocks:1}}
  ];

  WEEKS.forEach(w => { w.tasks = buildWeekTasks(w); });

  const CHECKPOINTS = [
    {id:'c1', day:30, capability:'~30 DSA problems (arrays, hash maps, strings, two pointers); Node/TypeScript + PostgreSQL fundamentals; backend security MUST KNOW list; Project 1 MVP started; ~25 targeted applications sent (5-10/week); STAR bank begun.', search:'Log response/rejection data weekly; tune resume keywords against ATS outcomes.'},
    {id:'c2', day:60, capability:'Project 1 reaches production features — Redis caching, BullMQ jobs, S3, notifications, idempotency, Jest tests; Docker + CI; PostgreSQL deeper + Prisma; system design fundamentals; ~55 DSA problems.', search:'15-25 applications/week; first recruiter screens begin if positioning is working.'},
    {id:'c3', day:90, capability:'Project 1 deployed on AWS (ECS/RDS/S3/CloudWatch/IAM) with Phase 4 engineering docs; system design exercise bank; ~75 DSA; 20-25 applications/week + referrals.', search:'Measure response rates by title and channel; adjust targeting.'},
    {id:'c4', day:120, capability:'AI/RAG project complete with evals + tool calling + telemetry; ~100 DSA problems; Readiness mostly Interview Ready/Strong where it matters; negotiation script memorized.', search:'Measure interview→offer ratios; raise or narrow salary bands from real data.'}
  ];

  const MARKETS = [
    {name:'India — Bengaluru / Hyderabad / Pune / Chennai / NCR', priority:'Primary funnel', core:'₹10-15 LPA (target)', stretch:'₹15-18+ LPA', check:'Minimum acceptable ₹8-10 LPA (floor, not the ask). ₹12 LPA is realistic enough to pursue but must be earned through evidence.'},
    {name:'UAE — Dubai / Abu Dhabi', priority:'Parallel high-value funnel', core:'AED 12k-15k/month', stretch:'AED 15k-18k+', check:'A current 1-3y Node/TS posting offers AED 12-15k + full visa sponsorship. Quality-target band, not a guaranteed median.'},
    {name:'Saudi Arabia — Riyadh', priority:'Selective parallel funnel', core:'SAR 10k-16k/month', stretch:'SAR 16k-20k+', check:'Many listings skew 3-8+ years; foreign-worker authorization is employer-linked; degree documentation can matter.'},
    {name:'International remote from India', priority:'Selective upside funnel', core:'₹15-25 LPA equivalent', stretch:'₹25-35+ LPA equivalent', check:'Only where "India Remote" / India employment is explicit. Stronger competition, more demanding written interviews.'}
  ];

  // ---------- interview readiness ----------
  const READINESS = [
    {k:'dsa', l:'DSA'}, {k:'js', l:'JavaScript'}, {k:'ts', l:'TypeScript'}, {k:'node', l:'Node.js'},
    {k:'nestjs', l:'NestJS'}, {k:'pg', l:'PostgreSQL'}, {k:'redis', l:'Redis'}, {k:'aws', l:'AWS'},
    {k:'docker', l:'Docker'}, {k:'sys', l:'System Design'}, {k:'security', l:'Security'}, {k:'testing', l:'Testing'},
    {k:'ai', l:'AI Integration'}, {k:'projects', l:'Projects'}, {k:'comm', l:'Communication'},
    {k:'behavioral', l:'Behavioral / STAR'}, {k:'apps', l:'Applications'}, {k:'referrals', l:'Referrals'}
  ];
  const STATUSES = ['Not Started','Learning','Practicing','Interview Ready','Strong'];
  const STORY_CATS = ['Difficult bug','Production issue','Performance optimization','API optimization','Database problem','Architecture decision','Refactoring','Feature ownership','Client requirement','Team disagreement','Tight deadline','Failure and lesson','Collaboration','Deployment issue','Technical trade-off'];

  // ---------- career conversion: weekly funnel + interpretation ----------
  const CONV_FIELDS = [
    {k:'apps', l:'Apps sent'}, {k:'referrals', l:'Referrals'}, {k:'replies', l:'Recruiter replies'}, {k:'hr', l:'HR screens'},
    {k:'tech', l:'Tech interviews'}, {k:'final', l:'Final interviews'}, {k:'offers', l:'Offers'}, {k:'rejections', l:'Rejections'},
    {k:'ats', l:'ATS rejections'}, {k:'refApps', l:'Referral apps'}
  ];
  const INTERPRET = [
    {when:'High ATS rejection', act:'Improve resume / keywords per target titles; test different resume versions.'},
    {when:'Recruiter response but technical rejection', act:'Improve technical preparation — DSA + backend fundamentals.'},
    {when:'Technical pass but HR rejection', act:'Improve communication / behavioral answers and expectations.'},
    {when:'Multiple technical interview failures', act:'Identify repeated technical gaps from mock logs; fix and re-test.'}
  ];
  const SALARY = [
    {l:'Minimum acceptable', v:'₹8-10 LPA'},
    {l:'Target', v:'₹10-15 LPA'},
    {l:'Stretch', v:'₹15-18+ LPA'}
  ];

  let state = {
    startDate: null,
    planLength: '4',
    checklist: {},
    checkpoints: {},
    hours: {},
    counters: {},
    applications: []
  };

  function defaultHours(){
    const h = {}; CATS.forEach(c => h[c] = 0); return h;
  }

  function defaultCounters(){
    const c = {}; COUNTERS.forEach(k => c[k] = 0); return c;
  }

  function defaultConversion(){
    const c = {}; CONV_FIELDS.forEach(f => c[f.k] = 0); c.note = ''; return c;
  }

  function seedState(){
    if(!state.readiness) state.readiness = {};
    READINESS.forEach(r => { if(!(r.k in state.readiness)) state.readiness[r.k] = 'Not Started'; });
    if(!state.stories) state.stories = {};
    STORY_CATS.forEach(c => { if(!state.stories[c]) state.stories[c] = {done:false, text:''}; });
    if(!state.mocks) state.mocks = [];
    if(!state.conversion) state.conversion = {};
    WEEKS.forEach(w => { if(!state.conversion['w'+w.id]) state.conversion['w'+w.id] = defaultConversion(); });
    if(typeof state.dsaTotal !== 'number') state.dsaTotal = 0;
  }

  function getStorage(){
    if(window.storage && typeof window.storage.get === 'function' && typeof window.storage.set === 'function'){
      return window.storage;
    }
    const fallback = (typeof window.localStorage !== 'undefined') ? window.localStorage : window.sessionStorage;
    return {
      get: async (key, def) => {
        try { return { value: fallback.getItem(key) || def }; }
        catch(e){ return { value: def }; }
      },
      set: async (key, value) => {
        try { fallback.setItem(key, value); }
        catch(e){ console.error('Storage unavailable:', e); }
      }
    };
  }
  const storage = getStorage();

  async function loadState(){
    try{
      const res = await storage.get(STORAGE_KEY, false);
      if(res && res.value){
        const parsed = JSON.parse(res.value);
        state = Object.assign(state, parsed);
      }
    }catch(e){
      console.log('No saved state yet, starting fresh.');
    }
    if(!state.hours) state.hours = {};
    if(!state.counters) state.counters = {};
    WEEKS.forEach(w => {
      if(!state.hours['w'+w.id]) state.hours['w'+w.id] = defaultHours();
      if(!state.counters['w'+w.id]) state.counters['w'+w.id] = defaultCounters();
    });
    seedState();
  }

  async function saveState(){
    try{
      await storage.set(STORAGE_KEY, JSON.stringify(state));
      flashSaved();
    }catch(e){
      console.error('Save failed', e);
    }
  }

  function flashSaved(){
    const el = document.getElementById('save-flag');
    el.classList.add('show');
    setTimeout(()=> el.classList.remove('show'), 900);
  }

  function esc(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ---------- date / week calculations ----------
  function daysBetween(a,b){ return Math.floor((b-a)/(1000*60*60*24)); }

  function totalDays(){ return state.planLength === '6' ? 180 : 120; }

  function maxMonth(){ return state.planLength === '6' ? 6 : 4; }

  function visibleWeeks(){ return maxMonth() === 6 ? WEEKS : WEEKS.filter(w => w.month <= 4); }

  function currentWeekIndex(){
    if(!state.startDate) return 0;
    const start = new Date(state.startDate);
    const now = new Date();
    const elapsed = daysBetween(start, now);
    if(elapsed < 0) return 0;
    return Math.min(visibleWeeks().length - 1, Math.floor(elapsed/7));
  }

  function updateHeader(){
    const daysLeftEl = document.getElementById('days-left');
    const weekIndEl = document.getElementById('week-indicator');
    const progEl = document.getElementById('overall-progress');
    const planBtns = document.querySelectorAll('.plan-btn');
    planBtns.forEach(b => b.classList.toggle('active', b.dataset.plan === state.planLength));
    if(!state.startDate){
      daysLeftEl.textContent = '—';
      weekIndEl.textContent = 'Set a start date to begin the countdown.';
      progEl.style.width = '0%';
      return;
    }
    const start = new Date(state.startDate);
    const now = new Date();
    const elapsed = daysBetween(start, now);
    const days = totalDays();
    const left = days - elapsed;
    daysLeftEl.textContent = left >= 0 ? left : 0;
    const wk = currentWeekIndex()+1;
    weekIndEl.textContent = elapsed < 0 ? 'Starts in ' + (-elapsed) + ' day(s).' : ('Week ' + wk + ' of ' + visibleWeeks().length);
    const pct = Math.max(0, Math.min(100, (elapsed/days)*100));
    progEl.style.width = pct + '%';
  }

  // ---------- scoring ----------
  function weekScore(weekObj){
    const logged = state.hours['w'+weekObj.id] || defaultHours();
    const target = weekObj.target;
    let totalTarget = 0, earned = 0;
    CATS.forEach(c => {
      const t = target[c] || 0;
      totalTarget += t;
      earned += Math.min(logged[c]||0, t);
    });
    if(totalTarget === 0) return 0;
    return Math.round((earned/totalTarget)*100);
  }

  function computeStreak(){
    let streak = 0;
    WEEKS.forEach(w => {
      const s = weekScore(w);
      const logged = state.hours['w'+w.id];
      const hasLog = logged && CATS.some(c => (logged[c]||0) > 0);
      if(!hasLog) return;
      if(s >= 75){ streak++; } else { return; }
    });
    return streak;
  }

  // ---------- render: dashboard ----------
  function renderDashboard(){
    const wk = visibleWeeks()[currentWeekIndex()];
    const score = weekScore(wk);
    document.getElementById('week-score').textContent = score;

    const barsEl = document.getElementById('dash-bars');
    barsEl.innerHTML = '';
    const logged = state.hours['w'+wk.id] || defaultHours();
    CATS.forEach(c => {
      const t = wk.target[c] || 0;
      const v = logged[c] || 0;
      const pct = t > 0 ? Math.min(100, (v/t)*100) : 0;
      const over = t > 0 && v >= t;
      barsEl.innerHTML += `<div class="bar-row"><div class="cat">${CAT_LABEL[c]}</div><div class="bar-track"><div class="bar-fill ${over?'over':''}" style="width:${pct}%"></div></div><div class="bar-val">${v} / ${t}h</div></div>`;
    });

    const streak = computeStreak();
    document.getElementById('streak-line').innerHTML = streak > 0
      ? `On-track streak: <b>${streak} week${streak>1?'s':''}</b> at 75+ score.`
      : 'No active streak yet — log this week\'s hours to start one.';

    const cumEl = document.getElementById('cumulative-bars');
    const cum = defaultHours();
    let max = 1;
    WEEKS.forEach(w => {
      const h = state.hours['w'+w.id] || defaultHours();
      CATS.forEach(c => cum[c] += (h[c]||0));
    });
    CATS.forEach(c => { if(cum[c] > max) max = cum[c]; });
    cumEl.innerHTML = '';
    CATS.forEach(c => {
      const pct = (cum[c]/max)*100;
      cumEl.innerHTML += `<div class="bar-row"><div class="cat">${CAT_LABEL[c]}</div><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><div class="bar-val">${cum[c]}h</div></div>`;
    });
  }

  function renderFunnel(){
    const apps = state.applications || [];
    const total = apps.length;
    const screened = apps.filter(a => ['Screening','Interview','Offer','Rejected'].includes(a.status)).length;
    const interviewed = apps.filter(a => ['Interview','Offer'].includes(a.status)).length;
    const offers = apps.filter(a => a.status === 'Offer').length;
    const rate = total > 0 ? Math.round((screened/total)*100) : 0;
    const el = document.getElementById('funnel');
    const chips = [
      {n:total, l:'Applications'},
      {n:screened, l:'Recruiter screens'},
      {n:interviewed, l:'Interviews'},
      {n:offers, l:'Offers'},
      {n:rate+'%', l:'Screen rate'}
    ];
    el.innerHTML = chips.map(c => `<div class="fstat"><div class="n">${c.n}</div><div class="l">${c.l}</div></div>`).join('');
  }

  function renderCheckpoints(){
    const el = document.getElementById('checkpoints');
    el.innerHTML = '';
    CHECKPOINTS.forEach(cp => {
      const done = !!state.checkpoints[cp.id];
      const row = document.createElement('div');
      row.className = 'checkpoint-row ' + (done ? 'done':'');
      row.innerHTML = `<input type="checkbox" data-cid="${cp.id}" ${done?'checked':''}><div><div class="cp-day">DAY ${cp.day}</div><span class="cp-cap">${cp.capability}</span><span class="cp-srch">Search — ${cp.search}</span></div>`;
      el.appendChild(row);
    });
    el.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', e => {
        state.checkpoints[e.target.dataset.cid] = e.target.checked;
        saveState();
        renderCheckpoints();
      });
    });
  }

  function renderMarkets(){
    const el = document.getElementById('markets');
    let rows = '';
    MARKETS.forEach(m => {
      rows += `<tr><td><b>${m.name}</b></td><td>${m.priority}</td><td style="white-space:nowrap"><b>${m.core}</b></td><td style="white-space:nowrap">${m.stretch}</td><td>${m.check}</td></tr>`;
    });
    el.innerHTML = `<table><thead><tr><th>Market</th><th>Priority</th><th>Core target</th><th>Stretch</th><th>Reality check</th></tr></thead><tbody>${rows}</tbody></table>`
      + '<div class="score-note">Target salary — Minimum ₹8-10 LPA · Target ₹10-15 LPA · Stretch ₹15-18+ LPA. These are targets, not guarantees.</div>';
  }

  // ---------- render: roadmap / weekly plan ----------
  function renderRoadmap(){
    const root = document.getElementById('plan-root');
    root.innerHTML = `<div class="prio-legend"><span class="prio prio-m">MUST</span> critical for the target role · <span class="prio prio-s">SHOULD</span> important, delayable · <span class="prio prio-o">OPTIONAL</span> only if time allows</div>`;
    for(let m=1;m<=maxMonth();m++){
      const weeksInMonth = WEEKS.filter(w => w.month === m);
      const details = document.createElement('details');
      details.className = 'month';
      if(m === WEEKS[currentWeekIndex()].month || (m===1 && !state.startDate)) details.open = true;
      const doneTasks = weeksInMonth.reduce((acc,w) => acc + w.tasks.filter((_,i) => state.checklist['w'+w.id+'_t'+i]).length, 0);
      const totalTasks = weeksInMonth.reduce((acc,w) => acc + w.tasks.length, 0);
      details.innerHTML = `<summary><span class="m-title">MONTH ${m} — ${MONTH_TITLE[m]}</span><span class="m-sub">${doneTasks}/${totalTasks} tasks done</span></summary><div class="month-body" id="month-body-${m}"></div>`;
      root.appendChild(details);
      const body = details.querySelector('.month-body');
      weeksInMonth.forEach(w => {
        const card = document.createElement('div');
        card.className = 'week-card';
        let tasksHtml = '';
        w.tasks.forEach((task,i) => {
          const key = 'w'+w.id+'_t'+i;
          const done = !!state.checklist[key];
          tasksHtml += `<div class="task-row ${done?'done':''}"><input type="checkbox" data-key="${key}" ${done?'checked':''}><label><span class="prio prio-${task.p.toLowerCase()}">${task.p}</span>${task.t}</label></div>`;
        });
        const th = w.target;
        const q = w.quotas;
        card.innerHTML = `
          <div class="wk-head"><span class="wk-num">WEEK ${w.id}</span><span class="wk-title">${w.title}</span></div>
          <div class="wk-obj">${w.objective}</div>
          ${tasksHtml}
          <div class="deliverable">Build: ${w.deliverable}</div>
          <div class="target-hours">Target hours — Backend ${th.backend}h · AI ${th.ai}h · Cloud ${th.cloud}h · DSA ${th.dsa}h · Project ${th.project}h · Apps ${th.applications}h · Total ${th.backend+th.ai+th.cloud+th.dsa+th.project+th.applications}h</div>
          <div class="target-hours quota-line">Job search — Apps ${q.apps} · Referrals ${q.referrals} · Recruiter msgs ${q.messages} · Mock ints ${q.mocks}</div>
        `;
        body.appendChild(card);
      });
    }
    root.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', e => {
        state.checklist[e.target.dataset.key] = e.target.checked;
        saveState();
        renderRoadmap();
      });
    });
  }

  // ---------- render: tracking ----------
  function renderLog(){
    const root = document.getElementById('track-root');
    root.innerHTML = '';
    visibleWeeks().forEach(w => {
      const logged = state.hours['w'+w.id] || defaultHours();
      const counts = state.counters['w'+w.id] || defaultCounters();
      const score = weekScore(w);
      const row = document.createElement('div');
      row.className = 'log-week';
      let fields = '';
      CATS.forEach(c => {
        fields += `<div class="log-field"><label>${CAT_LABEL[c]}</label><input type="number" min="0" step="0.5" value="${logged[c]||0}" data-week="${w.id}" data-cat="${c}" data-kind="hour"></div>`;
      });
      let counters = '';
      COUNTERS.forEach(c => {
        counters += `<div class="log-field"><label>${COUNTER_LABEL[c]}</label><input type="number" min="0" step="1" value="${counts[c]||0}" data-week="${w.id}" data-cat="${c}" data-kind="counter"></div>`;
      });
      const catTarget = w.quotas;
      const quotaNote = COUNTERS.map(c => `${COUNTER_LABEL[c]} <b>${counts[c]||0}/${catTarget[c]}</b>`).join(' · ');
      row.innerHTML = `<div class="lw-label"><b>WEEK ${w.id}</b>${w.title}</div><div class="log-inputs">${fields}</div><div class="log-score">${score}</div><div class="log-quota"><span class="lq-title">JOB-SEARCH QUOTAS</span><span>${quotaNote}</span></div>`;
      root.appendChild(row);
    });
    root.querySelectorAll('input[type=number]').forEach(inp => {
      inp.addEventListener('change', e => {
        const wk = e.target.dataset.week, cat = e.target.dataset.cat, kind = e.target.dataset.kind;
        if(kind === 'counter'){
          if(!state.counters['w'+wk]) state.counters['w'+wk] = defaultCounters();
          state.counters['w'+wk][cat] = parseInt(e.target.value, 10) || 0;
        }else{
          if(!state.hours['w'+wk]) state.hours['w'+wk] = defaultHours();
          state.hours['w'+wk][cat] = parseFloat(e.target.value) || 0;
        }
        saveState();
        renderLog();
        renderDashboard();
      });
    });
  }

  // ---------- render: applications ----------
  let pendingDelete = null;

  function openDeleteModal(app){
    pendingDelete = app.id;
    document.getElementById('modal-app-info').textContent = app.company + (app.role ? ' — ' + app.role : '');
    document.getElementById('delete-modal').hidden = false;
  }

  function closeDeleteModal(){
    pendingDelete = null;
    document.getElementById('delete-modal').hidden = true;
  }

  function currentFilters(){
    return {
      q: (document.getElementById('app-search').value || '').trim().toLowerCase(),
      status: document.getElementById('app-filter-status').value,
      location: document.getElementById('app-filter-location').value,
      from: document.getElementById('app-filter-from').value,
      to: document.getElementById('app-filter-to').value
    };
  }

  function filteredApps(){
    const f = currentFilters();
    return (state.applications || []).filter(a => {
      if(f.status && a.status !== f.status) return false;
      if(f.location && (a.location || '') !== f.location) return false;
      if(f.from && a.dateApplied && a.dateApplied < f.from) return false;
      if(f.to && a.dateApplied && a.dateApplied > f.to) return false;
      if(f.q){
        const hay = [a.company, a.role, a.location, a.source, a.stack, a.notes, a.resumeVer].join(' ').toLowerCase();
        if(!hay.includes(f.q)) return false;
      }
      return true;
    });
  }

  function populateLocationFilter(){
    const sel = document.getElementById('app-filter-location');
    const keep = sel.value;
    const locations = [...new Set((state.applications || []).map(a => (a.location || '').trim()).filter(Boolean))].sort();
    sel.innerHTML = '<option value="">All locations</option>' + locations.map(l => `<option>${l}</option>`).join('');
    sel.value = (locations.includes(keep)) ? keep : '';
  }

  function renderApps(){
    const root = document.getElementById('apps-root');
    const countEl = document.getElementById('apps-count');
    if(!state.applications || state.applications.length === 0){
      root.innerHTML = '<div class="empty">No applications logged yet — add your first one above.</div>';
      countEl.textContent = '';
      return;
    }
    const filtered = filteredApps();
    const total = state.applications.length;
    countEl.textContent = filtered.length === total ? `${total} application${total>1?'s':''}` : `Showing ${filtered.length} of ${total} application${total>1?'s':''}`;
    if(filtered.length === 0){
      root.innerHTML = '<div class="empty">No applications match the current filters.</div>';
      return;
    }
    const sorted = [...filtered].sort((a,b) => (b.dateApplied||'').localeCompare(a.dateApplied||''));
    let rows = '';
    sorted.forEach(a => {
      const cls = 'st-' + (a.status || 'Applied').toLowerCase().replace(/ /g, '-');
      rows += `<tr class="${cls}">
        <td><b>${a.company}</b><br><span class="sub">${a.role||''}</span></td>
        <td>${a.location||'—'}</td>
        <td>${a.source||'—'}</td>
        <td class="mono-cell">${a.stack||'—'}</td>
        <td>${a.dateApplied||''}</td>
        <td><select class="status" data-id="${a.id}">
          ${['Applied','Screening','Interview','Offer','Rejected','Ghosted'].map(s => `<option ${a.status===s?'selected':''}>${s}</option>`).join('')}
        </select></td>
        <td>${a.resumeVer||'—'}</td>
        <td>${a.followUp||'—'}</td>
        <td>${a.notes||''}</td>
        <td><button class="del" data-id="${a.id}">remove</button></td>
      </tr>`;
    });
    root.innerHTML = `<table><thead><tr><th>Company / Role</th><th>Location</th><th>Source</th><th>Stack</th><th>Applied</th><th>Status</th><th>Resume</th><th>Follow-up</th><th>Notes</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
    root.querySelectorAll('select.status').forEach(sel => {
      sel.addEventListener('change', e => {
        const item = state.applications.find(x => x.id === e.target.dataset.id);
        if(item){ item.status = e.target.value; saveState(); renderApps(); renderFunnel(); }
      });
    });
    root.querySelectorAll('.del').forEach(btn => {
      btn.addEventListener('click', e => {
        const item = state.applications.find(x => x.id === e.target.dataset.id);
        if(item) openDeleteModal(item);
      });
    });
  }

  function addApplication(){
    const company = document.getElementById('app-company').value.trim();
    const role = document.getElementById('app-role').value.trim();
    const location = document.getElementById('app-location').value.trim();
    const source = document.getElementById('app-source').value.trim();
    const stack = document.getElementById('app-stack').value.trim();
    const date = document.getElementById('app-date').value;
    const status = document.getElementById('app-status').value;
    const resumeVer = document.getElementById('app-resume').value.trim();
    const followup = document.getElementById('app-followup').value;
    const notes = document.getElementById('app-notes').value.trim();
    if(!company){ return; }
    state.applications = state.applications || [];
    state.applications.push({id: 'a'+Date.now(), company, role, location, source, stack, dateApplied: date, status, resumeVer, followUp: followup, notes});
    ['app-company','app-role','app-location','app-source','app-stack','app-date','app-status','app-resume','app-followup','app-notes'].forEach(id => {
      const el = document.getElementById(id);
      if(el && el.type !== 'select-one') el.value = '';
    });
    saveState();
    renderApps();
    renderFunnel();
  }

  // ---------- render: interview readiness ----------
  function readinessOverall(){
    let sum = 0, n = 0;
    READINESS.forEach(r => {
      const cur = state.readiness[r.k] || 'Not Started';
      sum += Math.max(0, STATUSES.indexOf(cur));
      n++;
    });
    const avg = n ? sum/n : 0;
    const level = avg >= 3.5 ? 'Strong' : avg >= 2.5 ? 'Interview Ready' : avg >= 1.5 ? 'Practicing' : avg >= 0.5 ? 'Learning' : 'Not Started';
    return {avg, level};
  }

  function renderReadiness(){
    const root = document.getElementById('readiness-root');
    const ov = readinessOverall();
    let rows = '';
    READINESS.forEach(r => {
      const cur = state.readiness[r.k] || 'Not Started';
      rows += `<tr><td><b>${r.l}</b></td><td><select class="ready-select" data-k="${r.k}">${STATUSES.map(s => `<option ${cur===s?'selected':''}>${s}</option>`).join('')}</select></td></tr>`;
    });
    root.innerHTML = `
      <div class="score-big"><span class="num">${ov.avg.toFixed(1)}</span><span class="of">/ 4.0 — ${ov.level}</span></div>
      <div class="score-note">Your self-assessed readiness, separate from task completion. Move a skill to <b>Practicing</b> after real practice and to <b>Interview Ready</b> when you can explain it in an interview, then <b>Strong</b> with proven depth.</div>
      <div style="overflow-x:auto"><table><thead><tr><th>Capability</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    root.querySelectorAll('select.ready-select').forEach(sel => {
      sel.addEventListener('change', e => {
        state.readiness[e.target.dataset.k] = e.target.value;
        saveState();
        renderReadiness();
      });
    });
  }

  function renderDsa(){
    const root = document.getElementById('dsa-root');
    const total = state.dsaTotal || 0;
    const pct = Math.min(100, (total/100)*100);
    root.innerHTML = `
      <div class="bar-row"><div class="cat">Problems solved</div><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><div class="bar-val">${total} / 100</div></div>
      <div class="dsa-entry"><label>Update count:</label><input type="number" min="0" id="dsa-count" value="${total}"><button class="btn" id="dsa-save">Save</button></div>
      <div class="score-note">Solve 8-10 quality items weekly (new + revision) across arrays, hash maps, strings, two pointers, sliding window, stacks/queues, binary search, linked lists, trees, heaps, intervals, graphs, recursion/backtracking and basic DP. Re-solve every timed/mock mistake. Do not postpone DSA until the backend work is done.</div>`;
    document.getElementById('dsa-save').addEventListener('click', () => {
      state.dsaTotal = parseInt(document.getElementById('dsa-count').value, 10) || 0;
      saveState();
      renderDsa();
    });
  }

  function renderStories(){
    const root = document.getElementById('story-root');
    const done = STORY_CATS.filter(c => state.stories[c] && state.stories[c].done).length;
    let rows = '';
    STORY_CATS.forEach(c => {
      const s = state.stories[c] || {done:false, text:''};
      rows += `<div class="story-row ${s.done?'done':''}">
        <div class="story-head"><input type="checkbox" data-c="${c}" ${s.done?'checked':''}> <span class="story-cat">${c}</span></div>
        <textarea data-c="${c}" placeholder="Situation → Task → Action → Result (with a measurable outcome)" rows="2">${esc(s.text)}</textarea>
      </div>`;
    });
    root.innerHTML = `<div class="score-note">Target 10-15 stories built from real production experience. ${done}/${STORY_CATS.length} written so far. Refine one weekly via the recurring STAR task.</div><div>${rows}</div>`;
    root.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', e => {
        const c = e.target.dataset.c;
        const s = state.stories[c] || {done:false,text:''};
        s.done = e.target.checked;
        state.stories[c] = s;
        saveState();
        renderStories();
      });
    });
    root.querySelectorAll('textarea').forEach(ta => {
      ta.addEventListener('change', e => {
        const c = e.target.dataset.c;
        const s = state.stories[c] || {done:false,text:''};
        s.text = e.target.value;
        state.stories[c] = s;
        saveState();
      });
    });
  }

  function renderMockLog(){
    const root = document.getElementById('mock-root');
    const mocks = state.mocks || [];
    const avg = mocks.length ? Math.round(mocks.reduce((a,m) => a + (m.score||0), 0)/mocks.length) : null;
    let items = '';
    mocks.forEach((m,i) => {
      items += `<div class="mock-row"><span class="mock-date">${esc(m.date)||'—'}</span><span class="mock-score">${m.score||0}/100</span><span class="mock-conf">conf ${m.conf||'—'}/5</span><span class="mock-note">weak: ${esc(m.weak)||'—'} · revise: ${esc(m.revise)||'—'} · missed: ${esc(m.missed)||'—'}</span><button class="del" data-i="${i}">remove</button></div>`;
    });
    root.innerHTML = `
      <div class="mock-form">
        <div class="log-field"><label>Date</label><input type="date" id="mock-date"></div>
        <div class="log-field"><label>Score (0-100)</label><input type="number" min="0" max="100" id="mock-score"></div>
        <div class="log-field"><label>Confidence (1-5)</label><select id="mock-conf"><option></option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div>
        <div class="log-field"><label>Weak areas</label><input type="text" id="mock-weak"></div>
        <div class="log-field"><label>Topics to revise</label><input type="text" id="mock-revise"></div>
        <div class="log-field"><label>Questions missed</label><input type="text" id="mock-missed"></div>
        <button class="btn" id="mock-add">Add</button>
      </div>
      <div class="score-note">${avg===null ? 'No mocks logged yet — run the Weekly Mock Interview Day first.' : 'Average mock score: ' + avg + '/100'}</div>
      <div>${items || '<div class="empty">No mock interviews logged.</div>'}</div>`;
    document.getElementById('mock-add').addEventListener('click', () => {
      state.mocks = state.mocks || [];
      state.mocks.unshift({
        id:'m'+Date.now(),
        date: document.getElementById('mock-date').value,
        score: parseInt(document.getElementById('mock-score').value, 10) || 0,
        conf: document.getElementById('mock-conf').value,
        weak: document.getElementById('mock-weak').value.trim(),
        revise: document.getElementById('mock-revise').value.trim(),
        missed: document.getElementById('mock-missed').value.trim()
      });
      saveState();
      renderMockLog();
    });
    root.querySelectorAll('button.del').forEach(b => {
      b.addEventListener('click', e => {
        state.mocks.splice(parseInt(e.target.dataset.i, 10), 1);
        saveState();
        renderMockLog();
      });
    });
  }

  // ---------- render: career conversion metrics ----------
  function renderConv(){
    const root = document.getElementById('conv-root');
    root.innerHTML = '';
    visibleWeeks().forEach(w => {
      const cd = state.conversion['w'+w.id] || defaultConversion();
      let fields = '';
      CONV_FIELDS.forEach(f => {
        fields += `<div class="log-field"><label>${f.l}</label><input type="number" min="0" step="1" value="${cd[f.k]||0}" data-week="${w.id}" data-k="${f.k}"></div>`;
      });
      fields += `<div class="log-field"><label>Rejection reasons / actions</label><input type="text" value="${esc(cd.note)}" data-week="${w.id}" data-k="note" class="note-input"></div>`;
      const row = document.createElement('div');
      row.className = 'log-week';
      row.innerHTML = `<div class="lw-label"><b>WEEK ${w.id}</b>${esc(w.title)}</div><div class="log-inputs">${fields}</div>`;
      root.appendChild(row);
    });
    root.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('change', e => {
        const wk = e.target.dataset.week, k = e.target.dataset.k;
        if(!state.conversion['w'+wk]) state.conversion['w'+wk] = defaultConversion();
        state.conversion['w'+wk][k] = (k === 'note') ? e.target.value : (parseInt(e.target.value, 10) || 0);
        saveState();
        renderConv();
        renderRates();
      });
    });
  }

  function convSums(){
    const totals = {}; CONV_FIELDS.forEach(f => totals[f.k] = 0);
    const byMonth = {};
    visibleWeeks().forEach(w => {
      const cd = state.conversion['w'+w.id] || defaultConversion();
      CONV_FIELDS.forEach(f => totals[f.k] += (cd[f.k]||0));
      if(!byMonth[w.month]) byMonth[w.month] = {apps:0, replies:0, tech:0, final:0, offers:0, hr:0, rejections:0, ats:0};
      byMonth[w.month].apps += (cd.apps||0);
      byMonth[w.month].replies += (cd.replies||0);
      byMonth[w.month].tech += (cd.tech||0);
      byMonth[w.month].final += (cd.final||0);
      byMonth[w.month].offers += (cd.offers||0);
      byMonth[w.month].hr += (cd.hr||0);
      byMonth[w.month].rejections += (cd.rejections||0);
      byMonth[w.month].ats += (cd.ats||0);
    });
    return {totals, byMonth};
  }

  function pct(a, b){ return b > 0 ? Math.round((a/b)*100) + '%' : '—'; }

  function renderRates(){
    const el = document.getElementById('rate-root');
    const {totals, byMonth} = convSums();
    const ints = (totals.tech||0) + (totals.final||0);
    const chips = [
      {n:pct(totals.replies, totals.apps), l:'Application → Response'},
      {n:pct(ints, totals.replies), l:'Response → Interview'},
      {n:pct(totals.offers, ints), l:'Interview → Offer'}
    ];
    let mr = '';
    Object.keys(byMonth).sort().forEach(m => {
      const d = byMonth[m];
      const mi = d.tech + d.final;
      mr += `<tr><td><b>Month ${m}</b></td><td>${d.apps}</td><td>${d.replies}</td><td>${d.hr}</td><td>${d.tech}</td><td>${d.final}</td><td>${d.offers}</td><td>${pct(d.replies,d.apps)}</td><td>${pct(mi,d.replies)}</td><td>${pct(d.offers,mi)}</td></tr>`;
    });
    el.innerHTML = `
      <div class="funnel">${chips.map(c => `<div class="fstat"><div class="n">${c.n}</div><div class="l">${c.l}</div></div>`).join('')}</div>
      <div style="margin-top:12px;overflow-x:auto"><table><thead><tr><th>Period</th><th>Apps</th><th>Replies</th><th>HR</th><th>Tech</th><th>Final</th><th>Offers</th><th>App→Resp</th><th>Resp→Int</th><th>Int→Offer</th></tr></thead><tbody>${mr}</tbody></table></div>
      <div class="conv-note">ATS rejections and rejection reasons live in the weekly log above (and in the Applications tab). Update them every week so ratios stay real.</div>`;
  }

  function renderSalary(){
    const el = document.getElementById('salary-root');
    el.innerHTML = SALARY.map(s => `<div class="salary-row"><span class="sal-label">${s.l}</span><b>${s.v}</b></div>`).join('')
      + '<div class="score-note">These are your own targets, not guarantees. They guide role selection, applications and negotiation. Negotiate from the role\'s scope and the market band — never from a past anchor.</div>';
  }

  function renderInterpret(){
    const el = document.getElementById('interpret-root');
    el.innerHTML = `<div class="callout"><div class="ctitle">READ THE MARKET, ADAPT THE PLAN</div>`
      + INTERPRET.map(r => `<p><b>${r.when}</b> → ${r.act}</p>`).join('')
      + `<p>Track ATS rejections, recruiter replies, technical outcomes and rejection reasons every week. Change resume, keyword targeting, preparation focus and channel mix only on this evidence.</p></div>`;
  }

  // ---------- tabs ----------
  function setupTabs(){
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
      });
    });
  }

  function setupMisc(){
    const dateInput = document.getElementById('start-date-input');
    if(state.startDate) dateInput.value = state.startDate;
    dateInput.addEventListener('change', e => {
      state.startDate = e.target.value;
      saveState();
      renderAll();
    });
    document.querySelectorAll('.plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.planLength = btn.dataset.plan;
        saveState();
        renderAll();
      });
    });
    document.getElementById('add-app-btn').addEventListener('click', addApplication);
    ['app-search','app-filter-status','app-filter-location','app-filter-from','app-filter-to'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => { populateLocationFilter(); renderApps(); });
      document.getElementById(id).addEventListener('change', () => { populateLocationFilter(); renderApps(); });
    });
    document.getElementById('app-filter-clear').addEventListener('click', () => {
      ['app-search','app-filter-status','app-filter-location','app-filter-from','app-filter-to'].forEach(id => {
        const el = document.getElementById(id);
        el.value = (id === 'app-filter-status' || id === 'app-filter-location') ? '' : '';
      });
      populateLocationFilter();
      renderApps();
    });
    document.getElementById('modal-cancel').addEventListener('click', closeDeleteModal);
    document.getElementById('modal-confirm').addEventListener('click', () => {
      if(pendingDelete){
        state.applications = state.applications.filter(x => x.id !== pendingDelete);
        saveState();
        renderApps();
        renderFunnel();
      }
      closeDeleteModal();
    });
    document.getElementById('delete-modal').addEventListener('click', e => {
      if(e.target.id === 'delete-modal') closeDeleteModal();
    });
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape') closeDeleteModal();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
      if(confirm('This clears all logged hours, checklist progress, checkpoints, applications, readiness, stories, mocks and conversion data. Continue?')){
        state = {startDate: state.startDate, planLength: state.planLength, checklist:{}, checkpoints:{}, hours:{}, counters:{}, applications:[]};
        WEEKS.forEach(w => {
          state.hours['w'+w.id] = defaultHours();
          state.counters['w'+w.id] = defaultCounters();
        });
        seedState();
        saveState();
        renderAll();
      }
    });
  }

  function renderAll(){
    updateHeader();
    renderDashboard();
    renderFunnel();
    renderCheckpoints();
    renderMarkets();
    renderRoadmap();
    renderLog();
    renderApps();
    renderReadiness();
    renderDsa();
    renderStories();
    renderMockLog();
    renderConv();
    renderRates();
    renderSalary();
    renderInterpret();
  }

  (async function init(){
    await loadState();
    setupTabs();
    setupMisc();
    renderAll();
  })();
})();