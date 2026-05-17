import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../supabase/supabase";

const authContext = createContext();


export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => { const { data: { user },} = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};


// custom Hook 

export const useAuth = () => {
  return useContext(authContext);
};
