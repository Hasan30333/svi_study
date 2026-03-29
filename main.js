// Firebase Configuration (Placeholders - Replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase if SDK is loaded
let auth;
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
}

// Google Login Handler
function loginWithGoogle() {
  if (!auth) {
    showToast('❌ Firebase SDK가 로드되지 않았습니다.');
    return;
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      showToast(`👋 환영합니다, ${user.displayName}님!`);
      
      // Simulate network delay for transition
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
      showToast('❌ 로그인 중 오류가 발생했습니다: ' + error.message);
    });
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
  
  // Simulate network delay
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

// Dashboard Specific Functions (if main.js is shared)
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
