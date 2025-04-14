import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Events" }} />
      <Stack.Screen name="details" options={{ headerTitle: "Event Detail" }} />
    </Stack>
  );
}
