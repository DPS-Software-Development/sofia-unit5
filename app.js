// Sofia's English Adventure - Unit 5
// Con tracking errori, adaptive review, ripassa errori, report dashboard, audio TTS
// Multi-utente: ogni nome ha le sue stats/stelle isolate (localStorage namespaceato)

const app = document.getElementById('app');
const APP_VERSION = 'v21';

// ===== Multi-user =====
function sanitizeName(s) {
  return String(s || '').trim().replace(/\s+/g, ' ').slice(0, 24);
}
function getCurrentUser() {
  return sanitizeName(localStorage.getItem('sofia_u5_current_user') || '');
}
function setCurrentUser(name) {
  const clean = sanitizeName(name);
  if (!clean) return false;
  localStorage.setItem('sofia_u5_current_user', clean);
  const list = getUserList();
  if (!list.includes(clean)) {
    list.push(clean);
    localStorage.setItem('sofia_u5_users', JSON.stringify(list));
  }
  return true;
}
function getUserList() {
  try {
    const raw = localStorage.getItem('sofia_u5_users');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(sanitizeName).filter(Boolean) : [];
  } catch { return []; }
}
function userSlug(name) {
  return encodeURIComponent(sanitizeName(name)).replace(/%/g, '_');
}
function statsKey() {
  const u = getCurrentUser();
  return u ? `sofia_u5_stats__${userSlug(u)}` : 'sofia_u5_stats';
}
function starsKey() {
  const u = getCurrentUser();
  return u ? `sofia_u5_stars__${userSlug(u)}` : 'sofia_u5_stars';
}

// ===== State =====
function loadStats() {
  try {
    const raw = localStorage.getItem(statsKey());
    if (!raw) return { attempts: [], v: 5 };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.attempts)) return { attempts: [], v: 5 };
    // Bump v:3 → v:4 invalida vecchie attempts: indici QUIZ/FILL_GAP cambiati post fact-check rigoroso v8
    // Bump v:4 → v:5 invalida vecchie attempts: pool quiz/fill rifatto da zero + nuovi tipi tf/seq
    if (parsed.v !== 5) return { attempts: [], v: 5 };
    return parsed;
  } catch {
    return { attempts: [], v: 5 };
  }
}

let _pendingTimeout = null;
function scheduleNext(fn, ms) {
  if (_pendingTimeout) clearTimeout(_pendingTimeout);
  _pendingTimeout = setTimeout(() => { _pendingTimeout = null; fn(); }, ms);
}
function cancelPending() {
  if (_pendingTimeout) { clearTimeout(_pendingTimeout); _pendingTimeout = null; }
}

const state = {
  userName: getCurrentUser(),
  stars: parseInt(localStorage.getItem(starsKey()) || '0', 10),
  stats: loadStats(),
  funFact: FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)],
};

function reloadUserState() {
  state.userName = getCurrentUser();
  state.stars = parseInt(localStorage.getItem(starsKey()) || '0', 10);
  state.stats = loadStats();
}

function saveStars(delta) {
  state.stars += delta;
  localStorage.setItem(starsKey(), String(state.stars));
}

function saveStats() {
  if (state.stats.attempts.length > 500) state.stats.attempts = state.stats.attempts.slice(-500);
  localStorage.setItem(statsKey(), JSON.stringify(state.stats));
}

function logAttempt(type, id, topic, correct) {
  state.stats.attempts.push({ type, id, topic, correct, ts: Date.now() });
  saveStats();
}

function resetStats() {
  state.stats = { attempts: [], v: 5 };
  saveStats();
}

// ===== Stats helpers =====
function getTopicStats() {
  const out = {};
  TOPIC_KEYS.forEach(t => { out[t] = { total: 0, correct: 0, pct: 0 }; });
  state.stats.attempts.forEach(a => {
    if (!out[a.topic]) out[a.topic] = { total: 0, correct: 0, pct: 0 };
    out[a.topic].total++;
    if (a.correct) out[a.topic].correct++;
  });
  Object.keys(out).forEach(t => {
    out[t].pct = out[t].total ? Math.round(out[t].correct * 100 / out[t].total) : null;
  });
  return out;
}

function getWeakTopics(minAttempts = 3, threshold = 70) {
  const stats = getTopicStats();
  return Object.keys(stats).filter(t => stats[t].total >= minAttempts && stats[t].pct !== null && stats[t].pct < threshold);
}

function getItemHistory(type, id) {
  return state.stats.attempts.filter(a => a.type === type && a.id === id).map(a => a.correct);
}

function isErrorItem(type, id) {
  // "Errore pendente": l'ultima risposta è stata sbagliata E non l'ha azzeccata 2 volte di fila dopo
  const hist = getItemHistory(type, id);
  if (hist.length === 0) return false;
  // Trova ultima risposta sbagliata
  const lastWrongIdx = hist.lastIndexOf(false);
  if (lastWrongIdx === -1) return false;
  // Dopo l'ultimo sbaglio, contiamo i giusti consecutivi
  const after = hist.slice(lastWrongIdx + 1);
  return after.length < 2 || !after.slice(0, 2).every(Boolean);
}

function isMasteredItem(type, id) {
  // Almeno 2 risposte giuste consecutive in coda, e ultima è giusta
  const hist = getItemHistory(type, id);
  if (hist.length < 2) return false;
  return hist[hist.length - 1] && hist[hist.length - 2];
}

