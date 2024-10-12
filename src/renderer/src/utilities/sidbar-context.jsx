import { createContext, useState } from 'react'

const SidebarContext = createContext()

const SidebarProvider = ({ children }) => {
  const [isReadView, setReadView] = useState(false)

  return (
    <SidebarContext.Provider value={{ setReadView, isReadView }}>
      {children}
    </SidebarContext.Provider>
  )
}

export { SidebarContext, SidebarProvider }
