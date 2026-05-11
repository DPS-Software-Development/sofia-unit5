// Unit 5 - "Bath, here we come!" - Hello World, Classe 5
// Topic normalizzati (4): Places, Directions, Imperatives, Romans

const TOPICS = {
  places: {
    title: "Town places",
    emoji: "🏙️",
    color: "#7c3aed",
    items: [
      { en: "library", it: "biblioteca", emoji: "📚" },
      { en: "bank", it: "banca", emoji: "🏦" },
      { en: "shopping centre", it: "centro commerciale", emoji: "🛍️" },
      { en: "museum", it: "museo", emoji: "🏛️" },
      { en: "post office", it: "ufficio postale", emoji: "📮" },
      { en: "theatre", it: "teatro", emoji: "🎭" },
      { en: "café", it: "caffè", emoji: "☕" },
      { en: "hospital", it: "ospedale", emoji: "🏥" },
      { en: "sports centre", it: "centro sportivo", emoji: "🏟️" },
      { en: "bus stop", it: "fermata dell'autobus", emoji: "🚏" },
      { en: "park", it: "parco", emoji: "🌳" },
      { en: "school", it: "scuola", emoji: "🏫" },
      { en: "aquarium", it: "acquario", emoji: "🐠" },
      { en: "chemist's", it: "farmacia", emoji: "💊" },
      { en: "cinema", it: "cinema", emoji: "🎬" }
    ]
  },
  directions: {
    title: "Directions & Prepositions",
    emoji: "🧭",
    color: "#0ea5e9",
    items: [
      { en: "go straight on", it: "vai dritto", emoji: "⬆️" },
      { en: "turn left", it: "gira a sinistra", emoji: "⬅️" },
      { en: "turn right", it: "gira a destra", emoji: "➡️" },
      { en: "cross the road", it: "attraversa la strada", emoji: "🚸" },
      { en: "traffic lights", it: "semaforo", emoji: "🚦" },
      { en: "go past", it: "vai oltre", emoji: "↪️" },
      { en: "crossroads", it: "incrocio", emoji: "✚" },
      { en: "roundabout", it: "rotatoria", emoji: "🔄" },
      { en: "next to", it: "accanto a", emoji: "👫" },
      { en: "opposite", it: "di fronte a", emoji: "↔️" },
      { en: "in front of", it: "davanti a", emoji: "👈" },
      { en: "behind", it: "dietro", emoji: "👉" },
      { en: "between", it: "tra/in mezzo a", emoji: "🔀" },
      { en: "near", it: "vicino a", emoji: "📍" }
    ]
  },
  imperatives: {
    title: "Imperatives",
    emoji: "📣",
    color: "#f59e0b",
    items: [
      { en: "Open the door, please.", it: "Apri la porta, per favore.", emoji: "🚪" },
      { en: "Don't open the window!", it: "Non aprire la finestra!", emoji: "🪟" },
      { en: "Be quiet!", it: "Stai zitto!", emoji: "🤫" },
      { en: "Don't go too fast!", it: "Non andare troppo veloce!", emoji: "🏃" },
      { en: "Listen carefully.", it: "Ascolta con attenzione.", emoji: "👂" },
      { en: "Don't feed the animals.", it: "Non dare da mangiare agli animali.", emoji: "🦆" },
      { en: "Cross the road.", it: "Attraversa la strada.", emoji: "🚶" },
      { en: "Stop!", it: "Fermati!", emoji: "🛑" }
    ]
  },
  romans: {
    title: "Romans in Britain",
    emoji: "🏛️",
    color: "#dc2626",
    items: [
      { en: "emperor", it: "imperatore", emoji: "👑" },
      { en: "amphitheatre", it: "anfiteatro", emoji: "🎪" },
      { en: "temple", it: "tempio", emoji: "⛩️" },
      { en: "forum", it: "foro romano", emoji: "⚖️" },
      { en: "tower", it: "torre", emoji: "🗼" },
      { en: "fortresses", it: "fortezze", emoji: "🏰" },
      { en: "street", it: "strada", emoji: "🛣️" },
      { en: "market", it: "mercato", emoji: "🛒" },
      { en: "museum", it: "museo", emoji: "🏛️" },
      { en: "villa", it: "villa", emoji: "🏡" },
      { en: "river", it: "fiume", emoji: "🌊" }
    ]
  },
};

