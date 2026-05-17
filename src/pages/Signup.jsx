import React, { useState } from 'react'
import { supabase } from '../supabase/supabase'
import { RiMailLine, RiUserLine, RiLock2Line } from '@remixicon/react';
import { Link, useNavigate } from "react-router-dom";
function Signup() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullname] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);


    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log(data);

      // check session
      if (data.session) {
        navigate("/app/profile");
      } else {
        alert("Check your email and confirm your account");
      }


      if (data.user) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          full_name: full_name,
          email: data.user.email,

        });
      }

      if (data.session) {
        navigate("/app/profile");
      } else {
        alert("Check your email for confirmation");
      }

    }
  };

  return (
    <>
      <div className="h-screen justify-center items-center bg-[#e9f1ff] pb-28">
        <div className="h-full flex flex-col gap-8 px-6 py-8">

          <div className='flex flex-col justify-center items-start h-full '>
            <div className='flex flex-col gap-2'>
              <div className='text-3xl'>
                Create Account
              </div>
              <div className='text-gray-500'>Join To Save Your Favorite Location</div>
            </div>

            <form onSubmit={handleSignup} className='w-full'>
              <div className='flex flex-col py-6 gap-3 w-full'>

                <div className='flex justify-start items-center gap-2 text-gray-500 px-4 py-4 bg-white rounded-full w-full'>
                  <RiUserLine />
                  <input type='text' placeholder='Full Name' className='outline-none'
                    type="text"
                    value={full_name}
                    onChange={(e) => setFullname(e.target.value)}

                  />
                </div>

                <div className='flex justify-start items-center gap-2 text-gray-500 px-4 py-4 bg-white rounded-full w-full'>
                  <RiMailLine />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='outline-none'
                  />
                </div>


                <div className='flex justify-start items-center gap-2 text-gray-500 px-4 py-4 bg-white rounded-full w-full'>
                  <RiLock2Line />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='outline-none'
                  />
                </div>

              </div>
              <button disabled={loading} type="submit" className='flex justify-center items-center gap-2 text-white font-semibold px-4 py-4 bg-blue-500 rounded-full w-full cursor-pointer'>{loading ? "Creating..." : "Sign Up"}</button>

              <div className='flex justify-center items-center gap-2 text-black px-4 py-4 w-full cursor-pointer'>Already have an account? <Link to={"/app/login"} className='text-blue-500 cursor-pointer' >Sign In</Link>
              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup
