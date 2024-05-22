import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import IBonusSellerState from '@/data/interfaces/IBonusSellerState'
import BonusSellerStateRepository from '@/data/repositories/BonusSellerStateRepository'
import {BonusType} from '@/data/enum/BonusType'
import {debounce} from 'lodash'
import { Timers} from '@/types/constants'
import {CookiesType, ModalType} from '@/types/enums'
import Cookies from 'js-cookie'
type ByTypes = { [key: BonusType | string]: number | undefined }

interface IState {
  states: IBonusSellerState[]
  isLoaded: boolean
  isLoading: boolean
  byTypes: ByTypes
  reFetch: () => Promise<IBonusSellerState[]>
  add: (type: BonusType) => void
}

const defaultValue: IState = {
  states: [],
  isLoaded: false,
  isLoading: false,
  byTypes: {},
  reFetch: async () => [],
  add: () => {}
}

const BonusSellerStateContext = createContext<IState>(defaultValue)
const tmpList: BonusType[] = []
interface Props {
  children: React.ReactNode
  limit?: number
}

export function BonusSellerStateWrapper(props: Props) {
  const appContext = useAppContext()
  const [states, setStates] = useState<IBonusSellerState[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)

  const showModalBonus = () => {
    if(isLoggedRef.current || Cookies.get(CookiesType.bonusFirstDealModal)){
      return
    }
    appContext.showModal(ModalType.BonusFirstDeal)
  }
  useEffect(() => {
    setTimeout(() => {
      showModalBonus()
    }, Timers.showBonusSellerModal)
  }, [])
  useEffect(() => {
    if (!isLoggedRef.current && isLogged) {
      debouncedFetch()
    }
    if (isLoggedRef.current && !isLogged) {
      setStates([])
    }
    isLoggedRef.current = isLogged

  }, [isLogged])
  const byTypes = useMemo<ByTypes>(() => {
    const val: ByTypes = {}
    for (const item of states) {
      val[item.type] = item.amount
    }
    return val
  }, [states])
  const fetch = async (): Promise<IBonusSellerState[]> => {
    if(tmpList.length === 0){
      return []
    }
    setIsLoading(true)
    let res: IBonusSellerState[] = []
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await BonusSellerStateRepository.fetch({types: tmpList},{signal: abortControllerRef.current?.signal})
      setStates(res)
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
  const debouncedFetch = debounce(async () => {
    if (isLoggedRef.current && tmpList.length > 0) {
      fetch()
    }
  }, 500)
  const value: IState = {
    ...defaultValue,
    states,
    isLoaded,
    isLoading,
    byTypes,
    reFetch,
    add: (type: BonusType) => {
      if(tmpList.includes(type)){
        return
      }
      tmpList.push(type)

    }
  }


  return (
    <BonusSellerStateContext.Provider value={value}>
      {props.children}
    </BonusSellerStateContext.Provider>
  )
}

export function useBonusSellerStateContext() {
  return useContext(BonusSellerStateContext)
}
