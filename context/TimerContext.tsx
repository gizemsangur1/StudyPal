import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TimerMode = "work" | "shortBreak" | "longBreak";

interface WorkLog {
  [date: string]: number;
}

interface TimerContextProps {
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  switchMode: (newMode: TimerMode) => void;
  totalWorkSeconds: number;
  workLog: WorkLog;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

const WORK_LOG_STORAGE_KEY = "@studypal_worklog";

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(0);
  const [workLog, setWorkLog] = useState<WorkLog>({});

  // Uygulama başlarken workLog'u yükle
  useEffect(() => {
    const loadWorkLog = async () => {
      try {
        const stored = await AsyncStorage.getItem(WORK_LOG_STORAGE_KEY);
        if (stored) {
          setWorkLog(JSON.parse(stored));
        }
      } catch (err) {
        console.error("WorkLog yüklenemedi:", err);
      }
    };

    loadWorkLog();
  }, []);

  // workLog her değiştiğinde kaydet
  useEffect(() => {
    const saveWorkLog = async () => {
      try {
        await AsyncStorage.setItem(WORK_LOG_STORAGE_KEY, JSON.stringify(workLog));
      } catch (err) {
        console.error("WorkLog kaydedilemedi:", err);
      }
    };

    saveWorkLog();
  }, [workLog]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);

            if (mode === "work") {
              const today = new Date().toISOString().split("T")[0];
              setTotalWorkSeconds((prev) => prev + 25 * 60);
              setWorkLog((prevLog) => ({
                ...prevLog,
                [today]: (prevLog[today] || 0) + 25 * 60,
              }));
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);

  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    switch (mode) {
      case "work":
        setTimeLeft(25 * 60);
        break;
      case "shortBreak":
        setTimeLeft(5 * 60);
        break;
      case "longBreak":
        setTimeLeft(15 * 60);
        break;
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    switch (newMode) {
      case "work":
        setTimeLeft(25 * 60);
        break;
      case "shortBreak":
        setTimeLeft(5 * 60);
        break;
      case "longBreak":
        setTimeLeft(15 * 60);
        break;
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isRunning,
        mode,
        startTimer,
        pauseTimer,
        resetTimer,
        switchMode,
        totalWorkSeconds,
        workLog,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be used within a TimerProvider");
  return context;
};