function getErrorItems() {
  return {
    quiz: QUIZ.map((q, i) => ({ ...q, _idx: i })).filter(q => isErrorItem('quiz', q._idx)),
    fill: FILL_GAP.map((f, i) => ({ ...f, _idx: i })).filter(f => isErrorItem('fill', f._idx)),
    tf: (typeof TRUE_FALSE !== 'undefined' ? TRUE_FALSE : []).map((t, i) => ({ ...t, _idx: i })).filter(t => isErrorItem('tf', t._idx)),
    seq: (typeof SEQUENCE !== 'undefined' ? SEQUENCE : []).map((s, i) => ({ ...s, _idx: i })).filter(s => isErrorItem('seq', s._idx))
  };
}

function adaptivePick(items, count, topicKey = 'tag') {
  // 60% dai topic deboli, 40% random. Se non ci sono topic deboli, tutto random.
  // Preserva _idx esistente se già presente (es. items che arrivano da getErrorItems).
  const tagged = items.map((item, idx) => ({ ...item, _idx: item._idx ?? idx }));
  const weak = getWeakTopics();
  if (weak.length === 0 || tagged.length <= count) {
    return shuffle(tagged).slice(0, count);
  }
  const weakOnes = tagged.filter(t => weak.includes(t[topicKey]));
  const others = tagged.filter(t => !weak.includes(t[topicKey]));
  const nWeak = Math.min(weakOnes.length, Math.ceil(count * 0.6));
  const nOther = Math.min(others.length, count - nWeak);
  const picked = [...shuffle(weakOnes).slice(0, nWeak), ...shuffle(others).slice(0, nOther)];
  // Se per qualche motivo è corto, riempi
  while (picked.length < count) {
    const rest = tagged.filter(t => !picked.some(p => p._idx === t._idx));
    if (rest.length === 0) break;
    picked.push(rest[Math.floor(Math.random() * rest.length)]);
  }
  return shuffle(picked);
}

// ===== Helpers =====
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = 0.9;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
}

function toast(msg, ms = 1500) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
}

