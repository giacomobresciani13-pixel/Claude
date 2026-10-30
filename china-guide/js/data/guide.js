// Guida interattiva al setup. Ogni step ha task spuntabili e i problemi più comuni.
// phase: before = prima di partire, arrival = all'arrivo, hk = solo Hong Kong
// Le regole (visti, commissioni, app) cambiano spesso: vedi il campo "verify".

window.GUIDE = [
  {
    id: "visa", phase: "before", icon: "🛂", title: "Visto e documenti",
    why: "Senza il documento giusto non sali sull'aereo.",
    tasks: [
      "Verifica se il tuo passaporto rientra nell'ingresso senza visto (per l'Italia: fino a 30 giorni, politica prorogata più volte)",
      "Passaporto valido almeno 6 mesi oltre il rientro, con 2 pagine libere",
      "Se resti più a lungo o viaggi per lavoro: richiedi il visto al Chinese Visa Application Service Center",
      "Compila l'arrival card (online o cartacea in aeroporto)",
      "Salva una foto del passaporto in Files/Drive offline"
    ],
    problems: [
      { q: "Entro da Hong Kong: conta come uscita dalla Cina?", a: "Sì. Hong Kong ha un confine separato: ogni passaggio HK ↔ Shenzhen è un'uscita e un nuovo ingresso nella Cina continentale. Contalo nei giorni del visto." },
      { q: "Alcuni hotel non mi accettano", a: "Non tutti gli hotel hanno la licenza per ospitare stranieri. Prenota su Trip.com o Booking e, nel dubbio, scrivi all'hotel prima." }
    ],
    verify: "Controlla sempre su viaggiaresicuri.it e sul sito dell'Ambasciata cinese prima di partire."
  },
  {
    id: "internet", phase: "before", icon: "📶", title: "Internet (eSIM) e Great Firewall",
    why: "Google, WhatsApp, Instagram e Gmail sono bloccati con una rete cinese.",
    tasks: [
      "Verifica che il telefono supporti l'eSIM",
      "Compra un'eSIM per la Cina (Airalo, Holafly, Nomad…) o attiva il roaming del tuo operatore: il traffico esce all'estero e Google/WhatsApp funzionano",
      "Installa l'eSIM a casa con il Wi-Fi, ma attivala solo all'atterraggio",
      "Scarica le mappe offline di Google e la lingua cinese offline di Google Traduttore",
      "Scarica PRIMA di partire tutte le app di questa guida: alcune non si trovano più dopo"
    ],
    problems: [
      { q: "Sul Wi-Fi dell'hotel WhatsApp non va", a: "Normale: il Wi-Fi è una rete cinese. Disattiva il Wi-Fi e usa i dati dell'eSIM." },
      { q: "Mi serve un numero cinese?", a: "Quasi mai. Alipay, WeChat, Didi e Trip.com funzionano con il numero italiano. Se vuoi un numero locale serve il passaporto in un negozio China Mobile/Unicom." }
    ],
    verify: "Controlla i GB inclusi: Amap e i video consumano molto."
  },
  {
    id: "alipay", phase: "before", icon: "💳", title: "Alipay (支付宝) — l'app più importante",
    why: "Paghi tutto: ristoranti, metro, taxi, bancarelle. Molti posti non accettano carte né contanti in fretta.",
    tasks: [
      "Scarica Alipay e registrati con il numero italiano (+39)",
      "Verifica l'identità caricando il passaporto",
      "Collega una carta Visa/Mastercard (meglio due carte diverse)",
      "Fai una prova: cerca 'Transport' e attiva il codice metro della prima città",
      "Imposta l'inglese: Me → Settings → General → Language"
    ],
    problems: [
      { q: "Il pagamento viene rifiutato", a: "Spesso è la tua banca che blocca la transazione estera: avvisala prima di partire e abilita i pagamenti online/estero. Prova la seconda carta." },
      { q: "Ci sono commissioni?", a: "Di norma nessuna sotto i 200 CNY a transazione; sopra c'è una commissione (circa 3%). Verifica le condizioni aggiornate in app." },
      { q: "Il negozio vuole scansionare il MIO codice", a: "Apri Alipay → Pay/Receive → mostra il codice a barre. Se invece c'è un QR sul bancone, sei tu a scansionarlo con 'Scan'." }
    ],
    verify: "Dentro Alipay trovi anche Didi, la metro e la traduzione: cercali con la barra di ricerca."
  },
  {
    id: "wechat", phase: "before", icon: "💬", title: "WeChat (微信) e WeChat Pay",
    why: "È il WhatsApp cinese: hotel, guide e negozi ti scriveranno lì. Molti ristoranti fanno ordinare via QR in WeChat.",
    tasks: [
      "Scarica WeChat e registrati con il numero +39",
      "Se chiede la verifica da un altro utente: fatti aiutare da un amico che ha WeChat da più di 6 mesi (scansiona il QR)",
      "Me → Services → Wallet → aggiungi la carta Visa/Mastercard",
      "Verifica l'identità con il passaporto nel Wallet",
      "Impara la funzione 'Scan' (+ in alto a destra): la userai per i menu QR"
    ],
    problems: [
      { q: "L'account viene bloccato appena creato", a: "Succede ai nuovi account esteri. Segui la procedura di sblocco con un amico, e nei primi giorni non aggiungere troppi contatti." },
      { q: "Il ristorante vuole che ordini col QR", a: "Scansiona con WeChat (o Alipay): si apre un mini-programma. Usa la traduzione della pagina o mostra al cameriere i piatti sulla guida." }
    ],
    verify: "Se hai solo Alipay sopravvivi lo stesso; WeChat è il piano B e serve per comunicare."
  },
  {
    id: "maps", phase: "before", icon: "🗺️", title: "Mappe: Amap (高德地图) e Apple Maps",
    why: "Google Maps in Cina è impreciso: i pin sono sfasati di centinaia di metri (sistema GCJ-02).",
    tasks: [
      "Scarica Amap (Gaode) e imposta la lingua inglese",
      "Su iPhone: Apple Maps in Cina usa i dati Amap ed è affidabile",
      "Impara a cercare in cinese: copia il nome 中文 dalla scheda del luogo in questa app",
      "Prova il pulsante 'Apri in Amap' da un luogo di questa app: le coordinate sono già convertite",
      "Per Hong Kong usa normalmente Google Maps"
    ],
    problems: [
      { q: "Il pin di Google è nel posto sbagliato", a: "È l'offset GCJ-02. Questa app converte automaticamente le coordinate quando apri Amap o Didi." },
      { q: "A Chongqing il navigatore mi porta in un muro", a: "Chongqing è su più livelli: l'ingresso può essere 5 piani sopra o sotto. Usa la mappa 3D e chiedi 'ingresso' (入口 rùkǒu)." }
    ],
    verify: "Su Amap la ricerca in cinese è molto più precisa di quella in inglese."
  },
  {
    id: "didi", phase: "before", icon: "🚕", title: "Didi (taxi e auto con autista)",
    why: "L'Uber cinese: prezzi bassi, tradotto in inglese, nessuna trattativa.",
    tasks: [
      "Usa Didi dentro Alipay (cerca 'DiDi') oppure scarica l'app DiDi",
      "Collega il pagamento (Alipay o carta)",
      "Inserisci la destinazione copiando il nome cinese del luogo",
      "Controlla la targa prima di salire: è scritta nell'app",
      "Usa il pulsante 'Mostra al tassista' di questa app per i taxi presi per strada"
    ],
    problems: [
      { q: "L'autista mi chiama ma non parlo cinese", a: "Usa la chat di Didi: traduce automaticamente. Oppure scrivi 'I'm at the gate' con la traduzione integrata." },
      { q: "Taxi in strada senza app", a: "Mostra il nome del luogo in cinese a schermo intero. Paga col QR dell'autista o in contanti." }
    ],
    verify: "Negli aeroporti segui i cartelli 'Online car-hailing' (网约车) per il punto di ritiro Didi."
  },
  {
    id: "trains", phase: "before", icon: "🚄", title: "Treni ad alta velocità",
    why: "Il modo migliore per muoversi tra le tue città (Xi'an ↔ Chengdu ~3h, Chengdu ↔ Chongqing ~1h15).",
    tasks: [
      "Scarica Trip.com (più semplice) o l'app ufficiale 12306 (inglese, nessuna commissione)",
      "Registra il passaporto: il biglietto è collegato al documento",
      "Prenota presto per festività e weekend (si apre ~15 giorni prima)",
      "Il giorno del treno: arriva 45–60 min prima, ci sono controlli tipo aeroporto",
      "Ai tornelli usa il passaporto; se non viene letto, vai al varco manuale"
    ],
    problems: [
      { q: "Il tornello non legge il passaporto", a: "Normale in alcune stazioni: cerca il varco con l'operatore (人工通道 réngōng tōngdào)." },
      { q: "Stazione sbagliata", a: "Le città hanno più stazioni (es. Xi'an vs Xi'an Nord). Controlla il nome esatto sul biglietto e mostralo al tassista." }
    ],
    verify: "Hong Kong West Kowloon → Shenzhen Futian: 15 min, controlli di frontiera dentro la stazione."
  },
  {
    id: "food", phase: "arrival", icon: "🥢", title: "Mangiare: Dianping, Meituan e QR",
    why: "Trovare buoni ristoranti e ordinare senza parlare cinese.",
    tasks: [
      "Scarica Dianping (大众点评): è il TripAdvisor cinese, guarda le foto dei piatti",
      "Salva le frasi 'non piccante' e 'allergia' (vedi tab Frasi)",
      "Al tavolo: scansiona il QR con Alipay/WeChat per il menu",
      "Usa la fotocamera di Google Traduttore sul menu cartaceo",
      "L'acqua del rubinetto non si beve: comprala o chiedila calda (热水)"
    ],
    problems: [
      { q: "Non capisco quanto è piccante", a: "Di' 不要辣 (bú yào là) = senza piccante, o 微辣 (wēi là) = poco. In Sichuan/Chongqing anche il 'poco' è tanto." },
      { q: "Non c'è il menu in inglese", a: "Indica i piatti dei tavoli vicini, o usa le foto su Dianping. Funziona sempre." }
    ],
    verify: "Mancia: in Cina continentale non si lascia."
  },
  {
    id: "arrival-day", phase: "arrival", icon: "🛬", title: "Primo giorno: checklist di arrivo",
    why: "Le prime 2 ore decidono come andrà il viaggio.",
    tasks: [
      "Attiva l'eSIM / i dati e prova WhatsApp",
      "Preleva un po' di contanti (100–300 CNY) a un ATM Bank of China / ICBC",
      "Fai il primo pagamento con Alipay (anche solo una bottiglia d'acqua)",
      "Attiva il codice metro della città in Alipay",
      "Compra un adattatore se serve: in Cina prese A, C, I (la spina italiana a 2 poli spesso entra)"
    ],
    problems: [
      { q: "L'ATM rifiuta la carta", a: "Prova un'altra banca (Bank of China è la più compatibile) e controlla di aver abilitato il prelievo estero." },
      { q: "L'hotel chiede il deposito", a: "È normale, si paga con carta o Alipay e viene restituito al check-out." }
    ],
    verify: "Tieni sempre il passaporto con te: serve per treni, musei e controlli."
  },
  {
    id: "hk", phase: "hk", icon: "🇭🇰", title: "Hong Kong: è un altro sistema",
    why: "Moneta, internet, prese e regole diverse dalla Cina continentale.",
    tasks: [
      "Valuta: dollaro di Hong Kong (HKD), non yuan",
      "Octopus card: compra in aeroporto/MTR o aggiungila al Wallet dell'iPhone",
      "Internet libero: Google, WhatsApp e Instagram funzionano anche sul Wi-Fi",
      "Prese di tipo G (inglesi): serve l'adattatore",
      "Alipay HK / carte contactless funzionano quasi ovunque"
    ],
    problems: [
      { q: "Si guida a sinistra", a: "Sì: guarda a destra prima di attraversare. È scritto sull'asfalto ('Look right')." },
      { q: "Passare a Shenzhen", a: "A piedi da Lo Wu/Lok Ma Chau (East Rail Line) o in treno da West Kowloon. Serve il passaporto e conta come nuovo ingresso in Cina." }
    ],
    verify: "Emergenze a Hong Kong: 999 (non 110/120)."
  }
];

