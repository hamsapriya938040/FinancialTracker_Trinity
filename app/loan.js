// app/loan.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { LoanContext } from "../context/LoanContext";
import { useContext } from "react";
import { Link } from "expo-router";
import HeaderBar from "./components/HeaderBar";

// Defining the new theme colors based on your image
const theme = {
  bg: "#F8F9FD",       // Very light grey/blue background
  primary: "#6B4EFF",  // Deep Purple (Like the 'Current Balance' card)
  accent: "#A594F9",   // Lighter Purple
  cardBg: "#FFFFFF",   // White for lists
  textDark: "#1A1A1A", // Almost black
  textGrey: "#8E8E93", // Grey for secondary text
  success: "#4CD964",  // Green for good rates
};

export default function LoanScreen() {
  const { loans, emis } = useContext(LoanContext);

  // Helper to render a circle icon placeholder (mimicking the logos in the image)
  const IconPlaceholder = ({ label }) => (
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>{label.charAt(0)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderBar title="AzurePay" />
      
      <View style={styles.contentContainer}>
        <Text style={styles.pageTitle}>Loans & Finance</Text>

        {/* SECTION: ACTIVE LOANS (Styled like the purple 'Balance' or 'Adobe' card) */}
        <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Active Loans</Text>
            {loans.length > 0 && <Text style={styles.seeAll}>See all</Text>}
        </View>

        {loans.length === 0 ? (
            <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No active loans.</Text>
            </View>
        ) : (
            loans.map((l) => (
            <View key={l.id} style={styles.heroCard}>
                <View style={styles.heroHeader}>
                    <View>
                        <Text style={styles.heroBank}>{l.bank}</Text>
                        <Text style={styles.heroType}>{l.type}</Text>
                    </View>
                    <View style={styles.rateChip}>
                        <Text style={styles.rateText}>{l.interest}</Text>
                    </View>
                </View>
                <View style={styles.heroFooter}>
                    <Text style={styles.heroBranch}>Branch: {l.branch}</Text>
                </View>
            </View>
            ))
        )}

        {/* SECTION: ACTIVE EMIS (Styled like the white 'Apple' card) */}
        <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Active EMIs</Text>
        </View>

        {emis.length === 0 ? (
             <Text style={styles.emptySimple}>No active EMIs.</Text>
        ) : (
            emis.map((e) => (
            <View key={e.id} style={styles.whiteCard}>
                <View style={styles.cardRow}>
                    <IconPlaceholder label={e.bank} />
                    <View style={{flex: 1}}>
                        <Text style={styles.cardTitle}>{e.bank}</Text>
                        <Text style={styles.cardSubtitle}>{e.type}</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={styles.amountText}>-₹{e.monthlyAmount}</Text>
                        <Text style={styles.timeText}>{e.yearsLeft}y {e.monthsLeft}m left</Text>
                    </View>
                </View>
            </View>
            ))
        )}

        {/* SECTION: OFFERS (Styled like 'Recent Transactions' list) */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Recommended Offers</Text>
        
        <View style={styles.listContainer}>
            {/* Loan Offers */}
            <Link href="/loanForm?type=Home Loan&bank=SBI&interest=8.3%" asChild>
                <TouchableOpacity style={styles.listItem}>
                    <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
                        <Text style={[styles.iconText, { color: '#1565C0' }]}>S</Text>
                    </View>
                    <View style={styles.listContent}>
                        <Text style={styles.listTitle}>SBI Home Loan</Text>
                        <Text style={styles.listSubtitle}>Low Interest</Text>
                    </View>
                    <Text style={styles.highlightTag}>8.3%</Text>
                </TouchableOpacity>
            </Link>

            <Link href="/loanForm?type=Car Loan&bank=HDFC&interest=9.9%" asChild>
                <TouchableOpacity style={styles.listItem}>
                    <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
                        <Text style={[styles.iconText, { color: '#2E7D32' }]}>H</Text>
                    </View>
                    <View style={styles.listContent}>
                        <Text style={styles.listTitle}>HDFC Car Loan</Text>
                        <Text style={styles.listSubtitle}>Easy Approval</Text>
                    </View>
                    <Text style={styles.highlightTag}>9.9%</Text>
                </TouchableOpacity>
            </Link>

             {/* EMI Offers */}
            <Link href="/emiForm?bank=Axis Bank&type=Gadget EMI" asChild>
                <TouchableOpacity style={styles.listItem}>
                    <View style={[styles.iconCircle, { backgroundColor: '#FCE4EC' }]}>
                        <Text style={[styles.iconText, { color: '#C2185B' }]}>A</Text>
                    </View>
                    <View style={styles.listContent}>
                        <Text style={styles.listTitle}>Axis Gadget EMI</Text>
                        <Text style={styles.listSubtitle}>0% Cost EMI avail.</Text>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.textDark,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.textDark,
  },
  seeAll: {
    fontSize: 14,
    color: theme.textGrey,
    fontWeight: "600",
  },

  // --- HERO CARD (Purple) ---
  heroCard: {
    backgroundColor: theme.primary,
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    // Shadow props
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  heroBank: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  heroType: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  rateChip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rateText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroBranch: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },

  // --- WHITE CARD (EMIs) ---
  whiteCard: {
    backgroundColor: theme.cardBg,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.textDark,
  },
  cardSubtitle: {
    fontSize: 13,
    color: theme.textGrey,
    marginTop: 2,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.textDark, // Red for outflow
  },
  timeText: {
    fontSize: 12,
    color: theme.textGrey,
    marginTop: 2,
  },

  // --- LIST ITEMS (Offers) ---
  listContainer: {
    backgroundColor: theme.cardBg,
    borderRadius: 24,
    padding: 10,
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.textDark,
  },
  listSubtitle: {
    fontSize: 13,
    color: theme.textGrey,
  },
  highlightTag: {
    fontWeight: "700",
    color: theme.primary,
    backgroundColor: "#F0F0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    overflow: 'hidden',
  },

  // --- COMMON ---
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14, // Squircle shape
    backgroundColor: "#F5F5FA",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.primary,
  },
  emptyCard: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(107, 78, 255, 0.05)',
    borderRadius: 20,
    marginBottom: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: theme.accent,
  },
  emptyText: {
    color: theme.primary,
    fontWeight: "600",
  },
  emptySimple: {
      color: theme.textGrey,
      marginBottom: 15,
      fontStyle: "italic",
  }
});