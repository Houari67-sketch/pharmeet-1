import { StyleSheet, Text, View } from "react-native";

export default function ParametresScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <View style={styles.card}>
        <Text style={styles.item}>• Notifications (plus tard)</Text>
        <Text style={styles.item}>• Confidentialité (plus tard)</Text>
        <Text style={styles.item}>• Conditions d’utilisation (plus tard)</Text>
        <Text style={styles.item}>• Support (plus tard)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 14, backgroundColor: "#f4f4f5", padding: 14 },
  item: { fontSize: 14, color: "#111827", marginBottom: 10 },
});
