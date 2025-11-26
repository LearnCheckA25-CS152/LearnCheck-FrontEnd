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

## 🛠️ Installation

```bash
# Clone repository
git clone <repository-url>

# Masuk ke direktori frontend
cd LearnCheck-FrontEnd

# Install dependencies
npm install

# Copy environment variables
cp .env.development .env

# Start development server
npm run dev
```

## 🌐 Environment Variables

File: `.env.development`

```env
VITE_API_URL=http://localhost:3000
VITE_PREFERENCES_API_URL=https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api/users
```

## 📱 Usage

### Standalone Mode
```
http://localhost:5173/?tutorial=tutorial-001&user=user-123
```

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

## 🏗️ Project Structure

```
LearnCheck-FrontEnd/
├── src/
│   ├── component/          # Reusable components
│   │   ├── BtnStart.jsx
│   │   ├── ButtonFeedback.jsx
│   │   ├── QuizNavigation.jsx
│   │   └── ...
│   ├── components/         # UI components (shadcn)
│   │   └── ui/
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── QuizPage.jsx
│   │   ├── QuizResultPage.jsx
│   │   └── FeedbackPage.jsx
│   ├── utils/             # Utility functions
│   │   ├── api.js
│   │   └── quizHelpers.js
│   ├── styles/            # CSS styles
│   │   └── style.css
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── .env.development       # Environment variables
├── CHANGELOG.md          # Dokumentasi perubahan
└── README.md             # This file
```

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

## 🔌 API Integration

### Backend Endpoints

**Generate Questions**
```
POST /api/generate-question/tutorials/:tutorialId
```

**Validate Answers**
```
POST /api/quiz/validate
Body: {
  quizId, answers, questions, finishedAt
}
Response: {
  stats, feedback, ...
}
```

**User Preferences**
```
GET /api/users/:userId/preferences
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Manual Testing
1. Start backend server
2. Start frontend server
3. Open: `http://localhost:5173/?tutorial=tutorial-001&user=user-123`
4. Follow test flow di CHANGELOG.md

## 📝 Recent Changes

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk detail perubahan terbaru:
- ✨ AI Feedback Integration
- 🐛 Bug Fix: Tombol Finish Quiz
- 🐛 Bug Fix: Tombol Mulai Quiz

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: React Icons
- **State Management**: React Hooks + localStorage

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "tailwindcss": "^3.x",
  "@radix-ui/react-*": "^1.x",
  "class-variance-authority": "^0.7.x"
}
```

## 🐛 Troubleshooting

### Tombol tidak tampil
- Cek console untuk error
- Inspect element di DevTools
- Verifikasi CSS classes

### Quiz tidak bisa diselesaikan
- Cek Network tab untuk API errors
- Verifikasi backend running
- Cek localStorage untuk data

### Feedback AI tidak muncul
- Pastikan backend API mengembalikan `feedback`
- Cek console untuk validation errors
- Verifikasi API key LangChain di backend

Lihat [CHANGELOG.md](./CHANGELOG.md) section Troubleshooting untuk detail lebih lanjut.

## 📄 License

[Specify your license here]

## 👥 Contributors

- Development Team
- AI Assistant (Kiro)

## 📞 Support

Untuk pertanyaan atau issue, silakan hubungi tim development.
