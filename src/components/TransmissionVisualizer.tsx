import React, { useState } from 'react';

interface StageDetail {
  id: number;
  stageName: string;
  actor: string;
  contractiveAction: string;
  expansiveAction: string;
  explanationContractive: string;
  explanationExpansive: string;
  realWorldAnalogy: string;
}

const TRANSMISSION_STAGES: StageDetail[] = [
  {
    id: 1,
    stageName: '1. Penetapan Sinyal Kebijakan Bank Sentral',
    actor: 'Dewan Gubernur Bank Indonesia',
    contractiveAction: 'Menaikkan BI-Rate (misal dari 6,00% ke 6,25%)',
    expansiveAction: 'Menurunkan BI-Rate (misal dari 6,00% ke 5,50%)',
    explanationContractive: 'Bank Indonesia mengirim sinyal tegas ke pasar uang bahwa likuiditas rupiah perlu diperketat untuk meredam potensi lonjakan inflasi.',
    explanationExpansive: 'Bank Indonesia menurunkan suku bunga acuan untuk memberikan stimulus bagi likuiditas perbankan dan mendorong gairah bisnis.',
    realWorldAnalogy: 'Ibarat sopir mobil yang mulai menekan pedal rem (kontraktif) atau menekan pedal gas (ekspansif).'
  },
  {
    id: 2,
    stageName: '2. Reaksi Pasar Uang Antar Bank (PUAB)',
    actor: 'Pasar Keuangan & Bank-Bank Komersial',
    contractiveAction: 'Suku Bunga Pinjaman Antarbank Naik (IndONIA meningkat)',
    expansiveAction: 'Suku Bunga PUAB Melandai Turun',
    explanationContractive: 'Biaya pinjam-meminjam dana jangka pendek antar bank umum menjadi lebih mahal. Bank yang kekurangan likuiditas harus membayar bunga lebih tinggi.',
    explanationExpansive: 'Likuiditas antarbank melimpah dan murah, bank-bank tidak saling memperebutkan dana jangka pendek dengan bunga tinggi.',
    realWorldAnalogy: 'Ibarat harga air bersih di pasar grosir yang menjadi lebih mahal atau lebih murah bagi seluruh pedagang.'
  },
  {
    id: 3,
    stageName: '3. Penyesuaian Bunga Deposito & Kredit',
    actor: 'Bank Umum (BCA, Mandiri, BRI, BNI, dll)',
    contractiveAction: 'Bunga Simpanan Naik & Bunga Pinjaman Kredit Naik',
    expansiveAction: 'Bunga Deposito Turun & Bunga Kredit Menjadi Murah',
    explanationContractive: 'Bank umum menaikkan bunga deposito hingga 6% agar nasabah tidak kabur. Bersamaan dengan itu, bunga kredit modal kerja dan KPR dinaikkan menjadi lebih mahal.',
    explanationExpansive: 'Bank umum memangkas bunga kredit KPR dan kredit usaha agar masyarakat dan pelaku bisnis tertarik mengajukan pinjaman baru.',
    realWorldAnalogy: 'Bank memasang papan promo bunga tabungan tinggi (dorong simpan) atau promo bunga KPR super murah (dorong belanja).'
  },
  {
    id: 4,
    stageName: '4. Respon Rumah Tangga & Pelaku Usaha',
    actor: 'Masyarakat Umum & Pengusaha',
    contractiveAction: 'Giat Menabung, Tunda Cicilan & Tunda Investasi Pabrik',
    expansiveAction: 'Tarik Tabungan untuk Belanja, Ajukan Kredit Modal Usaha',
    explanationContractive: 'Masyarakat lebih memilih menyimpan uang di bank karena imbal hasil deposito menarik. Pengusaha menunda ekspansi pabrik baru karena beban bunga pinjaman terlalu berat.',
    explanationExpansive: 'Bunga tabungan yang rendah membuat warga enggan mendiamkan uangnya; pengusaha gencar meminjam modal untuk membuka cabang toko baru.',
    realWorldAnalogy: 'Keluarga menunda beli mobil baru dengan cicilan mahal, atau sebaliknya berbondong-bondong beli rumah karena cicilan murah.'
  },
  {
    id: 5,
    stageName: '5. Pergeseran Permintaan Agregat (AD)',
    actor: 'Pasar Barang & Jasa Nasional',
    contractiveAction: 'Total Belanja Nasional Melandai Turun (AD Bergeser ke Kiri)',
    expansiveAction: 'Total Belanja Nasional Melonjak Naik (AD Bergeser ke Kanan)',
    explanationContractive: 'Perputaran uang di pasar melambat. Konsumsi masyarakat atas barang sekunder menurun dan pembelian peralatan industri oleh korporasi berkurang.',
    explanationExpansive: 'Peredaran uang meningkat pesat. Restoran, pabrik, mal, dan toko ritel dipadati pembeli sehingga pesanan barang membludak.',
    realWorldAnalogy: 'Kepadatan pengunjung di pasar grosir Tanah Abang atau mall yang menyusut tertib atau membludak ramai.'
  },
  {
    id: 6,
    stageName: '6. Keseimbangan Akhir Makroekonomi',
    actor: 'Perekonomian Indonesia Secara Menyeluruh',
    contractiveAction: 'Laju Inflasi Terkendali Turun & Nilai Kurs Rupiah Menguat',
    expansiveAction: 'Pertumbuhan Ekonomi (PDB) Meningkat & Lapangan Kerja Bertambah',
    explanationContractive: 'Karena pembeli berkurang, pedagang tidak berani menaikkan harga sembarangan. Laju inflasi berhasil dijinakkan masuk ke target sasaran BI (1,5% - 3,5%).',
    explanationExpansive: 'Produksi barang dan jasa melonjak, pabrik merekrut karyawan baru, angka pengangguran turun, dan pertumbuhan PDB nasional terdongkrak.',
    realWorldAnalogy: 'Harga beras dan cabai kembali stabil terjangkau, atau lowongan kerja baru terbuka luas bagi lulusan sekolah.'
  }
];

