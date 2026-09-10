(function(){
  const STORAGE_KEY = 'career_tracker_v1';
  const CATS = ['backend','ai','cloud','dsa','project','applications'];
  const CAT_LABEL = {backend:'Backend', ai:'AI', cloud:'Cloud', dsa:'DSA', project:'Project', applications:'Apps'};

  const WEEKS = [
    {id:1, month:1, title:'Audit & Production Kickoff', objective:"Skip re-learning what you already use daily on the job — find the real gaps, then start the flagship-adjacent project immediately instead of a pure theory week.",
      tasks:['Self-rate 1-5 on: event loop, async/await, TS generics, error handling — spend study time only where you scored ≤3','Scaffold a new backend project with layered architecture (controller → service → repository)','Add JWT auth, input validation, structured error handling','Add request logging and environment config'],
      deliverable:'A cleanly structured, running API skeleton.', target:{backend:9, ai:4, cloud:0, dsa:3, project:6, applications:0}},
    {id:2, month:1, title:'Data Layer', objective:'Move past "I can write a query" into schema and performance decisions that show up in interviews.',
      tasks:['Learn Postgres indexes, transactions, and query plans (EXPLAIN)','Add Postgres to your project with a properly normalized schema','Add a Redis caching layer for a hot read path','Find and fix 3 slow queries in your own project'],
      deliverable:'Project now has a real relational data layer plus caching.', target:{backend:8, ai:5, cloud:0, dsa:3, project:6, applications:0}},
    {id:3, month:1, title:'LLM API Foundations', objective:'This is the differentiator — start it in month 1, not month 3, since 4 months is tight.',
      tasks:['Call an LLM API (Anthropic/OpenAI) with function/tool calling and streaming','Get structured JSON output reliably, not just free text','Build one real AI endpoint inside your project','Handle API errors, timeouts, and retries gracefully'],
      deliverable:'Your backend project has one working AI-powered endpoint.', target:{backend:6, ai:7, cloud:0, dsa:3, project:6, applications:0}},
    {id:4, month:1, title:'RAG Basics', objective:'The single most-requested "add AI to our product" skill.',
      tasks:['Learn embeddings and vector similarity search','Stand up a vector store (pgvector is fine — reuses your Postgres work)','Chunk a real set of documents (your own notes, or public docs)','Build an "ask questions over documents" endpoint'],
      deliverable:'A working RAG feature: upload docs, ask questions, get grounded answers.', target:{backend:5, ai:8, cloud:0, dsa:3, project:6, applications:0}},

    {id:5, month:2, title:'System Design I', objective:'Start thinking in trade-offs, not just implementations.',
      tasks:['Learn scalability, caching strategies, and load balancing basics','Design (on paper) a URL shortener and a notification system','Apply one real caching pattern to your project','Explain out loud, unscripted, why you made each choice'],
      deliverable:'Two hand-drawn system designs you can defend in an interview.', target:{backend:6, ai:6, cloud:1, dsa:3, project:6, applications:0}},
    {id:6, month:2, title:'Async Systems', objective:'Background processing is where junior devs usually have a visible gap.',
      tasks:['Learn message queues and background workers (BullMQ + Redis)','Build a queue-based feature (e.g. bulk import → worker → notify)','Add retry logic and a dead-letter queue','Add a scheduled job (cron-style) somewhere in your project'],
      deliverable:'Project has a real async pipeline, not just request/response.', target:{backend:6, ai:6, cloud:1, dsa:3, project:6, applications:0}},
    {id:7, month:2, title:'Agents & Tool-Calling', objective:'Extend your RAG endpoint into something that takes multi-step action, not just answers questions.',
      tasks:['Learn agent architecture: tool calling, multi-step reasoning loops','Add a guardrail or human-approval step before any risky action','Give the agent basic memory across a conversation','Extend your project\'s AI endpoint with at least one callable tool'],
      deliverable:'An agent that can call a tool and act on the result, with a safety check.', target:{backend:4, ai:8, cloud:2, dsa:3, project:6, applications:0}},
    {id:8, month:2, title:'Testing & Evaluation', objective:'This is where your Terminal-Bench experience directly pays off — lean into it.',
      tasks:['Write unit + integration tests (Jest/Vitest + Supertest) for your project','Build an eval set for your AI feature that catches confidently-wrong answers, not just crashes','Document 3 failure modes you found and how you\'d guard against them','Write up what building AI benchmark tasks taught you about this'],
      deliverable:'A real eval suite + a short writeup you can put in a portfolio.', target:{backend:3, ai:6, cloud:2, dsa:3, project:8, applications:0}},

    {id:9, month:3, title:'Containers & Cloud', objective:'Ship it somewhere real.',
      tasks:['Learn Docker: Dockerfile, images, volumes, Compose','Deploy your project to Cloud Run (builds on your GCAF26 work)','Wire up Cloud SQL and basic IAM','Set up basic logging/monitoring for the deployed app'],
      deliverable:'Your project is live on a real URL, not just localhost.', target:{backend:2, ai:4, cloud:8, dsa:3, project:5, applications:0}},
    {id:10, month:3, title:'CI/CD & Hardening', objective:'Start light applications this week — don\'t wait for "ready."',
      tasks:['Set up a GitHub Actions pipeline: test → build → deploy','Manage secrets and environment variables properly','Add health checks and structured logging','Send 2-3 applications to roles you\'re genuinely interested in, just to calibrate'],
      deliverable:'Automated deploys, plus your first real market feedback.', target:{backend:2, ai:3, cloud:8, dsa:3, project:5, applications:1}},
    {id:11, month:3, title:'Flagship Project Push I', objective:'Combine everything into one project you can talk about for 20 minutes straight.',
      tasks:['Pick your flagship project (a trading-strategy platform tying into your ORB/intraday work is a strong choice if it fits — adjust if you have something else in mind)','Integrate backend + AI feature + cloud deployment into one cohesive system','Write an architecture doc / README explaining every decision','Identify the 2-3 hardest technical problems you solved and rehearse explaining them'],
      deliverable:'Flagship project architecture is locked and mostly built.', target:{backend:2, ai:3, cloud:3, dsa:3, project:9, applications:2}},
    {id:12, month:3, title:'Flagship Project Push II', objective:'Finish it. Don\'t start a second project.',
      tasks:['Add auth, background jobs, and tests to the flagship project','Deploy it live and verify it actually works end to end','Record a 2-3 minute demo video walking through it','Keep sending a handful of applications in parallel'],
      deliverable:'A finished, deployed, demoable flagship project.', target:{backend:2, ai:2, cloud:3, dsa:3, project:9, applications:3}},

    {id:13, month:4, title:'DSA + Interview Prep I', objective:'60-100 well-chosen problems beats 500 random ones.',
      tasks:['1-2 DSA problems/day: arrays, strings, hashmaps, trees, graphs, sliding window','Practice explaining JS fundamentals out loud (event loop, closures, this)','Practice explaining Node fundamentals out loud (streams, clustering, middleware)','Start scheduling 1-2 mock interviews'],
      deliverable:'A running problem log and at least one completed mock interview.', target:{backend:1, ai:1, cloud:1, dsa:8, project:3, applications:8}},
    {id:14, month:4, title:'Resume, Portfolio & Mocks', objective:'Package everything you\'ve built into something a recruiter understands in 30 seconds.',
      tasks:['Finalize resume headline and bullet points around the flagship project','Update LinkedIn and a simple portfolio page linking the project + your eval writeup','Do 2+ more mock interviews and note recurring weak spots','Keep applications flowing daily'],
      deliverable:'A resume and portfolio you\'re proud to send.', target:{backend:1, ai:1, cloud:1, dsa:7, project:2, applications:10}},
    {id:15, month:4, title:'Full Job Hunt I', objective:'Volume with intent, not spray-and-pray.',
      tasks:['10-15 targeted applications/day to roles that actually fit your profile','Follow up on every application from weeks 9-12','Keep interviewing wherever you get traction','Keep 1-2 DSA problems/day going so you don\'t go rusty'],
      deliverable:'A full, active pipeline of applications and interviews.', target:{backend:0, ai:0, cloud:0, dsa:6, project:1, applications:15}},
    {id:16, month:4, title:'Full Job Hunt II', objective:'Close it out — and negotiate from data, not hope.',
      tasks:['Keep applications and interviews going daily','Use the real market data (₹6-9L realistic, ₹10-12L stretch) as your negotiation anchor, not a fixed target','Compare any offer against role scope and growth, not just the number','Decide your walk-away criteria before you\'re in a live negotiation'],
      deliverable:'An offer you evaluated deliberately, not one you grabbed out of relief.', target:{backend:0, ai:0, cloud:0, dsa:5, project:1, applications:16}},
  ];

  const MILESTONES = [
    {id:'m1', month:1, text:'I can build a clean, production-structured Node.js API with a real data layer.'},
    {id:'m2', month:2, text:'I can design backend systems, add async processing, and evaluate whether my AI feature is actually correct — not just whether it runs.'},
    {id:'m3', month:3, text:'I can containerize, deploy, and monitor an AI-integrated app on the cloud, and I have one flagship project live.'},
    {id:'m4', month:4, text:'I can walk into an interview, explain every decision in my flagship project, solve DSA under time pressure, and negotiate from data.'},
  ];

  let state = {
    startDate: null,
    checklist: {},
    milestones: {},
    hours: {},
    applications: []
  };

  function defaultHours(){
    const h = {}; CATS.forEach(c => h[c] = 0); return h;
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
    WEEKS.forEach(w => { if(!state.hours['w'+w.id]) state.hours['w'+w.id] = defaultHours(); });
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

  function currentWeekIndex(){
    if(!state.startDate) return 0;
    const start = new Date(state.startDate);
    const now = new Date();
    const elapsed = daysBetween(start, now);
    if(elapsed < 0) return 0;
    return Math.min(15, Math.floor(elapsed/7));
  }

  function updateHeader(){
    const daysLeftEl = document.getElementById('days-left');
    const weekIndEl = document.getElementById('week-indicator');
    const progEl = document.getElementById('overall-progress');
    if(!state.startDate){
      daysLeftEl.textContent = '—';
      weekIndEl.textContent = 'Set a start date to begin the countdown.';
      progEl.style.width = '0%';
      return;
    }
    const start = new Date(state.startDate);
    const now = new Date();
    const elapsed = daysBetween(start, now);
    const left = 120 - elapsed;
    daysLeftEl.textContent = left >= 0 ? left : 0;
    const wk = currentWeekIndex()+1;
    weekIndEl.textContent = elapsed < 0 ? 'Starts in ' + (-elapsed) + ' day(s).' : ('Week ' + wk + ' of 16');
    const pct = Math.max(0, Math.min(100, (elapsed/120)*100));
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
    for(let i=0;i<WEEKS.length;i++){
      const s = weekScore(WEEKS[i]);
      const logged = state.hours['w'+WEEKS[i].id];
      const hasLog = logged && CATS.some(c => (logged[c]||0) > 0);
      if(!hasLog) break;
      if(s >= 75){ streak++; } else { break; }
    }
    return streak;
  }

  // ---------- render: dashboard ----------
  function renderDashboard(){
    const wkIdx = currentWeekIndex();
    const wk = WEEKS[wkIdx];
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

    // milestones
    const msEl = document.getElementById('milestones');
    msEl.innerHTML = '';
    MILESTONES.forEach(m => {
      const done = !!state.milestones[m.id];
      msEl.innerHTML += `<div class="milestone-row ${done?'done':''}"><input type="checkbox" data-mid="${m.id}" ${done?'checked':''}><span>Month ${m.month}: "${m.text}"</span></div>`;
    });
    msEl.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', e => {
        state.milestones[e.target.dataset.mid] = e.target.checked;
        saveState();
        renderDashboard();
      });
    });
  }

  // ---------- render: roadmap ----------
  function renderRoadmap(){
    const root = document.getElementById('roadmap-root');
    root.innerHTML = '';
    for(let m=1;m<=4;m++){
      const weeksInMonth = WEEKS.filter(w => w.month === m);
      const details = document.createElement('details');
      details.className = 'month';
      if(m === currentWeekIndex()+1 || (m===1 && !state.startDate)) details.open = true;
      const doneTasks = weeksInMonth.reduce((acc,w) => acc + w.tasks.filter((_,i) => state.checklist['w'+w.id+'_t'+i]).length, 0);
      const totalTasks = weeksInMonth.reduce((acc,w) => acc + w.tasks.length, 0);
      details.innerHTML = `<summary><span class="m-title">MONTH ${m}</span><span class="m-sub">${doneTasks}/${totalTasks} tasks done</span></summary><div class="month-body" id="month-body-${m}"></div>`;
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
        card.innerHTML = `
          <div class="wk-head"><span class="wk-num">WEEK ${w.id}</span><span class="wk-title">${w.title}</span></div>
          <div class="wk-obj">${w.objective}</div>
          ${tasksHtml}
          <div class="deliverable">Build: ${w.deliverable}</div>
          <div class="target-hours">Target hours — Backend ${th.backend}h · AI ${th.ai}h · Cloud ${th.cloud}h · DSA ${th.dsa}h · Project ${th.project}h · Apps ${th.applications}h</div>
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

  // ---------- render: weekly log ----------
  function renderLog(){
    const root = document.getElementById('log-root');
    root.innerHTML = '';
    WEEKS.forEach(w => {
      const logged = state.hours['w'+w.id] || defaultHours();
      const score = weekScore(w);
      const row = document.createElement('div');
      row.className = 'log-week';
      let fields = '';
      CATS.forEach(c => {
        fields += `<div class="log-field"><label>${CAT_LABEL[c]}</label><input type="number" min="0" step="0.5" value="${logged[c]||0}" data-week="${w.id}" data-cat="${c}"></div>`;
      });
      row.innerHTML = `<div class="lw-label"><b>WEEK ${w.id}</b>${w.title}</div><div class="log-inputs">${fields}</div><div class="log-score">${score}</div>`;
      root.appendChild(row);
    });
    root.querySelectorAll('input[type=number]').forEach(inp => {
      inp.addEventListener('change', e => {
        const wk = e.target.dataset.week, cat = e.target.dataset.cat;
        if(!state.hours['w'+wk]) state.hours['w'+wk] = defaultHours();
        state.hours['w'+wk][cat] = parseFloat(e.target.value) || 0;
        saveState();
        renderLog();
        renderDashboard();
      });
    });
  }

  // ---------- render: applications ----------
  function renderApps(){
    const root = document.getElementById('apps-root');
    if(!state.applications || state.applications.length === 0){
      root.innerHTML = '<div class="empty">No applications logged yet — add your first one above.</div>';
      return;
    }
    const sorted = [...state.applications].sort((a,b) => (b.dateApplied||'').localeCompare(a.dateApplied||''));
    let rows = '';
    sorted.forEach(a => {
      rows += `<tr>
        <td>${a.company}</td>
        <td>${a.role}</td>
        <td>${a.dateApplied||''}</td>
        <td><select class="status" data-id="${a.id}">
          ${['Applied','Screening','Interview','Offer','Rejected','Ghosted'].map(s => `<option ${a.status===s?'selected':''}>${s}</option>`).join('')}
        </select></td>
        <td>${a.followUp||'—'}</td>
        <td><button class="del" data-id="${a.id}">remove</button></td>
      </tr>`;
    });
    root.innerHTML = `<table><thead><tr><th>Company</th><th>Role</th><th>Applied</th><th>Status</th><th>Follow-up</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
    root.querySelectorAll('select.status').forEach(sel => {
      sel.addEventListener('change', e => {
        const item = state.applications.find(x => x.id === e.target.dataset.id);
        if(item){ item.status = e.target.value; saveState(); }
      });
    });
    root.querySelectorAll('.del').forEach(btn => {
      btn.addEventListener('click', e => {
        state.applications = state.applications.filter(x => x.id !== e.target.dataset.id);
        saveState();
        renderApps();
      });
    });
  }

  function addApplication(){
    const company = document.getElementById('app-company').value.trim();
    const role = document.getElementById('app-role').value.trim();
    const date = document.getElementById('app-date').value;
    const status = document.getElementById('app-status').value;
    const followup = document.getElementById('app-followup').value;
    if(!company){ return; }
    state.applications = state.applications || [];
    state.applications.push({id: 'a'+Date.now(), company, role, dateApplied: date, status, followUp: followup, notes:''});
    document.getElementById('app-company').value = '';
    document.getElementById('app-role').value = '';
    document.getElementById('app-date').value = '';
    document.getElementById('app-followup').value = '';
    saveState();
    renderApps();
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
      renderRoadmap();
    });
    document.getElementById('add-app-btn').addEventListener('click', addApplication);
    document.getElementById('reset-btn').addEventListener('click', () => {
      if(confirm('This clears all logged hours, checklist progress, and applications. Continue?')){
        state = {startDate: state.startDate, checklist:{}, milestones:{}, hours:{}, applications:[]};
        WEEKS.forEach(w => state.hours['w'+w.id] = defaultHours());
        saveState();
        renderAll();
      }
    });
  }

  function renderAll(){
    updateHeader();
    renderDashboard();
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