// Unit 5 - "Bath, here we come!" - Hello World, Classe 5
// Topic normalizzati (5): Places, Directions, Imperatives, Romans, Baths

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
      { en: "BC = Before Christ", it: "a.C. = avanti Cristo", emoji: "⏪" },
      { en: "AD = Anno Domini", it: "d.C. = dopo Cristo", emoji: "⏩" }
    ]
  },
  baths: {
    title: "Roman Baths",
    emoji: "♨️",
    color: "#06b6d4",
    items: [
      { en: "hot room", it: "sala calda (calidarium)", emoji: "🔥" },
      { en: "warm room", it: "sala tiepida (tepidarium)", emoji: "🌡️" },
      { en: "cold room", it: "sala fredda (frigidarium)", emoji: "❄️" },
      { en: "changing rooms", it: "spogliatoi", emoji: "👕" },
      { en: "Roman baths", it: "terme romane", emoji: "♨️" }
    ]
  }
};

// I 5 topic ufficiali per tracking/adaptive/report
const TOPIC_KEYS = ["Places", "Directions", "Imperatives", "Romans", "Baths"];
const TOPIC_META = {
  "Places":     { emoji: "🏙️", color: "#7c3aed" },
  "Directions": { emoji: "🧭", color: "#0ea5e9" },
  "Imperatives":{ emoji: "📣", color: "#f59e0b" },
  "Romans":     { emoji: "🏛️", color: "#dc2626" },
  "Baths":      { emoji: "♨️", color: "#06b6d4" }
};

// QUIZ: 35 items a scelta multipla (4 opzioni, 1 corretta). 100% basato su PDF Unit 5.
// Tag valori: "Places" | "Directions" | "Imperatives" | "Romans" | "Baths"
const QUIZ = [
  // ----- PLACES (8) -----
  { q: "Come si dice 'biblioteca' in inglese? (p.98)", options: ["library", "museum", "theatre", "bank"], correct: 0, tag: "Places" },
  { q: "Where do people go to borrow or read books? (p.112)", options: ["sports centre", "library", "post office", "café"], correct: 1, tag: "Places" },
  { q: "Come si dice 'ufficio postale' in inglese? (p.98)", options: ["post office", "shopping centre", "bus stop", "hospital"], correct: 0, tag: "Places" },
  { q: "Where do people watch plays? (p.112)", options: ["museum", "café", "theatre", "sports centre"], correct: 2, tag: "Places" },
  { q: "Cosa significa 'shopping centre'? (p.98)", options: ["centro sportivo", "centro commerciale", "fermata dell'autobus", "ospedale"], correct: 1, tag: "Places" },
  { q: "Where can people see ancient statues or paintings? (p.112)", options: ["museum", "library", "park", "bank"], correct: 0, tag: "Places" },
  { q: "Bath is famous for its... (p.99)", options: ["shopping centres", "Roman baths", "theatres", "aquariums"], correct: 1, tag: "Places" },
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

  // ----- ROMANS (9) -----
  { q: "Da quale parola latina deriva il suffisso -chester? (p.110)", options: ["villa", "castrum", "forum", "thermae"], correct: 1, tag: "Romans" },
  { q: "Cosa significa 'castrum' in latino? (p.110)", options: ["acqua", "città", "fortificazione", "strada"], correct: 2, tag: "Romans" },
  { q: "Quale generale guidò i Romani in Britannia nel 55 BC? (p.110)", options: ["Emperor Claudius", "Julius Caesar", "Augustus", "Hadrian"], correct: 1, tag: "Romans" },
  { q: "Per quanti anni rimasero i Romani in Britannia? (p.110)", options: ["circa 100 anni", "circa 200 anni", "circa 400 anni", "circa 500 anni"], correct: 2, tag: "Romans" },
  { q: "Quale imperatore fece costruire un ponte e una città sul fiume Thames nel 43 AD? (p.110)", options: ["Julius Caesar", "Emperor Claudius", "Augustus", "Nerone"], correct: 1, tag: "Romans" },
  { q: "Cosa significa l'abbreviazione 'BC'? (p.110)", options: ["Before Christ", "Britain Country", "British Calendar", "Before Caesar"], correct: 0, tag: "Romans" },
  { q: "Cosa significa l'abbreviazione 'AD'? (p.110)", options: ["After Death", "Ancient Days", "Anno Domini", "After Domitian"], correct: 2, tag: "Romans" },
  { q: "Da quale parola deriva il nome 'Britain'? (p.110)", options: ["Britannia", "Britain", "Britanno", "Brigantia"], correct: 0, tag: "Romans" },
  { q: "Quale di queste città NON è citata tra quelle romane a p.110?", options: ["York", "Bath", "Winchester", "Liverpool"], correct: 3, tag: "Romans" },

  // ----- BATHS (5) -----
  { q: "Come si dice 'spogliatoi' in inglese? (p.108)", options: ["hot room", "warm room", "changing rooms", "cold room"], correct: 2, tag: "Baths" },
  { q: "Qual è la prima sala dopo gli spogliatoi nelle terme romane? (p.109)", options: ["cold room", "hot room", "warm room", "changing rooms"], correct: 1, tag: "Baths" },
  { q: "Quale è l'ultima sala visitata nelle terme romane? (p.109)", options: ["hot room", "warm room", "cold room", "changing rooms"], correct: 2, tag: "Baths" },
  { q: "Cosa significa 'warm room'? (p.109)", options: ["sala calda", "sala tiepida", "sala fredda", "spogliatoi"], correct: 1, tag: "Baths" },
  { q: "In quale città ambientata in tempo romano si svolge la storia delle terme? (p.108)", options: ["London", "York", "Bath", "Manchester"], correct: 2, tag: "Baths" }
];

