// Coordinate in WGS-84 (le stesse di GPS/OpenStreetMap).
// Per Amap/Didi vengono convertite in GCJ-02 a runtime (vedi js/geo.js).
// cat: see = attrazione, eat = cibo, move = trasporti, shop = shopping

window.CITIES = [
  { id: "shenzhen",  name: "Shenzhen",  zh: "深圳", center: [114.0579, 22.5431], zoom: 12.5, mainland: true,
    intro: "Metropoli tech al confine con Hong Kong. Tutto si paga con il telefono, metro ottima." },
  { id: "hongkong",  name: "Hong Kong", zh: "香港", center: [114.1694, 22.3000], zoom: 12.8, mainland: false,
    intro: "Sistema separato: niente Great Firewall, dollari HK, Octopus card, prese inglesi (tipo G)." },
  { id: "guangzhou", name: "Guangzhou", zh: "广州", center: [113.2800, 23.1250], zoom: 12.3, mainland: true,
    intro: "Capitale della cucina cantonese e del dim sum. Lingua locale: cantonese." },
  { id: "xian",      name: "Xi'an",     zh: "西安", center: [108.9480, 34.2590], zoom: 12.5, mainland: true,
    intro: "Antica capitale, Esercito di Terracotta, mura Ming e il quartiere musulmano." },
  { id: "chengdu",   name: "Chengdu",   zh: "成都", center: [104.0660, 30.6600], zoom: 12.5, mainland: true,
    intro: "Panda, case da tè e cucina del Sichuan. Il piccante qui è serio." },
  { id: "chongqing", name: "Chongqing", zh: "重庆", center: [106.5650, 29.5620], zoom: 13, mainland: true,
    intro: "Città 3D costruita sulle colline: le mappe 'mentono' sui piani. Usa sempre la vista 3D." }
];

