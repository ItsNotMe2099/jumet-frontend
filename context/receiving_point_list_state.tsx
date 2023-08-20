import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'
import {Nullable} from '@/types/types'

interface IState {
  items: IReceivingPoint[]
  currentReceivingPoint: Nullable<IReceivingPoint>
  setCurrentReceivingPointId: (id: Nullable<number>) => void
}

const defaultValue: IState = {
  items: [],
  currentReceivingPoint: null,
  setCurrentReceivingPointId: (id: Nullable<number>) => null
}

const ReceivingPointListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ReceivingPointListWrapper(props: Props) {
  const appContext = useAppContext()
  const [items, setItems] = useState<IReceivingPoint[]>([])
  const [currentReceivingPointId, setCurrentReceivingPointId] = useState<Nullable<number>>(null)

  const currentReceivingPoint = useMemo<Nullable<IReceivingPoint>>(() => {
    if(!currentReceivingPointId){
      return null
    }
    return items.find((i) => i.id === currentReceivingPointId) ?? null
  }, [currentReceivingPointId, items])
  useEffect(() => {
    if(appContext.aboutMe?.role !== UserRole.Buyer){
      setItems([])
      return
    }
    ReceivingPointOwnerRepository.fetch().then(i => setItems(i))
  }, [appContext.aboutMe])
  const value: IState = {
    ...defaultValue,
    items,
    currentReceivingPoint,
    setCurrentReceivingPointId
  }


  return (
    <ReceivingPointListContext.Provider value={value}>
      {props.children}
    </ReceivingPointListContext.Provider>
  )
}

export function useReceivingPointListContext() {
  return useContext(ReceivingPointListContext)
}

