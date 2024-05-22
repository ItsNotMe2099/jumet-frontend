import {createContext, useContext, useMemo, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import IBonusTariff from '@/data/interfaces/IBonusTariff'
import BonusTariffRepository from '@/data/repositories/BonusTariffRepository'
import {BonusType} from '@/data/enum/BonusType'
type ByTypes = { [key: BonusType | string]: IBonusTariff | null | undefined }

interface IState {
  tariffs: IBonusTariff[]
  byTypes: ByTypes
  isLoaded: boolean
  isLoading: boolean
  reFetch: () => Promise<IBonusTariff[]>
}

const defaultValue: IState = {
  tariffs: [],
  byTypes: {},
  isLoaded: false,
  isLoading: false,
  reFetch: async () => ([]),
}

const BonusTariffContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
  initialTariffs: IBonusTariff[]
}

export function BonusTariffWrapper(props: Props) {
  const appContext = useAppContext()
  const [tariffs, setTariffs] = useState<IBonusTariff[]>(props.initialTariffs ?? [])
  const [isLoading, setIsLoading] = useState<boolean>(!props.initialTariffs?.length)
  const [isLoaded, setIsLoaded] = useState<boolean>(props.initialTariffs?.length > 0 )
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  const byTypes = useMemo(() => {
    const val: ByTypes = {}
    for (const item of tariffs) {
      val[item.type] = item
    }
    return val
  }, [tariffs])
  const fetch = async (): Promise<IBonusTariff[]> => {
    setIsLoading(true)
    let res: IBonusTariff[] = []
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await BonusTariffRepository.fetch({signal: abortControllerRef.current?.signal})
      setTariffs(res)

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
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    tariffs,
    byTypes,
    reFetch,
  }


  return (
    <BonusTariffContext.Provider value={value}>
      {props.children}
    </BonusTariffContext.Provider>
  )
}

export function useBonusTariffContext() {
  return useContext(BonusTariffContext)
}
