import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {IScrapMetalCategory} from '@/data/interfaces/IScrapMetalCategory'
import ScrapMetalCategoryRepository from '@/data/repositories/ScrapMetalCategoryRepository'

type ScrapMetalCategoriesMap = { [key: string]: IScrapMetalCategory }

interface IState {
  scrapMetalCategories: IScrapMetalCategory[]
  scrapMetalCategoriesMap: ScrapMetalCategoriesMap
}

const defaultValue: IState = {
  scrapMetalCategories: [],
  scrapMetalCategoriesMap: {}
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
  const scrapMetalCategoriesMap = useMemo<any>(() => scrapMetalCategories.reduce((ac: ScrapMetalCategoriesMap, a) => ({
      ...ac,
      [`${a.category}`]: a
    }), {} as ScrapMetalCategoriesMap)
  , [scrapMetalCategories])


  const value: IState = {
    ...defaultValue,
    scrapMetalCategories,
    scrapMetalCategoriesMap
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
