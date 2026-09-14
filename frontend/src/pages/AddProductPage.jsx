import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CRAFT_CATEGORIES } from '../data/mockData';
import { CRAFT_IMAGES } from '../data/craftImages';
import { runAiCraftCatalogAnalysis, CRAFT_KNOWLEDGE_BASE } from '../data/craftAiCatalog';
import { Badge } from '../components/Badge';
import { 
  PackagePlus, 
  Sparkles, 
  Upload, 
  Camera,
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowLeft, 
  Eye, 
  MapPin, 
  IndianRupee,
  Clock,
  RefreshCw,
  Edit3,
  Check,
  Tag,
  ShieldCheck,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Sparkle
} from 'lucide-react';

const SAMPLE_PHOTO_PRESETS = [
  {
    name: "Fish Wooden Coasters",
    subtitle: "Wood & Painted Crafts",
    url: CRAFT_IMAGES.FISH_COASTERS,
  },
  {
    name: "Terracotta Dinner Set",
    subtitle: "Terracotta & Pottery",
    url: CRAFT_IMAGES.TERRACOTTA_SET,
  },
  {
    name: "Cast Brass Temple Diya",
    subtitle: "Metal & Brass",
    url: CRAFT_IMAGES.BRASS_DIYA,
  },
  {
    name: "Handloom Khadi Saree",
    subtitle: "Handloom & Textiles",
    url: CRAFT_IMAGES.HANDLOOM_SAREE,
  },
  {
    name: "Wooden Toy Horse",
    subtitle: "Wood & Painted Crafts",
    url: CRAFT_IMAGES.WOODEN_HORSE,
  },
  {
    name: "Floral Embroidered Pouch",
    subtitle: "Embroidery & Needlework",
    url: CRAFT_IMAGES.EMBROIDERED_POUCH,
  },
  {
    name: "Handwoven Bamboo Lantern",
    subtitle: "Bamboo & Cane",
    url: CRAFT_IMAGES.BAMBOO_LANTERN,
  },
  {
    name: "Jaipur Ceramic Plate",
    subtitle: "Terracotta & Pottery",
    url: CRAFT_IMAGES.CERAMIC_PLATE,
  },
  {
    name: "Folk Wall Painting Panel",
    subtitle: "Traditional Paintings",
    url: CRAFT_IMAGES.TRADITIONAL_PAINTING,
  },
  {
    name: "Vintage Leather Journal",
    subtitle: "Handmade Stationery",
    url: CRAFT_IMAGES.LEATHER_JOURNAL,
  },
];

