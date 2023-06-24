import {MouseEventHandler, useRef} from 'react'
import {useDetectOutsideClick} from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import IconButton from '@/components/ui/IconButton'
import UserSvg from '@/components/svg/UserSvg'
import {colors} from '@/styles/variables'
import {useAppContext} from '@/context/state'
import { useRouter } from 'next/router'

interface Option {
  label: string
}

interface Props {
  className?: string
}
enum ActionType{
  Profile,

  Logout
}

export default function ProfileMenu(props: Props){
  const appContext = useAppContext()
  const dropdownRef = useRef(null)
  const router = useRouter()

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const options = [
    {label: 'Настройки профиля', key: ActionType.Profile},
    {label: 'Выйти', key: ActionType.Logout},
  ]
  const handleClickItem = (e: React.MouseEvent<HTMLAnchorElement>, item: { key: ActionType }) => {
    e.preventDefault()
    switch (item.key) {
      case ActionType.Profile:
        router.push('/profile')
        break
      case ActionType.Logout:
          setTimeout(() => appContext.logout(), 100)
          router.push('/')
        break
    }
    setIsActive(false)
  }
    const handleClick: MouseEventHandler = (e) => {
      e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div onClick={handleClick} className={styles.dropDownTrigger}>
        <IconButton bgColor={'dark400'}><UserSvg color={colors.white}/></IconButton>
      </div>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        {options.map((item, index) =>   <a key={item.key} className={styles.option} onClick={e => handleClickItem(e, item)}>
          {item.label}
        </a>)}
       </nav>
    </div>
  )
}
