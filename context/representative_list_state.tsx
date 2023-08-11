import {createContext, useContext, useEffect, useState} from 'react'
import {IRepresentative} from '@/data/interfaces/IRepresentative'
import RepresentativeRepository from '@/data/repositories/RepresentativeRepository'

interface IState {
  items: IRepresentative[]
}

const defaultValue: IState = {
  items: []
}

const RepresentativeListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function RepresentativeListWrapper(props: Props) {
  const [items, setItems] = useState<IRepresentative[]>([])

  useEffect(() => {
    RepresentativeRepository.fetch().then(i => setItems(i))
  }, [])
  const value: IState = {
    ...defaultValue,
    items
  }


  return (
    <RepresentativeListContext.Provider value={value}>
      {props.children}
    </RepresentativeListContext.Provider>
  )
}

export function useRepresentativeListContext() {
  return useContext(RepresentativeListContext)
}

