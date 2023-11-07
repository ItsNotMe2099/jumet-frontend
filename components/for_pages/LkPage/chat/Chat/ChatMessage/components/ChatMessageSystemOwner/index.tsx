import {ChatMessageProps, Nullable} from '@/types/types'
import {useMemo} from 'react'
import {ChatMessageType} from '@/data/enum/ChatMessageType'
import ChatMessageCardLayout from '../ChatMessageCardLayout'


interface Props extends ChatMessageProps {
}

export default function ChatMessageSystemOwner(props: Props) {
  const text = useMemo<Nullable<string>>(() => {
    switch (props.message.type) {
      case ChatMessageType.NewReview:
        return 'Новый отзыв'
      case ChatMessageType.ReviewAnswered:
        return 'Ответ на отзыв'
      case ChatMessageType.NewSaleRequest:
        return 'Новая заявка'
      case ChatMessageType.SaleRequestAccepted:
        return 'Завяка принята'
      case ChatMessageType.SaleRequestRejected:
        return 'Заявка отклонена'
      case ChatMessageType.NewDealOffer:
        return 'Новое предложение сделки'
      case ChatMessageType.DealOfferAccepted:
        return 'Предложение принято'
      case ChatMessageType.DealOfferRejected:
        return 'Предложение принято'
      default:
        return null
    }
  }, [props.message])
  if (!text) {
    return null
  }
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    {text}
  </ChatMessageCardLayout>
}


