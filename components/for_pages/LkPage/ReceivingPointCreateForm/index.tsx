import {DeepPartial, IFormStep, RequestError} from '@/types/types'
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
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {SnackbarType} from '@/types/enums'
import {useAppContext} from '@/context/state'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import ContentLoader from '@/components/ui/ContentLoader'
import {Routes} from '@/types/routes'
import {ReceivingPointStatus} from '@/data/enum/ReceivingPointStatus'
import ApproveStep from '@/components/for_pages/LkPage/ReceivingPointCreateForm/components/ApproveStep'


enum FormStep {
  Data = 'data',
  Zones = 'zones',
  Prices = 'prices',
  Users = 'users',
  WorkingHours = 'working-hours',
  Approve = 'approve'
}

const initialSteps: IFormStep<FormStep>[] = [
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
    key: FormStep.Users
  },
  {
    name: 'Режим работы',
    description: 'Укажите режим работы и фото пункта приёма',
    key: FormStep.WorkingHours
  },
]

interface Props {
  stepKey?: string
  isNew?: boolean
  id?: number
}

export default function ReceivingPointCreateForm(props: Props) {
  const router = useRouter()
  const appContext = useAppContext()
  const [receivingPoint, setReceivingPoint] = useState<IReceivingPoint | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [steps, setSteps] = useState<IFormStep<FormStep>[]>(initialSteps)
  const [step, setStep] = useState<IFormStep<FormStep>>(steps[0])
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(!!props.id)

  const currentStepIndex = useMemo(() => steps.findIndex(i => i.key === step.key) ?? 0, [step, steps])
  const loadInitial = async () => {

      const receivingPoint = props.id ? await ReceivingPointOwnerRepository.fetchById(props.id!) : null
        setReceivingPoint(receivingPoint)
        setInitialLoading(false)

    const newSteps = [...steps]
    const hasPublishStep = !!newSteps.find(i => i.key === FormStep.Approve)

    if (receivingPoint && receivingPoint.status === ReceivingPointStatus.Draft && !hasPublishStep) {

      newSteps.push({
        name: 'Публикация',
        description: null,
        key: FormStep.Approve
      })
    }
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
   await router.push('/lk/receiving-points/edit/[id]/[step]', Routes.lkReceivingPointEditStep(receivingPoint!.id, step.key as any), {
      shallow: true
    })
  }
  const postSubmit = () => {
    if (currentStepIndex === steps.length - 1) {
      router.push(Routes.lkReceivingPoints)
    } else {
      setStepValue(steps[currentStepIndex + 1].key)
    }
  }
  const submit = async (data: DeepPartial<IReceivingPoint>) => {
    if(props.isNew){
      setLoading(true)
      try{
        const res = await ReceivingPointOwnerRepository.create(data)
        setReceivingPoint(i => ({...i, ...res}))
        await router.push('/lk/receiving-points/edit/[id]/[step]', Routes.lkReceivingPointEditStep(receivingPoint!.id, steps[currentStepIndex + 1].key), {
          shallow: true
        })
      }catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
      setLoading(false)

    }else{
      setLoading(true)
      try{
        const res = await ReceivingPointOwnerRepository.update(receivingPoint!.id, data)
        setReceivingPoint(i => ({...i, ...res}))
        postSubmit()
      }catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
      setLoading(false)
    }
  }


  const handleBack = (formData?: any) => {
    if (currentStepIndex === 0) {
      return
    }
    const newStep = steps[currentStepIndex - 1]
    setStep(newStep)
    router.push('/lk/receiving-points/edit/[id]/[step]', Routes.lkReceivingPointEditStep(receivingPoint!.id, newStep.key as any), {
      shallow: true
    })
  }
  if(initialLoading){
    return <ContentLoader style={'fullscreen'}/>
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
        <ApproveStep key={6}  />
      ]} />
    </RegLayout>
    </div>
  )
}