window.PHASES = {
  before:  "Prima di partire",
  arrival: "All'arrivo",
  hk:      "Hong Kong"
};

window.PHRASES = [
  { group: "Base", items: [
    { it: "Ciao", zh: "你好", py: "nǐ hǎo" },
    { it: "Grazie", zh: "谢谢", py: "xièxie" },
    { it: "Non parlo cinese", zh: "我不会说中文", py: "wǒ bú huì shuō zhōngwén" },
    { it: "Quanto costa?", zh: "多少钱？", py: "duōshao qián?" },
    { it: "Troppo caro", zh: "太贵了", py: "tài guì le" },
    { it: "Dov'è il bagno?", zh: "洗手间在哪里？", py: "xǐshǒujiān zài nǎlǐ?" }
  ]},
  { group: "Ristorante", items: [
    { it: "Voglio questo", zh: "我要这个", py: "wǒ yào zhège" },
    { it: "Senza piccante", zh: "不要辣", py: "bú yào là" },
    { it: "Poco piccante", zh: "微辣", py: "wēi là" },
    { it: "Sono vegetariano", zh: "我吃素", py: "wǒ chī sù" },
    { it: "Sono allergico alle arachidi", zh: "我对花生过敏", py: "wǒ duì huāshēng guòmǐn" },
    { it: "Il conto, per favore", zh: "买单", py: "mǎidān" },
    { it: "Posso pagare con Alipay?", zh: "可以用支付宝吗？", py: "kěyǐ yòng zhīfùbǎo ma?" }
  ]},
  { group: "Spostarsi", items: [
    { it: "Mi porti qui, per favore", zh: "请带我去这里", py: "qǐng dài wǒ qù zhèlǐ" },
    { it: "Mi fermi qui", zh: "请在这里停车", py: "qǐng zài zhèlǐ tíngchē" },
    { it: "Dov'è la metro?", zh: "地铁站在哪里？", py: "dìtiě zhàn zài nǎlǐ?" },
    { it: "Dov'è l'ingresso?", zh: "入口在哪里？", py: "rùkǒu zài nǎlǐ?" },
    { it: "Mi sono perso", zh: "我迷路了", py: "wǒ mílù le" }
  ]},
  { group: "Emergenza", items: [
    { it: "Aiuto!", zh: "救命！", py: "jiùmìng!" },
    { it: "Chiamate un'ambulanza", zh: "请叫救护车", py: "qǐng jiào jiùhùchē" },
    { it: "Ho bisogno di un medico", zh: "我需要看医生", py: "wǒ xūyào kàn yīshēng" },
    { it: "Ho perso il passaporto", zh: "我的护照丢了", py: "wǒ de hùzhào diū le" }
  ]},
  { group: "Cantonese (HK / Guangzhou)", cantonese: true, items: [
    { it: "Grazie / Scusi (servizio)", zh: "唔該", py: "m̀h gōi" },
    { it: "Grazie (per un regalo)", zh: "多謝", py: "dō jeh" },
    { it: "Quanto costa?", zh: "幾多錢？", py: "géi dō chín?" }
  ]}
];

window.EMERGENCY = {
  mainland: [
    { n: "110", label: "Polizia" },
    { n: "120", label: "Ambulanza" },
    { n: "119", label: "Vigili del fuoco" },
    { n: "122", label: "Incidenti stradali" }
  ],
  hk: [ { n: "999", label: "Emergenze (tutte) a Hong Kong" } ],
  italy: [
    { label: "Ambasciata d'Italia a Pechino", url: "https://ambpechino.esteri.it" },
    { label: "Consolato Generale a Guangzhou (copre Shenzhen)", url: "https://consguangzhou.esteri.it" },
    { label: "Consolato Generale a Chongqing (copre Chengdu)", url: "https://conschongqing.esteri.it" },
    { label: "Consolato Generale a Hong Kong", url: "https://conshongkong.esteri.it" },
    { label: "Viaggiare Sicuri (Farnesina)", url: "https://www.viaggiaresicuri.it" },
    { label: "Dove Siamo Nel Mondo — registra il viaggio", url: "https://www.dovesiamonelmondo.it" }
  ]
};
