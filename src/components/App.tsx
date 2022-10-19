import React from "react";
import NavBar from "./NavBar";
import { SettingsContext, settings } from "../lib/SettingsContext";

const App:React.FC  = () => {
  console.log(settings.settings.pomodoroMaxValue)

  return (
    <SettingsContext.Provider value={settings}>
      <NavBar />
    </SettingsContext.Provider>
  )
}

export default App;
