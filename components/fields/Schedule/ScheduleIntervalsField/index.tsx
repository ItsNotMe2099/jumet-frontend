import styles from './index.module.scss'
import SelectTimeField from 'components/fields/SelectTimeField'
import {InputStyleType} from '@/types/enums'

interface Props {
  duration: number
  namePrefix: string
}

export default function ScheduleIntervalsField(props: Props) {

  return (
    <div className={styles.root}>
        <SelectTimeField name={`${props.namePrefix}.startAt`} placeholder={'От'}
                         styleType={InputStyleType.Default}/>
        <SelectTimeField name={`${props.namePrefix}.finishAt`} placeholder={'До'} isEndDate={true}
                         styleType={InputStyleType.Default}/>
    </div>
  )
}
