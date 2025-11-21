// app/components/HeaderBar.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export default function HeaderBar({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>
        <TouchableOpacity style={styles.icon} activeOpacity={0.8}>
          <Text style={styles.iconText}>⚪</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 18,
    backgroundColor: colors.bg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary
  },
  right: { flexDirection: "row", alignItems: "center" },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    justifyContent: "center"
  },
  iconText: { color: colors.primary }
});
