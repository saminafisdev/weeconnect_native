import { View, Text } from "react-native";
import { Icon } from "@/components/ui/icon";
import { MessageCircle } from "lucide-react-native";

export default function MessagesScreen() {
  return (
    <View className="flex-1 justify-center items-center px-5">
      <Icon as={MessageCircle} size={64} color="gray" />
      <Text className="text-center text-gray-500 text-base mt-5">
        Start conversation with the people you meet and keep track of them here.
      </Text>
      <Text className="text-center text-red-500 font-semibold text-sm mt-2">
        This feature is underway.
      </Text>
    </View>
  );
}
