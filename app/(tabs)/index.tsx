import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center p-5">
      <Stack.Screen options={{ title: "WeeConnect" }} />
      <Image
        source={require("../../assets/images/hero_image.jpg")}
        className="w-72 h-72 mb-6 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-2xl font-bold mb-4">Welcome to WeeConnect!</Text>
      <Text className="text-lg text-center mb-6">
        Discover and join communities that match your interests.
      </Text>
      <TouchableOpacity
        className="bg-red-500 rounded mb-3"
        onPress={() => router.push("/(explore)")}
      >
        <Text className="text-white py-2 px-4 text-center">Explore Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 rounded"
        onPress={() => router.push("/create-group")}
      >
        <Text className="text-white py-2 px-4 text-center">Create a Group</Text>
      </TouchableOpacity>
    </View>
  );
}
