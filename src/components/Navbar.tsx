import React from 'react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAiTutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenAiTutor }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('materi')}
            className="text-left font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-900 transition-colors"
          >
            EkoMoneter BI
          </button>

          {/* Zone 2: 4-5 concise single-line text links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('materi')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'materi' ? 'text-blue-900 font-semibold border-blue-900' : 'border-transparent'
              }`}
            >
              Materi Pelajaran
            </button>
            <button
              onClick={() => setActiveTab('simulasi')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'simulasi' ? 'text-blue-900 font-semibold border-blue-900' : 'border-transparent'
              }`}
            >
              Simulasi Gubernur BI
            </button>
            <button
              onClick={() => setActiveTab('transmisi')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'transmisi' ? 'text-blue-900 font-semibold border-blue-900' : 'border-transparent'
              }`}
            >
              Jalur Transmisi
            </button>
            <button
              onClick={() => setActiveTab('kalkulator')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'kalkulator' ? 'text-blue-900 font-semibold border-blue-900' : 'border-transparent'
              }`}
            >
              Kalkulator GWM
            </button>
            <button
              onClick={() => setActiveTab('flashcard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'flashcard' ? 'text-blue-900 font-semibold border-blue-900' : 'border-transparent'
              }`}
            >
              Glosarium & Kartu
            </button>
            <button
              onClick={() => setActiveTab('kuis')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'kuis' ? 'text-blue-900 font-semibold border-blue-900' : 'border-transparent'
              }`}
            >
              Kuis Formatif
            </button>
            <button
              onClick={() => setActiveTab('kasus')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'kasus' ? 'text-blue-900 font-semibold border-blue-900' : 'border-transparent'
              }`}
            >
              Studi Kasus Riil
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAiTutor}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Tanya Guru AI</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab scrollbar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          <button
            onClick={() => setActiveTab('materi')}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'materi' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Materi
          </button>
          <button
            onClick={() => setActiveTab('simulasi')}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'simulasi' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Simulasi BI
          </button>
          <button
            onClick={() => setActiveTab('transmisi')}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'transmisi' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Transmisi
          </button>
          <button
            onClick={() => setActiveTab('kalkulator')}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'kalkulator' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Kalkulator
          </button>
          <button
            onClick={() => setActiveTab('flashcard')}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'flashcard' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Glosarium
          </button>
          <button
            onClick={() => setActiveTab('kuis')}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'kuis' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Kuis Asesmen
          </button>
          <button
            onClick={() => setActiveTab('kasus')}
            className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'kasus' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Studi Kasus
          </button>
        </div>
      </div>
    </header>
  );
};
