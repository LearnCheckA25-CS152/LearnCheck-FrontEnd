// Data dummy untuk kuis
export const DUMMY_QUIZ_DATA = {
  "title": "Kuis : Front-End Web Development dengan React",
  "questions": [
    {
      "id": 1,
      "question": "Apa komponen utama dalam 'Hook' React untuk mengelola state?",
      "options": ["useEffect", "useState", "useContext", "useReducer"],
      "correct_answer": "useState",
      "explanation": "useState adalah Hook yang memungkinkan Anda menambahkan state React ke komponen fungsi."
    },
    {
      "id": 2,
      "question": "Manakah library UI yang menggunakan utility classes?",
      "options": ["Bootstrap", "Material-UI", "Tailwind CSS", "Chakra UI"],
      "correct_answer": "Tailwind CSS",
      "explanation": "Tailwind CSS adalah framework CSS yang berfokus pada utility-first untuk membangun desain kustom."
    },
    {
      "id": 3,
      "question": "Bagaimana cara mengirim data dari iframe ke halaman induk?",
      "options": ["window.parent.postMessage()", "window.postMessage()", "localStorage", "sessionStorage"],
      "correct_answer": "window.parent.postMessage()",
      "explanation": "postMessage() memungkinkan komunikasi aman antar-Window, termasuk antara iframe dan halaman induknya."
    },
    {
      "id": 4,
      "question": "Apa fungsi dari useEffect dalam React?",
      "options": ["Mengelola state", "Menangani side effects", "Membuat komponen", "Mengatur routing"],
      "correct_answer": "Menangani side effects",
      "explanation": "useEffect digunakan untuk menangani side effects seperti API calls, subscriptions, atau manual DOM changes."
    },
    {
      "id": 5,
      "question": "Manakah yang bukan merupakan HTTP method?",
      "options": ["GET", "POST", "FETCH", "DELETE"],
      "correct_answer": "FETCH",
      "explanation": "FETCH bukan HTTP method. FETCH adalah JavaScript API untuk melakukan HTTP requests."
    },
    {
      "id": 6,
      "question": "Apa fungsi dari middleware dalam Express.js?",
      "options": ["Mengelola database", "Memproses request sebelum mencapai route handler", "Membuat tampilan HTML", "Mengatur konfigurasi server"],
      "correct_answer": "Memproses request sebelum mencapai route handler",
      "explanation": "Middleware adalah fungsi yang memiliki akses ke request object, response object, dan next middleware function dalam siklus request-response aplikasi."
    },
    {
      "id": 7,
      "question": "Manakah cara yang benar untuk menangani error dalam async/await?",
      "options": ["try/catch", "then/catch", "error callback", "promise.catch()"],
      "correct_answer": "try/catch",
      "explanation": "Dalam async/await, error handling dilakukan menggunakan try/catch block untuk menangkap exception yang terjadi."
    },
    {
      "id": 8,
      "question": "Apa itu CORS dalam web development?",
      "options": ["Cross-Origin Resource Sharing", "Client-Origin Request Security", "Cross-Object Resource System", "Client-Object Response Sharing"],
      "correct_answer": "Cross-Origin Resource Sharing",
      "explanation": "CORS (Cross-Origin Resource Sharing) adalah mekanisme yang memungkinkan web page untuk mengakses resource dari domain yang berbeda."
    },
    {
      "id": 9,
      "question": "Manakah yang merupakan NoSQL database?",
      "options": ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      "correct_answer": "MongoDB",
      "explanation": "MongoDB adalah document-based NoSQL database yang menyimpan data dalam format BSON (Binary JSON)."
    },
    {
      "id": 10,
      "question": "Apa fungsi dari package.json dalam Node.js project?",
      "options": ["Menyimpan source code", "Mengelola dependencies dan metadata project", "Mengatur database connection", "Membuat dokumentasi"],
      "correct_answer": "Mengelola dependencies dan metadata project",
      "explanation": "package.json berisi metadata tentang project dan daftar dependencies yang dibutuhkan, serta script yang dapat dijalankan."
    }
  ]
};