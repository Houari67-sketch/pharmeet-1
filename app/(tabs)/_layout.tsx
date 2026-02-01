import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      {/* ONGLET 1 */}
      <Tabs.Screen
        name="annonces"
        options={{
          title: "Annonces",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />

      {/* ONGLET 2 */}
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      {/* ONGLET 3 */}
      <Tabs.Screen
        name="autour"
        options={{
          title: "Autour de moi",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" color={color} size={size} />
          ),
        }}
      />

      {/* PAGE CACHÉE (PAS UN ONGLET) */}
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messagerie",
          href: null,
        }}
      />
    </Tabs>
  );
}
