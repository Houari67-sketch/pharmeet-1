import { StyleSheet, Text, View } from "react-native";

export default function Autour() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Autour de moi</Text>
      <Text>Plus tard: GPS + carte + pharmacies/offres autour.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "900", marginBottom: 10 },
});