// FILL THE GAP: 25 frasi del libro con buco. 100% basato su PDF Unit 5.
const FILL_GAP = [
  // ----- PLACES (5) -----
  { sentence: "Here we are in Bath, in the ___ of England. (p.98)", choices: ["north", "south", "east"], correct: 1, topic: "Places" },
  { sentence: "Bath is famous for its Roman ___. (p.99)", choices: ["baths", "museums", "parks"], correct: 0, topic: "Places" },
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

  // ----- ROMANS (6) -----
  { sentence: "When the Romans arrive in Britain in 55 BC, they are led by ___. (p.110)", choices: ["Emperor Claudius", "Julius Caesar", "Hadrian"], correct: 1, topic: "Romans" },
  { sentence: "The Romans stay in Britain for almost ___ years. (p.110)", choices: ["100", "200", "400"], correct: 2, topic: "Romans" },
  { sentence: "In 43 AD Emperor Claudius' army build a town on the river Thames and call it ___. (p.110)", choices: ["Londinium", "Britannia", "Eboracum"], correct: 0, topic: "Romans" },
  { sentence: "The name Britain comes from ___, the name given by the Romans. (p.110)", choices: ["Britannia", "Castrum", "Forum"], correct: 0, topic: "Romans" },
  { sentence: "The Romans build roads, fortresses, villas and ___. (p.110)", choices: ["thermal baths", "amphitheatres", "temples"], correct: 0, topic: "Romans" },
  { sentence: "The names ending in -chester, -cester or -caster derive from the Latin word ___. (p.110)", choices: ["forum", "castrum", "thermae"], correct: 1, topic: "Romans" },

  // ----- BATHS (4) -----
  { sentence: "Please go to the ___ rooms. (p.108)", choices: ["changing", "hot", "cold"], correct: 0, topic: "Baths" },
  { sentence: "I'm melting, it's so ___! (p.109)", choices: ["cold", "warm", "hot"], correct: 2, topic: "Baths" },
  { sentence: "Brr... it's so ___! (p.109)", choices: ["hot", "cold", "warm"], correct: 1, topic: "Baths" },
  { sentence: "The water is ___. I like it! (p.109 - warm room)", choices: ["hot", "warm", "cold"], correct: 1, topic: "Baths" }
];

