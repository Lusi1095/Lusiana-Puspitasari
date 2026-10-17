import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    term: 'Kebijakan Moneter',
    category: 'Konsep Dasar',
    definition: 'Keputusan dan tindakan terencana yang diambil oleh bank sentral (Bank Indonesia) untuk memengaruhi jumlah uang beredar, ketersediaan kredit, dan tingkat suku bunga demi kestabilan makroekonomi.',
    example: 'BI menaikkan BI-Rate 25 bps untuk meredam laju inflasi bulanan.',
    keyTakeaway: 'Dikelola oleh Bank Sentral; fokus pada stabilitas Rupiah dan inflasi.'
  },
  {
    id: 'fc-2',
    term: 'BI-Rate (Suku Bunga Acuan)',
    category: 'Instrumen',
    definition: 'Suku bunga kebijakan yang mencerminkan sikap atau stance kebijakan moneter yang ditetapkan oleh Bank Indonesia dan diumumkan kepada publik melalui Rapat Dewan Gubernur (RDG).',
    example: 'BI-Rate sebesar 6,00% menjadi patokan suku bunga simpanan dan kredit perbankan nasional.',
    keyTakeaway: 'Sinyal utama arah pengetatan atau pelonggaran moneter di pasar uang.'
  },
  {
    id: 'fc-3',
    term: 'Operasi Pasar Terbuka (OPT)',
    category: 'Instrumen',
    definition: 'Kegiatan transaksi moneter oleh Bank Indonesia melalui jual beli surat berharga rupiah maupun valas di pasar uang untuk menyerap atau menyuntikkan likuiditas.',
    example: 'BI menjual SRBI (Sekuritas Rupiah Bank Indonesia) untuk menyerap kelebihan likuiditas Rupiah.',
    keyTakeaway: 'Jual Surat Berharga = Uang ditarik (Kontraktif); Beli Surat Berharga = Uang disuntik (Ekspansif).'
  },
  {
    id: 'fc-4',
    term: 'Giro Wajib Minimum (GWM)',
    category: 'Instrumen',
    definition: 'Simpanan minimum dalam bentuk persentase dari Dana Pihak Ketiga (DPK) yang wajib dipelihara oleh setiap bank umum dalam rekening giro di Bank Indonesia.',
    example: 'Jika GWM 9%, maka dari setiap Rp100 juta tabungan nasabah, Rp9 juta wajib disimpan di BI.',
    keyTakeaway: 'Semakin tinggi GWM, semakin sedikit uang yang bisa dipinjamkan perbankan ke masyarakat.'
  },
  {
    id: 'fc-5',
    term: 'SRBI (Sekuritas Rupiah BI)',
    category: 'Instrumen Baru',
    definition: 'Instrumen operasi moneter pro-market yang diterbitkan BI bertenor pendek berlandaskan aset dasar (underlying) Surat Berharga Negara yang dimiliki BI.',
    example: 'Investor asing membeli SRBI bertenor 6 atau 12 bulan karena imbal hasilnya menarik.',
    keyTakeaway: 'Menarik aliran modal asing (capital inflow) dan memperkuat nilai tukar Rupiah.'
  },
  {
    id: 'fc-6',
    term: 'Tight Money Policy',
    category: 'Strategi',
    definition: 'Kebijakan moneter ketat/kontraktif yang bertujuan mengurangi jumlah uang beredar saat ekonomi mengalami inflasi tinggi (overheating).',
    example: 'Menaikkan BI-Rate, menaikkan GWM, dan menjual SBN/SRBI ke pasar.',
    keyTakeaway: 'Ibarat menginjak rem pada mobil yang melaju terlalu kencang.'
  },
  {
    id: 'fc-7',
    term: 'Easy Money Policy',
    category: 'Strategi',
    definition: 'Kebijakan moneter longgar/ekspansif yang bertujuan menambah jumlah uang beredar untuk merangsang aktivitas produksi dan konsumsi saat resesi.',
    example: 'Menurunkan BI-Rate, menurunkan GWM, dan membeli SBN perbankan.',
    keyTakeaway: 'Ibarat menginjak pedal gas untuk menggerakkan mobil yang mogok saat ekonomi lesu.'
  },
  {
    id: 'fc-8',
    term: 'Inflasi Sasaran (Target Inflation)',
    category: 'Indikator Makro',
    definition: 'Tingkat inflasi yang ingin dicapai dalam periode tertentu yang disepakati bersama oleh Pemerintah dan Bank Indonesia.',
    example: 'Sasaran inflasi nasional Indonesia tahun 2024-2026 adalah 2,5% dengan toleransi ± 1%.',
    keyTakeaway: 'Inflasi terkendali menjaga daya beli uang jajan dan gaji masyarakat tetap berharga.'
  },
  {
    id: 'fc-9',
    term: 'Pengawasan Kredit Selektif',
    category: 'Instrumen Kualitatif',
    definition: 'Kebijakan pengetatan atau pelonggaran syarat-syarat pemberian kredit oleh bank umum dengan menerapkan evaluasi 5C dan rasio Loan to Value (LTV).',
    example: 'BI menetapkan DP (uang muka) 0% untuk KPR rumah pertama ramah lingkungan.',
    keyTakeaway: 'Mengarahkan agar uang pinjaman mengalir ke sektor yang produktif, bukan spekulatif.'
  },
  {
    id: 'fc-10',
    term: 'Imbauan Moral (Moral Suasion)',
    category: 'Instrumen Kualitatif',
    definition: 'Ajakan persuasif atau komunikasi resmi dari pimpinan bank sentral kepada para eksekutif perbankan komersial agar bertindak selaras dengan tujuan moneter.',
    example: 'Gubernur BI mengimbau perbankan segera menurunkan bunga kredit pasca BI-Rate dipotong.',
    keyTakeaway: 'Tanpa sanksi hukum langsung; mengandalkan kepatuhan etis dan reputasi pelaku pasar.'
  },
  {
    id: 'fc-11',
    term: 'Lender of Last Resort (LoLR)',
    category: 'Peran Bank Sentral',
    definition: 'Fungsi BI sebagai penyedia pinjaman darurat likuiditas terakhir bagi bank umum yang mengalami masalah likuiditas jangka pendek agar tidak kolaps.',
    example: 'Pemberian fasilitas pinjaman likuiditas jangka pendek dengan agunan berkualitas tinggi.',
    keyTakeaway: 'Menjaga kepercayaan masyarakat dan mencegah efek domino kebangkrutan perbankan.'
  },
  {
    id: 'fc-12',
    term: 'Pengganda Uang (Money Multiplier)',
    category: 'Matematika Moneter',
    definition: 'Rasio yang mengukur seberapa banyak total uang giral dapat diciptakan dalam sistem perbankan dari sejumlah setoran uang primer awal.',
    example: 'Dengan GWM 10%, angka pengganda adalah 1 / 0,1 = 10 kali lipat.',
    keyTakeaway: 'Membuktikan kekuatan cadangan wajib dalam memperbesar atau membatasi suplai uang.'
  }
];
