// scripts/patchStatesAndUI.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/i18n/locales');

const ALL_LANGS = [
  'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa', 'or',
  'as', 'ur', 'sa', 'kok', 'ks', 'sd', 'ne', 'mai', 'sat', 'doi',
  'mni', 'brx'
];

const STATUS_MAP = {
  pending: {
    hi: "लंबित", te: "పెండింగ్‌లో ఉంది", ta: "நிலுவையில் உள்ளது", kn: "ಬಾಕಿ ಇದೆ",
    ml: "തീർപ്പാക്കാത്തത്", mr: "प्रलंबित", bn: "মুলতুবি", gu: "બાકી",
    pa: "ਬਕਾਇਆ", or: "ବକେୟା", as: "মুলতৱী", ur: "زیرِ التواء",
    sa: "प्रलम्बितम्", kok: "प्रलंबित", ks: "زیرِ التوا", sd: "ترسيل",
    ne: "बाँकी", mai: "लंबित", doi: "बकाया", sat: "ᱵᱟᱹᱠᱤ ᱢᱮᱱᱟᱜᱼᱟ",
    mni: "ꯂꯩꯔꯤꯕ", brx: "थानाय"
  },
  answered: {
    hi: "उत्तर दिया गया", te: "సమాధానం ఇవ్వబడింది", ta: "பதிலளிக்கப்பட்டது", kn: "ಉತ್ತರಿಸಲಾಗಿದೆ",
    ml: "മറുപടി നൽകി", mr: "उत्तर दिले", bn: "উত্তর দেওয়া হয়েছে", gu: "જવાબ આપ્યો",
    pa: "ਜਵਾਬ ਦਿੱਤਾ", or: "ଉତ୍ତର ଦିଆଗଲା", as: "উত্তৰ দিয়া হ'ল", ur: "جواب دیا گیا",
    sa: "प्रत्युत्तरितम्", kok: "जाप दिली", ks: "جواب دیومُت", sd: "جواب ڏنو ويو",
    ne: "जवाफ दिइयो", mai: "उत्तर देल गेल", doi: "जवाब दित्ता गेदा", sat: "ᱛᱮᱞᱟ ᱮᱢᱮᱱᱟ",
    mni: "ꯄꯥꯎꯈꯨꯝ ꯄꯤꯔꯦ", brx: "फिननाय हरबाय"
  },
  active: {
    hi: "सक्रिय", te: "క్రియాశీలకం", ta: "செயலில்", kn: "ಸಕ್ರಿಯ",
    ml: "സജീവം", mr: "सक्रिय", bn: "সক্রিয়", gu: "સક્રિય",
    pa: "ਸਰਗਰਮ", or: "ସକ୍ରିୟ", as: "সক্ৰিয়", ur: "فعال",
    sa: "सक्रियम्", kok: "सक्रिय", ks: "فعال", sd: "فعال",
    ne: "सक्रिय", mai: "सक्रिय", doi: "सक्रिय", sat: "ᱠᱟᱹᱢᱤᱭᱟᱹ",
    mni: "ꯍꯤꯡꯅ ꯂꯩꯔꯤ", brx: "मावथि"
  },
  inactive: {
    hi: "निष्क्रिय", te: "నిష్క్రియం", ta: "செயலற்றது", kn: "ನಿಷ್ಕ್ರಿಯ",
    ml: "നിഷ്‌ക്രിയം", mr: "निष्क्रिय", bn: "নিষ্ক্রিয়", gu: "નિષ્ક્રિય",
    pa: "ਨਿਸ਼ਕਿਰਿਆ", or: "ନିଷ୍କ୍ରିୟ", as: "নিষ্ক্ৰিয়", ur: "غیر فعال",
    sa: "निष्क्रियम्", kok: "निष्क्रिय", ks: "غیر فعال", sd: "غير فعال",
    ne: "निष्क्रिय", mai: "निष्क्रिय", doi: "निष्क्रिय", sat: "ᱵᱟᱝ ᱠᱟᱹᱢᱤᱭᱟᱹ",
    mni: "ꯂꯦꯞꯄ", brx: "मावथिनो गैयै"
  },
  outOfStock: {
    hi: "स्टॉक में नहीं", te: "స్టాక్ లేదు", ta: "கையிருப்பு இல்லை", kn: "ಸ್ಟಾಕ್ ಮುಗಿದಿದೆ",
    ml: "സ്റ്റോക്കില്ല", mr: "शिल्लक नाही", bn: "স্টকে নেই", gu: "સ્ટોક નથી",
    pa: "ਸਟਾਕ ਖਤਮ", or: "ଷ୍ଟକ୍ ନାହିଁ", as: "মজুত নাই", ur: "اسٹاک ختم",
    sa: "सञ्चये नास्ति", kok: "स्टॉक ना", ks: "اسٹاکس منز نہٕ", sd: "اسٽاڪ ناهي",
    ne: "स्टकमा छैन", mai: "स्टॉक मे नहि", doi: "स्टॉक च नेईं", sat: "ᱪᱟᱵᱟᱭᱮᱱᱟ",
    mni: "ꯂꯩꯔꯣꯏ", brx: "गैया"
  }
};

