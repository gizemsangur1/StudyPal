import { Stack } from "expo-router";
import { TimerProvider } from "../context/TimerContext";
import { TaskProvider } from "../context/TaskContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import CustomButton from "@/components/CustomButton";

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
        headerTitle:"StudyPal",
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

  return (
    <>
      <CustomButton
        name="🌞"
        onPress={() => setThemeName("light")}
        isActive={themeName === "light"}
      />
      <CustomButton
        name="🌙"
        onPress={() => setThemeName("dark")}
        isActive={themeName === "dark"}
      />
    </>
  );
}
