import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext({
  loading: false,
  setLoading: (_val: boolean) => {},
})

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
