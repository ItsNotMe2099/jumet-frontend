import {createContext, useContext, useEffect, useState} from 'react'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'

interface IState {
  items: IReceivingPoint[]
}

const defaultValue: IState = {
  items: []
}

const ReceivingPointListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ReceivingPointListWrapper(props: Props) {
  const [items, setItems] = useState<IReceivingPoint[]>([])

  useEffect(() => {
    ReceivingPointOwnerRepository.fetch().then(i => setItems(i))
  }, [])
  const value: IState = {
    ...defaultValue,
    items
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

