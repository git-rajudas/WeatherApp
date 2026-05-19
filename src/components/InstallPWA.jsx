import React from 'react'
import { useEffect, useState } from 'react'
import Toast from './Toast';

function InstallPWA() {


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

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e)=> {
            console.log("INSTALL EVENT FIRED");
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };

        window.addEventListener("beforeinstallpromt", handler);
        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    },[]);


const handleInstall = async ()=>{
    if(!deferredPrompt) return

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if(choiceResult === "accepted"){
        showToast("Weather App installed", "susuccess");

    }
    setDeferredPrompt(null);
    setShowInstall(false)

};

if (!showInstall) return null;



  return (
      <div
          className=" fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-4 rounded-3xl shadow-xl flex items-center gap-4 z-50 " >
            <Toast show={toast.show} message={toast.message} type={toast.type} />
          <div>
              Install Weather App
          </div>
          <button onClick={handleInstall} className=" bg-blue-500 px-4 py-2 rounded-2xl ">
              Install
          </button>

      </div>
  )
}

export default InstallPWA
