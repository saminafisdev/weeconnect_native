import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const mockCommunities = [
  {
    id: "1",
    name: "Tech Enthusiasts",
    description: "A group for tech lovers to share and learn.",
  },
  {
    id: "2",
    name: "Fitness Freaks",
    description: "Join us for workouts and fitness tips.",
  },
  {
    id: "3",
    name: "Book Club",
    description: "Discuss and explore amazing books.",
  },
  {
    id: "4",
    name: "Travel Buddies",
    description: "Find your next travel partner here.",
  },
];

export default function ConnectionsScreen() {
  const [communities, setCommunities] = useState(mockCommunities);
  const [userGroups, setUserGroups] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          console.error("User is not authenticated.");
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);

        const { data, error } = await supabase
          .from("groups")
          .select("*")
          .eq("user_id", session.user.id);

        if (error) {
          throw error;
        }

        setUserGroups(data);
      } catch (error) {
        console.error("Error fetching user groups:", error.message);
      }
    };

    fetchUserGroups();
  }, []);

  const renderGroup = ({ item }) => (
    <TouchableOpacity className="bg-white p-6 rounded-2xl mb-6 shadow-xl border border-gray-300">
      <Text className="text-2xl font-bold text-gray-900 mb-3">{item.name}</Text>
      <Text className="text-base text-gray-700 leading-6">
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderCommunity = ({ item }) => (
    <TouchableOpacity className="bg-white p-6 rounded-2xl mb-6 shadow-xl border border-gray-300">
      <Text className="text-2xl font-bold text-gray-900 mb-3">{item.name}</Text>
      <Text className="text-base text-gray-700 leading-6">
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 px-6 py-8">
      {isAuthenticated && (
        <>
          <Text className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Your Groups
          </Text>
          <FlatList
            data={userGroups}
            renderItem={renderGroup}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </>
      )}

      <Text className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Discover Groups
      </Text>
      <FlatList
        data={communities}
        renderItem={renderCommunity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}
