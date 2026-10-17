import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Tujuan utama dan tunggal dari Bank Indonesia sebagaimana diatur dalam Undang-Undang perbankan sentral di Indonesia adalah...',
    options: [
      'Menghimpun dana dari masyarakat luas dan menyalurkannya dalam bentuk kredit usaha',
      'Mencapai dan memelihara kestabilan nilai rupiah',
      'Membiayai proyek infrastruktur strategis yang dicanangkan pemerintah pusat',
      'Memaksimalkan perolehan laba negara dari transaksi valuta asing'
    ],
    correctAnswer: 1,
    category: 'Konsep Dasar',
    difficulty: 'Mudah',
    explanation: 'Sesuai UU No. 23 Tahun 1999 yang diperbarui dalam UU No. 4 Tahun 2023 (UU P2SK), tujuan tunggal Bank Indonesia adalah mencapai dan memelihara kestabilan nilai rupiah, baik terhadap harga barang/jasa (inflasi) maupun terhadap mata uang asing (kurs).'
  },
  {
    id: 2,
    question: 'Ketika perekonomian Indonesia mengalami tekanan laju inflasi yang melonjak drastis melebihi batas sasaran, kebijakan moneter yang paling tepat diambil oleh Bank Indonesia adalah...',
    options: [
      'Kebijakan moneter ekspansif dengan memangkas suku bunga acuan BI-Rate',
      'Kebijakan moneter kontraktif dengan menaikkan Giro Wajib Minimum (GWM)',
      'Membeli Surat Berharga Negara (SBN) secara masif di pasar sekunder',
      'Menurunkan syarat uang muka kredit pemilikan kendaraan bermotor'
    ],
    correctAnswer: 1,
    category: 'Instrumen Moneter',
    difficulty: 'Sedang',
    explanation: 'Saat inflasi melonjak tinggi, BI menerapkan Kebijakan Moneter Kontraktif (Tight Money Policy) untuk mengurangi peredaran uang. Salah satu caranya adalah menaikkan GWM, sehingga bank umum harus menahan lebih banyak cadangan di BI dan kapasitas menyalurkan kredit berkurang.'
  },
  {
    id: 3,
    question: 'Manakah di bawah ini yang merupakan tindakan Operasi Pasar Terbuka (OPT) kontraktif oleh Bank Indonesia?',
    options: [
      'Menjual Surat Berharga Negara (SBN) dan SRBI kepada perbankan dan investor',
      'Membeli kembali obligasi pemerintah dari tangan perbankan umum',
      'Menurunkan tingkat bunga fasilitas pinjaman darurat antar bank',
      'Membagikan bantuan langsung tunai kepada pelaku usaha mikro'
    ],
    correctAnswer: 0,
    category: 'Instrumen Moneter',
    difficulty: 'Sedang',
    explanation: 'Ketika BI MENJUAL surat berharga (SBN/SRBI), perbankan dan investor membelinya dengan dana likuiditas mereka. Akibatnya, uang kas perbankan terserap masuk ke BI dan jumlah uang beredar di masyarakat menyusut.'
  },
  {
    id: 4,
    question: 'Jika Bank Indonesia menaikkan persentase Giro Wajib Minimum (GWM) dari 5,0% menjadi 9,0%, maka dampak langsung yang terjadi pada sistem perbankan umum adalah...',
    options: [
      'Kapasitas bank umum dalam menyalurkan kredit baru kepada debitur akan menurun',
      'Jumlah uang beredar di masyarakat akan meningkat tajam',
      'Masyarakat beramai-ramai menarik simpanan giro mereka dari bank',
      'Bank umum tidak lagi diwajibkan memiliki cadangan kas di bank sentral'
    ],
    correctAnswer: 0,
    category: 'Instrumen Moneter',
    difficulty: 'Sedang',
    explanation: 'GWM mewajibkan bank menyimpan persentase tertentu dari DPK di BI. Kenaikan GWM dari 5% ke 9% berarti porsi dana yang dikunci di BI bertambah, sehingga dana menganggur (excess reserves) yang bisa disalurkan sebagai kredit pinjaman ke debitur berkurang.'
  },
  {
    id: 5,
    question: 'Pada masa pandemi COVID-19 tahun 2020, ekonomi nasional mengalami kontraksi hingga pertumbuhan minus. Langkah kebijakan moneter yang diambil Bank Indonesia untuk mengatasi resesi tersebut adalah...',
    options: [
      'Menaikkan suku bunga acuan BI-Rate ke level tertinggi dalam sejarah',
      'Menjual seluruh cadangan devisa dan menghentikan likuiditas perbankan',
      'Menerapkan Easy Money Policy dengan menurunkan suku bunga acuan dan pelonggaran likuiditas',
      'Menaikkan rasio GWM setinggi-tingginya agar perbankan tidak menyalurkan pinjaman'
    ],
    correctAnswer: 2,
    category: 'Analisis Kasus',
    difficulty: 'HOTS (Tinggi)',
    explanation: 'Di masa resesi pandemi 2020, BI menerapkan Kebijakan Moneter Ekspansif (Easy Money Policy): memangkas suku bunga acuan hingga ke titik terendah 3,50%, menurunkan GWM, dan menyuntikkan likuiditas raksasa (Quantitative Easing) guna menstimulasi gairah ekonomi nasional.'
  },
  {
    id: 6,
    question: 'Perhatikan urutan transmisi moneter berikut: BI menaikkan BI-Rate → Suku bunga pinjaman bank umum meningkat → Biaya modal pengusaha bertambah mahal → Investasi pabrik baru ditunda. Jalur transmisi yang paling menonjol pada peristiwa tersebut adalah...',
    options: [
      'Jalur Nilai Tukar (Exchange Rate Channel)',
      'Jalur Suku Bunga dan Kredit (Interest Rate & Credit Channel)',
      'Jalur Ekspektasi Harga Aset (Asset Price Channel)',
      'Jalur Neraca Pembayaran Internasional'
    ],
    correctAnswer: 1,
    category: 'Jalur Transmisi',
    difficulty: 'HOTS (Tinggi)',
    explanation: 'Rangkaian tersebut menggambarkan Jalur Suku Bunga dan Kredit: perubahan suku bunga acuan BI merambat ke suku bunga kredit perbankan, meningkatkan cost of borrowing, sehingga mengurangi belanja investasi modal oleh korporasi.'
  },
  {
    id: 7,
    question: 'Perbedaan mendasar antara Kebijakan Moneter dan Kebijakan Fiskal terletak pada institusi pelaksana dan instrumen utamanya, yaitu...',
    options: [
      'Moneter dilaksanakan Kemenkeu lewat APBN; Fiskal dilaksanakan BI lewat BI-Rate',
      'Moneter dilaksanakan Bank Sentral lewat JUB dan suku bunga; Fiskal dilaksanakan Pemerintah lewat APBN (pajak dan subsidi)',
      'Moneter hanya mengurusi ekspor impor; Fiskal hanya mengurusi peredaran uang kartal',
      'Keduanya sama-sama dilaksanakan oleh Otoritas Jasa Keuangan (OJK)'
    ],
    correctAnswer: 1,
    category: 'Konsep Dasar',
    difficulty: 'Mudah',
    explanation: 'Kebijakan Moneter adalah domain independen Bank Indonesia dengan instrumen moneter (OPT, BI-Rate, GWM). Sedangkan Kebijakan Fiskal adalah wewenang Pemerintah (Presiden & Menkeu) melalui APBN (penerimaan pajak dan belanja negara).'
  },
  {
    id: 8,
    question: 'Instrumen kebijakan moneter berikut ini yang termasuk dalam kategori kebijakan moneter KUALITATIF adalah...',
    options: [
      'Penetapan suku bunga BI-Rate dan diskonto fasilitas simpanan',
      'Operasi Pasar Terbuka melalui lelang Sekuritas Rupiah Bank Indonesia (SRBI)',
      'Penetapan rasio Giro Wajib Minimum (GWM) rata-rata perbankan',
      'Pengawasan kredit selektif dan imbauan moral (moral suasion) kepada direksi bank'
    ],
    correctAnswer: 3,
    category: 'Instrumen Moneter',
    difficulty: 'Sedang',
    explanation: 'Instrumen kuantitatif mempengaruhi volume jumlah uang secara langsung (OPT, Diskonto, GWM). Sedangkan instrumen kualitatif mempengaruhi arah, mutu alokasi pinjaman, dan psikologis pelaku pasar (Kredit Selektif dan Imbauan Moral/Moral Suasion).'
  },
  {
    id: 9,
    question: 'Dalam rumus pengganda uang sederhana (Money Multiplier), bila rasio Giro Wajib Minimum (GWM) ditetapkan sebesar 10% (0,1) dan ada setoran awal dana primer sebesar Rp100 Miliar, maka batas maksimum uang giral yang dapat tercipta dalam sistem perbankan adalah...',
    options: [
      'Rp100 Miliar',
      'Rp500 Miliar',
      'Rp1.000 Miliar (Rp1 Triliun)',
      'Rp10.000 Miliar (Rp10 Triliun)'
    ],
    correctAnswer: 2,
    category: 'Instrumen Moneter',
    difficulty: 'HOTS (Tinggi)',
    explanation: 'Rumus Pengganda Uang: M = (1 / GWM) × Setoran Awal = (1 / 0,1) × Rp100 Miliar = 10 × Rp100 Miliar = Rp1.000 Miliar (Rp1 Triliun).'
  },
  {
    id: 10,
    question: 'Gubernur Bank Indonesia menyampaikan pidato di hadapan para pimpinan perbankan nasional agar berhati-hati dalam menyalurkan kredit konsumtif berisiko tinggi dan memprioritaskan pembiayaan UMKM produktif. Tindakan ini merupakan contoh instrumen...',
    options: [
      'Operasi Pasar Terbuka (Open Market Operation)',
      'Kebijakan Fasilitas Diskonto (Discount Policy)',
      'Imbauan Moral (Moral Suasion)',
      'Devaluasi Mata Uang'
    ],
    correctAnswer: 2,
    category: 'Instrumen Moneter',
    difficulty: 'Mudah',
    explanation: 'Imbauan Moral (Moral Suasion) adalah ajakan, pidato, atau arahan persuasif pimpinan bank sentral kepada direksi bank umum untuk mengendalikan sikap dan perilaku penyaluran kredit tanpa sanksi hukum langsung.'
  }
];
