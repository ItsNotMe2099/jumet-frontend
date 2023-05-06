import CheckSvg from '@/components/svg/CheckSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import { ReactElement } from 'react'


interface Props {
  title: string
  text: React.ReactNode
  additionalComp?: () => ReactElement
}

export default function SuccessBlock(props: Props) {

  return (
    <div className={styles.root}>
      <CheckSvg className={styles.check} color={colors.blue500} />
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.text}>
        {props.text}
      </div>
      {props.additionalComp ? props.additionalComp() : null}
    </div>
  )
}
