// app/[id].js
import { useLocalSearchParams, router } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { ProductContext } from "../context/ProductContext";
import HeaderBar from "./components/HeaderBar";
import { colors, layout } from "./styles/theme";

export default function AccountDetails() {
  const { id } = useLocalSearchParams();
  const { products, updateProduct } = useContext(ProductContext);

  const account = products.find((a) => a.id === id);

  const [amount, setAmount] = useState("");

  if (!account) return <Text>Account Not Found</Text>;

  const handlePay = () => {
    const amt = Number(amount);
    if (amt <= 0 || isNaN(amt)) return Alert.alert("Invalid Amount");
    if (amt > account.CurrentBalance) return Alert.alert("Insufficient Balance");

    updateProduct({
      ...account,
      CurrentBalance: account.CurrentBalance - amt,
      transactions: [
        ...(account.transactions || []),
        {
          type: "Pay",
          amount: amt,
          date: new Date().toLocaleString()
        }
      ]
    });

    Alert.alert("Payment Successful!");
    setAmount("");
  };

  const selfTransfer = () => {
    const amt = Number(amount);
    if (amt <= 0 || isNaN(amt)) return Alert.alert("Invalid Amount");

    Alert.alert(
      "Transfer",
      "Select the account to transfer to:",
      products
        .filter((p) => p.id !== id)
        .map((p) => ({
          text: `${p.BankName} (${p.Branch})`,
          onPress: () => transferTo(p.id, amt),
        }))
    );
  };

  const transferTo = (toId, amt) => {
    const toAcc = products.find((p) => p.id === toId);
    if (!toAcc) return;

    updateProduct({
      ...account,
      CurrentBalance: account.CurrentBalance - amt,
      transactions: [
        ...(account.transactions || []),
        {
          type: "Transfer Out",
          amount: amt,
          to: toAcc.BankName,
          date: new Date().toLocaleString()
        }
      ]
    });

    updateProduct({
      ...toAcc,
      CurrentBalance: toAcc.CurrentBalance + amt,
      transactions: [
        ...(toAcc.transactions || []),
        {
          type: "Transfer In",
          amount: amt,
          from: account.BankName,
          date: new Date().toLocaleString()
        }
      ]
    });

    Alert.alert("Transfer Successful!");
    setAmount("");
  };

  const handleDeposit = () => {
    const amt = Number(amount);
    if (amt <= 0 || isNaN(amt)) return Alert.alert("Invalid Amount");

    updateProduct({
      ...account,
      CurrentBalance: account.CurrentBalance + amt,
      transactions: [
        ...(account.transactions || []),
        {
          type: "Deposit",
          amount: amt,
          date: new Date().toLocaleString()
        }
      ]
    });

    Alert.alert("Deposit Successful!");
    setAmount("");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.softBg }}>
      <HeaderBar title="AzurePay" />

      <View style={styles.container}>
        <Text style={styles.title}>Bank Account Details</Text>

        <View style={styles.card}>
          <Text style={styles.info}>Bank: {account.BankName}</Text>
          <Text style={styles.info}>Branch: {account.Branch}</Text>
          <Text style={styles.info}>Current Balance: ₹ {account.CurrentBalance}</Text>
        </View>

        <TextInput
          placeholder="Enter Amount"
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity style={styles.btnDeposit} onPress={handleDeposit}>
          <Text style={styles.btnText}>Deposit Money</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPay} onPress={handlePay}>
          <Text style={styles.btnText}>Pay from this Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnTransfer} onPress={selfTransfer}>
          <Text style={styles.btnText}>Self Transfer</Text>
        </TouchableOpacity>

        <Text style={styles.historyTitle}>Transaction History</Text>

        {account.transactions.length === 0 ? (
          <Text>No transactions yet</Text>
        ) : (
          account.transactions.map((t, i) => (
            <View key={i} style={styles.transactionItem}>
              <Text style={{ fontWeight: "bold" }}>{t.type}</Text>
              <Text>Amount: ₹ {t.amount}</Text>
              {t.to && <Text>To: {t.to}</Text>}
              {t.from && <Text>From: {t.from}</Text>}
              <Text>Date: {t.date}</Text>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.btnBack} onPress={() => router.back()}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: colors.text },

  card: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 18
  },

  info: { fontSize: 18, marginBottom: 6, color: colors.text },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: "#FFF",
    borderColor: "#EEE"
  },

  btnDeposit: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center"
  },

  btnPay: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center"
  },

  btnTransfer: {
    backgroundColor: "#6B4EFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center"
  },

  btnBack: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 30,
    alignItems: "center"
  },

  btnText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "700" },

  historyTitle: { marginTop: 25, fontSize: 22, fontWeight: "bold", marginBottom: 10, color: colors.text },

  transactionItem: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderColor: "#eee"
  }
});

