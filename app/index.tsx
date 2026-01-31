import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>Pharmeet</Text>

        <View style={styles.authActions}>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.loginText}>Connexion</Text>
          </Pressable>

          <Pressable style={styles.signupBtn} onPress={() => router.push("/signup")}>
            <Text style={styles.signupText}>Créer un compte</Text>
          </Pressable>
        </View>
      </View>

      {/* HERO */}
      <View style={styles.headerCard}>
        <Text style={styles.kicker}>Plateforme officinale</Text>
        <Text style={styles.title}>Remplacements & emplois</Text>
        <Text style={styles.subtitle}>
          Pharmaciens, préparateurs, étudiants et titulaires se connectent simplement,
          rapidement, efficacement.
        </Text>

        <View style={styles.heroActions}>
          <Pressable style={styles.primaryBtn} onPress={() => router.push("/signup")}>
            <Text style={styles.primaryBtnText}>Commencer</Text>
          </Pressable>

          <Pressable style={styles.secondaryBtn} onPress={() => router.push("/login")}>
            <Text style={styles.secondaryBtnText}>J’ai déjà un compte</Text>
          </Pressable>
        </View>
      </View>

      {/* COMMENT CA MARCHE */}
      <Text style={styles.sectionTitle}>Comment ça marche</Text>
      <View style={styles.whiteCard}>
        <HowStep
          number="1"
          title="Crée ton profil"
          desc="Choisis ton statut (titulaire, pharmacien, préparateur, étudiant) et ajoute tes infos + disponibilités."
        />
        <Divider />
        <HowStep
          number="2"
          title="Publie ou cherche"
          desc="Les pharmacies publient des annonces. Les candidats trouvent des missions selon ville, dates et poste."
        />
        <Divider />
        <HowStep
          number="3"
          title="Discute et confirme"
          desc="Messagerie directe pour discuter des détails (horaires, salaire, conditions) et valider rapidement."
        />

        <View style={styles.inlineActions}>
          <Pressable style={styles.inlineBtnBlue} onPress={() => router.push("/signup")}>
            <Text style={styles.inlineBtnBlueText}>Créer mon profil</Text>
          </Pressable>

          <Pressable style={styles.inlineBtnLight} onPress={() => router.push("/login")}>
            <Text style={styles.inlineBtnLightText}>Me connecter</Text>
          </Pressable>
        </View>
      </View>

      {/* POUR QUI */}
      <Text style={styles.sectionTitle}>Pour qui est Pharmeet ?</Text>
      <View style={styles.grid}>
        <InfoCard
          emoji="🏥"
          title="Titulaire / Pharmacie"
          desc="Trouve rapidement un profil dispo (dates, poste, ville). Publie une annonce en 2 minutes."
        />
        <InfoCard
          emoji="💊"
          title="Pharmacien"
          desc="Missions ponctuelles ou emploi. Mets ton CV, tes dispos, et discute directement."
        />
        <InfoCard
          emoji="🧪"
          title="Préparateur"
          desc="Remplacements adaptés à ton rythme. Indique tes créneaux et tes préférences."
        />
        <InfoCard
          emoji="🎓"
          title="Étudiant"
          desc="Premières expériences en officine. Profil simple, dispo claire, échanges rapides."
        />
      </View>

      {/* POURQUOI */}
      <Text style={styles.sectionTitle}>Pourquoi Pharmeet ?</Text>
      <View style={styles.whiteCard}>
        <ReasonRow emoji="⏱️" title="Gain de temps" desc="Recherche par dates, ville et poste. Moins d’allers-retours inutiles." />
        <DividerLight />
        <ReasonRow emoji="🔒" title="Échanges cadrés" desc="Messagerie directe pour clarifier salaire, horaires, conditions et infos importantes." />
        <DividerLight />
        <ReasonRow emoji="📍" title="Matching local" desc="Focus officine: besoin urgent, remplacements, équipes, contraintes terrain." />
        <DividerLight />
        <ReasonRow emoji="🧾" title="Profils & CV" desc="CV en ligne, profil structuré, disponibilités visibles (et vérification plus tard)." />
      </View>

      {/* TEMOIGNAGES */}
      <Text style={styles.sectionTitle}>Ils en parlent</Text>
      <View style={styles.whiteCard}>
        <Testimonial
          quote="“J’ai trouvé un remplaçant en 24h. Enfin un truc clair et rapide.”"
          who="Titulaire, Lyon"
        />
        <DividerLight />
        <Testimonial
          quote="“Je vois les missions selon mes dispos. Et je discute direct des détails.”"
          who="Pharmacien, Lille"
        />
        <DividerLight />
        <Testimonial
          quote="“Simple pour débuter: profil, CV, dispo. Ça évite de tourner en rond.”"
          who="Étudiant, Toulouse"
        />
      </View>

      {/* FAQ */}
      <Text style={styles.sectionTitle}>FAQ</Text>
      <View style={styles.whiteCard}>
        <FaqItem
          q="C’est gratuit ?"
          a="Au début oui, pour lancer la plateforme. Plus tard, il pourra y avoir des options premium côté pharmacies."
        />
        <DividerLight />
        <FaqItem
          q="Qui peut s’inscrire ?"
          a="Titulaires/pharmacies, pharmaciens, préparateurs et étudiants. Le profil s’adapte automatiquement."
        />
        <DividerLight />
        <FaqItem
          q="Comment se fait la mise en relation ?"
          a="Soit une pharmacie contacte un profil, soit un candidat postule à une annonce. Puis discussion en messagerie."
        />
      </View>

      {/* CTA FINAL */}
      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Prêt à commencer ?</Text>
        <Text style={styles.ctaText}>
          Crée ton compte, complète ton profil et commence à matcher avec des offres ou des remplacements.
        </Text>

        <View style={styles.ctaActions}>
          <Pressable style={styles.ctaBtnGreen} onPress={() => router.push("/signup")}>
            <Text style={styles.ctaBtnGreenText}>Créer un compte</Text>
          </Pressable>

          <Pressable style={styles.ctaBtnWhite} onPress={() => router.push("/login")}>
            <Text style={styles.ctaBtnWhiteText}>Connexion</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

