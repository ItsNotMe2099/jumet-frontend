import { IFormStep } from '@/types/types'
import React, { useMemo, useState } from 'react'
import FormStepSwitch from '@/components/ui/FormStepSwitch'
import styles from './index.module.scss'
import DealCardWithSteps from './components/DealCardWithSteps'
import OpeningStepForm from './components/OpeningStep/Form'
import { useAppContext } from '@/context/state'
import { UserRole } from '@/data/enum/UserRole'
import SuggestionFromBuyerCard from './components/SuggestionFromBuyerCard'
import WeighningResultCard from './components/DeliveryStep/WeighingtResultCard'


enum FormStep {
  Opening = 'opening',
  Delivery = 'delivery',
  Payment = 'payment',
}

const initialSteps: IFormStep<FormStep>[] = [
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
  stepKey?: string
  id?: number
}

export default function DealEdit(props: Props) {

  const [steps, setSteps] = useState<IFormStep<FormStep>[]>(initialSteps)
  const [step, setStep] = useState<IFormStep<FormStep>>(steps[0])

  const currentStepIndex = useMemo(() => steps.findIndex(i => i.key === step.key) ?? 0, [step, steps])

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <DealCardWithSteps title={'Сделка № 245'} currentStepIndex={2} />
      <FormStepSwitch index={2} options={[
        <OpeningStepForm key={1} onSubmit={() => null} />,
        <></>,
        <WeighningResultCard key={2} id={props.id as number}/>
      ]} />
      {appContext.aboutMe?.role === UserRole.Seller && <SuggestionFromBuyerCard />}
    </div>
  )
}
