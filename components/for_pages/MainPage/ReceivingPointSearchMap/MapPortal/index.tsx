import {ReactElement, useEffect} from 'react'
import {createPortal} from 'react-dom'

interface Props{
  children?: ReactElement
  elementId: string
  onOpen: () => void
}
export const MapPortal =
  ( { children, elementId, onOpen }: Props ) => {
    // находим искомый HTML по id
    const mount = document.getElementById(elementId)

    // создаём свой div
    const el = document.createElement('div')
    el.className = 'ballon-portal'
    useEffect(() => {
      // добавляем свой див к искомому элементу
      console.log('getMoeny', mount, elementId)
      if (mount){
        mount.appendChild(el)
        onOpen()
      }
      return () => {
        console.log('getMoeny2', mount, elementId)
        // удаляем элемент от искомого при завершении компоненты
        if (mount) mount.removeChild(el)
      }
    }, [ el, mount ])

    // отменяем отрисовку при отсутствии искомого элемента
    if (!mount) return null
    // собственно, пририсовываем React-элемент в div к искомому HTML
    return createPortal(children, el)
  }
