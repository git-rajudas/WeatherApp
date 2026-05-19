import React from 'react'
import { useEffect, useState } from 'react'
import Toast from './Toast';
import {RiCloseCircleLine , RiInboxArchiveLine} from "@remixicon/react"

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
            if(!window.matchMedia("(display-mode: standalone)").matches){
                setShowInstall(true);
            }
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
        showToast("App installed successfully", "susuccess");

    }else{
        showToast("Install cancelled", "error")
    }

    setDeferredPrompt(null);
    setShowInstall(false)

};

const handleDismiss = () => {
    setShowInstall(false);

    localStorage.setItem("pwa-install-dismissed", Date.now())
};

useEffect(() => {
    const lastDismissed = localStorage.getItem("pwa-install-dismissed");

    if(lastDismissed){
        const diff = Date.now() - Number(lastDismissed);
        const oneDay = 24*60*60*1000;
        
        if (diff < oneDay) {
            setShowInstall(false);
        }
    }
},[]);

if (window.matchMedia("(display-mode: standalone)").matches){
    return null;
}

if(!showInstall || !deferredPrompt) return null;


  return (
    <>
    <Toast show={toast.show} message={toast.message} type={toast.type} />
      <div
          className=" fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-4 rounded-3xl shadow-xl flex items-center gap-4 z-50 " >
          <div>
              Install Weather App
          </div>
          <button onClick={handleInstall} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl text-xl">
              Install <RiInboxArchiveLine />
          </button>
           <button
          onClick={handleDismiss}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-xl text-white font-semibold"
        >
         Cancel <RiCloseCircleLine />
        </button>

      </div>
    </>
  )
}

export default InstallPWA
