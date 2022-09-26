// Hooks
import { View, ActivityIndicator } from "react-native";
// Themes
import { THEME } from "../../theme";
// Styles
import { styles } from "./styles";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY} />
    </View>
  );
}
