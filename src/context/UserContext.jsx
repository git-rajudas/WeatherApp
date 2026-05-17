import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error.message);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();

  }, [user]);

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};