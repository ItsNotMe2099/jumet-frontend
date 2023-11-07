import styles from './index.module.scss'
import SelectTimeField from 'components/fields/SelectTimeField'
import {InputStyleType} from '@/types/enums'
import classNames from 'classnames'

interface Props {
  duration: number
  namePrefix: string
  className?: string
}

export default function ScheduleIntervalsField(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
        <SelectTimeField name={`${props.namePrefix}.startAt`} placeholder={'От'}
                         styleType={InputStyleType.Default}/>
        <SelectTimeField name={`${props.namePrefix}.finishAt`} placeholder={'До'} isEndDate={true}
                         styleType={InputStyleType.Default}/>
    </div>
  )
}
