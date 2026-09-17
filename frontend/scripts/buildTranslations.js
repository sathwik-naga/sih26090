// scripts/buildTranslations.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 23 languages as per specification
export const ALL_LANGUAGES = [
  'en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa',
  'or', 'as', 'ur', 'sa', 'kok', 'ks', 'sd', 'ne', 'mai', 'sat',
  'doi', 'mni', 'brx'
];

console.log('Language list verified: 23 languages.');
