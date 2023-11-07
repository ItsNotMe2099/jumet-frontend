import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { useFavoriteContext } from 'context/favorite_state'
import {LikeEntityType} from '@/data/enum/LikeEntityType'
import {LoginModalArguments} from '@/types/modal_arguments'
import ClientOnly from '@/components/visibility/ClientOnly'
import {colors} from '@/styles/variables'
import BookmarkSvg from '@/components/svg/BookmarkSvg'

interface Props {
  id: number
  entityType: LikeEntityType
  className?: string
}

export default function FavoriteBtn(props: Props) {
  const ref = useRef<HTMLButtonElement>()
  const appContext = useAppContext()
  const favoriteContext = useFavoriteContext()
  const active = favoriteContext.store[props.entityType].includes(props.id)
  const activeRef = useRef<boolean>(active)
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)

  console.log('favoriteContext.store[props.entityType]11', favoriteContext.store)
  useEffect(() => {
    isLoggedRef.current = isLogged
  }, [isLogged])

  useEffect(() => {
    favoriteContext.addRecord(props.id, props.entityType)
  }, [])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const prevent = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const handleClick = async (e: MouseEvent | TouchEvent) => {
      prevent(e)
      if (!isLoggedRef.current) {
        const hint = 'Вам необходимо авторизоваться'
          appContext.showModal(ModalType.Login, {
            hint: hint,
          } as LoginModalArguments)
        return
      }
      if (activeRef.current) {
        await favoriteContext.unlike(props.id, props.entityType)
      } else {
        await favoriteContext.like(props.id, props.entityType)
      }
    }
    if (ref.current) {
      ref.current?.addEventListener('mousedown', prevent)
      ref.current?.addEventListener('click', handleClick)
      ref.current?.addEventListener('touchend', handleClick)
      return () => {
        ref.current?.removeEventListener('mousedown', prevent)
        ref.current?.removeEventListener('click', handleClick)
        ref.current?.removeEventListener('touchend', handleClick)
      }
    }
  }, [ref.current])

  return (
    <button
      ref={ref as any}
      className={classNames({
        [styles.root]: true,
        [styles.active]: active,
      }, props.className)}
    >
      <ClientOnly>
        <BookmarkSvg color={colors.blue500} className={classNames({
          [styles.inactiveImage]: true,
          [styles.inactiveImageInvisible]: active,
        })}/>
      </ClientOnly>
      <ClientOnly>
        <BookmarkSvg color={colors.white} className={classNames({
          [styles.activeImage]: true,
          [styles.activeImageVisible]: active,
        })}/>
      </ClientOnly>
    </button>
  )
}

