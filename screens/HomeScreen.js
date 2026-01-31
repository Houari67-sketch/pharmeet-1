import { router } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const COLORS = {
  bg: "#F5F7FB",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  primary: "#1E4FBF", // bleu bouton
  primaryDark: "#163E99",
  accent: "#16B7B3", // turquoise (logo / accent)
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logoMark} />
            <Text style={styles.brandText}>PHARMEET</Text>
          </View>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.push("/login")}
            activeOpacity={0.85}
          >
            <Text style={styles.headerBtnText}>Connexion</Text>
          </TouchableOpacity>
        </View>

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <Text style={styles.h1}>La plateforme qui connecte les pharmaciens entre eux.</Text>
          <Text style={styles.subtitle}>
            Remplacements, collaborations et entraide professionnelle, au même endroit.
          </Text>

          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/signup")}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryBtnText}>Créer un compte</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push("/signup")}
              activeOpacity={0.9}
            >
              <Text style={styles.secondaryBtnText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FEATURES */}
        <Text style={styles.sectionTitle}>À quoi ça sert concrètement ?</Text>

        <View style={styles.stack}>
          <FeatureCard
            icon="🔄"
            title="Trouver un remplacement"
            desc="Publiez ou trouvez une mission rapidement."
          />
          <FeatureCard
            icon="🤝"
            title="Créer des collaborations"
            desc="Associez-vous, échangez, développez votre réseau."
          />
          <FeatureCard
            icon="💬"
            title="Communauté pharmaceutique"
            desc="Discutez avec des confrères partout en France."
          />
        </View>

        {/* FOR WHO */}
        <Text style={styles.sectionTitle}>Pour qui ?</Text>
        <View style={styles.card}>
          <Bullet text="Étudiants en pharmacie" />
          <Bullet text="Pharmaciens adjoints" />
          <Bullet text="Pharmaciens titulaires" />
        </View>

        {/* TRUST */}
        <Text style={styles.sectionTitle}>Confiance</Text>
        <View style={styles.card}>
          <Badge text="Inscription sécurisée" />
          <Badge text="Profils vérifiés" />
          <Badge text="Données protégées" />
        </View>

        {/* FINAL CTA */}
        <View style={styles.finalCard}>
          <Text style={styles.finalTitle}>Rejoignez la communauté Pharmeet dès maintenant</Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push("/signup")}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryBtnText}>S’inscrire gratuitement</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>Mentions légales • Confidentialité • Contact</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/** --- Components --- */

function FeatureCard({ icon, title, desc }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureTop}>
        <Text style={styles.featureIcon}>{icon}</Text>
        <View style={styles.accentDot} />
      </View>

      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  );
}

function Bullet({ text }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function Badge({ text }) {
  return (
    <View style={styles.badge}>
      <View style={styles.badgeDot} />
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

/** --- Styles --- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 16, paddingBottom: 28 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoMark: {
    width: 14,
    height: 14,
    borderRadius: 6,
    backgroundColor: COLORS.accent,
  },
  brandText: { fontSize: 16, fontWeight: "900", color: COLORS.text, letterSpacing: 0.4 },

  headerBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "rgba(22,183,179,0.12)",
  },
  headerBtnText: { fontWeight: "900", color: COLORS.accent },

  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginBottom: 14,
  },
  h1: { fontSize: 22, fontWeight: "900", color: COLORS.text, lineHeight: 28 },
  subtitle: { marginTop: 8, color: COLORS.muted, lineHeight: 20 },

  heroActions: { marginTop: 14, gap: 10 },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  secondaryBtn: {
    backgroundColor: "#EAF0FF",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  secondaryBtnText: { color: COLORS.primaryDark, fontSize: 16, fontWeight: "900" },

  sectionTitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
  },

  stack: { gap: 12 },

  featureCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  featureTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  featureIcon: { fontSize: 20 },
  accentDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accent },
  featureTitle: { fontSize: 15, fontWeight: "900", color: COLORS.text },
  featureDesc: { marginTop: 6, color: COLORS.muted, lineHeight: 19 },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  bulletRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  bulletText: { color: COLORS.text, fontWeight: "800" },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F1FFFE",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(22,183,179,0.25)",
    marginBottom: 10,
  },
  badgeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, marginRight: 10 },
  badgeText: { color: COLORS.text, fontWeight: "900" },

  finalCard: {
    marginTop: 14,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  finalTitle: { fontWeight: "900", color: COLORS.text, marginBottom: 10 },

  footer: { marginTop: 16, textAlign: "center", color: COLORS.muted, fontSize: 12 },
});