export const TransmissionVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'contractive' | 'expansive'>('contractive');
  const [activeStageId, setActiveStageId] = useState<number>(1);

  const activeStage = TRANSMISSION_STAGES.find(s => s.id === activeStageId) || TRANSMISSION_STAGES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Mekanisme Transmisi Moneter
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Visualizer Interaktif: Jalur Transmisi Kebijakan Moneter
          </h2>
        </div>
        
        {/* Toggle Mode Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setMode('contractive')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'contractive'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kebijakan Kontraktif (BI-Rate Naik)
          </button>
          <button
            onClick={() => setMode('expansive')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'expansive'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kebijakan Ekspansif (BI-Rate Turun)
          </button>
        </div>
      </div>

      {/* Brief explanation strip */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>
          <strong className="text-slate-900">Petunjuk Belajar: </strong>
          Klik salah satu dari 6 simpul tahapan di bawah ini untuk melihat bagaimana keputusan moneter bergerak merambat dari kantor pusat BI hingga ke dompet masyarakat.
        </span>
        <span className="font-mono text-slate-500 whitespace-nowrap">
          Waktu Perambatan (Lag): 3 - 18 Bulan
        </span>
      </div>

      {/* 6 Stages Flow Diagram */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        {TRANSMISSION_STAGES.map((stage) => {
          const isSelected = stage.id === activeStageId;
          const actionText = mode === 'contractive' ? stage.contractiveAction : stage.expansiveAction;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-blue-900/40'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-blue-900'}`}>
                    Tahap 0{stage.id}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {stage.actor.split(' ')[0]}
                  </span>
                </div>
                <div className="font-semibold text-xs leading-snug line-clamp-2">
                  {stage.stageName.replace(/^\d+\.\s*/, '')}
                </div>
              </div>

              <div className={`mt-3 pt-2 text-[11px] border-t leading-tight ${
                isSelected ? 'border-blue-900 text-slate-200' : 'border-slate-100 text-slate-600'
              }`}>
                {actionText}
              </div>

              {/* Step indicator arrow for desktop */}
              {stage.id < 6 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-bold">
                  ›
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel for Active Stage */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-blue-900 uppercase">
              Detail Tahapan Transmisi Moneter · Tahap {activeStage.id} dari 6
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {activeStage.stageName}
            </h3>
          </div>
          <div className="text-xs text-slate-500">
            Pelaku Utama: <strong className="text-slate-900">{activeStage.actor}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Action Card */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Tindakan pada Kebijakan {mode === 'contractive' ? 'Kontraktif (Ketat)' : 'Ekspansif (Longgar)'}
            </div>
            <div className="font-bold text-base text-slate-900 mb-3">
              {mode === 'contractive' ? activeStage.contractiveAction : activeStage.expansiveAction}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {mode === 'contractive' ? activeStage.explanationContractive : activeStage.explanationExpansive}
            </p>
          </div>

          {/* Real World Analogy Card */}
          <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/70">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
              Analogi Dunia Nyata (Mudah Dipahami Siswa)
            </div>
            <p className="text-sm text-amber-950 leading-relaxed italic">
              "{activeStage.realWorldAnalogy}"
            </p>
            <div className="mt-4 text-xs text-amber-900 leading-relaxed">
              <strong>Refleksi Siswa: </strong>
              Bayangkan bagaimana orang tua Anda atau pemilik warung di dekat sekolah menyikapi perubahan suku bunga tabungan atau cicilan bulanan!
            </div>
          </div>
        </div>

        {/* Navigation between steps */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={activeStageId === 1}
            onClick={() => setActiveStageId(prev => Math.max(1, prev - 1))}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
          >
            ← Tahap Sebelumnya
          </button>
          <div className="text-xs text-slate-500">
            Gunakan tombol panah untuk menyusuri alur
          </div>
          <button
            disabled={activeStageId === 6}
            onClick={() => setActiveStageId(prev => Math.min(6, prev + 1))}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
          >
            Tahap Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
};
