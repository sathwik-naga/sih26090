// scripts/patchRemainingFinal.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/i18n/locales');

const PATCHES = {
  sat: {
    productDetail: {
      giCertified: "GI ᱥᱟᱹᱨᱤ ᱥᱟᱠᱷᱤ ᱦᱩᱱᱟᱹᱨ",
      inquireNow: "ᱥᱚᱡᱷᱮ ᱠᱤᱨᱤᱧᱤᱭᱟᱹ ᱠᱩᱞᱤ ᱵᱤᱫᱟᱹᱭ"
    },
    enquiry: {
      validationNamePhone: "ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱟᱨ ᱯᱷᱳᱱ ᱮᱞ ᱮᱢ ᱢᱮ᱾"
    }
  },
  mni: {
    productDetail: {
      giCertified: "GI ꯑꯁꯦꯡꯕ ꯈꯨꯠꯁꯥ",
      inquireNow: "ꯍꯛꯊꯦꯡꯅꯅ ꯍꯪꯕ"
    },
    enquiry: {
      validationNamePhone: "ꯆꯥꯅꯕꯤꯗꯨꯅ ꯅꯍꯥꯛꯀꯤ ꯃꯃꯤꯡ ꯑꯃꯁꯨꯡ ꯐꯣꯟ ꯅꯝꯕꯔ ꯄꯤꯕꯤꯌꯨ꯫"
    }
  },
  brx: {
    productDetail: {
      giCertified: "GI असोल शिल्प",
      inquireNow: "थोंजों बायग्रानि सोंनाय"
    },
    enquiry: {
      validationNamePhone: "अननानै नोंथांनि मुं आरो फोन नम्बरखौ हो।"
    }
  }
};

for (const [code, sections] of Object.entries(PATCHES)) {
  const filePath = path.join(localesDir, `${code}.js`);
  if (!fs.existsSync(filePath)) continue;

  const mod = await import(`../src/i18n/locales/${code}.js`);
  const data = { ...mod.default };

  for (const [secKey, secValues] of Object.entries(sections)) {
    if (!data[secKey]) data[secKey] = {};
    for (const [k, v] of Object.entries(secValues)) {
      data[secKey][k] = v;
    }
  }

  const content = `// src/i18n/locales/${code}.js\nexport default ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('✓ Successfully eliminated all remaining accidental English.');
