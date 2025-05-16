import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@studypal_tasks';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string; 
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (title: string, dueDate?: Date | null) => string;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Görevler yüklenemedi:', err);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (err) {
        console.error('Görevler kaydedilemedi:', err);
      }
    };

    saveTasks();
  }, [tasks]);

  const addTask = (title: string, dueDate?: Date | null): string => {
    const id = Date.now().toString();
    const newTask: Task = {
      id,
      title,
      completed: false,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
    };
    setTasks((prev) => [newTask, ...prev]);
    return id;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
