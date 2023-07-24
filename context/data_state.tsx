import {createContext, useContext, useEffect, useState} from 'react'
import {IScrapMetalCategory} from '@/data/interfaces/IScrapMetalCategory'
import ScrapMetalCategoryRepository from '@/data/repositories/ScrapMetalCategoryRepository'

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

  useEffect(() => {
    ScrapMetalCategoryRepository.fetch().then(i => setScrapMetalCategories(i))
  }, [])
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
