import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCf6mosg_McII4o4INE1WtZbiNym7On_ns",
  authDomain: "svi-study.firebaseapp.com",
  projectId: "svi-study",
  storageBucket: "svi-study.firebasestorage.app",
  messagingSenderId: "780797547188",
  appId: "1:780797547188:web:20c77ac86661105fdbbde1",
  measurementId: "G-EXRS658K37",
  databaseURL: "https://svi-study-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

// Google Login Handler
async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    showToast(`👋 환영합니다, ${result.user.displayName}님!`);
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
  } catch (error) {
    console.error("Google Login Error:", error);
    showToast('❌ 로그인 중 오류가 발생했습니다: ' + error.message);
  }
}

// Apple Login Handler
async function loginWithApple() {
  const provider = new OAuthProvider('apple.com');
  try {
    const result = await signInWithPopup(auth, provider);
    showToast(`👋 환영합니다, ${result.user.displayName || '사용자'}님!`);
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
  } catch (error) {
    console.error("Apple Login Error:", error);
    showToast('❌ Apple 로그인 오류: ' + error.message);
  }
}

// Email Login Handler
async function handleLogin(event) {
  event.preventDefault();
  const email = document.querySelector('#login-form input[type="email"]').value.trim();
  const password = document.querySelector('#login-form input[type="password"]').value;
  const btn = document.querySelector('#login-form .login-btn');

  btn.disabled = true;
  btn.textContent = '로그인 중...';

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    showToast(`👋 환영합니다, ${result.user.displayName || email}님!`);
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
  } catch (error) {
    btn.disabled = false;
    btn.textContent = '스비 시작하기';
    const msgs = {
      'auth/invalid-credential': '❌ 이메일 또는 비밀번호가 올바르지 않습니다.',
      'auth/user-not-found':     '❌ 등록되지 않은 이메일입니다.',
      'auth/wrong-password':     '❌ 비밀번호가 올바르지 않습니다.',
      'auth/invalid-email':      '❌ 유효하지 않은 이메일 형식입니다.',
      'auth/too-many-requests':  '❌ 너무 많은 시도입니다. 잠시 후 다시 시도해주세요.',
    };
    showToast(msgs[error.code] || '❌ 로그인 오류: ' + error.message);
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) googleBtn.addEventListener('click', loginWithGoogle);

  const appleBtn = document.getElementById('apple-login-btn');
  if (appleBtn) appleBtn.addEventListener('click', loginWithApple);
});

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

// Dashboard Tab Navigation
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

function addQuest() { showToast('✏️ 새 할 일 추가 기능은 곧 업데이트됩니다!'); }
function selectCurriculum() { showToast('📚 커리큘럼 선택! 계획 자동 생성 중...'); }

window.handleLogin = handleLogin;
window.showTab = showTab;
window.addQuest = addQuest;
window.selectCurriculum = selectCurriculum;
window.showToast = showToast;
