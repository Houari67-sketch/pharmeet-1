import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type ContractType = "CDD" | "CDI";
type Ad = {
  id: string;
  title: string;
  pharmacy: string;
  city: string;
  contract: ContractType;
  urgent?: boolean;
};

const MOCK_ADS: Ad[] = [
  { id: "1", title: "Préparateur(trice) - temps plein", pharmacy: "Pharmacie du Centre", city: "Lyon", contract: "CDI", urgent: true },
  { id: "2", title: "Pharmacien(ne) adjoint(e)", pharmacy: "Grande Pharmacie", city: "Paris", contract: "CDD" },
  { id: "3", title: "Préparateur(trice) - remplacement", pharmacy: "Pharmacie Saint-Michel", city: "Marseille", contract: "CDD", urgent: true },
  { id: "4", title: "Pharmacien(ne) - week-ends", pharmacy: "Pharmacie de la Gare", city: "Lille", contract: "CDI" },
];

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function Badge({ text, variant }: { text: string; variant: "urgent" | "contract" }) {
  return (
    <View style={[styles.badge, variant === "urgent" ? styles.badgeUrgent : styles.badgeContract]}>
      <Text style={[styles.badgeText, variant === "urgent" ? styles.badgeTextUrgent : styles.badgeTextContract]}>
        {text}
      </Text>
    </View>
  );
}

function AdCard({ ad }: { ad: Ad }) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false); // ✅ preuve visible

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>{ad.title}</Text>
        <View style={styles.badgesRow}>
          {ad.urgent ? <Badge text="URGENT" variant="urgent" /> : null}
          <Badge text={ad.contract} variant="contract" />
        </View>
      </View>

      <Text style={styles.cardMeta}>
        {ad.pharmacy} • {ad.city}
      </Text>

      {/* ✅ bouton avec preuve */}
      <Pressable
        style={styles.contactBtn}
        onPress={() => {
          setClicked(true); // ✅ si ça change, le clic marche
          router.push("/(tabs)/messages"); // ✅ navigation vers messagerie
        }}
      >
        <Text style={styles.contactBtnText}>{clicked ? "CLIC OK ✅" : "Contacter"}</Text>
      </Pressable>
    </View>
  );
}

export default function AnnoncesScreen() {
  const [query, setQuery] = useState("");
  const [filterCDD, setFilterCDD] = useState(false);
  const [filterCDI, setFilterCDI] = useState(false);
  const [urgentOnly, setUrgentOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_ADS.filter((ad) => {
      const matchesQuery =
        !q ||
        ad.title.toLowerCase().includes(q) ||
        ad.pharmacy.toLowerCase().includes(q) ||
        ad.city.toLowerCase().includes(q);

      const contractAllowed =
        (!filterCDD && !filterCDI) ||
        (filterCDD && ad.contract === "CDD") ||
        (filterCDI && ad.contract === "CDI");

      const urgentAllowed = !urgentOnly || !!ad.urgent;

      return matchesQuery && contractAllowed && urgentAllowed;
    });
  }, [query, filterCDD, filterCDI, urgentOnly]);

  return (
    <View style={styles.page}>
      <Text style={styles.sectionTitle}>Filtres</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Rechercher (poste, ville, pharmacie)…"
        style={styles.search}
      />

      <View style={styles.filtersRow}>
        <Chip label="CDD" selected={filterCDD} onPress={() => setFilterCDD((v) => !v)} />
        <Chip label="CDI" selected={filterCDI} onPress={() => setFilterCDI((v) => !v)} />
        <Chip label="Urgent" selected={urgentOnly} onPress={() => setUrgentOnly((v) => !v)} />
      </View>

      <Text style={styles.sectionTitle}>Annonces ({filtered.length})</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AdCard ad={item} />}
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
  sectionTitle: { fontSize: 16, fontWeight: "900", color: "#0E2A3F" },

  search: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  filtersRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  chip: {
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipSelected: { backgroundColor: GREEN, borderColor: GREEN },
  chipText: { fontWeight: "900", color: BLUE },
  chipTextSelected: { color: "white" },

  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: "900", color: "#0E2A3F" },
  badgesRow: { flexDirection: "row", gap: 6 },

  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeUrgent: { backgroundColor: "#111" },
  badgeContract: { backgroundColor: "#E7CFFF" },
  badgeText: { fontSize: 11, fontWeight: "900" },
  badgeTextUrgent: { color: "white" },
  badgeTextContract: { color: BLUE },

  cardMeta: { marginTop: 8, color: BLUE, fontWeight: "700" },

  contactBtn: {
    marginTop: 12,
    backgroundColor: GREEN,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  contactBtnText: { color: "white", fontWeight: "900" },
});
