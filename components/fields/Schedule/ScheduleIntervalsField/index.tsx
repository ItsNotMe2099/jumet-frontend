import styles from './index.module.scss'
import {ITimeInterval} from 'types/types'
import {FieldArray} from 'formik'
import SelectTimeField from 'components/fields/SelectTimeField'
import {addMinutes, format} from 'date-fns'
import LinkButton from 'components/ui/LinkButton'
import classNames from 'classnames'
import { InputStyleType } from '@/types/enums'

interface Props {
  duration: number
  namePrefix: string
  value: ITimeInterval[]
  onChange: (intervals: ITimeInterval[]) => void
}

export default function ScheduleIntervalsField(props: Props) {

  return (
    <FieldArray
      name={`${props.namePrefix}.intervals`}
      render={arrayHelpers => (
        <div className={styles.root}>
          {props.value.map((val, index: number) => (
            <div key={index} className={styles.timeItem}>
              <SelectTimeField name={`${props.namePrefix}.intervals[${index}].startTime`} placeholder={''}
                               styleType={InputStyleType.Default}/>
              <div className={styles.timeItemSeparator}></div>
              <SelectTimeField name={`${props.namePrefix}.intervals[${index}].endTime`} placeholder={''}
                               styleType={InputStyleType.Default}/>
            </div>
          ))}
          <LinkButton
            type="button"
            className={classNames(styles.addTimeBtn, {[styles.empty]: props.value.length === 0})}
            onClick={() => {
              const curIntervals = props.value
              const last = curIntervals?.length > 0 ? curIntervals[curIntervals.length - 1] : null
              const now = new Date()
              const [hours, mins] = last?.endTime ? [parseInt(last?.endTime.split(':')[0], 10), parseInt(last?.endTime.split(':')[1], 10)] : [8, 0]
              const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, mins, 0)
              const nextDate = addMinutes(date, props.duration)
              props.onChange([...curIntervals, {
                startTime: format(date, 'HH:mm'),
                endTime: format(nextDate, 'HH:mm')
              }])
            }}
          >
            Добавить время
          </LinkButton>
        </div>
      )}/>
  )
}
