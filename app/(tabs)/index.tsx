import CustomButton from "@/components/CustomButton";
import { useTheme } from "@/context/ThemeContext";
import { useTimer } from "@/context/TimerContext";
import { useRouter } from "expo-router"; // Eğer React Navigation kullanıyorsan burayı değiştir
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { workLog } = useTimer();
  const router = useRouter();

  const streak = calculateStreak(workLog);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>StudyPal</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Verimli çalışma asistanına hoş geldin!
      </Text>

      <TouchableOpacity
        style={[
          styles.streakBox,
          {
            backgroundColor:theme.background,
          },
        ]}
        onPress={() => router.push("/stats")}
        activeOpacity={0.8}
      >
        <Text style={styles.streakIcon}>🔥</Text>
        <Text style={[styles.streakText, { color: theme.text }]}>
          {streak} günlük streak
        </Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <CustomButton name="Pomodoro Zamanlayıcı" path="/timer" />
        <CustomButton name="Görevlerim" path="/tasks" />
        <CustomButton name="İstatistikler" path="/stats" />
      </View>
    </View>
  );
}

function calculateStreak(log: Record<string, number>): number {
  let streak = 0;
  const now = new Date();

  for (let i = 0; i < 365; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    const dateStr = day.toISOString().split("T")[0];

    if (log[dateStr] && log[dateStr] > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    gap: 12,
    marginBottom: 40,
  },
  streakBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  streakIcon: {
    fontSize: 40,
  },
  streakText: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
