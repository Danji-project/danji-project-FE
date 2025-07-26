import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { UserInfoModel } from '../model/UserInfoModel';


const tempUser = new UserInfoModel(); 
const UserUpdateContext = createContext<((user: UserInfoModel) => void) | null>(null);
export const UserContext = createContext<UserInfoModel>(tempUser);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfoModel>(new UserInfoModel());

  return (
    <UserContext.Provider value={user}>
        <UserUpdateContext.Provider value={setUser}>
            {children}
        </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};