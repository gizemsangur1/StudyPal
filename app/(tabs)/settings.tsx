import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const { themeName, setThemeName, theme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleTheme = () => {
    setThemeName(themeName === "dark" ? "light" : "dark");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{t("settings")}</Text>

      <View style={styles.optionRow}>
        <Text style={{ color: theme.text,fontWeight:"bold" }}>{t("dark_mode")}</Text>
        <Switch
          value={themeName === "dark"}
          onValueChange={toggleTheme}
          thumbColor={themeName === "dark" ? "#facc15" : "#ccc"}
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={{ color: theme.text ,fontWeight:"bold",fontSize:16}}>🌐 {t("language")}</Text>
        <Text style={{ color: theme.text ,fontWeight:"bold",fontSize:16}}
          onPress={() =>
            i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr")
          }
        >
          {i18n.language === "tr" ? "🇹🇷" : "🇬🇧"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
});
