import React, { useState } from "react";
import { supabase } from "../supabase/supabase";
import { RiMailLine, RiUserLine, RiLock2Line, RiCloudOffLine, RiCloudLine } from '@remixicon/react';
import { Link, useNavigate } from "react-router-dom";
import AuthSkeleton from "../components/AuthSkeleton";
import Toast from "../components/Toast"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();



    const [toast, setToast] = useState({
          show: false,
          message: "",
          type: "",
        });
  
    const showToast = (message, type = "success") => {
  
    setToast({
      show: true,
      message,
      type,
    });
  
    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    showToast(error.message, "error");
  } else {
    showToast("Login Succesefull", "succese");
    setLoading(false)
    navigate("/app/profile");
  }
};


  return (
    <>
    <Toast show={toast.show} message={toast.message} type={toast.type} />
      <div className="h-screen justify-center items-center bg-[#e9f1ff] pb-28 ">
        <div className="h-full flex flex-col gap-8 px-6 py-8 justify-center items-center">
          <div className="flex flex-col justify-center items-start h-full sm:w-[30%] ">
            <div className="flex flex-col w-full justify-center items-center gap-2">
              <div className=" w-[100px] h-[100px] mb-3">
                <img className="" src="/weatherLogo.png" alt="" />
              </div>
              <div className="text-3xl">Welcome Back</div>
              <div className="text-gray-500">
                Join To Save Your Favorite Location
              </div>
            </div>

            <form className="w-full" onSubmit={handleLogin}>
              <div className="flex flex-col py-6 gap-3 w-full">
                <div className="flex justify-start items-center gap-2 text-gray-500 px-4 py-4 bg-white rounded-full w-full">
                  <RiMailLine />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="outline-none"
                  />
                </div>

                <div className="flex justify-start items-center gap-2 text-gray-500 px-4 py-4 bg-white rounded-full w-full">
                  <RiLock2Line />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="outline-none"
                  />
                </div>
              </div>
              <button
                type="submit" 
                className="flex justify-center items-center gap-2 text-white font-semibold px-4 py-4 bg-blue-500 rounded-full w-full cursor-pointer"
              >
                Sign In
              </button>

              <div className="flex justify-center items-center gap-2 text-black px-4 py-4 w-full cursor-pointer">
                Don't have an account ?{" "}
                <Link to={"/app/signup"} className="text-blue-500 cursor-pointer">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
