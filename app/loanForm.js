import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { LoanContext } from "../context/LoanContext";
import HeaderBar from "./components/HeaderBar";
import { colors, layout } from "./styles/theme";

export default function LoanForm() {
  const router = useRouter();
  const { bank, type, interest } = useLocalSearchParams();
  const { addLoan } = useContext(LoanContext);

  const [name, setName] = useState("");
  const [income, setIncome] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const newLoan = {
      id: Date.now().toString(),
      bank,
      type,
      interest,
      amount,
      applicant: name,
      income,
      status: "Processing"
    };
    addLoan(newLoan);
    router.push("/processing");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.softBg }}>
      <HeaderBar title="AzurePay" />
      <View style={{ padding: layout.padding }}>
        <Text style={styles.title}>Apply for Loan</Text>
        <Text style={styles.subtitle}>{bank} • {type} • {interest}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" />

          <Text style={styles.label}>Monthly Income</Text>
          <TextInput style={styles.input} value={income} onChangeText={setIncome} keyboardType="numeric" placeholder="Monthly income" />

          <Text style={styles.label}>Loan Amount</Text>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Desired loan amount" />
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitTxt}>Submit Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", color: colors.text, marginBottom: 6 },
  subtitle: { color: colors.muted, marginBottom: 12 },

  card: { backgroundColor: colors.card, padding: 12, borderRadius: 12, marginBottom: 12 },
  label: { color: colors.muted, marginTop: 10 },
  input: { backgroundColor: "#FFF", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#EEE", marginTop: 6 },

  submit: { backgroundColor: colors.primary, padding: 14, borderRadius: 12, alignItems: "center", marginTop: 10 },
  submitTxt: { color: "#fff", fontWeight: "700" }
});
