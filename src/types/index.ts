export type TabType = 
  | 'materi'
  | 'simulasi'
  | 'transmisi'
  | 'kalkulator'
  | 'kuis'
  | 'flashcard'
  | 'kasus';

export interface CurriculumChapter {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  iconName: string;
  content: {
    overview: string;
    keyPoints: string[];
    deepDive: {
      heading: string;
      text: string;
      highlight?: string;
    }[];
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    quote?: {
      text: string;
      author: string;
    };
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  category: 'Konsep Dasar' | 'Instrumen Moneter' | 'Analisis Kasus' | 'Jalur Transmisi';
  difficulty: 'Mudah' | 'Sedang' | 'HOTS (Tinggi)';
}

export interface Flashcard {
  id: string;
  term: string;
  category: string;
  definition: string;
  example: string;
  keyTakeaway: string;
}

export interface SimulationState {
  quarter: number; // e.g. 1, 2, 3...
  inflationRate: number; // Target 2.5% ± 1% (1.5 - 3.5%)
  economicGrowth: number; // Target 5.0% - 5.5%
  exchangeRate: number; // e.g. 15,600 IDR / USD
  unemploymentRate: number; // e.g. 5.2%
  moneySupplyIndex: number; // Triliun Rupiah, e.g. 8,800
  stabilityScore: number; // 0 - 100
  feedbackMessage: string;
  history: {
    quarter: number;
    inflation: number;
    growth: number;
    exchange: number;
    biRate: number;
  }[];
}

export interface SimulationControls {
  biRate: number; // 3.0% - 9.0%
  openMarketOperation: 'jual_sbn' | 'netral' | 'beli_sbn';
  reserveRequirement: number; // GWM in % (e.g. 5% - 14%)
  creditPolicy: 'ketat' | 'normal' | 'longgar';
  moralSuasion: 'dorong_tabungan' | 'netral' | 'dorong_investasi';
}

export interface ScenarioMission {
  id: string;
  title: string;
  badge: string;
  description: string;
  initialState: {
    inflationRate: number;
    economicGrowth: number;
    exchangeRate: number;
    unemploymentRate: number;
    moneySupplyIndex: number;
  };
  targetCondition: string;
  hint: string;
}