/* ---------- Components ---------- */

function HowStep({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <View style={styles.howStepRow}>
      <View style={styles.howNumber}>
        <Text style={styles.howNumberText}>{number}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.howTitle}>{title}</Text>
        <Text style={styles.howDesc}>{desc}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}
function DividerLight() {
  return <View style={styles.dividerLight} />;
}

function InfoCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </View>
  );
}

function ReasonRow({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <View style={styles.reasonRow}>
      <Text style={styles.reasonEmoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.reasonTitle}>{title}</Text>
        <Text style={styles.reasonDesc}>{desc}</Text>
      </View>
    </View>
  );
}

function Testimonial({ quote, who }: { quote: string; who: string }) {
  return (
    <View style={styles.testimonialRow}>
      <Text style={styles.testimonialQuote}>{quote}</Text>
      <Text style={styles.testimonialWho}>{who}</Text>
    </View>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <View style={styles.faqRow}>
      <Text style={styles.faqQ}>{q}</Text>
      <Text style={styles.faqA}>{a}</Text>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  page: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#F2F7FF",
  },

  /* TOP BAR */
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  logo: { fontSize: 22, fontWeight: "900", color: "#0E2A3F" },
  authActions: { flexDirection: "row", alignItems: "center", gap: 14 },
  loginText: { fontWeight: "800", color: "#0E7CFF" },
  signupBtn: {
    backgroundColor: "#12B76A",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  signupText: { color: "white", fontWeight: "900" },

  /* HERO */
  headerCard: {
    backgroundColor: "#E8F3FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#CFE6FF",
    marginBottom: 16,
  },
  kicker: { color: "#2A5B87", fontWeight: "700" },
  title: { fontSize: 26, fontWeight: "900", color: "#0E2A3F", marginTop: 4 },
  subtitle: { marginTop: 6, color: "#2A5B87", lineHeight: 18 },

  heroActions: { flexDirection: "row", gap: 10, marginTop: 14 },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#12B76A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontWeight: "900" },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  secondaryBtnText: { color: "#2A5B87", fontWeight: "900" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0E2A3F",
    marginBottom: 10,
  },

  /* CARDS */
  whiteCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D6E8FF",
    marginBottom: 16,
  },

  /* HOW */
  howStepRow: { flexDirection: "row", gap: 12, paddingVertical: 8, alignItems: "flex-start" },
  howNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#12B76A",
    alignItems: "center",
    justifyContent: "center",
  },
  howNumberText: { color: "white", fontWeight: "900" },
  howTitle: { fontWeight: "900", color: "#0E2A3F" },
  howDesc: { marginTop: 3, color: "#2A5B87", lineHeight: 18 },
  divider: { height: 1, backgroundColor: "#E6F1FF", marginVertical: 6 },

  inlineActions: { flexDirection: "row", gap: 10, marginTop: 10 },
  inlineBtnBlue: {
    flex: 1,
    backgroundColor: "#0E7CFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  inlineBtnBlueText: { color: "white", fontWeight: "900" },
  inlineBtnLight: {
    flex: 1,
    backgroundColor: "#F7FBFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  inlineBtnLightText: { color: "#2A5B87", fontWeight: "900" },

  /* GRID */
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },

  infoCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  cardEmoji: { fontSize: 22, marginBottom: 6 },
  cardTitle: { fontWeight: "900", color: "#0E2A3F" },
  cardDesc: { marginTop: 4, color: "#2A5B87", lineHeight: 18 },

  /* WHY */
  reasonRow: { flexDirection: "row", gap: 12, paddingVertical: 6, alignItems: "flex-start" },
  reasonEmoji: { fontSize: 18, marginTop: 1 },
  reasonTitle: { fontWeight: "900", color: "#0E2A3F" },
  reasonDesc: { marginTop: 3, color: "#2A5B87", lineHeight: 18 },
  dividerLight: { height: 1, backgroundColor: "#EEF6FF", marginVertical: 8 },

  /* TESTIMONIALS */
  testimonialRow: { paddingVertical: 4 },
  testimonialQuote: { color: "#0E2A3F", fontWeight: "800", lineHeight: 18 },
  testimonialWho: { marginTop: 6, color: "#2A5B87", fontWeight: "700" },

  /* FAQ */
  faqRow: { paddingVertical: 4 },
  faqQ: { fontWeight: "900", color: "#0E2A3F" },
  faqA: { marginTop: 6, color: "#2A5B87", lineHeight: 18 },

  /* CTA */
  ctaCard: {
    backgroundColor: "#E8F3FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#CFE6FF",
  },
  ctaTitle: { fontSize: 18, fontWeight: "900", color: "#0E2A3F" },
  ctaText: { marginTop: 6, color: "#2A5B87", lineHeight: 18 },

  ctaActions: { flexDirection: "row", gap: 10, marginTop: 14 },
  ctaBtnGreen: {
    flex: 1,
    backgroundColor: "#12B76A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaBtnGreenText: { color: "white", fontWeight: "900" },
  ctaBtnWhite: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6E8FF",
  },
  ctaBtnWhiteText: { color: "#2A5B87", fontWeight: "900" },
});
