import React, { createContext, useContext, useState } from "react";

export type Preferences = {
    indoors: number,
    teamPlayers: number,
    teamLeaders: number,
    outdoors: number,
}

const initialState = {
    indoors: 5,
    teamPlayers: 5,
    teamLeaders: 5,
    outdoors: 5,
}

export const PreferencesContext = createContext({
    preferences: initialState,
    setPreferences: (preferences: Preferences) => {}
});

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState<Preferences>(initialState);

    return (
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = useContext(PreferencesContext);

    return context;
}
