// scripts/buildAllLocales.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import en from '../src/i18n/locales/en.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/i18n/locales');

// Define deep cloner/builder that ensures identical structure to en
function createLocaleFromData(langData) {
  const result = {};
  for (const [sectionKey, sectionObj] of Object.entries(en)) {
    result[sectionKey] = {};
    const langSection = langData[sectionKey] || {};
    for (const [key, defaultVal] of Object.entries(sectionObj)) {
      result[sectionKey][key] = langSection[key] || defaultVal;
    }
  }
  return result;
}

export { createLocaleFromData, localesDir };
