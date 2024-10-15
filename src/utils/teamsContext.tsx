import React, { FC, ReactElement, useState } from "react";
import { Team } from './types';

type TeamsContextType = [teams: Team[], setTeams: (teams: Team[]) => void];

const TeamsContext = React.createContext<TeamsContextType>([[],()=>{}] as TeamsContextType);

type TeamsContextProviderProps = {
  children: ReactElement;
}

const TeamsContextProvider: FC<TeamsContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<Team[]>([]);
  
    return (
      <TeamsContext.Provider value={[state, setState ]}>
        {children}
      </TeamsContext.Provider>
    );
  };
  
  export { TeamsContext, TeamsContextProvider };