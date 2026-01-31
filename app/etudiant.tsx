import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EtudiantScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espace Étudiant</Text>
      <Text style={styles.subtitle}>Stages, jobs, profil</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Infos nécessaires</Text>
        <Text style={styles.cardText}>• École / année</Text>
        <Text style={styles.cardText}>• Ville</Text>
        <Text style={styles.cardText}>• Disponibilités</Text>
        <Text style={styles.cardText}>• CV (plus tard)</Text>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => router.push("/missions" as any)}>
          <Text style={styles.btnText}>Voir offres</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => router.push("/profil" as any)}>
          <Text style={styles.btnText}>Profil</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => router.push("/parametres" as any)}>
          <Text style={styles.btnText}>Paramètres</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => router.push("/signup")}>
          <Text style={styles.btnText}>Créer un compte</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.btn, styles.logout]}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.btnText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    width: "100%",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#f4f4f5",
    marginBottom: 14,
  },
  cardTitle: {
    fontWeight: "800",
    marginBottom: 8,
    fontSize: 16,
    color: "#111827",
  },
  cardText: {
    color: "#374151",
    marginBottom: 4,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 140,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "700",
  },
  logout: {
    marginTop: 8,
    backgroundColor: "#ef4444",
    minWidth: 200,
  },
});
