import React, { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Task = {
  id: string;
  title: string;
  dueDate: Date | null;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (
    title: string,
    dueDate?: Date | null,
    id?: string,
    completed?: boolean
  ) => string;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (
    title: string,
    dueDate: Date | null = null,
    id: string = uuidv4(),
    completed: boolean = false
  ): string => {
    const newTask: Task = { id, title, dueDate, completed };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask.id;
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, clearTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

