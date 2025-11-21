import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import HeaderBar from "./components/HeaderBar";
import { colors } from "./styles/theme";

export default function Processing() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.softBg }}>
      <HeaderBar title="ValariyaPay" />
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.main}>Your request is being processed...</Text>
        <Text style={styles.sub}>We will notify you soon!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  main: { fontSize: 18, fontWeight: "700", marginTop: 20, color: colors.text },
  sub: { marginTop: 8, color: colors.muted }
});

