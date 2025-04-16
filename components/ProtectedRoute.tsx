import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/auth");
      }
    };

    checkAuth();
  }, []);

  return children;
}
