import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type AccountType = "titulaire" | "etudiant" | "pharmacien" | "preparateur";

const ACCOUNT_TYPES: { key: AccountType; label: string; emoji: string }[] = [
  { key: "titulaire", label: "Titulaire / Pharmacie", emoji: "🏥" },
  { key: "pharmacien", label: "Pharmacien", emoji: "💊" },
  { key: "preparateur", label: "Préparateur", emoji: "🧪" },
  { key: "etudiant", label: "Étudiant", emoji: "🎓" },
];

export default function Signup() {
  const [type, setType] = useState<AccountType>("titulaire");

  // commun
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");

  // titulaire
  const [pharmacie, setPharmacie] = useState("");
  const [siret, setSiret] = useState("");

  // étudiant
  const [anneeEtude, setAnneeEtude] = useState("");

  // pro
  const [experience, setExperience] = useState(""); // années
  const [diplome, setDiplome] = useState(""); // optionnel, utile

  const visibleFields = useMemo(() => {
    switch (type) {
      case "titulaire":
        return ["prenom", "nom", "pharmacie", "siret", "ville"];
      case "etudiant":
        return ["prenom", "nom", "anneeEtude", "ville"];
      case "pharmacien":
      case "preparateur":
        return ["prenom", "nom", "diplome", "experience", "ville"];
      default:
        return ["prenom", "nom", "ville"];
    }
  }, [type]);

  const normalizeSiret = (value: string) => value.replace(/\s/g, "");

  const validate = () => {
    if (!prenom.trim() || !nom.trim()) return "Nom et prénom sont obligatoires.";
    if (!ville.trim()) return "Ville obligatoire.";

    if (type === "titulaire") {
      if (!pharmacie.trim()) return "Nom de la pharmacie obligatoire.";
      const s = normalizeSiret(siret);
      if (!s) return "SIRET obligatoire.";
      if (!/^\d{14}$/.test(s))
        return "Le SIRET doit contenir exactement 14 chiffres.";
    }

    if (type === "etudiant") {
      if (!anneeEtude.trim()) return "Année d'étude obligatoire.";
    }

    if (type === "pharmacien" || type === "preparateur") {
      if (!experience.trim()) return "Expérience obligatoire (en années).";
      if (!/^\d{1,2}$/.test(experience.trim()))
        return "Expérience: mets un nombre (ex: 0, 1, 5, 12).";
      // diplôme optionnel, donc pas obligatoire
    }

    return null;
  };

  const submit = () => {
    const err = validate();
    if (err) {
      Alert.alert("Petit souci", err);
      return;
    }

    // Simulation (plus tard: API / DB)
    Alert.alert(
      "Compte créé (simulation)",
      `Type: ${type}\n${prenom.trim()} ${nom.trim()} - ${ville.trim()}`
    );

    Alert.alert(
  "Compte créé (simulation)",
  `Type: ${type}\n${prenom.trim()} ${nom.trim()} - ${ville.trim()}`,
  [{ text: "Continuer", onPress: () => router.replace("/login") }]
);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.headerCard}>
        <Text style={styles.kicker}>Bienvenue sur</Text>
        <Text style={styles.title}>Pharmeet</Text>
        <Text style={styles.subtitle}>
          Crée ton compte et commence à matcher avec des remplacements et offres.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Choisis ton profil</Text>

      <View style={styles.typeGrid}>
        {ACCOUNT_TYPES.map((t) => {
          const active = t.key === type;
          return (
            <Pressable
              key={t.key}
              onPress={() => setType(t.key)}
              style={[styles.typeCard, active && styles.typeCardActive]}
            >
              <Text style={styles.typeEmoji}>{t.emoji}</Text>
              <Text style={[styles.typeLabel, active && styles.typeLabelActive]}>
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Tes informations</Text>

        {visibleFields.includes("prenom") && (
          <Input label="Prénom" value={prenom} onChange={setPrenom} placeholder="Ex: Karim" />
        )}

        {visibleFields.includes("nom") && (
          <Input label="Nom" value={nom} onChange={setNom} placeholder="Ex: Dupont" />
        )}

        {visibleFields.includes("pharmacie") && (
          <Input
            label="Nom de la pharmacie"
            value={pharmacie}
            onChange={setPharmacie}
            placeholder="Ex: Pharmacie du Centre"
          />
        )}

        {visibleFields.includes("siret") && (
          <Input
            label="SIRET (14 chiffres)"
            value={siret}
            onChange={(v) => setSiret(normalizeSiret(v))}
            placeholder="12345678901234"
            keyboardType="numeric"
          />
        )}

        {visibleFields.includes("anneeEtude") && (
          <Input
            label="Année d'étude"
            value={anneeEtude}
            onChange={setAnneeEtude}
            placeholder="Ex: 4e année"
          />
        )}

        {visibleFields.includes("diplome") && (
          <Input
            label="Diplôme (optionnel)"
            value={diplome}
            onChange={setDiplome}
            placeholder="Ex: DE Pharmacie, BP Préparateur..."
          />
        )}

        {visibleFields.includes("experience") && (
          <Input
            label="Expérience (années)"
            value={experience}
            onChange={setExperience}
            placeholder="Ex: 0, 2, 5"
            keyboardType="numeric"
          />
        )}

        {visibleFields.includes("ville") && (
          <Input label="Ville" value={ville} onChange={setVille} placeholder="Ex: Lyon" />
        )}

        <Pressable style={styles.primaryBtn} onPress={submit}>
          <Text style={styles.primaryBtnText}>Créer le compte</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
          <Text style={styles.secondaryBtnText}>Retour</Text>
        </Pressable>

        <Text style={styles.note}>
          Pour l’instant: simulation. Ensuite on branchera une base (Firebase/Supabase)
          + upload CV + photo.
        </Text>
      </View>
    </ScrollView>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor="#8AA0B6"
        autoCapitalize="words"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#F2F7FF",
  },

  headerCard: {
    backgroundColor: "#E8F3FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#CFE6FF",
    marginBottom: 14,
  },
  kicker: { color: "#2A5B87", fontWeight: "700" },
  title: { fontSize: 30, fontWeight: "900", color: "#0E2A3F", marginTop: 2 },
  subtitle: { marginTop: 6, color: "#2A5B87", lineHeight: 18 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0E2A3F",
    marginBottom: 10,
  },

  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  typeCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  typeCardActive: {
    backgroundColor: "#0E7CFF",
    borderColor: "#0E7CFF",
  },
  typeEmoji: { fontSize: 20, marginBottom: 6 },
  typeLabel: { fontWeight: "800", color: "#0E2A3F" },
  typeLabelActive: { color: "white" },

  formCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  formTitle: { fontSize: 16, fontWeight: "900", color: "#0E2A3F", marginBottom: 10 },

  label: { marginBottom: 6, fontSize: 13, fontWeight: "700", color: "#0E2A3F" },
  input: {
    borderWidth: 1,
    borderColor: "#D6E8FF",
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#F7FBFF",
    color: "#0E2A3F",
  },

  primaryBtn: {
    marginTop: 8,
    backgroundColor: "#12B76A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontSize: 16, fontWeight: "900" },

  secondaryBtn: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    alignItems: "center",
    backgroundColor: "white",
  },
  secondaryBtnText: { fontSize: 16, fontWeight: "800", color: "#2A5B87" },

  note: { marginTop: 12, color: "#5B7286", fontSize: 12, lineHeight: 16 },
});
