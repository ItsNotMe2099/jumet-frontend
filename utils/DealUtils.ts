import {TerminateReasonType} from '@/data/enum/TerminateReasonType'
import {DealPaymentType} from '@/data/enum/DealPaymentType'
import {IDeal} from '@/data/interfaces/IDeal'
import {DealStatus} from '@/data/enum/DealStatus'
import Formatter from '@/utils/formatter'
import {parse} from 'date-fns'

export interface IDealStateDetails {
  shortName?: string,
  name: string,
  description: string,
  color: 'yellow' | 'red' | 'green'
}

export interface IDealTerminateReasonStateDetails {
 name: string,
  description?: string,
}

export default class DealUtils {

  static getTerminateReasonType(reason: TerminateReasonType): IDealTerminateReasonStateDetails {

    switch (reason) {
      case TerminateReasonType.NotDelivered:
        return {
          name: 'Продавец не привез лом в согласованное время'
        }
      case TerminateReasonType.PriceChanged:
        return {
          name: 'Изменение цены продавцом после согласования сделки'
        }
      case TerminateReasonType.RubbishChanged:
        return {
          name: 'Изменение засора'
        }
      case TerminateReasonType.PhotoDifference:
        return {
          name: 'Лом на фото не соответствует привезенному'
        }
      case TerminateReasonType.LocationChanged:
        return {
          name: 'Изменение места вывоза лома после согласования сделки'
        }

    }
  }

  static getPaymentType(type: DealPaymentType): string {
    switch (type) {
      case DealPaymentType.Card:
        return 'Перевод на карту'
      case DealPaymentType.Cash:
        return 'Наличные'
      case DealPaymentType.Cashless:
        return 'Безнал'

    }
  }

