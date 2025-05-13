import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 StudyPal</Text>
      <Text style={styles.subtitle}>Verimli çalışma asistanına hoş geldin!</Text>

      <View style={styles.buttonGroup}>
        <Button title="Pomodoro Zamanlayıcı" onPress={() => router.push('/timer')} />
        <Button title="Görevlerim" onPress={() => router.push('/tasks')} />
        <Button title="İstatistikler" onPress={() => router.push('/stats')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, textAlign: 'center' },
  buttonGroup: { gap: 12, width: '100%' },
});
