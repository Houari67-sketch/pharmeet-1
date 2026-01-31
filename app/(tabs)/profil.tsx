import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type AccountType = "Pharmacien" | "Préparateur" | "Étudiant" | "Employeur";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  accountType: AccountType;
  availabilityDays: string[]; // ["Lun", ...]
  availabilityNotes: string;  // "soir + week-end", etc
};

const STORAGE_KEY = "pharmeet_profile_v1";
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] as const;
const ACCOUNT_TYPES: AccountType[] = ["Pharmacien", "Préparateur", "Étudiant", "Employeur"];

const emptyProfile: Profile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  accountType: "Pharmacien",
  availabilityDays: [],
  availabilityNotes: "",
};

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export default function ProfilScreen() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);

  const completion = useMemo(() => {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.phone,
      profile.city,
      profile.accountType,
      profile.availabilityDays.length ? "ok" : "",
    ];
    const filled = fields.filter((x) => String(x).trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  }, [profile]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setProfile(JSON.parse(raw));
      } catch {
        // si ça casse, tant pis, on ne va pas pleurer
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save() {
    // validation minimaliste (humains: champions du champ vide)
    if (!profile.email.includes("@")) {
      Alert.alert("Profil", "Email invalide (ou juste pas un email).");
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      Alert.alert("Profil", "Enregistré ✅");
    } catch {
      Alert.alert("Profil", "Échec de sauvegarde. Ton téléphone a décidé de ne pas coopérer.");
    }
  }

  function toggleDay(day: string) {
    setProfile((p) => {
      const exists = p.availabilityDays.includes(day);
      return {
        ...p,
        availabilityDays: exists
          ? p.availabilityDays.filter((d) => d !== day)
          : [...p.availabilityDays, day],
      };
    });
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Compléter le profil</Text>
      <Text style={styles.subtitle}>Progression: {completion}%</Text>

      <Text style={styles.sectionTitle}>Infos perso</Text>

      <View style={styles.row}>
        <TextInput
          value={profile.firstName}
          onChangeText={(v) => setProfile((p) => ({ ...p, firstName: v }))}
          placeholder="Prénom"
          style={[styles.input, { flex: 1 }]}
        />
        <TextInput
          value={profile.lastName}
          onChangeText={(v) => setProfile((p) => ({ ...p, lastName: v }))}
          placeholder="Nom"
          style={[styles.input, { flex: 1 }]}
        />
      </View>

      <TextInput
        value={profile.email}
        onChangeText={(v) => setProfile((p) => ({ ...p, email: v }))}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        value={profile.phone}
        onChangeText={(v) => setProfile((p) => ({ ...p, phone: v }))}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        value={profile.city}
        onChangeText={(v) => setProfile((p) => ({ ...p, city: v }))}
        placeholder="Ville"
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Type de compte</Text>
      <View style={styles.chipsRow}>
        {ACCOUNT_TYPES.map((t) => (
          <Chip
            key={t}
            label={t}
            selected={profile.accountType === t}
            onPress={() => setProfile((p) => ({ ...p, accountType: t }))}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Disponibilités</Text>
      <Text style={styles.helper}>Choisis les jours puis précise si besoin.</Text>

      <View style={styles.chipsRow}>
        {DAYS.map((d) => (
          <Chip key={d} label={d} selected={profile.availabilityDays.includes(d)} onPress={() => toggleDay(d)} />
        ))}
      </View>

      <TextInput
        value={profile.availabilityNotes}
        onChangeText={(v) => setProfile((p) => ({ ...p, availabilityNotes: v }))}
        placeholder="Ex: soir, week-end, 9h-17h, etc."
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        multiline
      />

      <Pressable onPress={save} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Enregistrer</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: "900" },
  subtitle: { color: "#444", marginBottom: 6 },
  sectionTitle: { fontSize: 15, fontWeight: "800", marginTop: 10 },
  helper: { color: "#444", fontSize: 13 },

  row: { flexDirection: "row", gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    fontSize: 14,
  },

  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  chipSelected: { borderColor: "#111", backgroundColor: "#111" },
  chipText: { fontSize: 13, color: "#111", fontWeight: "700" },
  chipTextSelected: { color: "#fff" },

  saveBtn: {
    marginTop: 8,
    backgroundColor: "#111",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "900" },
});