  static formatDeliveryTime(deal: IDeal){
    return deal.requiresDelivery ? `${Formatter.formatDateRelative(parse(deal.deliveryDate, 'yyyy-mm-dd', new Date()))} ${Formatter.formatTimeString(deal.deliveryTimeFrom)}${deal.deliveryTimeTo ? `${deal.deliveryTimeFrom ? '-' : 'до '}${Formatter.formatTimeString(deal.deliveryTimeTo)}` : ''}` : ''
  }
  private static getNewStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    switch (mode) {
      case 'seller':
        return {
          ...(!deal.dealOfferId && deal.saleRequestId ? {
            shortName: 'Ваше предложение одобрено, сделка открыта',
            name: 'Ваше предложение одобрено, сделка открыта',
            description: 'Покупатель принял предложение. Для открытия сделки с пунктом приёма лома, заполните форму «Оформить сделку».',

          } : {
            shortName: 'Вы приняли предложение, сделка открыта',
            name: 'Вы приняли предложение, сделка открыта',
            description: 'Вы приняли предложение покупателя. Для открытия сделки с пунктом приёма лома, заполните форму «Оформить сделку».',

          }),
          color: 'yellow'
        }
      case 'buyer':
        return {
          ...(!deal.dealOfferId && deal.saleRequestId ? {
            shortName: 'Вы приняли предложение покупателя, сделка открыта',
            name: 'Вы приняли предложение покупателя, сделка открыта.',
            description: '',

          } : {
            shortName: 'Продавец принял предложение, сделка открыта',
            name: 'Продавец принял предложение, сделка открыта',
            description: '',

          }),
          color: 'yellow'
        }
    }
  }

  private static getSetupStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    const hasDelivery = deal.requiresDelivery
    const deliveryTime = hasDelivery ? this.formatDeliveryTime(deal) : ''
    const deliveryName = 'Ожидается доставка лома в пункт приема'
    const noDeliveryName = 'Ожидается доставка лома в пункт приема'
    switch (mode) {
      case 'seller':
        return {
          ...(hasDelivery ? {
            shortName: deliveryName,
            name: deliveryName,
            description: `Сроки доставки: ${deliveryTime}`,
          } : {
            shortName: noDeliveryName,
            name: noDeliveryName,
            description: `Сроки доставки: ${deliveryTime}`,
          }),
          color: 'yellow'
        }
      case 'buyer':
        return {
          ...(hasDelivery ? {
            shortName: deliveryName,
            name: deliveryName,
            description: `После доставки лома, укажите результат взвешивания и отправьте приемо-сдаточный акт. Сроки доставки: ${deliveryTime}`,
          } : {
            shortName: noDeliveryName,
            name: noDeliveryName,
            description: `После доставки лома, укажите результат взвешивания и отправьте приемо-сдаточный акт. Сроки доставки: ${deliveryTime}`,
          }),
          color: 'yellow'
        }
    }
  }

  private static getWeighingStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    switch (mode) {
      case 'seller':
        return {
          shortName: 'Ожидается подтверждение взвешивания',
          name: 'Ожидается подтверждение взвешивания',
          description: 'Для получения оплаты подтвердите результаты взвешивания.',
          color: 'yellow'
        }
      case 'buyer':
        return {
          shortName: 'Ожидается подтверждение взвешивания',
          name: 'Ожидается подтверждение взвешивания',
          description: 'Для оплаты ожидайте подтверждения результатов взвешивания.',
          color: 'yellow'
        }
    }
  }

  private static getWeighingAcceptStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    switch (mode) {
      case 'seller':
        return {
          shortName: 'Ожидается оплата лома покупаетелем',
          name: 'Ожидается оплата лома покупаетелем',
          description: '',
          color: 'yellow'
        }
      case 'buyer':
        return {
          shortName: 'Требуется произвести и подтвердить оплату за лом',
          name: 'Требуется произвести и подтвердить оплату за лом.',
          description: 'Необходимо произвести оплату и выслать квитанцию/платёжку продавцу.',

          color: 'yellow'
        }
    }
  }

  private static getTerminatedBySellerStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    switch (mode) {
      case 'seller':
        return {
          shortName: 'Сделка расторгнута продавцом',
          name: 'Сделка расторгнута продавцом',
          description: 'Вы расторгли сделку. Заберите лом из пункта приёма',
          color: 'red'
        }
      case 'buyer':
        return {
          shortName: 'Сделка расторгнута продавцом',
          name: 'Сделка расторгнута продавцом',
          description: 'Ожидается забор лома из пункта приема',
          color: 'red'
        }
    }
  }
  private static getTerminatedByBuyerStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    switch (mode) {
      case 'seller':
        return {
          shortName: 'Сделка расторгнута покупателем',
          name: `Сделка расторгнута покупателем.${ deal.terminateReasonType ? `Причина: ${this.getTerminateReasonType(deal.terminateReasonType).name}` : ''}`,
          description: '',
          color: 'red'
        }
      case 'buyer':
        return {
          shortName: 'Сделка расторгнута покупателем',
          name: `Сделка расторгнута покупателем.${ deal.terminateReasonType ? `Причина: ${this.getTerminateReasonType(deal.terminateReasonType).name}` : ''}`,
          description: '',
          color: 'red'
        }
    }
  }

  private static getPaidStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    const hasReview = !!deal.review
    const hasReviewAnswer = !!deal.review?.answer
    const name = 'Выполнена'
    switch (mode) {
      case 'seller':
        return {
          shortName: name,
          name: name,
          description: !hasReview ? 'Вы можете оставить отзыв' : '',
          color: 'green'
        }
      case 'buyer':
        return {
          shortName: name,
          name: name,
          description: hasReview && !hasReviewAnswer ? 'Продавец оставил отзыв о вашем пункте приёма. Вы можете ответить на отзыв.' : '',
          color: hasReview && !hasReviewAnswer ? 'yellow' : 'green'
        }
    }

  }
  private static getPaidReviewStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails | null {
    const hasReview = !!deal.review
    const hasReviewAnswer = !!deal.review?.answer
    const name = 'Выполнена'
    switch (mode) {
      case 'seller':
        return {
          shortName: name,
          name: name,
          description: '',
          color: 'green'
        }
      case 'buyer':
        return {
          shortName: name,
          name: name,
          description: '',
          color: 'green'
        }
    }

  }
  static getStateDescriptionAllStatus(deal: IDeal, mode: 'seller' | 'buyer'): {[key in DealStatus]: IDealStateDetails}{
    const  keys = Object.values(DealStatus)
    const obj: {[key in DealStatus] : IDealStateDetails} = {} as any
    for(const key of keys){
      console.log('getKey',key, this.getStateDescription({...deal, status: key as DealStatus}, mode))
      obj[key as DealStatus] = this.getStateDescription({...deal, status: key as DealStatus}, mode)
    }
    return obj
  }
  static getStateDescription(deal: IDeal, mode: 'seller' | 'buyer'): IDealStateDetails {
    switch (deal.status) {
      case DealStatus.New:
        return this.getNewStateDescription(deal, mode)
      case DealStatus.SetUp:
        return this.getSetupStateDescription(deal, mode)
      case DealStatus.Weighing:
        return this.getWeighingStateDescription(deal, mode)
      case DealStatus.WeighingAccepted:
        return this.getWeighingAcceptStateDescription(deal, mode)
      case DealStatus.TerminatedByBuyer:
        return this.getTerminatedByBuyerStateDescription(deal, mode)
      case DealStatus.TerminatedBySeller:
        return this.getTerminatedBySellerStateDescription(deal, mode)
      case DealStatus.Paid:
        return this.getPaidStateDescription(deal, mode)

    }
  }
}
