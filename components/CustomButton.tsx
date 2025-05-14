import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

interface CustomButtonProps {
  name: string;
  path?: string;
  onPress?: () => void;
  buttonStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  isActive?: boolean; 
}


export default function CustomButton({
  name,
  path,
  onPress,
  buttonStyle,
  textStyle,
}: CustomButtonProps) {
  const router = useRouter();

  const { theme } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (path) {
      router.push(path as any);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.primary }, buttonStyle]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.text,
          { color: theme.text },
          textStyle,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9B7EBD",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