// TRUE_FALSE: 20 affermazioni vero/falso. 100% basato su PDF Unit 5.
const TRUE_FALSE = [
  // ----- PLACES (4) -----
  { s: "Bath è nel sud dell'Inghilterra. (p.98)", correct: true, tag: "Places" },
  { s: "Bath è famosa per le sue terme romane. (p.99)", correct: true, tag: "Places" },
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

  // ----- ROMANS (5) -----
  { s: "I Romani arrivarono in Britannia nel 55 BC guidati da Julius Caesar. (p.110)", correct: true, tag: "Romans" },
  { s: "I Romani rimasero in Britannia per circa 100 anni. (p.110 - rimasero quasi 400 anni)", correct: false, tag: "Romans" },
  { s: "La parola latina 'castrum' significa 'acqua'. (p.110 - significa fortificazione)", correct: false, tag: "Romans" },
  { s: "York, Bath e Winchester sono città fondate dai Romani. (p.110)", correct: true, tag: "Romans" },
  { s: "Londinium è il nome che i Romani diedero a una città sul fiume Thames. (p.110)", correct: true, tag: "Romans" },

  // ----- BATHS (3) -----
  { s: "Nelle terme romane si entra prima nella cold room. (p.109 - prima nella hot room)", correct: false, tag: "Baths" },
  { s: "Le terme romane avevano hot room, warm room e cold room (oltre agli spogliatoi). (p.109)", correct: true, tag: "Baths" },
  { s: "Nella hot room si dice 'I'm melting, it's so hot!'. (p.109)", correct: true, tag: "Baths" }
];

// SEQUENCE: 10 items da riordinare. items[] è l'ordine corretto, la UI mescola.
const SEQUENCE = [
  // ----- PLACES (1) -----
  {
    prompt: "Metti in ordine le frasi del dialogo iniziale a Bath (p.98-99):",
    items: ["Here we are in Bath, in the south of England.", "What a lovely town!", "Bath is famous for its Roman baths.", "Look at the map!"],
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

  // ----- ROMANS (3) -----
  {
    prompt: "Metti in ordine cronologico gli eventi della storia romana in Britannia (p.110-111):",
    items: ["55 BC: Julius Caesar arrives in Britain", "43 AD: Emperor Claudius' army builds a town on the Thames", "50 AD: Londinium is founded", "After almost 400 years the Romans leave Britain"],
    tag: "Romans"
  },
  {
    prompt: "Metti in ordine le frasi del testo 'Roads to Rome' (p.110):",
    items: ["The name Britain comes from Britannia.", "The Romans arrive in Britain in 55 BC.", "They build roads, fortresses, villas and thermal baths.", "They stay for almost 400 years."],
    tag: "Romans"
  },
  {
    prompt: "Metti in ordine le cose che i Romani costruirono in Britannia (p.110):",
    items: ["roads", "fortresses", "villas", "thermal baths"],
    tag: "Romans"
  },

  // ----- BATHS (4) -----
  {
    prompt: "Metti in ordine le sale delle terme romane (p.108-109):",
    items: ["changing rooms", "hot room", "warm room", "cold room"],
    tag: "Baths"
  },
  {
    prompt: "Metti in ordine le frasi all'arrivo alle terme (p.108):",
    items: ["Where are we?", "In the town of Bath, in Ancient Roman times!", "Look! They're going into the baths.", "Welcome! Please go to the changing rooms."],
    tag: "Baths"
  },
  {
    prompt: "Metti in ordine le frasi finali della visita alle terme (p.109):",
    items: ["And now relax.", "Thank you very much!", "We feel great now!", "Time to go back to our times!"],
    tag: "Baths"
  },
  {
    prompt: "Metti in ordine le frasi della cold room (p.109):",
    items: ["Brr... it's so cold!", "Not for me. I like this room.", "Me too.", "And now relax."],
    tag: "Baths"
  }
];

// MATCHING: pool da cui peschiamo 6 coppie random
const MATCHING_POOL = [
  ...TOPICS.places.items,
  ...TOPICS.directions.items.slice(0, 8),
  ...TOPICS.romans.items.slice(0, 6)
];

const FUN_FACTS = [
  "Bath è una città dell'Inghilterra famosa per le sue terme romane! 🏛️♨️",
  "I Romani arrivarono in Britain con Giulio Cesare nel 55 a.C. ⚔️",
  "L'imperatore Claudio arrivò in Britain nel 43 d.C. e fondò Londinium. 👑",
  "Londinium era il nome romano di Londra. 🏛️",
  "Nelle terme romane c'erano tre sale: hot, warm e cold. 🔥🌡️❄️",
  "Imperative = ordine. \"Be quiet!\" significa \"Stai zitto!\" 🤫",
  "\"Opposite\" significa \"di fronte a\", non \"opposto\" come potresti pensare! 🔄",
  "In Britain i Romani costruirono roads, fortresses, villas e thermal baths! 🛣️🏰"
];
