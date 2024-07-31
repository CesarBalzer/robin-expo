import { createContext, PropsWithChildren } from "react";

interface UserContextProps {

}

export const UserContext = createContext<undefined>(undefined);


export const UserProvider = (props: PropsWithChildren) => {
  return (
    <UserContext.Provider value={undefined}>
      {props.children}
    </UserContext.Provider>
  )
}