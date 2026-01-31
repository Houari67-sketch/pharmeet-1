import { router } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const comingSoon = (feature: string) => {
    Alert.alert("Bientôt disponible", `${feature} arrive bientôt.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Pharmeet</Text>
        <Text style={styles.subtitle}>
          Missions, remplacements, opportunités. Sans perdre ton temps.
        </Text>
      </View>

      {/* Main actions */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Accès rapide</Text>

        <TouchableOpacity
          style={[styles.bigButton, styles.offer]}
          onPress={() => comingSoon("Publier une offre")}
        >
          <Text style={styles.bigButtonTitle}>Publier une offre</Text>
          <Text style={styles.bigButtonDesc}>
            Propose une mission et trouve rapidement un profil.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bigButton, styles.mission]}
          onPress={() => comingSoon("Rechercher une mission")}
        >
          <Text style={styles.bigButtonTitle}>Rechercher une mission</Text>
          <Text style={styles.bigButtonDesc}>
            Trouve une mission selon ta ville, tes dates et ton rôle.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bigButton, styles.login]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.bigButtonTitle}>Connexion</Text>
          <Text style={styles.bigButtonDesc}>
            Choisis ton profil: titulaire, pharmacien, étudiant, préparateur.
          </Text>
        </TouchableOpacity>
      </View>

      {/* How it works */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Comment ça marche</Text>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>
            Choisis ton profil (titulaire, pharmacien, étudiant, préparateur).
          </Text>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>
            Publie une offre ou recherche une mission en quelques clics.
          </Text>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>
            Discute, confirme, et réalise la mission simplement.
          </Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>À propos de nous</Text>
        <Text style={styles.paragraph}>
          Pharmeet connecte les professionnels de la pharmacie et facilite les
          remplacements et missions partout, sans complications inutiles.
        </Text>
        <Text style={styles.paragraph}>
          Objectif : une plateforme claire, rapide, et adaptée aux besoins réels
          du terrain.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Pharmeet
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: "#f4f6f8",
  },

  header: {
    paddingVertical: 16,
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  brand: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  bigButton: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  bigButtonTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
    marginBottom: 6,
  },
  bigButtonDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 18,
  },

  offer: { backgroundColor: "#ef4444" }, // rouge
  mission: { backgroundColor: "#2563eb" }, // bleu
  login: { backgroundColor: "#111827" }, // noir / gris foncé

  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#111827",
    color: "white",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "800",
    marginRight: 10,
  },
  stepText: {
    flex: 1,
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },

  paragraph: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },

  footer: {
    marginTop: 18,
    alignItems: "center",
  },
  footerText: {
    color: "#6b7280",
    fontSize: 12,
  },
});
