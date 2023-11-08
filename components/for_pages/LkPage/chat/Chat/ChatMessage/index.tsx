import IChatMessage from 'data/interfaces/IChatMessage'
import {ChatMessageType} from '@/data/enum/ChatMessageType'
import {ChatMessageProps} from '@/types/types'
import ChatMessageText from './components/ChatMessageText'
import ChatMessagePhotos from './components/ChatMessagePhotos'
import ChatMessageFiles from './components/ChatMessageFiles'
import ChatMessageSystemOwner
  from './components/ChatMessageSystemOwner'
import ChatMessageDealStatus
  from './components/ChatMessageDealStatus'

interface Props extends ChatMessageProps{
  message: IChatMessage
  side: 'my' | 'other'
}

export default function ChatMessageInner(props: Props) {
  switch (props.message.type){
    case ChatMessageType.Text:
      return <ChatMessageText {...props}/>
    case ChatMessageType.Asset:
      if((props.message.assets?? []).every((i) => i.type === 'IMAGE')){
        return <ChatMessagePhotos  {...props}/>
      }else{
        return <ChatMessageFiles {...props}/>
      }
    case ChatMessageType.NewReview:
    case ChatMessageType.ReviewAnswered:
    case ChatMessageType.NewSaleRequest:
    case ChatMessageType.SaleRequestAccepted:
    case ChatMessageType.SaleRequestRejected:
    case ChatMessageType.NewDealOffer:
    case ChatMessageType.DealOfferAccepted:
    case ChatMessageType.DealOfferRejected:
      return <ChatMessageSystemOwner {...props}/>
      case ChatMessageType.DealSetUp:
    case ChatMessageType.DealWeighed:
    case ChatMessageType.DealTerminatedByBuyer:
    case ChatMessageType.DealTerminatedBySeller:
    case ChatMessageType.DealWeighingAccepted:
    case  ChatMessageType.DealPaid:
      return <ChatMessageDealStatus {...props}/>

  }
}


