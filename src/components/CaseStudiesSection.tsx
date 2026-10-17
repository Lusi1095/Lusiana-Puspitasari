import React, { useState } from 'react';
import balanceScaleImg from '../assets/images/economic_balance_scale_1792208675823.jpg';

interface RealCase {
  id: string;
  year: string;
  title: string;
  context: string;
  problem: string;
  biAction: string;
  outcome: string;
  lessonsLearned: string;
  studentReflection: string;
}

const HISTORICAL_CASES: RealCase[] = [
  {
    id: 'case-1998',
    year: '1997 - 1998',
    title: 'Krisis Moneter Asia & Lahirnya Independensi Bank Indonesia',
    context: 'Guncangan spekulasi mata uang yang berawal dari Baht Thailand merembet cepat ke seluruh Asia Tenggara, termasuk Indonesia.',
    problem: 'Nilai tukar Rupiah ambruk dari Rp2.500/USD ke level Rp16.000+/USD. Terjadi kepanikan penarikan uang di perbankan (bank run) dan lonjakan hiperinflasi hingga mencapai 77,6% per tahun.',
    biAction: 'Bank Indonesia saat itu menaikkan suku bunga Sertifikat Bank Indonesia (SBI) hingga lebih dari 70% untuk menahan laju penurunan Rupiah, serta menyalurkan Bantuan Likuiditas Bank Indonesia (BLBI).',
    outcome: 'Banyak bank bermasalah dilikuidasi atau digabung (merger menjadi Bank Mandiri). Krisis ini menjadi tonggak sejarah lahirnya UU No. 23 Tahun 1999 yang memberikan status INDEPENDEN bagi Bank Indonesia.',
    lessonsLearned: 'Bank sentral tidak boleh diperalat oleh kekuasaan politik untuk mencetak uang demi menambal utang belanja negara. Independensi bank sentral adalah fondasi stabilitas mata uang.',
    studentReflection: 'Jika Anda menjadi penentu kebijakan saat itu, mengapa menaikkan suku bunga hingga 70% terpaksa dilakukan meskipun berisiko mematikan usaha swasta?'
  },
  {
    id: 'case-2020',
    year: '2020 - 2021',
    title: 'Pandemi COVID-19: Kebijakan Luar Biasa & Burden Sharing',
    context: 'Pembatasan mobilitas sosial (PSBB/PPKM) melumpuhkan pusat perbelanjaan, transportasi, pariwisata, dan industri manufaktur.',
    problem: 'Pertumbuhan ekonomi Indonesia terkontraksi ke angka -2,07% (resesi pertama sejak 1998). Daya beli masyarakat anjlok tajam dan pengangguran meningkat.',
    biAction: 'Bank Indonesia memangkas suku bunga acuan ke titik terendah dalam sejarah Republik Indonesia (3,50%), menurunkan GWM bank, dan menyepakati skema Burden Sharing (berbagi beban) dengan membeli Surat Berharga Negara (SBN) di pasar perdana senilai ratusan triliun untuk mendanai vaksinasi gratis dan bansos.',
    outcome: 'Likuiditas perbankan tetap terjaga aman, tidak ada krisis perbankan sistemik, dan Indonesia mampu pulih cepat (V-shape recovery) mencapai pertumbuhan di atas 5% pada tahun 2022.',
    lessonsLearned: 'Dalam kondisi darurat nasional, sinergi antara Kebijakan Moneter (BI) dan Kebijakan Fiskal (Kemenkeu) dapat menyelamatkan jutaan nyawa dan lapangan kerja rakyat.',
    studentReflection: 'Mengapa menurunkan suku bunga acuan ke level 3,50% saat pandemi tidak memicu inflasi tinggi di tahun 2020?'
  },
  {
    id: 'case-2024',
    year: '2022 - 2024',
    title: 'Lonjakan Suku Bunga Global (The Fed) & Inovasi SRBI',
    context: 'Perang geopolitik dan krisis energi di Eropa memicu inflasi di negara maju (AS dan Eropa) melonjak ke rekor 40 tahun terakhir.',
    problem: 'Bank Sentral AS (Federal Reserve) menaikkan suku bunga dolarnya secara agresif dari 0,25% ke atas 5,25%. Investor global menarik dolar mereka dari pasar negara berkembang (capital outflow) kembali ke AS, mengancam pelemahan Rupiah ke atas Rp16.300/USD.',
    biAction: 'Bank Indonesia menaikkan BI-Rate secara antisipatif dan terukur hingga 6,25%, serta meluncurkan instrumen moneter pro-market: Sekuritas Rupiah Bank Indonesia (SRBI) dan Sekuritas Valas Bank Indonesia (SVBI) dengan imbal hasil menarik untuk menyerap dana asing.',
    outcome: 'Instrumen SRBI sukses menarik ratusan triliun rupiah aliran modal asing, cadangan devisa tetap kokoh di atas 130 miliar USD, dan inflasi domestik tetap terkendali di bawah 3%.',
    lessonsLearned: 'Bank Indonesia tidak hanya mengandalkan satu instrumen suku bunga, melainkan memadukan bauran kebijakan moneter pro-stability dan makroprudensial pro-growth.',
    studentReflection: 'Bagaimana penerbitan SRBI oleh Bank Indonesia bisa memperkuat kurs Rupiah tanpa harus menaikkan suku bunga kredit perbankan dalam negeri terlalu drastis?'
  }
];

