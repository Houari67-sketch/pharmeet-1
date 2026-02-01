import React from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type NearbyItem = {
  id: string;
  name: string;
  distanceKm: number;
  note?: string;
};

const MOCK_NEARBY: NearbyItem[] = [
  { id: "n1", name: "Pharmacie du Centre", distanceKm: 0.6, note: "Ouverte jusqu’à 20h" },
  { id: "n2", name: "Grande Pharmacie", distanceKm: 1.4, note: "Recrute en CDD" },
  { id: "n3", name: "Pharmacie Saint-Michel", distanceKm: 2.1 },
];

export default function AutourScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Autour de moi</Text>
      <Text style={styles.subtitle}>
        GPS plus tard. Pour l’instant, on affiche une liste “à proximité” en mode simulation.
      </Text>

      <Pressable
        onPress={() => Alert.alert("GPS", "Pas encore. On fera ça avec expo-location plus tard.")}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Activer GPS (bientôt)</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Suggestions</Text>

      <FlatList
        data={MOCK_NEARBY}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardMeta}>{item.distanceKm.toFixed(1)} km</Text>
            {item.note ? <Text style={styles.cardNote}>{item.note}</Text> : null}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const GREEN = "#12B76A";
const BORDER = "#D6E8FF";
const BLUE = "#2A5B87";

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16, gap: 10, backgroundColor: "#F7FAFF" },
  title: { fontSize: 18, fontWeight: "900", color: "#0E2A3F" },
  subtitle: { color: BLUE, fontWeight: "700" },
  sectionTitle: { marginTop: 10, fontSize: 15, fontWeight: "900", color: "#0E2A3F" },

  btn: {
    backgroundColor: GREEN,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "900" },

  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "white",
    marginTop: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: "900", color: "#0E2A3F" },
  cardMeta: { marginTop: 6, color: BLUE, fontWeight: "700" },
  cardNote: { marginTop: 6, color: "#0E2A3F", fontWeight: "700" },
});
