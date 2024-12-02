import React, { createContext, useContext, useState } from "react";

type XPContextType = {
    experience: number;
    setExperience: (experience: number) => void;
};

const XPContext = createContext<XPContextType | undefined>(undefined);

export function XPProvider({ children }: { children: React.ReactNode }) {
    const [experience, setExperience] = useState<number>(0);

  
    return (
        <XPContext.Provider value={{ experience, setExperience }}>
            {children}
        </XPContext.Provider>
    );
}

export function useXP() {
    const context = useContext(XPContext);
    if (context === undefined) {
        throw new Error("useXP must be used within a XPProvider");
    }
    return context;
}