window.PLACES = [
  // ---------------- SHENZHEN ----------------
  { id: "sz-pingan", city: "shenzhen", cat: "see", name: "Ping An Finance Centre", zh: "平安金融中心", py: "Píng'ān Jīnróng Zhōngxīn",
    ll: [114.0500, 22.5367], tip: "Osservatorio Free Sky al 116° piano. Biglietti su Trip.com o all'ingresso (passaporto).", metro: "Linea 1/3 · Shopping Park" },
  { id: "sz-huaqiang", city: "shenzhen", cat: "shop", name: "Huaqiangbei (mercato elettronica)", zh: "华强北", py: "Huáqiáng Běi",
    ll: [114.0858, 22.5449], tip: "Il più grande mercato di elettronica al mondo. Contratta, controlla sempre il prodotto prima di pagare.", metro: "Linea 1 · Huaqiang Lu" },
  { id: "sz-oct", city: "shenzhen", cat: "see", name: "OCT Loft", zh: "华侨城创意文化园", py: "Huáqiáochéng Chuàngyì Wénhuà Yuán",
    ll: [113.9868, 22.5402], tip: "Ex fabbriche trasformate in gallerie, caffè e design shop. Ottimo nel weekend.", metro: "Linea 1 · Qiaocheng Dong" },
  { id: "sz-bay", city: "shenzhen", cat: "see", name: "Shenzhen Bay Park", zh: "深圳湾公园", py: "Shēnzhèn Wān Gōngyuán",
    ll: [113.9550, 22.5160], tip: "Lungomare di 15 km con vista su Hong Kong. Al tramonto è perfetto, noleggia una bici con Alipay." },
  { id: "sz-dafen", city: "shenzhen", cat: "shop", name: "Dafen Oil Painting Village", zh: "大芬油画村", py: "Dàfēn Yóuhuà Cūn",
    ll: [114.1355, 22.6133], tip: "Villaggio di pittori: copie e quadri originali a prezzi bassi.", metro: "Linea 3 · Dafen" },
  { id: "sz-coconut", city: "shenzhen", cat: "eat", name: "Hot pot al pollo e cocco (Futian)", zh: "椰子鸡", py: "Yēzi Jī",
    ll: [114.0560, 22.5410], tip: "Piatto simbolo di Shenzhen: brodo di cocco fresco, non piccante. Cerca '椰子鸡' su Dianping per i locali vicini." },
  { id: "sz-luohu", city: "shenzhen", cat: "move", name: "Valico Luohu (per Hong Kong)", zh: "罗湖口岸", py: "Luóhú Kǒu'àn",
    ll: [114.1130, 22.5320], tip: "Confine a piedi con HK, collegato alla East Rail Line (MTR). Porta il passaporto, non un documento d'identità.", metro: "Linea 1 · Luohu" },
  { id: "sz-futian-cp", city: "shenzhen", cat: "move", name: "Valico Futian (per Hong Kong)", zh: "福田口岸", py: "Fútián Kǒu'àn",
    ll: [114.0680, 22.5170], tip: "Di solito meno affollato di Luohu. Dall'altra parte: stazione MTR Lok Ma Chau.", metro: "Linea 4/10 · Futian Checkpoint" },

  // ---------------- HONG KONG ----------------
  { id: "hk-peak", city: "hongkong", cat: "see", name: "Victoria Peak", zh: "太平山頂", py: "Taai3 Ping4 Saan1 Deng2",
    ll: [114.1500, 22.2710], tip: "Sali con il Peak Tram (code lunghe nel weekend) o col bus 15. Vai prima del tramonto e resta per le luci." },
  { id: "hk-ferry", city: "hongkong", cat: "move", name: "Star Ferry · Tsim Sha Tsui", zh: "天星小輪 尖沙咀", py: "Tin1 Sing1 Siu2 Leon4",
    ll: [114.1688, 22.2937], tip: "La traversata più bella ed economica del mondo. Si paga con Octopus o carta contactless." },
  { id: "hk-temple", city: "hongkong", cat: "shop", name: "Temple Street Night Market", zh: "廟街夜市", py: "Miu6 Gaai1",
    ll: [114.1700, 22.3060], tip: "Dalle 18 in poi: street food, cianfrusaglie, indovini. Contratta.", metro: "MTR · Jordan" },
  { id: "hk-buddha", city: "hongkong", cat: "see", name: "Tian Tan Buddha (Lantau)", zh: "天壇大佛", py: "Tin1 Taan4 Daai6 Fat6",
    ll: [113.9050, 22.2540], tip: "Funivia Ngong Ping 360 da Tung Chung. Controlla il meteo: col vento forte chiude." },
  { id: "hk-ladies", city: "hongkong", cat: "shop", name: "Ladies' Market · Mong Kok", zh: "女人街", py: "Neoi5 Jan4 Gaai1",
    ll: [114.1710, 22.3190], tip: "Mercato di strada nel quartiere più denso del pianeta.", metro: "MTR · Mong Kok" },
  { id: "hk-maks", city: "hongkong", cat: "eat", name: "Mak's Noodle (wonton)", zh: "麥奀雲吞麵世家", py: "Mak6 Ngan1 Wan4 Tan1 Min6",
    ll: [114.1545, 22.2830], tip: "Wonton noodles storici a Central. Porzioni piccole: ordinane due.", metro: "MTR · Central" },
  { id: "hk-kams", city: "hongkong", cat: "eat", name: "Kam's Roast Goose", zh: "甘牌燒鵝", py: "Gam1 Paai4 Siu1 Ngo2",
    ll: [114.1755, 22.2775], tip: "Oca arrosto stellata Michelin a Wan Chai. Arriva prima di pranzo per evitare la fila.", metro: "MTR · Wan Chai" },
  { id: "hk-adc", city: "hongkong", cat: "eat", name: "Australia Dairy Company", zh: "澳洲牛奶公司", py: "Ou3 Zau1 Ngau4 Naai5",
    ll: [114.1707, 22.3047], tip: "Cha chaan teng leggendario: uova strapazzate e pudding al latte. Servizio rapidissimo (e brusco, è normale).", metro: "MTR · Jordan" },
  { id: "hk-wk", city: "hongkong", cat: "move", name: "West Kowloon (treno alta velocità)", zh: "香港西九龍站", py: "Sai1 Gau2 Lung4 Zaam6",
    ll: [114.1650, 22.3040], tip: "Treni per Shenzhen (15 min), Guangzhou e tutta la Cina. I controlli di frontiera sono dentro la stazione." },

  // ---------------- GUANGZHOU ----------------
  { id: "gz-tower", city: "guangzhou", cat: "see", name: "Canton Tower", zh: "广州塔", py: "Guǎngzhōu Tǎ",
    ll: [113.3245, 23.1066], tip: "Di sera si illumina. Crociera sul Fiume delle Perle dal molo vicino.", metro: "Linea 3/APM · Canton Tower" },
  { id: "gz-shamian", city: "guangzhou", cat: "see", name: "Isola di Shamian", zh: "沙面岛", py: "Shāmiàn Dǎo",
    ll: [113.2410, 23.1080], tip: "Ex concessioni europee, edifici coloniali e alberi secolari. Passeggiata tranquilla.", metro: "Linea 1/6 · Huangsha" },
  { id: "gz-chen", city: "guangzhou", cat: "see", name: "Chen Clan Ancestral Hall", zh: "陈家祠", py: "Chén Jiā Cí",
    ll: [113.2450, 23.1260], tip: "Capolavoro di intagli in legno, pietra e ceramica. Chiuso il lunedì in alcuni periodi: verifica.", metro: "Linea 1 · Chen Clan Academy" },
  { id: "gz-beijinglu", city: "guangzhou", cat: "shop", name: "Beijing Road (pedonale)", zh: "北京路步行街", py: "Běijīng Lù Bùxíng Jiē",
    ll: [113.2690, 23.1250], tip: "Sotto il pavimento di vetro si vedono strade di epoche antiche.", metro: "Linea 6 · Beijing Lu" },
  { id: "gz-taotaoju", city: "guangzhou", cat: "eat", name: "Tao Tao Ju (dim sum dal 1880)", zh: "陶陶居", py: "Táotáo Jū",
    ll: [113.2475, 23.1205], tip: "Sede storica su Dishifu Road. Ordini spuntando un foglio o col QR: prova har gow e char siu bao.", metro: "Linea 1 · Changshou Lu" },
  { id: "gz-huacheng", city: "guangzhou", cat: "see", name: "Huacheng Square / Zhujiang New Town", zh: "花城广场", py: "Huāchéng Guǎngchǎng",
    ll: [113.3240, 23.1200], tip: "Skyline moderno, Opera House di Zaha Hadid e museo del Guangdong.", metro: "APM · Huacheng Dadao" },

  // ---------------- XI'AN ----------------
  { id: "xa-terracotta", city: "xian", cat: "see", name: "Esercito di Terracotta", zh: "秦始皇兵马俑博物馆", py: "Qín Shǐhuáng Bīngmǎyǒng Bówùguǎn",
    ll: [109.2785, 34.3848], tip: "A ~1h dal centro. Prenota online col passaporto (posti limitati). Bus 'Linea Turistica 5/306' dalla stazione o Didi." },
  { id: "xa-bell", city: "xian", cat: "see", name: "Torre della Campana", zh: "钟楼", py: "Zhōnglóu",
    ll: [108.9425, 34.2610], tip: "Centro esatto della città murata. Bellissima illuminata di sera.", metro: "Linea 2/6 · Zhonglou" },
  { id: "xa-muslim", city: "xian", cat: "eat", name: "Quartiere Musulmano", zh: "回民街", py: "Huímín Jiē",
    ll: [108.9395, 34.2635], tip: "Street food: roujiamo (肉夹馍), yangrou paomo (羊肉泡馍), spiedini di agnello. Le traverse sono più autentiche della via principale.", metro: "Linea 2 · Zhonglou" },
  { id: "xa-wall", city: "xian", cat: "see", name: "Mura · Porta Sud (Yongningmen)", zh: "永宁门", py: "Yǒngníng Mén",
    ll: [108.9430, 34.2510], tip: "Noleggia una bici sulle mura: 14 km di giro, circa 2 ore.", metro: "Linea 2 · Yongningmen" },
  { id: "xa-goose", city: "xian", cat: "see", name: "Grande Pagoda dell'Oca Selvatica", zh: "大雁塔", py: "Dàyàn Tǎ",
    ll: [108.9592, 34.2192], tip: "Spettacolo di fontane la sera nella piazza nord (orari variabili).", metro: "Linea 3/4 · Dayan Ta" },
  { id: "xa-datang", city: "xian", cat: "see", name: "Datang Everbright City", zh: "大唐不夜城", py: "Dà Táng Bú Yè Chéng",
    ll: [108.9600, 34.2140], tip: "Viale pedonale in stile Tang con spettacoli. Va visto dopo il tramonto.", metro: "Linea 4 · Datang Furong Yuan" },
  { id: "xa-north", city: "xian", cat: "move", name: "Stazione Xi'an Nord (alta velocità)", zh: "西安北站", py: "Xī'ān Běi Zhàn",
    ll: [108.9390, 34.3770], tip: "Treni veloci per Chengdu, Chongqing, Pechino. Arriva 45 min prima: controlli di sicurezza.", metro: "Linea 2/4/14 · Beikezhan" },

  // ---------------- CHENGDU ----------------
  { id: "cd-panda", city: "chengdu", cat: "see", name: "Base di ricerca dei Panda Giganti", zh: "成都大熊猫繁育研究基地", py: "Dàxióngmāo Jīdì",
    ll: [104.1458, 30.7333], tip: "Vai all'apertura (7:30): dopo le 10 i panda dormono. Biglietti online col passaporto." },
  { id: "cd-kuanzhai", city: "chengdu", cat: "see", name: "Kuanzhai Xiangzi (Vicoli Largo e Stretto)", zh: "宽窄巷子", py: "Kuānzhǎi Xiàngzi",
    ll: [104.0548, 30.6697], tip: "Vicoli Qing restaurati. Turistico ma piacevole; prova il tè con l'orecchio pulito (!).", metro: "Linea 4 · Kuanzhai Xiangzi" },
  { id: "cd-wenshu", city: "chengdu", cat: "see", name: "Monastero Wenshu", zh: "文殊院", py: "Wénshū Yuàn",
    ll: [104.0727, 30.6748], tip: "Tempio attivo con casa da tè all'aperto: il vero ritmo di Chengdu.", metro: "Linea 1 · Wenshu Yuan" },
  { id: "cd-jinli", city: "chengdu", cat: "eat", name: "Jinli (via antica e snack)", zh: "锦里", py: "Jǐnlǐ",
    ll: [104.0475, 30.6458], tip: "Accanto al Tempio Wuhou. Snack del Sichuan: tang you guo zi, zhong shui jiao.", metro: "Linea 3 · Gaoshengqiao" },
  { id: "cd-mapo", city: "chengdu", cat: "eat", name: "Chen Mapo Tofu", zh: "陈麻婆豆腐", py: "Chén Mápó Dòufu",
    ll: [104.0716, 30.6716], tip: "Il ristorante che ha inventato il mapo tofu. Chiedi 微辣 (wēi là) se temi il piccante." },
  { id: "cd-chunxi", city: "chengdu", cat: "shop", name: "Chunxi Road / IFS (panda sul palazzo)", zh: "春熙路", py: "Chūnxī Lù",
    ll: [104.0812, 30.6567], tip: "Centro dello shopping. Il panda gigante che si arrampica sull'IFS è la foto d'obbligo.", metro: "Linea 2/3 · Chunxi Lu" },
  { id: "cd-hotpot", city: "chengdu", cat: "eat", name: "Hot pot del Sichuan (zona Yulin)", zh: "火锅", py: "Huǒguō",
    ll: [104.0680, 30.6380], tip: "Chiedi il pentolone 鸳鸯锅 (yuānyāng guō): metà piccante, metà brodo normale." },

  // ---------------- CHONGQING ----------------
  { id: "cq-hongya", city: "chongqing", cat: "see", name: "Hongyadong", zh: "洪崖洞", py: "Hóngyá Dòng",
    ll: [106.5794, 29.5631], tip: "Palazzo su palafitte di 11 piani. Si entra dal piano 1 E dall'11 (che è a livello strada!). Foto migliore dal ponte Qiansimen.", metro: "Linea 1/6 · Xiaoshizi" },
  { id: "cq-jiefangbei", city: "chongqing", cat: "shop", name: "Jiefangbei", zh: "解放碑", py: "Jiěfàng Bēi",
    ll: [106.5772, 29.5574], tip: "Cuore pedonale di Yuzhong. Base perfetta per dormire.", metro: "Linea 1/2 · Jiaochangkou" },
  { id: "cq-liziba", city: "chongqing", cat: "move", name: "Liziba (metro che attraversa il palazzo)", zh: "李子坝站", py: "Lǐzǐbà Zhàn",
    ll: [106.5355, 29.5530], tip: "La monorotaia Linea 2 passa dentro un condominio. Piattaforma panoramica sotto la stazione.", metro: "Linea 2 · Liziba" },
  { id: "cq-cableway", city: "chongqing", cat: "move", name: "Funivia sul fiume Yangtze", zh: "长江索道", py: "Chángjiāng Suǒdào",
    ll: [106.5880, 29.5530], tip: "Code lunghe la sera: vai al mattino. In alternativa guarda il fiume dal ponte." },
  { id: "cq-ciqikou", city: "chongqing", cat: "see", name: "Ciqikou (città antica)", zh: "磁器口古镇", py: "Cíqìkǒu Gǔzhèn",
    ll: [106.4480, 29.5800], tip: "Antico porto con vicoli e snack (mahua). Affollato nel weekend.", metro: "Linea 1 · Ciqikou" },
  { id: "cq-bayi", city: "chongqing", cat: "eat", name: "Bayi Road food street", zh: "八一好吃街", py: "Bāyī Hǎochī Jiē",
    ll: [106.5760, 29.5590], tip: "Street food di Chongqing: xiaomian (小面), suanlafen (酸辣粉). Molto piccante di default." },
  { id: "cq-hotpot", city: "chongqing", cat: "eat", name: "Hot pot di Chongqing", zh: "重庆火锅", py: "Chóngqìng Huǒguō",
    ll: [106.5740, 29.5600], tip: "Brodo al sego di manzo, più forte di quello di Chengdu. 微辣 = poco piccante, 清汤 = brodo chiaro." }
];

window.CATEGORIES = {
  see:  { label: "Da vedere", icon: "🏯", color: "#d64545" },
  eat:  { label: "Cibo",      icon: "🥟", color: "#e08a1e" },
  shop: { label: "Shopping",  icon: "🛍️", color: "#7a5cd6" },
  move: { label: "Trasporti", icon: "🚄", color: "#2f80c9" }
};
