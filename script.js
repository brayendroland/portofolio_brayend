/**
 * PORTFOLIO SCRIPTS: BRAYEND ROLAND FERLANDO
 * Web Developer | Siswa RPL SMK Telkom Lampung
 * Standalone Vanilla JavaScript (Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. PRELOADER SCREEN COUNTDOWN
  // ==========================================================================
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const barFillEl = document.getElementById('preloader-bar-fill');
  const subtextEl = document.getElementById('preloader-subtext');

  let loadProgress = 0;
  const subtexts = [
    'Menyelam ke Laut Dalam Portofolio...',
    'Memuat Terminal RPL SMK Telkom...',
    'Menyiapkan Audio Lo-Fi & Estetika Cyber...',
    'Sistem Siap! Selamat Datang!'
  ];

  const preloaderInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 8) + 4;
    if (loadProgress > 100) loadProgress = 100;

    if (counterEl) counterEl.textContent = `${loadProgress}%`;
    if (barFillEl) barFillEl.style.width = `${loadProgress}%`;

    if (subtextEl) {
      if (loadProgress < 35) subtextEl.textContent = subtexts[0];
      else if (loadProgress < 70) subtextEl.textContent = subtexts[1];
      else if (loadProgress < 95) subtextEl.textContent = subtexts[2];
      else subtextEl.textContent = subtexts[3];
    }

    if (loadProgress >= 100) {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
      }, 450);
    }
  }, 40);

  // ==========================================================================
  // 2. TOP SCROLL PROGRESS BAR & HEADER SCROLLED STATE
  // ==========================================================================
  const scrollProgressBar = document.getElementById('scroll-progress');
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.transform = `scaleX(${scrollPercent})`;
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 3. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('is-open');
      mobileDrawer.classList.toggle('open');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('is-open');
        mobileDrawer.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target) && mobileDrawer.classList.contains('open')) {
        mobileMenuBtn.classList.remove('is-open');
        mobileDrawer.classList.remove('open');
      }
    });
  }

  // ==========================================================================
  // 4. DYNAMIC TYPEWRITER EFFECT
  // ==========================================================================
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Web Developer',
    'Siswa RPL SMK Telkom Lampung',
    'Front-End Specialist',
    'Back-End & DB Explorer',
    'UI/UX Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typewriterEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2200; // pause at complete word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ==========================================================================
  // 5. SYNTHESIZED WEB AUDIO LO-FI CHILL STATION
  // ==========================================================================
  const lofiCard = document.querySelector('.lofi-card');
  const lofiPlayBtn = document.getElementById('lofi-play-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const lofiTitleEl = document.getElementById('lofi-title');
  const lofiArtistEl = document.getElementById('lofi-artist');
  const lofiCounterEl = document.getElementById('lofi-counter');
  const lofiStatusText = document.getElementById('lofi-status-text');
  const lofiProgressFill = document.getElementById('lofi-progress');
  const lofiTimeCurr = document.getElementById('lofi-time-curr');
  const lofiPrevBtn = document.getElementById('lofi-prev-btn');
  const lofiNextBtn = document.getElementById('lofi-next-btn');
  const lofiDisc = document.getElementById('lofi-disc');

  const tracks = [
    { title: 'Midnight Coding Waves', artist: 'RPL Telkom • Ambient Chill', baseFreq: 220 },
    { title: 'Deep Sea Bioluminescence', artist: 'Cyber Ocean • Lo-Fi Beats', baseFreq: 196 },
    { title: 'Terminal Synthwave Glow', artist: 'Brayend Ferlando • Focus Session', baseFreq: 261.6 }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let audioCtx = null;
  let synthTimer = null;
  let trackSeconds = 0;
  const totalTrackSeconds = 60;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play peaceful ambient pentatonic chord note
  function playSynthChord(base) {
    if (!audioCtx || !isPlaying) return;

    // Pentatonic scale notes
    const intervals = [0, 4, 7, 11, 14];
    const semi = intervals[Math.floor(Math.random() * intervals.length)];
    const freq = base * Math.pow(2, semi / 12);

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Smooth envelope attack and long release
    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  function startLofiSynth() {
    initAudioContext();
    isPlaying = true;
    if (lofiCard) lofiCard.classList.add('playing');
    if (lofiDisc) lofiDisc.classList.add('playing');
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');
    if (lofiStatusText) lofiStatusText.textContent = '▶ Sedang Memutar Musik Lo-Fi';

    // Play chord every ~800ms
    synthTimer = setInterval(() => {
      playSynthChord(tracks[currentTrackIdx].baseFreq);
      trackSeconds++;
      if (trackSeconds > totalTrackSeconds) trackSeconds = 0;

      const mins = Math.floor(trackSeconds / 60);
      const secs = trackSeconds % 60;
      if (lofiTimeCurr) {
        lofiTimeCurr.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
      if (lofiProgressFill) {
        const pct = (trackSeconds / totalTrackSeconds) * 100;
        lofiProgressFill.style.width = `${pct}%`;
      }
    }, 1000);
  }

  function pauseLofiSynth() {
    isPlaying = false;
    clearInterval(synthTimer);
    if (lofiCard) lofiCard.classList.remove('playing');
    if (lofiDisc) lofiDisc.classList.remove('playing');
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
    if (lofiStatusText) lofiStatusText.textContent = '⏸ Musik Dijeda';
  }

  function updateTrackDisplay() {
    const t = tracks[currentTrackIdx];
    if (lofiTitleEl) lofiTitleEl.textContent = t.title;
    if (lofiArtistEl) lofiArtistEl.textContent = t.artist;
    if (lofiCounterEl) lofiCounterEl.textContent = `${currentTrackIdx + 1} / ${tracks.length}`;
    trackSeconds = 0;
    if (lofiTimeCurr) lofiTimeCurr.textContent = '0:00';
    if (lofiProgressFill) lofiProgressFill.style.width = '0%';
  }

  if (lofiPlayBtn) {
    lofiPlayBtn.addEventListener('click', () => {
      if (!isPlaying) {
        startLofiSynth();
      } else {
        pauseLofiSynth();
      }
    });
  }

  if (lofiNextBtn) {
    lofiNextBtn.addEventListener('click', () => {
      currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
      updateTrackDisplay();
      if (isPlaying) {
        pauseLofiSynth();
        startLofiSynth();
      }
    });
  }

  if (lofiPrevBtn) {
    lofiPrevBtn.addEventListener('click', () => {
      currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
      updateTrackDisplay();
      if (isPlaying) {
        pauseLofiSynth();
        startLofiSynth();
      }
    });
  }

  // ==========================================================================
  // 6. SKILL CATEGORY FILTERING
  // ==========================================================================
  const skillFilterBtns = document.querySelectorAll('#skill-filters .filter-btn');
  const skillCards = document.querySelectorAll('#skills-container .skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 7. PROJECT DETAILS MODAL
  // ==========================================================================
  const projectModal = document.getElementById('project-modal');
  const modalTarget = document.getElementById('modal-content-target');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectData = {
    'sim-sekolah': {
      tag: 'Sistem Informasi Akademik RPL',
      title: 'SIM-Sekolah & Presensi Digital SMK Telkom Lampung',
      desc: 'Aplikasi manajemen akademik terintegrasi untuk SMK Telkom Lampung yang menggantikan pencatatan presensi manual dengan sistem absensi digital realtime. Memudahkan staf TU, guru pengampu, serta wali kelas dalam memonitor kehadiran dan menginput nilai siswa.',
      features: [
        'Manajemen Multi-Role: Administrator, Guru Pengampu, Wali Kelas, dan Siswa',
        'Presensi Harian Real-Time dengan validasi kehadiran dan status izin/sakit',
        'Dashboard Statistik Visual menampilkan grafik persentase kehadiran per kelas',
        'Modul Nilai & Rapor Siswa dengan kalkulasi otomatis bobot tugas, UTS, dan UAS',
        'Ekspor Data Absensi & Nilai ke format Excel (.xlsx) dan dokumen PDF siap cetak'
      ],
      tech: ['PHP 8.2', 'MySQL Relational DB', 'JavaScript ES6+', 'Tailwind CSS', 'Chart.js', 'FPDF Library'],
      role: 'Brayend bertindak sebagai Full-Stack Developer: merancang skema ERD database relasional, API endpoint autentikasi, serta merancang antarmuka dashboard admin yang intuitif dan responsif.'
    },
    'ekantin-pos': {
      tag: 'Point of Sale (POS) & Kasir',
      title: 'E-Kantin POS & Kasir Digital SMK Telkom Lampung',
      desc: 'Sistem Kasir Web Digital untuk mempercepat transaksi antrean di kantin SMK Telkom Lampung saat jam istirahat. Menggantikan nota fisik dengan cetak struk digital dan kalkulasi otomatis belanja siswa.',
      features: [
        'Katalog Menu Interaktif dengan filter cepat kategori makanan berat, snack, & minuman',
        'Keranjang Kasir Cepat (Fast POS Cart) dengan kalkulasi subtotal dan kembalian tunai seketika',
        'Penyimpanan Transaksi Lokal (LocalStorage/IndexedDB) sehingga tetap beroperasi saat internet offline',
        'Laporan Rekapitulasi Pendapatan Harian & Menu Terlaris untuk pemilik stan kantin',
        'Integrasi Web Thermal Print API untuk pencetakan struk belanja langsung ke printer kasir bluetooth'
      ],
      tech: ['JavaScript ES6+', 'HTML5 Semantik', 'CSS3 Glassmorphism', 'Web LocalStorage', 'Web Bluetooth Print API'],
      role: 'Brayend mengembangkan arsitektur logika kasir, sistem keranjang reaktif berbasis DOM murni tanpa framework berat, serta styling glassmorphism yang bersih dan modern.'
    },
    'wisata-lampung': {
      tag: 'Portal Wisata & Pemandu Daerah',
      title: 'Lampung Tourism & Eco-Guide Portal',
      desc: 'Website panduan pariwisata bahari dan ekowisata Provinsi Lampung untuk mempromosikan keindahan Teluk Kiluan, Pantai Gigi Hiu, Way Kambas, dan kekayaan alam Lampung kepada wisatawan nusantara maupun mancanegara.',
      features: [
        'Peta Interaktif Destinasi berbasis Leaflet.js dengan marker koordinat GPS akurat',
        'Kalkulator Estimasi Biaya Wisata berdasarkan jumlah orang, durasi hari, dan tipe transportasi',
        'Panduan Rute Perjalanan, tips keamanan, kontak pemandu lokal, dan penginapan terdekat',
        'Galeri Foto Wisata Resolusi Tinggi dengan optimasi kompresi webp muat kilat',
        'Integrasi Tombol WhatsApp untuk reservasi paket wisata langsung ke pengelola'
      ],
      tech: ['HTML5', 'CSS3 Modern', 'JavaScript', 'Leaflet.js Maps API', 'OpenStreetMap', 'Vercel Deployment'],
      role: 'Brayend merancang konsep antarmuka bertema bahari samudra, mengintegrasikan Leaflet map layer, serta membangun algoritma kalkulator estimasi bujet liburan.'
    },
    'digilib-telkom': {
      tag: 'Perpustakaan Digital Sekolah',
      title: 'Telkom DigiLib — Perpustakaan Digital SMK Telkom Lampung',
      desc: 'Platform perpustakaan digital untuk mendukung budaya literasi siswa SMK Telkom Lampung. Memfasilitasi pencarian katalog ribuan buku kejuruan RPL, novel, serta modul pembelajaran digital sekolah.',
      features: [
        'Pencarian Instan (Live AJAX Search) judul buku, kategori jurusan, penulis, atau ISBN',
        'Sistem Booking & Peminjaman Online dengan status tenggat waktu pengembalian otomatis',
        'E-Reader Terintegrasi untuk membaca modul materi e-book langsung di browser tanpa unduh',
        'Statistik Buku Paling Sering Dipinjam dan riwayat peminjaman tiap siswa',
        'Dashboard Pustakawan untuk inventarisasi buku baru dan cetak barcode label'
      ],
      tech: ['PHP', 'MySQL', 'Bootstrap 5', 'AJAX / Fetch API', 'PDF.js Reader Engine'],
      role: 'Brayend membangun modul pencarian reaktif, pengolahan query SQL database buku, serta integrasi komponen pembaca PDF digital.'
    }
  };

  function openProjectModal(key) {
    const data = projectData[key];
    if (!data || !modalTarget || !projectModal) return;

    modalTarget.innerHTML = `
      <span class="modal-tag">${data.tag}</span>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-desc">${data.desc}</p>
      
      <h4 class="modal-section-title">Fitur Kunci & Keunggulan Sistem</h4>
      <ul class="modal-feature-list">
        ${data.features.map(f => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>${f}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Teknologi yang Digunakan</h4>
      <div class="modal-tech-stack">
        ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>

      <h4 class="modal-section-title">Peran Brayend dalam Proyek</h4>
      <p class="modal-desc" style="margin-top: 0.35rem; font-size: 0.85rem;">${data.role}</p>

      <div style="margin-top: 1.75rem; display: flex; gap: 0.75rem;">
        <a href="#kontak" class="btn-tide" onclick="closeProjectModal()">
          <span>Hubungi untuk Diskusi Kode</span>
        </a>
      </div>
    `;

    projectModal.classList.remove('hidden');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      openProjectModal(projKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });

  // Make close function global for inline onclick
  window.closeProjectModal = closeProjectModal;

  // ==========================================================================
  // 8. INTERACTIVE BUG HUNTER MINI GAME (RPG HUD)
  // ==========================================================================
  const bugBtn = document.getElementById('bug-btn');
  const bugScoreEl = document.getElementById('bug-score');
  const bugArea = document.getElementById('bug-play-area');
  let bugCount = 0;

  const bugMessages = [
    '🐛 [Click to Fix Bug]',
    '🐞 [NullPointer Fixed!]',
    '🐜 [Memory Leak Patched!]',
    '🪲 [Syntax Error Resolved!]',
    '🐛 [CSS Layout Fixed!]'
  ];

  if (bugBtn && bugScoreEl && bugArea) {
    bugBtn.addEventListener('click', () => {
      bugCount++;
      bugScoreEl.textContent = `Bugs Fixed: ${bugCount}`;

      // Pick next label
      const nextLabel = bugMessages[bugCount % bugMessages.length];
      bugBtn.innerHTML = `<span>${nextLabel} (+10 EXP)</span>`;

      // Animate jump position randomly in play area
      const maxX = bugArea.clientWidth - bugBtn.clientWidth - 20;
      const maxY = bugArea.clientHeight - bugBtn.clientHeight - 10;
      
      const randX = Math.max(10, Math.floor(Math.random() * maxX));
      const randY = Math.max(5, Math.floor(Math.random() * maxY));

      bugBtn.style.position = 'absolute';
      bugBtn.style.left = `${randX}px`;
      bugBtn.style.top = `${randY}px`;
      bugBtn.style.transform = 'scale(1.15)';
      setTimeout(() => {
        bugBtn.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // ==========================================================================
  // 9. FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: close other items
        faqItems.forEach(other => other.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
          toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // ==========================================================================
  // 10. COPY EMAIL TO CLIPBOARD
  // ==========================================================================
  const copyEmailBtn = document.getElementById('btn-copy-email');
  const emailTextEl = document.getElementById('email-text');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailTextEl.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        if (copyBtnText) copyBtnText.textContent = 'Tersalin! ✓';
        copyEmailBtn.style.background = 'var(--primary-cyan)';
        copyEmailBtn.style.color = '#05111e';
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Salin';
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      });
    });
  }

  // ==========================================================================
  // 11. CONTACT FORM SUBMISSION WITH TOAST
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = document.getElementById('form-name')?.value;
      const emailVal = document.getElementById('form-email')?.value;
      const subjectVal = document.getElementById('form-subject')?.value;
      const msgVal = document.getElementById('form-message')?.value;

      if (!nameVal || !emailVal || !msgVal) return;

      if (submitBtnText) submitBtnText.textContent = 'Mengirim Pesan...';
      if (submitBtn) submitBtn.disabled = true;

      // Simulate sending delay
      setTimeout(() => {
        if (formToast) formToast.classList.remove('hidden');
        contactForm.reset();
        if (submitBtnText) submitBtnText.textContent = 'Kirim Pesan Sekarang';
        if (submitBtn) submitBtn.disabled = false;

        // Auto hide toast after 5 seconds
        setTimeout(() => {
          if (formToast) formToast.classList.add('hidden');
        }, 5000);
      }, 900);
    });
  }

  // ==========================================================================
  // 12. FLOATING AI ASSISTANT ("AURA TELKOM BOT")
  // ==========================================================================
  const aiToggleBtn = document.getElementById('ai-toggle-btn');
  const aiChatWindow = document.getElementById('ai-chat-window');
  const aiCloseBtn = document.getElementById('ai-close-btn');
  const aiInput = document.getElementById('ai-input');
  const aiSendBtn = document.getElementById('ai-send-btn');
  const aiMessages = document.getElementById('ai-messages');
  const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');

  if (aiToggleBtn && aiChatWindow) {
    aiToggleBtn.addEventListener('click', () => {
      aiChatWindow.classList.toggle('hidden');
      if (!aiChatWindow.classList.contains('hidden') && aiInput) {
        aiInput.focus();
      }
    });

    if (aiCloseBtn) {
      aiCloseBtn.addEventListener('click', () => {
        aiChatWindow.classList.add('hidden');
      });
    }

    function appendMessage(sender, text) {
      if (!aiMessages) return;
      const msgDiv = document.createElement('div');
      msgDiv.className = `ai-msg ai-msg-${sender}`;
      msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
      aiMessages.appendChild(msgDiv);
      aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function handleAiQuery(query) {
      if (!query || query.trim() === '') return;
      const q = query.trim().toLowerCase();
      appendMessage('user', query);

      let reply = '';

      if (q.includes('siapa') || q.includes('tentang') || q.includes('profil') || q.includes('brayend')) {
        reply = '<strong>Brayend Roland Ferlando</strong> adalah siswa jurusan <strong>Rekayasa Perangkat Lunak (RPL) di SMK Telkom Lampung</strong>. Beliau berfokus pada pengembangan website interaktif, modern, cepat, serta arsitektur clean code standar industri!';
      } else if (q.includes('proyek') || q.includes('karya') || q.includes('portofolio')) {
        reply = 'Brayend telah membangun beberapa proyek nyata RPL, di antaranya:<br/>• <strong>SIM-Sekolah</strong> (Sistem Informasi & Presensi Digital)<br/>• <strong>E-Kantin POS</strong> (Kasir Web Kantin Sekolah)<br/>• <strong>Lampung Tourism</strong> (Portal Pemandu Wisata Peta Leaflet)<br/>• <strong>Telkom DigiLib</strong> (Perpustakaan Digital).';
      } else if (q.includes('keahlian') || q.includes('skill') || q.includes('bahasa') || q.includes('teknologi')) {
        reply = 'Keahlian teknis Brayend mencakup:<br/>• <strong>Front-End:</strong> HTML5, CSS3/Glassmorphism, JavaScript ES6+, Tailwind CSS, Bootstrap 5<br/>• <strong>Back-End & DB:</strong> PHP, Laravel, MySQL, REST API<br/>• <strong>Tools:</strong> Git & GitHub, Figma, VS Code.';
      } else if (q.includes('kontak') || q.includes('hubungi') || q.includes('wa') || q.includes('email')) {
        reply = 'Anda dapat menghubungi Brayend langsung via <strong>WhatsApp (+62 812-3456-7890)</strong> atau email di <strong>brayend.ferlando@gmail.com</strong>. Brayend sangat ramah dan merespon dalam waktu < 24 jam!';
      } else if (q.includes('sekolah') || q.includes('telkom') || q.includes('rpl')) {
        reply = 'Brayend bersekolah di <strong>SMK Telkom Lampung</strong>, salah satu sekolah kejuruan IT terbaik dengan spesialisasi <strong>Rekayasa Perangkat Lunak (RPL)</strong> di Provinsi Lampung.';
      } else if (q.includes('magang') || q.includes('pkl') || q.includes('freelance') || q.includes('harga')) {
        reply = 'Brayend sangat terbuka untuk program <strong>Magang/PKL Industri</strong> maupun tawaran <strong>Freelance Web Development</strong>. Untuk konsultasi harga atau penawaran, silakan kirim pesan melalui menu Kontak.';
      } else {
        reply = 'Terima kasih atas pertanyaannya! Untuk informasi lebih lengkap atau konsultasi langsung mengenai proyek web impian Anda, silakan hubungi Brayend via <strong>WhatsApp</strong> atau isi <strong>Formulir Kontak</strong> di bagian bawah ya!';
      }

      setTimeout(() => {
        appendMessage('bot', reply);
      }, 400);
    }

    if (aiSendBtn && aiInput) {
      aiSendBtn.addEventListener('click', () => {
        const val = aiInput.value;
        if (val) {
          handleAiQuery(val);
          aiInput.value = '';
        }
      });

      aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = aiInput.value;
          if (val) {
            handleAiQuery(val);
            aiInput.value = '';
          }
        }
      });
    }

    quickPromptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const qType = btn.getAttribute('data-query');
        if (qType === 'siapa') handleAiQuery('Siapa Brayend Roland Ferlando?');
        else if (qType === 'proyek') handleAiQuery('Apa saja proyek yang telah dibuat?');
        else if (qType === 'keahlian') handleAiQuery('Keahlian teknologi apa yang dikuasai?');
        else if (qType === 'kontak') handleAiQuery('Bagaimana cara menghubungi Brayend?');
      });
    });
  }

});
