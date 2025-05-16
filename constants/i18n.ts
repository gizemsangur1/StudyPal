import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Dil anahtarları
const LANG_KEY = "user-language";

const resources = {
  tr: {
    translation: {
      "dark_mode": "Koyu Tema",
      "light_mode": "Açık Tema",
      "language": "Dil",
      "settings": "Ayarlar",
      "save": "Kaydet",
      "export_csv": "CSV Dışa Aktar",
      "minutes": "dk",
      "today": "Bugün",
      "daily": "Günlük",
      "weekly": "Haftalık",
      "daily_stats": "Günlük İstatistikler",
      "weekly_stats": "Haftalık İstatistikler",
      "daily_goal": "Günlük hedef (dakika)",
      "goal_placeholder": "örn. 120",
      "home_subtitle": "Verimli çalışma asistanına hoş geldin!",
      "button_timer": "Pomodoro Zamanlayıcı",
      "button_tasks": "Görevlerim",
      "button_stats": "İstatistikler",
      "start": "Başlat",
      "pause": "Durdur",
      "reset": "Sıfırla",
      "work_mode": "Çalışma Modu",
      "short_break": "Kısa Mola",
      "long_break": "Uzun Mola",
      "mode": {
        "work": "Çalışma",
        "shortBreak": "Kısa Mola",
        "longBreak": "Uzun Mola"
      },
      "tasks_title": "Görevlerim",
      "task_input_placeholder": "Yeni görev ekle...",
      "add_button": "Ekle",
      "no_tasks_text": "Henüz görev yok",
      "streak_message": "{{count}} günlük streak"
    }
  },
  en: {
    translation: {
      "dark_mode": "Dark Theme",
      "light_mode": "Light Theme",
      "language": "Language",
      "settings": "Settings",
      "save": "Save",
      "export_csv": "Export CSV",
      "minutes": "min",
      "today": "Today",
      "daily": "Daily",
      "weekly": "Weekly",
      "daily_stats": "Daily Statistics",
      "weekly_stats": "Weekly Statistics",
      "daily_goal": "Daily Goal (minutes)",
      "goal_placeholder": "e.g. 120",
      "home_subtitle": "Welcome to your productivity assistant!",
      "button_timer": "Pomodoro Timer",
      "button_tasks": "My Tasks",
      "button_stats": "Statistics",
      "start": "Start",
      "pause": "Pause",
      "reset": "Reset",
      "work_mode": "Work Mode",
      "short_break": "Short Break",
      "long_break": "Long Break",
      "mode": {
        "work": "Work",
        "shortBreak": "Short Break",
        "longBreak": "Long Break"
      },
      "tasks_title": "My Tasks",
      "task_input_placeholder": "Add a new task...",
      "add_button": "Add",
      "no_tasks_text": "No tasks yet",
      "streak_message": "{{count}} day streak"

    }
  }
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr", // geçici başlangıç dili (sonra değişecek)
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// 🔁 Uygulama başladığında AsyncStorage'dan dili yükle
AsyncStorage.getItem(LANG_KEY).then((storedLang) => {
  if (storedLang) {
    i18n.changeLanguage(storedLang);
  }
});

// 🌐 Kullanıcı dil değiştirdiğinde kaydet
i18n.on("languageChanged", (lng) => {
  AsyncStorage.setItem(LANG_KEY, lng);
});

export default i18n;
