import { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { MapPin, Calendar } from "lucide-react-native";

import { supabase } from "@/lib/supabase";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "@/components/ui/image";

import SkeletonLoading from "expo-skeleton-loading";

const EventDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("id", id);

      if (error) throw error;

      if (data) {
        console.log(data);

        setEvent(data[0]);
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, []);

  if (isLoading)
    return (
      <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 3,
            gap: 3,
          }}
        >
          <View
            style={{
              width: 400,
              height: 300,
              backgroundColor: "#adadad",
              borderRadius: 10,
            }}
          />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <View
              style={{
                backgroundColor: "#adadad",
                width: "50%",
                height: 10,
                marginBottom: 3,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                backgroundColor: "#adadad",
                width: "20%",
                height: 8,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                backgroundColor: "#adadad",
                width: "15%",
                height: 8,
                borderRadius: 5,
                marginTop: 3,
              }}
            />
          </View>
        </View>
      </SkeletonLoading>
    );

  return (
    <View className="bg-white flex-1 gap-3 p-3">
      <Stack.Screen options={{ title: "Event Details" }} />
      <Image
        size="none"
        source={{
          uri: "https://picsum.photos/400",
        }}
        alt="Event Image"
        className="aspect-video w-full rounded-xl"
      />
      <Text className="text-2xl font-bold">{event?.title}</Text>
      <View className="flex-row items-center gap-2">
        <Calendar color="red" />
        <Text className="text-base text-gray-700">
          {new Date(event?.date)
            .toLocaleString("en-US", {
              timeZone: "Asia/Dhaka",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(",", "")}{" "}
          (Asia/Dhaka)
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <MapPin color="green" />
        <Text className="text-base text-gray-700">{event?.location}</Text>
      </View>
      <Text className="leading-relaxed text-lg">{event?.description}</Text>
    </View>
  );
};

export default EventDetail;
