// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push, update, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEpRYI8d41KRuXeOrMJqaEf7C7limq1os",
  authDomain: "gameonline-060.firebaseapp.com",
  databaseURL: "https://gameonline-060-default-rtdb.firebaseio.com",
  projectId: "gameonline-060",
  storageBucket: "gameonline-060.firebasestorage.app",
  messagingSenderId: "672199594088",
  appId: "1:672199594088:web:5340d4fb35015fd2da2bdd",
  measurementId: "G-2V62SSKFD7"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database e exporta para usar nos outros arquivos
const db = getDatabase(app);

export { db, ref, set, onValue, push, update, get };