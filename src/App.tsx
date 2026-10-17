import { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LearningModules } from './components/LearningModules';
import { GovernorSimulator } from './components/GovernorSimulator';
import { TransmissionVisualizer } from './components/TransmissionVisualizer';
import { MoneyMultiplierCalculator } from './components/MoneyMultiplierCalculator';
import { FlashcardsSection } from './components/FlashcardsSection';
import { QuizAssessment } from './components/QuizAssessment';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { AiTutorModal } from './components/AiTutorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('materi');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  const handleStartLearning = () => {
    setActiveTab('materi');
    const el = document.getElementById('main-content-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSimulator = () => {
    setActiveTab('simulasi');
    const el = document.getElementById('main-content-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSwitchTab = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSwitchTab}
        onOpenAiTutor={() => setIsAiModalOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onStartLearning={handleStartLearning}
        onOpenSimulator={handleOpenSimulator}
        setActiveTab={handleSwitchTab}
      />

      {/* Main Interactive Work Area */}
      <main id="main-content-view" className="flex-1">
        {activeTab === 'materi' && (
          <LearningModules
            onGoToSimulation={() => handleSwitchTab('simulasi')}
            onGoToTransmission={() => handleSwitchTab('transmisi')}
            setActiveTab={handleSwitchTab}
          />
        )}

        {activeTab === 'simulasi' && <GovernorSimulator />}

        {activeTab === 'transmisi' && <TransmissionVisualizer />}

        {activeTab === 'kalkulator' && <MoneyMultiplierCalculator />}

        {activeTab === 'flashcard' && <FlashcardsSection />}

        {activeTab === 'kuis' && <QuizAssessment />}

        {activeTab === 'kasus' && <CaseStudiesSection />}
      </main>

      {/* Gemini AI Economic Assistant Modal */}
      <AiTutorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={handleSwitchTab}
        onOpenAiTutor={() => setIsAiModalOpen(true)}
      />
    </div>
  );
}
