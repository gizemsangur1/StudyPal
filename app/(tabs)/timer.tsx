import { View, Text, Button, StyleSheet } from 'react-native';
import { useTimer } from '../../context/TimerContext';

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export default function TimerScreen() {
  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer, mode, switchMode } = useTimer();

  return (
    <View style={styles.container}>
      <Text style={styles.mode}>{mode.toUpperCase()}</Text>
      <Text style={styles.time}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttons}>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={isRunning ? pauseTimer : startTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
      <View style={styles.buttons}>
        <Button title="Work" onPress={() => switchMode('work')} />
        <Button title="Short Break" onPress={() => switchMode('shortBreak')} />
        <Button title="Long Break" onPress={() => switchMode('longBreak')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  time: { fontSize: 64, fontWeight: 'bold', marginBottom: 20 },
  mode: { fontSize: 24, marginBottom: 10 },
  buttons: { flexDirection: 'row', gap: 10, marginTop: 20 },
});
