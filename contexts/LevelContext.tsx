import React, { createContext, useContext, useState } from "react";

type LevelContextType = {
    level: number;
    setLevel: (level: number) => void;
};

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function LevelProvider({ children }: { children: React.ReactNode }) {
    const [level, setLevel] = useState<number>(1);


    return (
        <LevelContext.Provider value={{ level, setLevel }}>
            {children}
        </LevelContext.Provider>
    );
}

export function useLevel() {
    const context = useContext(LevelContext);
    if (context === undefined) {
        throw new Error("useLevel must be used within a LevelProvider");
    }
    return context;
}
