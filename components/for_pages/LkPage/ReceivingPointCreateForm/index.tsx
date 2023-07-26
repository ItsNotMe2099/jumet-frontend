import { IFormStep } from '@/types/types'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import FormStepSwitch from '@/components/ui/FormStepSwitch'
import DataStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DataStep'
import RegLayout from 'components/for_pages/Common/RegLayout'
import DeliveryZoneStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DeliveryZonesStep'
import PersonnelStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/PersonnelStep'
import PricesStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/PricesStep'
import WorkingHoursStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/WorkingHoursStep'
import styles from './index.module.scss'


enum FormStep {
  Data = 'Data',
  Zones = 'Zones',
  Prices = 'Prices',
  Personnel = 'Personnel',
  WorkingHours = 'WorkingHours'
}

const steps: IFormStep<FormStep>[] = [
  {
    name: 'Данные о компании',
    description: 'Заполните данные о компании, чтобы начать покупать лом',
    key: FormStep.Data
  },
  {
    name: 'Зоны доставки',
    description: 'Укажите зоны доставки',
    key: FormStep.Zones
  },
  {
    name: 'Цены',
    description: 'Укажите актуальные цены на скупку лома',
    key: FormStep.Prices
  },
  {
    name: 'Персонал',
    description: 'Добавьте доступ к Jumet для сотрудников пункта приёма',
    key: FormStep.Personnel
  },
  {
    name: 'Режим работы',
    description: 'Укажите режим работы и фото пункта приёма',
    key: FormStep.WorkingHours
  },
]

interface Props {
  stepKey?: string
}

export default function BuyerRegFillForm(props: Props) {
  const router = useRouter()
  const [formData, setFormData] = useState<any>({})
  const [step, setStep] = useState<IFormStep<FormStep>>(steps[0])

  const currentStepIndex = useMemo(() => steps.findIndex(i => i.key === step.key) ?? 0, [step, steps])

  useEffect(() => {
    if (props.stepKey) {
      setStep(steps.find(i => i.key === props.stepKey) ?? steps[0])
    }
  }, [props.stepKey])

  useEffect(() => {
    const step = steps.find(i => i.key === router.query.step as string as any)!
    if (step) {
      setStep(step)
    }
  }, [router.query.step])

  const setStepValue = async (stepKey: FormStep) => {
    const step = steps.find(i => i.key === stepKey)!
    setStep(step)
    /*await router.replace('/lk/owner/[profileRole]/listings/[id]/edit/[step]', Routes.lkOwnerListingEdit(profileRole, props.entityId, step.key as any), {
       shallow: true
     })*/
  }

  const handleNextStep = (formData?: any) => {
    if (formData) {
      setFormData({ ...formData })
    }
    setStepValue(steps[currentStepIndex + 1].key)
  }

  const handleBack = (formData?: any) => {

    setStepValue(steps[currentStepIndex - 1].key)
  }

  return (
    <div className={styles.root}>
    <RegLayout
      title={steps[currentStepIndex].description as string}
      currentStepIndex={currentStepIndex} indicator onBack={handleBack} filter={false}>
      <FormStepSwitch index={currentStepIndex} options={[
        <DataStep key={1} onNextStep={handleNextStep} />,
        <DeliveryZoneStep key={2} onNextStep={handleNextStep} onBack={handleBack} />,
        <PricesStep key={3} onNextStep={handleNextStep} onBack={handleBack} />,
        <PersonnelStep key={4} onNextStep={handleNextStep} onBack={handleBack} />,
        <WorkingHoursStep key={5} onNextStep={handleNextStep} onBack={handleBack} />,
      ]} />
    </RegLayout>
    </div>
  )
}
