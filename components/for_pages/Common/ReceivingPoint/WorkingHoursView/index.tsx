import styles from './index.module.scss'
import {useMemo} from 'react'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

import ReceivingPointUtils from '@/utils/ReceivingPointUtils'
import {WeekDays} from '@/types/enums'
import {IReceivingPointWorkTime} from '@/data/interfaces/ReceivingPointWorkTime'
import Formatter from '@/utils/formatter'


interface Props {
  receivingPoint: IReceivingPoint
}

export default function WorkingHoursView(props: Props) {

  const workTimeSettings = useMemo(() => ReceivingPointUtils.getWorkTimesSettings(props.receivingPoint), [props.receivingPoint])
  const getWeekDay = (day: WeekDays) => {
    switch (day){
      case WeekDays.monday:
        return 'Пн'
      case WeekDays.tuesday:
        return 'Вт'
      case WeekDays.wednesday:
        return 'Ср'
      case WeekDays.thursday:
        return 'Чт'
      case WeekDays.friday:
        return 'Пт'
      case WeekDays.saturday:
        return 'Сб'
      case WeekDays.sunday:
        return 'Вс'

    }
  }
  const formatTime = (time: IReceivingPointWorkTime) => time ? `${Formatter.formatTimeString(time.startAt)} - ${Formatter.formatTimeString(time.finishAt)}` : 'Выходной'
  const workingWeekDays = [WeekDays.monday, WeekDays.tuesday, WeekDays.wednesday, WeekDays.thursday, WeekDays.friday]
  const weekendsWeekDays = [WeekDays.saturday, WeekDays.sunday]

  return (
    <div className={styles.root}>
        {workTimeSettings.isAlways && <div>Круглосуточно</div>}
        {!workTimeSettings.isAlways && workTimeSettings.isWorkDaysSame && workTimeSettings.firstWorkDay && <div>Пн-Пт {formatTime(workTimeSettings.firstWorkDay)}</div>}
        {!workTimeSettings.isAlways && !workTimeSettings.isWorkDaysSame && workingWeekDays.map((i) => <div>{getWeekDay(i)}: {formatTime(workTimeSettings.map[i])}</div>)}
        {!workTimeSettings.isAlways && workTimeSettings.isWeekendDaysSame && workTimeSettings.firstWeekendDay && <div>`Сб-Вс {formatTime(workTimeSettings.firstWeekendDay)}</div>}
        {!workTimeSettings.isAlways && !workTimeSettings.isWeekendDaysSame && workTimeSettings.firstWeekendDay && weekendsWeekDays.map((i) => <div>{getWeekDay(i)}: {formatTime(workTimeSettings.map[i])}</div>)}
        {!workTimeSettings.isAlways && !workTimeSettings.firstWeekendDay && <div>Сб-Вс Выходной</div>}
      </div>
  )
}
