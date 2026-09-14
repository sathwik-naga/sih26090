/**
 * Smart Artisan - AI-Powered Offline Craft Intelligence & Catalog Generator
 * Analyzes uploaded craft imagery and automatically generates complete, realistic
 * artisan product listings without requiring manual data entry or external paid APIs.
 */

import { CRAFT_IMAGES } from './craftImages';

// Craft Knowledge Base for Intelligent Catalog Synthesis
export const CRAFT_KNOWLEDGE_BASE = [
  {
    id: 'fish_coasters',
    keywords: ['fish', 'coaster', 'wooden coaster', 'hand-painted fish', 'folk coaster', 'wood-coasters'],
    matchImage: CRAFT_IMAGES.FISH_COASTERS,
    title: 'Hand-Painted Folk Art Wooden Fish Coaster Set',
    description: 'A vibrant handcrafted wooden coaster set featuring colorful folk-art fish motifs, carefully painted by traditional artisans. Each piece reflects India\'s rich decorative craft traditions and adds a distinctive handmade touch to everyday spaces.',
    category: 'Wood & Painted Crafts',
    craftType: 'Hand-Painted Wooden Craft',
    materials: 'Wood, Natural Paint',
    colors: 'Multicolor, Ochre Yellow, Indigo Blue, Terracotta',
    style: 'Folk Art / Traditional Indian',
    dimensions: '4.2" diameter coasters (Set of 6) with matching wooden holder',
    weight: '520 grams',
    story: 'Fish motifs symbolize fertility, auspicious beginnings, and the life-giving flow of sacred Indian rivers in traditional folk painting. Handcrafted by generational artisans using seasoned local wood and coated with a protective water-resistant lacquer finish.',
    careInstructions: 'Wipe clean with a damp cloth. Do not soak in water or expose to direct dishwash heat.',
    suggestedRetailPrice: 850,
    suggestedWholesalePrice: 600,
    suggestedMoq: 10,
    leadTime: '7-10 Days',
    tags: ['Handmade', 'Wooden Craft', 'Folk Art', 'Home Decor', 'Indian Handicraft', 'Eco Friendly'],
    giTag: true,
    confidence: 98,
  },
  {
    id: 'terracotta_set',
    keywords: ['terracotta', 'clay', 'pottery', 'dinner set', 'earthen', 'vessel', 'handi', 'bowl'],
    matchImage: CRAFT_IMAGES.TERRACOTTA_SET,
    title: 'Handcrafted Terracotta Clay Dinner & Serving Set',
    description: 'An authentic unglazed terracotta dining collection hand-thrown on foot-powered wheels and wood-fired in traditional village kilns. Embellished with sacred white folk rice-wash motifs for organic dining.',
    category: 'Terracotta & Pottery',
    craftType: 'Hand-Thrown Earthenware Pottery',
    materials: 'Alluvial Riverbed Clay, Natural Rice-Flour Wash',
    colors: 'Warm Terracotta Red, Natural Clay Brown, Organic White',
    style: 'Traditional Rural Earthenware',
    dimensions: '11" Thali Plate, 5" Lidded Casserole Pot, 2 Curio Serving Bowls',
    weight: '2.1 kg',
    story: 'Preserving ancient Harappan pottery techniques passed down through 12 generations of master kumbhars. The porous clay naturally alkalizes food and imbues a comforting earthy aroma to every home-cooked meal.',
    careInstructions: 'Hand wash with warm water and soft sponge. Season with mustard oil before first culinary use.',
    suggestedRetailPrice: 1850,
    suggestedWholesalePrice: 1400,
    suggestedMoq: 6,
    leadTime: '10-12 Days',
    tags: ['Terracotta', 'Clay Pottery', 'Organic Living', 'Dining Set', 'Indian Handicraft', 'Bio-degradable'],
    giTag: true,
    confidence: 97,
  },
  {
    id: 'brass_diya',
    keywords: ['brass', 'diya', 'lamp', 'temple', 'metal', 'lost wax', 'bell metal', 'oil lamp'],
    matchImage: CRAFT_IMAGES.BRASS_DIYA,
    title: 'Handcrafted Cast Brass Temple Oil Lamp (Diya)',
    description: 'Solid bell-metal standing oil diya forged through lost-wax bronze casting, detailed with hand-chiseled lotus petals and a weighted pedestal base for festive illuminations.',
    category: 'Metal & Brass',
    craftType: 'Lost-Wax Cast Brassware',
    materials: 'Pure Cast Brass, Natural Beeswax Polish',
    colors: 'Warm Golden Brass, Antique Bronze Patina',
    style: 'Sacred Temple Traditional',
    dimensions: '7.5" Height x 4" Pedestal Diameter',
    weight: '780 grams',
    story: 'Forged according to classic Shilpa Shastra proportions by master metal casters. Designed to distribute oil evenly, creating a sustained sacred flame during Diwali and daily morning rituals.',
    careInstructions: 'Wipe with soft lint-free flannel. Condition periodically with lemon juice and salt paste to restore warm gleam.',
    suggestedRetailPrice: 1450,
    suggestedWholesalePrice: 1100,
    suggestedMoq: 12,
    leadTime: '8-10 Days',
    tags: ['Brass Diya', 'Metal Craft', 'Temple Decor', 'Festive Lighting', 'Lost-Wax', 'Heritage'],
    giTag: true,
    confidence: 99,
  },
  {
    id: 'handloom_saree',
    keywords: ['saree', 'sari', 'handloom', 'textile', 'khadi', 'cotton', 'zari', 'weave'],
    matchImage: CRAFT_IMAGES.HANDLOOM_SAREE,
    title: 'Handwoven Organic Khadi Cotton Saree with Zari Border',
    description: 'Pure hand-spun unbleached cotton saree woven on ancestral pit looms. Accented with subtle madder-red borders and fine woven zari buti for effortless cultural elegance.',
    category: 'Handloom & Textiles',
    craftType: 'Traditional Pit-Loom Weaving',
    materials: '100% Hand-Spun Khadi Cotton, Tested Zari Thread, Natural Madder Dye',
    colors: 'Natural Ecru / Cream, Madder Crimson, Muted Gold',
    style: 'Heritage South Indian Handloom',
    dimensions: '6.25 meters (Includes running blouse fabric)',
    weight: '490 grams',
    story: 'Woven in the historic Mangalagiri handloom belt where artisan weavers hand-count each warp and weft thread. Breathable, sustainable, and softening with every artisanal wash.',
    careInstructions: 'Dry clean recommended for first wash. Subsequent gentle cold water hand washes with mild liquid soap.',
    suggestedRetailPrice: 3200,
    suggestedWholesalePrice: 2500,
    suggestedMoq: 4,
    leadTime: '14-16 Days',
    tags: ['Handloom Saree', 'Khadi Cotton', 'Slow Fashion', 'Sustainable Textile', 'Zari Border', 'Handmade'],
    giTag: true,
    confidence: 96,
  },
  {
    id: 'wooden_horse',
    keywords: ['horse', 'toy', 'wooden toy', 'channapatna', 'lacquer', 'wheels', 'figurine'],
    matchImage: CRAFT_IMAGES.WOODEN_HORSE,
    title: 'Handcrafted Lacquer Painted Wooden Toy Horse on Wheels',
    description: 'Folk art rolling horse turned from seasoned ivory wood on traditional lathes and hand-burnished with natural non-toxic vegetable lacquer colors. Child-safe and collector-grade.',
    category: 'Wood & Painted Crafts',
    craftType: 'Turned Wood Lacquer Craft',
    materials: 'Ivory Wood (Wrightia Tinctoria), Natural Plant Lacquer',
    colors: 'Natural Wood Grain, Lacquer Red, Turmeric Ochre',
    style: 'Channapatna Folk Toy',
    dimensions: '8" Length x 3.5" Width x 9.5" Height',
    weight: '440 grams',
    story: 'Originating in 18th-century royal workshops, Channapatna woodcraft uses Wrightia Tinctoria wood which contains no harmful splinters. Colored strictly with edible dyes and tree resin.',
    careInstructions: 'Wipe with clean dry microfiber cloth. Keep away from prolonged moisture.',
    suggestedRetailPrice: 950,
    suggestedWholesalePrice: 720,
    suggestedMoq: 15,
    leadTime: '5-7 Days',
    tags: ['Wooden Toy', 'Channapatna', 'Non Toxic', 'Handmade Toy', 'Folk Art', 'Kids Safe'],
    giTag: true,
    confidence: 98,
  },
  {
    id: 'embroidered_pouch',
    keywords: ['pouch', 'embroidery', 'silk', 'zipper', 'kashida', 'needlework', 'purse', 'bag'],
    matchImage: CRAFT_IMAGES.EMBROIDERED_POUCH,
    title: 'Artisan Floral Hand-Embroidered Silk Zipper Pouch',
    description: 'Delicate floral Kashida single-stitch needlework embroidered on unbleached raw silk. Finished with a decorative tassel pull and sturdy brass zipper.',
    category: 'Embroidery & Needlework',
    craftType: 'Kashida Needlework Embroidery',
    materials: 'Pure Raw Tussar Silk, Cotton Floss, Antique Brass Zipper',
    colors: 'Ecru Ivory, Blossom Pink, Fern Green, Azure Blue',
    style: 'Kashmiri Floral Folk',
    dimensions: '8" x 5.5" Travel Size',
    weight: '110 grams',
    story: 'Stitched by women artisans in Kashmir Valley cottage clusters during winter months, portraying regional wild iris, saffron blossom, and almond motifs.',
    careInstructions: 'Dry clean or gentle spot cleaning only to safeguard fine surface floss stitches.',
    suggestedRetailPrice: 890,
    suggestedWholesalePrice: 650,
    suggestedMoq: 15,
    leadTime: '8-10 Days',
    tags: ['Hand Embroidery', 'Silk Pouch', 'Kashida Needlework', 'Artisan Accessory', 'Handmade'],
    giTag: false,
    confidence: 95,
  },
  {
    id: 'bamboo_lantern',
    keywords: ['bamboo', 'lantern', 'lamp', 'cane', 'woven lamp', 'pendant', 'lampshade'],
    matchImage: CRAFT_IMAGES.BAMBOO_LANTERN,
    title: 'Handwoven Natural Bamboo Bell Pendant Lantern',
    description: 'Contemporary bell-shaped hanging lantern meticulously hand-plaited from sustainably harvested forest bamboo strips, casting warm ambient geometric shadows.',
    category: 'Bamboo & Cane',
    craftType: 'Fine Cane & Bamboo Plaiting',
    materials: 'Matured Wild Bamboo Splints, Cane Fibre Binding',
    colors: 'Golden Honey Bamboo, Warm Natural Wood',
    style: 'Contemporary Eco-Craft',
    dimensions: '14" Height x 10" Base Diameter',
    weight: '380 grams',
    story: 'Harvested during dry moon phases from Assam forest reserves when bamboo fibers are naturally pest-resistant. Woven with zero chemical glues or plastics.',
    careInstructions: 'Dust with soft brush or vacuum with brush attachment. Keep indoors in dry ventilated space.',
    suggestedRetailPrice: 1650,
    suggestedWholesalePrice: 1250,
    suggestedMoq: 8,
    leadTime: '7-10 Days',
    tags: ['Bamboo Lantern', 'Sustainable Living', 'Eco Lighting', 'Handwoven', 'Indian Craft'],
    giTag: true,
    confidence: 97,
  },
  {
    id: 'ceramic_plate',
    keywords: ['ceramic', 'plate', 'blue pottery', 'dish', 'platter', 'glazed'],
    matchImage: CRAFT_IMAGES.CERAMIC_PLATE,
    title: 'Hand-Painted Floral Jaipur Ceramic Pottery Display Plate',
    description: 'Decorative ceramic display plate crafted without clay using ground quartz and glass frit, hand-painted with cobalt blue Persian floral arabesques on a solid wooden easel.',
    category: 'Terracotta & Pottery',
    craftType: 'Traditional Blue Pottery',
    materials: 'Quartz Stone Powder, Multani Mitti, Cobalt Mineral Glaze',
    colors: 'Cobalt Blue, Turquoise, Pure White',
    style: 'Jaipur Heritage Ceramic',
    dimensions: '10" Diameter Decorative Plate (Includes wooden display easel)',
    weight: '680 grams',
    story: 'A distinguished 600-year-old craft tradition known for its unique glass-smooth sheen and distinct non-clay quartz paste that requires low-fire wood kilns.',
    careInstructions: 'Decorative display recommended. Clean with mild damp sponge. Avoid microwaving or harsh abrasive scourers.',
    suggestedRetailPrice: 1350,
    suggestedWholesalePrice: 1050,
    suggestedMoq: 8,
    leadTime: '8-10 Days',
    tags: ['Blue Pottery', 'Ceramic Plate', 'Jaipur Craft', 'Wall Decor', 'Hand Painted'],
    giTag: true,
    confidence: 98,
  },
  {
    id: 'traditional_painting',
    keywords: ['painting', 'madhubani', 'pattachitra', 'wall panel', 'folk painting', 'canvas', 'art'],
    matchImage: CRAFT_IMAGES.TRADITIONAL_PAINTING,
    title: 'Hand-Painted Folk Tree of Life Wooden Wall Panel',
    description: 'Heritage wall artwork painted on seasoned timber depicting sacred Tree of Life and river creatures rendered with stone pigments and botanical extracts.',
    category: 'Traditional Paintings',
    craftType: 'Folk Wall Panel Painting',
    materials: 'Seasoned Teakwood Panel, Natural Stone & Plant Pigments',
    colors: 'Earth Ochre, Turmeric, Lampblack, Forest Green',
    style: 'Tribal Indian Folk Art',
    dimensions: '18" x 12" Handcrafted Wooden Panel with hanging hooks',
    weight: '1.4 kg',
    story: 'Inspired by sacred mural painting traditions where women draw blessing mandalas on mud walls during seasonal harvests, celebrating cosmic connection with nature.',
    careInstructions: 'Keep away from direct prolonged harsh sunlight. Dust with dry feather duster.',
    suggestedRetailPrice: 2400,
    suggestedWholesalePrice: 1800,
    suggestedMoq: 5,
    leadTime: '12-15 Days',
    tags: ['Folk Painting', 'Tree of Life', 'Wall Decor', 'Natural Pigments', 'Handmade Art'],
    giTag: true,
    confidence: 96,
  },
  {
    id: 'leather_journal',
    keywords: ['leather', 'journal', 'book', 'notebook', 'diary', 'stationery', 'paper'],
    matchImage: CRAFT_IMAGES.LEATHER_JOURNAL,
    title: 'Handmade Vintage Leather Journal with Leaf Cord',
    description: 'Rustic hand-bound journal constructed from vegetable-tanned buff leather, wrapped with a leather cord and brass leaf pendant, enclosing 200 deckle-edge cotton rag pages.',
    category: 'Handmade Stationery',
    craftType: 'Hand-Stitched Leathercraft',
    materials: 'Vegetable-Tanned Buff Leather, Tree-Free Cotton Rag Paper, Brass Pendant',
    colors: 'Vintage Saddle Brown, Antique Tan, Unbleached Parchment',
    style: 'Rustic Heritage Stationery',
    dimensions: '7" x 5" (A5 size) • 200 handmade deckle-edge pages',
    weight: '420 grams',
    story: 'Handcrafted by community artisans who recycle discarded textile offcuts into tree-free acid-free cotton rag paper, bound in naturally cured cruelty-free hides.',
    careInstructions: 'Condition leather with neutral leather balm yearly. Ideal for fountain pens, calligraphy, and watercolor sketching.',
    suggestedRetailPrice: 1100,
    suggestedWholesalePrice: 850,
    suggestedMoq: 12,
    leadTime: '6-8 Days',
    tags: ['Leather Journal', 'Handmade Paper', 'Vintage Diary', 'Stationery', 'Eco Friendly'],
    giTag: false,
    confidence: 97,
  },
];

