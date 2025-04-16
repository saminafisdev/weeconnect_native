import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { Stack } from "expo-router";
import { createGroup } from "../lib/supabase";

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupLocation, setGroupLocation] = useState("");

  const handleCreateGroup = async () => {
    if (!groupName || !groupLocation) {
      Alert.alert("Error", "Group name and location are required.");
      return;
    }

    try {
      const data = await createGroup(
        groupName,
        groupDescription,
        groupLocation
      );
      Alert.alert("Success", "Group created successfully.");
      setGroupName("");
      setGroupDescription("");
      setGroupLocation("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ProtectedRoute>
      <View className="flex-1 p-5">
        <Stack.Screen options={{ title: "Create Group" }} />
        <Text className="text-2xl font-bold mb-4">Create a New Group</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Group Name"
          value={groupName}
          onChangeText={setGroupName}
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Group Description"
          value={groupDescription}
          onChangeText={setGroupDescription}
          multiline
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Group Location"
          value={groupLocation}
          onChangeText={setGroupLocation}
        />
        <TouchableOpacity
          className="bg-red-500 rounded"
          onPress={handleCreateGroup}
        >
          <Text className="text-white py-2 px-4 text-center">Create Group</Text>
        </TouchableOpacity>
      </View>
    </ProtectedRoute>
  );
}
