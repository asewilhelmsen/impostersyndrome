import { createContext, ReactNode, useContext, useState } from "react";

type TeamData = { id: string; level: number };

type TeamContextProps = {
  teamData: TeamData | null;
  setTeamData: React.Dispatch<React.SetStateAction<TeamData | null>>;
};

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

type TeamProviderProps = {
  children: ReactNode;
};

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  return (
    <TeamContext.Provider value={{ teamData, setTeamData }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }
  return context as TeamContextProps; // Explicitly cast context to TeamContextProps
};
