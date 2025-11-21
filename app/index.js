import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import HeaderBar from "./components/HeaderBar";

// 1. Define the Modern Theme (Consistent with Loan Screen)
const theme = {
  bg: "#F8F9FD",       // Light Grey/Blue background
  primary: "#6B4EFF",  // Deep Purple
  cardBg: "#FFFFFF",   // White
  textDark: "#1A1A1A", // Black/Dark Grey
  textGrey: "#8E8E93", // Soft Grey
  danger: "#FF3B30",   // Red for delete
};

export default function ProductList() {
  const { products, deleteProduct } = useContext(ProductContext);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this bank account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteProduct(id) }
      ]
    );
  };

  const totalBalance = products.reduce(
    (sum, p) => sum + Number(p.CurrentBalance || 0),
    0
  );

  // Helper for Bank Icon (Visual Polish)
  const BankIcon = ({ name }) => (
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>{name ? name.charAt(0).toUpperCase() : "B"}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <HeaderBar title="AzurePay" />

      <View style={styles.contentContainer}>
        
        {/* 🔵 HERO CARD (Modernized: Deep Purple with Shadow) */}
        <View style={styles.heroCard}>
            <View>
                <Text style={styles.heroLabel}>Total Balance</Text>
                <Text style={styles.heroBalance}>₹ {totalBalance.toLocaleString()}</Text>
            </View>
            {/* Decorative Plus button (Visual only, or could link to Add) */}
            <View style={styles.heroIcon}>
                <Text style={{color: theme.primary, fontSize: 24, fontWeight:'bold'}}>+</Text>
            </View>
        </View>

        {/* 🟣 OFFER WIDGET (Rounded & Shadowed) */}
        <View style={styles.offerContainer}>
            <Image
            source={require("../assets/offer1.jpeg")} 
            style={styles.offerImg}
            resizeMode="cover"
            />
        </View>

        {/* ACCOUNTS LIST */}
        <Text style={styles.sectionTitle}>Your Accounts</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.accountCard}>
                {/* Clickable Area for Details */}
                <Link href={`${item.id}`} asChild>
                    <TouchableOpacity style={styles.cardContent}>
                        <BankIcon name={item.BankName} />
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.bankName}>{item.BankName}</Text>
                            <Text style={styles.bankBranch}>{item.Branch}</Text>
                        </View>
                        <Text style={styles.accountBalance}>₹{Number(item.CurrentBalance).toLocaleString()}</Text>
                    </TouchableOpacity>
                </Link>

                {/* Discrete Delete Button (Inside the card, bottom right) */}
                <View style={styles.cardFooter}>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.discreteDeleteBtn}>
                        <Text style={styles.discreteDeleteText}>Remove Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
          )}
        />

        {/* 🔵 ACTION BUTTONS (Modernized) */}
        <View style={styles.actionZone}>
          <Link href="/loan" asChild>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Check Loans & EMI</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/new" asChild>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>+ Add New Account</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={{ height: 50 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  contentContainer: {
    padding: 20,
  },

  // --- HERO CARD ---
  heroCard: {
    backgroundColor: theme.primary,
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    // Shadows
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  heroLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: 5,
  },
  heroBalance: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  heroIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  // --- OFFERS ---
  offerContainer: {
    marginTop: 20,
    height: 140,
    borderRadius: 20,
    backgroundColor: "#FFF", // Fallback
    overflow: "hidden", // Ensures image respects border radius
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  offerImg: {
    width: "100%",
    height: "100%",
  },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: theme.textDark, 
    marginTop: 25, 
    marginBottom: 15 
  },

  // --- ACCOUNT CARD ---
  accountCard: {
    backgroundColor: theme.cardBg,
    borderRadius: 20,
    marginBottom: 15,
    padding: 16,
    // Card Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F5F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.primary,
  },
  cardTextContainer: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.textDark,
  },
  bankBranch: {
    fontSize: 13,
    color: theme.textGrey,
    marginTop: 2,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.textDark, // keeping it dark for clean look
  },

  // --- DISCRETE DELETE BUTTON ---
  cardFooter: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 10,
    alignItems: "flex-end", // Aligns to the right
  },
  discreteDeleteBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  discreteDeleteText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.textGrey, // Subtle Grey
    // color: theme.danger, // Optional: Change to subtle Red if preferred
  },

  // --- ACTION BUTTONS ---
  actionZone: {
    marginTop: 20,
    gap: 15,
  },
  primaryBtn: {
    backgroundColor: theme.primary,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  secondaryBtnText: {
    color: theme.textDark,
    fontSize: 16,
    fontWeight: "700",
  },
});