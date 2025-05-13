import { View, Text, StyleSheet } from 'react-native';
import { useTimer } from '../../context/TimerContext';
import CustomButton from '@/components/CustomButton';

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

      <View style={styles.buttonGroup}>
        <CustomButton
          name={isRunning ? 'Durdur' : 'Başlat'}
          onPress={isRunning ? pauseTimer : startTimer}
        />
        <CustomButton name="Sıfırla" onPress={resetTimer} />
      </View>

      <View style={styles.buttonGroup}>
        <CustomButton name="Çalışma Modu" onPress={() => switchMode('work')} />
        <CustomButton name="Kısa Mola" onPress={() => switchMode('shortBreak')} />
        <CustomButton name="Uzun Mola" onPress={() => switchMode('longBreak')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  time: { fontSize: 64, fontWeight: 'bold', marginBottom: 20 },
  mode: { fontSize: 24, marginBottom: 10 },
  buttonGroup: {
  flexDirection: 'row',
  flexWrap: 'wrap',       
  justifyContent: 'center',
  gap: 10,
  marginTop: 20,
}

});
