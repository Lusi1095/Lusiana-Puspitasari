import React, { useState } from 'react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState<string>('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'tutor'; text: string; source?: string }[]>([
    {
      sender: 'tutor',
      text: 'Halo! Saya Asisten Cerdas Pembelajaran Ekonomi Bank Indonesia untuk Siswa SMA Kelas 11. Ada materi kebijakan moneter, instrumen BI, atau jalur transmisi yang ingin kamu tanyakan atau diskusikan?'
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'Mengapa BI menaikkan suku bunga saat harga pangan melonjak?',
    'Apa perbedaan utama kebijakan moneter dan fiskal?',
    'Bagaimana instrumen SRBI menjaga kurs Rupiah?',
    'Jelaskan cara kerja Giro Wajib Minimum (GWM) dengan analogi mudah.',
    'Apa risiko jika negara mencetak uang tanpa kendali?'
  ];

  const handleAsk = async (textToSend?: string) => {
    const q = textToSend || question;
    if (!q.trim() || loading) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text: q }];
    setMessages(newMessages);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi asisten AI.');
      }

      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          sender: 'tutor' as const,
          text: data.reply || 'Maaf, belum dapat menjawab pertanyaan tersebut.',
          source: data.source
        }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          sender: 'tutor' as const,
          text: 'Kebijakan moneter pada dasarnya adalah upaya Bank Indonesia mengendalikan jumlah uang beredar agar nilai Rupiah stabil dan inflasi terkendali di kisaran target 2,5% ± 1%. Silakan ajukan pertanyaan seputar instrumen OPT, Diskonto, atau GWM!',
          source: 'curriculum_knowledge_base'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-[11px] font-mono font-bold text-blue-900 uppercase">
              Asisten Belajar Interaktif
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
              Konsultasi AI Materi Kebijakan Moneter
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Message Log */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-slate-400 mb-1 px-1">
                {m.sender === 'user' ? 'Pertanyaan Siswa' : 'Asisten Guru Ekonomi BI'}
              </span>
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[88%] whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-blue-900 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-slate-400 mb-1">Mengetik jawaban...</span>
              <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-500 italic border border-slate-200">
                Menganalisis konsep moneter kurikulum SMA...
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">
            Ide Pertanyaan:
          </span>
          {quickQuestions.map((qq, i) => (
            <button
              key={i}
              onClick={() => handleAsk(qq)}
              className="text-xs px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              {qq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ketik pertanyaan ekonomi moneter di sini..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAsk();
            }}
            className="flex-1 text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button
            onClick={() => handleAsk()}
            disabled={!question.trim() || loading}
            className="px-4 py-2.5 bg-blue-900 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};
