import { useTheme } from "@/context/ThemeContext";
import { useTimer } from "@/context/TimerContext";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function StreakCard() {
  const { theme, themeName } = useTheme();
  const { workLog } = useTimer();
  const router = useRouter();
  const { t } = useTranslation();

  const streak = calculateStreak(workLog);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: themeName === "dark" ? "#94B4C1" : "#ECEFCA",
        },
      ]}
      onPress={() => router.push("/stats")}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>🔥</Text>
      <Text style={[styles.text, { color: theme.text }]}>
         {t("streak_message", { count: streak })}
      </Text>
    </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  icon: {
    fontSize: 40,
  },
  text: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