export const CaseStudiesSection: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-2024');
  const activeCase = HISTORICAL_CASES.find(c => c.id === selectedCaseId) || HISTORICAL_CASES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Laboratorium Sejarah Ekonomi Riil
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Studi Kasus Kebijakan Moneter di Indonesia
          </h2>
        </div>
        <div className="text-xs text-slate-500">
          Analisis 3 Tonggak Krisis Moneter & Kebijakan Nyata
        </div>
      </div>

      {/* Case Timeline Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
        {HISTORICAL_CASES.map((c) => {
          const isSelected = c.id === selectedCaseId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-950 text-white border-blue-900 shadow-sm'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-blue-900'}`}>
                  Tahun {c.year}
                </span>
                <span className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  Kasus Nyata
                </span>
              </div>
              <div className="font-bold text-sm leading-snug">
                {c.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Detailed Case Analysis */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold text-blue-900 uppercase">
              Analisis Peristiwa Sejarah Ekonomi · Periode {activeCase.year}
            </span>
            <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">
              {activeCase.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {activeCase.context}
            </p>
          </div>

          {/* Problem & Guncangan */}
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
            <div className="text-xs font-bold uppercase tracking-wider text-red-900 mb-1">
              Guncangan Ekonomi Makro (Problem)
            </div>
            <p className="text-xs sm:text-sm text-red-950 leading-relaxed">
              {activeCase.problem}
            </p>
          </div>

          {/* BI Response */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              Respon Bauran Kebijakan Bank Indonesia (Aksi Moneter)
            </div>
            <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
              {activeCase.biAction}
            </p>
          </div>

          {/* Result & Outcome */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
              Hasil Akhir & Dampak Terhadap Perekonomian
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
              {activeCase.outcome}
            </p>
          </div>

          {/* Lessons Learned */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Pelajaran Berharga untuk Generasi Muda:
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {activeCase.lessonsLearned}
            </p>
          </div>

          {/* Student Critical Reflection */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
            <strong className="block mb-1 text-amber-900 font-bold uppercase tracking-wide">
              Pertanyaan Diskusi Kelas XI:
            </strong>
            <p className="italic leading-relaxed">
              "{activeCase.studentReflection}"
            </p>
          </div>
        </div>

        {/* Right: Balance Scale Visual & Educational Concept */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-blue-900 uppercase">
                Prinsip Keseimbangan
              </span>
              <h4 className="font-display text-sm font-bold text-slate-900 mt-0.5">
                Stabilitas Harga vs Pertumbuhan Ekonomi
              </h4>
            </div>
            <div className="relative bg-slate-100 aspect-4/3 overflow-hidden">
              <img
                src={balanceScaleImg}
                alt="Neraca Keseimbangan Ekonomi Indonesia: Inflasi vs Pertumbuhan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                Tugas Bank Indonesia diibaratkan menjaga keseimbangan timbangan:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Bila terlalu condong ke pengetatan, inflasi turun namun pengangguran naik.</li>
                <li>Bila terlalu melonggarkan uang, pertumbuhan melaju namun harga barang meroket.</li>
              </ul>
              <p className="pt-1 text-slate-500 font-medium">
                Keahlian moneter terletak pada menemukan titik ekuilibrium yang presisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