const MODAL_MAP = {
  directContact: {
    mai: "कारीगर सं सीधा संपर्क:",
    sat: "ᱠᱟᱹᱨᱤᱜᱚᱞ ᱥᱟᱶ ᱥᱚᱡᱷᱮ ᱡᱚᱯᱚᱲᱟᱣ:",
    doi: "कारीगर कन्नै सीधा संपर्क:",
    mni: "ꯈꯨꯠꯁꯥ ꯍꯩꯕꯒ ꯍꯛꯊꯦꯡꯅꯅ ꯁꯝꯅꯕ:",
    brx: "कारीगरजों थोंजों सोमोन्दो:"
  },
  validation: {
    mai: "कृपया अपन नाम आ फोन नंबर दियौक।",
    sat: "ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱟᱨ ᱯᱷᱳᱱ ᱮᱞ ᱮᱢ ᱢᱮ᱾",
    doi: "कृपा करियै अपना नांऽ ते फोन नंबर देओ।",
    mni: "ꯆꯥꯅꯕꯤꯗꯨꯅ ꯅꯍꯥꯛꯀꯤ ꯃꯃꯤꯡ ꯑꯃꯁꯨꯡ ꯐꯣꯟ ꯅꯝꯕꯔ ꯄꯤꯕꯤꯌꯨ꯫",
    brx: "अननानै नोंथांनि मुं आरो फोन नम्बरखौ हो।"
  }
};

const DASH_MAP = {
  totalStoreVisits: {
    sat: "ᱥᱟᱱᱟᱢ ᱫᱩᱠᱟᱱ ᱧᱮᱞ",
    mni: "ꯄꯨꯟꯅ ꯗꯨꯀꯥꯟ ꯆꯠꯈꯤꯕ",
    brx: "गासै दखान नायनाय"
  },
  directInquiriesTitle: {
    sat: "ᱥᱚᱡᱷᱮ ᱠᱤᱨᱤᱧᱤᱭᱟᱹ ᱠᱩᱞᱤ ᱵᱤᱫᱟᱹᱭ",
    mni: "ꯍꯛꯊꯦꯡꯅꯅ ꯂꯩꯕ ꯃꯤꯒꯤ ꯋꯥꯍꯪ",
    brx: "थोंजों बायग्रानि सोंनाय"
  },
  directInquiriesSub: {
    sat: "ᱟᱢᱟᱜ ᱦᱮᱸ ᱥᱟᱹᱨᱤ ᱞᱟᱹᱜᱤᱫ ᱛᱟᱺᱜᱤ ᱨᱮ ᱢᱮᱱᱟᱜ ᱚᱰᱟᱨ ᱠᱚ",
    mni: "ꯅꯍꯥꯛꯅ ꯌꯥꯕꯒꯤ ꯉꯥꯏꯔꯤꯕ ꯑꯣꯔꯗꯔꯁꯤꯡ",
    brx: "नोंथांनि थि खालामनायनि नेबाय थानाय अर्डरफोर"
  }
};

const ADD_MAP = {
  aiPoweredBadge: {
    doi: "AI-संचालित शिल्प कैटलॉगिंग"
  },
  step1Upload: {
    doi: "फोटो अपलोड करो"
  },
  step2Analyzing: {
    doi: "AI विश्लेषण"
  }
};

for (const code of ALL_LANGS) {
  const filePath = path.join(localesDir, `${code}.js`);
  if (!fs.existsSync(filePath)) continue;

  const mod = await import(`../src/i18n/locales/${code}.js`);
  const data = { ...mod.default };

  // 1. Patch statuses
  if (!data.statuses) data.statuses = {};
  for (const [stKey, langMap] of Object.entries(STATUS_MAP)) {
    if (langMap[code]) {
      data.statuses[stKey] = langMap[code];
    }
  }

  // 2. Patch modal
  if (!data.inquiryModal) data.inquiryModal = {};
  for (const [mKey, langMap] of Object.entries(MODAL_MAP)) {
    if (langMap[code]) {
      data.inquiryModal[mKey] = langMap[code];
    }
  }

  // 3. Patch dashboard
  if (!data.dashboard) data.dashboard = {};
  for (const [dKey, langMap] of Object.entries(DASH_MAP)) {
    if (langMap[code]) {
      data.dashboard[dKey] = langMap[code];
    }
  }

  // 4. Patch addProduct
  if (!data.addProduct) data.addProduct = {};
  for (const [aKey, langMap] of Object.entries(ADD_MAP)) {
    if (langMap[code]) {
      data.addProduct[aKey] = langMap[code];
    }
  }

  const content = `// src/i18n/locales/${code}.js\nexport default ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('✓ Successfully patched statuses and modal text across all 22 languages.');
