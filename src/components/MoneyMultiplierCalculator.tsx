import React, { useState } from 'react';
import moneyFlowDiagram from '../assets/images/diagram_money_flow_bi_1792208676502.jpg';

export const MoneyMultiplierCalculator: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(100); // Miliar Rupiah
  const [gwmRatio, setGwmRatio] = useState<number>(8); // 8%

  // Calculations
  const gwmDecimal = gwmRatio / 100;
  const moneyMultiplier = 1 / gwmDecimal;
  const totalMoneyCreation = initialDeposit * moneyMultiplier;
  const initialReserveRequired = initialDeposit * gwmDecimal;
  const initialLoanDisbursed = initialDeposit - initialReserveRequired;

  // Multi-stage cascade (Bank 1, Bank 2, Bank 3)
  const bank1Deposit = initialDeposit;
  const bank1Reserve = bank1Deposit * gwmDecimal;
  const bank1Loan = bank1Deposit - bank1Reserve;

  const bank2Deposit = bank1Loan;
  const bank2Reserve = bank2Deposit * gwmDecimal;
  const bank2Loan = bank2Deposit - bank2Reserve;

  const bank3Deposit = bank2Loan;
  const bank3Reserve = bank3Deposit * gwmDecimal;
  const bank3Loan = bank3Deposit - bank3Reserve;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Alat Hitung Matematika Moneter
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Kalkulator Pengganda Uang (Money Multiplier) & GWM
          </h2>
        </div>
        <div className="text-xs text-slate-500">
          Rumus: M = (1 / GWM) × Tabungan Awal
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Interactive Input Levers & Calculations */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-display text-base font-bold text-slate-900 mb-4">
              Masukkan Variabel Perbankan
            </h3>

            {/* Input 1: Setoran Awal (Deposito Nasabah) */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-900">
                  Setoran Awal Uang Primer (Deposito Baru di Bank Pertama):
                </label>
                <span className="font-mono text-sm font-bold text-blue-900 tabular-nums">
                  Rp{initialDeposit.toLocaleString('id-ID')} Miliar
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="w-full accent-blue-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Rp10 M</span>
                <span>Rp250 M</span>
                <span>Rp500 M</span>
              </div>
            </div>

            {/* Input 2: Rasio Giro Wajib Minimum (GWM) */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-900">
                  Ketentuan Giro Wajib Minimum (GWM) oleh Bank Indonesia:
                </label>
                <span className="font-mono text-sm font-bold text-blue-900 tabular-nums">
                  {gwmRatio.toFixed(1)}% (0,{gwmRatio < 10 ? '0' : ''}{Math.round(gwmRatio)})
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                step="0.5"
                value={gwmRatio}
                onChange={(e) => setGwmRatio(Number(e.target.value))}
                className="w-full accent-blue-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>4.0% (Ekspansif / Pelonggaran)</span>
                <span>8.0% (Standar BI)</span>
                <span>20.0% (Sangat Ketat)</span>
              </div>
            </div>

            {/* Output Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-500 font-medium">Angka Pengganda (Multiplier)</div>
                <div className="text-xl font-bold font-mono text-blue-900 tabular-nums mt-1">
                  {moneyMultiplier.toFixed(2)}x
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Faktor pelipatgandaan uang</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] text-slate-500 font-medium">Cadangan Wajib di BI</div>
                <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                  Rp{initialReserveRequired.toFixed(1)} M
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Dikunci di kas Bank Indonesia</div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <div className="text-[11px] text-blue-900 font-medium">Total Potensi Uang Giral (M)</div>
                <div className="text-xl font-bold font-mono text-blue-950 tabular-nums mt-1">
                  Rp{Math.round(totalMoneyCreation).toLocaleString('id-ID')} M
                </div>
                <div className="text-[10px] text-blue-900 mt-0.5">Beredar di masyarakat luas</div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Multi-Bank Table Cascade */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Simulasi Proses Penciptaan Uang Antar-Bank (Fractional Reserve Banking)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Tahap Perbankan</th>
                    <th className="p-3">Simpanan Diterima</th>
                    <th className="p-3">Cadangan Wajib ke BI ({gwmRatio}%)</th>
                    <th className="p-3">Kredit Disalurkan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-3 font-sans font-medium text-slate-900">Bank 1 (Penerima Awal)</td>
                    <td className="p-3 font-bold text-blue-900">Rp{bank1Deposit.toFixed(1)} M</td>
                    <td className="p-3 text-red-700">Rp{bank1Reserve.toFixed(1)} M</td>
                    <td className="p-3 text-emerald-700 font-bold">Rp{bank1Loan.toFixed(1)} M</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-sans font-medium text-slate-900">Bank 2 (Dari Peminjam 1)</td>
                    <td className="p-3 font-bold text-blue-900">Rp{bank2Deposit.toFixed(1)} M</td>
                    <td className="p-3 text-red-700">Rp{bank2Reserve.toFixed(1)} M</td>
                    <td className="p-3 text-emerald-700 font-bold">Rp{bank2Loan.toFixed(1)} M</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-slate-900">Bank 3 (Dari Peminjam 2)</td>
                    <td className="p-3 font-bold text-blue-900">Rp{bank3Deposit.toFixed(1)} M</td>
                    <td className="p-3 text-red-700">Rp{bank3Reserve.toFixed(1)} M</td>
                    <td className="p-3 text-emerald-700 font-bold">Rp{bank3Loan.toFixed(1)} M</td>
                  </tr>
                  <tr className="bg-blue-50 font-sans font-semibold text-blue-950">
                    <td className="p-3">Total Akhir Seterusnya (Limit ∞)</td>
                    <td className="p-3 font-mono font-bold text-blue-900">Rp{Math.round(totalMoneyCreation)} M</td>
                    <td className="p-3 font-mono text-red-800">Rp{initialDeposit} M</td>
                    <td className="p-3 font-mono text-emerald-800">Rp{Math.round(totalMoneyCreation - initialDeposit)} M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
              <strong>Kesimpulan Teori Ekonomi: </strong>
              Ketika BI menaikkan GWM dari 8% ke 15%, angka pengganda turun dari 12,5x menjadi hanya 6,6x. Artinya, kemampuan perbankan melipatgandakan uang pinjaman langsung terpangkas drastis!
            </div>
          </div>
        </div>

        {/* Right: Infographic & Conceptual Visual */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-blue-900 uppercase">
                Bagan Infografis Likuiditas
              </span>
              <h3 className="font-display text-base font-bold text-slate-900 mt-0.5">
                Alur Sirkulasi Uang di Bank Sentral & Perbankan
              </h3>
            </div>
            <div className="relative bg-slate-100 aspect-4/3 overflow-hidden">
              <img
                src={moneyFlowDiagram}
                alt="Diagram Alur Uang Bank Indonesia ke Bank Umum"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>Bank Indonesia</strong> menentukan aturan Giro Wajib Minimum (GWM). Uang cadangan tersebut disetorkan bank umum dan disimpan di brankas digital rekening giro BI.
              </p>
              <p>
                Sisa dana yang tidak terkena kewajiban cadangan disalurkan sebagai kredit pinjaman ke masyarakat dan korporasi untuk membeli rumah, mesin pabrik, dan modal toko.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
