import { IFormStep } from '@/types/types'
import React, { useMemo, useState } from 'react'
import FormStepSwitch from '@/components/ui/FormStepSwitch'
import styles from './index.module.scss'
import DealCardWithSteps from './components/DealCardWithSteps'


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

  return (
    <div className={styles.root}>
      <DealCardWithSteps title={'Сделка № 245'} currentStepIndex={currentStepIndex} />
      <FormStepSwitch index={currentStepIndex} options={[

      ]} />
    </div>
  )
}
