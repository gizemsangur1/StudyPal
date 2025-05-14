import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useTimer } from '@/context/TimerContext';

const screenWidth = Dimensions.get('window').width;

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs} saat ${mins} dakika`;
}

function getWeekDates(): string[] {
  const now = new Date();
  const week: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    week.push(d.toISOString().split('T')[0]);
  }
  return week;
}

export default function StatsScreen() {
  const { workLog } = useTimer();
  const [mode, setMode] = useState<'daily' | 'weekly'>('weekly');

  const today = new Date().toISOString().split('T')[0];
  const todaySeconds = workLog[today] || 0;

  const weekDates = getWeekDates();
  const weekData = weekDates.map((date) => Math.floor((workLog[date] || 0) / 60)); // dakika

  const chartData = {
    labels: mode === 'weekly' ? ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'] : ['Bugün'],
    datasets: [
      {
        data: mode === 'weekly' ? weekData : [Math.floor(todaySeconds / 60)],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 {mode === 'weekly' ? 'Haftalık' : 'Günlük'} İstatistikler</Text>

      <View style={styles.buttonRow}>
        <Button title="Günlük" onPress={() => setMode('daily')} />
        <Button title="Haftalık" onPress={() => setMode('weekly')} />
      </View>

      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="dk"
        chartConfig={{
          backgroundGradientFrom: '#f0f0f0',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => '#9B7EBD',
          labelColor: () => '#333',
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  chart: { borderRadius: 16 },
});
