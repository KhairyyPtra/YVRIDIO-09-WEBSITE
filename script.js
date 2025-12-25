// 1. NAVIGASI
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  document.getElementById('navLinks').classList.remove('active');
  window.scrollTo(0, 0);
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// 2. RANDOM QUOTES
const quotes = [
  "Kita pernah satu orbit.",
  "Bukan berpisah, hanya pindah galaksi.",
  "Kenangan kita mengambang di antara bintang.",
  "Sekelas hari ini, legenda selamanya.",
  "Tidak semua astronot ke luar angkasa, sebagian ke masa depan."
];
const quoteEl = document.getElementById("random-quote");
if (quoteEl) quoteEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];

// 3. MODAL & MUSIC
function openModal(src) { 
  document.getElementById("modal").style.display = "flex"; 
  document.getElementById("modal-img").src = src; 
}
function closeModal() { 
  document.getElementById("modal").style.display = "none"; 
}

const music = document.getElementById("bg-music");
let playing = false;
function toggleMusic() {
  if (playing) { music.pause(); } 
  else { music.volume = 0.4; music.play(); }
  playing = !playing;
}

// 4. COUNTDOWN
const gradDate = new Date("June 20, 2026 00:00:00").getTime();
function updateTimer() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;
  const diff = gradDate - new Date().getTime();
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  timerEl.innerText = `${d} Hari ${h} Jam Lagi`;
}

// 5. SEARCH & SORT
function filterMembers() {
  let input = document.getElementById('searchMember').value.toLowerCase();
  document.querySelectorAll('.anggota-card').forEach(card => {
    let name = card.querySelector('h4').innerText.toLowerCase();
    card.style.display = name.includes(input) ? "block" : "none";
  });
}

function sortMembers(type) {
  const grid = document.getElementById('memberGrid');
  if (!grid) return;
  const members = Array.from(grid.getElementsByClassName('anggota-card'));

  members.sort((a, b) => {
    if (type === 'random') return Math.random() - 0.5;
    if (type === 'az') return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
  });

  grid.innerHTML = "";
  members.forEach(m => grid.appendChild(m));
  refreshObserver(); 
}

// 6. ANIMASI REVEAL BERULANG
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); 
    }
  });
}, { threshold: 0.1 });

function refreshObserver() {
  document.querySelectorAll('.anggota-card').forEach(card => observer.observe(card));
}

// START
window.addEventListener('DOMContentLoaded', () => {
  updateTimer();
  setInterval(updateTimer, 1000);
  sortMembers('random');
});