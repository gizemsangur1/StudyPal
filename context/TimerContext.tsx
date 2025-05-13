import React, { createContext, useContext, useState, useEffect } from 'react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerContextProps {
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  switchMode: (newMode: TimerMode) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
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
      case 'work':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    switch (newMode) {
      case 'work':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
    }
  };

  return (
    <TimerContext.Provider
      value={{ timeLeft, isRunning, mode, startTimer, pauseTimer, resetTimer, switchMode }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error('useTimer must be used within a TimerProvider');
  return context;
};
