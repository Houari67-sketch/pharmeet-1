import { StyleSheet, Text, View } from "react-native";

export default function Actu() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Actu</Text>
      <Text>Page actus (placeholder)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "900", marginBottom: 10 },
});