// I 4 topic ufficiali per tracking/adaptive/report
const TOPIC_KEYS = ["Places", "Directions", "Imperatives", "Romans"];
const TOPIC_META = {
  "Places":     { emoji: "🏙️", color: "#7c3aed" },
  "Directions": { emoji: "🧭", color: "#0ea5e9" },
  "Imperatives":{ emoji: "📣", color: "#f59e0b" },
  "Romans":     { emoji: "🏛️", color: "#dc2626" }
};

// QUIZ: 35 items a scelta multipla (4 opzioni, 1 corretta). 100% basato su PDF Unit 5.
// Tag valori: "Places" | "Directions" | "Imperatives" | "Romans"
const QUIZ = [
  // ----- PLACES (8) -----
  { q: "Come si dice 'biblioteca' in inglese? (p.98)", options: ["library", "museum", "theatre", "bank"], correct: 0, tag: "Places" },
  { q: "Where do people go to borrow or read books? (p.112)", options: ["sports centre", "library", "post office", "café"], correct: 1, tag: "Places" },
  { q: "Come si dice 'ufficio postale' in inglese? (p.98)", options: ["post office", "shopping centre", "bus stop", "hospital"], correct: 0, tag: "Places" },
  { q: "Where do people watch plays? (p.112)", options: ["museum", "café", "theatre", "sports centre"], correct: 2, tag: "Places" },
  { q: "Cosa significa 'shopping centre'? (p.98)", options: ["centro sportivo", "centro commerciale", "fermata dell'autobus", "ospedale"], correct: 1, tag: "Places" },
  { q: "Where can people see ancient statues or paintings? (p.112)", options: ["museum", "library", "park", "bank"], correct: 0, tag: "Places" },
  { q: "Where do people go shopping? (p.112)", options: ["library", "shopping centre", "museum", "cinema"], correct: 1, tag: "Places" },
  { q: "Where is Bath? (p.98)", options: ["in the north of England", "in the south of England", "in Wales", "in Scotland"], correct: 1, tag: "Places" },

  // ----- DIRECTIONS (8) -----
  { q: "Cosa significa 'Go straight on'? (p.103)", options: ["gira a destra", "gira a sinistra", "vai dritto", "attraversa la strada"], correct: 2, tag: "Directions" },
  { q: "Come si dice 'gira a sinistra' in inglese? (p.103)", options: ["Turn right", "Turn left", "Go past", "Cross the road"], correct: 1, tag: "Directions" },
  { q: "Cosa significa 'Cross the road'? (p.103)", options: ["attraversa la strada", "supera la strada", "gira alla strada", "vai dritto"], correct: 0, tag: "Directions" },
  { q: "Come si dice 'al semaforo' in inglese? (p.103)", options: ["At the crossroads", "At the roundabout", "At the traffic lights", "At the bus stop"], correct: 2, tag: "Directions" },
  { q: "Cosa significa 'At the roundabout'? (p.103)", options: ["all'incrocio", "alla rotonda", "al semaforo", "alla fermata"], correct: 1, tag: "Directions" },
  { q: "What does 'Go past the school' mean? (p.103)", options: ["entra nella scuola", "gira verso la scuola", "supera la scuola", "attraversa la scuola"], correct: 2, tag: "Directions" },
  { q: "Come si chiede indicazioni per il museo? (p.103)", options: ["Where is the museum?", "How can I get to the museum?", "What is the museum?", "When is the museum?"], correct: 1, tag: "Directions" },
  { q: "Cosa significa 'At the crossroads'? (p.103)", options: ["alla rotonda", "al semaforo", "all'incrocio", "all'angolo"], correct: 2, tag: "Directions" },

  // ----- IMPERATIVES (5) -----
  { q: "Quale è la forma negativa di 'Open the door'? (p.105)", options: ["Not open the door!", "Don't open the door!", "No open the door!", "Doesn't open the door!"], correct: 1, tag: "Imperatives" },
  { q: "Cosa significa 'Be quiet!'? (p.105)", options: ["Stai fermo!", "Stai zitto!", "Sii veloce!", "Vieni qui!"], correct: 1, tag: "Imperatives" },
  { q: "Come si dice 'Non andare troppo veloce!'? (p.105)", options: ["Don't go too fast!", "No go too fast!", "Not go fast!", "Don't going fast!"], correct: 0, tag: "Imperatives" },
  { q: "Quale verbo NON appare nel box degli imperativi a p.105?", options: ["go", "cross", "turn", "swim"], correct: 3, tag: "Imperatives" },
  { q: "Quale è l'imperativo corretto davanti a un segnale di STOP? (p.105)", options: ["Go", "Stop", "Turn", "Cross"], correct: 1, tag: "Imperatives" },

  // ----- ROMANS (9) - solo vocabolario inglese + reading comprehension del testo -----
  { q: "Come si dice 'imperatore' in inglese? (vocab Romans, p.110)", options: ["museum", "emperor", "forum", "tower"], correct: 1, tag: "Romans" },
  { q: "Cosa significa 'fortresses' in italiano? (vocab Romans, p.110)", options: ["foreste", "fortezze", "ferrovie", "fontane"], correct: 1, tag: "Romans" },
  { q: "Come si dice 'anfiteatro' in inglese? (vocab Romans, p.111)", options: ["theatre", "museum", "amphitheatre", "temple"], correct: 2, tag: "Romans" },
  { q: "Cosa significa 'temple' in italiano? (vocab Romans, p.111)", options: ["torre", "foro", "tempio", "mercato"], correct: 2, tag: "Romans" },
  { q: "Come si dice 'mercato' in inglese? (vocab Romans, p.111)", options: ["forum", "tower", "market", "street"], correct: 2, tag: "Romans" },
  { q: "Cosa significa 'tower' in italiano? (vocab Romans, p.111)", options: ["tempio", "foro", "strada", "torre"], correct: 3, tag: "Romans" },
  { q: "Come si dice 'strada' in inglese? (vocab Romans, p.111)", options: ["market", "forum", "street", "tower"], correct: 2, tag: "Romans" },
  { q: "Cosa significa 'bridge' in italiano? (p.110 'build a bridge')", options: ["porta", "ponte", "strada", "torre"], correct: 1, tag: "Romans" },
  { q: "Come si dice 'esercito' in inglese? (p.110 'Claudius' army')", options: ["emperor", "animal", "army", "family"], correct: 2, tag: "Romans" }
];