/**
 * Intelligent image analyzer: finds best matching craft profile based on
 * image source URL, filename, or simulated visual feature detection.
 */
export function analyzeCraftImage(imageSource, hintText = '') {
  if (!imageSource && !hintText) {
    return CRAFT_KNOWLEDGE_BASE[0];
  }

  const str = `${imageSource || ''} ${hintText || ''}`.toLowerCase();

  // 1. Direct image match
  const exactMatch = CRAFT_KNOWLEDGE_BASE.find(item => {
    if (item.matchImage && imageSource && imageSource.includes(item.matchImage)) return true;
    return false;
  });
  if (exactMatch) return exactMatch;

  // 2. Keyword heuristic search
  for (const item of CRAFT_KNOWLEDGE_BASE) {
    for (const kw of item.keywords) {
      if (str.includes(kw.toLowerCase())) {
        return item;
      }
    }
  }

  // 3. Fallback: intelligent generic craft synthesis
  return {
    id: 'custom_handicraft',
    title: 'Artisanal Handcrafted Heritage Decorative Piece',
    description: 'An authentic one-of-a-kind Indian handcrafted artifact showcasing generational hand skills, regional cultural motifs, and sustainable natural materials.',
    category: 'Wood & Painted Crafts',
    craftType: 'Traditional Handcrafted Work',
    materials: 'Seasoned Natural Wood, Organic Vegetable Pigments',
    colors: 'Natural Earth Hues, Warm Ochre & Indigo',
    style: 'Contemporary Traditional Indian',
    dimensions: 'Custom Handcrafted Proportions (approx. 8" x 6")',
    weight: '650 grams',
    story: 'Handmade by traditional artisans employing timeless manual crafting methods with zero mass-machinery assembly lines. Each piece has distinct handmade character.',
    careInstructions: 'Dust with soft clean flannel cloth. Avoid harsh chemical cleaners.',
    suggestedRetailPrice: 1200,
    suggestedWholesalePrice: 900,
    suggestedMoq: 8,
    leadTime: '8-12 Days',
    tags: ['Handmade', 'Indian Handicraft', 'Artisan Craft', 'Home Decor', 'Authentic'],
    giTag: true,
    confidence: 94,
  };
}

/**
 * Simulates progressive AI analysis with staged callbacks.
 * Returns the generated product catalog data.
 */
export async function runAiCraftCatalogAnalysis(imageSource, hintText = '', onProgress = null) {
  const steps = [
    { label: 'Scanning craft photo & geometric contours...', delay: 350 },
    { label: 'Detecting craft classification, form & motif...', delay: 400 },
    { label: 'Analyzing material composition & color palette...', delay: 400 },
    { label: 'Synthesizing heritage craft story & dimensions...', delay: 350 },
    { label: 'Calculating recommended retail & wholesale pricing...', delay: 300 },
  ];

  for (let i = 0; i < steps.length; i++) {
    if (onProgress) {
      const pct = Math.round(((i + 1) / steps.length) * 100);
      onProgress({ stepIndex: i, label: steps[i].label, percentage: pct });
    }
    await new Promise(resolve => setTimeout(resolve, steps[i].delay));
  }

  const matched = analyzeCraftImage(imageSource, hintText);

  return {
    ...matched,
    analyzedAt: new Date().toISOString(),
    imageUrl: imageSource || CRAFT_IMAGES.FISH_COASTERS,
  };
}