function escape(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// ===== Screen: Welcome (multi-user) =====
function renderWelcome() {
  cancelPending();
  const others = getUserList().filter(n => n !== getCurrentUser());
  const recentChips = others.length > 0
    ? `<div class="welcome-recent">
        <div class="welcome-recent-label">Sei già stato qui?</div>
        <div class="welcome-recent-list">
          ${others.map(n => `<button class="user-chip" data-name="${escape(n)}">👤 ${escape(n)}</button>`).join('')}
        </div>
      </div>`
    : '';

  app.innerHTML = `
    <div class="welcome">
      <div class="welcome-emoji">🇬🇧</div>
      <h1>English Adventure</h1>
      <p class="welcome-sub">Unit 5 — Bath, here we come!</p>
      <div class="welcome-card">
        <label for="userInput" class="welcome-label">Come ti chiami?</label>
        <input id="userInput" type="text" inputmode="text" autocomplete="off" autocapitalize="words"
               maxlength="24" placeholder="Scrivi il tuo nome" />
        <button class="welcome-go" id="welcomeGo">Inizia ▶</button>
        ${recentChips}
      </div>
      <div class="welcome-foot">I tuoi progressi (stelle, errori, statistiche) restano <strong>solo per te</strong> su questo dispositivo.</div>
      <div class="app-version">${escape(APP_VERSION)}</div>
    </div>
  `;

  const input = document.getElementById('userInput');
  const go = document.getElementById('welcomeGo');
  const submit = () => {
    const name = input.value;
    if (!sanitizeName(name)) { input.focus(); toast('Scrivi un nome 😊'); return; }
    setCurrentUser(name);
    reloadUserState();
    renderHome();
  };
  go.onclick = submit;
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  document.querySelectorAll('.user-chip').forEach(b => {
    b.onclick = () => {
      setCurrentUser(b.dataset.name);
      reloadUserState();
      renderHome();
    };
  });
  setTimeout(() => input.focus(), 50);
}

function switchUser() {
  cancelPending();
  // Mantieni l'utente corrente in lista, ma forza la welcome screen
  localStorage.removeItem('sofia_u5_current_user');
  reloadUserState();
  renderWelcome();
}

// ===== Screen: Home =====
function renderHome() {
  cancelPending();
  if (!getCurrentUser()) { renderWelcome(); return; }
  const errors = getErrorItems();
  const totErrors = errors.quiz.length + errors.fill.length + errors.tf.length + errors.seq.length;
  const totAttempts = state.stats.attempts.length;
  const name = state.userName;

  app.innerHTML = `
    <div class="hero">
      <div class="user-row">
        <div class="user-greet">Hi <strong>${escape(name)}</strong>! 👋</div>
        <button class="user-switch" id="userSwitch" aria-label="Cambia utente">👤 Cambia</button>
      </div>
      <p>Unit 5 — Bath, here we come!</p>
      <div class="stars">⭐ ${state.stars} stelle · 📝 ${totAttempts} risposte</div>
    </div>
    <div class="tile-grid six">
      <div class="tile flashcards" data-go="flashcards">
        <div class="emoji">🎴</div>
        <div class="label">Flashcards</div>
        <div class="desc">impara i vocaboli</div>
      </div>
      <div class="tile quiz" data-go="quiz">
        <div class="emoji">❓</div>
        <div class="label">Quiz</div>
        <div class="desc">10 domande adaptive</div>
      </div>
      <div class="tile fill" data-go="fillgap">
        <div class="emoji">✍️</div>
        <div class="label">Fill the gap</div>
        <div class="desc">completa la frase</div>
      </div>
      <div class="tile tf" data-go="truefalse">
        <div class="emoji">✅❌</div>
        <div class="label">Vero/Falso</div>
        <div class="desc">10 affermazioni</div>
      </div>
      <div class="tile seq" data-go="sequence">
        <div class="emoji">🔢</div>
        <div class="label">Riordina</div>
        <div class="desc">metti in ordine</div>
      </div>
      <div class="tile matching" data-go="matching">
        <div class="emoji">🧩</div>
        <div class="label">Matching</div>
        <div class="desc">abbina le coppie</div>
      </div>
      <div class="tile errors" data-go="ripasso">
        <div class="emoji">🔁</div>
        <div class="label">Ripassa errori</div>
        <div class="desc">${totErrors > 0 ? `${totErrors} da rifare` : 'nessun errore!'}</div>
      </div>
      <div class="tile report" data-go="report">
        <div class="emoji">📊</div>
        <div class="label">Report</div>
        <div class="desc">come sta andando</div>
      </div>
    </div>
    <div class="funfact">
      <div class="ico">💡</div>
      <div><strong>Fun fact:</strong> ${escape(state.funFact)}</div>
    </div>
    <div class="app-version">English Adventure ${escape(APP_VERSION)}</div>
  `;
  document.querySelectorAll('.tile').forEach(t => {
    t.onclick = () => {
      const go = t.dataset.go;
      if (go === 'flashcards') renderFlashcards();
      else if (go === 'quiz') renderQuiz();
      else if (go === 'matching') renderMatching();
      else if (go === 'fillgap') renderFillGap();
      else if (go === 'truefalse') renderTrueFalse();
      else if (go === 'sequence') renderSequence();
      else if (go === 'ripasso') renderRipasso();
      else if (go === 'report') renderReport();
    };
  });
  const sw = document.getElementById('userSwitch');
  if (sw) sw.onclick = switchUser;
}

// ===== Screen: Flashcards =====
const flashState = { topic: 'places', idx: 0, flipped: false };

function renderFlashcards() {
  cancelPending();
  if (!TOPICS[flashState.topic]) flashState.topic = Object.keys(TOPICS)[0];
  const topicKey = flashState.topic;
  const topic = TOPICS[topicKey];
  const item = topic.items[flashState.idx] || topic.items[0];
  const total = topic.items.length;

  const tabs = Object.entries(TOPICS).map(([k, t]) =>
    `<button class="${k === topicKey ? 'active' : ''}" data-topic="${k}">${t.emoji} ${escape(t.title)}</button>`
  ).join('');

  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>🎴 Flashcards</h1>
        <div class="sub">Tocca la carta per girarla</div>
      </div>
    </div>
    <div class="topic-tabs">${tabs}</div>
    <div class="flashcard-wrap">
      <div class="flashcard ${flashState.flipped ? 'flipped' : ''}" id="card">
        <div class="face front">
          <button class="speak-btn" id="speak" aria-label="Ascolta pronuncia inglese">🔊</button>
          <div class="big-emoji">${item.emoji}</div>
          <div class="word">${escape(item.en)}</div>
          <div class="hint">tocca per la traduzione</div>
        </div>
        <div class="face back">
          <button class="speak-btn" id="speakBack" aria-label="Ascolta pronuncia inglese">🔊</button>
          <div class="big-emoji">${item.emoji}</div>
          <div class="it">${escape(item.it)}</div>
          <div class="hint">${escape(item.en)}</div>
        </div>
      </div>
    </div>
    <div class="nav-row">
      <button class="nav-btn" id="prev" aria-label="Precedente" ${flashState.idx === 0 ? 'disabled' : ''}>◀</button>
      <div class="counter">${flashState.idx + 1} / ${total}</div>
      <button class="nav-btn" id="next" aria-label="Successivo" ${flashState.idx === total - 1 ? 'disabled' : ''}>▶</button>
    </div>
  `;

  document.getElementById('back').onclick = renderHome;
  document.getElementById('card').onclick = (e) => {
    if (e.target.closest('#speak') || e.target.closest('#speakBack')) return;
    flashState.flipped = !flashState.flipped;
    document.getElementById('card').classList.toggle('flipped');
  };
  document.getElementById('speak').onclick = (e) => { e.stopPropagation(); speak(item.en); };
  document.getElementById('speakBack').onclick = (e) => { e.stopPropagation(); speak(item.en); };
  document.getElementById('prev').onclick = () => {
    if (flashState.idx > 0) { flashState.idx--; flashState.flipped = false; renderFlashcards(); }
  };
  document.getElementById('next').onclick = () => {
    if (flashState.idx < total - 1) { flashState.idx++; flashState.flipped = false; renderFlashcards(); }
    else { saveStars(1); toast('+1 stella! Topic completato 🌟'); }
  };
  document.querySelectorAll('.topic-tabs button').forEach(b => {
    b.onclick = () => {
      flashState.topic = b.dataset.topic;
      flashState.idx = 0;
      flashState.flipped = false;
      renderFlashcards();
    };
  });
}

// ===== Screen: Quiz =====
const quizState = { questions: [], idx: 0, score: 0, locked: false, mode: 'adaptive' };

function renderQuiz(mode = 'adaptive', sourceItems = null) {
  cancelPending();
  quizState.mode = mode;
  if (sourceItems) {
    quizState.questions = shuffle(sourceItems);
  } else {
    quizState.questions = adaptivePick(QUIZ, 10, 'tag');
  }
  quizState.idx = 0;
  quizState.score = 0;
  quizState.locked = false;
  showQuizQuestion();
}

function showQuizQuestion() {
  const total = quizState.questions.length;
  if (quizState.idx >= total || total === 0) return renderQuizEnd();
  const q = quizState.questions[quizState.idx];
  const pct = (quizState.idx / total) * 100;
  const weakBadge = getWeakTopics().includes(q.tag) ? '<span class="weak-badge">🎯 topic da rafforzare</span>' : '';

  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>❓ Quiz ${quizState.mode === 'errors' ? '· 🔁' : ''}</h1>
        <div class="sub">Domanda ${quizState.idx + 1} di ${total} — score: ${quizState.score}</div>
      </div>
    </div>
    <div class="progress-bar"><div style="width:${pct}%"></div></div>
    <div class="question-card">
      <button class="speak-btn-sm" id="speakq" aria-label="Ascolta la domanda in inglese">🔊</button>
      <div class="tag">${escape(q.tag)} ${weakBadge}</div>
      <div class="q">${escape(q.q)}</div>
    </div>
    <div class="options" id="options">
      ${q.options.map((o, i) => `<button class="option" data-i="${i}">${escape(o)}</button>`).join('')}
    </div>
  `;

  document.getElementById('back').onclick = renderHome;
  document.getElementById('speakq').onclick = () => speak(q.q);
  document.querySelectorAll('.option').forEach(btn => {
    btn.onclick = () => {
      if (quizState.locked) return;
      quizState.locked = true;
      const choice = parseInt(btn.dataset.i, 10);
      const correctIdx = q.correct;
      const ok = choice === correctIdx;
      logAttempt('quiz', q._idx, q.tag, ok);
      document.querySelectorAll('.option').forEach((b, i) => {
        b.classList.add('disabled');
        if (i === correctIdx) b.classList.add('correct');
        else if (i === choice && !ok) b.classList.add('wrong');
      });
      if (ok) quizState.score++;
      scheduleNext(() => {
        quizState.idx++;
        quizState.locked = false;
        showQuizQuestion();
      }, 1300);
    };
  });
}

function renderQuizEnd() {
  const total = quizState.questions.length;
  if (total === 0) {
    app.innerHTML = `
      <div class="end-screen">
        <div class="big-emoji">🎉</div>
        <h2>Nessun errore!</h2>
        <p style="color:var(--text-soft);">Hai padroneggiato tutto. Bravissima!</p>
        <div class="actions">
          <button class="btn full" id="home">Home</button>
        </div>
      </div>
    `;
    document.getElementById('home').onclick = renderHome;
    return;
  }
  const pct = (quizState.score / total) * 100;
  let stars = 1;
  if (pct >= 60) stars = 2;
  if (pct >= 80) stars = 3;
  saveStars(stars);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '💪';
  const msg = pct >= 80 ? 'Fantastica!' : pct >= 60 ? 'Bel lavoro!' : 'Continua così!';

  app.innerHTML = `
    <div class="end-screen">
      <div class="big-emoji">${emoji}</div>
      <h2>${msg}</h2>
      <div class="score">${quizState.score} / ${total}</div>
      <div class="stars-result">${'⭐'.repeat(stars)}</div>
      <div class="actions">
        <button class="btn full" id="again">Rigioca</button>
        <button class="btn secondary full" id="report">Vedi report</button>
        <button class="btn secondary full" id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('again').onclick = () => renderQuiz('adaptive');
  document.getElementById('report').onclick = renderReport;
  document.getElementById('home').onclick = renderHome;
}

// ===== Screen: Matching =====
const matchState = { pairs: [], selected: null, matched: 0, total: 0 };

function renderMatching() {
  cancelPending();
  const pool = shuffle(MATCHING_POOL).slice(0, 6);
  const items = [];
  pool.forEach((p, i) => {
    items.push({ type: 'en', text: p.en, key: i });
    items.push({ type: 'emoji', text: p.emoji, key: i, label: p.en });
  });
  matchState.pairs = shuffle(items);
  matchState.selected = null;
  matchState.matched = 0;
  matchState.total = pool.length;
  drawMatching();
}

function drawMatching() {
  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>🧩 Matching</h1>
        <div class="sub">Tocca una parola e poi l'immagine giusta — ${matchState.matched}/${matchState.total}</div>
      </div>
    </div>
    <div class="matching-grid" id="grid">
      ${matchState.pairs.map((it, idx) => `
        <button class="match-item" data-idx="${idx}" data-key="${it.key}" data-type="${it.type}">
          ${it.type === 'emoji' ? `<span class="emoji-big">${it.text}</span>` : escape(it.text)}
        </button>
      `).join('')}
    </div>
  `;
  document.getElementById('back').onclick = renderHome;
  document.querySelectorAll('.match-item').forEach(btn => {
    btn.onclick = () => handleMatchClick(btn);
  });
}

function handleMatchClick(btn) {
  if (btn.classList.contains('matched')) return;
  const idx = parseInt(btn.dataset.idx, 10);
  if (matchState.selected === null) {
    matchState.selected = idx;
    btn.classList.add('selected');
    return;
  }
  if (matchState.selected === idx) {
    btn.classList.remove('selected');
    matchState.selected = null;
    return;
  }
  const prev = document.querySelector(`.match-item[data-idx="${matchState.selected}"]`);
  const a = matchState.pairs[matchState.selected];
  const b = matchState.pairs[idx];
  if (a.key === b.key && a.type !== b.type) {
    prev.classList.remove('selected');
    prev.classList.add('matched');
    btn.classList.add('matched');
    matchState.matched++;
    if (matchState.matched === matchState.total) {
      saveStars(2);
      setTimeout(renderMatchingEnd, 600);
    } else {
      const sub = document.querySelector('.header .sub');
      if (sub) sub.textContent = `Tocca una parola e poi l'immagine giusta — ${matchState.matched}/${matchState.total}`;
    }
  } else {
    btn.classList.add('wrong');
    prev.classList.add('wrong');
    setTimeout(() => {
      btn.classList.remove('wrong');
      prev.classList.remove('wrong', 'selected');
    }, 500);
  }
  matchState.selected = null;
}

function renderMatchingEnd() {
  app.innerHTML = `
    <div class="end-screen">
      <div class="big-emoji">🎯</div>
      <h2>Brava!</h2>
      <div class="score">${matchState.total} / ${matchState.total}</div>
      <div class="stars-result">⭐⭐</div>
      <p style="color:var(--text-soft); margin: 10px 0 20px;">Hai abbinato tutte le coppie!</p>
      <div class="actions">
        <button class="btn full" id="again">Nuove coppie</button>
        <button class="btn secondary full" id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('again').onclick = renderMatching;
  document.getElementById('home').onclick = renderHome;
}

// ===== Screen: True/False =====
const tfState = { items: [], idx: 0, score: 0, locked: false, mode: 'adaptive' };

function renderTrueFalse(mode = 'adaptive', sourceItems = null) {
  cancelPending();
  tfState.mode = mode;
  if (sourceItems) {
    tfState.items = shuffle(sourceItems);
  } else {
    tfState.items = adaptivePick(TRUE_FALSE, Math.min(10, TRUE_FALSE.length), 'tag');
  }
  tfState.idx = 0;
  tfState.score = 0;
  tfState.locked = false;
  showTrueFalse();
}

function showTrueFalse() {
  const total = tfState.items.length;
  if (tfState.idx >= total || total === 0) return renderTrueFalseEnd();
  const q = tfState.items[tfState.idx];
  const pct = (tfState.idx / total) * 100;
  const weakBadge = getWeakTopics().includes(q.tag) ? '<span class="weak-badge">🎯 topic da rafforzare</span>' : '';

  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>✅❌ Vero o Falso ${tfState.mode === 'errors' ? '· 🔁' : ''}</h1>
        <div class="sub">Affermazione ${tfState.idx + 1} di ${total} — score: ${tfState.score}</div>
      </div>
    </div>
    <div class="progress-bar"><div style="width:${pct}%"></div></div>
    <div class="question-card">
      <button class="speak-btn-sm" id="speakq" aria-label="Ascolta in inglese">🔊</button>
      <div class="tag">${escape(q.tag)} ${weakBadge}</div>
      <div class="q">${escape(q.s)}</div>
    </div>
    <div class="tf-options">
      <button class="tf-btn tf-true" data-v="true">✅ VERO</button>
      <button class="tf-btn tf-false" data-v="false">❌ FALSO</button>
    </div>
  `;
  document.getElementById('back').onclick = renderHome;
  document.getElementById('speakq').onclick = () => speak(q.s);
  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.onclick = () => {
      if (tfState.locked) return;
      tfState.locked = true;
      const choice = btn.dataset.v === 'true';
      const ok = choice === q.correct;
      logAttempt('tf', q._idx, q.tag, ok);
      document.querySelectorAll('.tf-btn').forEach(b => {
        b.classList.add('disabled');
        const isCorrectBtn = (b.dataset.v === 'true') === q.correct;
        if (isCorrectBtn) b.classList.add('correct');
        else if (b === btn && !ok) b.classList.add('wrong');
      });
      if (ok) tfState.score++;
      scheduleNext(() => {
        tfState.idx++;
        tfState.locked = false;
        showTrueFalse();
      }, 1300);
    };
  });
}

