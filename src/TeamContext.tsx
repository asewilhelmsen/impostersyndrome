import { User } from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";

type TeamBruker = User | null;

type TeamContextProps = {
  teamBruker: TeamBruker | null;
  setTeamBruker: React.Dispatch<React.SetStateAction<TeamBruker | null>>;
  teamAntall: number;
  setTeamAntall: React.Dispatch<React.SetStateAction<number>>;
};

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

type TeamProviderProps = {
  children: ReactNode;
};

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teamBruker, setTeamBruker] = useState<TeamBruker | null>(null);
  const [teamAntall, setTeamAntall] = useState<number>(7);

  return (
    <TeamContext.Provider
      value={{ teamBruker, setTeamBruker, teamAntall, setTeamAntall }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }
  return context as TeamContextProps;
};