// FILL THE GAP: 25 frasi del libro con buco. 100% basato su PDF Unit 5.
const FILL_GAP = [
  // ----- PLACES (5) -----
  { sentence: "Here we are in Bath, in the ___ of England. (p.98)", choices: ["north", "south", "east"], correct: 1, topic: "Places" },
  { sentence: "The hospital is in front of the ___. (p.101)", choices: ["cinema", "library", "museum"], correct: 0, topic: "Places" },
  { sentence: "People send letters from the ___. (p.112)", choices: ["library", "post office", "café"], correct: 1, topic: "Places" },
  { sentence: "People do physical exercise at the ___. (p.112)", choices: ["sports centre", "shopping centre", "museum"], correct: 0, topic: "Places" },
  { sentence: "My school is between the cinema and the Art ___. (p.101)", choices: ["museum", "library", "park"], correct: 0, topic: "Places" },

  // ----- DIRECTIONS (6) -----
  { sentence: "Excuse me, how can I get ___ the library? (p.104)", choices: ["to", "at", "in"], correct: 0, topic: "Directions" },
  { sentence: "Go straight on, then turn ___ on Victoria street. (p.111)", choices: ["right", "left", "back"], correct: 1, topic: "Directions" },
  { sentence: "At the ___ turn left. (p.103)", choices: ["traffic lights", "school", "park"], correct: 0, topic: "Directions" },
  { sentence: "Go ___ the school. (p.103)", choices: ["past", "next", "between"], correct: 0, topic: "Directions" },
  { sentence: "At the ___ turn left and go along Charles Street. (p.106)", choices: ["traffic lights", "roundabout", "crossroads"], correct: 1, topic: "Directions" },
  { sentence: "___ me, how can I get to the museum? (p.103)", choices: ["Sorry", "Excuse", "Hello"], correct: 1, topic: "Directions" },

  // ----- IMPERATIVES (4) -----
  { sentence: "___ quiet! (p.105)", choices: ["Be", "Do", "Are"], correct: 0, topic: "Imperatives" },
  { sentence: "___ go too fast! (p.105)", choices: ["Not", "Don't", "No"], correct: 1, topic: "Imperatives" },
  { sentence: "___ the door, please. (p.105)", choices: ["Open", "Opens", "Opening"], correct: 0, topic: "Imperatives" },
  { sentence: "Don't ___ the animals. (p.105)", choices: ["food", "feed", "feet"], correct: 1, topic: "Imperatives" },

  // ----- ROMANS (6) - reading comprehension del testo + vocabolario -----
  { sentence: "Read p.110: 'They start to build roads, ___ and villas.'", choices: ["fortresses", "museums", "temples"], correct: 0, topic: "Romans" },
  { sentence: "Read p.111: 'Today there are still many Roman ___ hidden around the city.'", choices: ["sites", "ships", "songs"], correct: 0, topic: "Romans" },
  { sentence: "Read p.111: 'Pretend you are at the tourist ___ office.'", choices: ["museum", "information", "shopping"], correct: 1, topic: "Romans" },
  { sentence: "Read p.111: 'Roman ___ and Forum (city hall + market place).'", choices: ["Basilica", "Tower", "Temple"], correct: 0, topic: "Romans" },
  { sentence: "Read p.111: 'Roman objects are ___ here.' (Museum of London)", choices: ["sold", "displayed", "lost"], correct: 1, topic: "Romans" },
  { sentence: "Read p.111: 'The remains of the largest ___ in Britain lie here.'", choices: ["museum", "temple", "amphitheatre"], correct: 2, topic: "Romans" }
];

