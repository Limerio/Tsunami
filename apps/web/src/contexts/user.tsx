import { TUser } from '@tsunami-clone/types'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type TUserContext = {
  setUser: Dispatch<SetStateAction<TUser>>
  user: TUser | null
}

const UserContext = createContext<TUserContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
})

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<TUser>()

  return (
    <UserContext.Provider
      value={{
        user: user as TUser,
        setUser: setUser as Dispatch<SetStateAction<TUser>>,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
