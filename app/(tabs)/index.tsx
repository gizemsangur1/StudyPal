import { View, Text, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useTheme } from "@/context/ThemeContext";

export default function HomeScreen() {
  const { theme, themeName, setThemeName } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>StudyPal</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Verimli çalışma asistanına hoş geldin!
      </Text>

      <View style={styles.section}>
        <CustomButton name="Pomodoro Zamanlayıcı" path="/timer" />
        <CustomButton name="Görevlerim" path="/tasks" />
        <CustomButton name="İstatistikler" path="/stats" />
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
  themeSection: {
    gap: 10,
  },
});
