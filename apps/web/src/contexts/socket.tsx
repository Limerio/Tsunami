import { createContext, useContext } from 'react'
import { io } from 'socket.io-client'

export const socket = io('http://localhost:4001', {
  withCredentials: true,
})
export const SocketContext = createContext(socket)

export const SocketProvider = ({ children }) => {
  socket.on('connect', () => {
    console.log('Connected')
  })

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
