import styles from 'components/fields/Schedule/ScheduleWeekDaysField/index.module.scss'
import {IField, WorkDays} from 'types/types'
import { useField} from 'formik'
import FieldError from 'components/fields/FieldError'
//import ActionsDropDown from 'components/ui/ActionsDropdown'
import ScheduleIntervalsField from 'components/fields/Schedule/ScheduleIntervalsField'
import CheckBoxField from '@/components/fields/CheckBoxField'
export enum ScheduleGroupDays {
  Work = 'work',
  Saturday = 'saturday',
  Sunday = 'sunday'
}
export interface IScheduleGroup{
  title: string,
  value: ScheduleGroupDays,
}

interface Props extends IField<WorkDays> {
  duration: number
}

export default function ScheduleWorkAndWeekendsField(props: Props) {
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  const groups: IScheduleGroup[] = [
    {title: 'Будни', value: ScheduleGroupDays.Work},
    {title: 'Суббота', value: ScheduleGroupDays.Saturday},
    {title: 'Воскресенье', value: ScheduleGroupDays.Sunday}
  ]

  const value = field.value ?? groups.reduce((ac, a) => ({
    ...ac,
    [a.value]: {active: true, startAt: null, finishAt: null}
  }), {}) as WorkDays



  const handleToggleActive = (day:IScheduleGroup,active: boolean) => {

    helpers.setValue({
      ...value, [day.value]: {
        ...value[day.value],
        active,

      }
    })

  }
  return (
    <div className={styles.root}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      {props.description && <div className={styles.hint}>{props.description}</div>}
      <div className={styles.schedule}>
      {groups.map((group) => <div key={group.value} className={styles.scheduleItem}>
        <ScheduleIntervalsField namePrefix={`${props.name}.${group.value}`} duration={props.duration}/>
        <CheckBoxField name={`${props.name}.${group.value}.active`}  label={group.title} onChange={(val) => handleToggleActive(group, val)}/>

      </div>)}
      </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
