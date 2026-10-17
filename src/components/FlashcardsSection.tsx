import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';

export const FlashcardsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  const categories = ['Semua', 'Konsep Dasar', 'Instrumen', 'Strategi', 'Indikator Makro', 'Matematika Moneter'];

  const filteredCards = activeCategory === 'Semua'
    ? FLASHCARDS_DATA
    : FLASHCARDS_DATA.filter(fc => fc.category.includes(activeCategory) || activeCategory.includes(fc.category));

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const masteredCount = Object.values(masteredCards).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Glosarium & Hafalan Cepat
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Kartu Flashcard Istilah Moneter
          </h2>
        </div>
        <div className="text-xs text-slate-500">
          Progres Hafalan: <strong className="text-blue-900 font-mono">{masteredCount}</strong> dari {FLASHCARDS_DATA.length} Istilah Dikuasai
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-900 text-white border-blue-950 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredCards.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          const isMastered = !!masteredCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="group h-72 cursor-pointer perspective"
            >
              <div
                className={`w-full h-full rounded-2xl border transition-all duration-300 relative p-6 flex flex-col justify-between ${
                  isFlipped
                    ? 'bg-blue-950 text-white border-blue-900 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {!isFlipped ? (
                  /* Front Side */
                  <>
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <span className="font-semibold text-blue-900">{card.category}</span>
                        <span className="text-[11px]">Klik untuk Membalik ↺</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-slate-900 mt-2">
                        {card.term}
                      </h3>
                      <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                        Sentuh kartu untuk melihat definisi resmi Bank Indonesia, contoh konkret, dan intisari hafalan.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={(e) => toggleMastered(card.id, e)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                          isMastered
                            ? 'bg-emerald-100 text-emerald-800 font-bold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isMastered ? '✓ Sudah Dikuasai' : 'Tandai Hafal'}
                      </button>
                      <span className="text-xs text-blue-900 font-semibold group-hover:underline">
                        Buka Kartu →
                      </span>
                    </div>
                  </>
                ) : (
                  /* Back Side */
                  <>
                    <div className="overflow-y-auto pr-1">
                      <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                        <span className="font-mono text-amber-300 font-bold">{card.term}</span>
                        <span className="text-[10px]">Klik untuk Kembali ↺</span>
                      </div>
                      <p className="text-xs text-slate-100 leading-relaxed mb-3">
                        {card.definition}
                      </p>
                      <div className="p-2.5 rounded-lg bg-blue-900/60 border border-blue-800/80 text-[11px] text-slate-200 mb-2 leading-relaxed">
                        <strong className="text-amber-300">Contoh: </strong>{card.example}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        <strong className="text-emerald-300">Intisari: </strong>{card.keyTakeaway}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-blue-900/80 mt-2">
                      <button
                        onClick={(e) => toggleMastered(card.id, e)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                          isMastered
                            ? 'bg-emerald-500 text-white font-bold'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {isMastered ? '✓ Sudah Dikuasai' : 'Tandai Hafal'}
                      </button>
                      <span className="text-[11px] text-slate-400">
                        Balik ↺
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
