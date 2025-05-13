import { Stack } from 'expo-router';
import { TimerProvider } from '../context/TimerContext';

export default function RootLayout() {
  return (
    <TimerProvider>
      <Stack />
    </TimerProvider>
  );
}
