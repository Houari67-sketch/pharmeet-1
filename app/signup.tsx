import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <Text style={styles.subtitle}>Page d’inscription (prochaine étape).</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.back()}
        activeOpacity={0.9}
      >
        <Text style={styles.btnText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F5F7FB",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
    color: "#0F172A",
  },
  subtitle: {
    color: "#64748B",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#1E4FBF",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  btnText: {
    color: "#fff",
    fontWeight: "900",
  },
});
