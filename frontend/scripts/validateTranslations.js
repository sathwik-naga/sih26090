// scripts/validateTranslations.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/i18n/locales');
const languagesFile = pathToFileURL(path.join(__dirname, '../src/i18n/languages.js')).href;
const productTranslationsFile = pathToFileURL(path.join(__dirname, '../src/i18n/productTranslations.js')).href;

const allowedIdenticalValues = [
  "Smart Artisan",
  "AI",
  "QR Code",
  "WhatsApp",
  "API",
  "URL",
  "INR",
  "₹",
  "%",
  "—",
  "•",
  "MOQ",
  "aditi@example.com",
  "+91 98765 43210"
];

// Helper to check if a value is legitimately identical (brand, number, symbol, etc.)
function isLegitimatelyIdentical(val) {
  if (typeof val !== 'string') return true;
  const trimmed = val.trim();
  if (allowedIdenticalValues.includes(trimmed)) return true;
  // If it is just numbers, spaces, currency, punctuation
  if (/^[\d\s.,\-–—₹$%+()/"'*•#]+$/.test(trimmed)) return true;
  // Exact brand phrase
  if (trimmed === "Smart Artisan") return true;
  return false;
}

async function validate() {
  console.log('=====================================================');
  console.log(' SMART ARTISAN: COMPREHENSIVE TRANSLATION VALIDATION ');
  console.log('=====================================================\n');

  let hasErrors = false;

  // 1. Check languages configuration
  const languagesMod = await import(languagesFile);
  const LANGUAGES = languagesMod.LANGUAGES;
  console.log(`✓ Loaded languages configuration: ${LANGUAGES.length} languages defined.`);

  if (LANGUAGES.length !== 23) {
    console.error(`❌ Expected 23 languages, found ${LANGUAGES.length}`);
    hasErrors = true;
  }

  // Verify RTL languages
  for (const lang of LANGUAGES) {
    if (lang.code === 'ur' || lang.code === 'sd') {
      if (lang.dir !== 'rtl') {
        console.error(`❌ Language ${lang.name} (${lang.code}) must have dir: 'rtl', found '${lang.dir}'`);
        hasErrors = true;
      } else {
        console.log(`✓ Confirmed RTL direction for ${lang.name} (${lang.code})`);
      }
    } else {
      if (lang.dir !== 'ltr') {
        console.error(`❌ Language ${lang.name} (${lang.code}) must have dir: 'ltr', found '${lang.dir}'`);
        hasErrors = true;
      }
    }
  }

  // 2. Load English canonical dictionary
  const enMod = await import(pathToFileURL(path.join(localesDir, 'en.js')).href);
  const en = enMod.default;

  let totalCanonicalKeys = 0;
  for (const sec in en) {
    totalCanonicalKeys += Object.keys(en[sec]).length;
  }
  console.log(`\n✓ Loaded canonical English dictionary: ${totalCanonicalKeys} keys across ${Object.keys(en).length} sections.`);

  // 3. Validate each of the 22 other languages
  let totalMissingKeys = 0;
  let totalEmptyValues = 0;
  let totalStructuralMismatches = 0;
  let totalAccidentalEnglish = 0;

  for (const lang of LANGUAGES) {
    if (lang.code === 'en') continue;

    const localePath = path.join(localesDir, `${lang.code}.js`);
    if (!fs.existsSync(localePath)) {
      console.error(`❌ Missing locale file for ${lang.name} (${lang.code}.js)`);
      hasErrors = true;
      continue;
    }

    const mod = await import(pathToFileURL(localePath).href);
    const data = mod.default;
    if (!data || typeof data !== 'object') {
      console.error(`❌ Invalid export in ${lang.code}.js`);
      hasErrors = true;
      totalStructuralMismatches++;
      continue;
    }

    const missingInLang = [];
    const emptyInLang = [];
    const accidentalEnglishInLang = [];

    // Check all sections and keys
    for (const [secKey, secObj] of Object.entries(en)) {
      if (!data[secKey] || typeof data[secKey] !== 'object') {
        missingInLang.push(`${secKey} (entire section)`);
        totalStructuralMismatches++;
        continue;
      }

      for (const [key, enVal] of Object.entries(secObj)) {
        const langVal = data[secKey][key];

        if (langVal === undefined) {
          missingInLang.push(`${secKey}.${key}`);
        } else if (langVal === null || langVal === '') {
          emptyInLang.push(`${secKey}.${key}`);
        } else if (langVal === enVal && !isLegitimatelyIdentical(langVal)) {
          accidentalEnglishInLang.push(`${secKey}.${key} = "${langVal}"`);
        }
      }
    }

    totalMissingKeys += missingInLang.length;
    totalEmptyValues += emptyInLang.length;
    totalAccidentalEnglish += accidentalEnglishInLang.length;

    if (missingInLang.length > 0) {
      console.error(`❌ ${lang.name} (${lang.code}): ${missingInLang.length} missing keys! Sample:`, missingInLang.slice(0, 3));
      hasErrors = true;
    }
    if (emptyInLang.length > 0) {
      console.error(`❌ ${lang.name} (${lang.code}): ${emptyInLang.length} empty values! Sample:`, emptyInLang.slice(0, 3));
      hasErrors = true;
    }
    if (accidentalEnglishInLang.length > 0) {
      console.warn(`⚠️ ${lang.name} (${lang.code}): ${accidentalEnglishInLang.length} suspicious identical English values. Sample:`, accidentalEnglishInLang.slice(0, 3));
    }

    if (missingInLang.length === 0 && emptyInLang.length === 0 && accidentalEnglishInLang.length === 0) {
      console.log(`✓ ${lang.name} (${lang.code}): 100% Validated (${totalCanonicalKeys}/${totalCanonicalKeys} keys, 0 errors)`);
    } else if (missingInLang.length === 0 && emptyInLang.length === 0) {
      console.log(`✓ ${lang.name} (${lang.code}): Keys & values complete (${totalCanonicalKeys} keys, 0 missing, 0 empty)`);
    }
  }

  // 4. Validate dynamic product translations
  console.log('\n--- Dynamic Product Localization Audit ---');
  const prodMod = await import(productTranslationsFile);
  const prodTrans = prodMod.PRODUCT_TRANSLATIONS || {};
  const productCount = Object.keys(prodTrans).length;
  console.log(`✓ Loaded dynamic product catalog translations: ${productCount} products.`);

  if (productCount < 10) {
    console.error(`❌ Expected at least 10 products in PRODUCT_TRANSLATIONS, found ${productCount}`);
    hasErrors = true;
  }

  // Check language coverage for each product
  for (const [prodId, langMap] of Object.entries(prodTrans)) {
    for (const lang of LANGUAGES) {
      if (!langMap[lang.code]) {
        console.error(`❌ Product ${prodId} missing translation for ${lang.name} (${lang.code})`);
        hasErrors = true;
      }
    }
  }
  console.log(`✓ Verified all ${productCount} products across all 23 languages.`);

  // 5. Final Summary
  console.log('\n=====================================================');
  console.log(' VALIDATION RESULTS SUMMARY:');
  console.log('=====================================================');
  console.log(` Total supported languages:         ${LANGUAGES.length}`);
  console.log(` Canonical keys per language:       ${totalCanonicalKeys}`);
  console.log(` Total keys across all languages:   ${totalCanonicalKeys * LANGUAGES.length}`);
  console.log(` Missing keys:                      ${totalMissingKeys}`);
  console.log(` Empty values:                      ${totalEmptyValues}`);
  console.log(` Structural mismatches:             ${totalStructuralMismatches}`);
  console.log(` Accidental identical English:      ${totalAccidentalEnglish}`);
  console.log('=====================================================\n');

  if (hasErrors || totalMissingKeys > 0 || totalEmptyValues > 0 || totalStructuralMismatches > 0) {
    console.error('❌ Validation FAILED. Please resolve errors above.');
    process.exit(1);
  } else {
    console.log('🎉 Validation PASSED SUCCESSFUL! All 23 languages meet strict criteria.');
    process.exit(0);
  }
}

validate().catch(err => {
  console.error('Fatal validation error:', err);
  process.exit(1);
});
