import { createContext, useContext } from 'react'
import { useAppContext } from 'context/state'
import { useRouter } from 'next/router'

interface IState {

}

const defaultValue: IState = {

}

const AuthContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AuthWrapper(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()


  const value: IState = {
    ...defaultValue,

  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
