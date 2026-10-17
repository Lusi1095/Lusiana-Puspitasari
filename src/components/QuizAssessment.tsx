import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';

export const QuizAssessment: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIdx
    });
  };

  const handleFinishQuiz = () => {
    setIsSubmitted(true);
    const correctCount = calculateCorrectCount();
    const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    if (score >= 80) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const calculateCorrectCount = () => {
    let count = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        count++;
      }
    });
    return count;
  };

  const correctCount = calculateCorrectCount();
  const scorePercentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  const getPredicate = (score: number) => {
    if (score >= 90) return { title: 'Sangat Memuaskan (A+)', desc: 'Penguasaan konsep moneter sangat mendalam setara olimpiade ekonomi.' };
    if (score >= 75) return { title: 'Tuntas & Memuaskan (A)', desc: 'Memahami instrumen, jenis, dan transmisi moneter dengan sangat baik.' };
    if (score >= 60) return { title: 'Cukup Tuntas (B)', desc: 'Memahami dasar kebijakan moneter namun perlu memperkuat analisis transmisi.' };
    return { title: 'Perlu Remedial / Penguatan', desc: 'Disarankan membaca ulang Bab 2 & 3 mengenai instrumen BI dan mencoba kuis kembali.' };
  };

  const predicate = getPredicate(scorePercentage);

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Evaluasi Formatif & Asesmen Sumatif
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
            Uji Kompetensi: Kebijakan Moneter SMA Kelas 11
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          10 Soal Analisis HOTS · Standar UTBK
        </div>
      </div>

      {!isSubmitted ? (
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          {/* Progress & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-900">Soal {currentIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
              <span aria-hidden="true">·</span>
              <span>Kategori: {currentQ.category}</span>
            </div>
            <div className="font-semibold text-slate-700">
              Tingkat: {currentQ.difficulty}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === oIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950 text-white border-blue-900 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {optionLetters[oIdx]}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
            >
              ← Soal Sebelumnya
            </button>

            {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => Math.min(QUIZ_QUESTIONS.length - 1, prev + 1))}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                Soal Berikutnya →
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="px-6 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Kumpulkan & Lihat Hasil Nilai
              </button>
            )}
          </div>

          {/* Question dot quick-grid */}
          <div className="mt-8 pt-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-400 mb-2 font-medium">Navigasi Nomor Soal:</div>
            <div className="flex flex-wrap gap-1.5">
              {QUIZ_QUESTIONS.map((q, i) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = i === currentIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-7 h-7 text-xs font-mono font-bold rounded-md transition-colors ${
                      isCurrent
                        ? 'ring-2 ring-blue-900 bg-blue-900 text-white'
                        : isAnswered
                        ? 'bg-slate-200 text-slate-900'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Result & Certificate View */
        <div className="mt-8 space-y-8">
          {/* Score Summary Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hasil Evaluasi Capaian Pembelajaran
            </div>
            <div className="text-5xl font-extrabold font-display text-blue-900 mt-2 tabular-nums">
              {scorePercentage}<span className="text-2xl text-slate-400 font-normal">/100</span>
            </div>
            <div className="text-base font-bold text-slate-900 mt-2">
              Predikat: {predicate.title}
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              {predicate.desc}
            </p>
            <div className="mt-4 text-xs text-slate-500 font-mono">
              Jawaban Benar: {correctCount} dari {QUIZ_QUESTIONS.length} Soal
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRetake}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Ulangi Kuis
              </button>
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Cetak / Simpan Bukti Capaian Siswa (PDF)
              </button>
            </div>
          </div>

          {/* Printable Certificate Card */}
          <div id="student-certificate" className="bg-white border-2 border-blue-900 rounded-2xl p-8 shadow-sm">
            <div className="text-center border-b border-slate-200 pb-5">
              <div className="text-xs font-mono font-bold text-blue-900 uppercase tracking-widest">
                KEMENTERIAN PENDIDIKAN / LEMBAGA PENDIDIKAN
              </div>
              <h3 className="font-display text-2xl font-black text-slate-900 mt-1">
                BUKTI HASIL EVALUASI PEMBELAJARAN
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Materi: Kebijakan Moneter di Indonesia · Ekonomi SMA Kelas 11 (Fase F)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Nama Lengkap Siswa:</label>
                <input
                  type="text"
                  placeholder="Ketik Nama Anda di Sini..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full text-sm font-bold text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Nama Sekolah / Kelas:</label>
                <input
                  type="text"
                  placeholder="contoh: SMA Global Mandiri / XI-IPS 1"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full text-sm text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="text-slate-500">Nilai Akhir:</div>
                <div className="text-lg font-bold font-mono text-blue-900 mt-0.5">{scorePercentage}</div>
              </div>
              <div>
                <div className="text-slate-500">Ketuntasan:</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5">
                  {scorePercentage >= 75 ? 'Tuntas' : 'Perlu Penguatan'}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Tanggal:</div>
                <div className="text-xs font-mono font-medium text-slate-700 mt-1">
                  {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-slate-500 leading-relaxed text-center">
              Dokumen ini menyatakan bahwa siswa telah menyelesaikan serangkaian uji pemahaman materi Kebijakan Moneter, analisis instrumen Bank Indonesia, serta evaluasi transmisi moneter.
            </div>
          </div>

          {/* Detailed Question Review & Explanations */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h4 className="font-display text-lg font-bold text-slate-900 mb-6">
              Pembahasan Lengkap Per Butir Soal
            </h4>
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-900">Nomor {idx + 1}</span>
                      <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                        {isCorrect ? '✓ Jawaban Anda Benar' : '✕ Jawaban Anda Kurang Tepat'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-3">
                      {q.question}
                    </p>
                    <div className="text-xs text-slate-700 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <strong>Kunci Jawaban: </strong>
                        <span className="text-emerald-800 font-semibold">{q.options[q.correctAnswer]}</span>
                      </div>
                      {userAns !== undefined && userAns !== q.correctAnswer && (
                        <div>
                          <strong>Jawaban Anda: </strong>
                          <span className="text-red-800">{q.options[userAns]}</span>
                        </div>
                      )}
                      <div className="pt-2 text-slate-600 border-t border-slate-200 mt-2">
                        <strong>Pembahasan Ilmiah: </strong>{q.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
