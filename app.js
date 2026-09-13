(function(){
  const STORAGE_KEY = 'career_tracker_v2';
  const CATS = ['backend','ai','cloud','dsa','project','applications'];
  const CAT_LABEL = {backend:'Backend', ai:'AI', cloud:'Cloud', dsa:'DSA', project:'Project', applications:'Apps'};
  const COUNTERS = ['apps','referrals','messages','mocks'];
  const COUNTER_LABEL = {apps:'Apps sent', referrals:'Referrals', messages:'Recruiter msgs', mocks:'Mock ints'};

  const MONTH_TITLE = {
    1:'Positioning + backend foundations',
    2:'Production backend depth',
    3:'Cloud + systems + AI start',
    4:'AI production layer + interview loop',
    5:'Interview conversion',
    6:'Close offers / recalibrate'
  };

  const WEEKS = [
    {id:1, month:1, title:'Positioning & TypeScript Depth', objective:"The problem is positioning, not JavaScript. Rewrite your identity as a backend engineer before touching code.",
      tasks:['Rewrite resume + LinkedIn around backend ownership; headline: Software Developer | Node.js | TypeScript | Backend APIs | PostgreSQL | AWS | AI Integrations','Advanced TypeScript: generics, narrowing, utility types, error modeling, clean interfaces','Write the two-sentence recruiter pitch plus the one proof project to attach','Calibration only: send 5 targeted applications even though you are "not ready"'],
      deliverable:'Backend-positioned resume/LinkedIn + TypeScript audit.', target:{backend:5, ai:1, cloud:0, dsa:2, project:2, applications:1}, quotas:{apps:5, referrals:0, messages:0, mocks:0}},
    {id:2, month:1, title:'Node Internals & Backend Foundations', objective:"Sound like an engineer who owns production — event loop, async, streams, memory.",
      tasks:['Node internals: event loop, async patterns, streams, worker threads at a conceptual level, memory/performance troubleshooting','Backend architecture: modular monolith first, service boundaries, retries, idempotency, eventual consistency, API security','Practice explaining lifecycle and error paths out loud for real projects','Keep the 5 targeted applications/week going'],
      deliverable:'Node-internals notes you can explain without notes.', target:{backend:5, ai:1, cloud:0, dsa:2, project:2, applications:1}, quotas:{apps:5, referrals:0, messages:0, mocks:0}},
    {id:3, month:1, title:'PostgreSQL Depth', objective:"SQL is a headline skill now — stop at \"I can write a query.\"",
      tasks:['PostgreSQL: joins, indexes, transactions/isolation, normalization, query plans, locking, practical optimization','Learn EXPLAIN and pagination (keyset vs offset) on a real dataset','Design a normalized schema with indexes as the Project 1 data plan','Keep recording which titles get recruiter responses'],
      deliverable:'A schema + index design document for Project 1.', target:{backend:5, ai:0, cloud:0, dsa:2, project:3, applications:1}, quotas:{apps:5, referrals:0, messages:0, mocks:0}},
    {id:4, month:1, title:'REST/Auth & Project 1 Design', objective:"Design Project 1 properly: a multi-tenant B2B SaaS, not another CRUD clone.",
      tasks:['Design Project 1: multi-tenancy, RBAC, audit logs, rate limiting, idempotent webhooks, S3 uploads, scheduled jobs, notifications','REST/auth: auth, validation, versioning, pagination, error contracts, observability','Write the architecture decision record before writing code','Keep 5 applications/week; classify responses by title'],
      deliverable:'Complete Project 1 architecture doc + working app skeleton.', target:{backend:4, ai:0, cloud:0, dsa:2, project:3, applications:2}, quotas:{apps:5, referrals:0, messages:0, mocks:0}},

    {id:5, month:2, title:'Redis & Caching', objective:"Caching, rate limiting, job state — Redis shows up in nearly every Node backend listing.",
      tasks:['Redis: caching, TTL, rate limiting, distributed locks conceptually, queue/job state','Add a Redis cache layer to a hot read path in Project 1','Caching strategies: write-through, invalidation, stampede protection','Start the layered Project 1 build (controller → service → repository)'],
      deliverable:'Project 1 running with a real Redis cache layer.', target:{backend:5, ai:1, cloud:1, dsa:2, project:3, applications:1}, quotas:{apps:12, referrals:0, messages:0, mocks:0}},
    {id:6, month:2, title:'Queues & Background Jobs', objective:"Background processing is the junior gap that screens for.",
      tasks:['Queues with BullMQ + Redis: retries, dead-letter queue, idempotency, scheduled/cron jobs','Build a queue feature in Project 1 (bulk import → worker → notify)','Idempotent webhook processing + rate limiting','10-15 targeted applications/week — fit over volume'],
      deliverable:'A real async pipeline in Project 1, not just request/response.', target:{backend:5, ai:1, cloud:1, dsa:2, project:3, applications:1}, quotas:{apps:12, referrals:0, messages:0, mocks:0}},
    {id:7, month:2, title:'Docker & Delivery', objective:"Ship it twice — once for you, once in CI.",
      tasks:['Docker: Dockerfile best practices, multi-stage builds, volumes, compose','GitHub Actions: test → build → deploy; secrets and environment management','Health checks + structured logging','Keep 10-15 applications/week'],
      deliverable:'Containerized Project 1 with an automated CI pipeline.', target:{backend:2, ai:1, cloud:5, dsa:2, project:3, applications:1}, quotas:{apps:12, referrals:0, messages:0, mocks:0}},
    {id:8, month:2, title:'Project 1 MVP + Jest', objective:"Finish the MVP and prove it with tests before Month 3.",
      tasks:['Complete Project 1 MVP: API docs, integration tests (Jest + Supertest), RBAC + audit logs','Test API boundaries and critical business workflows','Write load/performance notes + a short ADR','Send 10-15 targeted applications/week'],
      deliverable:'Deployed, tested Project 1 MVP with a resume proof line.', target:{backend:3, ai:1, cloud:3, dsa:2, project:4, applications:1}, quotas:{apps:12, referrals:0, messages:0, mocks:0}},

    {id:9, month:3, title:'AWS Core', objective:"Learn what each AWS service is for, then put Project 1 on real AWS.",
      tasks:['AWS core: ECS/ECR or EC2, RDS, S3, CloudWatch, IAM, SQS — know what each is for','Move Project 1 onto AWS: RDS, S3, ECS, IAM least privilege','Start 20-25 targeted applications/week','Begin UAE outreach in parallel'],
      deliverable:'Project 1 live on AWS with RDS + S3 + CloudWatch.', target:{backend:2, ai:1, cloud:6, dsa:3, project:2, applications:1}, quotas:{apps:22, referrals:0, messages:0, mocks:0}},
    {id:10, month:3, title:'Observability & System Design', objective:"Logs, metrics, traces — plus the design vocabulary to talk about scale.",
      tasks:['Observability: structured logs, metrics, basic tracing; CloudWatch alarms','System design: scaling, caching, load balancing; design a notification system on paper','Capacity/cost basics for your deployed services','20-25 applications/week'],
      deliverable:'Observable Project 1 + two defendable system designs.', target:{backend:3, ai:1, cloud:4, dsa:3, project:3, applications:1}, quotas:{apps:22, referrals:0, messages:0, mocks:0}},
    {id:11, month:3, title:'Project 2: AI Operations / Knowledge Assistant', objective:"AI where backend engineering is the hard part.",
      tasks:['Start Project 2: ingest → chunk → embed → store in pgvector','Retrieval with filters; streaming answers with citations','Backend concerns: tenant isolation, latency/token logging (TypeScript/Node service)','20-25 applications/week + UAE outreach'],
      deliverable:'Project 2 scaffold with ingestion + embeddings working.', target:{backend:2, ai:5, cloud:2, dsa:2, project:3, applications:1}, quotas:{apps:22, referrals:2, messages:0, mocks:0}},
    {id:12, month:3, title:'RAG Retrieval + Evaluation', objective:"Make retrieval good — filters, evals — and steer the search with response data.",
      tasks:['Retrieval quality: filtering, reranking basics, prompt design','Measure retrieval quality (hit rate/relevancy) with an eval set','Evaluate retrieval across tenants rather than raw crashes','Track recruiter responses by title and adjust the funnel'],
      deliverable:'Measured retrieval quality for Project 2.', target:{backend:2, ai:6, cloud:1, dsa:2, project:3, applications:1}, quotas:{apps:25, referrals:3, messages:0, mocks:0}},

    {id:13, month:4, title:'Tool Calling & Streaming', objective:"Beyond answering — make the AI act.",
      tasks:['Function/tool calling: define tools, guardrails, human-approval for risky actions','Streaming answers with citations','Cost/latency telemetry for AI calls','25 applications/week + referral conversations'],
      deliverable:'Project 2 agent endpoint with tool calling + telemetry.', target:{backend:2, ai:6, cloud:1, dsa:3, project:2, applications:1}, quotas:{apps:25, referrals:3, messages:0, mocks:2}},
    {id:14, month:4, title:'Finish Project 2 + Evals', objective:"Prove it: retrieval evaluation, access control, cost/latency telemetry.",
      tasks:['Complete Project 2: evals, per-tenant access control, cost/latency telemetry','Write the resume proof line and architecture notes','2 mock interviews this week','25 applications/week + referrals'],
      deliverable:'Finished, tested Project 2 with a resume proof line.', target:{backend:2, ai:4, cloud:1, dsa:2, project:5, applications:1}, quotas:{apps:25, referrals:5, messages:0, mocks:2}},
    {id:15, month:4, title:'Interview Loop I — Timed DSA + Design', objective:"Convert recruiter screens into coding-round passes.",
      tasks:['Timed DSA sets: arrays/strings, two pointers, sliding window, trees, graphs, heaps, recursion','Backend design drills: API/data-model/caching/queues/scaling fundamentals','2 mock interviews; log recurring weak spots','25 applications/week + 5 referrals'],
      deliverable:'A running DSA log + two more mock interviews.', target:{backend:1, ai:1, cloud:1, dsa:6, project:1, applications:5}, quotas:{apps:25, referrals:5, messages:0, mocks:2}},
    {id:16, month:4, title:'Interview Loop II — Salary Strategy', objective:"Negotiate against scope and the market band, not the 3 LPA anchor.",
      tasks:['Study core/stretch bands for India, UAE, Saudi and India-remote','Rehearse the negotiation script from the Guide out loud','Measure interview-to-application and offer-to-interview ratios','25 applications/week + referrals + 2 mocks'],
      deliverable:'Memorized negotiation script + measured funnel ratios.', target:{backend:1, ai:1, cloud:1, dsa:5, project:1, applications:6}, quotas:{apps:25, referrals:5, messages:0, mocks:2}},

    {id:17, month:5, title:'Timed DSA Mastery', objective:"Build speed without losing correctness.",
      tasks:['Continue timed DSA: binary search, heaps, backtracking, basic DP, intervals','Re-solve every mistake from prior mock interviews','Keep 25 applications/week, 5 referrals, 10 recruiter messages','Keep measuring response rates by title'],
      deliverable:'A 100-problem log with solved-mistakes tracked.', target:{backend:1, ai:1, cloud:1, dsa:7, project:1, applications:3}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},
    {id:18, month:5, title:'Project Deep-Dives + Design', objective:"Explain every decision in 20 minutes without cue cards.",
      tasks:['Rehearse Project 1 and 2 deep-dives: trade-offs, bugs, architecture, DB choices, performance fixes','Backend design practice: microservices, queues, idempotency, scaling databases','Record voice/video and critique your own delivery','Keep 25 applications/week + referrals/messages'],
      deliverable:'Two rehearsed, recorded project narratives.', target:{backend:2, ai:1, cloud:1, dsa:3, project:4, applications:2}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},
    {id:19, month:5, title:'Behavioral + STAR Answers', objective:"Ownership, conflict, failure, optimization, collaboration — STAR-clean.",
      tasks:['Write STAR answers for ownership, conflict, failure, optimization, collaboration','Finish interview stories for current production work (honest + measurable)','Sanity-check salary bands against the market data','No application slowdown'],
      deliverable:'A polished behavioral answer bank.', target:{backend:1, ai:1, cloud:1, dsa:3, project:2, applications:5}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},
    {id:20, month:5, title:'Aggressive Targeting — Product/GCC + Gulf', objective:"Prioritize product companies, GCCs, strong consultancies, fintech/SaaS, engineering-heavy startups.",
      tasks:['Aggressively target product/GCC and Gulf roles with a two-sentence pitch + one proof project','UAE: apply only to 1-3 year roles with sponsorship; Saudi selectively','10 recruiter/hiring-manager messages/week','Keep 25 applications/week + 5 referrals'],
      deliverable:'A Gulf channel running in parallel, not a single funnel.', target:{backend:1, ai:1, cloud:1, dsa:2, project:1, applications:7}, quotas:{apps:25, referrals:5, messages:10, mocks:2}},

    {id:21, month:6, title:'Response-Channel Focus', objective:"Double down on channels that actually respond.",
      tasks:['Double down on highest-response channels; pause low-fidelity ones','Compare India vs UAE vs remote packages from real data','Keep interview practice + application flow','Log reasons for rejection when known'],
      deliverable:'A channel-efficiency ranking you act on weekly.', target:{backend:0, ai:0, cloud:0, dsa:2, project:1, applications:7}, quotas:{apps:25, referrals:5, messages:10, mocks:0}},
    {id:22, month:6, title:'Negotiation', objective:"Negotiate from data, not hope.",
      tasks:['Negotiate on scope, skills, evidence and market level — never fabricate compensation','Handle \"current salary\" questions with the Guide script','Onboarding/notice planning for likely start windows','Keep 20-25 applications/week'],
      deliverable:'A live negotiation run from the script.', target:{backend:0, ai:0, cloud:0, dsa:2, project:1, applications:7}, quotas:{apps:20, referrals:5, messages:10, mocks:0}},
    {id:23, month:6, title:'Interview Practice While Onboarding', objective:"Keep improving even after a yes.",
      tasks:['1-2 DSA problems/day so you do not go rusty','Practice while onboarding or in the notice period','Evaluate any new offer against role scope + growth','Keep 20 applications/week'],
      deliverable:'Sharp practice maintained through the transition.', target:{backend:1, ai:1, cloud:0, dsa:2, project:1, applications:5}, quotas:{apps:20, referrals:5, messages:0, mocks:1}},
    {id:24, month:6, title:'Close / Recalibrate', objective:"Decide deliberately; recalibrate if no offer.",
      tasks:['Set walk-away criteria before any live negotiation','Compare packages: India vs UAE vs remote; pick by scope + growth','If no offer yet, raise/narrow salary bands from response data and extend the plan','Finish negotiation and onboarding/notice planning'],
      deliverable:'A deliberately evaluated decision or a recalibrated plan.', target:{backend:1, ai:1, cloud:0, dsa:1, project:1, applications:6}, quotas:{apps:20, referrals:5, messages:0, mocks:0}},
  ];

  const CHECKPOINTS = [
    {id:'c1', day:30, capability:'25 DSA problems, PostgreSQL fundamentals, Node internals, backend-focused resume, Project 1 architecture, LinkedIn positioned for backend roles.', search:'At least 5 targeted applications/week; begin recording response rates.'},
    {id:'c2', day:60, capability:'Project 1 deployed with tests, Redis/queues, Docker and CI; AWS fundamentals; 50 DSA problems.', search:'10-20 applications/week; first recruiter screens should begin if positioning is working.'},
    {id:'c3', day:90, capability:'Project 2 in progress, system-design basics, 75 DSA problems, strong project narratives.', search:'20-25/week + referrals; begin UAE and remote applications aggressively.'},
    {id:'c4', day:120, capability:'Two strong projects, ~100 DSA problems, interview-loop readiness, AWS + AI integration confidence.', search:'Measure interview-to-application and offer-to-interview ratios; raise or narrow salary bands from response data.'},
  ];

  const MARKETS = [
    {name:'India — Bengaluru / Hyderabad / Pune / Chennai / NCR', priority:'Primary funnel', core:'₹10-15 LPA', stretch:'₹14-18 LPA', check:'Target product/GCC/startup/strong consulting. ₹12 LPA is realistic enough to pursue but must be earned through evidence.'},
    {name:'UAE — Dubai / Abu Dhabi', priority:'Parallel high-value funnel', core:'AED 12k-15k/month', stretch:'AED 15k-18k+', check:'A current 1-3y Node/TS posting offers AED 12-15k + full visa sponsorship. Quality-target band, not a guaranteed median.'},
    {name:'Saudi Arabia — Riyadh', priority:'Selective parallel funnel', core:'SAR 10k-16k/month', stretch:'SAR 16k-20k+', check:'Many listings skew 3-8+ years; foreign-worker authorization is employer-linked; degree documentation can matter.'},
    {name:'International remote from India', priority:'Selective upside funnel', core:'₹15-25 LPA equivalent', stretch:'₹25-35+ LPA equivalent', check:'Only where "India Remote" / India employment is explicit. Stronger competition, more demanding written interviews.'},
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

    // cumulative
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
    el.innerHTML = `<table><thead><tr><th>Market</th><th>Priority</th><th>Core target</th><th>Stretch</th><th>Reality check</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  // ---------- render: roadmap / weekly plan ----------
  function renderRoadmap(){
    const root = document.getElementById('plan-root');
    root.innerHTML = '';
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
        w.tasks.forEach((t,i) => {
          const key = 'w'+w.id+'_t'+i;
          const done = !!state.checklist[key];
          tasksHtml += `<div class="task-row ${done?'done':''}"><input type="checkbox" data-key="${key}" ${done?'checked':''}><label>${t}</label></div>`;
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
      updateHeader();
      renderDashboard();
      renderRoadmap();
      renderLog();
      renderCheckpoints();
    });
    document.querySelectorAll('.plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.planLength = btn.dataset.plan;
        saveState();
        updateHeader();
        renderDashboard();
        renderRoadmap();
        renderLog();
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
      if(confirm('This clears all logged hours, checklist progress, checkpoints, and applications. Continue?')){
        state = {startDate: state.startDate, planLength: state.planLength, checklist:{}, checkpoints:{}, hours:{}, counters:{}, applications:[]};
        WEEKS.forEach(w => {
          state.hours['w'+w.id] = defaultHours();
          state.counters['w'+w.id] = defaultCounters();
        });
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
  }

  (async function init(){
    await loadState();
    setupTabs();
    setupMisc();
    renderAll();
  })();
})();