# 📚 StudyPal

**StudyPal** is a productivity-focused mobile app that helps users manage tasks and stay focused using the Pomodoro technique.  
Built with **React Native** and **Expo**, StudyPal combines habit tracking, statistics, and smart planning — now with full **Firebase authentication and cloud storage** support!

---

## 🚀 Features

- ⏱️ Pomodoro Timer (Work / Short Break / Long Break)
- 📝 Task Management (Add, complete, delete tasks)
- 🔥 Streak Tracker (Track daily task completion streak)
- 📈 Weekly & Daily Statistics (line chart and progress bar)
- 🌓 Light/Dark Theme Support
- 🌍 Multilingual (English & Turkish, user-selectable)
- 📅 Add Due Date and Time for Each Task
- 🔔 Local Notification 3 Hours Before Task Deadline
- 🔐 **Firebase Authentication (Login / Register / Logout)**
- ☁️ **Cloud Storage via Firestore per user**
- 🌍 **Language Support**
        - Turkish 🇹🇷
        - English 🇺🇸
        - Users can change the language in real-time from the settings screen.

---

## 🔐 Firebase Integration

StudyPal uses **Firebase Authentication** and **Firestore** for:

- Secure login/register with email and password
- User-specific task lists
- Persistent cloud-based task storage
- Automatic sync on login/logout

> Each user's tasks are stored under their unique UID in Firestore.

---

## 📦 Technologies Used

- **React Native** (Expo SDK 53)
- **TypeScript**
- **Expo Router**
- **AsyncStorage** – local persistence (optional fallback)
- **expo-notifications** – local reminders
- **i18next** – multi-language support
- **firebase** – Authentication & Firestore
- **react-native-chart-kit** – productivity statistics

---

## 📲 Installation

```bash
git clone https://github.com/your-username/studypal.git
cd studypal
npm install
