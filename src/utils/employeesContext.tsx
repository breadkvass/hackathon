import React, { FC, ReactElement, useState } from "react";
import { Employee } from './types';

type EmployeesContextType = [teams: Employee[], setTeams: (teams: Employee[]) => void];

const EmployeesContext = React.createContext<EmployeesContextType>([[],()=>{}] as EmployeesContextType);

type TeamsContextProviderProps = {
  children: ReactElement;
}

const EmployeesContextProvider: FC<TeamsContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<Employee[]>([]);
  
    return (
      <EmployeesContext.Provider value={[state, setState ]}>
        {children}
      </EmployeesContext.Provider>
    );
  };
  
  export { EmployeesContext, EmployeesContextProvider };