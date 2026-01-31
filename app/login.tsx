import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Role = "titulaire" | "preparateur" | "etudiant" | "pharmacien";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("titulaire");

  const handleLogin = () => {
    // Pour l’instant on ne fait pas de vraie auth (API plus tard)
    // On vérifie juste que l’utilisateur a tapé quelque chose
    if (!email.trim() || !password.trim()) {
      // Ici tu pourrais mettre une alerte, mais on reste simple
      return;
    }

    // Redirection selon le rôle
    if (role === "titulaire") router.replace("/titulaire" as any);
    else if (role === "preparateur") router.replace("/preparateur" as any);
    else if (role === "etudiant") router.replace("/etudiant" as any);
    else router.replace("/pharmacien" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>Choisis ton rôle puis connecte-toi</Text>

      <View style={styles.roleBox}>
        <Text style={styles.sectionTitle}>Rôle</Text>

        <View style={styles.roleRow}>
          <Pressable
            style={[
              styles.roleBtn,
              role === "titulaire" && styles.roleBtnActive,
            ]}
            onPress={() => setRole("titulaire")}
          >
            <Text
              style={[
                styles.roleText,
                role === "titulaire" && styles.roleTextActive,
              ]}
            >
              Titulaire
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.roleBtn,
              role === "preparateur" && styles.roleBtnActive,
            ]}
            onPress={() => setRole("preparateur")}
          >
            <Text
              style={[
                styles.roleText,
                role === "preparateur" && styles.roleTextActive,
              ]}
            >
              Préparateur
            </Text>
          </Pressable>
        </View>

        <View style={styles.roleRow}>
          <Pressable
            style={[
              styles.roleBtn,
              role === "etudiant" && styles.roleBtnActive,
            ]}
            onPress={() => setRole("etudiant")}
          >
            <Text
              style={[
                styles.roleText,
                role === "etudiant" && styles.roleTextActive,
              ]}
            >
              Étudiant
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.roleBtn,
              role === "pharmacien" && styles.roleBtnActive,
            ]}
            onPress={() => setRole("pharmacien")}
          >
            <Text
              style={[
                styles.roleText,
                role === "pharmacien" && styles.roleTextActive,
              ]}
            >
              Pharmacien
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: nom@domaine.fr"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.sectionTitle}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Pressable style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Se connecter</Text>
      </Pressable>

      <Pressable
        style={styles.linkBtn}
        onPress={() => router.push("/signup" as any)}
      >
        <Text style={styles.linkText}>Créer un compte</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 18,
  },
  roleBox: {
    backgroundColor: "#f4f4f5",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  roleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  roleBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  roleBtnActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  roleText: {
    fontWeight: "800",
    color: "#111827",
  },
  roleTextActive: {
    color: "#fff",
  },
  form: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  loginBtn: {
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
  linkBtn: {
    alignItems: "center",
    marginTop: 12,
  },
  linkText: {
    color: "#111827",
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});