// TRUE_FALSE: 20 affermazioni vero/falso. 100% basato su PDF Unit 5.
const TRUE_FALSE = [
  // ----- PLACES (4) -----
  { s: "Bath è nel sud dell'Inghilterra. (p.98)", correct: true, tag: "Places" },
  { s: "La parola inglese 'park' significa 'parco'. (p.101)", correct: true, tag: "Places" },
  { s: "'Library' significa 'libreria' (negozio di libri). (p.98 - significa biblioteca)", correct: false, tag: "Places" },
  { s: "'Post office' significa 'ufficio postale'. (p.98)", correct: true, tag: "Places" },

  // ----- DIRECTIONS (4) -----
  { s: "'Turn right' significa 'gira a destra'. (p.103)", correct: true, tag: "Directions" },
  { s: "'Go straight on' significa 'gira a sinistra'. (p.103 - significa vai dritto)", correct: false, tag: "Directions" },
  { s: "'At the roundabout' significa 'alla rotonda'. (p.103)", correct: true, tag: "Directions" },
  { s: "'Cross the road' significa 'gira a destra'. (p.103 - significa attraversa la strada)", correct: false, tag: "Directions" },

  // ----- IMPERATIVES (4) -----
  { s: "'Be quiet!' è una forma affermativa dell'imperativo. (p.105)", correct: true, tag: "Imperatives" },
  { s: "L'imperativo negativo si forma con 'Don't + verbo'. (p.105)", correct: true, tag: "Imperatives" },
  { s: "'Don't open the window!' è una forma affermativa. (p.105 - è negativa)", correct: false, tag: "Imperatives" },
  { s: "Il verbo 'feed' appare nel box degli imperativi di p.105.", correct: true, tag: "Imperatives" },

  // ----- ROMANS (5) - vocabolario inglese + reading -----
  { s: "La parola inglese 'emperor' significa 'imperatore'. (p.110)", correct: true, tag: "Romans" },
  { s: "La parola inglese 'temple' significa 'torre'. (p.111 - significa tempio)", correct: false, tag: "Romans" },
  { s: "La parola inglese 'amphitheatre' significa 'anfiteatro'. (p.111)", correct: true, tag: "Romans" },
  { s: "La parola inglese 'army' significa 'esercito'. (p.110)", correct: true, tag: "Romans" },
  { s: "La parola inglese 'fortresses' significa 'foreste'. (p.110 - significa fortezze)", correct: false, tag: "Romans" }
];

