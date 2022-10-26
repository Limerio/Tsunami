import { TUser } from '@tsunami-clone/types'
import {
  createContext,
  Dispatch,
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

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState()

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
