import { StyleSheet, Text, View } from "react-native";

export default function Profil() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Mon profil</Text>
      <Text>Profil utilisateur (à compléter)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "900", marginBottom: 10 },
});