function renderTrueFalseEnd() {
  const total = tfState.items.length;
  if (total === 0) {
    app.innerHTML = `<div class="end-screen"><div class="big-emoji">🎉</div><h2>Nessun errore!</h2><div class="actions"><button class="btn full" id="home">Home</button></div></div>`;
    document.getElementById('home').onclick = renderHome;
    return;
  }
  const pct = (tfState.score / total) * 100;
  let stars = 1;
  if (pct >= 60) stars = 2;
  if (pct >= 80) stars = 3;
  saveStars(stars);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '💪';
  const msg = pct >= 80 ? 'Fantastica!' : pct >= 60 ? 'Bel lavoro!' : 'Continua così!';
  app.innerHTML = `
    <div class="end-screen">
      <div class="big-emoji">${emoji}</div>
      <h2>${msg}</h2>
      <div class="score">${tfState.score} / ${total}</div>
      <div class="stars-result">${'⭐'.repeat(stars)}</div>
      <div class="actions">
        <button class="btn full" id="again">Rigioca</button>
        <button class="btn secondary full" id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('again').onclick = () => renderTrueFalse('adaptive');
  document.getElementById('home').onclick = renderHome;
}

// ===== Screen: Sequence (riordina) =====
const seqState = { items: [], idx: 0, score: 0, picked: [], pool: [], locked: false };

function renderSequence(mode = 'adaptive', sourceItems = null) {
  cancelPending();
  if (sourceItems) {
    seqState.items = shuffle(sourceItems);
  } else {
    seqState.items = adaptivePick(SEQUENCE, Math.min(6, SEQUENCE.length), 'tag');
  }
  seqState.idx = 0;
  seqState.score = 0;
  seqState.locked = false;
  showSequence();
}

function showSequence() {
  const total = seqState.items.length;
  if (seqState.idx >= total || total === 0) return renderSequenceEnd();
  const item = seqState.items[seqState.idx];
  // items[] è l'ordine corretto; pool è la versione mescolata
  seqState.pool = shuffle(item.items.map((label, i) => ({label, order: i})));
  seqState.picked = [];
  seqState.locked = false;
  drawSequence(item);
}

function drawSequence(item) {
  const total = seqState.items.length;
  const pct = (seqState.idx / total) * 100;
  const weakBadge = getWeakTopics().includes(item.tag) ? '<span class="weak-badge">🎯 topic da rafforzare</span>' : '';
  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>🔢 Riordina</h1>
        <div class="sub">Sequenza ${seqState.idx + 1} di ${total} — score: ${seqState.score}</div>
      </div>
    </div>
    <div class="progress-bar"><div style="width:${pct}%"></div></div>
    <div class="question-card">
      <div class="tag">${escape(item.tag)} ${weakBadge}</div>
      <div class="q">${escape(item.prompt)}</div>
    </div>
    <div class="seq-picked" id="seqPicked">
      ${seqState.picked.map((p, i) => `<div class="seq-slot filled">${i+1}. ${escape(p.label)}</div>`).join('')}
      ${Array.from({length: item.items.length - seqState.picked.length}).map((_, i) => `<div class="seq-slot empty">${seqState.picked.length + i + 1}.</div>`).join('')}
    </div>
    <div class="seq-pool" id="seqPool">
      ${seqState.pool.map(p => `<button class="seq-item" data-order="${p.order}" ${seqState.picked.find(x=>x.order===p.order)?'disabled':''}>${escape(p.label)}</button>`).join('')}
    </div>
  `;
  document.getElementById('back').onclick = renderHome;
  document.querySelectorAll('.seq-item').forEach(btn => {
    btn.onclick = () => {
      if (seqState.locked) return;
      const order = parseInt(btn.dataset.order, 10);
      const expected = seqState.picked.length;
      const ok = order === expected;
      if (!ok) {
        // sbagliato: shake + reset
        seqState.locked = true;
        btn.classList.add('wrong');
        setTimeout(() => { btn.classList.remove('wrong'); seqState.picked = []; seqState.locked = false; drawSequence(item); }, 700);
        return;
      }
      seqState.picked.push({label: btn.textContent.trim(), order});
      if (seqState.picked.length === item.items.length) {
        // Sequence completata correttamente
        logAttempt('seq', item._idx, item.tag, true);
        seqState.score++;
        seqState.locked = true;
        scheduleNext(() => {
          seqState.idx++;
          seqState.locked = false;
          showSequence();
        }, 900);
      } else {
        drawSequence(item);
      }
    };
  });
}

