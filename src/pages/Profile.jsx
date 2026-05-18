import React from "react";
import { supabase } from "../supabase/supabase";

import { useState, useEffect } from "react";

import {
  RiArrowLeftWideLine,
  RiPencilFill,
  RiUserFill,
  RiCamera4Line,
  RiArrowRightWideLine,
  RiUserLocationLine,
  RiQuestionLine,
  RiShieldCheckLine,
  RiLogoutCircleRLine,
  RiImageUploadLine,
  RiArrowDownWideFill,
  RiArrowUpWideLine,
  RiArrowRightCircleLine,
} from "@remixicon/react";
import { data, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import getSavedLocations from "../services/getSavedLocations";
import { jsx } from "react/jsx-runtime";

function Profile() {
  const { profile, setProfile, loading } = useUser();

  // handle image upload popup
  const [showUpload, setShowUpload] = useState(false);

  const displayUploadImage = () => {
    setShowUpload(true);
  };
  const closeUploadImage = () => {
    setShowUpload(false);
  };

  const [image, setImage] = useState(null);
  const [getUserData, setGetUserData] = useState(null);

  // handle Image Upload
  const uploadImage = async () => {
    const userData = await supabase.auth.getUser();
    const user = userData.data.user;

    if (!image) return;

    // unique filename
    const fileName = `${user.id}-${Date.now()}`;

    // upload image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, image);

    if (uploadError) {
      console.log(uploadError.message);
      return;
    }

    // get public url
    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // update profile table
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: imageUrl,
      })
      .eq("id", user.id);

    if (updateError) {
      console.log(updateError.message);
    } else {
      // instantly update UI
      setGetUserData((prev) => ({
        ...prev,
        avatar_url: imageUrl,
      }));
      closeUploadImage();

      console.log("Image Uploaded");
    }
  };

  // handle User logout

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
    } else {
      navigate("/login");
    }
  };

  const [savedLocations, setSavedLocations] = useState([]);
  useEffect(() => {
    getSavedLocations(setSavedLocations);
  }, []);

  const [showLocations, setShowLocations] = useState(false);
  const toggleLocationBtn = () => {
    setShowLocations(!showLocations);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e9f1ff] p-6 flex flex-col gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#e9f1ff] pb-28">
        <div className="flex flex-col gap-8 px-6 py-8 ">
          {/* TOP BAR */}
          <div className="w-full flex justify-between items-center">
            <Link
              to={"/app"}
              className="p-3 bg-white rounded-2xl shadow-sm text-black text-xl"
            >
              <RiArrowLeftWideLine />
            </Link>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg sm:text-2xl font-semibold text-black">
                Profile
              </h2>
            </div>

            <div className="p-3 bg-white rounded-2xl shadow-sm text-xl">
              <RiPencilFill />
            </div>
          </div>
          <div className="sm:flex justify-between items-start w-full gap-10">
            {/* User Profile Image  */}

            <div className="flex flex-col justify-center items-center gap-6 sm:w-[50%] sm:ml-20 sm:mr-30 sm:p-20 sm:bg-amber-50 sm:bg-white sm:rounded-3xl  sm:shadow-xl">
              {/* PROFILE IMAGE */}
              <div className="relative w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]">
                <div className="w-full h-full bg-amber-200 rounded-full overflow-hidden">
                  <img
                    src={
                      profile?.avatar_url ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CAMERA ICON */}

                <div
                  onClick={displayUploadImage}
                  className="
                        absolute 
                        bottom-0 
                        right-0 
                        bg-blue-400 
                        text-white 
                        rounded-full 
                        flex 
                        items-center 
                        justify-center 
                        p-2
                        shadow-lg
                        border-2 border-white
                        cursor-pointer
                    "
                >
                  <RiCamera4Line size={18} />
                </div>
              </div>

              {showUpload && (
                <div className="bg-white w-full rounded-[35px] p-6 flex flex-col justify-center items-center gap-5 shadow-xl">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      uploadImage();
                    }}
                    className="w-full flex flex-col gap-4 items-center"
                  >
                    {/* file input */}
                    <label className="w-full cursor-pointer flex justify-center items-center gap-2 bg-blue-100 text-blue-600 py-4 rounded-2xl">
                      <RiImageUploadLine size={22} />

                      {image ? image.name : "Select Profile Image"}

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>

                    {/* upload button */}
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold"
                    >
                      Upload Image
                    </button>
                  </form>
                </div>
              )}

              {/* USER INFO */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl sm:text-3xl font-semibold">
                  {profile?.full_name}
                </div>

                <div className="text-gray-500 sm:text-xl">Kolkata, IN</div>
              </div>

              <div className="relative overflow-hidden bg-white w-full rounded-[35px] p-6 flex flex-col justify-center items-center gap-4">
                <div className="text-xl sm:text-2xl font-bold">
                  {savedLocations.length} /10
                </div>
                <div className="text-gray-500 sm:text-xl">Saved Locations</div>

                <div className="flex flex-col w-full justify-center items-center gap-3">
                  <div
                    onClick={toggleLocationBtn}
                    className="bg-white p-4 rounded-2xl shadow-sm w-full flex justify-between cursor-pointer"
                  >
                    <div>See Saved Location</div>
                    <div className="transition-all duration-300">
                      {showLocations ? (
                        <RiArrowUpWideLine />
                      ) : (
                        <RiArrowDownWideFill />
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex flex-col gap-3  transition-all duration-300 w-full justify-center items-center ${showLocations ? "max-h-[500px] opacity-100 mt-3" : "hidden"}`}
                  >
                    {savedLocations.map((location) => (
                      <div
                        key={location.id}
                        className="bg-white p-4 rounded-2xl shadow-sm w-full justify-between items-center flex"
                      >
                        {location.city}, {location.country}
                        <Link
                          to={`/app/search/${encodeURIComponent(location.city)}`}
                          className="hover:bg-[#2B7FFF] px-2 py-1 flex gap-2 hover:text-white text-black rounded-2xl transition-all duration-300"
                        >
                          <span className="text-white ">Open</span>
                          <RiArrowRightCircleLine />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-start gap-4 sm:w-[50%] sm:mr-20">
              <div className="text-xl font-semibold items-start-safe mt-5">
                Account
              </div>

              <div className="bg-white w-full rounded-3xl p-6 flex flex-col justify-center items-center gap-2 shadow-xl">
                <div className="flex items-center justify-between w-full gap-2 cursor-pointer">
                  <div className="text-blue-500">
                    <RiUserLocationLine />
                  </div>
                  <div className="font-semibold">Manage Location</div>
                  <div className="text-blue-600">
                    <RiArrowRightWideLine />
                  </div>
                </div>
              </div>

              <div className="bg-white w-full rounded-3xl p-6 flex flex-col justify-center items-center gap-2 shadow-xl">
                <div className="flex items-center justify-between w-full gap-2 cursor-pointer">
                  <div className="text-blue-500">
                    <RiQuestionLine />
                  </div>
                  <div className="font-semibold">Help Cneter</div>
                  <div className="text-blue-600">
                    <RiArrowRightWideLine />
                  </div>
                </div>
              </div>

              <div className="bg-white w-full rounded-3xl p-6 flex flex-col justify-center items-center gap-2 shadow-xl">
                <div className="flex items-center justify-between w-full gap-2 cursor-pointer">
                  <div className="text-blue-500">
                    <RiShieldCheckLine />
                  </div>
                  <div className="font-semibold">Privacy Policy</div>
                  <div className="text-blue-600">
                    <RiArrowRightWideLine />
                  </div>
                </div>
              </div>

              <div className="bg-white w-full rounded-3xl p-6 flex flex-col justify-center items-center gap-2 shadow-xl">
                <div className="flex items-center justify-center w-full gap-2 cursor-pointer">
                  <div
                    className="text-red-600 font-semibold"
                    onClick={handleLogout}
                  >
                    Log Out
                  </div>
                  <div className="text-red-600">
                    <RiLogoutCircleRLine />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
