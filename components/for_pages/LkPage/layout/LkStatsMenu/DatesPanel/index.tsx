import Tabs from '@/components/ui/Tabs'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import ChoosePeriod from '@/components/ui/ChoosePeriod'
import HiddenXs from '@/components/visibility/HiddenXs'

interface Props {
  className?: string
}

export default function DatesPanel(props: Props) {

  const options = [
    { label: 'Сутки', value: 'day' },
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
    { label: 'Год', value: 'year' },
    { label: 'За всё время', value: 'all-time' },
  ]

  const [value, setValue] = useState<string>(options[0].value)

  return (
    <div className={classNames(styles.root, props.className)}>
      <HiddenXs>
        <Tabs options={options} value={value} onClick={(value) => setValue(value)} />
      </HiddenXs>
      <ChoosePeriod className={styles.choose} />
    </div>
  )
}
