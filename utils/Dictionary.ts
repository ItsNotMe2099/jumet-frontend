import {BonusType} from '@/data/enum/BonusType'
import {BonusInvoiceStatus} from '@/data/enum/BonusInvoiceStatus'

export default class Dictionary {

  static getBonusType(type: BonusType): string {
    switch (type) {
      case BonusType.FirstDeal:
        return 'Первая сделка'
      case BonusType.DealFromWeight:
        return 'Вес лома'

    }
  }
  static getBonusInvoiceStatus(type: BonusInvoiceStatus): string {
    switch (type) {
      case BonusInvoiceStatus.NotPaid:
        return 'Не оплачен'
      case BonusInvoiceStatus.Paid:
        return 'Оплачен'
      case BonusInvoiceStatus.Cancelled:
        return 'Отменен'

    }
  }
}
