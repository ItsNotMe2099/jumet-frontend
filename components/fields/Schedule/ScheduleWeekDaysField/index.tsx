import styles from 'components/fields/Schedule/ScheduleWeekDaysField/index.module.scss'
import {IField, WorkDays} from 'types/types'
import { useField} from 'formik'
import FieldError from 'components/ui/FieldError'
import {DayType, WeekDays} from 'types/enums'
//import ActionsDropDown from 'components/ui/ActionsDropdown'
import ScheduleIntervalsField from 'components/fields/Schedule/ScheduleIntervalsField'

enum ActionType {
  CopyMondayToWork = 'copyMondayToWork',
  CopyMondayToAll = 'copyMondayToAll',
  SetWeekends = 'setWeekends'
}

interface Props extends IField<WorkDays> {
  duration: number
}

export default function ScheduleWeekDaysField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props)
  const showError = meta.touched && !!meta.error
  const days = [
    {title: 'Пн', value: WeekDays.monday},
    {title: 'Вс', value: WeekDays.tuesday},
    {title: 'Ср', value: WeekDays.wednesday},
    {title: 'Чт', value: WeekDays.thursday},
    {title: 'Пт', value: WeekDays.friday},
    {title: 'Сб', value: WeekDays.saturday},
    {title: 'Вс', value: WeekDays.sunday},
  ]

  const value = field.value ?? days.reduce((ac, a) => ({
    ...ac,
    [a.value]: {dayType: DayType.working, intervals: []}
  }), {}) as WorkDays

  const handleAction = (type: ActionType) => {
    const newObject = {...value}
    switch (type) {
      case ActionType.CopyMondayToWork: {
        const day = value[WeekDays.monday]
        days.forEach(cur => {
          if (![WeekDays.monday, WeekDays.saturday, WeekDays.sunday].includes(cur.value)) {
            newObject[cur.value] = {dayType: DayType.working, intervals: [...day.intervals]}
          }
        })

        break
      }
      case ActionType.CopyMondayToAll: {
        const day = value[WeekDays.monday]
        days.forEach(cur => {
          if (![WeekDays.monday].includes(cur.value)) {
            newObject[cur.value] = {dayType: DayType.working, intervals: [...day.intervals]}
          }
        })

        break
      }
      case ActionType.SetWeekends: {
        days.forEach(cur => {
          if ([WeekDays.saturday, WeekDays.sunday].includes(cur.value)) {
            newObject[cur.value] = {dayType: DayType.dayOff, intervals: []}
          }
        })
        break
      }
    }
    helpers.setValue(newObject)
  }

  const handleCheck = (dayValue: WeekDays, checked: boolean) => {
    const newObject = {...value}
    newObject[dayValue] = {dayType: checked ? DayType.working : DayType.dayOff, intervals: []}
    helpers.setValue(newObject)
  }

  const handleDayCheck = (dayValue: WeekDays, checked: boolean) => {
    const newObject = {...value}
    newObject[dayValue] = {...newObject[dayValue], dayType: checked ? DayType.working : DayType.dayOff}
    helpers.setValue(newObject)
  }

  return (
    <div className={styles.root}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      {props.description && <div className={styles.hint}>{props.description}</div>}

      {/*<div className={styles.actions}>
        <ActionsDropDown<ActionType> placeholder={'Действия'} minWidth={280} xPosition={'right'} options={[
          {label: 'Установить рабочие дни как ПН', value: ActionType.CopyMondayToWork},
          {label: 'Установить все дни как ПН', value: ActionType.CopyMondayToAll},
          {label: 'Суббота, Воскрсенье выходной', value: ActionType.SetWeekends},
        ]}
                                     onChange={(item) => handleAction(item.value)}
        />
      </div>*/}

      {days.map((day) => <div key={day.value} className={styles.scheduleItem}>
        <div className={styles.day}>{day.title}</div>
        <ScheduleIntervalsField namePrefix={`${props.name}.${day.value}`} duration={props.duration} value={value[day.value].intervals}
                                onChange={(intervals) => {
                                  helpers.setValue({
                                    ...value, [day.value]: {
                                      intervals, dayType: DayType.working
                                    }
                                  })
                                }}/>
      </div>)}
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
