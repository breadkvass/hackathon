import React, { FC, ReactElement, useState } from "react";

type CreationTeamProps = {
  membersId: number[],
  name: string,
  teamLeadId: number
}

type CreationTeamActions = {
  setMembersId: (newMembers: number[]) => void,
  setTeamName: (teamName: string) => void,
  setTeamLeadId: (teamLeadId: number) => void
}

type CreationTeamContextType = [
  newTeam: CreationTeamProps,
  actions: CreationTeamActions,
];

const CreationTeamContext = React.createContext<CreationTeamContextType>([
  {
    membersId: [],
    name: '',
    teamLeadId: {} as number
  },
  {
    setMembersId: () => {},
    setTeamName: () => {},
    setTeamLeadId: () => {}
  }
] as CreationTeamContextType);

type CreationTeamContextProviderProps = {
  children: ReactElement;
}

const CreationTeamContextProvider: FC<CreationTeamContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<CreationTeamProps>({
      membersId: [],
      name: '',
      teamLeadId: {} as number
    });

    const setMembersId = (membersId: number[]) => {
      setState((prev: CreationTeamProps)  => ({
        ...prev,
        membersId
      }));
    }

    const setTeamName = (teamName: string) => {
      setState((prev: CreationTeamProps)  => ({
        ...prev,
        name: teamName
      }));
    }

    const setTeamLeadId = (teamLeadId: number) => {
      setState((prev: CreationTeamProps)  => ({
        ...prev,
        teamLeadId
      }));
    }
  
    return (
      <CreationTeamContext.Provider value={[state, {setMembersId, setTeamName, setTeamLeadId}]}>
        {children}
      </CreationTeamContext.Provider>
    );
  };
  
  export { CreationTeamContext, CreationTeamContextProvider };