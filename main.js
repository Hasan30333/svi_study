import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCf6mosg_McII4o4INE1WtZbiNym7On_ns",
  authDomain: "svi-study.firebaseapp.com",
  projectId: "svi-study",
  storageBucket: "svi-study.firebasestorage.app",
  messagingSenderId: "780797547188",
  appId: "1:780797547188:web:20c77ac86661105fdbbde1",
  measurementId: "G-EXRS658K37"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

// Google Login Handler
async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    showToast(`👋 환영합니다, ${user.displayName}님!`);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } catch (error) {
    console.error("Google Login Error:", error);
    showToast('❌ 로그인 중 오류가 발생했습니다: ' + error.message);
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', loginWithGoogle);
  }
});

// Auth State Toggle
function toggleAuth(mode) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const footerText = document.querySelector('.login-footer');

  if (mode === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    toggleBtns[0].classList.add('active');
    toggleBtns[1].classList.remove('active');
    footerText.innerHTML = '계정이 없으신가요? <a href="#" onclick="toggleAuth(\'signup\'); return false;">지금 가입하세요</a>';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    toggleBtns[0].classList.remove('active');
    toggleBtns[1].classList.add('active');
    footerText.innerHTML = '이미 계정이 있으신가요? <a href="#" onclick="toggleAuth(\'login\'); return false;">로그인하기</a>';
  }
}

// Mock Login Handler
function handleLogin(event) {
  event.preventDefault();
  showToast('🚀 환영합니다! 대시보드로 이동 중...');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

// Mock Sign Up Handler
function handleSignUp(event) {
  event.preventDefault();
  showToast('✨ 가입을 환영합니다! 첫 로그인을 진행해주세요.');
  setTimeout(() => {
    toggleAuth('login');
  }, 2000);
}

// Toast Notification System
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position: fixed;
    bottom: 26px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    background: #1A2340;
    color: white;
    border-radius: 12px;
    padding: 13px 20px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(26,35,64,0.18);
    animation: fadeInUp 0.25s ease;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translate(-50%, 8px)';
    t.style.transition = 'all 0.25s';
    setTimeout(() => t.remove(), 250);
  }, 2200);
}

// Dashboard Specific Functions
function showTab(name) {
  const content = document.getElementById('tab-' + name);
  if (!content) return;

  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  content.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick') === `showTab('${name}')`) n.classList.add('active');
  });
}

function toggleQuest(card) {
  if (card.classList.contains('completed')) return;
  card.classList.add('completed');
  card.querySelector('.quest-progress-fill').style.width = '100%';
  card.querySelector('.quest-check').textContent = '✓';
  const xp = card.querySelector('.quest-xp');
  xp.style.transform = 'scale(1.2)';
  xp.style.background = '#ECFDF5';
  xp.style.color = '#065F46';
  setTimeout(() => { xp.style.transform = 'scale(1)'; }, 300);
  showToast('✅ 완료! ' + xp.textContent + ' 획득!');
}

function addQuest() { showToast('✏️ 새 할 일 추가 기능은 곧 업데이트됩니다!'); }
function selectCurriculum() { showToast('📚 커리큘럼 선택! 계획 자동 생성 중...'); }

// HTML onclick 속성에서 호출 가능하도록 전역 노출
window.toggleAuth = toggleAuth;
window.handleLogin = handleLogin;
window.handleSignUp = handleSignUp;
window.showTab = showTab;
window.toggleQuest = toggleQuest;
window.addQuest = addQuest;
window.selectCurriculum = selectCurriculum;
