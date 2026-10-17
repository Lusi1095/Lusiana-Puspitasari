import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenAiTutor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAiTutor }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-display text-xl font-bold text-white tracking-tight">
              EkoMoneter BI
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Media pembelajaran interaktif materi Kebijakan Moneter di Indonesia untuk siswa Sekolah Menengah Atas (SMA) Kelas 11 Fase F. Mengacu pada pedoman capaian Kurikulum Merdeka dan standar kebanksentralan Bank Indonesia.
            </p>
            <div className="text-[11px] text-slate-500 pt-2">
              Didedikasikan untuk guru dan peserta didik ekonomi di seluruh Indonesia.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Modul Pembelajaran
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('materi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Materi & Teori 5 Bab
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('simulasi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Simulasi Gubernur Bank Indonesia
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('transmisi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Jalur Transmisi Kebijakan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('kalkulator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kalkulator Pengganda Uang (GWM)
                </button>
              </li>
            </ul>
          </div>

          {/* Assessment & Resources */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Asesmen & Bantuan
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('kuis');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kuis Formatif & HOTS
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('flashcard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kartu Glosarium Istilah
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('kasus');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Studi Kasus 1998 & Pandemi
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAiTutor}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                >
                  Tanya Asisten AI Bank Indonesia
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} EkoMoneter · Media Edukasi Kebijakan Moneter Bank Indonesia SMA Kelas 11.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Kurikulum Merdeka Fase F</span>
            <span>·</span>
            <span>UU No. 4/2023 (P2SK)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
