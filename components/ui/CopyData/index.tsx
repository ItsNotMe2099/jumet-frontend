import styles from './index.module.scss'
import classNames from 'classnames'
import {useRef, useState} from 'react'
import Button from '@/components/ui/Button'
import CopySvg from '@/components/svg/CopySvg'
import {colors} from '@/styles/variables'
import {useAppContext} from '@/context/state'


interface Props {
  label?: string
  text: string
  copyText?: string
  buttonName?: string
}

export default function CopyData(props: Props) {
  const appContext = useAppContext()
  const timerRef = useRef<any>(null)
  const [showCopied, setShowCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(props.copyText ?? props.text)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setShowCopied(true)
    timerRef.current = setTimeout(() => {
      setShowCopied(false)
    }, 3000)
  }
  return (
    <div className={classNames(styles.root)}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <div className={styles.wrapper}>
        <div className={styles.textWrap}><div className={styles.text}>{props.text}</div></div>
        <Button styleType={'large'} color={'blue'} icon={<CopySvg color={colors.white}/>} onClick={handleCopy}>
          {!appContext.isMobile ? props.buttonName ?? 'Скопировать' : null}
        </Button>
      </div>
      <div className={classNames(styles.copied, {[styles.hidden]: !showCopied})}>{props.copyText ?? 'Скопировано'}</div>

    </div>
  )
}
