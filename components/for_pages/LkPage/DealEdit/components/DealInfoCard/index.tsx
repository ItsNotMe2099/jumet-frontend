import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import Indicator from '@/components/for_pages/Common/Indicator'
import {IFormStep, IOption} from '@/types/types'
import {useDealContext} from '@/context/deal_state'
import {useEffect, useMemo, useRef, useState} from 'react'
import {DealStatus} from '@/data/enum/DealStatus'
import Alert, {AlertType} from '@/components/ui/Alert'
import DealUtils, {IDealStateDetails} from '@/utils/DealUtils'
import {useAppContext} from '@/context/state'
import { useResize } from '@/components/hooks/useResize'
import classnames from 'classnames'



enum FormStep {
  Opening = 'opening',
  Delivery = 'delivery',
  Payment = 'payment',
}

const steps: IFormStep<FormStep>[] = [
  {
    name: 'Открытие сделки',
    key: FormStep.Opening
  },
  {
    name: 'Доставка лома',
    key: FormStep.Delivery
  },
  {
    name: 'Оплата',
    key: FormStep.Payment
  },
]
interface Props {

}

export default function DealInfoCard(props: Props) {
  const appContext = useAppContext()
  const dealContext = useDealContext()
  const options: IOption<number>[] = [
    { label: 'Открытие сделки', value: 1 },
    { label: 'Доставка лома', value: 2 },
    { label: 'Оплата', value: 2 },
  ]
  const step = useMemo<FormStep>(() => {
    switch (dealContext.deal!.status){
      case DealStatus.New:
        return FormStep.Opening
      case DealStatus.SetUp:
        return FormStep.Delivery
      case DealStatus.Weighing:
        return FormStep.Delivery
      case DealStatus.WeighingAccepted:
        return FormStep.Payment
      case DealStatus.TerminatedByBuyer:
      case DealStatus.TerminatedBySeller:
      case DealStatus.Paid:
        return FormStep.Payment
    }
  }, [dealContext.deal])
  const {isTabletWidth} = useResize()

  const currentStepIndex = useMemo<number>(() => {
    return steps.indexOf(steps.find(i => i.key === step)!) ?? 0
  }, [step])

  const dealStateDetails = useMemo<IDealStateDetails | null>(() => {
    if(!appContext.aboutMe || !dealContext.deal){
      return null
    }
    return DealUtils.getStateDescription(dealContext.deal!, appContext.aboutMe!.role)
  }, [dealContext.deal, appContext.aboutMe?.role])

  const getAlertType = (dealStateDetails: IDealStateDetails): AlertType => {
    switch (dealStateDetails.color){
      case 'yellow':
        return 'attention'
      case 'green':
        return 'success'
      case 'red':
        return 'danger'
    }
}

const [isStick, setIsStick] = useState<boolean>()
const stickyRef= useRef<HTMLDivElement>(null!)
useEffect(()=>{
  let fn = () => {
    if(isTabletWidth) {return}
    if(stickyRef.current?.getBoundingClientRect().top < 140) {
      setIsStick(true)
    }
    else {
      setIsStick(false)
    }
  }
  window.addEventListener('scroll', fn)

  return ()=>{window.removeEventListener('scroll', fn)}
}, [stickyRef.current])

  return (
    <CardLayout title={`Сделка № ${dealContext.dealId}`} titleClassName={styles.title}>
      <div className={styles.root}>
      {dealStateDetails && <Alert type={getAlertType(dealStateDetails)} title={dealStateDetails.name}  text={dealStateDetails.description}/> }
      <Indicator<number> lineClass={styles.line} className={styles.indicator} step={currentStepIndex} options={options}  />

      {!isTabletWidth&& 
        <div className={styles.stickywrapper} ref={stickyRef}>
          <div className={classnames(styles.sticky, isStick&&styles.sticky_active)} style={{width: stickyRef.current?.offsetWidth + 40}}>
            <p className={styles.lineTitle}>Сделка № {dealContext.dealId}</p>
            <div className={styles.lineSpacer}></div>
            <Indicator<number> lineClass={styles.line} className={styles.indicator} step={currentStepIndex} options={options} alternate/>
          </div>
        </div>
      }
      </div>
    </CardLayout>
  )
}
