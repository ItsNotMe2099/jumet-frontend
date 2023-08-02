import {WeekDays} from '@/types/enums'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {IScheduleFieldDayDescription} from '@/types/types'
import {IReceivingPointWorkTime} from '@/data/interfaces/ReceivingPointWorkTime'
import {IPriceDescriptionByWeight} from '@/data/interfaces/IPriceDescriptionByWeight'
import Formatter from '@/utils/formatter'

export interface IWorkTimeSettings {
  isAlways: boolean
  isWorkDaysSame: boolean
  isWeekendDaysSame: boolean
  firstWorkDay: IReceivingPointWorkTime | null
  firstWeekendDay: IReceivingPointWorkTime | null
  map: {[key: string]: IReceivingPointWorkTime}
}

export default class ReceivingPointUtils {
  static convertWorkTimesToFormData(receivingPoint: IReceivingPoint | null):  {[key: string | number]: IScheduleFieldDayDescription } {
    if(!receivingPoint){
      return {}
    }
    const settings = this.getWorkTimesSettings(receivingPoint)
    const map: {[key: string | number]: IScheduleFieldDayDescription } = {}
    if(settings.isAlways){
      return {}
    }
    for(const workTime of receivingPoint?.workTimes ?? []){
      map[workTime.weekDay] = {active: true, startAt: workTime.startAt, finishAt: workTime.finishAt}
    }
    return map
  }
  static getWorkTimesSettings(receivingPoint: IReceivingPoint | null): IWorkTimeSettings {
    const workingWeekDays = [WeekDays.monday, WeekDays.tuesday, WeekDays.wednesday, WeekDays.thursday, WeekDays.friday]
    const weekendsWeekDays = [WeekDays.saturday, WeekDays.sunday]
    const map: {[key: string]: IReceivingPointWorkTime} = (receivingPoint?.workTimes ?? []).reduce((ac, a) => ({
      ...ac,
      [a.weekDay]: a
    }), {})
    return {
      isAlways: (receivingPoint?.workTimes ?? []).every((i) => i.startAt === '00:00:00' && i.finishAt === '23:59:59') ?? false,
      isWorkDaysSame: workingWeekDays.every((i) =>  map[WeekDays.monday]?.startAt && map[i]?.startAt === map[WeekDays.monday]?.startAt && map[i]?.finishAt === map[WeekDays.monday]?.finishAt)  ?? false,
      isWeekendDaysSame: weekendsWeekDays.every((i) =>  map[WeekDays.saturday]?.startAt && map[i]?.startAt === map[WeekDays.saturday]?.startAt && map[i]?.finishAt === map[WeekDays.saturday]?.finishAt) ?? false,
      firstWorkDay: (receivingPoint?.workTimes ?? []).find(i => workingWeekDays.includes(i.weekDay) && i.startAt && i.finishAt) ?? null,
      firstWeekendDay: (receivingPoint?.workTimes ?? []).find(i => weekendsWeekDays.includes(i.weekDay) && i.startAt && i.finishAt) ?? null,
      map,
    }
  }

  static formatWeightRange(priceDesc: IPriceDescriptionByWeight): string | null {
    const pluralizeValue = (value: number) => Formatter.pluralize(value, 'тонны', 'тонн', 'тонн')
    if(priceDesc.minWeightInTons ===0 || !priceDesc.minWeightInTons){
      return `до ${priceDesc.maxWeightInTons} ${pluralizeValue(priceDesc.maxWeightInTons)}`
    }
    if(priceDesc.maxWeightInTons ===0 || !priceDesc.maxWeightInTons){
      return `от  ${priceDesc.minWeightInTons} ${pluralizeValue(priceDesc.minWeightInTons)}`
    }
    return `от ${priceDesc.minWeightInTons} ${pluralizeValue(priceDesc.minWeightInTons)} до ${priceDesc.maxWeightInTons} ${pluralizeValue(priceDesc.maxWeightInTons)}`

  }

  static getPriceWithRubbish(price: number | null | undefined, rubbishInPercent: number | null | undefined): number{
    return Math.floor((price ?? 0) - ((price ?? 0) * (rubbishInPercent ?? 0)/ 100))
  }

}

