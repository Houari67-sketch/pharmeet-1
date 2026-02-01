import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [debugMsg, setDebugMsg] = useState("");

  const onLogin = () => {
    setDebugMsg("✅ Clique détecté. Redirection…");

    // ✅ FORCER la redirection (même si champs vides) pour tester la navigation
    router.replace("/(tabs)/annonces");
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.headerCard}>
        <Text style={styles.kicker}>Content de te revoir sur</Text>
        <Text style={styles.title}>Pharmeet</Text>
        <Text style={styles.subtitle}>
          Connecte-toi pour trouver un remplacement ou recruter rapidement.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Connexion</Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ex: nom@email.com"
            placeholderTextColor="#8AA0B6"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Ton mot de passe"
            placeholderTextColor="#8AA0B6"
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}
          onPress={onLogin}
        >
          <Text style={styles.primaryBtnText}>Se connecter</Text>
        </Pressable>

        {debugMsg ? <Text style={styles.debug}>{debugMsg}</Text> : null}

        <Pressable style={styles.linkBtn} onPress={() => router.push("/signup")}>
          <Text style={styles.linkText}>
            Pas de compte ? <Text style={styles.linkTextBold}>Créer un compte</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#F2F7FF",
    flexGrow: 1,
    justifyContent: "center",
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

  formCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0E2A3F",
    marginBottom: 10,
  },

  label: {
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#0E2A3F",
  },
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

  debug: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "800",
    color: "#0E2A3F",
  },

  linkBtn: { marginTop: 14, alignItems: "center" },
  linkText: { color: "#2A5B87", fontWeight: "700" },
  linkTextBold: { color: "#0E7CFF", fontWeight: "900" },
});
