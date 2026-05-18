import { supabase } from "../supabase/supabase"
import { useWeather } from "../context/WeatherContext";

const getSavedLocations = async (setSavedLocations) => {
    const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("saved_locations")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.log(error.message);
  } else {
    setSavedLocations(data);
  }
};

export default getSavedLocations;