import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Accueil" }} />
      <Stack.Screen name="login" options={{ title: "Connexion" }} />
      <Stack.Screen name="signup" options={{ title: "Inscription" }} />
    </Stack>
  );
}