export function AddProductPage() {
  const { artisan, addProduct, navigateTo } = useApp();

  // Workflow states: 'upload' | 'analyzing' | 'preview'
  const [workflowState, setWorkflowState] = useState('upload');
  const [activeTab, setActiveTab] = useState('ai-preview'); // 'ai-preview' | 'edit-form'

  // Image and analysis state
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState({ stepIndex: 0, label: '', percentage: 0 });
  const [aiConfidence, setAiConfidence] = useState(98);

  // Form data populated by AI
  const [formData, setFormData] = useState({
    name: '',
    category: 'Wood & Painted Crafts',
    craftType: '',
    price: '',
    wholesalePrice: '',
    moq: 10,
    leadTime: '7-10 Days',
    materials: '',
    colors: '',
    style: '',
    dimensions: '',
    weight: '',
    stockStatus: 'In Stock',
    stockQuantity: 15,
    giTag: true,
    story: '',
    careInstructions: '',
    tags: [],
    imageUrl: '',
  });

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Trigger AI catalog generation from an image source
  const handleStartAiAnalysis = async (imgSource, hint = '') => {
    setSelectedImage(imgSource);
    setWorkflowState('analyzing');
    setAnalysisProgress({ stepIndex: 0, label: 'Scanning craft photo & visual contours...', percentage: 15 });

    try {
      const generated = await runAiCraftCatalogAnalysis(imgSource, hint, (progress) => {
        setAnalysisProgress(progress);
      });

      setAiConfidence(generated.confidence || 98);
      setFormData({
        name: generated.title || '',
        category: generated.category || 'Wood & Painted Crafts',
        craftType: generated.craftType || 'Hand-Painted Wooden Craft',
        price: generated.suggestedRetailPrice || 850,
        wholesalePrice: generated.suggestedWholesalePrice || 600,
        moq: generated.suggestedMoq || 10,
        leadTime: generated.leadTime || '7-10 Days',
        materials: generated.materials || 'Natural Wood, Organic Paint',
        colors: generated.colors || 'Multicolor',
        style: generated.style || 'Folk Art / Traditional Indian',
        dimensions: generated.dimensions || 'Standard Traditional Size',
        weight: generated.weight || '500g',
        stockStatus: 'In Stock',
        stockQuantity: 15,
        giTag: generated.giTag ?? true,
        story: generated.story || generated.description || '',
        careInstructions: generated.careInstructions || 'Wipe with a clean dry cloth.',
        tags: generated.tags || ['Handmade', 'Indian Handicraft'],
        imageUrl: imgSource,
      });

      setWorkflowState('preview');
      setActiveTab('ai-preview');
    } catch (err) {
      console.error('AI Analysis failed:', err);
      setWorkflowState('upload');
    }
  };

  // Handle local image file upload (drag or file select)
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      handleStartAiAnalysis(dataUrl, file.name);
    };
    reader.readAsDataURL(file);
  };

  // Handle re-generation of details
  const handleRegenerate = () => {
    if (selectedImage) {
      handleStartAiAnalysis(selectedImage, formData.name);
    }
  };

  // Submit and publish product to live catalog
  const handlePublish = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Please confirm product name and price before publishing.');
      return;
    }

    addProduct({
      ...formData,
      price: Number(formData.price),
      wholesalePrice: formData.wholesalePrice ? Number(formData.wholesalePrice) : Math.round(Number(formData.price) * 0.75),
      moq: Number(formData.moq) || 5,
      images: [formData.imageUrl || selectedImage || CRAFT_IMAGES.FISH_COASTERS],
    });

    navigateTo('my-products');
  };

  // Add / remove tag in edit mode
  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigateTo('dashboard')}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Add New Craft to Catalog
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-[#C85A32] border border-[#C85A32]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" /> AI-Powered Craft Cataloging
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Snap or upload a single craft photo. Our AI automatically identifies craft traditions, materials, dimensions, and wholesale pricing.
          </p>
        </div>

        {/* Workflow step pills */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/80 rounded-2xl border border-stone-200 text-xs font-semibold text-stone-600">
          <button
            onClick={() => setWorkflowState('upload')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              workflowState === 'upload' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'hover:text-stone-900'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-700 text-[10px] flex items-center justify-center font-bold">1</span>
            Upload Photo
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <div
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              workflowState === 'analyzing' ? 'bg-amber-100 text-amber-900 font-bold shadow-xs' : 'text-stone-400'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-700 text-[10px] flex items-center justify-center font-bold">2</span>
            AI Analysis
          </div>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <div
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              workflowState === 'preview' ? 'bg-emerald-100 text-emerald-900 font-bold shadow-xs' : 'text-stone-400'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-700 text-[10px] flex items-center justify-center font-bold">3</span>
            Review & Publish
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: UPLOAD / SNAP PHOTO FIRST (No huge manual form upfront) */}
      {/* ========================================================================= */}
      {workflowState === 'upload' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Hero Upload Dropzone */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed border-[#EFE7DB] hover:border-[#C85A32]/50 shadow-sm text-center transition-all">
            <div className="max-w-xl mx-auto space-y-5">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#FAF0E6] to-amber-50 border border-[#C85A32]/20 flex items-center justify-center text-[#C85A32] shadow-sm">
                <Sparkles className="w-10 h-10 animate-pulse text-[#C85A32]" />
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Upload or Capture Craft Photo
                </h2>
                <p className="text-sm text-stone-500 mt-2">
                  No manual typing needed! The AI will automatically write your listing, detect craft materials, formulate heritage story, and calculate fair prices.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#C85A32] hover:bg-[#A33D1C] text-white font-semibold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Photo from Device</span>
                </button>

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={cameraInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Snap Live Photo</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-stone-400 pt-2">
                <span>PNG, JPG, WEBP up to 25MB</span>
                <span>•</span>
                <span>Offline-Ready AI Engine</span>
                <span>•</span>
                <span>Zero Manual Typing</span>
              </div>
            </div>
          </div>

          {/* Quick Select Preset Gallery to Test AI Instantly */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7DB] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-[#C85A32] text-xs flex items-center justify-center font-bold">✨</span>
                  Or Test AI with Authentic Craft Photographs
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Click any craft below to see how our AI generates the full catalog listing in real-time.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 self-start sm:self-auto">
                10 Real Artisan Crafts Available
              </span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
              {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleStartAiAnalysis(preset.url, preset.name)}
                  className="group bg-stone-50 hover:bg-white rounded-2xl p-2 border border-stone-200 hover:border-[#C85A32] hover:shadow-md cursor-pointer transition-all flex flex-col"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-stone-200">
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] text-white font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" /> Run AI Catalog
                      </span>
                    </div>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#C85A32] truncate transition-colors">
                    {preset.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">
                    {preset.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: "ANALYZING YOUR CRAFT..." LOADING STATE */}
      {/* ========================================================================= */}
      {workflowState === 'analyzing' && (
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#EFE7DB] shadow-md max-w-2xl mx-auto text-center space-y-8 animate-fadeIn">
          
          {/* Craft Image with Futuristic Scanner Animation */}
          <div className="relative w-48 h-48 mx-auto rounded-3xl overflow-hidden border-4 border-amber-200 shadow-lg bg-stone-100">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Analyzing Craft"
                className="w-full h-full object-cover"
              />
            )}
            {/* Glowing Scanning Line */}
            <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#C85A32] to-transparent shadow-[0_0_15px_#C85A32] animate-bounce" style={{ top: `${(analysisProgress.percentage * 0.8) + 10}%` }}></div>
            <div className="absolute inset-0 bg-[#C85A32]/10 mix-blend-multiply"></div>
            <div className="absolute bottom-2 inset-x-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold py-1 px-2 rounded-lg">
              Craft Vision Neural Scan
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-[#C85A32]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C85A32]" />
              <span>Analyzing your craft...</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Generating Complete Product Catalog
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              Our intelligent vision model is extracting motifs, regional craft taxonomy, pricing indexes, and writing your heritage story.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-stone-700">{analysisProgress.label || 'Processing...'}</span>
              <span className="text-[#C85A32]">{analysisProgress.percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-[#C85A32] transition-all duration-300 rounded-full"
                style={{ width: `${analysisProgress.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Step Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto text-left text-xs text-stone-600">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${analysisProgress.percentage >= 20 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold' : 'bg-stone-50 border-stone-200'}`}>
              <CheckCircle2 className={`w-4 h-4 ${analysisProgress.percentage >= 20 ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Craft Form & Silhouette</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${analysisProgress.percentage >= 40 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold' : 'bg-stone-50 border-stone-200'}`}>
              <CheckCircle2 className={`w-4 h-4 ${analysisProgress.percentage >= 40 ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Traditional Motifs & Taxonomy</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${analysisProgress.percentage >= 60 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold' : 'bg-stone-50 border-stone-200'}`}>
              <CheckCircle2 className={`w-4 h-4 ${analysisProgress.percentage >= 60 ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Natural Materials & Dimensions</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${analysisProgress.percentage >= 80 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold' : 'bg-stone-50 border-stone-200'}`}>
              <CheckCircle2 className={`w-4 h-4 ${analysisProgress.percentage >= 80 ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span>Fair Wholesale Pricing & MOQ</span>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: AI-GENERATED PRODUCT CATALOG REVIEW & PUBLISH */}
      {/* ========================================================================= */}
      {workflowState === 'preview' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* AI Success Banner with High-Level Actions */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-stone-50 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#C85A32] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl">
                    AI Craft Catalog Generated
                  </h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ✓ {aiConfidence}% Model Confidence
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  All fields have been automatically drafted from your craft image. Review, fine-tune if desired, and publish!
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
              <button
                type="button"
                onClick={handleRegenerate}
                className="px-3 py-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                <span>Regenerate Details</span>
              </button>

              <button
                type="button"
                onClick={() => setWorkflowState('upload')}
                className="px-3 py-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5 text-stone-500" />
                <span>Change Photo</span>
              </button>

              <button
                type="button"
                onClick={handlePublish}
                className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A33D1C] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <PackagePlus className="w-4 h-4" />
                <span>Publish to Live Catalog</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher: "AI Summary Preview" vs "Edit Details Form" */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('ai-preview')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'ai-preview'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Catalog Overview</span>
              </button>
              
              <button
                onClick={() => setActiveTab('edit-form')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'edit-form'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit & Fine-Tune Details</span>
              </button>
            </div>

            <span className="text-xs text-stone-400 hidden sm:inline">
              Changes sync directly to the Live Buyer Card preview
            </span>
          </div>

          {/* ===================================================================== */}
          {/* TAB 1: CLEAN AI PREVIEW (Simple, low-friction review for artisans)   */}
          {/* ===================================================================== */}
          {activeTab === 'ai-preview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: AI-Generated Product Specifications (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7DB] shadow-sm space-y-6">
                
                {/* Product Title & Category Header */}
                <div className="border-b border-stone-100 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-md bg-[#FAF0E6] text-[#C85A32] font-semibold text-xs uppercase tracking-wider">
                      {formData.category}
                    </span>
                    <span className="text-stone-400">•</span>
                    <span className="text-xs font-semibold text-stone-600">
                      {formData.craftType}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                    {formData.name}
                  </h2>
                </div>

                {/* AI Detected Core Metadata Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Suggested Materials</span>
                    <span className="text-xs font-semibold text-stone-900 mt-1 block">
                      {formData.materials}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Color Palette</span>
                    <span className="text-xs font-semibold text-stone-900 mt-1 block">
                      {formData.colors}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Craft Style</span>
                    <span className="text-xs font-semibold text-stone-900 mt-1 block">
                      {formData.style}
                    </span>
                  </div>
                </div>

                {/* Pricing & Commercial Terms Highlight */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-stone-50 border border-amber-200/80 space-y-3">
                  <span className="text-[11px] font-bold text-[#C85A32] uppercase tracking-wider block">
                    AI Suggested Pricing & Wholesale Terms
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[11px] text-stone-500 block">Retail Price</span>
                      <span className="text-xl font-bold text-stone-900 font-sans">
                        ₹{Number(formData.price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-500 block">Wholesale Price</span>
                      <span className="text-xl font-bold text-amber-800 font-sans">
                        ₹{Number(formData.wholesalePrice).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-500 block">Suggested MOQ</span>
                      <span className="text-base font-bold text-stone-900 mt-1 block">
                        {formData.moq} units
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-500 block">Lead Time</span>
                      <span className="text-base font-bold text-stone-900 mt-1 block">
                        {formData.leadTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Craft Story & Description */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C85A32]" />
                    Craft Description & Heritage Story
                  </h4>
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {formData.story}
                  </div>
                </div>

                {/* Dimensions & Care */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-stone-400 block font-medium">Estimated Dimensions</span>
                    <span className="font-bold text-stone-800 mt-0.5 block">{formData.dimensions}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-stone-400 block font-medium">Care Instructions</span>
                    <span className="font-bold text-stone-800 mt-0.5 block">{formData.careInstructions}</span>
                  </div>
                </div>

                {/* AI Suggested Tags */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    AI Suggested Tags
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium border border-stone-200 transition-colors inline-flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3 text-[#C85A32]" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('edit-form')}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-stone-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Need to change something? Edit Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePublish}
                    className="w-full sm:w-auto px-6 py-3 bg-[#C85A32] hover:bg-[#A33D1C] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <PackagePlus className="w-4 h-4" />
                    <span>Publish Directly with AI Catalog</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Live Buyer Card Preview (5 cols) */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-[#C85A32]" /> Live Buyer Card Preview
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">As shown in Marketplace</span>
                </div>

                {/* Product Card Preview */}
                <div className="bg-white rounded-3xl overflow-hidden border border-[#EFE7DB] shadow-md">
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={formData.imageUrl || selectedImage || CRAFT_IMAGES.FISH_COASTERS}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      {formData.giTag ? (
                        <Badge type="gi" text="GI Provenance" />
                      ) : (
                        <span className="bg-white/90 text-stone-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                          Handcrafted
                        </span>
                      )}
                      <Badge type="stock" text={formData.stockStatus} />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-[#1A1817]/85 text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                        {formData.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-stone-800">{artisan.name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-[#C85A32]" />
                        {artisan.village.split(',')[0]}, {artisan.state}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-lg leading-snug line-clamp-2">
                      {formData.name || 'Your Product Title'}
                    </h4>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {formData.story}
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-stone-400 block font-medium">Direct Retail</span>
                        <span className="text-xl font-bold text-stone-900 font-sans">
                          ₹{formData.price ? Number(formData.price).toLocaleString('en-IN') : '0'}
                        </span>
                      </div>
                      {formData.wholesalePrice && (
                        <div className="text-right">
                          <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded font-medium block">
                            Wholesale ₹{Number(formData.wholesalePrice).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">MOQ: {formData.moq} units</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF0E6] p-4 rounded-2xl border border-[#EACBB8] text-xs text-stone-600 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <p>
                    Publishing immediately lists this artifact under <strong>My Products</strong> and activates buyer enquiries across domestic boutiques and export buyers.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: EDIT & FINE-TUNE FORM (Artisan can edit any field)            */}
          {/* ===================================================================== */}
          {activeTab === 'edit-form' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Column (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7DB] shadow-sm">
                <form onSubmit={handlePublish} className="space-y-6">
                  
                  {/* Basic Craft Details */}
                  <div className="space-y-4">
                    <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                      <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                      Craft Identity & Category
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Craft Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                        >
                          {CRAFT_CATEGORIES.filter(c => c !== 'All Crafts').map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Craft Type
                        </label>
                        <input
                          type="text"
                          value={formData.craftType}
                          onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Craft Style
                        </label>
                        <input
                          type="text"
                          value={formData.style}
                          onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Stock Availability
                        </label>
                        <select
                          value={formData.stockStatus}
                          onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                        >
                          <option value="In Stock">In Stock (Ready to dispatch)</option>
                          <option value="Made to Order">Made to Order (Requires production lead time)</option>
                        </select>
                      </div>
                    </div>

                    {/* GI Tag Checkbox */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="giTag"
                        checked={formData.giTag}
                        onChange={(e) => setFormData({ ...formData, giTag: e.target.checked })}
                        className="mt-1 w-4 h-4 text-[#C85A32] rounded focus:ring-[#C85A32]"
                      />
                      <label htmlFor="giTag" className="text-xs text-stone-700 cursor-pointer">
                        <span className="font-bold text-amber-900 block">Recognized Geographical Indication (GI) Craft</span>
                        This piece belongs to an authentic registered Indian craft cluster.
                      </label>
                    </div>
                  </div>

                  {/* Pricing & Terms */}
                  <div className="space-y-4 pt-2">
                    <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                      <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                      Pricing & Wholesale Terms
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Retail Price (₹) *
                        </label>
                        <div className="relative">
                          <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                          <input
                            type="number"
                            required
                            min="50"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Wholesale Price (₹)
                        </label>
                        <div className="relative">
                          <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                          <input
                            type="number"
                            value={formData.wholesalePrice}
                            onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Wholesale MOQ
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.moq}
                          onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Handcrafting Lead Time
                        </label>
                        <input
                          type="text"
                          value={formData.leadTime}
                          onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Dimensions & Weight
                        </label>
                        <input
                          type="text"
                          value={formData.dimensions}
                          onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Materials & Story */}
                  <div className="space-y-4 pt-2">
                    <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                      <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                      Materials, Storytelling & Tags
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Materials Used
                      </label>
                      <input
                        type="text"
                        value={formData.materials}
                        onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Heritage Story / Description
                      </label>
                      <textarea
                        rows="4"
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white leading-relaxed"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Care Instructions
                      </label>
                      <input
                        type="text"
                        value={formData.careInstructions}
                        onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Tags (click x to remove)
                      </label>
                      <div className="flex flex-wrap gap-1.5 p-2 bg-stone-50 rounded-xl border border-stone-200">
                        {formData.tags.map((t, idx) => (
                          <span
                            key={idx}
                            onClick={() => handleRemoveTag(t)}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white text-stone-800 border border-stone-200 font-medium flex items-center gap-1 cursor-pointer hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
                            title="Click to remove"
                          >
                            #{t} ×
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('ai-preview')}
                      className="px-5 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-xl transition-colors"
                    >
                      Back to Overview
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#C85A32] hover:bg-[#A33D1C] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-sm transition-all flex items-center gap-2"
                    >
                      <PackagePlus className="w-4 h-4" />
                      Publish to Live Catalog
                    </button>
                  </div>

                </form>
              </div>

              {/* Right Column: Live Buyer Card Preview (5 cols) */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-[#C85A32]" /> Live Buyer Card Preview
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">Real-time sync</span>
                </div>

                {/* Live Preview Card */}
                <div className="bg-white rounded-3xl overflow-hidden border border-[#EFE7DB] shadow-md">
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={formData.imageUrl || selectedImage || CRAFT_IMAGES.FISH_COASTERS}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      {formData.giTag ? (
                        <Badge type="gi" text="GI Provenance" />
                      ) : (
                        <span className="bg-white/90 text-stone-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                          Handcrafted
                        </span>
                      )}
                      <Badge type="stock" text={formData.stockStatus} />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-[#1A1817]/85 text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                        {formData.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-stone-800">{artisan.name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-[#C85A32]" />
                        {artisan.village.split(',')[0]}, {artisan.state}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-lg leading-snug line-clamp-2">
                      {formData.name || 'Product Title'}
                    </h4>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {formData.story}
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-stone-400 block font-medium">Direct Retail</span>
                        <span className="text-xl font-bold text-stone-900 font-sans">
                          ₹{formData.price ? Number(formData.price).toLocaleString('en-IN') : '0'}
                        </span>
                      </div>
                      {formData.wholesalePrice && (
                        <div className="text-right">
                          <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded font-medium block">
                            Wholesale ₹{Number(formData.wholesalePrice).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">MOQ: {formData.moq} units</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