function renderSequenceEnd() {
  const total = seqState.items.length;
  if (total === 0) {
    app.innerHTML = `<div class="end-screen"><div class="big-emoji">🎉</div><h2>Tutto perfetto!</h2><div class="actions"><button class="btn full" id="home">Home</button></div></div>`;
    document.getElementById('home').onclick = renderHome;
    return;
  }
  const pct = (seqState.score / total) * 100;
  let stars = 1;
  if (pct >= 60) stars = 2;
  if (pct >= 80) stars = 3;
  saveStars(stars);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '💪';
  app.innerHTML = `
    <div class="end-screen">
      <div class="big-emoji">${emoji}</div>
      <h2>${pct >= 80 ? 'Fantastica!' : 'Bel lavoro!'}</h2>
      <div class="score">${seqState.score} / ${total}</div>
      <div class="stars-result">${'⭐'.repeat(stars)}</div>
      <div class="actions">
        <button class="btn full" id="again">Rigioca</button>
        <button class="btn secondary full" id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('again').onclick = () => renderSequence('adaptive');
  document.getElementById('home').onclick = renderHome;
}

// ===== Screen: Fill the Gap =====
const fillState = { items: [], idx: 0, picked: null, score: 0, locked: false, mode: 'adaptive' };

function renderFillGap(mode = 'adaptive', sourceItems = null) {
  cancelPending();
  fillState.mode = mode;
  if (sourceItems) {
    fillState.items = shuffle(sourceItems);
  } else {
    fillState.items = adaptivePick(FILL_GAP, Math.min(8, FILL_GAP.length), 'topic');
  }
  fillState.idx = 0;
  fillState.picked = null;
  fillState.score = 0;
  fillState.locked = false;
  showFillItem();
}

function showFillItem() {
  if (fillState.idx >= fillState.items.length) return renderFillEnd();
  const f = fillState.items[fillState.idx];
  const total = fillState.items.length;
  const sentenceHtml = escape(f.sentence).replace('___',
    `<span class="fill-blank" id="blank">${fillState.picked !== null ? escape(f.choices[fillState.picked]) : '___'}</span>`
  );
  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>✍️ Fill the gap ${fillState.mode === 'errors' ? '· 🔁' : ''}</h1>
        <div class="sub">Frase ${fillState.idx + 1} di ${total} · ${escape(f.topic)}</div>
      </div>
    </div>
    <div class="progress-bar"><div style="width:${(fillState.idx / total) * 100}%"></div></div>
    <div class="fill-sentence">
      <button class="speak-btn-sm" id="speakf" aria-label="Ascolta la frase in inglese">🔊</button>
      ${sentenceHtml}
    </div>
    <div class="fill-choices" id="choices">
      ${f.choices.map((c, i) => `<button class="fill-choice" data-i="${i}" ${fillState.locked ? 'disabled' : ''}>${escape(c)}</button>`).join('')}
    </div>
    <div class="spacer"></div>
    <button class="btn full" id="confirm" ${fillState.picked === null ? 'disabled' : ''}>Conferma</button>
  `;
  document.getElementById('back').onclick = renderHome;
  document.getElementById('speakf').onclick = () => {
    const fullSentence = f.sentence.replace('___', fillState.picked !== null ? f.choices[fillState.picked] : f.choices[f.correct]);
    speak(fullSentence);
  };
  document.querySelectorAll('.fill-choice').forEach(b => {
    b.onclick = () => {
      if (fillState.locked) return;
      fillState.picked = parseInt(b.dataset.i, 10);
      showFillItem();
    };
  });
  document.getElementById('confirm').onclick = () => {
    if (fillState.picked === null || fillState.locked) return;
    fillState.locked = true;
    const ok = f.correct === fillState.picked;
    logAttempt('fill', f._idx, f.topic, ok);
    const blank = document.getElementById('blank');
    if (ok) {
      blank.style.color = 'var(--success)';
      blank.style.borderColor = 'var(--success)';
      fillState.score++;
      toast('Giusto! ✅', 900);
    } else {
      blank.style.color = 'var(--danger)';
      blank.style.borderColor = 'var(--danger)';
      toast(`No, era: ${f.choices[f.correct]}`, 1500);
    }
    scheduleNext(() => {
      fillState.idx++;
      fillState.picked = null;
      fillState.locked = false;
      showFillItem();
    }, 1400);
  };
}

