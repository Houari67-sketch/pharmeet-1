import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeTab() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Bienvenue sur Pharmeet 👋</Text>

      <Pressable style={styles.card}>
        <Text style={styles.cardTitle}>🔍 Rechercher</Text>
        <Text style={styles.cardText}>
          Trouver des remplacements ou des offres près de chez toi
        </Text>
      </Pressable>

      <Pressable style={styles.card}>
        <Text style={styles.cardTitle}>📄 Mes annonces</Text>
        <Text style={styles.cardText}>
          Publier ou gérer mes offres
        </Text>
      </Pressable>

      <Pressable style={styles.logout} onPress={() => router.replace("/login")}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F7FF",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  cardTitle: {
    fontWeight: "900",
    fontSize: 16,
  },
  cardText: {
    marginTop: 6,
    color: "#2A5B87",
  },
  logout: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#C0392B",
    fontWeight: "900",
  },
});
