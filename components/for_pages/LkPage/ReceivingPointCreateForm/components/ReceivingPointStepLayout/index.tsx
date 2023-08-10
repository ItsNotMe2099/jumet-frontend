import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/ReceivingPointStepLayout/index.module.scss'

import Indicator from 'components/for_pages/Common/Indicator'
import {useRouter} from 'next/router'
import classNames from 'classnames'
import {IFormStep} from '@/types/types'

interface Props<T> {
  title: string
  steps: IFormStep<T>[]
  currentStepIndex: number
  children?: React.ReactNode
  indicator?: boolean
  onBack?: () => void
  filter?: boolean
}


export default function ReceivingPointStepLayout<T>(props: Props<T>) {


  const router = useRouter()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {(props.indicator) && <div className={classNames(styles.wrapper, styles.wrapperIndicator)}>
          <div className={styles.indicator}>
            <Indicator<T> step={props.currentStepIndex} options={props.steps.map(i => ({label: i.name, value: i.key}))} onBack={props.onBack}/></div>
        </div>
        }
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.title}>
              {props.title}
            </div>

            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