// SEQUENCE: 10 items da riordinare. items[] è l'ordine corretto, la UI mescola.
const SEQUENCE = [
  // ----- PLACES (1) -----
  {
    prompt: "Metti in ordine le frasi del dialogo iniziale a Bath (p.98-99):",
    items: ["Here we are in Bath, in the south of England.", "What a lovely town!", "Look at the map!", "There's a nice park, an important museum and a library."],
    tag: "Places"
  },

  // ----- DIRECTIONS (2) -----
  {
    prompt: "Metti in ordine i passi per andare al Tempio di Mitra (p.111):",
    items: ["Excuse me, how can I get to the Temple of Mithras?", "Go straight on,", "then turn left", "on Victoria street."],
    tag: "Directions"
  },
  {
    prompt: "Metti in ordine la richiesta di indicazioni per l'acquario (p.106):",
    items: ["Excuse me, where's the aquarium, please?", "Can we go there on foot?", "Go straight on, at the roundabout turn left", "Thank you very much."],
    tag: "Directions"
  },

  // ----- ROMANS (3) - reading order, no historical chronology -----
  {
    prompt: "Metti in ordine le frasi dell'esempio di indicazioni p.111:",
    items: ["Excuse me, how can I get to the Temple of Mithras?", "Go straight on,", "then turn left", "on Victoria street."],
    tag: "Romans"
  },
  {
    prompt: "Metti in ordine i verbi del testo p.110 (cosa fanno i Romani in Britain):",
    items: ["arrive in Britain", "build roads and fortresses", "stay in Britain", "found many towns"],
    tag: "Romans"
  },
  {
    prompt: "Metti in ordine le parole del box 'Walking around Londinium' p.111:",
    items: ["Amphitheatre", "street", "market", "Temple"],
    tag: "Romans"
  },

];

// MATCHING: pool da cui peschiamo 6 coppie random
const MATCHING_POOL = [
  ...TOPICS.places.items,
  ...TOPICS.directions.items.slice(0, 8),
  ...TOPICS.romans.items.slice(0, 6)
];

const FUN_FACTS = [
  "'Library' in inglese significa 'biblioteca'. Attenzione: NON 'libreria'! Si dice 'bookshop'. 📚",
  "Per chiedere indicazioni si usa: 'Excuse me, how can I get to...?' 🧭",
  "L'imperativo negativo in inglese si forma con 'Don't + verbo': 'Don't open the window!' 🚫",
  "'Turn left' = gira a sinistra · 'Turn right' = gira a destra · 'Go straight on' = vai dritto. 🔄",
  "Imperativi affermativi: Cross the road / Be quiet / Open the door. Si usano per dare ordini! 📣",
  "Imperative = ordine. \"Be quiet!\" significa \"Stai zitto!\" 🤫",
  "\"Opposite\" significa \"di fronte a\", non \"opposto\" come potresti pensare! 🔄",
  "'Cross the road' significa 'attraversa la strada'. È un imperativo affermativo. 🚶"
];
