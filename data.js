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

// QUIZ: ogni item ha tag (uno dei 5 TOPIC_KEYS). L'indice nell'array è l'ID stabile.
const QUIZ = [
  // Places (8)
  { q: "Where can you borrow a book?", options: ["library", "café", "bus stop", "hospital"], correct: 0, tag: "Places" },
  { q: "Where do you watch a play?", options: ["museum", "theatre", "park", "bank"], correct: 1, tag: "Places" },
  { q: "Where do you see fish?", options: ["library", "aquarium", "post office", "school"], correct: 1, tag: "Places" },
  { q: "Where do you go if you are ill?", options: ["sports centre", "café", "hospital", "theatre"], correct: 2, tag: "Places" },
  { q: "Where do you send a letter from?", options: ["bank", "post office", "park", "library"], correct: 1, tag: "Places" },
  { q: "Where do you watch a film?", options: ["museum", "cinema", "theatre", "hospital"], correct: 1, tag: "Places" },
  { q: "What's a 'chemist's'?", options: ["farmacia", "banca", "tabaccheria", "cinema"], correct: 0, tag: "Places" },
  { q: "Come si dice 'fermata dell'autobus'?", options: ["car park", "bus stop", "train station", "taxi"], correct: 1, tag: "Places" },

  // Directions (5)
  { q: "How do you say 'gira a sinistra'?", options: ["turn right", "turn left", "go straight", "cross"], correct: 1, tag: "Directions" },
  { q: "'Cross the road' significa...", options: ["gira la strada", "attraversa la strada", "raggiungi la strada", "cerca la strada"], correct: 1, tag: "Directions" },
  { q: "Cos'è un 'roundabout'?", options: ["incrocio", "rotatoria", "semaforo", "passaggio pedonale"], correct: 1, tag: "Directions" },
  { q: "If the café is 'opposite' the bank, the café is...", options: ["accanto alla banca", "di fronte alla banca", "dietro alla banca", "dentro la banca"], correct: 1, tag: "Directions" },
  { q: "How do you say 'davanti a'?", options: ["behind", "between", "in front of", "next to"], correct: 2, tag: "Directions" },

  // Imperatives (3)
  { q: "How do you tell someone NOT to be loud?", options: ["Be quiet!", "Quiet you!", "No loud!", "Silent!"], correct: 0, tag: "Imperatives" },
  { q: "Forma negativa di 'Open the door': ___ the door.", options: ["No open", "Don't open", "Doesn't open", "Not open"], correct: 1, tag: "Imperatives" },
  { q: "Quale è un imperativo corretto?", options: ["You go straight on", "Going straight on", "Go straight on", "Goes straight on"], correct: 2, tag: "Imperatives" },

  // Romans (3)
  { q: "Chi portò i Romani in Britain nel 55 BC?", options: ["Hadrian", "Julius Caesar", "Augustus", "Nero"], correct: 1, tag: "Romans" },
  { q: "What's the Roman name for London?", options: ["Londinium", "Britannia", "Bath", "York"], correct: 0, tag: "Romans" },
  { q: "Quale imperatore romano arrivò in Britain nel 43 AD?", options: ["Julius Caesar", "Augustus", "Claudius", "Nero"], correct: 2, tag: "Romans" },

  // Baths (1)
  { q: "Alle terme romane, dopo i changing rooms, qual è l'ordine delle sale?", options: ["hot → cold → warm", "cold → warm → hot", "warm → hot → cold", "hot → warm → cold"], correct: 3, tag: "Baths" },

  // ===== Aggiunte v3: 15 domande extra =====
  // Romans (8)
  { q: "What did the Romans build across Britain to connect their towns?", options: ["Castles", "Roads", "Cathedrals", "Bridges only"], correct: 1, tag: "Romans" },
  { q: "Come si dice 'tempio' in inglese (vocabolario Romans)?", options: ["tower", "temple", "forum", "market"], correct: 1, tag: "Romans" },
  { q: "Cos'era il forum nelle città romane?", options: ["una sala da bagno", "il mercato e luogo d'incontro", "un tempio", "un anfiteatro"], correct: 1, tag: "Romans" },
  { q: "What does 'AD' stand for in dates like AD 122?", options: ["After Death", "Anno Domini", "Ancient Days", "All Date"], correct: 1, tag: "Romans" },
  { q: "Perché i Romani costruivano le fortezze (fortresses) attorno alle città?", options: ["per decorazione", "per attirare turisti", "per protezione", "per conservare l'acqua"], correct: 2, tag: "Romans" },
  { q: "In quale città inglese c'è un Roman Amphitheatre famoso?", options: ["Bath", "Chester", "York", "Lancaster"], correct: 1, tag: "Romans" },
  { q: "Come si dice 'mercato' in inglese (vocabolario Romans)?", options: ["forum", "tower", "market", "street"], correct: 2, tag: "Romans" },
  { q: "Su quale fiume i Romani fondarono Londinium nel 43 AD?", options: ["The Po", "The Tiber", "The Thames", "The Nile"], correct: 2, tag: "Romans" },

  // Baths (2)
  { q: "Quando arrivi alle terme romane, dove vai per PRIMA cosa?", options: ["The cold room", "The changing rooms", "The warm room", "The hot room"], correct: 1, tag: "Baths" },
  { q: "Nella hot room delle terme, cosa dicono i bambini perché fa caldissimo?", options: ["\"I'm cold!\"", "\"I'm sleepy!\"", "\"It's so hot!\"", "\"I'm hungry!\""], correct: 2, tag: "Baths" },

  // Directions (3)
  { q: "In the dialogue 'The library is ___ the bank', which word fits?", options: ["between", "opposite", "behind", "under"], correct: 1, tag: "Directions" },
  { q: "Which traffic feature has cars going in a circle?", options: ["Traffic lights", "Crossroads", "Roundabout", "Pavement"], correct: 2, tag: "Directions" },
  { q: "Per la sicurezza in bicicletta servono...", options: ["a phone and a map", "a helmet, a bell, a light", "a hat and a scarf", "a backpack only"], correct: 1, tag: "Directions" },

  // Imperatives (2)
  { q: "What's the imperative form for a 'no parking' sign?", options: ["Don't stop", "Don't park", "Don't turn", "Don't go"], correct: 1, tag: "Imperatives" },
  { q: "Which negative imperative tells you not to give food to animals at the zoo?", options: ["Don't touch the animals", "Don't feed the animals", "Don't cross the animals", "Don't stop the animals"], correct: 1, tag: "Imperatives" }
];

