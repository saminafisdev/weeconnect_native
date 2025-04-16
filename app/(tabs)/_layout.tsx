import { Tabs, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Icon } from "@/components/ui/icon";
import {
  Bell,
  House,
  MessageSquare,
  Search,
  User,
  Users,
} from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "tomato" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
          headerTitleAlign: "center",
          headerTitleStyle: { color: "tomato" },
          headerRight: () => (
            <TouchableOpacity onPressIn={() => router.push("/auth")}>
              <Icon size="24" as={User} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: "Connections",
          tabBarIcon: ({ color }) => <Users size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Search size={28} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => <Bell size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => <MessageSquare size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
