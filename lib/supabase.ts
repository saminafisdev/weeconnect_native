import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://slsetuixdutnevuqbyyu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsc2V0dWl4ZHV0bmV2dXFieXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDUyNjUsImV4cCI6MjA2MDIyMTI2NX0.cKlpLz4Bai3S_nPQLGHYTaUEwGi_imcb8JpsEJeQ0-g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const createGroup = async (name, description, location) => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error("User is not authenticated.");
    }

    const { user } = session;

    const { data, error } = await supabase
      .from("groups")
      .insert({
        name,
        description,
        location,
        user_id: user.id, // Updated to use user_id instead of created_by
      })
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating group:", error.message);
    throw error;
  }
};
