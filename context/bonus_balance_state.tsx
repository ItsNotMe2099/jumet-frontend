import {createContext, useContext, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import BonusBalanceRepository from '@/data/repositories/BonusBalanceRepository'
import {Nullable} from '@/types/types'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import IBonusBalance from '@/data/interfaces/IBonusBalance'

interface IState {
  balance: Nullable<number>
  isLoaded: boolean
  isLoading: boolean
  reFetch: () => Promise<Nullable<IBonusBalance>>
}

const defaultValue: IState = {
  balance: null,
  isLoaded: false,
  isLoading: false,
  reFetch: async () => null,
}

const BonusBalanceContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function BonusBalanceWrapper(props: Props) {
  const appContext = useAppContext()
  const [balance, setBalance] = useState<Nullable<number>>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetch = async (): Promise<Nullable<IBonusBalance>> => {
    setIsLoading(true)
    let res: Nullable<IBonusBalance> = null
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await BonusBalanceRepository.fetch({signal: abortControllerRef.current?.signal})
      console.log('Res11', res)
      setBalance(res.balance)

    } catch (err) {
      if (err instanceof CanceledError) {
        return res
      }
    }
    setIsLoaded(true)
    setIsLoading(false)
    return res
  }

  const reFetch = () => {

    return fetch()
  }
  useEffectOnce(() => {
    reFetch()
  })
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    balance,
    reFetch,
  }


  return (
    <BonusBalanceContext.Provider value={value}>
      {props.children}
    </BonusBalanceContext.Provider>
  )
}

export function useBonusBalanceContext() {
  return useContext(BonusBalanceContext)
}
