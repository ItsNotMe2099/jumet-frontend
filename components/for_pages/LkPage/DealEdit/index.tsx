import React, {useEffect} from 'react'
import styles from './index.module.scss'
import DealInfoCard from './components/DealInfoCard'
import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'
import {useDealContext} from '@/context/deal_state'
import {DealStatus} from '@/data/enum/DealStatus'
import SetupStepFormCard from '@/components/for_pages/LkPage/DealEdit/components/SetupFormStepCard'
import WeighingFormStepCard from '@/components/for_pages/LkPage/DealEdit/components/WeighingFormStepCard'
import PayFormStepCard from '@/components/for_pages/LkPage/DealEdit/components/PayFormStepCard'
import DealOfferResultCard from '@/components/for_pages/LkPage/DealEdit/components/DealOfferResultCard'
import SellerDataResultCard from '@/components/for_pages/LkPage/DealEdit/components/SellerDataResultCard'
import WeighningResultCard from '@/components/for_pages/LkPage/DealEdit/components/WeighingtResultCard'
import ReceiptResultCard from '@/components/for_pages/LkPage/DealEdit/components/ReceiptResultCard'
import ReviewFormStepCard from '@/components/for_pages/LkPage/DealEdit/components/ReviewFormStepCard'
import ReviewResultCard from '@/components/for_pages/LkPage/DealEdit/components/ReviewResultCard'
import SaleRequestResultCard from '@/components/for_pages/LkPage/DealEdit/components/SaleRequestResultCard'
import {NotificationUnreadType} from '@/data/interfaces/INotification'
import {useNotificationContext} from '@/context/notifications_state'


interface Props {
  stepKey?: string
  id?: number
}

export default function DealEdit(props: Props) {
  const dealContext = useDealContext()
  const appContext = useAppContext()
  const notifyContext = useNotificationContext()
  const active = notifyContext.store[NotificationUnreadType.deal].find(i => i.eId === dealContext.dealId)
  useEffect(() => {
    if (active) {
        notifyContext.markRead(dealContext.dealId, NotificationUnreadType.deal, false)
    }
  }, [active])
  const getCurrentForm  = () => {
    switch (appContext.aboutMe?.role){
      case UserRole.Seller:
        switch (dealContext.deal!.status){
          case DealStatus.New:
            return <SetupStepFormCard/>
          case DealStatus.Weighing:
            return <WeighningResultCard initialOpen={true} hasActions={true}/>
          case DealStatus.Paid:
            return !dealContext.deal!.review && appContext.aboutMe?.role === UserRole.Seller ?
               <ReviewFormStepCard initialOpen={true}/> : null

          default:
            return null
        }
      case UserRole.Buyer:
        switch (dealContext.deal!.status){
          case DealStatus.SetUp:
            return <WeighingFormStepCard/>
          case DealStatus.WeighingAccepted:
            return <PayFormStepCard/>
          default:
            return null
        }
    }
  }
  const isStepPass = (status: DealStatus) => {
    const keys = Object.values(DealStatus)
    const index = keys.indexOf(status)
    const currentIndex = keys.indexOf(dealContext.deal!.status)
    return index <= currentIndex
  }

  return (
    <div className={styles.root}>
      <DealInfoCard />
      {getCurrentForm()}

      {isStepPass(DealStatus.Paid) && dealContext.deal?.review && <ReviewResultCard/>}
      {isStepPass(DealStatus.Paid) && <ReceiptResultCard/>}
      {isStepPass(DealStatus.Weighing)  && !(dealContext.deal?.status === DealStatus.Weighing && appContext.aboutMe?.role === UserRole.Seller)&& <WeighningResultCard/>}
      <DealOfferResultCard initialOpen={dealContext.deal?.status === DealStatus.New}/>
      <SaleRequestResultCard initialOpen={dealContext.deal?.status === DealStatus.New}/>
      {isStepPass(DealStatus.SetUp) && <SellerDataResultCard/>}

    </div>
  )
}
