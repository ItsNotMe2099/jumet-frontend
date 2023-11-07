import styles from 'components/fields/Schedule/ScheduleWeekDaysField/index.module.scss'
import {IField, WorkDays} from 'types/types'
import { useField} from 'formik'
import FieldError from 'components/fields/FieldError'
import { WeekDays} from 'types/enums'
//import ActionsDropDown from 'components/ui/ActionsDropdown'
import ScheduleIntervalsField from 'components/fields/Schedule/ScheduleIntervalsField'
import CheckBoxField from '@/components/fields/CheckBoxField'

export interface IScheduleDay{
  title: string,
  value: WeekDays,
}
interface Props extends IField<WorkDays> {
  duration: number
}

export default function ScheduleWeekDaysField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  const days: IScheduleDay[] = [
    {title: 'Понедельник', value: WeekDays.monday},
    {title: 'Вторник', value: WeekDays.tuesday},
    {title: 'Среда', value: WeekDays.wednesday},
    {title: 'Четверг', value: WeekDays.thursday},
    {title: 'Пятница', value: WeekDays.friday},
    {title: 'Суббота', value: WeekDays.saturday},
    {title: 'Воскресенье', value: WeekDays.sunday},
  ]

  const value = field.value ?? days.reduce((ac, a) => ({
    ...ac,
    [a.value]: {active: true, startAt: null, finishAt: null}
  }), {}) as WorkDays

  const handleToggleActive = (day:IScheduleDay,active: boolean) => {

    helpers.setValue({
      ...value, [day.value]: {
        ...value[day.value],
        active,

      }
    })

  }
  return (
    <div className={styles.root} data-field={props.name}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      {props.description && <div className={styles.hint}>{props.description}</div>}
      <div className={styles.schedule}>
      {days.map((day) => <div key={day.value} className={styles.scheduleItem}>
        <ScheduleIntervalsField  className={styles.intervals} namePrefix={`${props.name}.${day.value}`} duration={props.duration}/>
        <CheckBoxField name={`${props.name}.${day.value}.active`}  label={day.title} onChange={(val) => handleToggleActive(day, val)}/>
      </div>)}
      </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
