import "@/constants/i18n";
import { useNotificationSetup } from "@/context/NotificationProvider";
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { TaskProvider } from "../context/TaskContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { TimerProvider } from "../context/TimerContext";

export default function RootLayout() {
  useNotificationSetup();

  return (
    <ThemeProvider>
      <TimerProvider>
        <TaskProvider>
          <LayoutWithTheme />
        </TaskProvider>
      </TimerProvider>
    </ThemeProvider>
  );
}

function LayoutWithTheme() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerRight: () => <ThemeToggleButtons />,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitle: "StudyPal",
        headerTitleStyle: {
          color: theme.text,
          fontSize: 20,
          fontWeight: "bold",
        },
        headerTintColor: theme.text,
      }}
    />
  );
}

function ThemeToggleButtons() {
  const { theme,themeName, setThemeName } = useTheme();
  const isLight = themeName === "light";
  const router = useRouter();
  return (
      <TouchableOpacity onPress={() => router.push("/settings")} style={{padding:15}}>
        <Ionicons name="settings-outline" size={24} color={theme.text} />
      </TouchableOpacity>
  );
}
