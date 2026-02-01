import { StyleSheet, Text, View } from "react-native";

export default function Messages() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>MESSAGERIE ✅</Text>
      <Text style={styles.text}>Si tu vois ça, le bouton Contacter marche.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center", gap: 10 },
  title: { fontSize: 22, fontWeight: "900" },
  text: { fontSize: 14, fontWeight: "700" },
});
