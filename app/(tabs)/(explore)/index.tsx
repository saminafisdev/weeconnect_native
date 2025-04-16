import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Icon, SearchIcon } from "@/components/ui/icon";
import {
  Calendar,
  Camera,
  MapPin,
  SlidersHorizontal,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <View>
      <View
        className="flex-row p-3 gap-x-3 items-center"
        style={{ zIndex: 1, backgroundColor: "white" }}
      >
        <Input
          variant="none"
          size={"lg"}
          className="flex-1 bg-gray-200 rounded px-3"
        >
          <InputSlot>
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="Search events near you"
            onChangeText={(text) => setSearchInput(text)}
            className="text-black"
          />
        </Input>
        <Button>
          <ButtonIcon as={SlidersHorizontal} />
        </Button>
      </View>
      <View className="py-4">
        <EventsList searchInput={searchInput} />
      </View>
    </View>
  );
}

const EventsList = ({ searchInput }: { searchInput: string }) => {
  const [events, setEvents] = useState<
    {
      id: number;
      image: string;
      title: string;
      description: string;
      location: string;
    }[]
  >([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data, error, status } = await supabase.from("events").select();

        if (error && status !== 406) throw error;

        if (data) {
          setEvents(data);
          setIsFetching(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    getEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (isFetching) return <Text>Loading...</Text>;

  return (
    <FlatList
      className="px-3"
      data={filteredEvents}
      renderItem={({
        item: event,
      }: {
        item: {
          id: number;
          image: string;
          title: string;
          description: string;
          location: string;
        };
      }) => (
        <Link href={`/details/${event?.id}`} style={styles.card}>
          <Image source={{ uri: event?.image }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{event?.title}</Text>
            <Text style={styles.description}>{event?.description}</Text>
            <View className="flex gap-2 mt-4">
              <View className="flex-row items-center gap-1">
                <Icon as={MapPin} color="green" />
                <Text className="text-sm text-gray-500">{event?.location}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Icon as={Calendar} color="red" />{" "}
                <Text className="text-sm text-gray-500">
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
            </View>
          </View>
        </Link>
      )}
      keyExtractor={(event) => event.id.toString()}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "scroll",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: "#999",
  },
});
