import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type JobType = "titulaire" | "pharmacien" | "preparateur" | "etudiant";

type Ad = {
  id: string;
  titre: string;
  ville: string;
  type: JobType;
  duree: string;
  structure: string;
  description: string;
};

const ADS: Ad[] = [
  {
    id: "a1",
    titre: "Remplacement Pharmacien",
    ville: "Lyon",
    type: "pharmacien",
    duree: "2 jours",
    structure: "Pharmacie du Centre",
    description: "Remplacement week-end. Logiciel LGPI. Horaires 9h-19h.",
  },
  {
    id: "a2",
    titre: "Préparateur en CDD",
    ville: "Lille",
    type: "preparateur",
    duree: "1 mois",
    structure: "Pharmacie République",
    description: "CDD temps plein. Expérience comptoir souhaitée.",
  },
  {
    id: "a3",
    titre: "Étudiant 4e année",
    ville: "Toulouse",
    type: "etudiant",
    duree: "Samedis",
    structure: "Pharmacie des Arts",
    description: "Samedis + vacances scolaires. Encadrement assuré.",
  },
  {
    id: "a4",
    titre: "Titulaire recherche remplaçant",
    ville: "Paris",
    type: "titulaire",
    duree: "1 semaine",
    structure: "Pharmacie Saint-Michel",
    description: "Remplacement congés. Équipe stable. Bon débit.",
  },
];

const TYPE_LABEL: Record<JobType, string> = {
  titulaire: "Titulaire / Pharmacie",
  pharmacien: "Pharmacien",
  preparateur: "Préparateur",
  etudiant: "Étudiant",
};

export default function Annonces() {
  const [qVille, setQVIlle] = useState("");
  const [qType, setQType] = useState<JobType | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null); // annonce ouverte (description)

  const results = useMemo(() => {
    const v = qVille.trim().toLowerCase();
    return ADS.filter((ad) => {
      const okVille = !v || ad.ville.toLowerCase().includes(v);
      const okType = qType === "all" || ad.type === qType;
      return okVille && okType;
    });
  }, [qVille, qType]);

  const resetFilters = () => {
    setQVIlle("");
    setQType("all");
    setOpenId(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Annonces</Text>
        <Pressable style={styles.resetBtn} onPress={resetFilters}>
          <Text style={styles.resetText}>Réinitialiser</Text>
        </Pressable>
      </View>

      <View style={styles.filtersCard}>
        <Text style={styles.label}>Ville</Text>
        <TextInput
          value={qVille}
          onChangeText={setQVIlle}
          placeholder="Ex: Lyon"
          placeholderTextColor="#8AA0B6"
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: 10 }]}>Type</Text>
        <View style={styles.pillsRow}>
          <Pill active={qType === "all"} label="Tous" onPress={() => setQType("all")} />
          <Pill active={qType === "titulaire"} label="Titulaire" onPress={() => setQType("titulaire")} />
          <Pill active={qType === "pharmacien"} label="Pharmacien" onPress={() => setQType("pharmacien")} />
          <Pill active={qType === "preparateur"} label="Préparateur" onPress={() => setQType("preparateur")} />
          <Pill active={qType === "etudiant"} label="Étudiant" onPress={() => setQType("etudiant")} />
        </View>
      </View>

      <Text style={styles.count}>{results.length} annonce(s)</Text>

      {results.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Aucune annonce trouvée</Text>
          <Text style={styles.emptyText}>
            Essaie une autre ville ou remets le filtre sur “Tous”.
          </Text>
          <Pressable style={styles.emptyBtn} onPress={resetFilters}>
            <Text style={styles.emptyBtnText}>Effacer les filtres</Text>
          </Pressable>
        </View>
      ) : (
        results.map((ad) => {
          const isOpen = openId === ad.id;

          return (
            <View key={ad.id} style={styles.card}>
              <Pressable
                onPress={() => setOpenId(isOpen ? null : ad.id)}
                style={({ pressed }) => [pressed && { opacity: 0.92 }]}
              >
                <Text style={styles.cardTitle}>{ad.titre}</Text>
                <Text style={styles.cardMeta}>
                  {ad.structure} • {ad.ville} • {ad.duree}
                </Text>

                <View style={styles.badgeRow}>
                  <Text style={styles.badge}>{TYPE_LABEL[ad.type]}</Text>
                  <Text style={styles.moreText}>{isOpen ? "Masquer ▲" : "Voir + ▼"}</Text>
                </View>

                {isOpen ? <Text style={styles.desc}>{ad.description}</Text> : null}
              </Pressable>

              <View style={styles.actionsRow}>
                <Pressable
                  style={styles.actionPrimary}
                  onPress={() => {
                    // plus tard: ouvrir messagerie
                    // pour l’instant: feedback simple
                    setOpenId(ad.id);
                  }}
                >
                  <Text style={styles.actionPrimaryText}>Contacter (bientôt)</Text>
                </Pressable>

                <Pressable
                  style={styles.actionSecondary}
                  onPress={() => setOpenId(isOpen ? null : ad.id)}
                >
                  <Text style={styles.actionSecondaryText}>
                    {isOpen ? "Fermer" : "Détails"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

function Pill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, paddingBottom: 40, backgroundColor: "#F2F7FF" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: "900", color: "#0E2A3F" },
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    backgroundColor: "white",
  },
  resetText: { fontWeight: "900", color: "#2A5B87", fontSize: 12 },

  filtersCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    marginBottom: 12,
  },
  label: { fontSize: 13, fontWeight: "800", color: "#0E2A3F", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#D6E8FF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F7FBFF",
    color: "#0E2A3F",
  },

  pillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    backgroundColor: "white",
  },
  pillActive: { backgroundColor: "#0E7CFF", borderColor: "#0E7CFF" },
  pillText: { fontWeight: "800", color: "#2A5B87", fontSize: 12 },
  pillTextActive: { color: "white" },

  count: { marginBottom: 8, color: "#2A5B87", fontWeight: "800" },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    marginBottom: 10,
  },
  cardTitle: { fontWeight: "900", color: "#0E2A3F", fontSize: 16 },
  cardMeta: { marginTop: 6, color: "#2A5B87" },

  badgeRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F3FF",
    borderColor: "#CFE6FF",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    fontWeight: "900",
    color: "#0E2A3F",
  },
  moreText: { fontWeight: "900", color: "#0E7CFF", fontSize: 12 },

  desc: { marginTop: 10, color: "#2A5B87", lineHeight: 18 },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  actionPrimary: {
    flex: 1,
    backgroundColor: "#12B76A",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  actionPrimaryText: { color: "white", fontWeight: "900" },
  actionSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  actionSecondaryText: { fontWeight: "900", color: "#2A5B87" },

  emptyCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    marginTop: 6,
  },
  emptyTitle: { fontWeight: "900", color: "#0E2A3F", fontSize: 16 },
  emptyText: { marginTop: 6, color: "#2A5B87", lineHeight: 18 },
  emptyBtn: {
    marginTop: 12,
    backgroundColor: "#0E7CFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyBtnText: { color: "white", fontWeight: "900" },
});
