import { DeepPartial, IFormStep, RequestError } from '@/types/types'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import FormStepSwitch from '@/components/ui/FormStepSwitch'
import DataStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DataStep'
import RegLayout from 'components/for_pages/Common/RegLayout'
import DeliveryZoneStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/DeliveryZonesStep'
import UsersStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/UsersStep'
import PricesStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/PricesStep'
import WorkingHoursStep from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/WorkingHoursStep'
import styles from './index.module.scss'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import { SnackbarType } from '@/types/enums'
import { useAppContext } from '@/context/state'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import ContentLoader from '@/components/ui/ContentLoader'
import { Routes } from '@/types/routes'
import ApproveStep from '@/components/for_pages/LkPage/ReceivingPointCreateForm/components/ApproveStep'
import DealRepository from '@/data/repositories/DealRepository'


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
  isNew?: boolean
  id?: number
}

export default function DealEditForm(props: Props) {
  const router = useRouter()
  const appContext = useAppContext()
  const [deal, setDeal] = useState<any | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [steps, setSteps] = useState<IFormStep<FormStep>[]>(initialSteps)
  const [step, setStep] = useState<IFormStep<FormStep>>(steps[0])
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(!!props.id)

  const currentStepIndex = useMemo(() => steps.findIndex(i => i.key === step.key) ?? 0, [step, steps])
  const loadInitial = async () => {

    const deal = props.id ? await DealRepository.fetchById(props.id!) : null
    setDeal(deal)
    setInitialLoading(false)

    const newSteps = [...steps]

    setSteps(newSteps)
    if (props.stepKey) {
      setStep(newSteps.find(i => i.key === props.stepKey) ?? newSteps[0])
    }
  }
  useEffect(() => {
    loadInitial()
  }, [props.id])
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
    await router.push('/deal-edit/[id]/[step]', Routes.dealEditStep(deal!.id, step.key as any), {
      shallow: true
    })
  }
  const postSubmit = () => {
    if (currentStepIndex === steps.length - 1) {

    } else {
      setStepValue(steps[currentStepIndex + 1].key)
    }
  }

  const submit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    try {
      const res = await ReceivingPointOwnerRepository.update(deal!.id, data)
      //setDeal(i => ({ ...i, ...res }))
      postSubmit()
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoading(false)
  }


  const handleBack = (formData?: any) => {
    if (currentStepIndex === 0) {
      return
    }
    const newStep = steps[currentStepIndex - 1]
    setStep(newStep)
    router.push('/lk/receiving-points/edit/[id]/[step]', Routes.lkReceivingPointEditStep(deal!.id, newStep.key as any), {
      shallow: true
    })
  }
  if (initialLoading) {
    return <ContentLoader style={'fullscreen'} />
  }

  return (
    <div className={styles.root}>
      <RegLayout
        title={steps[currentStepIndex].description as string}
        currentStepIndex={currentStepIndex} indicator onBack={handleBack} filter={false}>
        <FormStepSwitch index={currentStepIndex} options={[
          <DataStep key={1} onSubmit={submit} />,
          <DeliveryZoneStep key={2} onSubmit={submit} onBack={handleBack} />,
          <PricesStep key={3} onSubmit={submit} onBack={handleBack} />,
          <UsersStep key={4} onSubmit={submit} onBack={handleBack} />,
          <WorkingHoursStep key={5} onSubmit={submit} onBack={handleBack} />,
          <ApproveStep key={6} />
        ]} />
      </RegLayout>
    </div>
  )
}
