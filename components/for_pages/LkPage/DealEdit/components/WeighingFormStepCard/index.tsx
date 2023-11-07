import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import Button from '@/components/ui/Button'
import {useDealContext} from '@/context/deal_state'
import {IDealWeighingStepRequest} from '@/data/interfaces/IDealStepRequest'
import {Nullable} from '@/types/types'
import {useRepresentativeListContext} from '@/context/representative_list_state'
import IFile from '@/data/interfaces/IFile'
import PercentField from '@/components/fields/PercentField'
import TextAreaField from '@/components/fields/TextAreaField'
import FileField from '@/components/fields/Files/FileField'
import DealStepFormCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepFormCardLayout'
import Validator from '@/utils/validator'
import WeightWithUnitField from '@/components/fields/WeightWithUnitField'
import FormErrorScroll from '@/components/ui/FormErrorScroll'
import {ModalType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import {useAppContext} from '@/context/state'
import DealCalculationResult
  from '@/components/for_pages/LkPage/DealEdit/components/WeighingFormStepCard/DealCalculationResult'
import {useEffect, useRef} from 'react'
import {debounce} from 'debounce'
import {IDealCalculateRequest} from '@/data/interfaces/IDealCalculateRequest'

interface IFormData extends IDealWeighingStepRequest {
  acceptanceCertificate: Nullable<IFile>
  weighingPhoto: Nullable<IFile>

}

interface Props {

}

export default function WeighingFormStepCard(props: Props) {
  const dealContext = useDealContext()
  const appContext = useAppContext()
  const representativeContext = useRepresentativeListContext()
  const loading = dealContext.editLoading
  const initRef = useRef<boolean>(false)
  const submit = async (data: IFormData) => {
    await dealContext.submitStepWeighing({
      ...data,
      weighingPhotoId: data.weighingPhoto?.id,
      acceptanceCertificateId: data.acceptanceCertificate?.id
    })
  }
  const handleSubmit = async (data: IFormData) => {
    if (!data.weighingPhoto || !data.acceptanceCertificate) {
      const labels = [...(!data.weighingPhoto ? ['Фотоподтверждение лома'] : []), ...(!data.acceptanceCertificate ? ['Приёмо-сдаточный акт'] : [])]
      appContext.showModal(ModalType.Confirm, {
        title: 'Отправить результаты?',
        text: `Вы не прикрепили ${labels.join(' и ')}. Точно отправляем?`,
        onConfirm: async () => {
          appContext.hideModal()
          submit(data)
        }
      } as ConfirmModalArguments)
    } else {
      return submit(data)
    }
  }

  const initialValues: IFormData = {
    actualWeight: null,
    actualRubbishInPercents: null,
    weighingComment: null,
    acceptanceCertificate: null,
    weighingPhoto: null,
    price: null,
    deliveryPrice: null,
    loadingPrice: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const debouncedCalculate = debounce((data: IDealCalculateRequest) => {
    dealContext.calculate(data)
  }, 500)

  useEffect(() => {
    if(!initRef.current){
      initRef.current = true
      return
    }

    if(!formik.values.actualWeight || !formik.values.actualRubbishInPercents){
      return
    }
    debouncedCalculate({
      price: formik.values.price,
      deliveryPrice: formik.values.deliveryPrice,
      loadingPrice: formik.values.loadingPrice,
      actualWeight: formik.values.actualWeight,
      actualRubbishInPercents: formik.values.actualRubbishInPercents
    })
  }, [formik.values.actualWeight, formik.values.actualRubbishInPercents, formik.values.price, formik.values.deliveryPrice, formik.values.loadingPrice])

  const handleSetManualPrice = (value: boolean) => {
    dealContext.setCalculateIsManual(value)

      setTimeout(() => {
        if(value) {
          formik.setFieldValue('price', dealContext?.calculationData?.price ?? dealContext.deal!.price ?? null)
          formik.setFieldValue('deliveryPrice', dealContext?.calculationData?.deliveryPrice ?? dealContext.deal!.deliveryPrice ?? null)
          formik.setFieldValue('loadingPrice', dealContext?.calculationData?.loadingPrice ?? dealContext.deal!.loadingPrice ?? null)
        }else{
          formik.setFieldValue('price', null)
          formik.setFieldValue('deliveryPrice', null)
          formik.setFieldValue('loadingPrice', null)
        }
      }, 100)
  }
  return (
    <DealStepFormCardLayout title={'Результат взвешивания'} contentClassName={styles.cardContent}>
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <FormErrorScroll formik={formik}/>
          <div className={styles.left}>
            <WeightWithUnitField name='actualWeight' label={'Вес лома'} validate={Validator.required}/>
            <PercentField name='actualRubbishInPercents' label={'Засор'} suffix={'%'} validate={Validator.required}/>
            <TextAreaField name='weighingComment' label={'Комментарий'}/>
            <FileField name={'weighingPhoto'} label={'Фотоподтверждение лома'}
                       text={<>Перетащите сюда или <span>выберите фото</span><br/>
                         подтверждения взвешивания лома</>}/>
            <FileField name={'acceptanceCertificate'} label={'Приёмо-сдаточный акт'}
                       text={<>Перетащите сюда или <span>выберите файл</span><br/>
                         приёмо-сдаточный акт</>}/>
            <div className={styles.buttons}>
              <Button type='submit' spinner={loading} disabled={loading || dealContext.terminateLoading} color='blue'
                      styleType='large'>Отправить</Button>
              <Button type='button' spinner={dealContext.terminateLoading} color='greyRed' styleType='large'
                      onClick={() => dealContext.terminateByBuyer()}>Расторгнуть
                сделку</Button>
            </div>
          </div>
          <div className={styles.right}>

            <DealCalculationResult onSetManualPrice={handleSetManualPrice} actualWeight={formik.values.actualWeight} actualRubbishInPercents={formik.values.actualRubbishInPercents}/>
          </div>
        </Form>
      </FormikProvider>
    </DealStepFormCardLayout>
  )
}
