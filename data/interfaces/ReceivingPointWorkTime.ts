import {WeekDays} from '@/types/enums'

export interface IReceivingPointWorkTime {
  receivingPointId: number
  id: number
  weekDay: WeekDays
  startAt: string
  finishAt: string
}
