import {createContext, ReactElement, useContext, useEffect, useState} from 'react'

interface IState {
  title: string | null
  setTitle: (title: string | null) => void
  backTitle: string | null
  setBackTitle: (title: string | null) => void
  onBackClick: () => void,
  setOnBackClick: (value: () => void) => void,
  backHref: string | null
  setBackHref: (value: string | null) => void
  actions: ReactElement[]
  setActions: (actions: ReactElement[]) => void
}

const defaultValue: IState = {
  title: null,
  backTitle: null,
  actions: [],
  onBackClick: () => null,
  setOnBackClick: (value: () => void) => null,
  backHref: null,
  setBackHref: (value) => null,
  setTitle: (title) => null,
  setBackTitle: (title) => null,
  setActions: (actions) => null
}

const LkLayoutContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function LkLayoutWrapper(props: Props) {
  const [title, setTitle] = useState<string | null>(null)
  const [backTitle, setBackTitle] = useState<string | null>(null)
  const [actions, setActions] = useState<ReactElement[]>([])
  const [onBackClick, setOnBackClick] = useState<() => void>(() => null)
  const [backHref, setBackHref] = useState<string | null>(null)


  const value: IState = {
    ...defaultValue,
    title,
    setTitle: (value) => setTitle(value),
    backTitle,
    setBackTitle: (value) => setBackTitle(value),
    onBackClick,
    setOnBackClick: (value) => setOnBackClick(value),
    actions,
    setActions: (value) => setActions(value),
    backHref,
    setBackHref: (value) => setBackHref(value),

  }

  return (
    <LkLayoutContext.Provider value={value}>
      {props.children}
    </LkLayoutContext.Provider>
  )
}




export const LkLayoutActionsData = (props: {   actions: ReactElement[]}) => {
  const lkLayoutContext = useLkLayoutContext()
  useEffect(() => {
    lkLayoutContext.setActions(props.actions)
    return () =>  lkLayoutContext.setActions([])
  }, [props.actions])

  return null
}


export const LkLayoutTitleData = (props:  {  title: string}) => {
  const lkLayoutContext = useLkLayoutContext()
  useEffect(() => {
    lkLayoutContext.setTitle(props.title)
  }, [props.title])
  return null
}

export const LkLayoutBackData = (props:  {  title: string, href?: string | null}) => {
  const lkLayoutContext = useLkLayoutContext()
  useEffect(() => {
    console.log('SetBackTitle', props.title)
    lkLayoutContext.setBackTitle(props.title)
    return () => lkLayoutContext.setBackTitle(null)
  }, [props.title])
  useEffect(() => {
    lkLayoutContext.setBackHref(props.href ?? null)
    return () => lkLayoutContext.setBackHref(null)
  }, [props.href])
  return null
}
export function useLkLayoutContext() {
  return useContext(LkLayoutContext)
}