// FILL THE GAP: topic ora allineato a TOPIC_KEYS (5 categorie)
const FILL_GAP = [
  { sentence: "___ the door, please.", choices: ["Open", "Opens", "Opening"], correct: 0, topic: "Imperatives" },
  { sentence: "___ go too fast on your bike!", choices: ["No", "Don't", "Not"], correct: 1, topic: "Imperatives" },
  { sentence: "The library is ___ the museum.", choices: ["opposite", "fast", "very"], correct: 0, topic: "Directions" },
  { sentence: "The café is ___ the bank and the school.", choices: ["near", "between", "behind"], correct: 1, topic: "Directions" },
  { sentence: "Excuse me, ___ is the aquarium?", choices: ["what", "where", "when"], correct: 1, topic: "Directions" },
  { sentence: "Go straight on, then ___ left at the traffic lights.", choices: ["turn", "go", "cross"], correct: 0, topic: "Directions" },
  { sentence: "The Roman emperor ___ came to Britain in AD 43.", choices: ["Caesar", "Claudius", "Hadrian"], correct: 1, topic: "Romans" },
  { sentence: "In the Roman baths, you relax in the ___ room.", choices: ["hot", "noisy", "fast"], correct: 0, topic: "Baths" },
  { sentence: "How can I ___ to the hospital?", choices: ["go", "get", "do"], correct: 1, topic: "Directions" },
  { sentence: "___ the road carefully!", choices: ["Cross", "Crossing", "Crossed"], correct: 0, topic: "Imperatives" },
  // Places aggiunti per copertura
  { sentence: "I want to buy bread. Let's go to the ___.", choices: ["supermarket", "library", "hospital"], correct: 0, topic: "Places" },
  { sentence: "I'm ill — I need to go to the ___.", choices: ["theatre", "museum", "hospital"], correct: 2, topic: "Places" },
  { sentence: "I want to see a play tonight at the ___.", choices: ["theatre", "bank", "park"], correct: 0, topic: "Places" },

  // ===== Aggiunte v3: 8 frasi extra =====
  { sentence: "Excuse me, how ___ I get to the museum?", choices: ["can", "do", "am"], correct: 0, topic: "Directions" },
  { sentence: "___ past the chemist's and turn left.", choices: ["Go", "Goes", "Going"], correct: 0, topic: "Directions" },
  { sentence: "At the traffic lights, ___ straight on.", choices: ["go", "going", "goes"], correct: 0, topic: "Directions" },
  { sentence: "In ___ 43 the Emperor Claudius came to Britain.", choices: ["BC", "AD", "AC"], correct: 1, topic: "Romans" },
  { sentence: "The Romans started to build roads, fortresses and ___ baths.", choices: ["cold", "thermal", "hot"], correct: 1, topic: "Romans" },
  { sentence: "In the cold room of the baths, the water is so ___.", choices: ["hot", "cold", "warm"], correct: 1, topic: "Baths" },
  { sentence: "___ open the door, please!", choices: ["Don't", "No", "Not"], correct: 0, topic: "Imperatives" },
  { sentence: "How can I ___ to the chemist's, please?", choices: ["go", "get", "do"], correct: 1, topic: "Directions" }
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
  "L'imperatore Claudio conquistò davvero la Britain nel 43 d.C. 👑",
  "Londinium era il nome romano di Londra. 🏛️",
  "Nelle terme romane c'erano tre sale: hot, warm e cold. 🔥🌡️❄️",
  "Imperative = ordine. \"Be quiet!\" significa \"Stai zitto!\" 🤫",
  "\"Opposite\" significa \"di fronte a\", non \"opposto\" come potresti pensare! 🔄",
  "I Romani costruirono molte strade lastricate ancora visibili oggi! 🛣️"
];
