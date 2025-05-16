import CustomButton from "@/components/CustomButton";
import StreakCard from "@/components/StreakCards";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>StudyPal</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        {t("home_subtitle")}
      </Text>


      <StreakCard />

      <View style={styles.section}>
         <CustomButton name={t("button_timer")} path="/timer" />
        <CustomButton name={t("button_tasks")} path="/tasks" />
        <CustomButton name={t("button_stats")} path="/stats" />
      </View>
    </View>
  );
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
});
