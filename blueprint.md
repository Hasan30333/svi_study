# **Project Blueprint: 스비 (Study Assistant)**

## **Project Overview**
"스비" (Study Assistant) is a gamified study management platform designed to help students track their learning progress, manage quests, and maintain study habits through AI-driven insights and a rewarding experience.

## **Project Features & Design**
- **Dashboard:** A central hub displaying daily study time, completed quests, and XP.
- **Quest System:** Gamified task management with subjects like Math, English, and Korean.
- **Study Plan:** Automated daily planning based on long-term goals.
- **Curriculum:** AI-recommended learning paths tailored to the student's level.
- **Homework Manager:** Tracking and reporting homework from teachers.
- **Alarm & Review:** Ebbinghaus Forgetting Curve-based review notifications.
- **Stats & Achievements:** Visualized progress and unlocked badges for motivation.

**Aesthetic:**
- **Colors:** A professional yet energetic palette (Primary: `#1A6FE8`, Dark Accent: `#1A2340`, Background: `#F4F6FA`).
- **Typography:** Expressive and clean `Noto Sans KR`.
- **UI Elements:** Rounded corners, subtle noise textures, and deep, multi-layered shadows for a "premium" feel.
- **Interactivity:** Fluid animations (`fadeInUp`), interactive icons, and polished buttons.

## **Current Implementation Plan: Login Page**

### **Objective**
Create a visually stunning and functional login page (`login.html`) as a separate entry point for the application, maintaining the project's premium aesthetic and providing a seamless transition to the dashboard.

### **Key Files & Context**
- `login.html`: The new entry page.
- `style.css`: Extracts shared variables and adds login-specific styles.
- `main.js`: Logic for form handling and navigation.

### **Implementation Steps**
1.  **Extract Shared Styles:** Move CSS variables and common styles from `index.html` to `style.css`.
2.  **Design `login.html`:** Implement a central, elevated login card with "Login" and "Sign Up" toggle, social login options, and modern styling.
3.  **Develop `main.js` Logic:** Add functions to toggle between Login and Sign Up views and a mock login function redirecting to `index.html`.
4.  **Polish & Interactivity:** Apply `fadeInUp` animations and "glow" effects to primary buttons.
5.  **Responsive Design:** Ensure the login page works perfectly on all screen sizes.

### **Verification & Testing**
- **UI Check:** Verify the login card is centered and visually consistent with the dashboard.
- **Functionality Check:** Ensure the Login/Sign Up toggle and mock login work smoothly.
- **Accessibility Check:** Confirm form labels and keyboard navigation are correctly implemented.
