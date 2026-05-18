import { supabase } from "../supabase/supabase"
import { useWeather } from "../context/WeatherContext";

const saveLocation = async (currentWeather, setToast ) => {

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
        return;
    }

    

    // check duplicate
    const alreadySaved = data.find(
        (item) =>
            item.city === currentWeather?.name &&
            item.country === currentWeather?.sys?.country
    );
    
    if(data.length >= 10){
       setToast({
        show: true,
        message: "Maximum 10 locations allowed",
        type: "error",
       });

       setTimeout(()=>{
          setToast({
            show: false,
            message: "",
            type: "",
          })
       },3000);
       
       return;
    }
    
    if (alreadySaved) {

    setToast({
      show: true,
      message: "Location already saved",
      type: "error",
    });

  } else {

    const { error: insertError } = await supabase
      .from("saved_locations")
      .insert({
        user_id: user.id,
        city: currentWeather?.name,
        country: currentWeather?.sys?.country,
      });

    if (insertError) {

      setToast({
        show: true,
        message: insertError.message,
        type: "error",
      });

    } else {

      setToast({
        show: true,
        message: "Location Saved",
        type: "success",
      });

    }
  }

  setTimeout(() => {
    setToast({
      show: false,
      message: "",
      type: "",
    });
  }, 3000);
};






export default saveLocation;
