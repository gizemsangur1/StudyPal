import CustomButton from "@/components/CustomButton";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTimer } from "../../context/TimerContext";

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
}

export default function TimerScreen() {
  const {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    mode,
    switchMode,
  } = useTimer();
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={{ backgroundColor: theme.background, padding: 8 ,flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{color:theme.text, fontSize: 64, fontWeight: "bold", marginBottom: 20}}> {t(`mode.${mode}`)}</Text>
      <Text style={{color:theme.text,fontSize: 24, marginBottom: 10}}>{formatTime(timeLeft)}</Text>

      <View style={styles.buttonGroup}>
        <CustomButton
         name={isRunning ? t("pause") : t("start")}
          onPress={isRunning ? pauseTimer : startTimer}
        />
        <CustomButton name={t("reset")} onPress={resetTimer} />
      </View>

      <View style={styles.buttonGroup}>
        <CustomButton name={t("work_mode")} onPress={() => switchMode("work")} />
        <CustomButton
           name={t("short_break")}
          onPress={() => switchMode("shortBreak")}
        />
        <CustomButton
          name={t("long_break")}
          onPress={() => switchMode("longBreak")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  time: { fontSize: 64, fontWeight: "bold", marginBottom: 20 },
  mode: { fontSize: 24, marginBottom: 10 },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
});
