# LearnCheck Frontend

Platform pembelajaran interaktif dengan fitur quiz dan feedback AI yang dipersonalisasi.

## 🚀 Fitur Utama

- **Quiz Interaktif**: Soal-soal yang dihasilkan secara otomatis dari materi pembelajaran
- **AI Feedback**: Analisis performa dan saran perbaikan yang dipersonalisasi menggunakan AI
- **Riwayat Quiz**: Tracking hasil quiz dengan statistik lengkap
- **User Preferences**: Kustomisasi tema, font, dan ukuran teks
- **Responsive Design**: Tampilan optimal di berbagai ukuran layar

## 📋 Prerequisites

- Node.js (v16 atau lebih tinggi)
- npm atau yarn
- Backend LearnCheck running di `http://localhost:3000`

### Iframe Embed
```html
<iframe
  src="http://localhost:5173?tutorial={tutorial_id}&user={user_id}"
  width="100%"
  height="750">
</iframe>
```

### URL Parameters
- `tutorial`: ID materi pembelajaran (required)
- `user`: ID pengguna (required)

## 🎯 Main Features

### 1. Quiz Flow
1. User membuka halaman dengan tutorial ID dan user ID
2. Sistem mengambil soal dari backend (AI-generated)
3. User mengerjakan quiz dengan timer 5 menit
4. Setelah selesai, jawaban divalidasi oleh AI backend
5. Hasil dan feedback disimpan ke localStorage
6. User dapat melihat hasil dan feedback AI

### 2. AI Feedback
- Analisis performa berdasarkan jawaban siswa
- Saran perbaikan yang spesifik dan relevan dengan materi
- Identifikasi area yang sudah dikuasai dan yang perlu perbaikan
- Motivasi konstruktif

### 3. User Preferences
- Theme: Light/Dark mode
- Font Style: Default/Serif/OpenDyslexic
- Font Size: Small/Medium/Large
- Layout Width: Full/Constrained
