// app/new.js
import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ProductContext } from "../context/ProductContext";
import { router } from "expo-router";
import HeaderBar from "./components/HeaderBar";
import { colors, layout } from "./styles/theme";

export default function NewAccount() {
  const { addProduct } = useContext(ProductContext);

  const [BankName, setBankName] = useState("");
  const [Branch, setBranch] = useState("");
  const [CurrentBalance, setCurrentBalance] = useState("");

  const handleSubmit = () => {
    if (!BankName || !Branch || !CurrentBalance) {
      alert("Please fill all fields");
      return;
    }

    addProduct({
      id: Date.now().toString(),
      BankName,
      Branch,
      CurrentBalance: Number(CurrentBalance),
      transactions: [],
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderBar title="ValariyaPay" />
      <Text style={styles.pageTitle}>Add New Bank Account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput style={styles.input} placeholder="Enter bank name" value={BankName} onChangeText={setBankName} />

        <Text style={styles.label}>Branch</Text>
        <TextInput style={styles.input} placeholder="Enter branch" value={Branch} onChangeText={setBranch} />

        <Text style={styles.label}>Opening Balance (₹)</Text>
        <TextInput style={styles.input} placeholder="Enter balance" keyboardType="numeric" value={CurrentBalance} onChangeText={setCurrentBalance} />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
        <Text style={styles.saveTxt}>Save Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.softBg },
  pageTitle: { fontSize: 22, fontWeight: "700", color: colors.text, margin: 18 },
  card: {
    marginHorizontal: layout.padding - 4,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 14,
    marginBottom: 20
  },
  label: { color: colors.muted, marginTop: 12, marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE"
  },
  saveBtn: {
    marginHorizontal: layout.padding - 4,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center"
  },
  saveTxt: { color: "#fff", fontWeight: "700" }
});
