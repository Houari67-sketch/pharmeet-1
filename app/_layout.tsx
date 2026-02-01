import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      {/* Page d'accueil (ton landing) */}
      <Stack.Screen name="index" options={{ title: "Accueil" }} />

      {/* Auth */}
      <Stack.Screen name="login" options={{ title: "Connexion" }} />
      <Stack.Screen name="signup" options={{ title: "Inscription" }} />

      {/* Le groupe des onglets */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
