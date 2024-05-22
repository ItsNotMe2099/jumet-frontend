import {createContext, useContext, useMemo, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import IAgreement from '@/data/interfaces/IAgreement'
import AgreementRepository from '@/data/repositories/AgreementRepository'
import {AgreementType} from '@/data/enum/AgreementType'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'

type ByTypes = { [key: AgreementType | string]: IAgreement | null | undefined }

interface IState {
  agreements: IAgreement[]
  byTypes: ByTypes
  isLoaded: boolean
  isLoading: boolean
  reFetch: () => Promise<IAgreement[]>
}

const defaultValue: IState = {
  agreements: [],
  byTypes: {},
  isLoaded: false,
  isLoading: false,
  reFetch: async () => ([]),
}

const AgreementContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function AgreementWrapper(props: Props) {
  const appContext = useAppContext()
  const [agreements, setAgreements] = useState<IAgreement[]>( [])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  const byTypes = useMemo(() => {
    const val: ByTypes = {}
    for (const item of agreements) {
      val[item.type] = item
    }
    return val
  }, [agreements])
  const fetch = async (): Promise<IAgreement[]> => {
    setIsLoading(true)
    let res: IAgreement[] = []
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await AgreementRepository.fetch({signal: abortControllerRef.current?.signal})
      setAgreements(res)

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
    agreements,
    byTypes,
    reFetch,
  }


  return (
    <AgreementContext.Provider value={value}>
      {props.children}
    </AgreementContext.Provider>
  )
}

export function useAgreementContext() {
  return useContext(AgreementContext)
}