function renderFillEnd() {
  const total = fillState.items.length;
  if (total === 0) {
    app.innerHTML = `
      <div class="end-screen">
        <div class="big-emoji">🎉</div>
        <h2>Niente da ripassare!</h2>
        <div class="actions"><button class="btn full" id="home">Home</button></div>
      </div>
    `;
    document.getElementById('home').onclick = renderHome;
    return;
  }
  const pct = (fillState.score / total) * 100;
  let stars = 1;
  if (pct >= 60) stars = 2;
  if (pct >= 85) stars = 3;
  saveStars(stars);
  const emoji = pct >= 85 ? '🌟' : pct >= 60 ? '👏' : '🌱';
  const msg = pct >= 85 ? 'Perfetto!' : pct >= 60 ? 'Ottimo lavoro!' : 'Riprova, ce la fai!';
  app.innerHTML = `
    <div class="end-screen">
      <div class="big-emoji">${emoji}</div>
      <h2>${msg}</h2>
      <div class="score">${fillState.score} / ${total}</div>
      <div class="stars-result">${'⭐'.repeat(stars)}</div>
      <div class="actions">
        <button class="btn full" id="again">Rigioca</button>
        <button class="btn secondary full" id="report">Vedi report</button>
        <button class="btn secondary full" id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('again').onclick = () => renderFillGap('adaptive');
  document.getElementById('report').onclick = renderReport;
  document.getElementById('home').onclick = renderHome;
}

// ===== Screen: Ripassa errori =====
function renderRipasso() {
  cancelPending();
  const err = getErrorItems();
  const total = err.quiz.length + err.fill.length + err.tf.length + err.seq.length;
  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>🔁 Ripassa errori</h1>
        <div class="sub">Solo le cose che hai sbagliato di recente</div>
      </div>
    </div>
    <div class="ripasso-box">
      <div class="ripasso-summary">
        <div class="big-emoji">${total === 0 ? '🎉' : '🎯'}</div>
        <p>
          ${total === 0
            ? 'Nessun errore in sospeso. Sei pronta per la verifica!'
            : `Hai <strong>${total} cose</strong> da rivedere: <strong>${err.quiz.length}</strong> quiz, <strong>${err.fill.length}</strong> frasi, <strong>${err.tf.length}</strong> vero/falso, <strong>${err.seq.length}</strong> sequenze. Quando rispondi giusto 2 volte di fila esce dalla lista.`}
        </p>
      </div>
      <div class="ripasso-actions">
        <button class="btn full" id="goquiz" ${err.quiz.length === 0 ? 'disabled' : ''}>
          ❓ Ripassa ${err.quiz.length} quiz
        </button>
        <button class="btn full" id="gofill" ${err.fill.length === 0 ? 'disabled' : ''}>
          ✍️ Ripassa ${err.fill.length} frasi
        </button>
        <button class="btn full" id="gotf" ${err.tf.length === 0 ? 'disabled' : ''}>
          ✅❌ Ripassa ${err.tf.length} vero/falso
        </button>
        <button class="btn full" id="goseq" ${err.seq.length === 0 ? 'disabled' : ''}>
          🔢 Ripassa ${err.seq.length} sequenze
        </button>
      </div>
    </div>
  `;
  document.getElementById('back').onclick = renderHome;
  document.getElementById('goquiz').onclick = () => { if (err.quiz.length) renderQuiz('errors', err.quiz); };
  document.getElementById('gofill').onclick = () => { if (err.fill.length) renderFillGap('errors', err.fill); };
  document.getElementById('gotf').onclick = () => { if (err.tf.length) renderTrueFalse('errors', err.tf); };
  document.getElementById('goseq').onclick = () => { if (err.seq.length) renderSequence('errors', err.seq); };
}

