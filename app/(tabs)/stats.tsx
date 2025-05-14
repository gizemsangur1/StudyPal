import { View, Text, StyleSheet } from 'react-native';
import { useTimer } from '@/context/TimerContext';
import { useTasks } from '@/context/TaskContext';

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs} saat ${mins} dakika`;
}

export default function StatsScreen() {
  const { totalWorkSeconds } = useTimer();
  const { tasks } = useTasks();

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> İstatistikler</Text>

      <View style={styles.statBox}>
        <Text style={styles.label}>Toplam Çalışma Süresi:</Text>
        <Text style={styles.value}>{formatTime(totalWorkSeconds)}</Text>
      </View>

      <View style={styles.statBox}>
        <Text style={styles.label}>Tamamlanan Görev:</Text>
        <Text style={styles.value}>{completedCount} görev</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  statBox: { marginBottom: 24 },
  label: { fontSize: 16, color: '#666' },
  value: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50' },
});
