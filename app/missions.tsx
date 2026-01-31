import { StyleSheet, Text, View } from "react-native";

export default function MissionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Missions / Offres</Text>
      <Text style={styles.subtitle}>Ici tu afficheras la liste des missions plus tard.</Text>

      <View style={styles.card}>
        <Text style={styles.item}>• Mission 1: Remplacement 2 jours</Text>
        <Text style={styles.item}>• Mission 2: Temps partiel</Text>
        <Text style={styles.item}>• Mission 3: Garde week-end</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 8 },
  subtitle: { color: "#555", marginBottom: 12 },
  card: { borderRadius: 14, backgroundColor: "#f4f4f5", padding: 14 },
  item: { fontSize: 14, color: "#111827", marginBottom: 10 },
});
