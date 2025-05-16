import CustomButton from "@/components/CustomButton";
import "@/constants/i18n";
import { Stack, useRouter } from "expo-router";
import { TaskProvider } from "../context/TaskContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { TimerProvider } from "../context/TimerContext";

export default function RootLayout() {
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
  const { themeName, setThemeName } = useTheme();
  const isLight = themeName === "light";
   const router = useRouter();
  return (
    <div style={{margin:5}}>
      <CustomButton
        name={isLight ? "🌞" : "🌙"}
        onPress={() => router.push("/settings")}
        isActive={true}
      />
    </div>
  );
}
