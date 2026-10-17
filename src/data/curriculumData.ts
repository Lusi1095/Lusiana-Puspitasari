import { CurriculumChapter, ScenarioMission } from '../types';

export const CURRICULUM_CHAPTERS: CurriculumChapter[] = [
  {
    id: 'bab-1',
    title: '01. Hakikat & Kedudukan Bank Indonesia',
    subtitle: 'Mengenal status independen, mandat utama, dan 3 pilar penopang perekonomian nasional.',
    readTime: '6 menit baca',
    iconName: 'Building2',
    content: {
      overview: 'Bank Indonesia (BI) adalah bank sentral Republik Indonesia yang memiliki status independen, bebas dari campur tangan pemerintah maupun pihak lain, sebagaimana diatur dalam UU No. 23 Tahun 1999 yang telah diperbarui melalui UU No. 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan (P2SK).',
      keyPoints: [
        'Tujuan Tunggal: Mencapai dan memelihara kestabilan nilai Rupiah.',
        'Dua Dimensi Kestabilan: Kestabilan terhadap harga barang/jasa (tercermin dari laju inflasi) dan kestabilan terhadap mata uang negara lain (tercermin dari nilai tukar/kurs).',
        'Status Independen: BI memiliki otonomi penuh dalam menetapkan sasaran moneter dan instrumen yang digunakan tanpa intervensi eksekutif.'
      ],
      deepDive: [
        {
          heading: 'Kedudukan Hukum dan Peran Unik',
          text: 'Berbeda dengan bank umum yang berorientasi laba (profit-oriented) dan melayani masyarakat umum secara langsung, Bank Indonesia bertindak sebagai banknya para bank (bankers bank) serta penasihat keuangan negara. BI juga memegang fungsi Lender of Last Resort (LoLR), yaitu pemberi pinjaman likuiditas terakhir bagi bank umum yang mengalami krisis likuiditas jangka pendek.',
          highlight: 'UU No. 4/2023 (UU P2SK) mempertegas mandat BI untuk turut serta mendukung pertumbuhan ekonomi yang berkelanjutan tanpa mengorbankan stabilitas harga.'
        },
        {
          heading: 'Tiga Pilar Kebijakan Bank Indonesia',
          text: 'Untuk mencapai tujuannya, Bank Indonesia mengintegrasikan 3 pilar kebijakan utama: (1) Menetapkan dan melaksanakan kebijakan moneter, (2) Mengatur dan menjaga kelancaran sistem pembayaran (termasuk BI-FAST, QRIS, dan pencetakan uang kartal Rupiah), serta (3) Menjaga stabilitas sistem keuangan (kebijakan makroprudensial).'
        }
      ],
      quote: {
        text: 'Kestabilan nilai rupiah adalah prasyarat mutlak bagi pertumbuhan ekonomi yang inklusif dan berkesinambungan bagi kesejahteraan rakyat Indonesia.',
        author: 'Prinsip Dasar Kebijakan Moneter Bank Indonesia'
      }
    }
  },
  {
    id: 'bab-2',
    title: '02. Tujuan & Jenis Kebijakan Moneter',
    subtitle: 'Membedakan Kebijakan Ekspansif (Easy Money) dan Kebijakan Kontraktif (Tight Money).',
    readTime: '7 menit baca',
    iconName: 'Scale',
    content: {
      overview: 'Kebijakan moneter pada dasarnya adalah upaya pengendalian Jumlah Uang Beredar (JUB) dan tingkat suku bunga di pasar agar kondisi perekonomian makro berada pada titik keseimbangan internal (harga stabil, kerja penuh) dan eksternal (neraca pembayaran mantap).',
      keyPoints: [
        'Target Inflasi Nasional: Ditetapkan oleh Pemerintah bersama BI, saat ini berada pada kisaran sasaran 2,5% ± 1% (rentang 1,5% - 3,5%).',
        'Easy Money Policy (Ekspansif): Menambah peredaran uang saat ekonomi lesu, resesi, atau tingkat pengangguran melonjak.',
        'Tight Money Policy (Kontraktif): Mengurangi peredaran uang saat perekonomian memanas (overheating) dan harga melonjak tajam.'
      ],
      deepDive: [
        {
          heading: 'Kebijakan Moneter Ekspansif (Easy Money Policy)',
          text: 'Diterapkan ketika kegiatan ekonomi melambat, daya beli masyarakat melemah, dan pengangguran meningkat. Tujuannya adalah merangsang konsumsi rumah tangga dan gairah investasi dunia usaha dengan cara melonggarkan kran likuiditas uang beredar.',
          highlight: 'Langkah Ekspansif: Menurunkan BI-Rate, membeli Surat Berharga Negara (SBN), menurunkan Giro Wajib Minimum (GWM), dan mempermudah syarat kredit.'
        },
        {
          heading: 'Kebijakan Moneter Kontraktif (Tight Money Policy)',
          text: 'Diterapkan ketika perekonomian mengalami tekanan inflasi tinggi (banyak uang beredar mengejar barang yang sedikit / demand-pull inflation) atau ketika nilai tukar Rupiah terdepresiasi parah akibat arus modal keluar (capital outflow). Tujuannya adalah menarik kembali ekses likuiditas.',
          highlight: 'Langkah Kontraktif: Menaikkan BI-Rate, menjual surat berharga (SRBI/SBN), menaikkan GWM, dan memperketat seleksi kredit.'
        }
      ],
      tableData: {
        headers: ['Kondisi Perekonomian', 'Masalah Utama', 'Jenis Kebijakan', 'Arah Aksi Instrumen Moneter'],
        rows: [
          ['Resesi / Daya Beli Turun', 'Deflasi, Pengangguran Tinggi', 'Ekspansif (Easy Money)', 'Suku bunga turun, Beli surat berharga, GWM diturunkan'],
          ['Ekonomi Memanas (Overheating)', 'Inflasi Melambung Tinggi', 'Kontraktif (Tight Money)', 'Suku bunga naik, Jual surat berharga, GWM dinaikkan'],
          ['Tekanan Kurs Global / Capital Outflow', 'Rupiah Melemah Tajam', 'Kontraktif / Pro-Market', 'BI-Rate naik & Terbitkan SRBI untuk memikat investor asing']
        ]
      }
    }
  },
  {
    id: 'bab-3',
    title: '03. Lima Instrumen Utama Moneter di Indonesia',
    subtitle: 'Membedah instrumen kuantitatif (OPT, Diskonto, GWM) dan kualitatif (Kredit Selektif, Imbauan Moral).',
    readTime: '9 menit baca',
    iconName: 'Coins',
    content: {
      overview: 'Bank Indonesia tidak membagikan atau menyita uang langsung dari dompet masyarakat secara fisik. Sebagai gantinya, BI menggunakan 5 instrumen resmi yang mempengaruhi sistem perbankan untuk mengontrol likuiditas makro.',
      keyPoints: [
        'Operasi Pasar Terbuka (OPT): Transaksi jual-beli surat berharga di pasar uang.',
        'Fasilitas Diskonto (BI-Rate): Penetapan tingkat suku bunga acuan bank sentral.',
        'Giro Wajib Minimum (GWM): Saldo cadangan minimum bank umum di BI.',
        'Pengawasan Kredit Selektif: Pengetatan/kelonggaran persyaratan kredit perbankan.',
        'Imbauan Moral (Moral Suasion): Komunikasi persuasif pimpinan BI kepada pelaku pasar.'
      ],
      deepDive: [
        {
          heading: '1. Operasi Pasar Terbuka (OPT)',
          text: 'Instrumen paling fleksibel dan digunakan setiap hari oleh BI. Bila BI menjual instrumen berharga seperti SBN (Surat Berharga Negara) atau SRBI (Sekuritas Rupiah Bank Indonesia), bank umum membelinya dengan dana kas mereka. Hasilnya, dana cadangan perbankan tersedot ke BI, sehingga uang yang beredar di masyarakat berkurang. Sebaliknya, bila BI membeli surat berharga dari bank, BI mengucurkan uang tunai ke perbankan sehingga likuiditas melimpah.'
        },
        {
          heading: '2. Tingkat Diskonto (BI-Rate)',
          text: 'BI-Rate (sebelumnya sempat bernama BI 7-Day Reverse Repo Rate) adalah sinyal suku bunga acuan moneter. Bila BI menaikkan suku bunga acuan, bank komersial akan segera menaikkan suku bunga tabungan/deposito dan suku bunga kredit. Bunga deposito tinggi memikat warga untuk giat menabung, sementara bunga pinjaman yang mahal membuat pengusaha menunda utang baru. Konsumsi berkurang, laju inflasi mereda.'
        },
        {
          heading: '3. Giro Wajib Minimum (GWM)',
          text: 'GWM adalah ketentuan persentase simpanan pihak ketiga (tabungan, giro, deposito nasabah) yang wajib ditempatkan bank umum di rekening giro Bank Indonesia tanpa boleh dipinjamkan ke publik. Semakin tinggi persentase GWM (misal naik dari 5% ke 9%), semakin sedikit modal yang tersisa untuk disalurkan bank sebagai kredit ke masyarakat.'
        },
        {
          heading: '4. Pengawasan Kredit Selektif',
          text: 'BI dapat mengatur batasan sektor penyaluran kredit dan rasio Loan to Value (LTV) / Financing to Value (FTV), misalnya rasio uang muka (down payment) pembelian rumah dan kendaraan bermotor. Selain itu, bank diwajibkan menerapkan prinsip 5C (Character, Capacity, Capital, Collateral, Condition).'
        },
        {
          heading: '5. Imbauan Moral (Moral Suasion)',
          text: 'Bentuk kebijakan kualitatif melalui pidato resmi, siaran pers berkala Rapat Dewan Gubernur (RDG), pertemuan tatap muka Gubernur BI dengan para Direktur Utama Bank, serta pedoman tata kelola. BI mengimbau perbankan agar berhati-hati dalam ekspansi kredit atau bersama-sama menjaga kurs Rupiah.'
        }
      ]
    }
  },
  {
    id: 'bab-4',
    title: '04. Mekanisme Jalur Transmisi Kebijakan Moneter',
    subtitle: 'Bagaimana keputusan suku bunga di ruang rapat BI merambat hingga ke harga sembako di pasar.',
    readTime: '6 menit baca',
    iconName: 'GitBranch',
    content: {
      overview: 'Jalur Transmisi Kebijakan Moneter (Monetary Transmission Mechanism) adalah rantai hubungan sebab-akibat yang menjelaskan bagaimana perubahan instrumen bank sentral mempengaruhi variabel riil seperti output ekonomi, lapangan kerja, dan tingkat harga barang.',
      keyPoints: [
        'Time Lag: Pengaruh kebijakan moneter tidak terjadi dalam hitungan detik, melainkan memiliki jeda waktu (time lag) antara 1 hingga 6 kuartal (3-18 bulan).',
        'Jalur Suku Bunga: Kenaikan BI-Rate mempengaruhi biaya modal (cost of capital).',
        'Jalur Nilai Tukar: Perbedaan imbal hasil domestik dan luar negeri menggerakkan kurs mata uang.',
        'Jalur Ekspektasi: Persepsi masyarakat dan dunia usaha terhadap masa depan inflasi.'
      ],
      deepDive: [
        {
          heading: 'Langkah Demi Langkah Perambatan',
          text: '1. BI memutuskan menaikkan BI-Rate sebesar 25 bps (0,25%) dalam RDG.\n2. Suku bunga di Pasar Uang Antar Bank (PUAB) langsung merespons naik.\n3. Bank umum menaikkan suku bunga deposito agar nasabah tidak memindahkan dananya, serta menaikkan bunga kredit untuk menjaga margin.\n4. Biaya kredit yang mahal menekan rencana ekspansi pabrik baru dan pembelian barang konsumtif secara cicilan.\n5. Permintaan agregat (total belanja) di pasar melandai.\n6. Produsen dan pedagang tidak lagi leluasa menaikkan harga barang, sehingga laju inflasi menurun ke sasaran.'
        }
      ]
    }
  },
  {
    id: 'bab-5',
    title: '05. Jejak Sejarah & Studi Kasus Riil di Indonesia',
    subtitle: 'Pelajaran berharga dari Krisis 1998, Pandemi COVID-19 2020, hingga Era Suku Bunga Global 2024.',
    readTime: '8 menit baca',
    iconName: 'History',
    content: {
      overview: 'Teori kebijakan moneter paling mudah dipahami ketika diuji langsung dalam peristiwa sejarah nyata Indonesia. Tiga tonggak sejarah berikut memperlihatkan bagaimana BI merespons guncangan eksternal dan internal.',
      keyPoints: [
        '1998 (Krisis Moneter Asia): Inflasi melonjak hingga 77,6%, Rupiah anjlok parah, lahirnya independensi BI lewat UU 23/1999.',
        '2020 (Pandemi COVID-19): Kebijakan extraordinary counter-cyclical, pelonggaran likuiditas raksasa, dan skema Burden Sharing.',
        '2022-2024 (Era Inflasi Global): Strategi pro-stability & pro-growth, inovasi instrumen moneter Sekuritas Rupiah Bank Indonesia (SRBI).'
      ],
      deepDive: [
        {
          heading: 'Kasus 1: Krisis Moneter 1998 (Hiperinflasi & Bank Run)',
          text: 'Pelemahan nilai tukar Rupiah dari kisaran Rp2.500/USD menjadi lebih dari Rp16.000/USD mengakibatkan kepanikan perbankan nasional. Inflasi mencapai 77,6%. Bank Indonesia saat itu terpaksa menerapkan suku bunga SBI hingga di atas 70% untuk menahan laju penurunan Rupiah. Pelajaran dari krisis ini melahirkan Undang-Undang Independensi Bank Indonesia agar tidak lagi dapat diperintah mencetak uang secara serampangan untuk menutup defisit APBN.'
        },
        {
          heading: 'Kasus 2: Pandemi COVID-19 2020 (Quantitative Easing & Suku Bunga Terendah)',
          text: 'Aktivitas masyarakat lumpuh dan pertumbuhan ekonomi Indonesia terkontraksi menjadi -2,07%. Menghadapi resesi ini, BI menerapkan Kebijakan Moneter Ekspansif radikal: memangkas BI 7-Day Reverse Repo Rate hingga titik terendah dalam sejarah (3,50%), menurunkan GWM perbankan, dan melakukan Quantitative Easing dengan membeli SBN secara langsung di pasar perdana (Burden Sharing bersama Kemenkeu) untuk membiayai vaksinasi dan bansos.'
        },
        {
          heading: 'Kasus 3: Kenaikan Suku Bunga The Fed AS 2022-2024 (Inovasi SRBI)',
          text: 'Tingginya inflasi global memaksa bank sentral AS (The Fed) menaikkan Fed Funds Rate ke atas 5%. Kondisi ini mengancam terjadinya capital flight dari negara berkembang. Bank Indonesia merespons cerdas dengan menaikkan BI-Rate terukur (mencapai 6,25%) dan meluncurkan Sekuritas Rupiah Bank Indonesia (SRBI) bertenor pendek. Hasilnya, inflasi Indonesia tetap terjaga rendah di kisaran 2,5% dan Rupiah berhasil stabil.'
        }
      ]
    }
  }
];

