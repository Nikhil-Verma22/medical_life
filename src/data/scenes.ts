import scene01 from "../assets/scene-01.jpg";
import scene02 from "../assets/scene-02.jpg";
import scene03 from "../assets/scene-03.jpg";
import scene04 from "../assets/scene-04.jpg";
import scene05 from "../assets/scene-05.jpg";
import scene06 from "../assets/scene-06.jpg";
import scene07 from "../assets/scene-07.jpg";
import scene08 from "../assets/scene-08.jpg";
import scene09 from "../assets/scene-09.jpg";
import scene10 from "../assets/scene-10.jpg";
import scene11 from "../assets/scene-11.jpg";
import scene12 from "../assets/scene-12.jpg";
import scene13 from "../assets/scene-13.jpg";
import scene14 from "../assets/scene-14.jpg";
import scene15 from "../assets/scene-15.jpg";
import scene16 from "../assets/scene-16.jpg";
import scene17 from "../assets/scene-17.jpg";
import scene18 from "../assets/scene-18.png";
import scene19 from "../assets/scene-19.jpg";
import scene20 from "../assets/scene-20.png";
import scene21 from "../assets/scene-21.png";
import scene22 from "../assets/scene-22.jpg";
import scene23 from "../assets/scene-23.jpg";
import scene24 from "../assets/scene-24.jpg";
import scene25 from "../assets/scene-25.jpg";
import scene26 from "../assets/scene-26.jpg";
import scene27 from "../assets/scene-27.jpg";
import labCoatMaster from "../assets/scene-labcoat-master.jpg";

import scene28 from "../assets/scene-28.jpg";
import scene29 from "../assets/scene-29.jpg";
import scene30 from "../assets/scene-30.jpg";
import scene31 from "../assets/scene-31.jpg";
import scene32 from "../assets/scene-32.jpg";
import scene33 from "../assets/scene-33.jpg";
import scene34 from "../assets/scene-34.jpg";
import scene35 from "../assets/scene-35.jpg";
import scene36 from "../assets/scene-36.jpg";
import scene37 from "../assets/scene-37.jpg";
import scene38 from "../assets/scene-38.jpg";
import scene39 from "../assets/scene-39.jpg";

export interface Shayari {
  hindi: string;
  hinglish: string;
  poetOrTheme?: string;
}

export interface Scene {
  id: number;
  src: string;
  hindiTitle: string;
  englishTitle: string;
  subtitle: string;
  category: "ward" | "hostel" | "anatomy" | "casualty" | "library" | "chai" | "convocation" | "study" | "love" | "labcoat" | "microbiology" | "ayurveda" | "cardiology" | "radiology" | "pediatrics" | "dental" | "nursing";
  mood: string;
  accentHex: string;
  alt: string;
  shayaris: Shayari[];
}

