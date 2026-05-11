// Sofia's English Adventure - Unit 5
// Single-file SPA with vanilla JS

const app = document.getElementById('app');

// ===== State =====
const state = {
  screen: 'home',
  stars: parseInt(localStorage.getItem('sofia_u5_stars') || '0', 10),
  funFact: FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)],
};

function saveStars(delta) {
  state.stars += delta;
  localStorage.setItem('sofia_u5_stars', String(state.stars));
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

// ===== Screen: Home =====
function renderHome() {
  app.innerHTML = `
    <div class="hero">
      <h1>Hi Sofia! 👋</h1>
      <p>Unit 5 — Bath, here we come!</p>
      <div class="stars">⭐ ${state.stars} stelle</div>
    </div>
    <div class="tile-grid">
      <div class="tile flashcards" data-go="flashcards">
        <div class="emoji">🎴</div>
        <div class="label">Flashcards</div>
        <div class="desc">impara i vocaboli</div>
      </div>
      <div class="tile quiz" data-go="quiz">
        <div class="emoji">❓</div>
        <div class="label">Quiz</div>
        <div class="desc">metti alla prova</div>
      </div>
      <div class="tile matching" data-go="matching">
        <div class="emoji">🧩</div>
        <div class="label">Matching</div>
        <div class="desc">abbina le coppie</div>
      </div>
      <div class="tile fill" data-go="fillgap">
        <div class="emoji">✍️</div>
        <div class="label">Fill the gap</div>
        <div class="desc">completa la frase</div>
      </div>
    </div>
    <div class="funfact">
      <div class="ico">💡</div>
      <div><strong>Fun fact:</strong> ${escape(state.funFact)}</div>
    </div>
  `;
  document.querySelectorAll('.tile').forEach(t => {
    t.onclick = () => {
      const go = t.dataset.go;
      if (go === 'flashcards') renderFlashcards();
      else if (go === 'quiz') renderQuiz();
      else if (go === 'matching') renderMatching();
      else if (go === 'fillgap') renderFillGap();
    };
  });
}

// ===== Screen: Flashcards =====
const flashState = { topic: 'places', idx: 0, flipped: false };

function renderFlashcards() {
  const topicKey = flashState.topic;
  const topic = TOPICS[topicKey];
  const item = topic.items[flashState.idx];
  const total = topic.items.length;

  const tabs = Object.entries(TOPICS).map(([k, t]) =>
    `<button class="${k === topicKey ? 'active' : ''}" data-topic="${k}">${t.emoji} ${escape(t.title)}</button>`
  ).join('');

  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back">←</button>
      <div>
        <h1>🎴 Flashcards</h1>
        <div class="sub">Tocca la carta per girarla</div>
      </div>
    </div>
    <div class="topic-tabs">${tabs}</div>
    <div class="flashcard-wrap">
      <div class="flashcard ${flashState.flipped ? 'flipped' : ''}" id="card">
        <div class="face front">
          <button class="speak-btn" id="speak">🔊</button>
          <div class="big-emoji">${item.emoji}</div>
          <div class="word">${escape(item.en)}</div>
          <div class="hint">tocca per la traduzione</div>
        </div>
        <div class="face back">
          <div class="big-emoji">${item.emoji}</div>
          <div class="it">${escape(item.it)}</div>
          <div class="hint">${escape(item.en)}</div>
        </div>
      </div>
    </div>
    <div class="nav-row">
      <button class="nav-btn" id="prev" ${flashState.idx === 0 ? 'disabled' : ''}>◀</button>
      <div class="counter">${flashState.idx + 1} / ${total}</div>
      <button class="nav-btn" id="next" ${flashState.idx === total - 1 ? 'disabled' : ''}>▶</button>
    </div>
  `;

  document.getElementById('back').onclick = () => { state.screen = 'home'; renderHome(); };
  document.getElementById('card').onclick = (e) => {
    if (e.target.id === 'speak') return;
    flashState.flipped = !flashState.flipped;
    document.getElementById('card').classList.toggle('flipped');
  };
  document.getElementById('speak').onclick = (e) => {
    e.stopPropagation();
    speak(item.en);
  };
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
const quizState = { questions: [], idx: 0, score: 0, locked: false };

function renderQuiz() {
  // Init: shuffle 10 questions from the 20-question pool
  quizState.questions = shuffle(QUIZ).slice(0, 10);
  quizState.idx = 0;
  quizState.score = 0;
  quizState.locked = false;
  showQuizQuestion();
}

function showQuizQuestion() {
  const total = quizState.questions.length;
  if (quizState.idx >= total) return renderQuizEnd();
  const q = quizState.questions[quizState.idx];
  const pct = (quizState.idx / total) * 100;

  app.innerHTML = `
    <div class="header">
      <button class="back-btn" id="back">←</button>
      <div>
        <h1>❓ Quiz</h1>
        <div class="sub">Domanda ${quizState.idx + 1} di ${total} — score: ${quizState.score}</div>
      </div>
    </div>
    <div class="progress-bar"><div style="width:${pct}%"></div></div>
    <div class="question-card">
      <div class="tag">${escape(q.tag)}</div>
      <div class="q">${escape(q.q)}</div>
    </div>
    <div class="options" id="options">
      ${q.options.map((o, i) => `<button class="option" data-i="${i}">${escape(o)}</button>`).join('')}
    </div>
  `;

  document.getElementById('back').onclick = () => { renderHome(); };
  document.querySelectorAll('.option').forEach(btn => {
    btn.onclick = () => {
      if (quizState.locked) return;
      quizState.locked = true;
      const choice = parseInt(btn.dataset.i, 10);
      const correctIdx = q.correct;
      document.querySelectorAll('.option').forEach((b, i) => {
        b.classList.add('disabled');
        if (i === correctIdx) b.classList.add('correct');
        else if (i === choice && choice !== correctIdx) b.classList.add('wrong');
      });
      if (choice === correctIdx) { quizState.score++; }
      setTimeout(() => {
        quizState.idx++;
        quizState.locked = false;
        showQuizQuestion();
      }, 1300);
    };
  });
}

function renderQuizEnd() {
  const total = quizState.questions.length;
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
        <button class="btn secondary full" id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('again').onclick = renderQuiz;
  document.getElementById('home').onclick = renderHome;
}

// ===== Screen: Matching =====
const matchState = { pairs: [], selected: null, matched: 0, total: 0 };

function renderMatching() {
  const pool = shuffle(MATCHING_POOL).slice(0, 6);
  const items = [];
  pool.forEach((p, i) => {
    items.push({ type: 'en', text: p.en, key: i, emoji: '' });
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
      <button class="back-btn" id="back">←</button>
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
      setTimeout(() => renderMatchingEnd(), 600);
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

// ===== Screen: Fill the Gap =====
const fillState = { items: [], idx: 0, picked: null, score: 0, locked: false };

function renderFillGap() {
  fillState.items = shuffle(FILL_GAP).slice(0, 8);
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
      <button class="back-btn" id="back">←</button>
      <div>
        <h1>✍️ Fill the gap</h1>
        <div class="sub">Frase ${fillState.idx + 1} di ${total} · ${escape(f.topic)}</div>
      </div>
    </div>
    <div class="progress-bar"><div style="width:${(fillState.idx / total) * 100}%"></div></div>
    <div class="fill-sentence">${sentenceHtml}</div>
    <div class="fill-choices" id="choices">
      ${f.choices.map((c, i) => `<button class="fill-choice" data-i="${i}" ${fillState.locked ? 'disabled' : ''}>${escape(c)}</button>`).join('')}
    </div>
    <div class="spacer"></div>
    <button class="btn full" id="confirm" ${fillState.picked === null ? 'disabled' : ''}>Conferma</button>
  `;
  document.getElementById('back').onclick = renderHome;
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
    const correct = f.correct === fillState.picked;
    const blank = document.getElementById('blank');
    if (correct) {
      blank.style.color = 'var(--success)';
      blank.style.borderColor = 'var(--success)';
      fillState.score++;
      toast('Giusto! ✅', 900);
    } else {
      blank.style.color = 'var(--danger)';
      blank.style.borderColor = 'var(--danger)';
      toast(`No, era: ${f.choices[f.correct]}`, 1500);
    }
    setTimeout(() => {
      fillState.idx++;
      fillState.picked = null;
      fillState.locked = false;
      showFillItem();
    }, 1400);
  };
}

function renderFillEnd() {
  const total = fillState.items.length;
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
        <button class="btn secondary full" id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('again').onclick = renderFillGap;
  document.getElementById('home').onclick = renderHome;
}

// ===== PWA service worker (cache for offline use) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// ===== Boot =====
renderHome();
