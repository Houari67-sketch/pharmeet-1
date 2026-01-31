import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: "Accueil" }} />
      <Tabs.Screen name="annonces" options={{ title: "Annonces" }} />
      <Tabs.Screen name="actu" options={{ title: "Actu" }} />
      <Tabs.Screen name="autour" options={{ title: "Autour de moi" }} />
      <Tabs.Screen name="profil" options={{ title: "Mon profil" }} />
    </Tabs>
  );
}
