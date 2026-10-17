import React, { useState } from 'react';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { TabType } from '../types';

interface LearningModulesProps {
  onGoToSimulation: () => void;
  onGoToTransmission: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const LearningModules: React.FC<LearningModulesProps> = ({
  onGoToSimulation,
  onGoToTransmission,
  setActiveTab
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bab-1');
  const activeChapter = CURRICULUM_CHAPTERS.find(c => c.id === selectedChapterId) || CURRICULUM_CHAPTERS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Kurikulum Ekonomi Kelas XI SMA
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Modul Teori & Konsep Kebijakan Moneter
          </h2>
        </div>
        <div className="text-xs text-slate-500">
          5 Bab Terstruktur · Dilengkapi Contoh & Kasus Nyata
        </div>
      </div>

      {/* Main Chapter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Chapter Selector Menu */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Daftar Bab Pembelajaran
          </div>
          {CURRICULUM_CHAPTERS.map((chap) => {
            const isSelected = chap.id === selectedChapterId;
            return (
              <button
                key={chap.id}
                onClick={() => setSelectedChapterId(chap.id)}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-blue-950 text-white border-blue-900 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={isSelected ? 'text-amber-300 font-semibold' : 'text-slate-500'}>
                    {chap.readTime}
                  </span>
                  <span className="text-xs opacity-75">Bab {chap.id.replace('bab-', '')}</span>
                </div>
                <div className="font-semibold text-sm leading-snug">
                  {chap.title.replace(/^\d+\.\s*/, '')}
                </div>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {chap.subtitle}
                </p>
              </button>
            );
          })}

          {/* Quick jump callout */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 mt-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Praktikkan Langsung
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ingin melihat bagaimana teori ini bekerja di pasar nyata? Coba kendalikan instrumen moneter sebagai Gubernur Bank Indonesia.
            </p>
            <button
              onClick={onGoToSimulation}
              className="mt-3 w-full py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors text-center"
            >
              Buka Simulator RDG BI →
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          {/* Chapter Heading */}
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-blue-900">Bab Pembelajaran</span>
              <span aria-hidden="true">·</span>
              <span>{activeChapter.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>Kelas 11 SMA</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              {activeChapter.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {activeChapter.subtitle}
            </p>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Ringkasan Konsep
            </h4>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {activeChapter.content.overview}
            </p>
          </div>

          {/* Key Points */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Poin Kunci yang Harus Dikuasai
            </h4>
            <ul className="space-y-2.5">
              {activeChapter.content.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Table if available */}
          {activeChapter.content.tableData && (
            <div className="mt-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Matriks Perbandingan Strategi Moneter
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                    <tr>
                      {activeChapter.content.tableData.headers.map((h, i) => (
                        <th key={i} className="p-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeChapter.content.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-3 font-medium text-slate-900 whitespace-nowrap">{row[0]}</td>
                        <td className="p-3 text-slate-600">{row[1]}</td>
                        <td className="p-3 font-medium text-blue-900">{row[2]}</td>
                        <td className="p-3 text-slate-700">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Deep Dive sections */}
          <div className="mt-8 space-y-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pembahasan Mendalam
            </h4>
            {activeChapter.content.deepDive.map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors">
                <h5 className="font-bold text-slate-900 text-sm sm:text-base mb-2">
                  {item.heading}
                </h5>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.text}
                </p>
                {item.highlight && (
                  <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium">
                    <span className="font-bold">Catatan Penting: </span>{item.highlight}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quote if present */}
          {activeChapter.content.quote && (
            <div className="mt-8 p-5 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="italic text-sm text-blue-950 font-serif leading-relaxed">
                "{activeChapter.content.quote.text}"
              </p>
              <div className="mt-2 text-xs font-semibold text-blue-900 text-right">
                — {activeChapter.content.quote.author}
              </div>
            </div>
          )}

          {/* Bottom chapter navigation */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={onGoToTransmission}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Lihat Diagram Jalur Transmisi →
              </button>
              <button
                onClick={() => setActiveTab('kuis')}
                className="px-4 py-2 text-xs font-medium text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Uji Pemahaman di Kuis →
              </button>
            </div>

            {/* Next Chapter Button */}
            {selectedChapterId !== 'bab-5' ? (
              <button
                onClick={() => {
                  const currentIdx = CURRICULUM_CHAPTERS.findIndex(c => c.id === selectedChapterId);
                  if (currentIdx < CURRICULUM_CHAPTERS.length - 1) {
                    setSelectedChapterId(CURRICULUM_CHAPTERS[currentIdx + 1].id);
                  }
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Lanjut ke Bab Berikutnya →
              </button>
            ) : (
              <button
                onClick={onGoToSimulation}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors"
              >
                Lanjut ke Simulasi Gubernur BI →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
