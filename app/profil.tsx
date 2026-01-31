import { StyleSheet, Text, View } from "react-native";

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nom</Text>
        <Text style={styles.value}>À connecter plus tard</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>À connecter plus tard</Text>

        <Text style={styles.label}>Rôle</Text>
        <Text style={styles.value}>titulaire / préparateur / étudiant</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 14, backgroundColor: "#f4f4f5", padding: 14 },
  label: { fontSize: 12, color: "#6b7280", marginTop: 10 },
  value: { fontSize: 14, color: "#111827", marginTop: 4 },
});