// ===== Screen: Report =====
function renderReport() {
  cancelPending();
  const topicStats = getTopicStats();
  const attempts = state.stats.attempts;
  const totAtt = attempts.length;
  const totCorrect = attempts.filter(a => a.correct).length;
  const totPct = totAtt ? Math.round(totCorrect * 100 / totAtt) : 0;

  // Lista items da ripassare (errori pendenti)
  const errors = getErrorItems();
  const errQuizList = errors.quiz.slice(0, 10).map(q =>
    `<li><strong>${escape(q.tag)}</strong>: ${escape(q.q)} <em>→ ${escape(q.options[q.correct])}</em></li>`
  ).join('') || '<li class="empty">nessun errore quiz</li>';
  const errFillList = errors.fill.slice(0, 10).map(f =>
    `<li><strong>${escape(f.topic)}</strong>: "${escape(f.sentence)}" <em>→ ${escape(f.choices[f.correct])}</em></li>`
  ).join('') || '<li class="empty">nessun errore fill</li>';

  // Padroneggiate (mastered) - tutti i tipi
  const masteredQuiz = QUIZ.map((q, i) => ({ ...q, _idx: i })).filter(q => isMasteredItem('quiz', q._idx));
  const masteredFill = FILL_GAP.map((f, i) => ({ ...f, _idx: i })).filter(f => isMasteredItem('fill', f._idx));
  const masteredTF = (typeof TRUE_FALSE !== 'undefined' ? TRUE_FALSE : []).map((t, i) => ({ ...t, _idx: i })).filter(t => isMasteredItem('tf', t._idx));
  const masteredSeq = (typeof SEQUENCE !== 'undefined' ? SEQUENCE : []).map((s, i) => ({ ...s, _idx: i })).filter(s => isMasteredItem('seq', s._idx));
  const masteredCount = masteredQuiz.length + masteredFill.length + masteredTF.length + masteredSeq.length;

  // Topic bars
  const bars = TOPIC_KEYS.map(t => {
    const s = topicStats[t] || { total: 0, correct: 0, pct: null };
    const pct = s.pct ?? 0;
    const label = s.pct === null ? 'mai testato' : `${s.correct}/${s.total} · ${pct}%`;
    const isWeak = s.total >= 3 && s.pct !== null && s.pct < 70;
    const color = TOPIC_META[t].color;
    return `
      <div class="report-row ${isWeak ? 'weak' : ''}">
        <div class="report-row-head">
          <span>${TOPIC_META[t].emoji} <strong>${t}</strong></span>
          <span class="muted">${label}${isWeak ? ' 🎯' : ''}</span>
        </div>
        <div class="report-bar"><div style="width:${pct}%; background:${color};"></div></div>
      </div>`;
  }).join('');

  // Ultima attività (semplice timeline)
  const last5 = attempts.slice(-5).reverse().map(a => {
    const when = new Date(a.ts).toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    return `<li>${a.correct ? '✅' : '❌'} <strong>${escape(a.topic)}</strong> <span class="muted">${escape(a.type)} · ${when}</span></li>`;
  }).join('') || '<li class="empty">nessuna attività ancora</li>';

  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back" aria-label="Torna alla home">←</button>
      <div>
        <h1>📊 Report</h1>
        <div class="sub">${totAtt} risposte totali · ${totPct}% giuste · ${masteredCount} padroneggiate</div>
      </div>
    </div>

    <div class="card-block">
      <h3>Andamento per topic</h3>
      <div class="report-bars">${bars}</div>
      <p class="report-hint">🎯 = topic da rafforzare (sotto 70%). L'app pesca più domande da qui.</p>
    </div>

    <div class="card-block">
      <h3>Da ripassare (${errors.quiz.length + errors.fill.length})</h3>
      <h4>Quiz</h4>
      <ul class="report-list">${errQuizList}</ul>
      <h4>Fill the gap</h4>
      <ul class="report-list">${errFillList}</ul>
    </div>

    <div class="card-block">
      <h3>Ultima attività</h3>
      <ul class="report-list">${last5}</ul>
    </div>

    <div class="card-block">
      <h3>Padroneggiate ${masteredCount > 0 ? '🌟' : ''}</h3>
      <p class="muted">${masteredCount === 0 ? 'Ancora niente — rispondi giusto 2 volte di fila a uno stesso esercizio per "padroneggiarlo".' : `${masteredCount} esercizi nel "padronato" (almeno 2 risposte giuste di fila).`}</p>
    </div>

    <div class="card-block danger-block">
      <h3>Reset</h3>
      <p class="muted">Cancella tutte le risposte salvate (per ricominciare da zero).</p>
      <button class="btn secondary full" id="reset">🗑️ Azzera dati</button>
    </div>
  `;
  document.getElementById('back').onclick = renderHome;
  document.getElementById('reset').onclick = () => {
    if (confirm('Sicura? Cancellerai tutto lo storico delle risposte.')) {
      resetStats();
      toast('Dati azzerati 🧹');
      renderReport();
    }
  };
}

// ===== PWA service worker + auto-update =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      if (!reg) return;
      // Controlla update ogni 30 minuti mentre l'app è aperta
      setInterval(() => reg.update().catch(() => {}), 30 * 60 * 1000);
      // Quando un nuovo SW è installato e in waiting, attivalo subito
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            nw.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    }).catch(() => {});
    // Quando il nuovo SW prende il controllo, ricarica una sola volta
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return;
      reloaded = true;
      location.reload();
    });
  });
}

// ===== Boot =====
if (getCurrentUser()) renderHome(); else renderWelcome();
