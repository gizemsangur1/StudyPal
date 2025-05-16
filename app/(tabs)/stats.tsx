import CustomButton from "@/components/CustomButton";
import { useTheme } from "@/context/ThemeContext";
import { useTimer } from "@/context/TimerContext";
import { exportWorkLogAsCSV } from "@/hooks/exportWorkLogAsCSV";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import ConfettiCannon from "react-native-confetti-cannon";

const screenWidth = Dimensions.get("window").width;

function getWeekDates(): string[] {
  const now = new Date();
  const week: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    week.push(d.toISOString().split("T")[0]);
  }
  return week;
}

export default function StatsScreen() {
  const { workLog, dailyGoalMinutes, setDailyGoalMinutes } = useTimer();

  const [mode, setMode] = useState<"daily" | "weekly">("weekly");
  const [input, setInput] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  const today = new Date().toISOString().split("T")[0];
  const todaySeconds = workLog[today] || 0;

  const weekDates = getWeekDates();
  const weekData = weekDates.map((date) =>
    Math.floor((workLog[date] || 0) / 60)
  );

  const chartData = {
    labels:
      mode === "weekly"
        ? ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
        : ["Bugün"],
    datasets: [
      {
        data: mode === "weekly" ? weekData : [Math.floor(todaySeconds / 60)],
      },
    ],
  };

  const todayProgressPercent = Math.min(
    Math.floor((todaySeconds / 60 / dailyGoalMinutes) * 100),
    100
  );

  const updateGoal = () => {
    const parsed = parseInt(input);
    if (!isNaN(parsed) && parsed > 0) {
      setDailyGoalMinutes(parsed);
      setInput("");
    }
  };

  useEffect(() => {
    if (todayProgressPercent >= 100 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [todayProgressPercent]);

  return (
    <View
      style={{ backgroundColor: theme.background, padding: 20, height: "100%" }}
    >
      <Text style={{ color: theme.text, fontWeight: "bold" }}>
         {mode === "weekly" ? t("weekly_stats") : t("daily_stats")}
      </Text>

      <View style={styles.goalInputSection}>
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          {t("daily_goal")} :
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={{
              color: theme.text,
              flex: 1,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
            }}
            keyboardType="numeric"
            placeholder={t("goal_placeholder")}
            value={input}
            onChangeText={setInput}
          />
          <CustomButton name={t("save")} onPress={updateGoal} />
        </View>
      </View>

      <View style={styles.goalContainer}>
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          {t("today")}: {Math.floor(todaySeconds / 60)} {t("minutes")} /{" "}
          {dailyGoalMinutes} {t("minutes")} ({todayProgressPercent}%)
        </Text>
        <View style={styles.progressContainer}>
          <View
            style={[styles.progressBar, { width: `${todayProgressPercent}%` }]}
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <CustomButton name={t("daily")} onPress={() => setMode("daily")} />
        <CustomButton name={t("weekly")} onPress={() => setMode("weekly")} />
      </View>

      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="dk"
        chartConfig={{
          backgroundGradientFrom: "#f0f0f0",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => theme.secondary,
          labelColor: () => theme.secondary,
        }}
        bezier
        style={styles.chart}
      />

      {showConfetti && (
        <ConfettiCannon
          count={100}
          origin={{ x: screenWidth / 2, y: 0 }}
          fadeOut
          explosionSpeed={400}
          fallSpeed={2500}
        />
      )}

      <CustomButton
         name={t("export_csv")}
        onPress={() => exportWorkLogAsCSV(workLog)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },

  goalInputSection: { marginBottom: 20 },
  inputLabel: { fontSize: 16, marginBottom: 8 },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },

  goalContainer: { marginBottom: 24 },
  progressLabel: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  progressContainer: {
    height: 24,
    backgroundColor: "#eee",
    borderRadius: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#213448",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 8,
  },
  chart: { borderRadius: 16 },
  chartButton: {
    flex: 1,
    backgroundColor: "#ccc",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  chartButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: "#9B7EBD",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
