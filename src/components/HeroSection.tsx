import React from 'react';
import { TabType } from '../types';
import heroImage from '../assets/images/hero_monetary_policy_bi_1792208676597.jpg';

interface HeroSectionProps {
  onStartLearning: () => void;
  onOpenSimulator: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onOpenSimulator,
  setActiveTab,
}) => {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Main 2-column split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata without pills */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                <span className="text-blue-900 font-bold">Ekonomi SMA Kelas 11</span>
                <span aria-hidden="true">·</span>
                <span>Fase F Kurikulum Merdeka</span>
                <span aria-hidden="true">·</span>
                <span>Modul Bank Sentral</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl">
                Memahami Kebijakan Moneter di Indonesia
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Pelajari bagaimana Bank Indonesia menjaga stabilitas nilai Rupiah, mengendalikan laju inflasi, dan menggerakkan roda pertumbuhan ekonomi nasional melalui instrumen moneter modern.
              </p>

              {/* Kurikulum Merdeka Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Capaian Pembelajaran (CP) & Tujuan Pembelajaran:
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Peserta didik mampu menganalisis konsep kebijakan moneter, membedakan kebijakan ekspansif (easy money) dan kontraktif (tight money), mengevaluasi peran 5 instrumen pokok Bank Indonesia, serta memproyeksikan dampaknya terhadap kesejahteraan masyarakat.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartLearning}
                className="px-5 py-2.5 bg-blue-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-sm whitespace-nowrap"
              >
                Pelajari 5 Bab Materi
              </button>
              <button
                onClick={onOpenSimulator}
                className="px-5 py-2.5 bg-slate-100 text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors border border-slate-300 whitespace-nowrap"
              >
                Coba Simulasi Gubernur BI
              </button>
              <button
                onClick={() => setActiveTab('kuis')}
                className="px-4 py-2.5 text-blue-900 hover:text-blue-950 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Ikuti Kuis Formatif →
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm min-h-[320px] bg-slate-900">
            <img
              src={heroImage}
              alt="Gedung Bank Indonesia dan Arus Moneter Nasional"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Scrim overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-mono tracking-wider text-amber-300 uppercase">
                Bank Sentral Republik Indonesia
              </span>
              <p className="text-sm font-medium mt-1 leading-snug">
                Bank Indonesia: Independen, Kredibel, Menjaga Kestabilan Nilai Rupiah.
              </p>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip below hero */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-slate-500 font-medium">Target Inflasi Nasional</div>
            <div className="text-2xl font-bold font-display text-slate-900 tabular-nums mt-1">
              2,5% <span className="text-xs text-slate-500 font-normal">± 1%</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Sasaran Pemerintah & BI</div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Instrumen Moneter Pokok</div>
            <div className="text-2xl font-bold font-display text-slate-900 tabular-nums mt-1">
              5 Pilar
            </div>
            <div className="text-xs text-slate-500 mt-0.5">OPT, Diskonto, GWM, Kredit, Moral</div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Mandat Konstitusional</div>
            <div className="text-2xl font-bold font-display text-slate-900 mt-1">
              Stabilitas Nilai
            </div>
            <div className="text-xs text-slate-500 mt-0.5">UU No. 4/2023 (UU P2SK)</div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Tingkat Kurikulum</div>
            <div className="text-2xl font-bold font-display text-slate-900 mt-1">
              Kelas 11 SMA
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Fase F - Ekonomi Makro</div>
          </div>
        </div>
      </div>
    </section>
  );
};
