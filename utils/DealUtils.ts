import {TerminateReasonType} from '@/data/enum/TerminateReasonType'

export default class DealUtils {

  static getTerminateReasonType(reason: TerminateReasonType) : string {
    switch (reason){
      case TerminateReasonType.NotDelivered:
      case TerminateReasonType.PriceChanged:
      case TerminateReasonType.RubbishChanged:
      case TerminateReasonType.PhotoDifference:
      case TerminateReasonType.LocationChanged:
        return 'Изменилось местоположение'

    }
  }
}
