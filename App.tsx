
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./WelcomeScreen";
import MainApp from "./MainApp";

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("hasLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // or splash/loading screen
  }

  if (isFirstLaunch) {
    return <WelcomeScreen onContinue={() => setIsFirstLaunch(false)} />;
  }

  return <MainApp />;
}
