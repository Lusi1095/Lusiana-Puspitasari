import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SimulationState, SimulationControls } from '../types';
import { SCENARIO_MISSIONS } from '../data/curriculumData';

export const GovernorSimulator: React.FC = () => {
  const [controls, setControls] = useState<SimulationControls>({
    biRate: 6.00,
    openMarketOperation: 'netral',
    reserveRequirement: 9.0,
    creditPolicy: 'normal',
    moralSuasion: 'netral'
  });

  const [state, setState] = useState<SimulationState>({
    quarter: 1,
    inflationRate: 2.8,
    economicGrowth: 5.1,
    exchangeRate: 15650,
    unemploymentRate: 5.1,
    moneySupplyIndex: 8800,
    stabilityScore: 92,
    feedbackMessage: 'Perekonomian nasional berada dalam kondisi seimbang. Inflasi berada di koridor target Bank Indonesia (2,5% ± 1%).',
    history: [
      { quarter: 1, inflation: 2.8, growth: 5.1, exchange: 15650, biRate: 6.00 }
    ]
  });

  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [missionSolved, setMissionSolved] = useState<boolean>(false);

  // Load a mission scenario
  const handleSelectMission = (missionId: string) => {
    const mission = SCENARIO_MISSIONS.find(m => m.id === missionId);
    if (!mission) return;

    setSelectedMissionId(missionId);
    setMissionSolved(false);

    setState({
      quarter: 1,
      inflationRate: mission.initialState.inflationRate,
      economicGrowth: mission.initialState.economicGrowth,
      exchangeRate: mission.initialState.exchangeRate,
      unemploymentRate: mission.initialState.unemploymentRate,
      moneySupplyIndex: mission.initialState.moneySupplyIndex,
      stabilityScore: 48,
      feedbackMessage: `Misi dimulai: ${mission.title}. ${mission.description}`,
      history: [
        {
          quarter: 1,
          inflation: mission.initialState.inflationRate,
          growth: mission.initialState.economicGrowth,
          exchange: mission.initialState.exchangeRate,
          biRate: controls.biRate
        }
      ]
    });
  };

  const handleReset = () => {
    setSelectedMissionId(null);
    setMissionSolved(false);
    setControls({
      biRate: 6.00,
      openMarketOperation: 'netral',
      reserveRequirement: 9.0,
      creditPolicy: 'normal',
      moralSuasion: 'netral'
    });
    setState({
      quarter: 1,
      inflationRate: 2.8,
      economicGrowth: 5.1,
      exchangeRate: 15650,
      unemploymentRate: 5.1,
      moneySupplyIndex: 8800,
      stabilityScore: 92,
      feedbackMessage: 'Simulasi diatur ulang ke kondisi normal makroekonomi Indonesia.',
      history: [
        { quarter: 1, inflation: 2.8, growth: 5.1, exchange: 15650, biRate: 6.00 }
      ]
    });
  };

  // Run Next Quarter RDG Simulation
  const handleRunNextQuarter = () => {
    // 1. Calculate net monetary stance pressure
    // Base normal is biRate: 6.0%, opt: netral, gwm: 9.0%, credit: normal
    let monetaryDrag = 0; // positive = contractionary (pulling down inflation & growth)

    // BI-Rate impact
    monetaryDrag += (controls.biRate - 6.0) * 0.45;

    // OPT impact
    if (controls.openMarketOperation === 'jual_sbn') {
      monetaryDrag += 0.6; // sells bonds -> contracts money
    } else if (controls.openMarketOperation === 'beli_sbn') {
      monetaryDrag -= 0.6; // buys bonds -> expands money
    }

    // GWM impact
    monetaryDrag += (controls.reserveRequirement - 9.0) * 0.25;

    // Credit Policy impact
    if (controls.creditPolicy === 'ketat') {
      monetaryDrag += 0.35;
    } else if (controls.creditPolicy === 'longgar') {
      monetaryDrag -= 0.35;
    }

    // Moral Suasion impact
    if (controls.moralSuasion === 'dorong_tabungan') {
      monetaryDrag += 0.15;
    } else if (controls.moralSuasion === 'dorong_investasi') {
      monetaryDrag -= 0.15;
    }

    // 2. Compute new state values with inertia
    let newInflation = state.inflationRate - (monetaryDrag * 0.65);
    // Natural reversion or random small shocks
    newInflation = Math.max(0.5, Math.min(12.0, Number(newInflation.toFixed(1))));

    let newGrowth = state.economicGrowth - (monetaryDrag * 0.35);
    newGrowth = Math.max(0.2, Math.min(7.5, Number(newGrowth.toFixed(1))));

    let newUnemployment = state.unemploymentRate + (monetaryDrag * 0.25);
    newUnemployment = Math.max(3.8, Math.min(9.5, Number(newUnemployment.toFixed(1))));

    // Exchange rate: Higher interest rate strengthens Rupiah (lower IDR per USD)
    let newExchange = state.exchangeRate - (monetaryDrag * 140);
    newExchange = Math.max(14200, Math.min(17200, Math.round(newExchange)));

    // Money supply: Drag shrinks it
    let newMoneySupply = state.moneySupplyIndex - Math.round(monetaryDrag * 180);

    // Calculate Stability Score (0-100)
    // Target inflation is 2.5% ± 1% (1.5 - 3.5)
    const inflationDiff = Math.abs(newInflation - 2.5);
    let infScore = Math.max(0, 100 - inflationDiff * 25);

    // Target growth is ~ 5.2%
    const growthDiff = Math.abs(newGrowth - 5.2);
    let growthScore = Math.max(0, 100 - growthDiff * 20);

    // Target exchange rate is ~ 15500
    const exchangeDiff = Math.abs(newExchange - 15500);
    let exchangeScore = Math.max(0, 100 - (exchangeDiff / 30));

    const totalStability = Math.round(infScore * 0.45 + growthScore * 0.35 + exchangeScore * 0.20);

    // Generate dynamic feedback message
    let feedback = '';
    if (newInflation > 4.0) {
      feedback = 'Peringatan: Laju inflasi melebihi batas atas target BI (3,5%). Pertimbangkan menaikkan BI-Rate atau menjual surat berharga (OPT) untuk menyerap likuiditas.';
    } else if (newInflation < 1.5) {
      feedback = 'Inflasi terlalu rendah (disinflasi/risiko deflasi), mengindikasikan daya beli masyarakat lesu. Bank sentral dapat melonggarkan suku bunga untuk mendongkrak peredaran uang.';
    } else if (newGrowth < 3.5) {
      feedback = 'Pertumbuhan ekonomi mengalami perlambatan signifikan. Pengetatan moneter yang berlebihan menekan sektor riil. Evaluasi kebijakan kredit dan suku bunga.';
    } else if (newExchange > 16300) {
      feedback = 'Nilai tukar Rupiah terdepresiasi tajam. Kenaikan suku bunga acuan dan penarikan likuiditas valas dapat menahan arus modal keluar (capital flight).';
    } else {
      feedback = 'Keputusan Dewan Gubernur berhasil menjaga stabilitas ekonomi makro. Inflasi dalam sasaran dan pertumbuhan berjalan sehat!';
    }

    // Check mission victory conditions
    if (selectedMissionId === 'misi-1' && newInflation <= 3.5 && newExchange <= 15800) {
      setMissionSolved(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      feedback = 'Selamat! Misi 1 Berhasil: Anda sukses menjinakkan lonjakan inflasi kembali ke koridor aman!';
    } else if (selectedMissionId === 'misi-2' && newGrowth >= 4.5 && newUnemployment <= 6.0) {
      setMissionSolved(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      feedback = 'Selamat! Misi 2 Berhasil: Roda ekonomi kembali bergairah di atas 4,5% berkat kebijakan ekspansif yang terukur!';
    } else if (selectedMissionId === 'misi-3' && newExchange <= 15800 && newInflation <= 3.8) {
      setMissionSolved(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      feedback = 'Selamat! Misi 3 Berhasil: Nilai Rupiah berhasil distabilkan dari guncangan modal global!';
    }

    const nextQuarter = state.quarter + 1;
    const newHistory = [
      ...state.history,
      {
        quarter: nextQuarter,
        inflation: newInflation,
        growth: newGrowth,
        exchange: newExchange,
        biRate: controls.biRate
      }
    ];

    setState({
      quarter: nextQuarter,
      inflationRate: newInflation,
      economicGrowth: newGrowth,
      exchangeRate: newExchange,
      unemploymentRate: newUnemployment,
      moneySupplyIndex: newMoneySupply,
      stabilityScore: Math.max(10, Math.min(100, totalStability)),
      feedbackMessage: feedback,
      history: newHistory
    });
  };

  // Status badges without pills
  const getInflationStatus = (val: number) => {
    if (val >= 1.5 && val <= 3.5) {
      return { text: '● Sesuai Target Sasaran', color: 'text-emerald-700' };
    } else if (val > 3.5) {
      return { text: '▲ Inflasi Tinggi (Overheating)', color: 'text-red-700' };
    } else {
      return { text: '▼ Terlalu Rendah (Deflasi/Lesu)', color: 'text-amber-700' };
    }
  };

  const currentInfStatus = getInflationStatus(state.inflationRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Laboratorium Interaktif Siswa SMA
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Simulasi Kebijakan: Menjadi Gubernur Bank Indonesia
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Reset Simulasi
          </button>
        </div>
      </div>

      {/* Scenario Missions Selectors */}
      <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Pilih Misi Skenario Nyata:
          </span>
          <span className="text-xs text-slate-500">
            Uji kepiawaian merumuskan bauran kebijakan moneter di bawah tekanan krisis
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SCENARIO_MISSIONS.map((m) => {
            const isSelected = selectedMissionId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMission(m.id)}
                className={`text-left p-3 rounded-lg text-xs transition-all border ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-950 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-xs leading-snug">{m.badge}</div>
                <div className={`mt-1 font-bold text-xs ${isSelected ? 'text-amber-300' : 'text-slate-900'}`}>
                  {m.title}
                </div>
                <div className={`mt-1 line-clamp-2 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                  {m.targetCondition}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mission Solved Alert */}
      {missionSolved && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-sm flex items-center justify-between">
          <div>
            <div className="font-bold">Misi Berhasil Diselesaikan! 🎉</div>
            <p className="text-xs mt-0.5 text-emerald-800">
              Kebijakan moneter Anda berhasil menstabilkan makroekonomi sesuai mandat Bank Indonesia.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-md hover:bg-emerald-700"
          >
            Coba Misi Lain
          </button>
        </div>
      )}

      {/* 2-Zone Sandbox: Stage & Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Interactive Stage (Indicators & Real-time Trends) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Indicators 4-Box Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Box 1: Inflasi */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium">Laju Inflasi</div>
              <div className="text-2xl font-bold font-display text-slate-900 tabular-nums mt-1">
                {state.inflationRate.toFixed(1)}%
              </div>
              <div className={`text-xs font-medium mt-1 ${currentInfStatus.color}`}>
                {currentInfStatus.text}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Target: 2,5% ± 1%</div>
            </div>

            {/* Box 2: Pertumbuhan Ekonomi */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium">Pertumbuhan PDB</div>
              <div className="text-2xl font-bold font-display text-slate-900 tabular-nums mt-1">
                {state.economicGrowth.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {state.economicGrowth >= 5.0 ? '● Kuat & Produktif' : '▼ Melambat'}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Target: ~5,2%</div>
            </div>

            {/* Box 3: Kurs Rupiah */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium">Kurs USD/IDR</div>
              <div className="text-xl font-bold font-display text-slate-900 tabular-nums mt-1">
                Rp{state.exchangeRate.toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {state.exchangeRate <= 15800 ? '● Rupiah Stabil' : '▲ Tekanan Depresiasi'}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Pasar Spot Jakarta</div>
            </div>

            {/* Box 4: Skor Stabilitas */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium">Indeks Stabilitas BI</div>
              <div className="text-2xl font-bold font-display text-blue-900 tabular-nums mt-1">
                {state.stabilityScore}<span className="text-xs text-slate-500 font-normal">/100</span>
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {state.stabilityScore >= 80 ? 'Kinerja Sangat Baik' : 'Butuh Penyesuaian'}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Mandat Makro BI</div>
            </div>
          </div>

          {/* Secondary stats row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
              <span className="text-xs text-slate-600">Tingkat Pengangguran:</span>
              <span className="text-xs font-bold font-mono text-slate-900 tabular-nums">
                {state.unemploymentRate.toFixed(1)}%
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
              <span className="text-xs text-slate-600">Estimasi Uang Beredar (M2):</span>
              <span className="text-xs font-bold font-mono text-slate-900 tabular-nums">
                Rp{state.moneySupplyIndex.toLocaleString('id-ID')} T
              </span>
            </div>
          </div>

          {/* Feedback & Economic Assessment Notice */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider">
                Evaluasi Rapat Dewan Gubernur (RDG) · Kuartal ke-{state.quarter}
              </span>
              <span className="font-mono text-xs text-slate-500">Siklus Kuartalan</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {state.feedbackMessage}
            </p>
          </div>

          {/* Historical Trend Chart (SVG Line Graph) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="font-bold text-slate-900 uppercase tracking-wide">
                Grafik Tren Kuartal: Inflasi vs Suku Bunga BI-Rate
              </span>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
                  <span className="text-slate-600">Inflasi (%)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-900 inline-block"></span>
                  <span className="text-slate-600">BI-Rate (%)</span>
                </span>
              </div>
            </div>

            {/* SVG responsive graph */}
            <div className="h-44 w-full relative flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
                {/* Grid horizontal guidelines */}
                <line x1="30" y1="20" x2="490" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="60" x2="490" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="100" x2="490" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="140" x2="490" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                {/* Y-axis labels */}
                <text x="5" y="24" className="text-[10px] fill-slate-400 font-mono">10%</text>
                <text x="5" y="64" className="text-[10px] fill-slate-400 font-mono">6%</text>
                <text x="5" y="104" className="text-[10px] fill-slate-400 font-mono">3%</text>
                <text x="5" y="144" className="text-[10px] fill-slate-400 font-mono">0%</text>

                {/* Target inflation corridor safe zone (1.5% to 3.5%) */}
                {/* y=140 is 0%, y=20 is 10%. Scale is 120px for 10% -> 12px per 1% */}
                {/* 3.5% = 140 - (3.5 * 12) = 98. 1.5% = 140 - (1.5 * 12) = 122 */}
                <rect x="30" y="98" width="460" height="24" fill="#ecfdf5" opacity="0.6" />
                <text x="400" y="114" className="text-[9px] fill-emerald-700 font-medium">Koridor Target BI</text>

                {/* Plot Inflation Line */}
                {state.history.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={state.history
                      .map((h, i) => {
                        const x = 40 + (i / Math.max(state.history.length - 1, 1)) * 430;
                        const y = 140 - Math.min(10, Math.max(0, h.inflation)) * 12;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                )}

                {/* Plot BI-Rate Line */}
                {state.history.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#1e3a8a"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={state.history
                      .map((h, i) => {
                        const x = 40 + (i / Math.max(state.history.length - 1, 1)) * 430;
                        const y = 140 - Math.min(10, Math.max(0, h.biRate)) * 12;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                )}

                {/* Data points */}
                {state.history.map((h, i) => {
                  const x = 40 + (i / Math.max(state.history.length - 1, 1)) * 430;
                  const yInf = 140 - Math.min(10, Math.max(0, h.inflation)) * 12;
                  const yRate = 140 - Math.min(10, Math.max(0, h.biRate)) * 12;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={yInf} r="4" fill="#dc2626" />
                      <circle cx={x} cy={yRate} r="4" fill="#1e3a8a" />
                      <text x={x} y="155" textAnchor="middle" className="text-[10px] fill-slate-500 font-mono">
                        Q{h.quarter}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="text-right text-[11px] text-slate-500 mt-2">
              Sumbu X: Kuartal · Garis Merah: Inflasi Riil · Garis Biru Putus: BI-Rate
            </div>
          </div>
        </div>

        {/* Right: Parameter Control Deck (Levers of Monetary Policy) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="border-b border-slate-100 pb-4 mb-5">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Meja Kerja Dewan Gubernur
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                Instrumen Kebijakan Moneter
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Sesuaikan 5 tuas kebijakan di bawah ini sebelum mengesahkan hasil Rapat Dewan Gubernur.
              </p>
            </div>

            {/* Lever 1: Suku Bunga Acuan (BI-Rate) */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-900">
                  1. Suku Bunga Acuan (BI-Rate)
                </label>
                <span className="font-mono text-sm font-bold text-blue-900 tabular-nums">
                  {controls.biRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min="3.00"
                max="9.00"
                step="0.25"
                value={controls.biRate}
                onChange={(e) => setControls({ ...controls, biRate: parseFloat(e.target.value) })}
                className="w-full accent-blue-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>3.00% (Sangat Longgar)</span>
                <span>6.00% (Netral)</span>
                <span>9.00% (Sangat Ketat)</span>
              </div>
            </div>

            {/* Lever 2: Operasi Pasar Terbuka (OPT) */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-semibold text-slate-900 block">
                2. Operasi Pasar Terbuka (OPT / Jual-Beli SBN)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, openMarketOperation: 'jual_sbn' })}
                  className={`py-2 px-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.openMarketOperation === 'jual_sbn'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Jual SBN/SRBI
                  <span className="block text-[10px] opacity-80 mt-0.5">Tarik Uang (Ketat)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, openMarketOperation: 'netral' })}
                  className={`py-2 px-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.openMarketOperation === 'netral'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Netral
                  <span className="block text-[10px] opacity-80 mt-0.5">Jaga Keseimbangan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, openMarketOperation: 'beli_sbn' })}
                  className={`py-2 px-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.openMarketOperation === 'beli_sbn'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Beli SBN
                  <span className="block text-[10px] opacity-80 mt-0.5">Suntik Likuiditas</span>
                </button>
              </div>
            </div>

            {/* Lever 3: Giro Wajib Minimum (GWM) */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-900">
                  3. Rasio Giro Wajib Minimum (GWM)
                </label>
                <span className="font-mono text-sm font-bold text-blue-900 tabular-nums">
                  {controls.reserveRequirement.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="5.0"
                max="14.0"
                step="0.5"
                value={controls.reserveRequirement}
                onChange={(e) => setControls({ ...controls, reserveRequirement: parseFloat(e.target.value) })}
                className="w-full accent-blue-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>5.0% (Kredit Leluasa)</span>
                <span>9.0% (Standar)</span>
                <span>14.0% (Cadangan Tinggi)</span>
              </div>
            </div>

            {/* Lever 4: Kebijakan Kredit Selektif */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-semibold text-slate-900 block">
                4. Pengawasan Kredit & Makroprudensial
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, creditPolicy: 'ketat' })}
                  className={`py-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.creditPolicy === 'ketat'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ketat (5C Ketat)
                </button>
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, creditPolicy: 'normal' })}
                  className={`py-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.creditPolicy === 'normal'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, creditPolicy: 'longgar' })}
                  className={`py-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.creditPolicy === 'longgar'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Longgar (DP 0%)
                </button>
              </div>
            </div>

            {/* Lever 5: Imbauan Moral (Moral Suasion) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-900 block">
                5. Imbauan Moral (Moral Suasion / Komunikasi RDG)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, moralSuasion: 'dorong_tabungan' })}
                  className={`py-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.moralSuasion === 'dorong_tabungan'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ajak Menabung
                </button>
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, moralSuasion: 'netral' })}
                  className={`py-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.moralSuasion === 'netral'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Netral
                </button>
                <button
                  type="button"
                  onClick={() => setControls({ ...controls, moralSuasion: 'dorong_investasi' })}
                  className={`py-2 text-xs font-medium rounded-lg text-center transition-colors border ${
                    controls.moralSuasion === 'dorong_investasi'
                      ? 'bg-blue-900 text-white border-blue-950 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Pacu Investasi
                </button>
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleRunNextQuarter}
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ketuk Palu RDG (Lanjut Kuartal ke-{state.quarter + 1})</span>
              <span>→</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Sistem akan menghitung pergerakan transmisi moneter terhadap inflasi, pertumbuhan, dan kurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
