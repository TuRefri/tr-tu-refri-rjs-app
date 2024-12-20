import React, { createContext, useContext, ReactNode } from 'react';
import useGetMagnets from '../hooks/useGetMagnets';
import { MagnetGroup } from '../types/magnetGroup';

interface MagnetGroupsContextProps {
  loadingMagnets: boolean;
  magnetgroups: MagnetGroup[];
  error: unknown;
  refetch: () => void;
}

const MagnetGroupsContext = createContext<MagnetGroupsContextProps | undefined>(undefined);

interface MagnetGroupsProviderProps {
  children: ReactNode;
}

export const MagnetGroupsProvider: React.FC<MagnetGroupsProviderProps> = ({ children }) => {
  const { loadingMagnets, magnetgroups, error, refetch } = useGetMagnets();

  return (
    <MagnetGroupsContext.Provider
      value={{
        loadingMagnets,
        magnetgroups: magnetgroups,
        error,
        refetch,
      }}
    >
      {children}
    </MagnetGroupsContext.Provider>
  );
};

export const useMagnetGroupsContext = (): MagnetGroupsContextProps => {
  const context = useContext(MagnetGroupsContext);
  if (context === undefined) {
    throw new Error('useMagnetGroups must be used within a MagnetGroupsProvider');
  }
  return context;
};
