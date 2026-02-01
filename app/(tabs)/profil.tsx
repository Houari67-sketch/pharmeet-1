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
  availabilityDays: string[];
  availabilityNotes: string;
};

const STORAGE_KEY = "pharmeet_profile_v1";
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
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

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export default function ProfilScreen() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setProfile(JSON.parse(raw));
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  function toggleDay(day: string) {
    setProfile((p) => {
      const exists = p.availabilityDays.includes(day);
      return {
        ...p,
        availabilityDays: exists ? p.availabilityDays.filter((d) => d !== day) : [...p.availabilityDays, day],
      };
    });
  }

  async function save() {
    if (!profile.email.includes("@")) {
      Alert.alert("Profil", "Email invalide.");
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      Alert.alert("Profil", "Enregistré ✅");
    } catch {
      Alert.alert("Profil", "Impossible d’enregistrer.");
    }
  }

  if (loading) {
    return (
      <View style={[styles.page, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Chargement…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
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
          <Chip key={t} label={t} selected={profile.accountType === t} onPress={() => setProfile((p) => ({ ...p, accountType: t }))} />
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
        placeholder="Ex: soir, week-end, 9h-17h…"
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        multiline
      />

      <Pressable onPress={save} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Enregistrer</Text>
      </Pressable>
    </ScrollView>
  );
}

const GREEN = "#12B76A";
const BORDER = "#D6E8FF";
const BLUE = "#2A5B87";

const styles = StyleSheet.create({
  page: { padding: 16, gap: 10, backgroundColor: "#F7FAFF" },
  title: { fontSize: 18, fontWeight: "900", color: "#0E2A3F" },
  subtitle: { color: BLUE, fontWeight: "700" },
  sectionTitle: { fontSize: 15, fontWeight: "900", marginTop: 10, color: "#0E2A3F" },
  helper: { color: BLUE, fontWeight: "700" },

  row: { flexDirection: "row", gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
  },

  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },

  chip: {
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "white",
  },
  chipSelected: { backgroundColor: GREEN, borderColor: GREEN },
  chipText: { fontWeight: "900", color: BLUE },
  chipTextSelected: { color: "white" },

  saveBtn: {
    marginTop: 8,
    backgroundColor: GREEN,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtnText: { color: "white", fontWeight: "900" },
});
