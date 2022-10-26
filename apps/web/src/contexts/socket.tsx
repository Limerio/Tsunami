import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import io from 'socket.io-client'

export const socket = io('http://localhost:4001', {
  withCredentials: true,
})

export const SocketContext = createContext(socket)

export const SocketProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    socket.on('connect', () => console.log('Connected'))
    return () => {
      socket.off('connect')
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
