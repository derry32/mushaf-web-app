# 🏃 Sprint Tracker & Backlog
*Diperbarui oleh: Agent Rama (PM/BA)*

## 🎯 Sprint Saat Ini: Sprint UX Revamp (Dhea's Audit)
**Sprint Goal**: Mengimplementasikan perbaikan pengalaman pengguna (UX) berdasarkan hasil audit desain, dengan fokus pada aksesibilitas, keterbacaan, dan kenyamanan navigasi.
**Duration**: 1 minggu
**Status**: 📝 *Backlog*

---

## 📋 Product Backlog (Prioritas RICE)

### 1. 🔠 Penggunaan Web-Font Arabic Khusus (LPMQ / Uthmanic)
**Priority**: P0 (High)
**RICE Score**: Reach (100%) × Impact (4) × Confidence (90%) / Effort (2) = **180**
**User Story**: Sebagai pembaca, saya ingin tulisan Arab terlihat standar dan jelas, agar saya tidak salah melafalkan harakat atau tajwid.
**Acceptance Criteria**:
- Menggunakan *web-font* LPMQ Isep Misbah atau KFGQPC Uthman Taha.
- Font ter- *load* dengan lancar (tanpa *layout shift* parah).
**Technical Feasibility**: Tinggi (Cukup tambahkan `@font-face` di CSS dan *font file* di folder `/public`).
**Estimated Effort**: 2 Story Points.

### 2. ♿ Peningkatan Aksesibilitas (a11y aria-labels)
**Priority**: P1 (Medium-High)
**RICE Score**: Reach (100%) × Impact (3) × Confidence (100%) / Effort (1) = **300**
**User Story**: Sebagai pengguna, saya (atau mesin pembaca layar) ingin mengenali setiap tombol navigasi, agar aplikasi memenuhi standar aksesibilitas web.
**Acceptance Criteria**:
- Semua `<button>` dan `<a>` memiliki atribut `aria-label` deskriptif.
**Technical Feasibility**: Sangat Tinggi.
**Estimated Effort**: 1 Story Point.

### 3. 🎛️ Tombol Toggle Overlay Navigasi (Sticky)
**Priority**: P1 (Medium-High)
**RICE Score**: Reach (100%) × Impact (3) × Confidence (80%) / Effort (2) = **120**
**User Story**: Sebagai pengguna, saya ingin ada tombol *toggle* menu yang selalu terlihat samar, agar saya tidak kebingungan saat overlay navigasi otomatis menghilang.
**Acceptance Criteria**:
- Ada tombol/icon semi-transparan di pojok layar (misal pojok kanan bawah) untuk memunculkan overlay secara manual.
**Technical Feasibility**: Sedang (Perlu penyesuaian posisi z-index dan *event listener*).
**Estimated Effort**: 3 Story Points.

### 4. 🎨 Empty States yang Estetis (Ilustrasi SVG)
**Priority**: P2 (Medium)
**RICE Score**: Reach (60%) × Impact (2) × Confidence (90%) / Effort (2) = **54**
**User Story**: Sebagai pengguna baru, saya ingin melihat pesan sambutan visual saat daftar "Terakhir Dibaca" atau "Bookmark" kosong, agar tampilan tidak terlihat rusak/kaku.
**Acceptance Criteria**:
- Tambahkan komponen `EmptyState` yang berisi ilustrasi SVG dan pesan *"Mulai perjalanan membaca Anda"*.
**Technical Feasibility**: Tinggi.
**Estimated Effort**: 2 Story Points.

### 5. 🤌 Transisi Halaman (Page Transitions) yang Smooth
**Priority**: P2 (Medium-Low)
**RICE Score**: Reach (100%) × Impact (2) × Confidence (70%) / Effort (4) = **35**
**User Story**: Sebagai pengguna, saya ingin ada animasi transisi saat berpindah dari halaman beranda ke mushaf, agar terasa seperti aplikasi *native*.
**Acceptance Criteria**:
- Implementasi Framer Motion atau Next.js view transitions API saat me- *routing*.
**Technical Feasibility**: Sedang (Terkadang transisi Next.js App Router butuh penanganan khusus agar tidak merusak PWA/caching).
**Estimated Effort**: 4 Story Points.

### 6. 🌙 Tema "Emerald Islamic" (Tema Hijau Emas)
**Priority**: P2 (Medium)
**RICE Score**: Reach (100%) × Impact (3) × Confidence (90%) / Effort (3) = **90**
**User Story**: Sebagai pengguna, saya ingin ada pilihan tema bernuansa hijau zamrud Islami, agar memberikan kesan spiritual dan teduh di mata.
**Acceptance Criteria**:
- Tersedia opsi tema "Emerald" di `ThemeToggle`.
- Latar belakang berwarna hijau zamrud (`#0D3B2E`) dengan pola Islami (SVG pattern).
- Teks UI dan ornamen berwarna krem/gading (`#FDF6E3`), dan filter mushaf SVG diatur agar menyatu (*blend*) dengan latar hijau.
**Technical Feasibility**: Sedang (Cukup tambahkan *CSS variables* baru di `globals.css` dan perbarui fungsi `useAppStore` serta ikon SVG *toggle*).
**Estimated Effort**: 3 Story Points.

---

## 🏃 Sprint Execution Plan

**Items to Execute:**
- [ ] **[Story]** ♿ Tambahkan `aria-label` pada icon button — **1 pts** — *Assignee: Developer*
- [ ] **[Story]** 🔠 Implementasi font LPMQ Isep Misbah — **2 pts** — *Assignee: Developer*
- [ ] **[Story]** 🎛️ Buat tombol Toggle Overlay Navigasi semi-transparan — **3 pts** — *Assignee: Developer*
- [ ] **[Story]** 🎨 Buat komponen `EmptyState` untuk LastRead & Bookmark — **2 pts** — *Assignee: Dhea (Design), Developer (Code)*

*(Total Capacity yang masuk Sprint perdana ini: 8 Story Points)*
