import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Economic curriculum knowledge fallback responses for high-school Grade 11
const fallbackResponses: Record<string, string> = {
  opt: "Operasi Pasar Terbuka (OPT) adalah instrumen utama Bank Indonesia untuk mengendalikan jumlah uang beredar melalui jual-beli surat berharga (seperti SBN, SRBI, atau SBI). Jika BI ingin mengerem inflasi (Tight Money), BI MENJUAL surat berharga agar uang dari perbankan diserap ke BI. Sebaliknya, saat ekonomi lesu (Easy Money), BI MEMBELI surat berharga sehingga likuiditas uang mengalir ke perbankan dan masyarakat.",
  gwm: "Giro Wajib Minimum (GWM) adalah persentase dana simpanan nasabah (DPK) di bank umum yang wajib mengendap di Bank Indonesia dan tidak boleh dipinjamkan. Jika GWM dinaikkan dari 5% menjadi 9%, bank umum terpaksa menahan lebih banyak uang di BI, sehingga kapasitas menyalurkan kredit berkurang dan laju inflasi dapat ditekan.",
  diskonto: "Politik Diskonto (Discount Rate) adalah instrumen penetapan suku bunga acuan (saat ini BI-Rate). Ketika BI menaikkan suku bunga acuan, bank-bank umum akan menaikkan bunga simpanan dan kredit. Masyarakat akan lebih terdorong menabung dan menunda berutang/konsumsi, sehingga jumlah uang beredar turun dan menekan inflasi.",
  fiskal_vs_moneter: "Kebijakan Moneter dijalankan oleh BANK SENTRAL (Bank Indonesia) dengan mengendalikan jumlah uang beredar dan suku bunga (BI-Rate, OPT, GWM). Sedangkan Kebijakan Fiskal dijalankan oleh PEMERINTAH (Kementerian Keuangan) melalui pengelolaan Anggaran Pendapatan dan Belanja Negara (APBN), yaitu pajak dan pengeluaran pemerintah (government spending).",
  srbi: "SRBI (Sekuritas Rupiah Bank Indonesia) adalah instrumen operasi moneter pro-market yang diterbitkan Bank Indonesia berbasis underlying Surat Berharga Negara (SBN). SRBI bertujuan menarik aliran modal asing (capital inflow) dan menyerap kelebihan likuiditas rupiah guna menjaga kestabilan nilai tukar Rupiah terhadap Dolar AS.",
  inflasi: "Inflasi adalah kecenderungan naiknya harga barang dan jasa secara umum dan terus menerus. Target inflasi Bank Indonesia saat ini adalah 2,5% ± 1% (rentang 1,5% - 3,5%). BI mengendalikan inflasi dengan menaikkan BI-Rate, menyerap likuiditas melalui OPT, atau meningkatkan GWM agar peredaran uang tidak berlebihan (demand-pull inflation)."
};

function getFallbackAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('opt') || q.includes('pasar terbuka') || q.includes('surat berharga') || q.includes('sbn')) {
    return fallbackResponses.opt;
  }
  if (q.includes('gwm') || q.includes('giro wajib') || q.includes('cadangan')) {
    return fallbackResponses.gwm;
  }
  if (q.includes('diskonto') || q.includes('bi-rate') || q.includes('bunga') || q.includes('suku bunga')) {
    return fallbackResponses.diskonto;
  }
  if (q.includes('fiskal') || q.includes('beda') || q.includes('apbn') || q.includes('pemerintah')) {
    return fallbackResponses.fiskal_vs_moneter;
  }
  if (q.includes('srbi') || q.includes('sekuritas') || q.includes('kurs') || q.includes('dolar')) {
    return fallbackResponses.srbi;
  }
  if (q.includes('inflasi') || q.includes('harga') || q.includes('uang beredar')) {
    return fallbackResponses.inflasi;
  }
  return "Kebijakan moneter adalah seperangkat instrumen yang digunakan Bank Indonesia untuk mengendalikan jumlah uang beredar (JUB) demi menjaga kestabilan nilai Rupiah (stabilitas inflasi dan kurs) serta mendorong pertumbuhan ekonomi berkelanjutan. Ada 5 instrumen pokok: Operasi Pasar Terbuka (OPT), Fasilitas Diskonto (BI-Rate), Giro Wajib Minimum (GWM), Pengawasan Kredit Selektif, dan Imbauan Moral (Moral Suasion).";
}

// API Route for AI Economic Tutor
app.post('/api/ai-tutor', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Pertanyaan wajib diisi.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    const fallback = getFallbackAnswer(question);
    return res.json({ reply: fallback, source: 'curriculum_knowledge_base' });
  }

  try {
    const ai = new GoogleGenAI();
    const systemPrompt = `Anda adalah Asisten Pembelajaran Cerdas Guru Ekonomi SMA Kelas 11 untuk materi Kebijakan Moneter di Indonesia (Kurikulum Merdeka / Fase F & K13).
Tugas Anda:
1. Menjawab pertanyaan siswa/guru dengan bahasa Indonesia yang ramah, santun, pedagogis, mudah dipahami namun berbobot ilmiah ekonomi standar SMA kelas 11.
2. Jelaskan konsep dengan analogi nyata (misalnya analogi rem & gas pada mobil, keran air likuiditas, atau belanja harian siswa).
3. Selalu kaitkan dengan peran nyata Bank Indonesia (BI), instrumen moneter (OPT, BI-Rate, GWM, Kredit Selektif, Moral Suasion), dan data riil Indonesia (seperti target inflasi 2.5% ± 1%).
4. Format dengan poin-poin terstruktur yang rapi, ringkas (maksimal 3-4 paragraf atau daftar butir yang jelas).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nPertanyaan siswa: "${question}"` }] }
      ]
    });

    const reply = response.text || getFallbackAnswer(question);
    return res.json({ reply, source: 'gemini_ai' });
  } catch (error) {
    console.warn('AI generation error, serving curriculum fallback:', error);
    const fallback = getFallbackAnswer(question);
    return res.json({ reply: fallback, source: 'curriculum_knowledge_base' });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`EkoMoneter server running on http://localhost:${port}`);
  });
}

startServer();
