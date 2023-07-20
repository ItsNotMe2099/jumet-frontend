import {createContext, useContext, useState} from 'react'
import {IScrapMetalCategory} from '@/data/interfaces/IScrapMetalCategory'

interface IState {
  scrapMetalCategories: IScrapMetalCategory[]
}

const defaultValue: IState = {
  scrapMetalCategories: []
}

const DataContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  scrapMetalCategories: IScrapMetalCategory[]
}

export function DataWrapper(props: Props) {
  const [scrapMetalCategories, setScrapMetalCategories] = useState<IScrapMetalCategory[]>([])

  const value: IState = {
    ...defaultValue,
    scrapMetalCategories
  }


  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  return useContext(DataContext)
}