export const SCENES: Scene[] = [
  {
    id: 1,
    src: labCoatMaster,
    hindiTitle: "सफ़ेद एप्रन",
    englishTitle: "The Sacred White Coat",
    subtitle: "Medical Life Love",
    category: "labcoat",
    mood: "Soulful & Eternal Love",
    accentHex: "#f59e0b",
    alt: "White doctor coat on hanger with stethoscope and orange flower",
    shayaris: [
      { hindi: "ये सफ़ेद कोट महज़ लिबास नहीं मेरी जाँ, ये मेरे इश्क़ और इबादत की पहचान है।", hinglish: "Yeh safed coat mehez libaas nahi meri jaan, yeh mere ishq aur ibaadat ki pehchan hai." },
      { hindi: "कंधे पे स्टेथोस्कोप और जेब में गुलाब, डॉक्टरों के इश्क़ का भी अलग ही है हिसाब।", hinglish: "Kandhe pe stethoscope aur jeb mein gulaab, doctoron ke ishq ka bhi alag hi hai hisaab." },
      { hindi: "जिस्म के ज़ख्म तो दुनिया भी सिल लेती है, ये कोट रूह को तसल्ली बख़्शने का हुनर रखता है।", hinglish: "Jism ke zakhm toh duniya bhi sil leti hai, yeh coat rooh ko tasalli bakhshne ka hunar rakhta hai." },
      { hindi: "हर धागे में बुनी है रातों की बेदारी, ये एप्रन नहीं, मेरी ज़िंदगी की सबसे हसीन ज़िम्मेदारी।", hinglish: "Har dhaage mein buni hai raaton ki bedaari, yeh apron nahi, meri zindagi ki sabse haseen zimmedari." },
      { hindi: "तेरे इश्क़ से भी ज़्यादा वफ़ादार निकला ये कोट, हर दर्द में मेरे साथ सीने से लिपटा रहा।", hinglish: "Tere ishq se bhi zyada wafadaar nikla yeh coat, har dard mein mere saath seene se lipta raha." },
    ],
  },
  {
    id: 2,
    src: scene18,
    hindiTitle: "दवाख़ाना",
    englishTitle: "Dawa-Khana Lounge",
    subtitle: "Medical Life Love",
    category: "ward",
    mood: "Vintage & Warm Nostalgia",
    accentHex: "#fbbf24",
    alt: "Doctor coat with heart stethoscope in hospital corridor",
    shayaris: [
      { hindi: "दवाख़ाने की चौखट पे जो सुकून मिलता है, वो महलों के तख़्त पे भी कहाँ नसीब होता है।", hinglish: "Dawakhane ki chaukhat pe jo sukoon milta hai, woh mehlon ke takht pe bhi kahan naseeb hota hai." },
      { hindi: "मरीज़ों की मुस्कान में जब अपनी दुआ दिखती है, उस पल मेडिकल की हर थकान मिटती है।", hinglish: "Mareezon ki muskaan mein jab apni dua dikhti hai, us pal medical ki har thakaan mit-ti hai." },
      { hindi: "हमने सीखी है नब्ज़ से दिल की बात समझना, लफ़्ज़ों की ज़रूरत किसे है जब धड़कनें बोलती हैं।", hinglish: "Humne seekhi hai nabz se dil ki baat samajhna, lafzon ki zaroorat kise hai jab dhadkanein bolti hain." },
    ],
  },
  {
    id: 3,
    src: scene19,
    hindiTitle: "परवाज़",
    englishTitle: "Midnight Stardust & Books",
    subtitle: "Medical Life Love",
    category: "hostel",
    mood: "Romantic & Dreamy",
    accentHex: "#8b5cf6",
    alt: "Medical student with lightbulb book on starry rooftop with friend",
    shayaris: [
      { hindi: "छत पे खुली है किताब और आँखों में तेरे ख़्वाब, रात के तीन बजे भी है मोहब्बत बेहिसाब।", hinglish: "Chhat pe khuli hai kitaab aur aankhon mein tere khwaab, raat ke teen baje bhi hai mohabbat behisaab." },
      { hindi: "तारे गवाह हैं हमारी इन बे-नींद रातों के, कितने पन्ने पलट गए तेरी मोहब्बत की बातों में।", hinglish: "Taare gawah hain humari in be-neend raaton ke, kitne panne palat gaye teri mohabbat ki baaton mein." },
      { hindi: "एक हाथ में हैरिसन, दूजे में तेरा हाथ हो, काश हर नाइट-स्टडी में तेरा ही साथ हो।", hinglish: "Ek haath mein Harrison, dooje mein tera haath ho, kaash har night-study mein tera hi saath ho." },
    ],
  },
  {
    id: 4,
    src: scene20,
    hindiTitle: "जुनून",
    englishTitle: "Sunset Rooftop Passion",
    subtitle: "Medical Life Love",
    category: "hostel",
    mood: "High Voltage & Freedom",
    accentHex: "#f97316",
    alt: "Passionate medical students shouting on rooftop at sunset",
    shayaris: [
      { hindi: "आसमान को चीरती है हमारी ख़्वाहिशों की पतंग, जब तक जान है तब तक जारी रहेगी ये जंग।", hinglish: "Aasmaan ko cheerti hai humari khwahishon ki patang, jab tak jaan hai tab tak jaari rahegi yeh jung." },
      { hindi: "शाम का सूरज ढलते ही हम नया सवेरा बुनते हैं, हम वो हैं जो ख़ामोशी में भी ज़िंदगी की धड़कन सुनते हैं।", hinglish: "Shaam ka sooraj dhalte hi hum naya sawera bunte hain, hum woh hain jo khamoshi mein bhi zindagi ki dhadkan sunte hain." },
    ],
  },
  {
    id: 5,
    src: scene21,
    hindiTitle: "ताबीर",
    englishTitle: "Synapse Symphony",
    subtitle: "Medical Life Love",
    category: "hostel",
    mood: "Intellectual & Heartfelt",
    accentHex: "#6366f1",
    alt: "Medical student reading illuminated book connected to laptop on balcony",
    shayaris: [
      { hindi: "न्यूरॉन्स का जाल हो या तेरी यादों का सिलसिला, दोनों में ही दिल को बेइंतहा सुकून मिला।", hinglish: "Neurons ka jaal ho ya teri yaadon ka silsila, dono mein hi dil ko be-intaha sukoon mila." },
      { hindi: "साइनेप्स से साइनेप्स तक बहती है जो रोशनी, वो किताबों का इल्म है या तेरी दीवानगी?", hinglish: "Synapse se synapse tak behti hai jo roshni, woh kitaabon ka ilm hai ya teri deewangi?" },
    ],
  },
  {
    id: 6,
    src: scene01,
    hindiTitle: "कफ़ियात",
    englishTitle: "Anatomy Dissection Hall",
    subtitle: "Medical Life Love",
    category: "anatomy",
    mood: "Reverent & Grounding",
    accentHex: "#06b6d4",
    alt: "Anatomy dissection hall with students in white coats",
    shayaris: [
      { hindi: "फॉर्मेलिन की वो महक और आंखों में पानी, एनाटॉमी हॉल से शुरू हुई थी हमारी कहानी।", hinglish: "Formalin ki woh mehek aur aankhon mein paani, anatomy hall se shuru hui thi humari kahani." },
      { hindi: "पहला कैडेवर, कांपते हाथ और वो पहला कट, डर था मगर दिल में डॉक्टर बनने की थी हठ।", hinglish: "Pehla cadaver, kaanpte haath aur woh pehla cut, darr tha magar dil mein doctor ban-ne ki thi hath." },
    ],
  },
  {
    id: 7,
    src: scene02,
    hindiTitle: "शब-बेदारी",
    englishTitle: "Gray's Anatomy 3 AM",
    subtitle: "Medical Life Love",
    category: "study",
    mood: "Grit & Determination",
    accentHex: "#ec4899",
    alt: "Hostel room at night with skeleton model and study lamp",
    shayaris: [
      { hindi: "रात के तीन बजे जब सारा शहर सोता है, एक मेडिकल का तालिब-ए-इल्म किताबों में खोता है।", hinglish: "Raat ke teen baje jab saara shehar sota hai, ek medical ka talib-e-ilm kitaabon mein khota hai." },
      { hindi: "टेबल पे ठंडा कप और आंखों में भारी नींद, पर सफ़ेद कोट का सपना जगाए रखता है हर दिन।", hinglish: "Table pe thanda cup aur aankhon mein bhaari neend, par safed coat ka sapna jagaye rakhta hai har din." },
    ],
  },
  {
    id: 8,
    src: scene03,
    hindiTitle: "सफ़र-ए-तिब्ब",
    englishTitle: "GMC Corridors",
    subtitle: "Medical Life Love",
    category: "ward",
    mood: "Rhythm & Purpose",
    accentHex: "#3b82f6",
    alt: "Medical college corridor with students walking to class",
    shayaris: [
      { hindi: "कॉरिडोर में गूंजती कदमों की वो आवाज़, हर कदम में दिखता है कल के डॉक्टर का अंदाज़।", hinglish: "Corridor mein goonjti kadmon ki woh aawaaz, har kadam mein dikhta hai kal ke doctor ka andaaz." },
      { hindi: "एप्रन की सरसराहट और स्टेथोस्कोप की खनक, इन बरामदों में बसती है हमारी ज़िंदगी की चमक।", hinglish: "Apron ki sarsarahat aur stethoscope ki khanak, in baramdon mein basti hai humari zindagi ki chamak." },
    ],
  },
  {
    id: 9,
    src: scene04,
    hindiTitle: "हिकमत",
    englishTitle: "Clinical Ward Rounds",
    subtitle: "Medical Life Love",
    category: "ward",
    mood: "Bedside Wisdom",
    accentHex: "#14b8a6",
    alt: "Professor taking a ward round with medical students",
    shayaris: [
      { hindi: "बेडसाइड पे खड़े होकर जो सबक सीखा है, वो किसी भी मोटी किताब में कहाँ लिखा है।", hinglish: "Bedside pe khade hokar jo sabak seekha hai, woh kisi bhi moti kitaab mein kahan likha hai." },
      { hindi: "मरीज़ की नब्ज़ छूते ही दिल में एक दुआ उठती है, ऐ खुदा, मेरे हाथों से इस दर्द की दवा हो।", hinglish: "Mareez ki nabz choote hi dil में एक दुआ उठती है, ae khuda, mere haathon se is dard ki dawa ho." },
    ],
  },
  {
    id: 10,
    src: scene05,
    hindiTitle: "इत्मीनान",
    englishTitle: "GMC Tapri Chai",
    subtitle: "Medical Life Love",
    category: "chai",
    mood: "Warmth & Samosa Relief",
    accentHex: "#eab308",
    alt: "Chai stall outside medical college gate with students chatting",
    shayaris: [
      { hindi: "फिजियो और बायोकेम के बीच वो आधे कप चाय, सच कहूं तो वही थी हमारी ज़िंदगी की असली राय।", hinglish: "Physio aur biochem ke beech woh aadhe cup chai, sach kahun toh wahi thi humari zindagi ki asli raay." },
      { hindi: "टपरी की बेंच पे जब पूरी बैच बैठती थी, बड़े से बड़े प्रोफेसर की भी पोल खुलती थी।", hinglish: "Tapri ki bench pe jab poori batch baithti थी, bade se bade professor ki bhi pol khulti thi." },
    ],
  },
  {
    id: 11,
    src: scene06,
    hindiTitle: "सबक़",
    englishTitle: "Lecture Theatre Blackboard",
    subtitle: "Medical Life Love",
    category: "study",
    mood: "Chalkboard Cardiograms",
    accentHex: "#a855f7",
    alt: "Lecture theatre with chalkboard heart diagram",
    shayaris: [
      { hindi: "लास्ट बेंच पे बैठकर जो पहली रो के ख़्वाब देखे, लेक्चर हॉल के ब्लैकबोर्ड पे पूरे होते देखे।", hinglish: "Last bench pe baithkar jo pehli row ke khwaab dekhe, lecture hall ke blackboard pe poore hote dekhe." },
    ],
  },
  {
    id: 12,
    src: scene07,
    hindiTitle: "जुस्तजू",
    englishTitle: "Midnight Central Library",
    subtitle: "Medical Life Love",
    category: "library",
    mood: "Silent Devotion",
    accentHex: "#0ea5e9",
    alt: "Medical college library late at night with glowing lamps",
    shayaris: [
      { hindi: "लाइब्रेरी का रजिस्टर भले बंद हो जाए रात में, मेडिकल स्टूडेंट की रोशनी कभी नहीं बुझती।", hinglish: "Library ka register bhale band ho jaaye raat mein, medical student ki roshni kabhi nahi bujhti." },
    ],
  },
  {
    id: 13,
    src: scene08,
    hindiTitle: "महफ़िल",
    englishTitle: "Hostel Mess Diariez",
    subtitle: "Medical Life Love",
    category: "hostel",
    mood: "Steel Plates & Ward Tales",
    accentHex: "#f43f5e",
    alt: "Medical hostel mess hall at dinner with students talking",
    shayaris: [
      { hindi: "मेस की वो दाल भले पतली हो मगर दोस्ती गाढ़ी थी, हर निवाले के साथ वार्ड की कोई नई कहानी थी।", hinglish: "Mess ki woh daal bhale patli ho magar dosti gaadhi thi, har niwale ke saath ward ki koi nayi kahani thi." },
    ],
  },
  {
    id: 14,
    src: scene09,
    hindiTitle: "नज़र",
    englishTitle: "Histology Lab Vision",
    subtitle: "Medical Life Love",
    category: "anatomy",
    mood: "Pink & Purple Micro-Worlds",
    accentHex: "#d946ef",
    alt: "Histology lab with row of microscopes",
    shayaris: [
      { hindi: "गुलाबी और बैंगनी रंगों की वो माइक्रो दुनिया, जब पहली बार दिखा वो ग्लोमेरुलस का नज़ारा।", hinglish: "Gulaabi aur baingani rangon ki woh micro duniya, jab pehli baar dikha woh glomerulus ka nazaara." },
    ],
  },
  {
    id: 15,
    src: scene10,
    hindiTitle: "आशियाना",
    englishTitle: "Red Brick Heritage",
    subtitle: "Medical Life Love",
    category: "hostel",
    mood: "Heritage & Vintage Dignity",
    accentHex: "#fb923c",
    alt: "Old red-brick medical college facade at dusk with string lights",
    shayaris: [
      { hindi: "सौ साल पुरानी ये लाल ईंटें और फेयरी लाइट्स की शाम, यहाँ हर दीवार पे लिखा है मसीहाओं का नाम।", hinglish: "Sau saal purani yeh laal eentein aur fairy lights ki shaam, yahan har deewaar pe likha hai masihaaon ka naam." },
    ],
  },
  {
    id: 16,
    src: scene11,
    hindiTitle: "नब्ज़",
    englishTitle: "120 Over 80",
    subtitle: "Medical Life Love",
    category: "study",
    mood: "Rhythm & Vitality",
    accentHex: "#ef4444",
    alt: "Physiology practical measuring blood pressure",
    shayaris: [
      { hindi: "120 ओवर 80 और दिल की वो तेज धड़कन, जब तूने पहली बार कफ़ बांधा मेरे हाथ पर।", hinglish: "120 over 80 aur dil ki woh tez dhadkan, jab tune pehli baar cuff baandha mere haath par." },
    ],
  },
  {
    id: 17,
    src: scene12,
    hindiTitle: "ज़िंदगी",
    englishTitle: "Casualty at 02:00 AM",
    subtitle: "Medical Life Love",
    category: "casualty",
    mood: "Courage & Adrenaline",
    accentHex: "#dc2626",
    alt: "Hospital casualty entrance at night with an ambulance",
    shayaris: [
      { hindi: "सायरन की वो गूंज और इमरजेंसी के खुलते दरवाजे, मौत के जबड़े से ज़िंदगी खींच लाते हैं हमारे इरादे।", hinglish: "Siren ki woh goonj aur emergency ke khulte darwaaze, maut ke jabde se zindagi kheench laate hain humare iraade." },
    ],
  },
  {
    id: 18,
    src: scene13,
    hindiTitle: "मशअल",
    englishTitle: "The Scrub Room",
    subtitle: "Medical Life Love",
    category: "ward",
    mood: "Surgical Poise & Focus",
    accentHex: "#10b981",
    alt: "Operation theatre gowning area with green scrubs",
    shayaris: [
      { hindi: "ग्रीन scrub पहनकर जब हम हाथ धोते हैं तीन मिनट, मन का हर मैल धुल जाता है, बन जाते हैं सिर्फ़ हिम्मत।", hinglish: "Green scrubs pehankar jab hum haath dhote hain 3 minute, mann ka har mail dhul jaata hai, ban jaate hain sirf himmat." },
    ],
  },
  {
    id: 19,
    src: scene14,
    hindiTitle: "तपस्या",
    englishTitle: "The Pre-Viva Desk",
    subtitle: "Medical Life Love",
    category: "study",
    mood: "Robbins & Highlighters",
    accentHex: "#e11d48",
    alt: "Medical student study table with textbooks and stethoscope",
    shayaris: [
      { hindi: "दीवारों पे चिपके फ्लैशकार्ड्स और ठंडी हो चुकी कॉफी, मेडिकल के वाइवा से बड़ी नहीं है कोई आंधी।", hinglish: "Deewaron pe chipke flashcards aur thandi ho chuki coffee, medical ke viva se badi nahi hai koi aandhi." },
    ],
  },
  {
    id: 20,
    src: scene15,
    hindiTitle: "इम्तियाज़",
    englishTitle: "Finally, Doctor",
    subtitle: "Medical Life Love",
    category: "convocation",
    mood: "Convocation Triumph",
    accentHex: "#22c55e",
    alt: "Convocation evening on the medical college steps",
    shayaris: [
      { hindi: "पाँच बरस का ये सफ़र और वो आंसुओं की धार, आज नाम के आगे डॉ. लग गया मेरे यार।", hinglish: "Paanch baras ka yeh safar aur woh aansuon ki dhaar, aaj naam ke aage Dr. lag gaya mere yaar." },
    ],
  },
  {
    id: 21,
    src: scene16,
    hindiTitle: "सुकून-ए-शाम",
    englishTitle: "Hostel Sunset Chai",
    subtitle: "Medical Life Love",
    category: "chai",
    mood: "Peaceful Twilight",
    accentHex: "#f59e0b",
    alt: "Students on a hostel rooftop at dusk with chai",
    shayaris: [
      { hindi: "शाम की चाय और हॉस्टल की छत, मेडिकल की ज़िंदगी में यही है सबसे बड़ी दौलत।", hinglish: "Shaam ki chai aur hostel ki chhat, medical ki zindagi mein yahi hai sabse badi daulat." },
    ],
  },
  {
    id: 22,
    src: scene17,
    hindiTitle: "मसीहा का लिबास",
    englishTitle: "Quiet Ward Stethoscope",
    subtitle: "Medical Life Love",
    category: "labcoat",
    mood: "Patience & Devotion",
    accentHex: "#38bdf8",
    alt: "Doctor coat with slippers and stethoscope in serene hospital room",
    shayaris: [
      { hindi: "सफ़ेद लिबास में छुपा है समर्पण का संसार, हर धड़कन को सुनने को ये दिल है बेकरार।", hinglish: "Safed libaas mein chhupa hai samarpan ka sansaar, har dhadkan ko sun-ne ko yeh dil hai beqaraar." },
    ],
  },
  {
    id: 23,
    src: scene22,
    hindiTitle: "रेडियोलॉजी दृष्टिक्षेप",
    englishTitle: "Radiology Scans Light-Box",
    subtitle: "Medical Life Love",
    category: "radiology",
    mood: "Luminous X-Ray Focus",
    accentHex: "#0ea5e9",
    alt: "Medical student examining luminous brain MRI and chest X-rays on light box",
    shayaris: [
      { hindi: "काली शीटों पे छपी है ज़िंदगी की दास्ताँ, रोशनी के सामने हर एक राज़ हुआ बयाँ।", hinglish: "Kaali sheeton pe chhapi hai zindagi ki daastan, roshni ke saamne har ek raaz hua bayaan." },
    ],
  },
  {
    id: 24,
    src: scene23,
    hindiTitle: "नया जीवन",
    englishTitle: "The First Cry & Labor Ward",
    subtitle: "Medical Life Love",
    category: "ward",
    mood: "Sacred & Newborn Joy",
    accentHex: "#f43f5e",
    alt: "Resident doctor cradling newborn baby under morning sunrise light",
    shayaris: [
      { hindi: "जब नन्हीं सी जान ने पहली बार इस जहां में रोया, डॉक्टर की आंखों ने खुशी का सबसे पवित्र मोती खोया।", hinglish: "Jab nanhin si jaan ne pehli baar is jahaan mein roya, doctor ki aankhon ne khushi ka sabse pavitra moti khoya." },
    ],
  },
  {
    id: 25,
    src: scene24,
    hindiTitle: "मुस्कान एवं स्नेह",
    englishTitle: "Pediatrics Ward Teddy",
    subtitle: "Medical Life Love",
    category: "pediatrics",
    mood: "Heartwarming Child Care",
    accentHex: "#eab308",
    alt: "Doctor with teddy bear stethoscope cheering up child patient in pediatrics ward",
    shayaris: [
      { hindi: "टेडी बेयर वाला स्टेथोस्कोप जब बच्चे के सीने से लगाया, उसके खिलखिलाते चेहरे ने सारा दर्द मिटाया।", hinglish: "Teddy bear wala stethoscope jab bachhe ke seene se lagaya, uske khilkhilate chehre ne saara dard mitaya." },
    ],
  },
  {
    id: 26,
    src: scene25,
    hindiTitle: "सेवा एवं समर्पण",
    englishTitle: "BSc Nursing Night IV Drip",
    subtitle: "Medical Life Love",
    category: "nursing",
    mood: "Compassion & Night Care",
    accentHex: "#38bdf8",
    alt: "Nurse checking IV drip and patient pulse in night hospital ward",
    shayaris: [
      { hindi: "रात के सन्नाटे में जो धीमी सी आहट होती है, वो नर्स के कदमों की करुणा और ममता होती है।", hinglish: "Raat ke sannaate mein jo dheemi si aahat hoti hai, woh nurse ke kadmon ki karuna aur mamta hoti hai." },
    ],
  },
  {
    id: 27,
    src: scene26,
    hindiTitle: "दंत शिल्प कला",
    englishTitle: "BDS Dental Crown Carving",
    subtitle: "Medical Life Love",
    category: "dental",
    mood: "Precision Craftsmanship",
    accentHex: "#14b8a6",
    alt: "Dental student carving ceramic tooth crown model under workbench lamp",
    shayaris: [
      { hindi: "एक हाथ में हैंडपीस और दूसरे में हुनर की छड़ी, बीडीएस वालों ने मुस्कुराने की नई राह चुनी।", hinglish: "Ek haath mein handpiece aur doosre mein hunar ki chhadi, BDS walon ne muskurane ki nayi raah chuni." },
    ],
  },
  {
    id: 28,
    src: scene27,
    hindiTitle: "इश्क़-ए-लाइब्रेरी",
    englishTitle: "Medical Library Romance",
    subtitle: "Medical Life Love",
    category: "love",
    mood: "Pure Romance & Chemistry",
    accentHex: "#ec4899",
    alt: "Two medical students exchanging notes and smiling across library table at night",
    shayaris: [
      { hindi: "हैरिसन के भारी पन्नों के पीछे जब तेरी आंखें मिलीं, उस शांत लाइब्रेरी में भी मोहब्बत की कलियां खिलीं।", hinglish: "Harrison ke bhaari pannon ke peeche jab teri aankhein mileen, us shaant library mein bhi mohabbat ki kaliyan khileen." },
    ],
  },
  {
    id: 29,
    src: scene28,
    hindiTitle: "सूक्ष्मजीव विज्ञान",
    englishTitle: "Microbiology Bioluminescence",
    subtitle: "Medical Life Love",
    category: "microbiology",
    mood: "Fluorescent Neon Petri Glow",
    accentHex: "#a855f7",
    alt: "Glowing bioluminescent petri dish bacterial culture in dark laboratory with Devanagari calligraphy",
    shayaris: [
      { hindi: "पेट्री डिश की वो चमकती हुई कॉलोनियां, माइक्रोस्कोप में कैद हैं ज़िंदगी की अनगिनत कहानियां।", hinglish: "Petri dish ki woh chamakti hui colonies, microscope mein qaid hain zindagi ki an-ginat kahaniyan." },
      { hindi: "अंधेरी लैब में जो हरी और बैंगनी रोशनी खिलती है, सूक्ष्म जीवों में भी कुदरत की कारीगरी दिखती है।", hinglish: "Andheri lab mein jo hari aur baingani roshni khilti hai, sookshm jeevon mein bhi qudrat ki kaarigari dikhti hai." },
    ],
  },
  {
    id: 30,
    src: scene29,
    hindiTitle: "आपातकाल",
    englishTitle: "Monsoon Emergency Ambulance",
    subtitle: "Medical Life Love",
    category: "casualty",
    mood: "Emergency Adrenaline",
    accentHex: "#ef4444",
    alt: "Emergency ambulance with flashing red and blue beacons in heavy monsoon rain outside casualty",
    shayaris: [
      { hindi: "बारिश की बूंदों में जब लाल-नीली बत्ती चमकती है, कैज़ुअल्टी में हर एक डॉक्टर की नब्ज़ धड़कती है।", hinglish: "Baarish ki boondon mein jab laal-neeli batti chamakti hai, casualty mein har ek doctor ki nabz dhadakti hai." },
      { hindi: "भीगे हुए पोर्च पे जब स्ट्रेचर तेजी से दौड़ता है, डॉक्टर मौत के पंजों से ज़िंदगी को खींच लाता है।", hinglish: "Bheege hue porch pe jab stretcher tezi se daudta hai, doctor maut ke panjon se zindagi ko kheench laata hai." },
    ],
  },
  {
    id: 31,
    src: scene30,
    hindiTitle: "औषधि रसायन",
    englishTitle: "Pharmacological Botany & Chemistry",
    subtitle: "Medical Life Love",
    category: "study",
    mood: "Molecules & Medicinal Herbs",
    accentHex: "#10b981",
    alt: "Chemical volumetric flasks, molecular models, and fresh medicinal green plants in pharmacy lab",
    shayaris: [
      { hindi: "बेंजीन रिंग्स और जड़ी-बूटियों का ये गहरा संगम, हर बीमारी का इलाज ढूंढ लेता है फार्मा का दम।", hinglish: "Benzene rings aur jadi-bootiyon ka yeh gehra sangam, har beemari ka ilaaj dhoond leta hai pharma ka dam." },
      { hindi: "कांच के फ्लास्क में जब औषधियां तैयार होती हैं, इंसानियत के दर्द से मुक्ति की नई राहें बनती हैं।", hinglish: "Kaanch ke flask mein jab aushadhiyan taiyaar hoti hain, insaniyat ke dard se mukti ki nayi raahein banti hain." },
    ],
  },
  {
    id: 32,
    src: scene31,
    hindiTitle: "आयुर्वेद धरोहर",
    englishTitle: "BAMS Ayurveda & Charaka Samhita",
    subtitle: "Medical Life Love",
    category: "ayurveda",
    mood: "Ancient Heritage Healing",
    accentHex: "#d97706",
    alt: "Ayurveda doctor grinding herbs in mortar pestle with Charaka Samhita manuscripts & brass lamps",
    shayaris: [
      { hindi: "चरक और सुश्रुत की वो पावन वाणी, पाँच हजार साल पुरानी है हमारी ये कहानी।", hinglish: "Charaka aur Sushruta ki woh paawan vaani, 5000 saal purani hai humari yeh kahani." },
      { hindi: "तांबे के बर्तन और तुलसी नीम का वो काढ़ा, कुदरत ने हर बीमारी के लिए अमृत है संवारा।", hinglish: "Taambe ke bartan aur tulsi neem ka woh kaadha, qudrat ne har beemari ke liye amrit hai sanwaara." },
    ],
  },
  {
    id: 33,
    src: scene32,
    hindiTitle: "अस्थि पुनर्निर्माण",
    englishTitle: "Orthopedic Surgery Titanium Plate",
    subtitle: "Medical Life Love",
    category: "ward",
    mood: "Titanium Precision & Teamwork",
    accentHex: "#38bdf8",
    alt: "Orthopedic surgical team aligning titanium bone plate and screws on femur bone model",
    shayaris: [
      { hindi: "टूटी हुई हड्डियों को जब टाइटेनियम से जोड़ते हैं, हम इंसान को फिर से अपने पैरों पर खड़ा करते हैं।", hinglish: "Tooti hui haddiyon ko jab titanium se jodte hain, hum insaan ko phir se apne pairon par khada karte hain." },
      { hindi: "हथौड़ी और ड्रिल जब ऑर्थो ओटी में चलते हैं, हम सिर्फ़ सर्जन नहीं, शरीर के इंजीनियर बनते हैं।", hinglish: "Hathaudi aur drill jab ortho OT mein chalte hain, hum sirf surgeon nahi, shareer ke engineer bante hain." },
    ],
  },
  {
    id: 34,
    src: scene33,
    hindiTitle: "धड़कन की तरंग",
    englishTitle: "Cardiology Sinus Rhythm ECG",
    subtitle: "Medical Life Love",
    category: "cardiology",
    mood: "Glowing Green ECG Trace",
    accentHex: "#ef4444",
    alt: "Cardiac doctor studying glowing green ECG rhythm P-Q-R-S-T wave monitor screen",
    shayaris: [
      { hindi: "पी-क्यू-आर-एस-टी की वो खूबसूरत तरंग, इसी धड़कन में बसती है ज़िंदगी की उमंग।", hinglish: "P-Q-R-S-T ki woh khoobsurat tarang, isi dhadkan mein basti hai zindagi ki umang." },
      { hindi: "ईसीजी की वो रेखा जब सीधी होने लगती है, डॉक्टरों की सांसें भी साथ में थमने लगती हैं।", hinglish: "ECG ki woh rekha jab seedhi hone lagti hai, doctoron ki saansein bhi saath mein thamne lagti hain." },
    ],
  },
  {
    id: 35,
    src: scene34,
    hindiTitle: "रेडियोलॉजी दृष्टि",
    englishTitle: "Radiology Brain MRI & Light-Box",
    subtitle: "Medical Life Love",
    category: "radiology",
    mood: "Teal Luminous Brain MRI Scans",
    accentHex: "#0ea5e9",
    alt: "Medical student examining illuminated brain MRI and chest X-rays on light box",
    shayaris: [
      { hindi: "काली सीटों पे छपी है ज़िंदगी की दास्ताँ, रोशनी के सामने हर एक राज़ हुआ बयाँ।", hinglish: "Kaali sheeton pe chhapi hai zindagi ki daastan, roshni ke saamne har ek raaz hua bayaan." },
      { hindi: "अंधेरे कमरे में जो चमकती है व्यूअर की रोशनी, बीमारी को पहचानना ही है डॉक्टर की असली बंदगी।", hinglish: "Andhere kamre mein jo chamakti hai viewer ki roshni, beemari ko pehchaanna hi hai doctor ki asli bandagi." },
    ],
  },
  {
    id: 36,
    src: scene35,
    hindiTitle: "नया जीवन आशीर्वाद",
    englishTitle: "Labor Ward & Newborn First Cry",
    subtitle: "Medical Life Love",
    category: "ward",
    mood: "Sacred Dawn Blessing",
    accentHex: "#f43f5e",
    alt: "Resident doctor cradling newborn baby in hospital labor room under morning sunrise",
    shayaris: [
      { hindi: "जब नन्हीं सी जान ने पहली बार इस जहां में रोया, डॉक्टर की आंखों ने खुशी का सबसे पवित्र मोती खोया।", hinglish: "Jab nanhin si jaan ne pehli baar is jahaan mein roya, doctor ki aankhon ne khushi ka sabse pavitra moti khoya." },
      { hindi: "लेबर रूम की दीवारों ने देखी है माँ की वो हिम्मत, जब गोद में बच्चा आया तो मिल गई खुदा की जन्नत।", hinglish: "Labor room ki deewaron ne dekhi hai maa ki woh himmat, jab god mein bachha aaya toh mil gayi khuda ki jannat." },
    ],
  },
  {
    id: 37,
    src: scene36,
    hindiTitle: "मुस्कान बाल चिकित्सा",
    englishTitle: "Pediatrics Ward Teddy Bear",
    subtitle: "Medical Life Love",
    category: "pediatrics",
    mood: "Heartfelt Child Care",
    accentHex: "#eab308",
    alt: "Doctor kneeling down with teddy bear stethoscope to cheer up smiling child patient",
    shayaris: [
      { hindi: "टेडी बेयर वाला स्टेथोस्कोप जब बच्चे के सीने से लगाया, उसके खिलखिलाते चेहरे ने सारा दर्द मिटाया।", hinglish: "Teddy bear wala stethoscope jab bachhe ke seene se lagaya, uske khilkhilate chehre ne saara dard mitaya." },
      { hindi: "पीडियाट्रिक्स वार्ड में जो जादू और मासूमियत मिलती है, वो दुनिया के किसी और कोने में कहाँ खिलती है।", hinglish: "Pediatrics ward mein jo jaadu aur masoomiyat milti hai, woh duniya ke kisi aur kone mein kahan khilti hai." },
    ],
  },
  {
    id: 38,
    src: scene37,
    hindiTitle: "सेवा एवं करुणा",
    englishTitle: "BSc Nursing Night IV Care",
    subtitle: "Medical Life Love",
    category: "nursing",
    mood: "Gentle Night Care & Seva",
    accentHex: "#38bdf8",
    alt: "BSc Nursing student adjusting IV infusion drip & checking patient pulse in calm night ward",
    shayaris: [
      { hindi: "रात के सन्नाटे में जो धीमी सी आहट होती है, वो नर्स के कदमों की करुणा और ममता होती है।", hinglish: "Raat ke sannaate mein jo dheemi si aahat hoti hai, woh nurse ke kadmon ki karuna aur mamta hoti hai." },
      { hindi: "ड्रिप की एक-एक बूंद में जो जिंदगी बहती है, वो नर्सिंग की अथक सेवा की कहानी कहती है।", hinglish: "Drip ki ek-ek boond mein jo zindagi behti hai, woh nursing ki athak seva ki kahani kehti hai." },
    ],
  },
  {
    id: 39,
    src: scene38,
    hindiTitle: "दंत कला एवं शिल्प",
    englishTitle: "BDS Dental Workbench Carving",
    subtitle: "Medical Life Love",
    category: "dental",
    mood: "Craftsmanship & Precision",
    accentHex: "#14b8a6",
    alt: "BDS Dental student carving ceramic tooth crown model under workbench lamp",
    shayaris: [
      { hindi: "एक हाथ में हैंडपीस और दूसरे में हुनर की छड़ी, बीडीएस वालों ने मुस्कुराने की नई राह चुनी।", hinglish: "Ek haath mein handpiece aur doosre mein hunar ki chhadi, BDS walon ne muskurane ki nayi raah chuni." },
      { hindi: "दांतों की वो बारीक नक्काशी और क्राउन की फिटिंग, डेंटिस्ट्री सिर्फ़ साइंस नहीं, ये है कला की मीटिंग।", hinglish: "Daanton ki woh baareek nakkaashi aur crown ki fitting, dentistry sirf science nahi, yeh hai kala ki meeting." },
    ],
  },
  {
    id: 40,
    src: scene39,
    hindiTitle: "इश्क़-ए-इल्म",
    englishTitle: "Medical Library Quiet Romance",
    subtitle: "Medical Life Love",
    category: "love",
    mood: "Pure Romance & Chemistry",
    accentHex: "#ec4899",
    alt: "Two medical students exchanging notes and smiling across library table at night",
    shayaris: [
      { hindi: "हैरिसन के भारी पन्नों के पीछे जब तेरी आंखें मिलीं, उस शांत लाइब्रेरी में भी मोहब्बत की कलियां खिलीं।", hinglish: "Harrison ke bhaari pannon ke peeche jab teri aankhein mileen, us shaant library mein bhi mohabbat ki kaliyan khileen." },
      { hindi: "नोट्स पास करने के बहाने जो उंगलियां छू गईं, सच कहूं मेरी सारी पैथोलॉजी वहीं भूल गईं।", hinglish: "Notes pass karne ke bahaane jo ungliyan choo gayin, sach kahun meri saari pathology wahin bhool gayin." },
    ],
  },
];

export const ROTATE_INTERVAL_MS = 8000;
