// Unit 5 - "Bath, here we come!" - Hello World, Classe 5
// Tutti i contenuti del capitolo divisi per topic

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
      { en: "supermarket", it: "supermercato", emoji: "🏪" },
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
      { en: "fortifications", it: "fortificazioni", emoji: "🏰" },
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
      { en: "cool room", it: "sala fredda (frigidarium)", emoji: "❄️" },
      { en: "changing rooms", it: "spogliatoi", emoji: "👕" },
      { en: "scared", it: "spaventato", emoji: "😨" },
      { en: "Roman baths", it: "terme romane", emoji: "♨️" }
    ]
  }
};

// QUIZ: 20 domande mix su tutti i topic
const QUIZ = [
  // Places (8 domande)
  { q: "Where can you borrow a book?", options: ["library", "café", "bus stop", "hospital"], correct: 0, tag: "Places" },
  { q: "Where do you watch a play?", options: ["museum", "theatre", "park", "bank"], correct: 1, tag: "Places" },
  { q: "Where do you see fish?", options: ["library", "aquarium", "post office", "school"], correct: 1, tag: "Places" },
  { q: "Where do you go if you are ill?", options: ["sports centre", "café", "hospital", "theatre"], correct: 2, tag: "Places" },
  { q: "Where do you send a letter from?", options: ["bank", "post office", "park", "library"], correct: 1, tag: "Places" },
  { q: "Where do you buy food?", options: ["museum", "supermarket", "theatre", "hospital"], correct: 1, tag: "Places" },
  { q: "What's a 'chemist's'?", options: ["farmacia", "banca", "tabaccheria", "cinema"], correct: 0, tag: "Places" },
  { q: "Come si dice 'fermata dell'autobus'?", options: ["car park", "bus stop", "train station", "taxi"], correct: 1, tag: "Places" },

  // Directions (5 domande)
  { q: "How do you say 'gira a sinistra'?", options: ["turn right", "turn left", "go straight", "cross"], correct: 1, tag: "Directions" },
  { q: "'Cross the road' significa...", options: ["gira la strada", "attraversa la strada", "raggiungi la strada", "cerca la strada"], correct: 1, tag: "Directions" },
  { q: "Cos'è un 'roundabout'?", options: ["incrocio", "rotatoria", "semaforo", "passaggio pedonale"], correct: 1, tag: "Directions" },
  { q: "If the café is 'opposite' the bank, the café is...", options: ["accanto alla banca", "di fronte alla banca", "dietro alla banca", "dentro la banca"], correct: 1, tag: "Directions" },
  { q: "How do you say 'davanti a'?", options: ["behind", "between", "in front of", "next to"], correct: 2, tag: "Directions" },

  // Imperatives (3 domande)
  { q: "How do you tell someone NOT to be loud?", options: ["Be quiet!", "Quiet you!", "No loud!", "Silent!"], correct: 0, tag: "Imperatives" },
  { q: "Forma negativa di 'Open the door': ___ the door.", options: ["No open", "Don't open", "Doesn't open", "Not open"], correct: 1, tag: "Imperatives" },
  { q: "Quale è un imperativo corretto?", options: ["You go straight on", "Going straight on", "Go straight on", "Goes straight on"], correct: 2, tag: "Imperatives" },

  // Romans (3 domande)
  { q: "Chi portò i Romani in Britain nel 55 BC?", options: ["Hadrian", "Julius Caesar", "Augustus", "Nero"], correct: 1, tag: "Romans" },
  { q: "What's the Roman name for London?", options: ["Londinium", "Britannia", "Bath", "York"], correct: 0, tag: "Romans" },
  { q: "Hadrian's Wall was built in...", options: ["55 BC", "122 AD", "1066 AD", "476 AD"], correct: 1, tag: "Romans" },

  // Baths (1 domanda)
  { q: "Qual è l'ordine delle sale alle terme romane?", options: ["hot → cool → warm", "cool → warm → hot", "warm → hot → cool", "hot → warm → cool"], correct: 2, tag: "Baths" }
];

// FILL THE GAP: completa la frase scegliendo la parola giusta
const FILL_GAP = [
  { sentence: "___ the door, please.", choices: ["Open", "Opens", "Opening"], correct: 0, topic: "Imperatives" },
  { sentence: "___ go too fast on your bike!", choices: ["No", "Don't", "Not"], correct: 1, topic: "Imperatives" },
  { sentence: "The library is ___ the museum.", choices: ["opposite", "fast", "very"], correct: 0, topic: "Prepositions" },
  { sentence: "The café is ___ the bank and the school.", choices: ["near", "between", "behind"], correct: 1, topic: "Prepositions" },
  { sentence: "Excuse me, ___ is the aquarium?", choices: ["what", "where", "when"], correct: 1, topic: "Questions" },
  { sentence: "Go straight on, then ___ left at the traffic lights.", choices: ["turn", "go", "cross"], correct: 0, topic: "Directions" },
  { sentence: "Hadrian's Wall is in the ___ of England.", choices: ["south", "east", "north"], correct: 2, topic: "Romans" },
  { sentence: "In the Roman baths, you relax in the ___ room.", choices: ["hot", "noisy", "fast"], correct: 0, topic: "Baths" },
  { sentence: "How can I ___ to the hospital?", choices: ["go", "get", "do"], correct: 1, topic: "Questions" },
  { sentence: "___ the road carefully!", choices: ["Cross", "Crossing", "Crossed"], correct: 0, topic: "Imperatives" }
];

// MATCHING: coppie immagine ↔ parola (sceglie 6 random ad ogni partita)
const MATCHING_POOL = [
  ...TOPICS.places.items,
  ...TOPICS.directions.items.slice(0, 8),
  ...TOPICS.romans.items.slice(0, 6)
];

// FUN FACT card mostrata in home (random ogni apertura)
const FUN_FACTS = [
  "Bath è una città dell'Inghilterra famosa per le sue terme romane! 🏛️♨️",
  "I Romani arrivarono in Britain con Giulio Cesare nel 55 a.C. ⚔️",
  "Hadrian's Wall è lungo 117 km e ha quasi 2000 anni! 🧱",
  "Londinium era il nome romano di Londra. 🏛️",
  "Nelle terme romane c'erano tre sale: hot, warm e cool. 🔥🌡️❄️",
  "Imperative = ordine. \"Be quiet!\" significa \"Stai zitto!\" 🤫",
  "\"Opposite\" significa \"di fronte a\", non \"opposto\" come potresti pensare! 🔄",
  "Manchester, York, Chester e Lancaster sono tutte città fondate dai Romani! 🇮🇹➡️🇬🇧"
];