export const SCENARIO_MISSIONS: ScenarioMission[] = [
  {
    id: 'misi-1',
    title: 'Misi 1: Jinakkan Lonjakan Inflasi (Demand-Pull & Pangan)',
    badge: 'Tantangan Inflasi',
    description: 'Perekonomian memanas akibat lonjakan konsumsi pasca panen gagal. Inflasi meroket ke angka 7,8% (jauh di atas batas sasaran 3,5%). Nilai Rupiah melemah. Sebagai Gubernur BI, jalankan kebijakan kontraktif (Tight Money) untuk mengembalikan inflasi ke rentang 2,0% - 3,5% tanpa mematikan pertumbuhan!',
    initialState: {
      inflationRate: 7.8,
      economicGrowth: 5.8,
      exchangeRate: 16250,
      unemploymentRate: 4.8,
      moneySupplyIndex: 9600
    },
    targetCondition: 'Bawa inflasi ke bawah 3,5% dan stabilkan Rupiah di bawah Rp15.800.',
    hint: 'Gunakan Tight Money Policy: Naikkan BI-Rate, jual surat berharga melalui OPT, atau naikkan persentase GWM.'
  },
  {
    id: 'misi-2',
    title: 'Misi 2: Bangkitkan Ekonomi dari Perlambatan',
    badge: 'Tantangan Resesi',
    description: 'Daya beli masyarakat anjlok, pabrik-pabrik mengurangi produksi, pengangguran naik ke 7,2%, dan pertumbuhan ekonomi merosot ke 1,4%. Tekanan inflasi sangat rendah (hanya 0,8%). Terapkan Kebijakan Moneter Ekspansif (Easy Money) agar roda perekonomian kembali melaju kencang!',
    initialState: {
      inflationRate: 0.8,
      economicGrowth: 1.4,
      exchangeRate: 15300,
      unemploymentRate: 7.2,
      moneySupplyIndex: 7800
    },
    targetCondition: 'Dongkrak pertumbuhan ekonomi melampaui 4,5% dan turunkan pengangguran.',
    hint: 'Terapkan Easy Money Policy: Turunkan BI-Rate, beli surat berharga (suntik likuiditas), turunkan GWM, dan longgarkan kredit makroprudensial.'
  },
  {
    id: 'misi-3',
    title: 'Misi 3: Badai Moneter Global & Pelemahan Rupiah',
    badge: 'Tantangan Nilai Tukar',
    description: 'Suku bunga global di luar negeri naik tinggi, memicu keluarnya modal asing (capital outflow) dari pasar Indonesia. Nilai tukar Rupiah terjun bebas ke level Rp16.500/USD, mengancam naiknya imported inflation bagi bahan baku industri.',
    initialState: {
      inflationRate: 4.9,
      economicGrowth: 4.6,
      exchangeRate: 16500,
      unemploymentRate: 5.4,
      moneySupplyIndex: 9100
    },
    targetCondition: 'Stabilkan Rupiah ke kisaran Rp15.600 - Rp15.900 dan jaga cadangan stabilitas.',
    hint: 'Kombinasikan kenaikan BI-Rate terukur dengan penjualan instrumen penarik devisa (OPT Jual / SRBI) untuk mengerek daya tarik imbal hasil aset Rupiah.'
  }
];
