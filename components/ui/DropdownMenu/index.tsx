import { useRef, useState } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import { colors } from '@/styles/variables'
import {IOption} from '@/types/types'


interface Props<T> {
  options?: IOption<T>[]
  onTriggerClick?: () => void
  className?: string
  optionClick?: (option: IOption<any>) => void
  currentLabel?: string
}

export default function DropdownMenu<T>(props: Props<T>) {
  const dropdownRef = useRef(null)
  const { options, optionClick, onTriggerClick } = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [currentLabel, setCurrentLabel] = useState<string | undefined>(props.currentLabel)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  console.log(isActive)

  const handleOptionClick = (item: IOption<T>) => {
    setCurrentLabel(item.name)
    setIsActive(false)
    optionClick ? optionClick(item) : null
  }

  const filtered = options?.filter(i => i.name !== currentLabel)

  return (
    <div className={classNames(styles.root, props.className)}>
      <a href="#" onClick={handleClick} className={classNames(styles.dropDownTrigger)}>
        <div className={styles.label}>
          <span>{currentLabel ? currentLabel : <span>Выберите категорию</span>}</span>
        </div>
        <div className={styles.arrow}>
          <ChevronDownSvg color={colors.grey500} />
        </div>
      </a>
      <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        {(!currentLabel ? options : filtered)?.map((item, index) => <div key={index}
          className={classNames(styles.option)}
          onClick={() => handleOptionClick(item)}>
          <a>{item.name}</a></div>)}
      </nav>
    </div>
  )
}
