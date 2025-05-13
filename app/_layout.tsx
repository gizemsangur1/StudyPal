import { Stack } from 'expo-router';
import { TimerProvider } from '../context/TimerContext';
import { TaskProvider } from '../context/TaskContext';

export default function RootLayout() {
  return (
    <TimerProvider>
      <TaskProvider>
        <Stack />
      </TaskProvider>
    </TimerProvider>
  );
}
